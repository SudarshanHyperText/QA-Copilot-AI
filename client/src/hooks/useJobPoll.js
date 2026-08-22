import { useEffect, useRef } from "react";
import { fetchJob } from "../utils/workspace";

export default function useJobPoll(jobId, status, onJob) {
    const onJobRef = useRef(onJob);
    onJobRef.current = onJob;

    useEffect(() => {
        if (!jobId) {
            return;
        }

        if (status === "completed" || status === "failed") {
            return;
        }

        let cancelled = false;
        let timer;
        let misses = 0;
        const startedAt = Date.now();

        const poll = async () => {
            if (Date.now() - startedAt > 180000) {
                onJobRef.current({
                    id: jobId,
                    status: "failed",
                    error: "Job timed out. Please run again.",
                    result: null
                });
                return;
            }

            try {
                const job = await fetchJob(jobId);
                if (cancelled) {
                    return;
                }
                misses = 0;
                onJobRef.current(job);
                if (job.status === "completed" || job.status === "failed") {
                    return;
                }
            } catch (error) {
                misses += 1;
                if (!cancelled && misses >= 3) {
                    onJobRef.current({
                        id: jobId,
                        status: "failed",
                        error: error.message,
                        result: null
                    });
                    return;
                }
            }
            if (!cancelled) {
                timer = setTimeout(poll, 2500);
            }
        };

        poll();

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [jobId, status]);
}
