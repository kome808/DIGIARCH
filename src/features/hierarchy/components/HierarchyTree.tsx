import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText, School, Edit, Trash2, Plus } from 'lucide-react';
import { HierarchyNode } from '../data/mockData';

interface HierarchyTreeProps {
    nodes: HierarchyNode[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    onAdd: (parentId: string) => void;
    onDelete: (id: string) => void;
}

const NodeIcon = ({ type }: { type: string }) => {
    if (type === 'fonds') return <School size={16} className="text-amber-600" />;
    if (type === 'series') return <Folder size={16} className="text-blue-500" />;
    return <FileText size={16} className="text-slate-400" />;
};

export const HierarchyTree: React.FC<HierarchyTreeProps> = ({ nodes, selectedId, onSelect, onAdd, onDelete }) => {
    return (
        <div className="pl-2">
            {nodes.map(node => (
                <TreeNode
                    key={node.id}
                    node={node}
                    selectedId={selectedId}
                    onSelect={onSelect}
                    onAdd={onAdd}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

const TreeNode: React.FC<{
    node: HierarchyNode;
    selectedId: string | null;
    onSelect: (id: string) => void;
    onAdd: (parentId: string) => void;
    onDelete: (id: string) => void;
}> = ({ node, selectedId, onSelect, onAdd, onDelete }) => {
    const [expanded, setExpanded] = useState(true);
    const isSelected = selectedId === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="select-none">
            <div
                className={`
          group flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-colors
          ${isSelected ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'}
        `}
                onClick={() => onSelect(node.id)}
            >
                <button
                    onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                    className={`p-0.5 rounded hover:bg-black/5 ${!hasChildren && node.type === 'file_unit' ? 'opacity-0' : ''}`}
                >
                    {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>

                <NodeIcon type={node.type} />
                <span className="text-sm font-medium truncate flex-1">{node.title}</span>

                {node.count !== undefined && (
                    <span className="text-xs bg-slate-100 text-slate-500 px-1.5 rounded">{node.count}</span>
                )}

                <div className="hidden group-hover:flex gap-1">
                    <button onClick={(e) => { e.stopPropagation(); onAdd(node.id); }} className="p-1 hover:bg-slate-200 rounded text-slate-500"><Plus size={12} /></button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(node.id); }} className="p-1 hover:bg-red-100 rounded text-red-500"><Trash2 size={12} /></button>
                </div>
            </div>

            {expanded && hasChildren && (
                <div className="ml-4 border-l border-slate-200 pl-1">
                    <HierarchyTree
                        nodes={node.children}
                        selectedId={selectedId}
                        onSelect={onSelect}
                        onAdd={onAdd}
                        onDelete={onDelete}
                    />
                </div>
            )}
        </div>
    );
};
