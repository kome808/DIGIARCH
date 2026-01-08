import React, { useState } from 'react';
import { Sparkles, Save, Send, FileText } from 'lucide-react';

interface CatalogItem {
    id: string;
    title: string;
    identifier: string;
    status: 'draft' | 'submitted';
    metadata: {
        title: string;
        creator: string;
        date: string;
        description: string;
        keywords: string;
        language: string;
        format: string;
        extent: string;
    };
    aiSuggestions: {
        keywords: string[];
        description: string;
    };
}

const initialItem: CatalogItem = {
    id: 'CAT-2025-08',
    title: '巴黎隨筆手稿',
    identifier: 'AH-1964-001',
    status: 'draft',
    metadata: {
        title: '巴黎隨筆手稿',
        creator: '謝里法',
        date: '1964-05-20',
        description: '此為謝里法於巴黎留學期間之手稿...',
        keywords: '巴黎, 留學, 素描',
        language: '中文',
        format: '紙本',
        extent: '35頁'
    },
    aiSuggestions: {
        keywords: ['藝術史', '法國', '現代藝術'],
        description: '建議補充：本件手稿記錄了藝術家在巴黎高等美術學院的學習歷程...'
    }
};

export const MetadataPage: React.FC = () => {
    const [item, setItem] = useState(initialItem);

    const updateField = (field: keyof CatalogItem['metadata'], value: string) => {
        setItem(prev => ({
            ...prev,
            metadata: { ...prev.metadata, [field]: value }
        }));
    };

    const acceptKeyword = (keyword: string) => {
        const current = item.metadata.keywords;
        updateField('keywords', current ? `${current}, ${keyword}` : keyword);
    };

    const acceptDescription = () => {
        updateField('description', item.aiSuggestions.description);
    };

    return (
        <div className="flex h-full animate-fade-in">
            {/* Left: Editor */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'draft' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-700'}`}>
                                {item.status === 'draft' ? '草稿 v1.2' : '已提交'}
                            </span>
                            <h2 className="text-2xl font-bold text-slate-800 mt-2">{item.title}</h2>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors">
                                <Save size={16} /> 儲存草稿
                            </button>
                            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
                                <Send size={16} /> 提交審核
                            </button>
                        </div>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="題名 (Title)" value={item.metadata.title} onChange={v => updateField('title', v)} />
                        <FormField label="作者 (Creator)" value={item.metadata.creator} onChange={v => updateField('creator', v)} />
                        <FormField label="年代 (Date)" value={item.metadata.date} onChange={v => updateField('date', v)} type="date" />
                        <FormField label="語言" value={item.metadata.language} onChange={v => updateField('language', v)} />
                        <FormField label="格式" value={item.metadata.format} onChange={v => updateField('format', v)} />
                        <FormField label="數量/頁數" value={item.metadata.extent} onChange={v => updateField('extent', v)} />

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">描述 (Description)</label>
                            <textarea
                                value={item.metadata.description}
                                onChange={e => updateField('description', e.target.value)}
                                className="w-full h-24 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">關鍵詞 (Keywords)</label>
                            <input
                                type="text"
                                value={item.metadata.keywords}
                                onChange={e => updateField('keywords', e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: AI Panel */}
            <div className="w-96 border-l border-slate-200 bg-slate-50/50 p-6 space-y-6 overflow-y-auto">
                {/* AI Suggestions */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles size={18} className="text-indigo-500" />
                        <h3 className="font-semibold text-slate-700">AI 編目建議</h3>
                        <span className="ml-auto px-2 py-0.5 bg-indigo-100 text-indigo-600 text-xs rounded font-medium">New</span>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm font-medium text-slate-600 mb-2">建議關鍵詞:</p>
                        <div className="flex flex-wrap gap-2">
                            {item.aiSuggestions.keywords.map(k => (
                                <button
                                    key={k}
                                    onClick={() => acceptKeyword(k)}
                                    className="px-3 py-1 bg-indigo-500 text-white text-sm rounded-full hover:bg-indigo-600 transition-colors"
                                >
                                    + {k}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-slate-600 mb-2">建議描述優化:</p>
                        <p className="text-sm text-slate-500 mb-3">{item.aiSuggestions.description}</p>
                        <button
                            onClick={acceptDescription}
                            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                        >
                            套用建議
                        </button>
                    </div>
                </div>

                {/* OCR Preview */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <FileText size={18} className="text-slate-500" />
                        <h3 className="font-semibold text-slate-700">OCR 文字</h3>
                        <span className="ml-auto text-xs text-slate-400">辨識率 92%</span>
                    </div>
                    <div className="text-sm text-slate-600 space-y-2 leading-relaxed">
                        <p>1964年 5月20日 巴黎 晴</p>
                        <p>今天在塞納河畔寫生，遇見了一位日本畫家...</p>
                        <p>下午前往羅浮宮，臨摹德拉克洛瓦...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FormField: React.FC<{ label: string; value: string; onChange: (v: string) => void; type?: string }> = ({ label, value, onChange, type = 'text' }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
    </div>
);
