import type {
  APPLICATION_STATUSES,
  SKILL_CATEGORIES,
  SKILL_LEVELS,
  PROJECT_STATUSES,
  PROJECT_PRIORITIES,
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

export type ProjectPriority =
  (typeof PROJECT_PRIORITIES)[number];

export type NoteCategory =
  (typeof NOTE_CATEGORIES)[number];

export type JobApplication = {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  dateApplied: string;
  jobUrl: string;
  location: string;
  salaryRange: string;
  contactName: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  targetLevel: SkillLevel;
  lastPracticed: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type PortfolioProject = {
  id: string;
  name: string;
  techStack: string;
  status: ProjectStatus;
  description: string;
  githubUrl: string;
  liveUrl: string;
  priority: ProjectPriority;
  createdAt: string;
  updatedAt: string;
};

export type CareerNote = {
  id: string;
  title: string;
  content: string;
  category: NoteCategory;
  createdAt: string;
  updatedAt: string;
};

export type StorageRecovery = {
  recovered: boolean;
  message: string;
};
