import type { ApplicationStatus, JobApplication } from "../types";

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
        company: company.trim(),
        role: role.trim(),
        status,
        dateApplied: details.dateApplied || now.slice(0, 10),
        jobUrl: details.jobUrl?.trim() || "",
        location: details.location?.trim() || "",
        salaryRange: details.salaryRange?.trim() || "",
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
