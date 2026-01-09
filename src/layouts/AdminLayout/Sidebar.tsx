import React from 'react';
import { SidebarItem } from './SidebarItem';
import { MENU_ITEMS } from '../../config/menu';

export const Sidebar: React.FC = () => {
    return (
        <div
            className="w-[260px] flex-shrink-0 h-full overflow-y-auto flex flex-col bg-white border-r border-[var(--color-border)] transition-all duration-300"
            style={{
                boxShadow: 'var(--shadow-sm)',
            }}
        >
            {/* Logo Section */}
            <div className="px-6 py-5 border-b border-[var(--color-border-light)]">
                <div className="flex items-center gap-3">
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
        </div>
    );
};
