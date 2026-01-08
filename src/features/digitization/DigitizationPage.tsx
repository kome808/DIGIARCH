import React from 'react';
import { Upload, Camera, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface DigitJob {
    id: string;
    title: string;
    total: number;
    done: number;
    status: 'qc_pending' | 'in_progress' | 'completed';
}

const mockJobs: DigitJob[] = [
    { id: 'DG-2025-01', title: '謝里法手稿掃描案 Phase 1', total: 500, done: 450, status: 'qc_pending' },
    { id: 'DG-2025-02', title: '書信數位化', total: 120, done: 20, status: 'in_progress' },
];

const PipelineStep: React.FC<{ num: number; label: string; state: 'active' | 'processing' | 'pending' }> = ({ num, label, state }) => {
    const colors = {
        active: 'bg-emerald-500 shadow-emerald-500/30',
        processing: 'bg-indigo-500 shadow-indigo-500/30 animate-pulse',
        pending: 'bg-slate-300',
    };
    const textColor = state === 'pending' ? 'text-slate-400' : 'text-slate-700';

    return (
        <div className="flex flex-col items-center z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${colors[state]}`}>
                {num}
            </div>
            <span className={`mt-2 text-sm font-medium ${textColor}`}>{label}</span>
        </div>
    );
};

const JobCard: React.FC<{ job: DigitJob }> = ({ job }) => {
    const progress = (job.done / job.total) * 100;
    const statusStyles = {
        qc_pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: '待 QC' },
        in_progress: { bg: 'bg-indigo-100', text: 'text-indigo-700', label: '處理中' },
        completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: '已完成' },
    };
    const s = statusStyles[job.status];

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl flex items-center justify-center">
                <Camera size={28} className="text-slate-400" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="font-semibold text-slate-800 truncate">{job.title}</h4>
                        <span className="text-xs text-slate-400 font-mono">#{job.id}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${s.bg} ${s.text}`}>{s.label}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 transition-all" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="text-xs text-slate-500 mt-1 text-right">{job.done} / {job.total} 完成</div>
            </div>
            <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">詳細</button>
                {job.status === 'qc_pending' && (
                    <button className="px-3 py-1.5 text-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors">進入 QC</button>
                )}
            </div>
        </div>
    );
};

export const DigitizationPage: React.FC = () => {
    return (
        <div className="p-6 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 bg-white/70 backdrop-blur p-5 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">數位化作業</h2>
                    <p className="text-slate-500 text-sm">管理掃描、轉檔與品質檢核 (QC) 流程</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md">
                    <Upload size={16} /> 上傳檔案
                </button>
            </div>

            {/* Pipeline Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6 relative">
                <div className="absolute top-1/2 left-16 right-16 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
                <div className="flex justify-between items-center relative">
                    <PipelineStep num={1} label="檔案上傳" state="active" />
                    <PipelineStep num={2} label="轉檔處理" state="active" />
                    <PipelineStep num={3} label="詮釋對應" state="processing" />
                    <PipelineStep num={4} label="QC 檢核" state="pending" />
                    <PipelineStep num={5} label="入庫完成" state="pending" />
                </div>
            </div>

            {/* Job List */}
            <h3 className="text-lg font-semibold text-slate-700 mb-4">進行中任務</h3>
            <div className="space-y-4">
                {mockJobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
        </div>
    );
};
