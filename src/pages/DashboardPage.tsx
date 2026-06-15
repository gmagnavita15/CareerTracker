import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import StatusChart from "../components/StatusChart";
import { getRecentActivity } from "../services/activityService";
import { getDashboardMetrics } from "../services/dashboardService";
import { formatDate, formatRelativeDate } from "../services/formatService";
import type {
  CareerNote,
  JobApplication,
  PortfolioProject,
  Skill,
} from "../types";

type DashboardPageProps = {
  applications: JobApplication[];
  projects: PortfolioProject[];
  skills: Skill[];
  notes: CareerNote[];
};

function DashboardPage({
  applications,
  projects,
  skills,
  notes,
}: DashboardPageProps) {
  const metrics = getDashboardMetrics(applications, projects, skills);
  const recentApplications = [...applications]
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    .slice(0, 5);
  const activeProjects = projects
    .filter((project) => project.status !== "Deployed")
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    .slice(0, 4);
  const progressingSkills = skills
    .filter((skill) => skill.level !== skill.targetLevel)
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    .slice(0, 4);
  const activity = getRecentActivity(applications, projects, skills, notes);

  return (
    <>
      <PageHeader
        actions={<Link className="button-primary" to="/applications">Add application</Link>}
        description="Track your search, portfolio, and skill development from one focused workspace."
        title="Career overview"
      />

      <section aria-label="Career metrics" className="stats-grid">
        <StatCard
          description="Jobs currently tracked"
          title="Applications"
          value={metrics.applicationCount}
        />
        <StatCard
          description="Interviewing or offer stage"
          title="Interview rate"
          value={`${metrics.interviewRate}%`}
        />
        <StatCard
          description="Projects not yet deployed"
          title="Active projects"
          value={metrics.activeProjectCount}
        />
        <StatCard
          description="Practiced in the last 30 days"
          title="Skills practiced"
          value={metrics.recentlyPracticedSkillCount}
        />
      </section>

      <div className="dashboard-primary-grid">
        <section className="section-card">
          <div className="panel-heading">
            <div>
              <h2>Recent applications</h2>
              <p>Your latest application activity and current stages.</p>
            </div>
            <Link to="/applications">View all</Link>
          </div>

          {recentApplications.length === 0 ? (
            <EmptyState
              description="Add your first role to start measuring application progress."
              title="No applications yet"
            />
          ) : (
            <div className="table-scroll">
              <table className="application-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Applied</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map((application) => (
                    <tr key={application.id}>
                      <td><strong>{application.company}</strong></td>
                      <td>{application.role}</td>
                      <td>{formatDate(application.dateApplied)}</td>
                      <td><StatusBadge value={application.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <StatusChart applications={applications} />
      </div>

      <div className="dashboard-secondary-grid">
        <section className="section-card">
          <div className="panel-heading">
            <div>
              <h2>Recent activity</h2>
              <p>Updates across your career workspace.</p>
            </div>
          </div>
          {activity.length === 0 ? (
            <EmptyState
              description="Activity appears as you add and update career records."
              title="Nothing to show yet"
            />
          ) : (
            <ul className="activity-list">
              {activity.map((item) => (
                <li key={item.id}>
                  <span className={`activity-marker activity-${item.type}`} />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <time dateTime={item.timestamp}>{formatRelativeDate(item.timestamp)}</time>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section-card">
          <div className="panel-heading">
            <div>
              <h2>Active projects</h2>
              <p>Portfolio work currently moving forward.</p>
            </div>
            <Link to="/projects">View all</Link>
          </div>
          {activeProjects.length === 0 ? (
            <EmptyState
              description="Add a portfolio project or mark deployed work as complete."
              title="No active projects"
            />
          ) : (
            <ul className="dashboard-list">
              {activeProjects.map((project) => (
                <li key={project.id}>
                  <div>
                    <strong>{project.name}</strong>
                    <span>{project.techStack || "Tech stack not set"}</span>
                  </div>
                  <StatusBadge value={project.status} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section-card">
          <div className="panel-heading">
            <div>
              <h2>Skill goals</h2>
              <p>Skills that still have room to reach their target.</p>
            </div>
            <Link to="/skills">View all</Link>
          </div>
          {progressingSkills.length === 0 ? (
            <EmptyState
              description="Set target levels to make your learning goals visible."
              title="No active skill goals"
            />
          ) : (
            <ul className="dashboard-list">
              {progressingSkills.map((skill) => (
                <li key={skill.id}>
                  <div>
                    <strong>{skill.name}</strong>
                    <span>{skill.category}</span>
                  </div>
                  <span className="progress-label">{skill.level} → {skill.targetLevel}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

export default DashboardPage;
