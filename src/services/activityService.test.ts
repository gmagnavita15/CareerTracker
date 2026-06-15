import { describe, expect, it } from "vitest";
import { getRecentActivity } from "./activityService";
import type { JobApplication } from "../types";

describe("getRecentActivity", () => {
  it("returns the most recently updated records first", () => {
    const applications = [
      {
        id: "older",
        company: "Acme",
        role: "Engineer",
        status: "Applied",
        dateApplied: "2026-06-01",
        jobUrl: "",
        location: "",
        salaryRange: "",
        contactName: "",
        notes: "",
        createdAt: "2026-06-01T12:00:00.000Z",
        updatedAt: "2026-06-01T12:00:00.000Z",
      },
      {
        id: "newer",
        company: "Northstar",
        role: "Frontend Engineer",
        status: "Interviewing",
        dateApplied: "2026-06-10",
        jobUrl: "",
        location: "",
        salaryRange: "",
        contactName: "",
        notes: "",
        createdAt: "2026-06-10T12:00:00.000Z",
        updatedAt: "2026-06-15T12:00:00.000Z",
      },
    ] as JobApplication[];

    expect(getRecentActivity(applications, [], [], [], 1)[0]).toMatchObject({
      id: "application-newer",
      title: "Northstar",
      detail: "Frontend Engineer · Interviewing",
    });
  });
});
