import fs from "fs";
import path from "path";
import crypto from "crypto";

export type JobType = "testcase" | "resume" | "hr";
export type JobStatus = "queued" | "running" | "completed" | "failed";

export interface AgentJob {
    id: string;
    type: JobType;
    status: JobStatus;
    input: {
        requirement?: string;
        requirements?: string;
        fileName?: string;
        resumeText?: string;
    };
    result?: unknown;
    error?: string;
    createdAt: string;
    updatedAt: string;
}

const JOBS_DIR = path.join(process.cwd(), "jobs");
const JOBS_FILE = path.join(JOBS_DIR, "jobs.json");
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

const jobs = new Map<string, AgentJob>();

function ensureStore() {
    if (!fs.existsSync(JOBS_DIR)) {
        fs.mkdirSync(JOBS_DIR, { recursive: true });
    }
}

function persist() {
    ensureStore();
    const payload = Object.fromEntries(jobs.entries());
    fs.writeFileSync(JOBS_FILE, JSON.stringify(payload, null, 2));
}

function load() {
    try {
        ensureStore();
        if (!fs.existsSync(JOBS_FILE)) {
            return;
        }
        const raw = JSON.parse(fs.readFileSync(JOBS_FILE, "utf8"));
        Object.values(raw).forEach((job: any) => {
            if (job?.id) {
                jobs.set(job.id, job);
            }
        });
        pruneExpired();
        failIncompleteJobs();
    } catch (error) {
        console.error("Failed to load job store", error);
    }
}

function failIncompleteJobs() {
    let changed = false;
    for (const [id, job] of jobs.entries()) {
        if (job.status === "queued" || job.status === "running") {
            jobs.set(id, {
                ...job,
                status: "failed",
                error: "Job interrupted because the server restarted. Please run again.",
                updatedAt: new Date().toISOString()
            });
            changed = true;
        }
    }
    if (changed) {
        persist();
    }
}

function pruneExpired() {
    const now = Date.now();
    let changed = false;
    for (const [id, job] of jobs.entries()) {
        if (now - new Date(job.createdAt).getTime() > MAX_AGE_MS) {
            jobs.delete(id);
            changed = true;
        }
    }
    if (changed) {
        persist();
    }
}

load();

export function createJobId(type: JobType) {
    const prefix = type === "testcase" ? "TC" : type === "resume" ? "RS" : "HR";
    return `JOB-${prefix}-${Date.now().toString(36)}-${crypto.randomBytes(3).toString("hex")}`.toUpperCase();
}

export function createJob(type: JobType, input: AgentJob["input"]): AgentJob {
    const now = new Date().toISOString();
    const job: AgentJob = {
        id: createJobId(type),
        type,
        status: "queued",
        input,
        createdAt: now,
        updatedAt: now
    };
    jobs.set(job.id, job);
    persist();
    return job;
}

export function updateJob(id: string, patch: Partial<AgentJob>): AgentJob | null {
    const job = jobs.get(id);
    if (!job) {
        return null;
    }
    const next = {
        ...job,
        ...patch,
        updatedAt: new Date().toISOString()
    };
    jobs.set(id, next);
    persist();
    return next;
}

export function getJob(id: string): AgentJob | null {
    pruneExpired();
    return jobs.get(id) || null;
}

export function toPublicJob(job: AgentJob) {
    return {
        id: job.id,
        type: job.type,
        status: job.status,
        input: {
            requirement: job.input.requirement || "",
            requirements: job.input.requirements || "",
            fileName: job.input.fileName || ""
        },
        result: job.result || null,
        error: job.error || "",
        createdAt: job.createdAt,
        updatedAt: job.updatedAt
    };
}

export async function runJob(
    id: string,
    worker: () => Promise<unknown>
) {
    updateJob(id, { status: "running" });
    try {
        const result = await Promise.race([
            worker(),
            new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error("Job timed out. Please run again."));
                }, 180000);
            })
        ]);
        updateJob(id, { status: "completed", result, error: "" });
    } catch (error: any) {
        updateJob(id, {
            status: "failed",
            error: error?.message || "Job failed"
        });
    }
}
