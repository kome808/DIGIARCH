
/**
 * M03: Acquisition (徵集審議作業)
 * Deep Dive: CRUD & Workflow
 */
import { createModal } from '../components/Modal.js';

// Mock Data (In-Memory State)
let acquisitionCases = [
  { id: 'ACQ-2025-001', title: '謝里法 2025 年度捐贈案', donor: '謝里法', year: '2025', status: 'evaluating', created_at: '2025-12-01' },
  { id: 'ACQ-2025-002', title: '日治時期寫真帖購藏案', donor: '古董商 A', year: '2025', status: 'draft', created_at: '2025-12-20' },
  { id: 'ACQ-2024-055', title: '陳澄波書信補遺', donor: '陳氏家屬', year: '2024', status: 'approved', created_at: '2024-11-15' },
];

export function renderM03Acquisition(path, params) {
  // Detail View
  if (params && params.length > 0) {
    const caseId = params[0];
    const caseItem = acquisitionCases.find(c => c.id === caseId);
    if (caseItem) {
      return renderCaseDetail(caseItem);
    }
  }
  // List View
  return renderCaseList();
}

// --- List View ---

function renderCaseList() {
  // We need to attach event listeners AFTER rendering, so we use a trick or delegate.
  // For vanilla JS without a framework, we can return string and assume parent handles events, 
  // or use a container and append. Let's return a container element logic.
  // But our router expects a string currently. 
  // To handle events properly (like Create Modal), we'll add a global handler or 
  // rely on 'onclick' attributes calling exported/global functions? 
  // Better: bind events after insertion. But the router does innerHTML.
  // Workaround: We will attach functions to `window` for this prototype to work with innerHTML strings.

  window.m03_openCreateModal = openCreateModal;
  window.m03_filterList = () => { /* Filter logic placeholder */ };

  return `
    <div class="fade-in">
      <div class="glass-card" style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2>徵集審議案件</h2>
          <p class="text-muted">管理所有捐贈、價購與委託徵集案件</p>
        </div>
        <button class="btn btn-primary" onclick="window.m03_openCreateModal()">+ 新增案件</button>
      </div>

      <!-- Filters -->
      <div class="glass-card" style="padding: 1rem;">
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <input type="text" placeholder="搜尋案件名稱/捐贈者..." style="min-width: 250px;">
          <select>
            <option value="">所有狀態</option>
            <option value="draft">草稿</option>
            <option value="evaluating">評估中</option>
            <option value="approved">已決議</option>
          </select>
        </div>
      </div>

      <!-- Data Table -->
      <div class="glass-card" style="padding: 0;">
        <table>
          <thead>
            <tr>
              <th style="padding: 1rem;">案件編號</th>
              <th style="padding: 1rem;">案件名稱</th>
              <th style="padding: 1rem;">來源/捐贈者</th>
              <th style="padding: 1rem;">年度</th>
              <th style="padding: 1rem;">狀態</th>
              <th style="padding: 1rem;">操作</th>
            </tr>
          </thead>
          <tbody>
            ${acquisitionCases.map(item => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 1rem; font-family: monospace; color: var(--color-primary-l);">${item.id}</td>
                <td style="padding: 1rem; font-weight: 500;">${item.title}</td>
                <td style="padding: 1rem;">${item.donor}</td>
                <td style="padding: 1rem;">${item.year}</td>
                <td style="padding: 1rem;">${renderStatusBadge(item.status)}</td>
                <td style="padding: 1rem;">
                  <button class="btn btn-sm" onclick="location.hash='/acquisition/${item.id}'">查看</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openCreateModal() {
  const content = `
    <div class="form-group" style="margin-bottom: 1rem;">
      <label>案件名稱</label>
      <input type="text" id="new_title" placeholder="例如：2026 數位典藏捐贈案">
    </div>
    <div class="form-group" style="margin-bottom: 1rem;">
      <label>捐贈者/來源</label>
      <input type="text" id="new_donor" placeholder="姓名或單位">
    </div>
    <div class="form-group">
      <label>年度</label>
      <select id="new_year">
        <option value="2025">2025</option>
        <option value="2026">2026</option>
      </select>
    </div>
  `;

  const modal = createModal({
    title: '新增徵集案件',
    content: content,
    confirmText: '建立案件',
    onConfirm: () => {
      const title = document.getElementById('new_title').value;
      const donor = document.getElementById('new_donor').value;
      const year = document.getElementById('new_year').value;

      if (!title || !donor) {
        alert('請填寫完整資訊');
        return; // NOTE: Simple validation
      }

      const newItem = {
        id: `ACQ-${year}-${Math.floor(Math.random() * 900) + 100}`,
        title, donor, year,
        status: 'draft',
        created_at: new Date().toISOString().split('T')[0]
      };

      acquisitionCases.unshift(newItem);
      // Refresh View
      location.reload(); // Simple refresh for prototype
    }
  });

  document.body.appendChild(modal);
}

// --- Detail View ---

function renderCaseDetail(item) {
  // Bind actions
  window.m03_updateStatus = (id, newStatus) => {
    const idx = acquisitionCases.findIndex(c => c.id === id);
    if (idx !== -1) {
      acquisitionCases[idx].status = newStatus;
      // Mock persistence by not reloading, just re-rendering? 
      // For router simplicity, simpler to reload or re-navigate
      location.reload();
    }
  };

  const getNextAction = (status) => {
    if (status === 'draft') return `<button class="btn btn-primary" onclick="window.m03_updateStatus('${item.id}', 'evaluating')">送出評估</button>`;
    if (status === 'evaluating') return `<button class="btn btn-primary" onclick="window.m03_updateStatus('${item.id}', 'approved')">核決通過</button>`;
    return `<button class="btn btn-secondary" disabled>已結案</button>`;
  };

  return `
    <div class="fade-in">
      <div style="margin-bottom: 1rem;">
        <a href="#/acquisition" style="color: var(--color-text-muted);">← 返回列表</a>
      </div>

      <div class="glass-card">
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <div>
            <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
               ${renderStatusBadge(item.status)}
               <span style="font-family: monospace; color: var(--color-text-muted);">${item.id}</span>
            </div>
            <h1 style="margin-bottom: 0.5rem;">${item.title}</h1>
            <p class="text-muted">捐贈者: ${item.donor} • 年度: ${item.year}</p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            ${getNextAction(item.status)}
            <button class="btn btn-secondary">編輯</button>
          </div>
        </div>
      </div>

      <!-- Workflow Progress Mock -->
      <div style="margin: 1.5rem 0; display: flex; align-items: center; gap: 1rem; opacity: 0.8;">
         ${renderStep('1. 草稿', item.status === 'draft' ? 'active' : 'completed')}
         <div style="width: 30px; height: 2px; background: #555;"></div>
         ${renderStep('2. 評估', item.status === 'evaluating' ? 'active' : (item.status === 'approved' ? 'completed' : 'pending'))}
         <div style="width: 30px; height: 2px; background: #555;"></div>
         ${renderStep('3. 決議', item.status === 'approved' ? 'completed' : 'pending')}
      </div>

      <div class="glass-card">
        <h3>案件詳細資訊</h3>
        <p class="text-muted">此處將顯示詳細的表單欄位...</p>
      </div>

    </div>
  `;
}

function renderStep(label, state) {
  const color = state === 'active' ? 'var(--color-primary)' : (state === 'completed' ? 'var(--color-success)' : '#555');
  return `<div style="color: ${color}; font-weight: bold;">${label}</div>`;
}

function renderStatusBadge(status) {
  const styles = {
    draft: { bg: '#444', color: '#ccc', label: '草稿' },
    evaluating: { bg: 'var(--color-info)', color: '#fff', label: '評估中' },
    approved: { bg: 'var(--color-success)', color: '#fff', label: '已決議' }
  };
  const s = styles[status] || styles.draft;
  return `<span style="background: ${s.bg}; color: ${s.color}; padding: 4px 8px; border-radius: 12px; font-size: 0.75rem;">${s.label}</span>`;
}
