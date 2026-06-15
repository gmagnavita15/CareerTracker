import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppIcon from "../components/AppIcon";
import Sidebar from "./Sidebar";

type MainLayoutProps = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  recoveryMessages?: string[];
};

function MainLayout({
  isDarkMode,
  setIsDarkMode,
  recoveryMessages = [],
}: MainLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-layout" data-theme={isDarkMode ? "dark" : "light"}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div
        className={`sidebar-backdrop ${menuOpen ? "is-visible" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`sidebar-shell ${menuOpen ? "is-open" : ""}`}>
        <Sidebar onNavigate={() => setMenuOpen(false)} />
      </div>

      <div className="app-main">
        <header className="topbar">
          <button
            aria-expanded={menuOpen}
            aria-label="Open navigation"
            className="icon-button mobile-menu-button"
            onClick={() => setMenuOpen(true)}
            type="button"
          >
            <AppIcon name="menu" />
          </button>
          <span className="mobile-brand">CareerTracker</span>
          <button
            aria-label={isDarkMode ? "Use light theme" : "Use dark theme"}
            className="icon-button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            type="button"
          >
            <AppIcon name={isDarkMode ? "sun" : "moon"} />
          </button>
        </header>

        <main className="main-content" id="main-content">
          {recoveryMessages.length > 0 ? (
            <div className="recovery-notice" role="status">
              <strong>We recovered your workspace.</strong>
              <span>{recoveryMessages[0]}</span>
            </div>
          ) : null}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
