import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header
            className="
        h-[70px] flex items-center justify-between px-6
        bg-white border-b border-[var(--color-border)]
        sticky top-0 z-20 transition-all duration-300
      "
            style={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
            }}
        >
            <div className="flex items-center gap-4">
                <button className="p-2 -ml-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-md transition-colors md:hidden">
                    <Menu size={20} />
                </button>

                {/* Vuexy-style Search Bar */}
                <div className="hidden md:flex items-center relative group">
                    <Search
                        size={16}
                        className="absolute left-3.5 text-[var(--color-text-secondary)] group-focus-within:text-[var(--color-primary)] transition-colors pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="搜尋 (Ctrl+/)"
                        className="
               pl-10 pr-4 py-2 w-80 
               bg-[var(--color-bg-body)] 
               border border-[var(--color-border)] 
               focus:border-[var(--color-primary)] 
               focus:bg-white
               focus:ring-2 focus:ring-[rgba(var(--color-primary-rgb),0.1)]
               rounded-md text-sm transition-all outline-none
               placeholder:text-[var(--color-text-secondary)]
               font-medium
             "
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Notification Bell */}
                <button className="relative p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-md transition-colors">
                    <Bell size={20} strokeWidth={2} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Divider */}
                <div className="h-8 w-px bg-[var(--color-border)]"></div>

                {/* User Profile */}
                <button className="flex items-center gap-3 pl-1 pr-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="User"
                        className="w-9 h-9 rounded-full bg-white shadow-sm border border-[var(--color-border)]"
                    />
                    <div className="hidden md:flex flex-col items-start">
                        <span className="text-sm font-semibold text-[var(--color-text-primary)] leading-none">Admin User</span>
                        <span className="text-xs text-[var(--color-text-secondary)] font-medium mt-1">系統管理員</span>
                    </div>
                </button>
            </div>
        </header>
    );
};
