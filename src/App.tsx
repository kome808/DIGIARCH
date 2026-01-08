import React, { useState } from 'react';
import { AppLayout } from './components/AppLayout';
import { AcquisitionPage } from './features/acquisition/AcquisitionPage';
import { HierarchyPage } from './features/hierarchy/HierarchyPage';
import { IngestPage } from './features/ingest/IngestPage';
import { DigitizationPage } from './features/digitization/DigitizationPage';
import { MetadataPage } from './features/metadata/MetadataPage';
import { CMSPage } from './features/cms/CMSPage';
import { CirculationPage } from './features/circulation/CirculationPage';
import { AnalyticsPage } from './features/analytics/AnalyticsPage';
import { SettingsPage } from './features/settings/SettingsPage';
import { SearchPage } from './features/search/SearchPage';
import { DashboardPage } from './features/dashboard/DashboardPage';

function App() {
    const [activePath, setActivePath] = useState('/dashboard');

    const renderContent = () => {
        switch (activePath) {
            case '/unified_search':
                return <SearchPage />;
            case '/dashboard':
                return <DashboardPage />;
            case '/acquisition':
                return <AcquisitionPage />;
            case '/hierarchy':
                return <HierarchyPage />;
            case '/ingest':
                return <IngestPage />;
            case '/digitization':
                return <DigitizationPage />;
            case '/metadata':
                return <MetadataPage />;
            case '/cms':
                return <CMSPage />;
            case '/circulation':
                return <CirculationPage />;
            case '/analytics':
                return <AnalyticsPage />;
            case '/settings':
                return <SettingsPage />;
            default:
                return <DashboardPage />;
        }
    };

    return (
        <AppLayout activePath={activePath} onNavigate={setActivePath}>
            {renderContent()}
        </AppLayout>
    );
}

export default App;
