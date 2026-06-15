import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

type MainLayoutProps = {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

function MainLayout({ isDarkMode, setIsDarkMode }: MainLayoutProps) {
    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <button
                    className="theme-toggle"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                >
                    {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
                
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;