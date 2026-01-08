import React from 'react';
import { Package, MapPin, AlertTriangle, Plus, BarChart2 } from 'lucide-react';

interface AccessionBatch {
    id: string;
    title: string;
    items: number;
    status: 'checking' | 'completed';
    location: string;
}

const mockBatches: AccessionBatch[] = [
    { id: 'ACC-2025-001', title: '謝里法捐贈首批入庫', items: 120, status: 'checking', location: '庫房 A-01-02' },
    { id: 'ACC-2025-002', title: '早期期刊點收', items: 50, status: 'completed', location: '庫房 B-05-01' },
];

const StatusBadge: React.FC<{ status: AccessionBatch['status'] }> = ({ status }) => {
    const styles = {
        checking: 'bg-amber-100 text-amber-700',
        completed: 'bg-emerald-100 text-emerald-700',
    };
    const labels = { checking: '⏳ 點收中', completed: '✅ 已入庫' };
    return <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>{labels[status]}</span>;
};

export const IngestPage: React.FC = () => {
    return (
        <div className="p-6 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 bg-white/70 backdrop-blur p-5 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">入庫作業管理</h2>
                    <p className="text-slate-500 text-sm">點收批次、驗收與庫房管理</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors">
                        <MapPin size={16} /> 庫房地圖
                    </button>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md">
                        <Plus size={16} /> 建立批次
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Batches Table */}
                <div className="col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                        <Package size={18} className="text-slate-500" />
                        <h3 className="font-semibold text-slate-700">入庫批次</h3>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/80 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                            <tr>
                                <th className="px-6 py-3">批次號</th>
                                <th className="px-6 py-3">名稱</th>
                                <th className="px-6 py-3">數量</th>
                                <th className="px-6 py-3">狀態</th>
                                <th className="px-6 py-3">庫位</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockBatches.map(batch => (
                                <tr key={batch.id} className="hover:bg-indigo-50/30 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm text-indigo-600">{batch.id}</td>
                                    <td className="px-6 py-4 font-medium text-slate-800">{batch.title}</td>
                                    <td className="px-6 py-4 text-slate-600">{batch.items}</td>
                                    <td className="px-6 py-4"><StatusBadge status={batch.status} /></td>
                                    <td className="px-6 py-4 text-slate-500 text-sm">{batch.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-4">
                    {/* Alerts */}
                    <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                        <div className="flex items-center gap-2 text-red-700 font-semibold mb-3">
                            <AlertTriangle size={18} />
                            點收異常 (2)
                        </div>
                        <ul className="text-sm text-red-600 space-y-1 list-disc list-inside">
                            <li>ACC-2025-001: 缺件 2 件</li>
                            <li>ACC-2025-001: 破損 1 件 (需修護)</li>
                        </ul>
                        <button className="mt-4 w-full bg-white border border-red-200 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg text-sm transition-colors">
                            處理異常
                        </button>
                    </div>

                    {/* Storage Usage */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <div className="flex items-center gap-2 text-slate-700 font-semibold mb-4">
                            <BarChart2 size={18} />
                            庫房使用率
                        </div>
                        <div className="h-32 bg-gradient-to-br from-indigo-50 to-slate-100 rounded-lg flex items-center justify-center">
                            <span className="text-4xl font-bold text-indigo-600">78%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
