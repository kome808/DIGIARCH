import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';
import { SupabaseConfigPage } from './pages/system-settings/SupabaseConfigPage';

// Placeholder Pages
const Dashboard = () => <h1 className="text-2xl font-bold">儀表板</h1>;
const NotFound = () => <h1 className="text-2xl font-bold text-red-500">404 - Page Not Found</h1>;

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />

                    <Route path="dashboard" element={<Dashboard />} />

                    {/* 系統設定 module */}
                    <Route path="system-settings">
                        <Route path="connection" element={<SupabaseConfigPage />} />
                    </Route>

                    {/* Fallback for implemented routes placeholder */}
                    <Route path="*" element={<div className="p-4 text-gray-500">功能開發中...</div>} />
                </Route>

                {/* Redirect root to admin */}
                <Route path="/" element={<Navigate to="/admin" replace />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
