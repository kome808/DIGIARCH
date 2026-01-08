import React, { useState } from 'react';
import { Users, Shield, Bot, Settings2, Plus, Edit, Key } from 'lucide-react';

interface User {
    id: string;
    name: string;
    role: string;
    email: string;
    status: 'active' | 'inactive';
}

const mockUsers: User[] = [
    { id: 'u001', name: 'admin', role: '系統管理員', email: 'admin@museum.org', status: 'active' },
    { id: 'u002', name: '王大明', role: '編目人員', email: 'wang@museum.org', status: 'active' },
    { id: 'u003', name: '李小華', role: '數位化人員', email: 'li@museum.org', status: 'active' },
];

const tabs = [
    { id: 'users', label: '使用者管理', icon: Users },
    { id: 'roles', label: '角色與權限', icon: Shield },
    { id: 'ai', label: 'AI 配置', icon: Bot },
    { id: 'system', label: '系統參數', icon: Settings2 },
];

export const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('users');

    return (
        <div className="p-6 animate-fade-in">
            {/* Header */}
            <div className="bg-white/70 backdrop-blur p-5 rounded-xl border border-slate-200 shadow-sm mb-6">
                <h2 className="text-2xl font-bold text-slate-800">系統設定</h2>
                <p className="text-slate-500 text-sm">使用者管理、角色權限與 AI 服務配置</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-slate-200 mb-6">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-[2px] ${activeTab === tab.id
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Users Tab Content */}
            {activeTab === 'users' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-semibold text-slate-700">使用者列表</h3>
                        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors text-sm shadow-sm">
                            <Plus size={14} /> 新增使用者
                        </button>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/80 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                            <tr>
                                <th className="px-6 py-3">帳號</th>
                                <th className="px-6 py-3">角色</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">狀態</th>
                                <th className="px-6 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockUsers.map(user => (
                                <tr key={user.id} className="hover:bg-indigo-50/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-800">{user.name}</td>
                                    <td className="px-6 py-4 text-slate-600">{user.role}</td>
                                    <td className="px-6 py-4 text-slate-500 text-sm">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${user.status === 'active' ? 'text-emerald-600' : 'text-red-500'}`}>
                                            <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                            {user.status === 'active' ? '啟用' : '停用'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button className="px-2 py-1 text-xs bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded transition-colors flex items-center gap-1"><Edit size={12} /> 編輯</button>
                                            <button className="px-2 py-1 text-xs bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded transition-colors flex items-center gap-1"><Key size={12} /> 重設密碼</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* AI Config Tab Content */}
            {activeTab === 'ai' && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-700 mb-6 flex items-center gap-2"><Bot size={18} className="text-indigo-500" /> AI 服務配置</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <FormField label="LLM 服務端點" value="https://api.openai.com/v1/chat/completions" readOnly />
                        <FormField label="OCR 服務端點" value="https://ocr.museum.internal/api/v1" readOnly />
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Embedding Model</label>
                            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>text-embedding-3-small</option>
                                <option>text-embedding-ada-002</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">AI 建議功能</label>
                            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>啟用</option>
                                <option>停用</option>
                            </select>
                        </div>
                    </div>
                    <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors shadow-sm">儲存設定</button>
                </div>
            )}

            {/* Placeholder for other tabs */}
            {(activeTab === 'roles' || activeTab === 'system') && (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
                    <Settings2 size={48} className="mx-auto mb-4 opacity-30" />
                    <p>此功能尚在開發中</p>
                </div>
            )}
        </div>
    );
};

const FormField: React.FC<{ label: string; value: string; readOnly?: boolean }> = ({ label, value, readOnly }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input
            type="text"
            value={value}
            readOnly={readOnly}
            className={`w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none ${readOnly ? 'bg-slate-50 text-slate-500' : 'focus:ring-2 focus:ring-indigo-500'}`}
        />
    </div>
);
