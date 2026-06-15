import { describe, expect, it } from "vitest";
import { validateOptionalUrl } from "./validationService";

describe("validateOptionalUrl", () => {
  it("accepts empty and HTTPS URLs", () => {
    expect(validateOptionalUrl("")).toBe("");
    expect(validateOptionalUrl("https://example.com/jobs/1")).toBe("");
  });

  it("rejects unsafe URL protocols", () => {
    expect(validateOptionalUrl("javascript:alert(1)")).toBe(
      "Enter a valid http or https URL."
    );
  });
});
