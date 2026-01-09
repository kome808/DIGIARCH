import React, { useEffect, useState } from 'react';
import { AcquisitionCase } from '../../types/acquisition';
import { AcquisitionService } from '../../services/acquisition/AcquisitionService';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    FileText,
    User,
    Calendar,
    ChevronRight,
    Loader2,
    AlertCircle
} from 'lucide-react';

const StatusBadge = ({ status }: { status: AcquisitionCase['status'] }) => {
    const colors: Record<string, string> = {
        '草稿': 'bg-gray-100 text-gray-800 border-gray-200',
        '評估中': 'bg-blue-100 text-blue-800 border-blue-200',
        '審議中': 'bg-purple-100 text-purple-800 border-purple-200',
        '已核定': 'bg-green-100 text-green-800 border-green-200',
        '已撤案': 'bg-red-100 text-red-800 border-red-200',
        '已結案': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};

const CaseListPage: React.FC = () => {
    const [cases, setCases] = useState<AcquisitionCase[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                setLoading(true);
                const data = await AcquisitionService.getAllCases();
                setCases(data);
                setError(null);
            } catch (err: any) {
                setError(err.message || '無法載入案件資料');
            } finally {
                setLoading(false);
            }
        };

        fetchCases();
    }, []);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">徵集審議作業</h1>
                    <p className="text-sm text-gray-500 mt-1">管理與評估所有捐贈及徵集案件</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                        <Filter className="w-4 h-4" />
                        篩選
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#7367F0] text-white rounded-lg text-sm font-medium hover:bg-[#655bd3] transition-colors shadow-sm shadow-indigo-100">
                        <Plus className="w-4 h-4" />
                        新增案件
                    </button>
                </div>
            </div>

            {/* Search & Statistics Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-3 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="搜尋案件編號、名稱或申請人..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7367F0]/20 focus:border-[#7367F0] outline-none transition-all"
                    />
                </div>
                <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">總計案件</span>
                    <span className="text-lg font-bold text-[#7367F0]">{cases.length}</span>
                </div>
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <Loader2 className="w-10 h-10 text-[#7367F0] animate-spin mb-4" />
                    <p className="text-gray-500">正在獲取最新案件資料...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-8 flex flex-col items-center text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                    <h3 className="text-lg font-bold text-red-900 mb-2">發生錯誤</h3>
                    <p className="text-red-700 max-w-md">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                        重新整理嘗試
                    </button>
                </div>
            ) : cases.length === 0 ? (
                <div className="bg-white border border-dashed border-gray-300 rounded-2xl py-20 flex flex-col items-center text-center">
                    <FileText className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">尚無案件資料</h3>
                    <p className="text-gray-500 max-w-sm mb-8">目前系統中尚未建立任何徵集案件，請點選上方按鈕開始新增。</p>
                    <button className="px-6 py-2 bg-[#7367F0] text-white rounded-lg hover:bg-[#655bd3] transition-all text-sm font-medium">
                        立即建立第一筆案件
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {cases.map((item) => (
                        <div key={item.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-50 transition-all group border-b-4 border-b-transparent hover:border-b-[#7367F0]">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2 bg-indigo-50 text-[#7367F0] rounded-lg">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <StatusBadge status={item.status} />
                                        <button className="text-gray-400 hover:text-gray-600 p-1">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-[#7367F0] transition-colors">{item.title}</h3>
                                    <p className="text-xs text-indigo-500 font-mono mt-1 font-semibold">{item.case_no}</p>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 h-10 mb-6 leading-relaxed">
                                    {item.description || '暫無說明描述內容...'}
                                </p>
                                <div className="space-y-3 pt-5 border-t border-gray-50 text-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <User className="w-4 h-4" />
                                            <span>申請人</span>
                                        </div>
                                        <span className="font-medium text-gray-700">{item.applicant || '--'}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Calendar className="w-4 h-4" />
                                            <span>預計結案</span>
                                        </div>
                                        <span className="font-medium text-gray-700">{item.target_date || '未設定'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 flex items-center justify-between group/footer">
                                <span className="text-xs text-gray-400">更新於 {new Date(item.updated_at).toLocaleDateString()}</span>
                                <button className="flex items-center gap-1 text-sm font-bold text-[#7367F0] hover:gap-2 transition-all">
                                    查看詳情
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CaseListPage;
