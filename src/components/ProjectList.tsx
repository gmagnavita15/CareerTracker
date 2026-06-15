import { useState } from "react";
import toast from "react-hot-toast";
import type {
  PortfolioProject,
  ProjectStatus,
} from "../types";
import { PROJECT_STATUSES } from "../constants";
import SectionHeader from "./SectionHeader";
import {
  createProject,
  deleteProject,
  updateProjectStatus,
} from "../services/projectService";

type ProjectListProps = {
  projects: PortfolioProject[];
  setProjects: React.Dispatch<React.SetStateAction<PortfolioProject[]>>;
};

function ProjectList({ projects, setProjects }: ProjectListProps) {
  const [name, setName] = useState("");
  const [techStack, setTechStack] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Planning");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name.trim() || !techStack.trim()) {
      toast.error("Project name and tech stack are required");
      return;
    }

  const newProject = createProject(name, techStack, status);

    setProjects([...projects, newProject]);
    toast.success("Project added");

    setName("");
    setTechStack("");
    setStatus("Planning");
  }

  function handleDelete(id: string) {
    setProjects(deleteProject(projects, id));
    toast.success("Project deleted");
  }

  function handleStatusChange(
    id: string,
    newStatus: ProjectStatus
  ) {    
    setProjects(updateProjectStatus(projects, id, newStatus)); 
    toast.success("Project status updated");
  }

  return (
    <section className="section-card">
      <SectionHeader
        title="Portfolio Projects"
        description="Track your projects and deployment progress."
      />

      <form className="application-form" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Project name"
        />

        <input
          value={techStack}
          onChange={(event) => setTechStack(event.target.value)}
          placeholder="Tech stack"
        />

        <select value={status} onChange={(event) => setStatus(event.target.value as ProjectStatus)}>
          {PROJECT_STATUSES.map((statusOption) => (
            <option key={statusOption}>{statusOption}</option>
          ))}
        </select>

        <button type="submit">Add Project</button>
      </form>

      {projects.length === 0 ? (
        <p className="empty-state">No projects yet. Add your first portfolio project.</p>
      ) : (
        <table className="application-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Tech Stack</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.techStack}</td>
                <td>
                  <select
                    className="status-select"
                    value={project.status}
                    onChange={(event) =>
                      handleStatusChange(project.id, event.target.value as ProjectStatus)
                    }
                  >
                    {PROJECT_STATUSES.map((statusOption) => (
                      <option key={statusOption}>{statusOption}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default ProjectList;