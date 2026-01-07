/**
 * M05: Ingest Operations (入庫作業管理) - Light Mode
 */

const accessionBatches = [
  { id: 'ACC-2025-001', title: '謝里法捐贈首批入庫', items: 120, status: 'checking', location: '庫房 A-01-02' },
  { id: 'ACC-2025-002', title: '早期期刊點收', items: 50, status: 'completed', location: '庫房 B-05-01' },
];

export function renderM05Ingest(path) {
  return `
    <div class="fade-in">
      <div class="glass-card" style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2>入庫作業管理</h2>
          <p class="text-muted">點收批次、驗收與庫房管理</p>
        </div>
        <div>
          <button class="btn btn-secondary">庫房地圖</button>
          <button class="btn btn-primary">+ 建立批次</button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; margin-top: 1.5rem;">
        
        <!-- Batches List -->
        <div class="glass-card">
          <h3 style="margin-bottom: 1rem;">📋 入庫批次</h3>
          <table>
             <thead>
               <tr>
                 <th style="padding: 0.5rem;">批次號</th>
                 <th style="padding: 0.5rem;">名稱</th>
                 <th style="padding: 0.5rem;">數量</th>
                 <th style="padding: 0.5rem;">狀態</th>
                 <th style="padding: 0.5rem;">庫位</th>
               </tr>
             </thead>
             <tbody>
               ${accessionBatches.map(batch => `
                 <tr>
                   <td style="padding: 0.8rem 0.5rem; font-family: monospace;">${batch.id}</td>
                   <td style="padding: 0.8rem 0.5rem;">${batch.title}</td>
                   <td style="padding: 0.8rem 0.5rem;">${batch.items}</td>
                   <td style="padding: 0.8rem 0.5rem;">${renderStatus(batch.status)}</td>
                   <td style="padding: 0.8rem 0.5rem; font-size: 0.9rem;" class="text-muted">${batch.location}</td>
                 </tr>
               `).join('')}
             </tbody>
          </table>
        </div>

        <!-- Right: Tasks / Alerts -->
        <div style="display: flex; flex-direction: column; gap: 1rem;">
           <div class="glass-card" style="background: hsla(0, 80%, 95%, 1); border-color: hsla(0, 50%, 80%, 0.5);">
             <h4 style="color: var(--color-danger); margin-bottom: 0.5rem;">⚠️ 點收異常 (2)</h4>
             <ul style="font-size: 0.9rem; padding-left: 1.2rem;">
               <li>ACC-2025-001: 缺件 2 件</li>
               <li>ACC-2025-001: 破損 1 件 (需修護)</li>
             </ul>
             <button class="btn btn-sm btn-secondary" style="margin-top: 1rem;">處理異常</button>
           </div>
           
           <div class="glass-card">
              <h4>庫房使用率</h4>
              <div style="margin-top: 1rem; position: relative; height: 150px; background: hsl(220, 15%, 95%); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                 <span style="font-size: 1.5rem; font-weight: bold; color: var(--color-primary);">78%</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  `;
}

function renderStatus(status) {
  if (status === 'checking') return `<span style="color: var(--color-warning);">⏳ 點收中</span>`;
  if (status === 'completed') return `<span style="color: var(--color-success);">✅ 已入庫</span>`;
  return status;
}
