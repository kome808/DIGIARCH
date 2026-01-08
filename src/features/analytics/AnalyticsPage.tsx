import React from 'react';
import { Download, FileText, TrendingUp, Users, BarChart2 } from 'lucide-react';

const StatCard: React.FC<{ title: string; value: string | number; change?: string; changeType?: 'up' | 'down'; color: string }> = ({ title, value, change, changeType, color }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-6 text-center shadow-sm">
        <h4 className="text-slate-500 text-sm mb-2">{title}</h4>
        <div className={`text-4xl font-bold ${color} mb-2`}>{value}</div>
        {change && (
            <div className={changeType === 'up' ? 'text-emerald-500' : 'text-red-500'}>
                {changeType === 'up' ? '▲' : '▼'} {change}
            </div>
        )}
    </div>
);

const auditLogs = [
    { time: '10:23', user: 'admin', action: 'UPDATE', actionColor: 'bg-blue-100 text-blue-700', target: 'CAT-2025-08' },
    { time: '09:58', user: '王大明', action: 'CREATE', actionColor: 'bg-emerald-100 text-emerald-700', target: 'ACQ-2025-003' },
    { time: '09:15', user: 'system', action: 'INDEX', actionColor: 'bg-amber-100 text-amber-700', target: '全文索引任務' },
];

export const AnalyticsPage: React.FC = () => {
    return (
        <div className="p-6 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 bg-white/70 backdrop-blur p-5 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">資料統計及報表</h2>
                    <p className="text-slate-500 text-sm">系統指標、審計日誌與自訂報表</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors">
                        <Download size={16} /> 匯出報表
                    </button>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md">
                        <FileText size={16} /> 自訂報表
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 mb-6">
                <StatCard title="本月新增館藏" value={156} change="12% (vs 上月)" changeType="up" color="text-indigo-600" />
                <StatCard title="數位化完成率" value="89%" change="5%" changeType="up" color="text-emerald-500" />
                <StatCard title="系統使用者" value={24} color="text-slate-700" />
            </div>

            {/* Charts & Logs */}
            <div className="grid grid-cols-2 gap-6">
                {/* Chart */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                        <BarChart2 size={18} className="text-indigo-500" /> 編目產量趨勢
                    </h3>
                    <div className="h-48 bg-gradient-to-t from-indigo-50 to-transparent rounded-lg flex items-end justify-around px-4 pb-4">
                        {[60, 75, 50, 90, 80, 100].map((h, i) => (
                            <div key={i} className="w-8 bg-indigo-500 rounded-t-md transition-all hover:bg-indigo-600" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                    <div className="flex justify-around text-xs text-slate-400 mt-2">
                        <span>7月</span><span>8月</span><span>9月</span><span>10月</span><span>11月</span><span>12月</span>
                    </div>
                </div>

                {/* Audit Log */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                        <TrendingUp size={18} className="text-slate-500" /> 審計日誌 (近期)
                    </h3>
                    <table className="w-full text-left text-sm">
                        <thead className="text-xs uppercase text-slate-400 border-b border-slate-100">
                            <tr>
                                <th className="py-2">時間</th>
                                <th className="py-2">使用者</th>
                                <th className="py-2">動作</th>
                                <th className="py-2">目標</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {auditLogs.map((log, i) => (
                                <tr key={i} className="hover:bg-slate-50/50">
                                    <td className="py-3 text-slate-500">{log.time}</td>
                                    <td className="py-3 text-slate-700 font-medium">{log.user}</td>
                                    <td className="py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${log.actionColor}`}>{log.action}</span></td>
                                    <td className="py-3 text-slate-600 font-mono text-xs">{log.target}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
