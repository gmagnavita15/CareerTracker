import { useState } from "react";
import toast from "react-hot-toast";
import { APPLICATION_STATUSES } from "../constants";
import {
  createApplication,
  deleteApplication,
  updateApplicationStatus,
} from "../services/applicationService";
import { formatDate } from "../services/formatService";
import {
  validateOptionalDate,
  validateOptionalUrl,
  validateRequired,
} from "../services/validationService";
import type { ApplicationStatus, JobApplication } from "../types";
import ConfirmDialog from "./ConfirmDialog";
import DetailPanel from "./DetailPanel";
import EmptyState from "./EmptyState";
import FilterBar from "./FilterBar";
import FormField from "./FormField";
import PageHeader from "./PageHeader";
import StatusBadge from "./StatusBadge";

type ApplicationListProps = {
  applications: JobApplication[];
  setApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
};

type SortOption = "newest" | "oldest" | "company";
type FormErrors = Partial<Record<"company" | "role" | "dateApplied" | "jobUrl", string>>;

function ApplicationList({ applications, setApplications }: ApplicationListProps) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Applied");
  const [dateApplied, setDateApplied] = useState(new Date().toISOString().slice(0, 10));
  const [jobUrl, setJobUrl] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [contactName, setContactName] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ApplicationStatus>("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [pendingDelete, setPendingDelete] = useState<JobApplication | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: FormErrors = {
      company: validateRequired(company, "Company", 80),
      role: validateRequired(role, "Role", 100),
      dateApplied: validateOptionalDate(dateApplied),
      jobUrl: validateOptionalUrl(jobUrl),
    };
    const activeErrors = Object.fromEntries(
      Object.entries(nextErrors).filter(([, value]) => value)
    ) as FormErrors;
    setErrors(activeErrors);

    if (Object.keys(activeErrors).length > 0) {
      toast.error("Review the highlighted application fields.");
      return;
    }

    const application = createApplication(company, role, status, {
      dateApplied,
      jobUrl,
      location,
      salaryRange,
      contactName,
      notes,
    });
    setApplications((current) => [...current, application]);
    toast.success("Application added");
    setCompany("");
    setRole("");
    setStatus("Applied");
    setDateApplied(new Date().toISOString().slice(0, 10));
    setJobUrl("");
    setLocation("");
    setSalaryRange("");
    setContactName("");
    setNotes("");
    setErrors({});
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    setApplications((current) => deleteApplication(current, pendingDelete.id));
    toast.success("Application deleted");
    setPendingDelete(null);
  }

  function handleStatusChange(id: string, newStatus: ApplicationStatus) {
    setApplications((current) => updateApplicationStatus(current, id, newStatus));
    toast.success("Application status updated");
  }

  const filteredApplications = applications
    .filter((application) => {
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch = !search || [
        application.company,
        application.role,
        application.location,
        application.contactName,
        application.status,
      ].some((value) => value.toLowerCase().includes(search));
      const matchesStatus = statusFilter === "All" || application.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "company") return a.company.localeCompare(b.company);
      const direction = sortBy === "newest" ? -1 : 1;
      return (Date.parse(a.dateApplied) - Date.parse(b.dateApplied)) * direction;
    });

  return (
    <>
      <PageHeader
        description="Track opportunities, contacts, compensation details, and progress through every stage."
        title="Applications"
      />

      <section className="section-card">
        <div className="panel-heading">
          <div>
            <h2>Add an application</h2>
            <p>Capture the essentials now and keep secondary details available when needed.</p>
          </div>
        </div>

        <form className="form-grid" noValidate onSubmit={handleSubmit}>
          <FormField error={errors.company} htmlFor="application-company" label="Company" required>
            <input
              aria-describedby={errors.company ? "application-company-help" : undefined}
              autoComplete="organization"
              id="application-company"
              maxLength={80}
              onChange={(event) => setCompany(event.target.value)}
              value={company}
            />
          </FormField>
          <FormField error={errors.role} htmlFor="application-role" label="Role" required>
            <input
              aria-describedby={errors.role ? "application-role-help" : undefined}
              autoComplete="organization-title"
              id="application-role"
              maxLength={100}
              onChange={(event) => setRole(event.target.value)}
              value={role}
            />
          </FormField>
          <FormField htmlFor="application-status" label="Status">
            <select
              id="application-status"
              onChange={(event) => setStatus(event.target.value as ApplicationStatus)}
              value={status}
            >
              {APPLICATION_STATUSES.map((option) => <option key={option}>{option}</option>)}
            </select>
          </FormField>
          <FormField error={errors.dateApplied} htmlFor="application-date" label="Date applied">
            <input
              aria-describedby={errors.dateApplied ? "application-date-help" : undefined}
              id="application-date"
              onChange={(event) => setDateApplied(event.target.value)}
              type="date"
              value={dateApplied}
            />
          </FormField>
          <FormField htmlFor="application-location" label="Location">
            <input
              autoComplete="address-level2"
              id="application-location"
              maxLength={100}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Remote, New York, NY"
              value={location}
            />
          </FormField>
          <FormField htmlFor="application-salary" label="Salary range">
            <input
              id="application-salary"
              maxLength={80}
              onChange={(event) => setSalaryRange(event.target.value)}
              placeholder="$80k–$100k"
              value={salaryRange}
            />
          </FormField>
          <FormField htmlFor="application-contact" label="Contact name">
            <input
              autoComplete="name"
              id="application-contact"
              maxLength={100}
              onChange={(event) => setContactName(event.target.value)}
              value={contactName}
            />
          </FormField>
          <FormField error={errors.jobUrl} htmlFor="application-url" label="Job URL">
            <input
              aria-describedby={errors.jobUrl ? "application-url-help" : undefined}
              id="application-url"
              onChange={(event) => setJobUrl(event.target.value)}
              placeholder="https://"
              type="url"
              value={jobUrl}
            />
          </FormField>
          <FormField htmlFor="application-notes" label="Notes">
            <textarea
              id="application-notes"
              maxLength={1000}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Referral, interview context, or next action"
              rows={3}
              value={notes}
            />
          </FormField>
          <div className="form-actions">
            <button type="submit">Add application</button>
          </div>
        </form>
      </section>

      <section className="section-card">
        <div className="panel-heading">
          <div>
            <h2>Application pipeline</h2>
            <p>Search and filter without losing the detail behind each opportunity.</p>
          </div>
        </div>

        <FilterBar resultCount={filteredApplications.length}>
          <input
            aria-label="Search applications"
            className="search-field"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search company, role, location, or contact"
            type="search"
            value={searchTerm}
          />
          <select
            aria-label="Filter by application status"
            onChange={(event) => setStatusFilter(event.target.value as "All" | ApplicationStatus)}
            value={statusFilter}
          >
            <option>All</option>
            {APPLICATION_STATUSES.map((option) => <option key={option}>{option}</option>)}
          </select>
          <select
            aria-label="Sort applications"
            onChange={(event) => setSortBy(event.target.value as SortOption)}
            value={sortBy}
          >
            <option value="newest">Newest applied</option>
            <option value="oldest">Oldest applied</option>
            <option value="company">Company A–Z</option>
          </select>
        </FilterBar>

        {applications.length === 0 ? (
          <EmptyState
            description="Use the form above to add the first role in your search."
            title="No applications yet"
          />
        ) : filteredApplications.length === 0 ? (
          <EmptyState
            description="Try a broader search or clear the current status filter."
            title="No applications match"
          />
        ) : (
          <>
            <div className="table-scroll desktop-records">
              <table className="application-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Applied</th>
                    <th>Status</th>
                    <th><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((application) => (
                    <tr key={application.id}>
                      <td>
                        <strong>{application.company}</strong>
                        <DetailPanel>
                          <ApplicationDetails application={application} />
                        </DetailPanel>
                      </td>
                      <td>{application.role}</td>
                      <td>{application.location || "Not set"}</td>
                      <td>{formatDate(application.dateApplied)}</td>
                      <td>
                        <select
                          aria-label={`Update status for ${application.company}`}
                          className="compact-select"
                          onChange={(event) => handleStatusChange(
                            application.id,
                            event.target.value as ApplicationStatus
                          )}
                          value={application.status}
                        >
                          {APPLICATION_STATUSES.map((option) => <option key={option}>{option}</option>)}
                        </select>
                      </td>
                      <td className="table-actions">
                        <button
                          aria-label={`Delete ${application.company} application`}
                          className="text-button danger-text"
                          onClick={() => setPendingDelete(application)}
                          type="button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mobile-records">
              {filteredApplications.map((application) => (
                <article className="record-card" key={application.id}>
                  <div className="record-card-header">
                    <div>
                      <h3>{application.company}</h3>
                      <p>{application.role}</p>
                    </div>
                    <StatusBadge value={application.status} />
                  </div>
                  <dl className="record-meta">
                    <div><dt>Location</dt><dd>{application.location || "Not set"}</dd></div>
                    <div><dt>Applied</dt><dd>{formatDate(application.dateApplied)}</dd></div>
                  </dl>
                  <DetailPanel><ApplicationDetails application={application} /></DetailPanel>
                  <div className="record-actions">
                    <select
                      aria-label={`Update status for ${application.company}`}
                      onChange={(event) => handleStatusChange(
                        application.id,
                        event.target.value as ApplicationStatus
                      )}
                      value={application.status}
                    >
                      {APPLICATION_STATUSES.map((option) => <option key={option}>{option}</option>)}
                    </select>
                    <button
                      className="button-secondary danger-text"
                      onClick={() => setPendingDelete(application)}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      <ConfirmDialog
        description={pendingDelete
          ? `This permanently removes the ${pendingDelete.role} application at ${pendingDelete.company}.`
          : ""}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        open={Boolean(pendingDelete)}
        title="Delete application?"
      />
    </>
  );
}

function ApplicationDetails({ application }: { application: JobApplication }) {
  const safeJobUrl = application.jobUrl && !validateOptionalUrl(application.jobUrl);

  return (
    <dl className="detail-list">
      <div><dt>Salary</dt><dd>{application.salaryRange || "Not set"}</dd></div>
      <div><dt>Contact</dt><dd>{application.contactName || "Not set"}</dd></div>
      {safeJobUrl ? (
        <div>
          <dt>Posting</dt>
          <dd><a href={application.jobUrl} rel="noreferrer" target="_blank">Open job listing</a></dd>
        </div>
      ) : null}
      <div className="detail-list-wide"><dt>Notes</dt><dd>{application.notes || "No notes added."}</dd></div>
    </dl>
  );
}

export default ApplicationList;
