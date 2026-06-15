import { NavLink } from "react-router-dom";
import AppIcon from "../components/AppIcon";

type SidebarProps = {
  onNavigate?: () => void;
};

const navigation = [
  { to: "/", label: "Overview", icon: "dashboard" as const, end: true },
  { to: "/applications", label: "Applications", icon: "applications" as const },
  { to: "/projects", label: "Projects", icon: "projects" as const },
  { to: "/skills", label: "Skills", icon: "skills" as const },
  { to: "/notes", label: "Notes", icon: "notes" as const },
];

function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">CT</span>
        <span>CareerTracker</span>
      </div>

      <nav aria-label="Primary navigation" className="sidebar-nav">
        {navigation.map((item) => (
          <NavLink end={item.end} key={item.to} onClick={onNavigate} to={item.to}>
            <AppIcon name={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>Career workspace</p>
        <span>Local-first and private</span>
      </div>
    </aside>
  );
}

export default Sidebar;
