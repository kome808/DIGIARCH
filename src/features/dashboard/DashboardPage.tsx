import React from 'react';
import { Inbox, Camera, Package, Tag, ArrowRight, AlertCircle, Database, SearchIcon, Bot, HardDrive, Bell } from 'lucide-react';

interface StatCard {
    label: string;
    value: number;
    trend: string;
    icon: React.ElementType;
}

interface Todo {
    id: number;
    type: 'acquisition' | 'ingest' | 'digitization' | 'metadata';
    title: string;
    deadline: string;
    status: 'urgent' | 'warning' | 'normal';
}

const stats: StatCard[] = [
    { label: '徵集案件', value: 12, trend: '+2', icon: Inbox },
    { label: '待編目', value: 45, trend: '-5', icon: Tag },
    { label: '數位化', value: 128, trend: '+12', icon: Camera },
    { label: '提借申請', value: 5, trend: '0', icon: Package },
];

const todos: Todo[] = [
    { id: 1, type: 'acquisition', title: '2025年度謝里法捐贈案 - 待評估', deadline: '2025-12-30', status: 'urgent' },
    { id: 2, type: 'ingest', title: '入庫批次 #2025-003 - 點收差異確認', deadline: '2025-12-31', status: 'normal' },
    { id: 3, type: 'digitization', title: '數位化案 #DG-2025-01 - 待 QC', deadline: '2026-01-05', status: 'normal' },
    { id: 4, type: 'metadata', title: '編目案 #CAT-2025-08 - 審核退回', deadline: 'Today', status: 'warning' },
];

const notifications = [
    { id: 1, message: '索引任務 #IDX-99 失敗，請檢查日誌', time: '10 mins ago', level: 'error' as const },
    { id: 2, message: '王大明 指派了新的編目任務給您', time: '1 hour ago', level: 'info' as const },
];

const systemStatus = [
    { name: 'Database Service (PostgreSQL)', status: 'ok', icon: Database },
    { name: 'Search Engine (Hybrid)', status: 'ok', icon: SearchIcon },
    { name: 'AI Service (LLM/OCR)', status: 'warning', icon: Bot },
    { name: 'Storage (S3)', status: 'ok', icon: HardDrive },
];

const typeLabels: Record<Todo['type'], string> = {
    acquisition: '徵集審議',
    ingest: '入庫作業',
    digitization: '數位化',
    metadata: '編目',
};

export const DashboardPage: React.FC = () => {
    const yearProgress = 35;

    return (
        <div className="p-6 animate-fade-in max-w-6xl mx-auto">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 mb-6 text-white shadow-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">早安，管理員</h2>
                        <p className="text-indigo-100">今天是 2026年1月8日，目前系統運作正常。</p>
                    </div>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">Release Candidate V1.0</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                            <stat.icon size={24} className="text-indigo-500" />
                        </div>
                        <div>
                            <div className="text-sm text-slate-500">{stat.label}</div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
                                <span className="text-sm text-emerald-500 font-medium">{stat.trend}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Columns */}
            <div className="grid grid-cols-3 gap-6">
                {/* Left: Todos */}
                <div className="col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                            <h3 className="font-semibold text-slate-700">我的待辦事項</h3>
                            <button className="text-sm text-indigo-600 hover:underline">查看全部</button>
                        </div>
                        <div className="space-y-3">
                            {todos.map(todo => (
                                <div key={todo.id} className={`flex items-center gap-4 p-4 bg-slate-50 rounded-xl border-l-4 hover:bg-slate-100 transition-colors cursor-pointer ${todo.status === 'urgent' ? 'border-red-500' : todo.status === 'warning' ? 'border-amber-500' : 'border-indigo-500'
                                    }`}>
                                    <div className="flex-1">
                                        <div className="font-medium text-slate-800 mb-1">{todo.title}</div>
                                        <div className="text-xs text-slate-500">
                                            <span className="bg-slate-200 px-2 py-0.5 rounded mr-2">{typeLabels[todo.type]}</span>
                                            截止: {todo.deadline}
                                        </div>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <h3 className="font-semibold text-slate-700 mb-4">2025 年度目標進度</h3>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all" style={{ width: `${yearProgress}%` }}></div>
                        </div>
                        <div className="flex justify-between text-sm text-slate-500">
                            <span>已完成 {yearProgress}%</span>
                            <span>目標: 100%</span>
                        </div>
                    </div>
                </div>

                {/* Right: Notifications & Status */}
                <div className="space-y-6">
                    {/* Notifications */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                            <h3 className="font-semibold text-slate-700 flex items-center gap-2"><Bell size={16} /> 通知中心</h3>
                            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium">1 新</span>
                        </div>
                        <div className="space-y-3">
                            {notifications.map(notif => (
                                <div key={notif.id} className={`p-3 rounded-lg text-sm ${notif.level === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-50 text-slate-600'}`}>
                                    <div className="flex items-start gap-2">
                                        {notif.level === 'error' && <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />}
                                        <div>
                                            <div>{notif.message}</div>
                                            <div className="text-xs text-slate-400 mt-1">{notif.time}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <h3 className="font-semibold text-slate-700 mb-4">系統狀態</h3>
                        <div className="space-y-2">
                            {systemStatus.map((s, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm">
                                    <span className={`w-2.5 h-2.5 rounded-full ${s.status === 'ok' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                    <s.icon size={14} className="text-slate-400" />
                                    <span className="text-slate-600">{s.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
