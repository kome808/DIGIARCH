import React, { useState } from 'react';
import { Search, SlidersHorizontal, FileText, Image, Folder } from 'lucide-react';

interface SearchResult {
    id: string;
    type: 'item' | 'case' | 'asset';
    title: string;
    description: string;
    year: string;
    keywords: string[];
}

const mockResults: SearchResult[] = [
    { id: 'AH-1964-001', type: 'item', title: '巴黎隨筆手稿', description: '本件為謝里法於1964年旅居巴黎期間之隨筆手稿，內容記載了當時的藝術思潮與生活點滴...', year: '1964', keywords: ['巴黎', '留學', '素描'] },
    { id: 'ACQ-2025-001', type: 'case', title: '謝里法 2025 年度捐贈案', description: '捐贈者謝里法擬捐贈其早年留學巴黎時期之相關文件...', year: '2025', keywords: ['捐贈', '徵集'] },
];

const TypeBadge: React.FC<{ type: SearchResult['type'] }> = ({ type }) => {
    const styles = {
        item: 'bg-indigo-100 text-indigo-700',
        case: 'bg-blue-100 text-blue-700',
        asset: 'bg-emerald-100 text-emerald-700',
    };
    const labels = { item: 'Item', case: 'Case', asset: 'Asset' };
    return <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[type]}`}>{labels[type]}</span>;
};

export const SearchPage: React.FC = () => {
    const [query, setQuery] = useState('');

    return (
        <div className="p-6 animate-fade-in max-w-5xl mx-auto">
            {/* Search Header */}
            <div className="text-center mb-8 py-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">全域整合查詢</h2>
                <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="輸入關鍵詞搜尋全宗、圖片、案件或 OCR 內容..."
                        className="w-full pl-12 pr-14 py-4 text-lg border border-slate-200 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center transition-colors shadow-md">
                        →
                    </button>
                </div>
                <div className="mt-3 text-sm text-slate-500">
                    熱門搜尋: <span className="text-indigo-600 cursor-pointer hover:underline">謝里法</span>, <span className="text-indigo-600 cursor-pointer hover:underline">巴黎</span>, <span className="text-indigo-600 cursor-pointer hover:underline">1964</span>, <span className="text-indigo-600 cursor-pointer hover:underline">手稿</span>
                </div>
            </div>

            {/* Results Area */}
            <div className="grid grid-cols-4 gap-6">
                {/* Facets */}
                <div className="col-span-1 bg-white rounded-xl border border-slate-200 p-5 h-fit shadow-sm">
                    <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                        <SlidersHorizontal size={16} /> 篩選條件
                    </h3>

                    <div className="mb-5">
                        <div className="text-sm font-medium text-indigo-600 border-b border-slate-100 pb-1 mb-2">資料類型</div>
                        <label className="flex items-center gap-2 text-sm text-slate-600 mb-1.5 cursor-pointer">
                            <input type="checkbox" defaultChecked className="rounded text-indigo-600" /> 典藏單元 (Item) (120)
                        </label>
                        <label className="flex items-center gap-2 text-sm text-slate-600 mb-1.5 cursor-pointer">
                            <input type="checkbox" className="rounded text-indigo-600" /> 數位檔案 (Asset) (450)
                        </label>
                        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="rounded text-indigo-600" /> 案件 (Case) (12)
                        </label>
                    </div>

                    <div className="mb-5">
                        <div className="text-sm font-medium text-indigo-600 border-b border-slate-100 pb-1 mb-2">年代</div>
                        <label className="flex items-center gap-2 text-sm text-slate-600 mb-1.5 cursor-pointer">
                            <input type="checkbox" className="rounded text-indigo-600" /> 1960-1969 (85)
                        </label>
                        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="rounded text-indigo-600" /> 1970-1979 (40)
                        </label>
                    </div>

                    <div>
                        <div className="text-sm font-medium text-indigo-600 border-b border-slate-100 pb-1 mb-2">權利狀態</div>
                        <label className="flex items-center gap-2 text-sm text-slate-600 mb-1.5 cursor-pointer">
                            <input type="checkbox" className="rounded text-indigo-600" /> 公開 (Public)
                        </label>
                        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="rounded text-indigo-600" /> 限館內 (On-site)
                        </label>
                    </div>
                </div>

                {/* Results */}
                <div className="col-span-3 space-y-4">
                    <div className="flex justify-between items-center text-sm text-slate-500 mb-2">
                        <span>找到 120 筆結果 (耗時 0.12 秒)</span>
                        <select className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>相關性排序</option>
                            <option>年代 (新→舊)</option>
                        </select>
                    </div>

                    {mockResults.map(result => (
                        <div key={result.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex gap-4">
                                <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 flex-shrink-0">
                                    {result.type === 'item' ? <Image size={32} /> : <Folder size={32} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <TypeBadge type={result.type} />
                                        <span className="text-xs text-slate-400 font-mono">{result.id}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-indigo-600 group-hover:underline mb-1">{result.title}</h3>
                                    <p className="text-sm text-slate-600 line-clamp-2">{result.description}</p>
                                    <div className="mt-2 text-xs text-slate-500">
                                        關鍵詞: {result.keywords.join(', ')} • 年代: {result.year}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
