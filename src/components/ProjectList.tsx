import { useState } from "react";
import toast from "react-hot-toast";
import { PROJECT_PRIORITIES, PROJECT_STATUSES } from "../constants";
import {
  createProject,
  deleteProject,
  updateProjectStatus,
} from "../services/projectService";
import { formatDate } from "../services/formatService";
import { validateOptionalUrl, validateRequired } from "../services/validationService";
import type { PortfolioProject, ProjectPriority, ProjectStatus } from "../types";
import ConfirmDialog from "./ConfirmDialog";
import DetailPanel from "./DetailPanel";
import EmptyState from "./EmptyState";
import FilterBar from "./FilterBar";
import FormField from "./FormField";
import PageHeader from "./PageHeader";
import StatusBadge from "./StatusBadge";

type ProjectListProps = {
  projects: PortfolioProject[];
  setProjects: React.Dispatch<React.SetStateAction<PortfolioProject[]>>;
};

type ProjectErrors = Partial<Record<"name" | "githubUrl" | "liveUrl", string>>;

function ProjectList({ projects, setProjects }: ProjectListProps) {
  const [name, setName] = useState("");
  const [techStack, setTechStack] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Planning");
  const [priority, setPriority] = useState<ProjectPriority>("Medium");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [errors, setErrors] = useState<ProjectErrors>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ProjectStatus>("All");
  const [priorityFilter, setPriorityFilter] = useState<"All" | ProjectPriority>("All");
  const [pendingDelete, setPendingDelete] = useState<PortfolioProject | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: ProjectErrors = {
      name: validateRequired(name, "Project name", 100),
      githubUrl: validateOptionalUrl(githubUrl),
      liveUrl: validateOptionalUrl(liveUrl),
    };
    const activeErrors = Object.fromEntries(
      Object.entries(nextErrors).filter(([, value]) => value)
    ) as ProjectErrors;
    setErrors(activeErrors);
    if (Object.keys(activeErrors).length > 0) {
      toast.error("Review the highlighted project fields.");
      return;
    }

    setProjects((current) => [
      ...current,
      createProject(name, techStack, status, {
        description,
        githubUrl,
        liveUrl,
        priority,
      }),
    ]);
    toast.success("Project added");
    setName("");
    setTechStack("");
    setStatus("Planning");
    setPriority("Medium");
    setDescription("");
    setGithubUrl("");
    setLiveUrl("");
    setErrors({});
  }

  function handleStatusChange(id: string, nextStatus: ProjectStatus) {
    setProjects((current) => updateProjectStatus(current, id, nextStatus));
    toast.success("Project status updated");
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    setProjects((current) => deleteProject(current, pendingDelete.id));
    toast.success("Project deleted");
    setPendingDelete(null);
  }

  const priorityOrder: Record<ProjectPriority, number> = { High: 0, Medium: 1, Low: 2 };
  const filteredProjects = projects
    .filter((project) => {
      const search = searchTerm.trim().toLowerCase();
      return (
        (!search || [project.name, project.techStack, project.description]
          .some((value) => value.toLowerCase().includes(search))) &&
        (statusFilter === "All" || project.status === statusFilter) &&
        (priorityFilter === "All" || project.priority === priorityFilter)
      );
    })
    .sort((a, b) =>
      priorityOrder[a.priority] - priorityOrder[b.priority] ||
      Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
    );

  return (
    <>
      <PageHeader
        description="Plan, build, and ship portfolio work with the context recruiters and collaborators care about."
        title="Projects"
      />

      <section className="section-card">
        <div className="panel-heading">
          <div>
            <h2>Add a portfolio project</h2>
            <p>Keep scope, stack, links, and delivery status in one record.</p>
          </div>
        </div>
        <form className="form-grid" noValidate onSubmit={handleSubmit}>
          <FormField error={errors.name} htmlFor="project-name" label="Project name" required>
            <input
              aria-describedby={errors.name ? "project-name-help" : undefined}
              id="project-name"
              maxLength={100}
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </FormField>
          <FormField htmlFor="project-stack" label="Tech stack">
            <input
              id="project-stack"
              maxLength={160}
              onChange={(event) => setTechStack(event.target.value)}
              placeholder="React, TypeScript, Node.js"
              value={techStack}
            />
          </FormField>
          <FormField htmlFor="project-status" label="Status">
            <select id="project-status" onChange={(event) => setStatus(event.target.value as ProjectStatus)} value={status}>
              {PROJECT_STATUSES.map((option) => <option key={option}>{option}</option>)}
            </select>
          </FormField>
          <FormField htmlFor="project-priority" label="Priority">
            <select id="project-priority" onChange={(event) => setPriority(event.target.value as ProjectPriority)} value={priority}>
              {PROJECT_PRIORITIES.map((option) => <option key={option}>{option}</option>)}
            </select>
          </FormField>
          <FormField error={errors.githubUrl} htmlFor="project-github" label="GitHub URL">
            <input
              aria-describedby={errors.githubUrl ? "project-github-help" : undefined}
              id="project-github"
              onChange={(event) => setGithubUrl(event.target.value)}
              placeholder="https://github.com/..."
              type="url"
              value={githubUrl}
            />
          </FormField>
          <FormField error={errors.liveUrl} htmlFor="project-live" label="Live URL">
            <input
              aria-describedby={errors.liveUrl ? "project-live-help" : undefined}
              id="project-live"
              onChange={(event) => setLiveUrl(event.target.value)}
              placeholder="https://"
              type="url"
              value={liveUrl}
            />
          </FormField>
          <FormField htmlFor="project-description" label="Description">
            <textarea
              id="project-description"
              maxLength={1200}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Problem, approach, and outcome"
              rows={3}
              value={description}
            />
          </FormField>
          <div className="form-actions"><button type="submit">Add project</button></div>
        </form>
      </section>

      <section className="section-card">
        <div className="panel-heading">
          <div>
            <h2>Portfolio pipeline</h2>
            <p>High-priority and recently updated work appears first.</p>
          </div>
        </div>
        <FilterBar resultCount={filteredProjects.length}>
          <input
            aria-label="Search projects"
            className="search-field"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search project, stack, or description"
            type="search"
            value={searchTerm}
          />
          <select aria-label="Filter by project status" onChange={(event) => setStatusFilter(event.target.value as "All" | ProjectStatus)} value={statusFilter}>
            <option>All</option>
            {PROJECT_STATUSES.map((option) => <option key={option}>{option}</option>)}
          </select>
          <select aria-label="Filter by project priority" onChange={(event) => setPriorityFilter(event.target.value as "All" | ProjectPriority)} value={priorityFilter}>
            <option>All</option>
            {PROJECT_PRIORITIES.map((option) => <option key={option}>{option}</option>)}
          </select>
        </FilterBar>

        {projects.length === 0 ? (
          <EmptyState description="Add a project above to start tracking portfolio delivery." title="No projects yet" />
        ) : filteredProjects.length === 0 ? (
          <EmptyState description="Try a broader search or clear the current filters." title="No projects match" />
        ) : (
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="record-card-header">
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.techStack || "Tech stack not set"}</p>
                  </div>
                  <StatusBadge value={project.priority} />
                </div>
                <div className="project-card-status">
                  <StatusBadge value={project.status} />
                  <span>Updated {formatDate(project.updatedAt)}</span>
                </div>
                <DetailPanel>
                  <p className="project-description">{project.description || "No description added."}</p>
                  <div className="link-row">
                    {project.githubUrl && !validateOptionalUrl(project.githubUrl) ? (
                      <a href={project.githubUrl} rel="noreferrer" target="_blank">GitHub repository</a>
                    ) : null}
                    {project.liveUrl && !validateOptionalUrl(project.liveUrl) ? (
                      <a href={project.liveUrl} rel="noreferrer" target="_blank">Live project</a>
                    ) : null}
                  </div>
                </DetailPanel>
                <div className="record-actions">
                  <select
                    aria-label={`Update status for ${project.name}`}
                    onChange={(event) => handleStatusChange(project.id, event.target.value as ProjectStatus)}
                    value={project.status}
                  >
                    {PROJECT_STATUSES.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <button className="button-secondary danger-text" onClick={() => setPendingDelete(project)} type="button">
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <ConfirmDialog
        description={pendingDelete ? `This permanently removes ${pendingDelete.name} from your portfolio tracker.` : ""}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        open={Boolean(pendingDelete)}
        title="Delete project?"
      />
    </>
  );
}

export default ProjectList;
