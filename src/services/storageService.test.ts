import { describe, expect, it } from "vitest";
import {
  migrateApplication,
  parseStoredBoolean,
  parseStoredCollection,
} from "./storageService";

describe("parseStoredCollection", () => {
  it("recovers from malformed JSON without throwing", () => {
    const result = parseStoredCollection("{broken", migrateApplication);

    expect(result.data).toEqual([]);
    expect(result.recovered).toBe(true);
  });

  it("migrates legacy applications with safe defaults", () => {
    const result = parseStoredCollection(
      JSON.stringify([
        {
          id: "legacy-1",
          company: "Northstar Labs",
          role: "Software Engineer",
          status: "Applied",
        },
      ]),
      migrateApplication
    );

    expect(result.recovered).toBe(false);
    expect(result.data[0]).toMatchObject({
      id: "legacy-1",
      company: "Northstar Labs",
      role: "Software Engineer",
      status: "Applied",
      location: "",
      salaryRange: "",
      contactName: "",
      notes: "",
      jobUrl: "",
    });
    expect(result.data[0]?.createdAt).toBeTruthy();
    expect(result.data[0]?.updatedAt).toBeTruthy();
  });

  it("skips records without required identity fields", () => {
    const result = parseStoredCollection(
      JSON.stringify([{ id: "invalid", company: "", role: "" }]),
      migrateApplication
    );

    expect(result.data).toEqual([]);
    expect(result.recovered).toBe(true);
  });
});

describe("parseStoredBoolean", () => {
  it("falls back when stored JSON is not a boolean", () => {
    expect(parseStoredBoolean('"dark"', false)).toEqual({
      data: false,
      recovered: true,
    });
  });
});
