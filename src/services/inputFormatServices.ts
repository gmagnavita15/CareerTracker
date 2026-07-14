export function toTitleCase(value: string): string {
    return value
        .trim()
        .split(/\s+/)
        .map((word) =>
            word.length === 0
                ? word
                : word[0].toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
}

export function formatSalaryRange(value: string): string {
    const trimmed = value.trim();

    if (!trimmed) {
        return "";
    }

    return trimmed
        .split("-")
        .map((part) => {
            const cleanPart = part.trim().replace(/^\$/, "")

            return cleanPart ? `$${cleanPart}` : "";
        })
        .filter(Boolean)
        .join(" - ");
}