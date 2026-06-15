import ApplicationList from '../components/ApplicationList';
import type { JobApplication } from '../types';
import type React from 'react';

type ApplicationsPageProps = {
    applications: JobApplication[];
    setApplications: React.Dispatch<
        React.SetStateAction<JobApplication[]>
    >;
};

function ApplicationsPage({
    applications,
    setApplications,
}: ApplicationsPageProps) {
    return (
        <ApplicationList
            applications={applications}
            setApplications={setApplications}
        />
    );
}

export default ApplicationsPage;