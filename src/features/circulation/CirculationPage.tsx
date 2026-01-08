import React, { useState } from 'react';
import { Plus, Check, X, RotateCcw, Eye } from 'lucide-react';

interface Request {
    id: string;
    applicant: string;
    purpose: string;
    items: number;
    status: 'pending' | 'reviewing' | 'approved' | 'rejected' | 'returned';
    step: string;
    created_at: string;
}

const mockRequests: Request[] = [
    { id: 'REQ-2025-055', applicant: '王小美 (研究員)', purpose: '學術研究', items: 3, status: 'reviewing', step: '館長核決', created_at: '2025-12-26' },
    { id: 'REQ-2025-054', applicant: '李四 (外部人員)', purpose: '出版授權', items: 1, status: 'approved', step: '已完成', created_at: '2025-12-24' },
    { id: 'REQ-2025-053', applicant: '張三 (學生)', purpose: '論文研究', items: 5, status: 'pending', step: '承辦初審', created_at: '2025-12-22' },
];

const StatusBadge: React.FC<{ status: Request['status'] }> = ({ status }) => {
    const styles: Record<Request['status'], string> = {
        pending: 'bg-amber-100 text-amber-700',
        reviewing: 'bg-blue-100 text-blue-700',
        approved: 'bg-emerald-100 text-emerald-700',
        rejected: 'bg-red-100 text-red-700',
        returned: 'bg-slate-100 text-slate-600',
    };
    const labels: Record<Request['status'], string> = {
        pending: '待審核',
        reviewing: '審核中',
        approved: '已核准',
        rejected: '已駁回',
        returned: '退補件',
    };
    return <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>{labels[status]}</span>;
};

const StatCard: React.FC<{ value: number; label: string; color: string }> = ({ value, label, color }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-5 text-center shadow-sm">
        <div className={`text-3xl font-bold ${color}`}>{value}</div>
        <div className="text-slate-500 text-sm mt-1">{label}</div>
    </div>
);

export const CirculationPage: React.FC = () => {
    const [requests, setRequests] = useState(mockRequests);

    const handleApprove = (id: string) => {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' as const, step: '已完成' } : r));
    };

    const handleReject = (id: string) => {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' as const, step: '已駁回' } : r));
    };

    return (
        <div className="p-6 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 bg-white/70 backdrop-blur p-5 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">提借(閱)作業</h2>
                    <p className="text-slate-500 text-sm">管理實體提借、數位閱覽與授權申請</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md">
                    <Plus size={16} /> 新增申請
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <StatCard value={2} label="待審核" color="text-amber-500" />
                <StatCard value={15} label="本月核准" color="text-emerald-500" />
                <StatCard value={1} label="退回補件" color="text-red-500" />
                <StatCard value={45} label="總案件數" color="text-slate-700" />
            </div>

            {/* Request Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-700">申請案件列表</h3>
                    <select className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>所有狀態</option>
                        <option>待審核</option>
                        <option>已核准</option>
                        <option>已駁回</option>
                    </select>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50/80 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                        <tr>
                            <th className="px-6 py-3">申請單號</th>
                            <th className="px-6 py-3">申請人</th>
                            <th className="px-6 py-3">用途</th>
                            <th className="px-6 py-3">項目數</th>
                            <th className="px-6 py-3">狀態</th>
                            <th className="px-6 py-3">目前關卡</th>
                            <th className="px-6 py-3">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {requests.map(req => (
                            <tr key={req.id} className="hover:bg-indigo-50/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm text-indigo-600">{req.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-800">{req.applicant}</td>
                                <td className="px-6 py-4 text-slate-600">{req.purpose}</td>
                                <td className="px-6 py-4 text-slate-600">{req.items}</td>
                                <td className="px-6 py-4"><StatusBadge status={req.status} /></td>
                                <td className="px-6 py-4 text-slate-500 text-sm">{req.step}</td>
                                <td className="px-6 py-4">
                                    {(req.status === 'pending' || req.status === 'reviewing') ? (
                                        <div className="flex gap-1">
                                            <button onClick={() => handleApprove(req.id)} className="p-1.5 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors" title="核准"><Check size={14} /></button>
                                            <button onClick={() => handleReject(req.id)} className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors" title="駁回"><X size={14} /></button>
                                            <button className="p-1.5 bg-slate-200 text-slate-600 rounded hover:bg-slate-300 transition-colors" title="退補"><RotateCcw size={14} /></button>
                                        </div>
                                    ) : (
                                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors" title="查看"><Eye size={16} /></button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
