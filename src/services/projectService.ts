import type {
  PortfolioProject,
  ProjectPriority,
  ProjectStatus,
} from "../types";

type ProjectDetails = Partial<
  Pick<
    PortfolioProject,
    "description" | "githubUrl" | "liveUrl" | "priority"
  >
>;

export function createProject(
  name: string,
  techStack: string,
  status: ProjectStatus,
  details: ProjectDetails = {}
): PortfolioProject {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    techStack: techStack.trim(),
    status,
    description: details.description?.trim() || "",
    githubUrl: details.githubUrl?.trim() || "",
    liveUrl: details.liveUrl?.trim() || "",
    priority: details.priority || ("Medium" as ProjectPriority),
    createdAt: now,
    updatedAt: now,
  };
}

export function deleteProject(
  projects: PortfolioProject[],
  id: string
): PortfolioProject[] {
  return projects.filter((project) => project.id !== id);
}

export function updateProjectStatus(
  projects: PortfolioProject[],
  id: string,
  newStatus: ProjectStatus
): PortfolioProject[] {
  return projects.map((project) =>
    project.id === id
      ? { ...project, status: newStatus, updatedAt: new Date().toISOString() }
      : project
  );
}
