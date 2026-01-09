import React, { useEffect, useState } from 'react';
import { SupabaseConfigForm } from '../../components/system-settings/SupabaseConfigForm';
import { ConfigService } from '../../services/ConfigService';
import { SupabaseConfig } from '../../types/config';

export const SupabaseConfigPage: React.FC = () => {
    const [config, setConfig] = useState<SupabaseConfig | null>(null);
    const service = new ConfigService();

    useEffect(() => {
        const current = service.getCurrentConfig();
        if (current) {
            setConfig(current);
        }
    }, []);

    return (
        <div className="py-6">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                    系統連線設定
                </h1>
                <p className="text-sm text-[var(--color-text-secondary)] font-medium">
                    管理數位典藏系統與 Supabase 後端服務的整合設定
                </p>
            </div>

            <SupabaseConfigForm
                initialConfig={config}
                onSave={() => { /* Handled by reload in Form */ }}
            />
        </div>
    );
};
