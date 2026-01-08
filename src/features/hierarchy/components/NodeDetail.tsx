import React, { useState } from 'react';
import { HierarchyNode } from '../data/mockData';
import { School, Folder, FileText, Download, Plus, Clock, Edit } from 'lucide-react';

interface NodeDetailProps {
    node: HierarchyNode | null;
}

const NodeIcon = ({ type }: { type: string }) => {
    if (type === 'fonds') return <School size={24} className="text-amber-600" />;
    if (type === 'series') return <Folder size={24} className="text-blue-500" />;
    return <FileText size={24} className="text-slate-400" />;
};

const getTypeName = (type: string) => {
    const map: Record<string, string> = { fonds: '全宗', series: '系列', file_unit: '案卷/卷' };
    return map[type] || type;
};

export const NodeDetail: React.FC<NodeDetailProps> = ({ node }) => {
    if (!node) {
        return (
            <div className="flex-1 flex items-center justify-center text-slate-400 bg-white/50 m-6 rounded-xl border border-dashed border-slate-300">
                <p>請從左側選擇一個節點以查看內容</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col min-w-0 h-full">
            {/* Detail Header */}
            <div className="bg-white/80 backdrop-blur border-b border-slate-200 px-8 py-6">
                <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                        <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">
                            <NodeIcon type={node.type} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-1">{node.title}</h2>
                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                                    {getTypeName(node.type)}
                                </span>
                                <span className="font-mono text-xs">{node.id}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors text-sm">
                            <Download size={16} />
                            匯入 Excel
                        </button>
                        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition-colors text-sm shadow-sm">
                            <Plus size={16} />
                            新增單件
                        </button>
                    </div>
                </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-auto p-6">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="px-6 py-4">順序</th>
                                <th className="px-6 py-4">件名</th>
                                <th className="px-6 py-4">年代</th>
                                <th className="px-6 py-4">狀態</th>
                                <th className="px-6 py-4 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[...Array(Math.min(node.count || 5, 10))].map((_, i) => (
                                <tr key={i} className="hover:bg-indigo-50/30 transition-colors group">
                                    <td className="px-6 py-4 text-slate-500 font-mono text-sm">{i + 1}</td>
                                    <td className="px-6 py-4 font-medium text-slate-800">典藏品項目 {i + 1}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                                            <Clock size={14} className="text-slate-400" />
                                            196{i % 10}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors opacity-0 group-hover:opacity-100">
                                            <Edit size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {(node.count || 0) === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-slate-400">
                                        暫無內容
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
