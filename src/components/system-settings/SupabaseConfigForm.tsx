import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { SupabaseConfig } from '../../types/config';
import { ConfigService } from '../../services/ConfigService';

interface Props {
    initialConfig?: SupabaseConfig | null;
    onSave: () => void;
}

export const SupabaseConfigForm: React.FC<Props> = ({ initialConfig, onSave }) => {
    const [url, setUrl] = useState('');
    const [anonKey, setAnonKey] = useState('');
    const [schemaName, setSchemaName] = useState('digi');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const service = new ConfigService();

    useEffect(() => {
        if (initialConfig) {
            setUrl(initialConfig.url);
            setAnonKey(initialConfig.anonKey);
            setSchemaName(initialConfig.schemaName);
        }
    }, [initialConfig]);

    const handleTestConnection = async () => {
        setLoading(true);
        setMessage(null);
        const config: SupabaseConfig = { url, anonKey, schemaName };
        const success = await service.testConnection(config);
        setLoading(false);
        if (success) {
            setMessage({ type: 'success', text: '連線測試成功！' });
        } else {
            setMessage({ type: 'error', text: '連線測試失敗，請檢查 URL 與 Key。' });
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const config: SupabaseConfig = { url, anonKey, schemaName };

        // Test first
        const success = await service.testConnection(config);
        if (!success) {
            setLoading(false);
            setMessage({ type: 'error', text: '無法儲存：連線測試失敗。' });
            return;
        }

        try {
            await service.saveConfig(config);
            setLoading(false);
            setMessage({ type: 'success', text: '設定已儲存，系統將重新整理...' });

            setTimeout(() => {
                onSave();
                window.location.reload();
            }, 1500);
        } catch (err) {
            setLoading(false);
            console.error(err);
            setMessage({ type: 'error', text: '儲存失敗。' });
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div
                className="bg-white rounded-lg border border-[var(--color-border)] overflow-hidden"
                style={{ boxShadow: 'var(--shadow-card)' }}
            >
                {/* Card Header */}
                <div className="px-6 py-5 border-b border-[var(--color-border-light)] bg-[var(--color-bg-body)]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[rgba(var(--color-primary-rgb),0.1)] flex items-center justify-center text-[var(--color-primary)]">
                            <Database size={20} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[var(--color-text-primary)] leading-none">
                                Supabase 連線設定
                            </h2>
                            <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 font-medium">
                                配置後端資料庫連接參數
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                    <form onSubmit={handleSave} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                                Supabase URL
                            </label>
                            <input
                                type="url"
                                required
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://your-project.supabase.co"
                                className="
                                    w-full px-3.5 py-2.5 text-sm
                                    border border-[var(--color-border)] rounded-md
                                    bg-white
                                    focus:border-[var(--color-primary)] 
                                    focus:ring-2 focus:ring-[rgba(var(--color-primary-rgb),0.1)]
                                    transition-all outline-none
                                    placeholder:text-[var(--color-text-secondary)]
                                    font-medium
                                "
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                                Anon Key
                            </label>
                            <input
                                type="password"
                                required
                                value={anonKey}
                                onChange={(e) => setAnonKey(e.target.value)}
                                placeholder="your-anon-key"
                                className="
                                    w-full px-3.5 py-2.5 text-sm
                                    border border-[var(--color-border)] rounded-md
                                    bg-white
                                    focus:border-[var(--color-primary)] 
                                    focus:ring-2 focus:ring-[rgba(var(--color-primary-rgb),0.1)]
                                    transition-all outline-none
                                    placeholder:text-[var(--color-text-secondary)]
                                    font-medium
                                "
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                                Schema Name
                            </label>
                            <input
                                type="text"
                                value={schemaName}
                                onChange={(e) => setSchemaName(e.target.value)}
                                placeholder="digi"
                                className="
                                    w-full px-3.5 py-2.5 text-sm
                                    border border-[var(--color-border)] rounded-md
                                    bg-white
                                    focus:border-[var(--color-primary)] 
                                    focus:ring-2 focus:ring-[rgba(var(--color-primary-rgb),0.1)]
                                    transition-all outline-none
                                    placeholder:text-[var(--color-text-secondary)]
                                    font-medium
                                "
                            />
                            <p className="text-xs text-[var(--color-text-secondary)] mt-2 font-medium">
                                預設為 "digi"，這是數位典藏系統專用的 Schema。
                            </p>
                        </div>

                        {message && (
                            <div className={`
                                p-4 rounded-md flex items-start gap-3 border
                                ${message.type === 'success'
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : 'bg-red-50 text-red-700 border-red-200'
                                }
                            `}>
                                <div className="mt-0.5">
                                    {message.type === 'success' ? (
                                        <CheckCircle2 size={18} strokeWidth={2.5} />
                                    ) : (
                                        <AlertCircle size={18} strokeWidth={2.5} />
                                    )}
                                </div>
                                <span className="text-sm font-semibold">{message.text}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-3 justify-end pt-2">
                            <button
                                type="button"
                                onClick={handleTestConnection}
                                disabled={loading || !url || !anonKey}
                                className="
                                    px-5 py-2.5 text-sm font-semibold
                                    border border-[var(--color-border)] rounded-md
                                    text-[var(--color-text-primary)]
                                    hover:bg-gray-50 hover:border-gray-300
                                    transition-all
                                    disabled:opacity-40 disabled:cursor-not-allowed
                                "
                            >
                                測試連線
                            </button>
                            <button
                                type="submit"
                                disabled={loading || !url || !anonKey}
                                className="
                                    px-6 py-2.5 text-sm font-semibold
                                    bg-[var(--color-primary)] text-white rounded-md
                                    hover:bg-[var(--color-primary-dark)]
                                    active:scale-[0.98]
                                    transition-all
                                    disabled:opacity-40 disabled:cursor-not-allowed
                                "
                                style={{ boxShadow: 'var(--shadow-sm)' }}
                            >
                                {loading ? '處理中...' : '儲存並重載'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-3 bg-amber-50 border-t border-amber-100">
                    <p className="text-xs text-amber-800 font-semibold flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        注意：儲存後頁面將會重新整理以套用新連線。
                    </p>
                </div>
            </div>
        </div>
    );
};
