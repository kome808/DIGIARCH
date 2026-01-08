import React, { useState } from 'react';
import { Eye, Send, FileText, Folder, Plus, Layout, Type, Image } from 'lucide-react';

interface SiteNode {
    id: string;
    title: string;
    type: 'page' | 'section';
    children?: SiteNode[];
}

const mockSiteTree: SiteNode[] = [
    { id: 'home', title: '首頁', type: 'page' },
    { id: 'about', title: '關於我們', type: 'page' },
    {
        id: 'collections', title: '數位典藏', type: 'section', children: [
            { id: 'browse', title: '瀏覽典藏', type: 'page' },
            { id: 'themes', title: '主題策展', type: 'page' }
        ]
    }
];

const SiteTreeNode: React.FC<{ node: SiteNode; level?: number }> = ({ node, level = 0 }) => (
    <div style={{ paddingLeft: `${level * 16}px` }}>
        <div className="flex items-center gap-2 py-2 px-3 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors group">
            {node.type === 'section' ? <Folder size={16} className="text-amber-500" /> : <FileText size={16} className="text-slate-400" />}
            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{node.title}</span>
        </div>
        {node.children?.map(child => <SiteTreeNode key={child.id} node={child} level={level + 1} />)}
    </div>
);

export const CMSPage: React.FC = () => {
    const [selectedPage] = useState('home');

    return (
        <div className="flex h-full animate-fade-in">
            {/* Left: Sitemap */}
            <div className="w-72 border-r border-slate-200 bg-white/50 p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                        <Layout size={16} /> 網站地圖
                    </h3>
                </div>
                <div className="space-y-1">
                    {mockSiteTree.map(node => <SiteTreeNode key={node.id} node={node} />)}
                </div>
                <button className="mt-4 w-full py-2 text-sm bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Plus size={14} /> 新增頁面
                </button>
            </div>

            {/* Right: Block Editor */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6 bg-white/70 backdrop-blur p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">網站管理 (CMS)</h2>
                        <p className="text-slate-500 text-sm">管理前台網站結構與內容</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors">
                            <Eye size={16} /> 預覽前台
                        </button>
                        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md">
                            <Send size={16} /> 發布變更
                        </button>
                    </div>
                </div>

                {/* Block Editor Area */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-700 mb-6">區塊編輯器 <span className="text-slate-400 font-normal">({selectedPage})</span></h3>

                    {/* Hero Block */}
                    <div className="mb-4 p-4 border border-dashed border-slate-200 rounded-lg hover:border-indigo-300 transition-colors group">
                        <div className="text-xs text-slate-400 mb-2 flex items-center gap-1"><Image size={12} /> Hero Banner</div>
                        <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-2xl font-semibold shadow-inner">
                            典藏雲歡迎您
                        </div>
                    </div>

                    {/* Featured Items Block */}
                    <div className="mb-4 p-4 border border-dashed border-slate-200 rounded-lg hover:border-indigo-300 transition-colors">
                        <div className="text-xs text-slate-400 mb-2">Featured Items</div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-24 bg-slate-100 rounded-lg animate-pulse"></div>
                            <div className="h-24 bg-slate-100 rounded-lg animate-pulse"></div>
                            <div className="h-24 bg-slate-100 rounded-lg animate-pulse"></div>
                        </div>
                    </div>

                    {/* Text Block */}
                    <div className="mb-4 p-4 border border-dashed border-slate-200 rounded-lg hover:border-indigo-300 transition-colors">
                        <div className="text-xs text-slate-400 mb-2 flex items-center gap-1"><Type size={12} /> Text Block</div>
                        <p className="text-slate-600">歡迎來到典藏雲，這裡收藏了豐富的歷史文獻與藝術資產...</p>
                    </div>

                    <button className="w-full py-3 text-sm bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium">
                        <Plus size={16} /> 新增區塊
                    </button>
                </div>
            </div>
        </div>
    );
};
