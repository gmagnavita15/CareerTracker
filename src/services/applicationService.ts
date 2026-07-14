import type { ApplicationStatus, JobApplication } from "../types";
import {
    formatSalaryRange,
    toTitleCase,
} from "./inputFormatServices";

type ApplicationDetails = Partial<
    Pick<
        JobApplication,
        | "dateApplied"
        | "jobUrl"
        | "location"
        | "salaryRange"
        | "contactName"
        | "notes"
    >
>;

export function createApplication(
    company: string,
    role: string,
    status: ApplicationStatus,
    details: ApplicationDetails = {}
): JobApplication {
    const now = new Date().toISOString();

    return {
        id: crypto.randomUUID(),
        company: toTitleCase(company),
        role: toTitleCase(role),
        status,
        dateApplied: details.dateApplied || now.slice(0, 10),
        jobUrl: details.jobUrl?.trim() || "",
        location: toTitleCase(details.location?.trim() || ""),
        salaryRange: formatSalaryRange(details.salaryRange?.trim() || ""),
        contactName: details.contactName?.trim() || "",
        notes: details.notes?.trim() || "",
        createdAt: now,
        updatedAt: now,
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
        app.id === id
            ? { ...app, status: newStatus, updatedAt: new Date().toISOString() }
            : app
    );
}

export function updateApplication(
    applications: JobApplication[],
    updatedApplication: JobApplication
): JobApplication[] {
    return applications.map((app) =>
        app.id === updatedApplication.id
            ? { 
                ...updatedApplication,
                company: toTitleCase(updatedApplication.company),
                role: toTitleCase(updatedApplication.role),
                location: toTitleCase(updatedApplication.location),
                salaryRange: formatSalaryRange(updatedApplication.salaryRange),
                updatedAt: new Date().toISOString()
            }
            : app
    );
}
