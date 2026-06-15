type IconName =
  | "applications"
  | "briefcase"
  | "dashboard"
  | "external"
  | "menu"
  | "moon"
  | "notes"
  | "projects"
  | "search"
  | "skills"
  | "sun"
  | "trash"
  | "x";

type AppIconProps = {
  name: IconName;
  size?: number;
};

const paths: Record<IconName, React.ReactNode> = {
  applications: <><path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" /><path d="M4 7h16v12H4z" /><path d="M9 11h6" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></>,
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  external: <><path d="M14 3h7v7M10 14 21 3" /><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  moon: <path d="M20.5 14.5A8 8 0 0 1 9.5 3.5 9 9 0 1 0 20.5 14.5Z" />,
  notes: <><path d="M5 3h14v18H5z" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  projects: <path d="M4 5h6l2 2h8v12H4z" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  skills: <><path d="M12 3 4 7v5c0 5 3.4 8.8 8 10 4.6-1.2 8-5 8-10V7z" /><path d="m9 12 2 2 4-4" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" /></>,
  x: <path d="m6 6 12 12M18 6 6 18" />,
};

function AppIcon({ name, size = 18 }: AppIconProps) {
  return (
    <svg aria-hidden="true" className="app-icon" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
        {paths[name]}
      </g>
    </svg>
  );
}

export default AppIcon;
