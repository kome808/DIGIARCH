import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AdminLayout: React.FC = () => {
    // State for mobile sidebar
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    // Close sidebar on route change (mobile)
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex h-screen overflow-hidden bg-[var(--color-bg-body)]">
            {/* Sidebar with mobile support */}
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                <Header onToggleSidebar={toggleSidebar} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 relative">
                    {/* Mobile Overlay */}
                    {sidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
                            onClick={closeSidebar}
                        />
                    )}

                    <div className="max-w-[1400px] mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
