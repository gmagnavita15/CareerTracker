import type {
  APPLICATION_STATUSES,
  SKILL_CATEGORIES,
  SKILL_LEVELS,
  PROJECT_STATUSES,
  NOTE_CATEGORIES,
} from "./constants";

export type ApplicationStatus =
  (typeof APPLICATION_STATUSES)[number];

export type SkillCategory =
  (typeof SKILL_CATEGORIES)[number];

export type SkillLevel =
  (typeof SKILL_LEVELS)[number];

export type ProjectStatus =
  (typeof PROJECT_STATUSES)[number];

export type NoteCategory =
  (typeof NOTE_CATEGORIES)[number];

export type JobApplication = {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
};

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
};

export type PortfolioProject = {
  id: string;
  name: string;
  techStack: string;
  status: ProjectStatus;
};

export type CareerNote = {
  id: string;
  title: string;
  content: string;
  category: NoteCategory;
};