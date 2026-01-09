import React from 'react';
import { SidebarItem } from './SidebarItem';
import { MENU_ITEMS } from '../../config/menu';

interface Props {
    isOpen?: boolean;
    onClose?: () => void;
}

export const Sidebar: React.FC<Props> = ({ isOpen = false, onClose }) => {
    return (
        <aside
            id="main-sidebar"
            role="navigation"
            aria-label="主選單"
            aria-hidden={!isOpen} // For mobile contexts mainly, though on desktop it's always visible
            className={`
                fixed inset-y-0 left-0 z-30 
                w-[260px] h-full flex flex-col 
                bg-white border-r border-[var(--color-border)] 
                transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0
                ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
            `}
            style={{
                boxShadow: isOpen ? '0 0 15px rgba(0,0,0,0.1)' : undefined,
            }}
        >
            {/* Logo Section */}
            <div className="px-6 py-5 border-b border-[var(--color-border-light)] flex justify-between items-center">
                <div role="heading" aria-level={1} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center text-white font-bold text-sm shadow-md">
                        DA
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-[var(--color-text-primary)] leading-none tracking-tight">
                            數位典藏系統
                        </h1>
                        <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5 font-medium">
                            Digital Archive
                        </p>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <div className="flex-1 px-3 py-4 overflow-y-auto">
                <nav className="space-y-0.5">
                    {MENU_ITEMS.map((item) => (
                        <SidebarItem key={item.key} item={item} />
                    ))}
                </nav>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-[var(--color-border-light)]">
                <div className="flex items-center justify-between text-[11px] text-[var(--color-text-secondary)] font-medium">
                    <span>v1.0.0</span>
                    <span className="opacity-60">2026</span>
                </div>
            </div>
        </aside>
    );
};
