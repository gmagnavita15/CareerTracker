import type { JobApplication } from "../types";
import { APPLICATION_STATUSES } from "../constants";

export type StatusSummary = {
    status: string;
    count: number;
    percentage: number;
};

export function getApplicationStatusSummary(
    applications: JobApplication[]
): StatusSummary[] {
    const total = applications.length;

    return APPLICATION_STATUSES.map((status) => {
        const count = applications.filter(
            (app) => app.status === status
        ).length;

        const percentage = total === 0 ? 0 : Math.round((count / total) * 100);

        return {
            status,
            count,
            percentage,
        };
    });
}