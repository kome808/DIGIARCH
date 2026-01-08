import React, { useState } from 'react';
import { Plus, Search, Filter, ChevronLeft } from 'lucide-react';

interface AcquisitionCase {
    id: string;
    title: string;
    donor: string;
    year: string;
    status: 'draft' | 'evaluating' | 'approved';
    created_at: string;
    applicationDate: string;
    method: string;
    contactPerson: string;
    contactPhone: string;
    contactEmail: string;
    address: string;
    description: string;
    quantity: string;
    condition: string;
}

const mockCases: AcquisitionCase[] = [
    {
        id: 'ACQ-2025-001',
        title: '謝里法 2025 年度捐贈案',
        donor: '謝里法',
        year: '2025',
        status: 'evaluating',
        created_at: '2025-12-01',
        applicationDate: '2025-12-01',
        method: '主動捐贈',
        contactPerson: '王小美 (秘書)',
        contactPhone: '02-2345-6789',
        contactEmail: 'wang@example.com',
        address: '100 台北市中正區重慶南路一段 122 號',
        description: '包含手稿 50 件、照片 200 張及相關出版品。主要為 1980 年代創作之相關資料。',
        quantity: '一式 (共 250 件)',
        condition: '整體保存狀況良好，部分紙張有黃化現象。'
    },
    {
        id: 'ACQ-2025-002',
        title: '日治時期寫真帖購藏案',
        donor: '古董商 A',
        year: '2025',
        status: 'draft',
        created_at: '2025-12-20',
        applicationDate: '2025-12-20',
        method: '價購',
        contactPerson: '李老闆',
        contactPhone: '0912-345-678',
        contactEmail: 'antique@shop.com',
        address: '台南市中西區',
        description: '日治時期風景寫真帖，共 3 冊。',
        quantity: '3 冊',
        condition: '封面磨損，內頁完整。'
    },
    {
        id: 'ACQ-2024-055',
        title: '陳澄波書信補遺',
        donor: '陳氏家屬',
        year: '2024',
        status: 'approved',
        created_at: '2024-11-15',
        applicationDate: '2024-11-15',
        method: '補遺捐贈',
        contactPerson: '陳先生',
        contactPhone: '-',
        contactEmail: '-',
        address: '嘉義市',
        description: '發現之未登錄書信一批。',
        quantity: '10 封',
        condition: '良好'
    },
];

const StatusBadge: React.FC<{ status: AcquisitionCase['status'] }> = ({ status }) => {
    const styles = {
        draft: 'bg-gray-200 text-gray-700',
        evaluating: 'bg-blue-500 text-white',
        approved: 'bg-emerald-500 text-white',
    };

    const labels = {
        draft: '草稿',
        evaluating: '評估中',
        approved: '已決議',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
            {labels[status]}
        </span>
    );
};

