import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import DashboardPage from "./pages/DashboardPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import NotesPage from "./pages/NotesPage";

import useLocalStorage from "./hooks/useLocalStorage";
import { STORAGE_KEYS } from "./constants";
import {
  migrateApplication,
  migrateNote,
  migrateProject,
  migrateSkill,
  parseStoredBoolean,
  parseStoredCollection,
} from "./services/storageService";

import type {
  JobApplication,
  Skill,
  PortfolioProject,
  CareerNote,
} from "./types";

function App() {
  const [applications, setApplications, applicationRecovery] =
    useLocalStorage<JobApplication[]>(
      STORAGE_KEYS.applications,
      [],
      (rawValue) => parseStoredCollection(rawValue, migrateApplication)
    );

  const [skills, setSkills, skillRecovery] =
    useLocalStorage<Skill[]>(
      STORAGE_KEYS.skills,
      [],
      (rawValue) => parseStoredCollection(rawValue, migrateSkill)
    );

  const [projects, setProjects, projectRecovery] =
    useLocalStorage<PortfolioProject[]>(
      STORAGE_KEYS.projects,
      [],
      (rawValue) => parseStoredCollection(rawValue, migrateProject)
    );

  const [notes, setNotes, noteRecovery] =
    useLocalStorage<CareerNote[]>(
      STORAGE_KEYS.notes,
      [],
      (rawValue) => parseStoredCollection(rawValue, migrateNote)
    );

  const [isDarkMode, setIsDarkMode, themeRecovery] = useLocalStorage<boolean>(
    STORAGE_KEYS.theme,
    false,
    (rawValue) => parseStoredBoolean(rawValue, false)
  );

  const recoveryMessages = [
    applicationRecovery,
    skillRecovery,
    projectRecovery,
    noteRecovery,
    themeRecovery,
  ]
    .filter((recovery) => recovery.recovered)
    .map((recovery) => recovery.message);

  return (
      <BrowserRouter>
        <Routes>
          <Route 
            element={
              <MainLayout
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                recoveryMessages={recoveryMessages}
              />
                }
                  >
          <Route
            path="/"
            element={
              <DashboardPage
                applications={applications}
                skills={skills}
                projects={projects}
                notes={notes}
              />
            }
          />

          <Route
            path="/applications"
            element={
              <ApplicationsPage
                applications={applications}
                setApplications={setApplications}
              />
            }
          />

          <Route
            path="/skills"
            element={
              <SkillsPage
                skills={skills}
                setSkills={setSkills}
              />
            }
          />

          <Route
            path="/projects"
            element={
              <ProjectsPage
                projects={projects}
                setProjects={setProjects}
              />
            }
          />

          <Route
            path="/notes"
            element={
              <NotesPage
                notes={notes}
                setNotes={setNotes}
              />
            }
          />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
