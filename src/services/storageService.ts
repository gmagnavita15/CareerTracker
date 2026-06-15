import {
  APPLICATION_STATUSES,
  NOTE_CATEGORIES,
  PROJECT_PRIORITIES,
  PROJECT_STATUSES,
  SKILL_CATEGORIES,
  SKILL_LEVELS,
} from "../constants";
import type {
  ApplicationStatus,
  CareerNote,
  JobApplication,
  NoteCategory,
  PortfolioProject,
  ProjectPriority,
  ProjectStatus,
  Skill,
  SkillCategory,
  SkillLevel,
} from "../types";

type UnknownRecord = Record<string, unknown>;
type Migrator<T> = (value: unknown) => T | null;

export type ParsedCollection<T> = {
  data: T[];
  recovered: boolean;
};

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function enumValue<T extends readonly string[]>(
  value: unknown,
  options: T,
  fallback: T[number]
): T[number] {
  return typeof value === "string" && options.includes(value)
    ? (value as T[number])
    : fallback;
}

function isoTimestamp(value: unknown, fallback: string): string {
  if (typeof value !== "string" || Number.isNaN(Date.parse(value))) {
    return fallback;
  }

  return new Date(value).toISOString();
}

function dateValue(value: unknown, fallback = ""): string {
  const candidate = stringValue(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(candidate) ? candidate : fallback;
}

export function parseStoredCollection<T>(
  rawValue: string | null,
  migrate: Migrator<T>
): ParsedCollection<T> {
  if (!rawValue) {
    return { data: [], recovered: false };
  }

  try {
    const parsed: unknown = JSON.parse(rawValue);

    if (!Array.isArray(parsed)) {
      return { data: [], recovered: true };
    }

    const migrated = parsed.map(migrate);
    const data = migrated.filter((item): item is T => item !== null);

    return {
      data,
      recovered: data.length !== parsed.length,
    };
  } catch {
    return { data: [], recovered: true };
  }
}

export function migrateApplication(value: unknown): JobApplication | null {
  if (!isRecord(value)) return null;

  const id = stringValue(value.id);
  const company = stringValue(value.company);
  const role = stringValue(value.role) || stringValue(value.position);

  if (!id || !company || !role) return null;

  const now = new Date().toISOString();
  const createdAt = isoTimestamp(value.createdAt, now);

  return {
    id,
    company,
    role,
    status: enumValue(
      value.status,
      APPLICATION_STATUSES,
      "Applied"
    ) as ApplicationStatus,
    dateApplied: dateValue(value.dateApplied, createdAt.slice(0, 10)),
    jobUrl: stringValue(value.jobUrl),
    location: stringValue(value.location),
    salaryRange: stringValue(value.salaryRange),
    contactName: stringValue(value.contactName),
    notes: stringValue(value.notes),
    createdAt,
    updatedAt: isoTimestamp(value.updatedAt, createdAt),
  };
}

export function migrateProject(value: unknown): PortfolioProject | null {
  if (!isRecord(value)) return null;

  const id = stringValue(value.id);
  const name = stringValue(value.name);
  if (!id || !name) return null;

  const now = new Date().toISOString();
  const createdAt = isoTimestamp(value.createdAt, now);

  return {
    id,
    name,
    techStack: stringValue(value.techStack),
    status: enumValue(
      value.status,
      PROJECT_STATUSES,
      "Planning"
    ) as ProjectStatus,
    description: stringValue(value.description),
    githubUrl: stringValue(value.githubUrl),
    liveUrl: stringValue(value.liveUrl),
    priority: enumValue(
      value.priority,
      PROJECT_PRIORITIES,
      "Medium"
    ) as ProjectPriority,
    createdAt,
    updatedAt: isoTimestamp(value.updatedAt, createdAt),
  };
}

export function migrateSkill(value: unknown): Skill | null {
  if (!isRecord(value)) return null;

  const id = stringValue(value.id);
  const name = stringValue(value.name);
  if (!id || !name) return null;

  const now = new Date().toISOString();
  const createdAt = isoTimestamp(value.createdAt, now);
  const level = enumValue(
    value.level,
    SKILL_LEVELS,
    "Beginner"
  ) as SkillLevel;

  return {
    id,
    name,
    category: enumValue(
      value.category,
      SKILL_CATEGORIES,
      "Frontend"
    ) as SkillCategory,
    level,
    targetLevel: enumValue(
      value.targetLevel,
      SKILL_LEVELS,
      level
    ) as SkillLevel,
    lastPracticed: dateValue(value.lastPracticed),
    notes: stringValue(value.notes),
    createdAt,
    updatedAt: isoTimestamp(value.updatedAt, createdAt),
  };
}

export function migrateNote(value: unknown): CareerNote | null {
  if (!isRecord(value)) return null;

  const id = stringValue(value.id);
  const title = stringValue(value.title);
  if (!id || !title) return null;

  const now = new Date().toISOString();
  const createdAt = isoTimestamp(value.createdAt, now);

  return {
    id,
    title,
    content: stringValue(value.content),
    category: enumValue(
      value.category,
      NOTE_CATEGORIES,
      "Interview Prep"
    ) as NoteCategory,
    createdAt,
    updatedAt: isoTimestamp(value.updatedAt, createdAt),
  };
}