export const AcquisitionPage: React.FC = () => {
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [cases, setCases] = useState<AcquisitionCase[]>(mockCases);

    const handleCaseClick = (id: string) => {
        setSelectedId(id);
        setView('detail');
    };

    const handleBack = () => {
        setSelectedId(null);
        setView('list');
    };

    return (
        <div className="p-6 max-w-7xl mx-auto animate-fade-in">
            {view === 'list' ? (
                <>
                    <div className="flex justify-between items-center mb-6 bg-white/50 backdrop-blur p-4 rounded-xl border border-white/20 shadow-sm">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">徵集審議案件</h2>
                            <p className="text-slate-500 text-sm">管理所有捐贈、價購與委託徵集案件</p>
                        </div>
                        <button
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                            onClick={() => alert('新增功能待實作')}
                        >
                            <Plus size={18} />
                            新增案件
                        </button>
                    </div>

                    <div className="bg-white/80 backdrop-blur rounded-xl border border-white/20 shadow-sm p-4 mb-6">
                        <div className="flex gap-4 items-center">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="搜尋案件名稱/捐贈者..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50"
                                />
                            </div>
                            <select className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50 text-slate-700">
                                <option value="">所有狀態</option>
                                <option value="draft">草稿</option>
                                <option value="evaluating">評估中</option>
                                <option value="approved">已決議</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur rounded-xl border border-white/20 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="p-4 font-semibold text-slate-600">案件編號</th>
                                    <th className="p-4 font-semibold text-slate-600">案件名稱</th>
                                    <th className="p-4 font-semibold text-slate-600">來源/捐贈者</th>
                                    <th className="p-4 font-semibold text-slate-600">年度</th>
                                    <th className="p-4 font-semibold text-slate-600">狀態</th>
                                    <th className="p-4 font-semibold text-slate-600">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cases.map((item) => (
                                    <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                                        <td className="p-4 font-mono text-indigo-600 text-sm">{item.id}</td>
                                        <td className="p-4 font-medium text-slate-800">{item.title}</td>
                                        <td className="p-4 text-slate-600">{item.donor}</td>
                                        <td className="p-4 text-slate-600">{item.year}</td>
                                        <td className="p-4">
                                            <StatusBadge status={item.status} />
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleCaseClick(item.id)}
                                                className="px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                                            >
                                                查看
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <CaseDetail id={selectedId!} cases={cases} onBack={handleBack} />
            )}
        </div>
    );
};

const CaseDetail: React.FC<{ id: string, cases: AcquisitionCase[], onBack: () => void }> = ({ id, cases, onBack }) => {
    const item = cases.find(c => c.id === id);
    if (!item) return <div>Case not found</div>;

    return (
        <div className="animate-fade-in">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors"
            >
                <ChevronLeft size={20} />
                返回列表
            </button>

            <div className="bg-white/80 backdrop-blur rounded-xl border border-white/20 shadow-sm p-8 mb-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <StatusBadge status={item.status} />
                            <span className="font-mono text-slate-400 text-sm">{item.id}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">{item.title}</h1>
                        <p className="text-slate-600">
                            捐贈者: <span className="font-medium text-slate-800">{item.donor}</span>
                            <span className="mx-2 text-slate-300">•</span>
                            年度: <span className="font-medium text-slate-800">{item.year}</span>
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {item.status === 'draft' && (
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors">送出評估</button>
                        )}
                        {item.status === 'evaluating' && (
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors">核決通過</button>
                        )}
                        <button className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors">編輯</button>
                    </div>
                </div>

                {/* Stepper */}
                <div className="flex items-center justify-between py-6 px-4 bg-slate-50 rounded-lg mb-8">
                    <Step label="1. 草稿" state={item.status === 'draft' ? 'active' : 'completed'} />
                    <div className="h-0.5 flex-1 bg-slate-200 mx-4"></div>
                    <Step label="2. 評估" state={item.status === 'evaluating' ? 'active' : (item.status === 'approved' ? 'completed' : 'pending')} />
                    <div className="h-0.5 flex-1 bg-slate-200 mx-4"></div>
                    <Step label="3. 決議" state={item.status === 'approved' ? 'completed' : 'pending'} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <DetailField label="申請日期" value={item.applicationDate} />
                    <DetailField label="徵集方式" value={item.method} />
                    <DetailField label="年度" value={item.year} />

                    <DetailField label="聯絡人" value={item.contactPerson} />
                    <DetailField label="聯絡電話" value={item.contactPhone} />
                    <DetailField label="電子信箱" value={item.contactEmail} />

                    <div className="md:col-span-3">
                        <DetailField label="通訊地址" value={item.address} />
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8">
                    <h4 className="text-lg font-semibold text-indigo-700 mb-4">內容說明</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <DetailField label="數量" value={item.quantity} />
                        <DetailField label="保存狀況" value={item.condition} />
                        <div className="md:col-span-2">
                            <DetailField label="內容描述" value={item.description} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const Step: React.FC<{ label: string, state: 'pending' | 'active' | 'completed' }> = ({ label, state }) => {
    const colors = {
        pending: 'text-slate-400 font-normal',
        active: 'text-blue-600 font-semibold',
        completed: 'text-emerald-500 font-medium',
    };
    return <div className={`${colors[state]} whitespace-nowrap`}>{label}</div>;
};

const DetailField: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div>
        <div className="text-sm text-slate-500 mb-1">{label}</div>
        <div className="text-base text-slate-900 font-medium">{value || '-'}</div>
    </div>
);
