import { useState } from "react";
import type { JobApplication, ApplicationStatus } from "../types";
import SectionHeader from "./SectionHeader";
import { 
    createApplication, 
    deleteApplication, 
    updateApplicationStatus, 
} from "../services/applicationService";
import toast from "react-hot-toast";

type ApplicationListProps = {
  applications: JobApplication[];
  setApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
};
import { APPLICATION_STATUSES } from "../constants";

function ApplicationList({ applications, setApplications }: ApplicationListProps) {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState<ApplicationStatus>("Applied");
    const [searchTerm, setSearchTerm] = useState("");

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!company.trim() || !position.trim()) {
            toast.error("Please fill in both company and position fields.");
            return;
        }

        const newApplication = createApplication(
            company,
            position,
            status
        );

        setApplications([...applications, newApplication]);
        toast.success("Application added successfully!");
        setCompany("");
        setPosition("");
        setStatus("Applied");

        
    }

    function handleDelete(id: string) {
        setApplications(
            deleteApplication(applications, id)
        );
        toast.success("Application deleted successfully!");
    }

    function handleStatusChange(id: string, newStatus: ApplicationStatus) {
        setApplications(updateApplicationStatus(applications, id, newStatus));
        toast.success("Application status updated successfully!");
    };

    const filteredApplications = applications.filter((app) => {
        const searchText = searchTerm.toLowerCase();

        return (
            app.company.toLowerCase().includes(searchText) ||
            app.role.toLowerCase().includes(searchText) ||
            app.status.toLowerCase().includes(searchText)
        );
    });

    return (
        <section className="section-card">
            <SectionHeader
                title="Job Applications"
                description="Track companies, positions, and application statuses."
            />

            <form className="application-table" onSubmit={handleSubmit}>
                <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company"
                />

                <input
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Position"
                />

                <select value={status} onChange={(e) => setStatus(e.target.value as ApplicationStatus)}>
                    {APPLICATION_STATUSES.map((statusOption) => (
                        <option key={statusOption}>{statusOption}</option>
                    ))}
                </select>

                <button type="submit">Add Application</button>

                <input
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by company, role, or status..."
                />
            </form>

            {applications.length === 0 && (
                <p className="empty-state">
                    No applications yet. Add your first job application above.
                </p>
            )}

            {filteredApplications.length > 0 && (
                <table className="application-table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Position</th>
                            <th>Status</th>
                            <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {applications.map((app) => (
                        <tr key={app.id}>
                            <td>{app.company}</td>
                            <td>{app.role}</td>
                            <td>
                                <select
                                    className="status-select"
                                    value={app.status}
                                    onChange={(e) =>
                                        handleStatusChange(app.id, e.target.value as ApplicationStatus)
                                    }
                                >
                                    {APPLICATION_STATUSES.map((statusOption) => (
                                        <option key={statusOption}>{statusOption}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(app.id)}
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

export default ApplicationList;