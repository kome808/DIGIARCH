import React from 'react';
import {
    Search,
    LayoutDashboard,
    Archive,
    FolderTree,
    PackagePlus,
    ScanLine,
    FileText,
    Globe,
    BookOpen,
    BarChart3,
    Settings,
    Menu
} from 'lucide-react';

const getPageTitle = (path: string): string => {
    const titles: Record<string, string> = {
        '/unified_search': '整合查詢',
        '/dashboard': '首頁與待辦',
        '/acquisition': '徵集審議 (M03)',
        '/hierarchy': '全宗架構 (M04)',
        '/ingest': '入庫作業 (M05)',
        '/digitization': '數位化 (M06)',
        '/metadata': '詮釋資料 (M07)',
        '/cms': '網站管理 (M08)',
        '/circulation': '提借(閱) (M09)',
        '/analytics': '統計報表 (M10)',
        '/settings': '系統設定 (M11)',
    };
    return titles[path] || '功能頁面';
};


interface NavItemProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${active
            ? 'bg-indigo-50/10 text-white border-r-4 border-indigo-400'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
    >
        <Icon size={18} />
        <span className="text-sm font-medium">{label}</span>
    </div>
);

export const AppLayout: React.FC<{
    children: React.ReactNode;
    activePath: string;
    onNavigate: (path: string) => void;
}> = ({ children, activePath, onNavigate }) => {

    const handleNav = (path: string) => {
        onNavigate(path);
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20">
                <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white">D</div>
                    <span className="font-bold text-lg tracking-tight">現代化數位典藏</span>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">主要功能</div>

                    <NavItem icon={Search} label="整合查詢" active={activePath === '/unified_search'} onClick={() => handleNav('/unified_search')} />
                    <NavItem icon={LayoutDashboard} label="首頁與待辦" active={activePath === '/dashboard'} onClick={() => handleNav('/dashboard')} />

                    <div className="my-4 border-t border-slate-800 mx-4"></div>
                    <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">典藏管理</div>

                    <NavItem icon={Archive} label="徵集審議 (M03)" active={activePath === '/acquisition'} onClick={() => handleNav('/acquisition')} />
                    <NavItem icon={FolderTree} label="全宗架構 (M04)" active={activePath === '/hierarchy'} onClick={() => handleNav('/hierarchy')} />
                    <NavItem icon={PackagePlus} label="入庫作業 (M05)" active={activePath === '/ingest'} onClick={() => handleNav('/ingest')} />
                    <NavItem icon={ScanLine} label="數位化 (M06)" active={activePath === '/digitization'} onClick={() => handleNav('/digitization')} />
                    <NavItem icon={FileText} label="詮釋資料 (M07)" active={activePath === '/metadata'} onClick={() => handleNav('/metadata')} />
                    <NavItem icon={Globe} label="網站管理 (M08)" active={activePath === '/cms'} onClick={() => handleNav('/cms')} />
                    <NavItem icon={BookOpen} label="提借(閱) (M09)" active={activePath === '/circulation'} onClick={() => handleNav('/circulation')} />
                    <NavItem icon={BarChart3} label="統計報表 (M10)" active={activePath === '/analytics'} onClick={() => handleNav('/analytics')} />

                    <div className="mt-auto"></div>
                    <NavItem icon={Settings} label="系統設定 (M11)" active={activePath === '/settings'} onClick={() => handleNav('/settings')} />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50/50">
                <header className="h-16 bg-white/80 backdrop-blur border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <button className="text-slate-500 hover:text-slate-700 lg:hidden">
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl font-semibold text-slate-800">
                            {getPageTitle(activePath)}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="text-right hidden md:block">
                                <div className="text-sm font-medium text-slate-800">Admin User</div>
                                <div className="text-xs text-slate-500">系統管理員</div>
                            </div>
                            <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-medium">
                                AD
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-0 relative">
                    {children}
                </div>
            </main>
        </div>
    );
};
