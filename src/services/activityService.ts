import type {
  CareerNote,
  JobApplication,
  PortfolioProject,
  Skill,
} from "../types";

export type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  type: "application" | "project" | "skill" | "note";
};

export function getRecentActivity(
  applications: JobApplication[],
  projects: PortfolioProject[],
  skills: Skill[],
  notes: CareerNote[],
  limit = 6
): ActivityItem[] {
  const activity: ActivityItem[] = [
    ...applications.map((application) => ({
      id: `application-${application.id}`,
      title: application.company,
      detail: `${application.role} · ${application.status}`,
      timestamp: application.updatedAt,
      type: "application" as const,
    })),
    ...projects.map((project) => ({
      id: `project-${project.id}`,
      title: project.name,
      detail: `${project.status} · ${project.priority} priority`,
      timestamp: project.updatedAt,
      type: "project" as const,
    })),
    ...skills.map((skill) => ({
      id: `skill-${skill.id}`,
      title: skill.name,
      detail: `${skill.level} · Target ${skill.targetLevel}`,
      timestamp: skill.updatedAt,
      type: "skill" as const,
    })),
    ...notes.map((note) => ({
      id: `note-${note.id}`,
      title: note.title,
      detail: note.category,
      timestamp: note.updatedAt,
      type: "note" as const,
    })),
  ];

  return activity
    .filter((item) => !Number.isNaN(Date.parse(item.timestamp)))
    .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
    .slice(0, limit);
}
