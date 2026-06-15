import type { ApplicationStatus, JobApplication, } from "../types";
import { v4 as uuidv4 } from "uuid";

export function createApplication(
    company: string,
    role: string,
    status: ApplicationStatus
): JobApplication {
    return {
        id: uuidv4(),
        company,
        role,
        status,
    };
}

export function deleteApplication(
    applications: JobApplication[],
    id: string
): JobApplication[] {
    return applications.filter((app) => app.id !== id);
}

export function updateApplicationStatus(
    applications: JobApplication[],
    id: string,
    newStatus: ApplicationStatus
): JobApplication[] {
    return applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
    );
}