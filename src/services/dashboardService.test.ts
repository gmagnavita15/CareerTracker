import { describe, expect, it } from "vitest";
import { getDashboardMetrics } from "./dashboardService";
import type { JobApplication, PortfolioProject, Skill } from "../types";

describe("getDashboardMetrics", () => {
  it("returns zero values for empty data", () => {
    expect(getDashboardMetrics([], [], [])).toEqual({
      applicationCount: 0,
      interviewRate: 0,
      activeProjectCount: 0,
      recentlyPracticedSkillCount: 0,
    });
  });

  it("calculates interview rate and active work from stored records", () => {
    const timestamp = new Date().toISOString();
    const applications = [
      { status: "Applied" },
      { status: "Interviewing" },
      { status: "Offer" },
      { status: "Rejected" },
    ].map((application, index) => ({
      id: `application-${index}`,
      company: "Company",
      role: "Engineer",
      dateApplied: "2026-06-01",
      jobUrl: "",
      location: "",
      salaryRange: "",
      contactName: "",
      notes: "",
      createdAt: timestamp,
      updatedAt: timestamp,
      ...application,
    })) as JobApplication[];
    const projects = [
      { status: "Building" },
      { status: "Deployed" },
    ].map((project, index) => ({
      id: `project-${index}`,
      name: "Project",
      techStack: "React",
      description: "",
      githubUrl: "",
      liveUrl: "",
      priority: "Medium",
      createdAt: timestamp,
      updatedAt: timestamp,
      ...project,
    })) as PortfolioProject[];
    const skills = [{
      id: "skill-1",
      name: "TypeScript",
      category: "Language",
      level: "Intermediate",
      targetLevel: "Advanced",
      lastPracticed: new Date().toISOString().slice(0, 10),
      notes: "",
      createdAt: timestamp,
      updatedAt: timestamp,
    }] as Skill[];

    expect(getDashboardMetrics(applications, projects, skills)).toEqual({
      applicationCount: 4,
      interviewRate: 50,
      activeProjectCount: 1,
      recentlyPracticedSkillCount: 1,
    });
  });
});
