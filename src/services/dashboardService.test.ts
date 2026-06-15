import { describe, expect, it } from "vitest";
import { getDashboardMetrics } from "./dashboardService";

describe("getDashboardMetrics", () => {
  it("returns zero values for empty data", () => {
    expect(getDashboardMetrics([], [], [])).toEqual({
      applicationCount: 0,
      interviewRate: 0,
      activeProjectCount: 0,
      recentlyPracticedSkillCount: 0,
    });
  });
});
