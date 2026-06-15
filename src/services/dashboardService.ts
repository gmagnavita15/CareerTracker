import type {
    JobApplication,
    PortfolioProject,
    Skill,
} from "../types";
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

export type DashboardMetrics = {
    applicationCount: number;
    interviewRate: number;
    activeProjectCount: number;
    recentlyPracticedSkillCount: number;
};

export function getDashboardMetrics(
    applications: JobApplication[],
    projects: PortfolioProject[],
    skills: Skill[]
): DashboardMetrics {
    const interviewCount = applications.filter((application) =>
        application.status === "Interviewing" ||
        application.status === "Offer"
    ).length;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return {
        applicationCount: applications.length,
        interviewRate: applications.length === 0
            ? 0
            : Math.round((interviewCount / applications.length) * 100),
        activeProjectCount: projects.filter(
            (project) => project.status !== "Deployed"
        ).length,
        recentlyPracticedSkillCount: skills.filter((skill) => {
            if (!skill.lastPracticed) return false;
            const date = new Date(`${skill.lastPracticed}T00:00:00`);
            return !Number.isNaN(date.getTime()) && date >= thirtyDaysAgo;
        }).length,
    };
}
