import StatCard from "../components/StatCard";
import type {
  JobApplication,
  PortfolioProject,
  Skill,
} from "../types";
import StatusChart from "../components/StatusChart";

type DashboardPageProps = {
  applications: JobApplication[];
  projects: PortfolioProject[];
  skills: Skill[];
  noteCount: number;
};

function DashboardPage({
  applications,
  projects,
  skills,
  noteCount,
}: DashboardPageProps) {
  const recentApplications = applications.slice(-5).reverse();

  const activeProjects = projects.filter(
    (project) => project.status !== "Deployed"
  );

  const advancedSkills = skills.filter(
    (skill) => skill.level === "Advanced"
  );

  const interviewingCount = applications.filter(
  (application) => application.status === "Interviewing"
).length;

const offerCount = applications.filter(
  (application) => application.status === "Offer"
).length;

const deployedProjectsCount = projects.filter(
  (project) => project.status === "Deployed"
).length;

  return (
    <>
      <section className="hero">
        <h1>Developer Dashboard</h1>
        <p>
          Track your job search, technical growth, portfolio projects, and notes.
        </p>
      </section>

      <section className="stats-grid">
        <StatCard
          title="Applications"
          value={applications.length}
          description="Jobs applied to"
        />

        <StatCard
          title="Skills"
          value={skills.length}
          description="Skills currently learning"
        />

        <StatCard
          title="Projects"
          value={projects.length}
          description="Portfolio projects in progress"
        />

        <StatCard
          title="Notes"
          value={noteCount}
          description="Career and interview notes"
        />
      </section>

      <section className="stats-grid secondary-stats">
        <StatCard
          title="Interviewing"
          value={interviewingCount}
          description="Applications currently interviewing"
        />

        <StatCard
          title="Offers"
          value={offerCount}
          description="Applications with offers"
        />

        <StatCard
          title="Deployed Projects"
          value={deployedProjectsCount}
          description="Projects completed and deployed"
        />

        <StatCard
          title="Advanced Skills"
          value={advancedSkills.length}
          description="Skills marked as advanced"
        />
      </section>

      <StatusChart applications={applications} />

      <section className="section-card">
        <h2>Recent Applications</h2>

        {recentApplications.length === 0 ? (
          <p className="empty-state">
            No applications yet. Add some from the Applications page.
          </p>
        ) : (
          <table className="application-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentApplications.map((application) => (
                <tr key={application.id}>
                  <td>{application.company}</td>
                  <td>{application.role}</td>
                  <td>
                    <span className="badge">{application.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="dashboard-widgets">
        <div className="section-card">
          <h2>Projects In Progress</h2>

          {activeProjects.length === 0 ? (
            <p className="empty-state">
              No active projects right now.
              </p>
          ) : (
            <ul className="dashboard-list">
              {activeProjects.map((project) => (
                <li key={project.id}>
                  <strong>{project.name}</strong>
                  <span className="badge">
                    {project.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="section-card">
          <h2>Advanced Skills</h2>

          {advancedSkills.length === 0 ? (
            <p className="empty-state">
              No advanced skills tracked yet.
              </p>
          ) : (
            <ul className="dashboard-list">
              {advancedSkills.map((skill) => (
                <li key={skill.id}>
                  <strong>{skill.name}</strong>

                  <span className="badge">
                    {skill.category}
                    </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

export default DashboardPage;
