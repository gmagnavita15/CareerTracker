import ProjectList from '../components/ProjectList';
import type { PortfolioProject } from '../types';

type ProjectsPageProps = {
    projects: PortfolioProject[];
    setProjects: React.Dispatch<React.SetStateAction<PortfolioProject[]>>;
};

function ProjectsPage({ projects, setProjects }: ProjectsPageProps) {
    return <ProjectList projects={projects} setProjects={setProjects} />;
}

export default ProjectsPage;