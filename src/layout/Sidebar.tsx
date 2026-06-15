import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2 className="sidebar-title">Dev Dashboard</h2>

            <nav className="sidebar-nav">
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/applications">Applications</NavLink>
                <NavLink to="/skills">Skills</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/notes">Notes</NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;