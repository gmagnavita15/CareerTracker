export function validateRequired(
  value: string,
  label: string,
  maxLength: number
): string {
  const trimmed = value.trim();

  if (!trimmed) return `${label} is required.`;
  if (trimmed.length > maxLength) {
    return `${label} must be ${maxLength} characters or fewer.`;
  }

  return "";
}

export function validateOptionalUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:"
      ? ""
      : "Enter a valid http or https URL.";
  } catch {
    return "Enter a valid http or https URL.";
  }
}

export function validateOptionalDate(value: string): string {
  if (!value) return "";
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? ""
    : "Enter a valid date.";
}
