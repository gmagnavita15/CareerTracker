import type {
  PortfolioProject,
  ProjectStatus,
} from "../types";

export function createProject(
  name: string,
  techStack: string,
  status: ProjectStatus
): PortfolioProject {
  return {
    id: crypto.randomUUID(),
    name,
    techStack,
    status,
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
      ? { ...project, status: newStatus }
      : project
  );
}