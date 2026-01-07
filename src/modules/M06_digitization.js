/**
 * M06: Digitization Operations (數位化作業) - Light Mode
 */

const digitJobs = [
  { id: 'DG-2025-01', title: '謝里法手稿掃描案 Phase 1', total: 500, done: 450, status: 'qc_pending' },
  { id: 'DG-2025-02', title: '書信數位化', total: 120, done: 20, status: 'in_progress' },
];

export function renderM06Digitization(path) {
  return `
    <div class="fade-in">
      <div class="glass-card" style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2>數位化作業</h2>
          <p class="text-muted">管理掃描、轉檔與品質檢核 (QC) 流程</p>
        </div>
        <button class="btn btn-primary" onclick="alert('啟動上傳 Pipeline')">⬆️ 上傳檔案</button>
      </div>

      <!-- Pipeline Status -->
      <div class="glass-card" style="margin-top: 1.5rem; padding: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; position: relative;">
          <!-- Line -->
          <div style="position: absolute; top: 20px; left: 0; width: 100%; height: 4px; background: hsl(220, 15%, 90%); z-index: 0;"></div>
          
          <!-- Steps -->
          ${renderStep('1', '檔案上傳', 'active')}
          ${renderStep('2', '轉檔處理', 'active')}
          ${renderStep('3', '詮釋對應', 'processing')}
          ${renderStep('4', 'QC 檢核', 'pending')}
          ${renderStep('5', '入庫完成', 'pending')}
        </div>
      </div>

      <!-- Job List -->
      <h3 style="margin: 1.5rem 0 1rem;">進行中任務</h3>
      <div style="display: grid; gap: 1rem;">
        ${digitJobs.map(job => `
          <div class="glass-card" style="display: flex; align-items: center; gap: 1.5rem; padding: 1rem;">
            <div style="font-size: 2rem; background: hsl(220, 15%, 95%); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
               📷
            </div>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <h4 style="margin: 0;">${job.title} <span class="text-muted" style="font-size: 0.8rem; font-weight: normal;">#${job.id}</span></h4>
                <span>${renderJobStatus(job.status)}</span>
              </div>
              
              <!-- Progress -->
              <div style="height: 6px; background: hsl(220, 15%, 92%); border-radius: 3px; overflow: hidden;">
                <div style="width: ${(job.done / job.total) * 100}%; background: var(--color-primary); height: 100%;"></div>
              </div>
              <div style="font-size: 0.8rem; margin-top: 4px; text-align: right;" class="text-muted">
                ${job.done} / ${job.total} 完成
              </div>
            </div>
            
            <div>
               <button class="btn btn-sm btn-secondary">詳細</button>
               ${job.status === 'qc_pending' ? `<button class="btn btn-sm btn-primary">進入 QC</button>` : ''}
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

function renderStep(num, label, state) {
  const colors = {
    active: 'var(--color-success)',
    processing: 'var(--color-primary)',
    pending: 'hsl(220, 15%, 80%)'
  };
  const color = colors[state] || colors.pending;
  const textColor = state === 'pending' ? 'var(--color-text-muted)' : 'var(--color-text-main)';

  return `
    <div style="position: relative; z-index: 1; text-align: center;">
      <div style="width: 40px; height: 40px; border-radius: 50%; background: ${color}; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; margin: 0 auto; box-shadow: ${state !== 'pending' ? `0 0 10px ${color}` : 'none'};">
        ${num}
      </div>
      <div style="margin-top: 0.5rem; font-size: 0.9rem; color: ${textColor};">${label}</div>
    </div>
  `;
}

function renderJobStatus(status) {
  if (status === 'qc_pending') return `<span class="badge" style="background: var(--color-warning);">待 QC</span>`;
  if (status === 'in_progress') return `<span class="badge" style="background: var(--color-primary);">處理中</span>`;
  return status;
}
