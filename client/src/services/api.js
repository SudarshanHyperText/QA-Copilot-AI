import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_RESUME_URL}/api`
});

export const startTestCaseJob = (requirement) => {
    return api.post("/generate", { requirement });
};

export const generateTestCases = startTestCaseJob;
