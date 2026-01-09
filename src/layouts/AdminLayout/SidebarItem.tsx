import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { MenuItem } from '../../config/menu';

interface Props {
    item: MenuItem;
    level?: number;
}

export const SidebarItem: React.FC<Props> = ({ item, level = 0 }) => {
    const location = useLocation();
    const [expanded, setExpanded] = useState(false);

    // Check if current path matches this item
    const isActive = location.pathname.startsWith(item.path);

    // Auto expand if child is active
    React.useEffect(() => {
        if (isActive && item.children) {
            setExpanded(true);
        }
    }, [isActive, item.children]);

    const toggleExpand = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setExpanded(!expanded);
    };

    const hasChildren = item.children && item.children.length > 0;

    // Vuexy-style indentation
    const paddingLeft = level === 0 ? '12px' : `${12 + level * 20}px`;

    // Vuexy Active State: Left border + light background + bold text
    const activeClasses = isActive && !hasChildren
        ? 'relative bg-[rgba(var(--color-primary-rgb),0.08)] text-[var(--color-primary)] font-semibold before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[var(--color-primary)] before:rounded-r-md'
        : 'text-[var(--color-text-primary)] hover:bg-gray-50';

    const content = (
        <div
            className={`
        group flex items-center justify-between py-2.5 pr-3
        rounded-md cursor-pointer transition-all duration-200
        text-sm select-none
        ${activeClasses}
      `}
            style={{ paddingLeft }}
        >
            <div className="flex items-center gap-3 flex-1 min-w-0">
                {item.icon && (
                    <item.icon
                        size={18}
                        className={`flex-shrink-0 transition-colors ${isActive && !hasChildren
                                ? 'text-[var(--color-primary)]'
                                : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]'
                            }`}
                        strokeWidth={isActive && !hasChildren ? 2.5 : 2}
                    />
                )}
                <span className={`truncate ${isActive && !hasChildren ? 'font-semibold' : 'font-medium'}`}>
                    {item.title}
                </span>
            </div>
            {hasChildren && (
                <button
                    onClick={toggleExpand}
                    className="p-1 rounded hover:bg-black/5 transition-colors flex-shrink-0"
                >
                    {expanded ? (
                        <ChevronDown size={14} className="text-[var(--color-text-secondary)]" />
                    ) : (
                        <ChevronRight size={14} className="text-[var(--color-text-secondary)]" />
                    )}
                </button>
            )}
        </div>
    );

    return (
        <div>
            {hasChildren ? (
                <div onClick={hasChildren ? undefined : toggleExpand}>{content}</div>
            ) : (
                <NavLink to={item.path} className="block no-underline">
                    {content}
                </NavLink>
            )}

            {/* Smooth expand animation */}
            {hasChildren && (
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="mt-0.5">
                        {item.children?.map(child => (
                            <SidebarItem key={child.key} item={child} level={level + 1} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
