import React, { useState } from 'react';
import { initialHierarchyData, HierarchyNode } from './data/mockData';
import { HierarchyTree } from './components/HierarchyTree';
import { NodeDetail } from './components/NodeDetail';
import { Plus } from 'lucide-react';

export const HierarchyPage: React.FC = () => {
    const [data, setData] = useState<HierarchyNode[]>(initialHierarchyData);
    const [selectedId, setSelectedId] = useState<string | null>('FU01');

    // Helper to find node
    const findNode = (nodes: HierarchyNode[], id: string): HierarchyNode | null => {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children) {
                const found = findNode(node.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    const selectedNode = selectedId ? findNode(data, selectedId) : null;

    // Actions
    const handleAddNode = (parentId: string | null) => {
        const title = prompt('請輸入新節點名稱:');
        if (!title) return;

        const newNode: HierarchyNode = {
            id: `N-${Date.now()}`,
            type: 'series', // simplified default
            title,
            children: [],
            count: 0
        };

        if (parentId === null) {
            setData([...data, newNode]);
        } else {
            // Deep clone to update immutable state
            const updateChildren = (nodes: HierarchyNode[]): HierarchyNode[] => {
                return nodes.map(node => {
                    if (node.id === parentId) {
                        return { ...node, children: [...(node.children || []), newNode] };
                    }
                    if (node.children) {
                        return { ...node, children: updateChildren(node.children) };
                    }
                    return node;
                });
            };
            setData(updateChildren(data));
        }
    };

    const handleDeleteNode = (id: string) => {
        if (!confirm('確定要刪除？')) return;

        // Recursive filter
        const filterNodes = (nodes: HierarchyNode[]): HierarchyNode[] => {
            return nodes
                .filter(n => n.id !== id)
                .map(n => ({ ...n, children: filterNodes(n.children || []) }));
        };

        setData(filterNodes(data));
        if (selectedId === id) setSelectedId(null);
    };

    return (
        <div className="flex h-full animate-fade-in relative">
            {/* Left Sidebar: Tree */}
            <div className="w-80 bg-white/50 border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-200/60 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-700">全宗導覽</h3>
                    <button
                        onClick={() => handleAddNode(null)}
                        className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-slate-500 hover:text-indigo-600 transition-all"
                        title="新增全宗"
                    >
                        <Plus size={18} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    <HierarchyTree
                        nodes={data}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                        onAdd={handleAddNode}
                        onDelete={handleDeleteNode}
                    />
                </div>
            </div>

            {/* Right Content */}
            <NodeDetail node={selectedNode} />
        </div>
    );
};
