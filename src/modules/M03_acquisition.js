
/**
 * M03: Acquisition (徵集審議作業)
 * Deep Dive: CRUD & Workflow
 */
import { createModal } from '../components/Modal.js';

// Mock Data (In-Memory State)
let acquisitionCases = [
  {
    id: 'ACQ-2025-001',
    title: '謝里法 2025 年度捐贈案',
    donor: '謝里法',
    year: '2025',
    status: 'evaluating',
    created_at: '2025-12-01',
    // Detailed Info
    applicationDate: '2025-12-01',
    method: '主動捐贈',
    contactPerson: '王小美 (秘書)',
    contactPhone: '02-2345-6789',
    contactEmail: 'wang@example.com',
    address: '100 台北市中正區重慶南路一段 122 號',
    description: '包含手稿 50 件、照片 200 張及相關出版品。主要為 1980 年代創作之相關資料。',
    quantity: '一式 (共 250 件)',
    condition: '整體保存狀況良好，部分紙張有黃化現象。'
  },
  {
    id: 'ACQ-2025-002',
    title: '日治時期寫真帖購藏案',
    donor: '古董商 A',
    year: '2025',
    status: 'draft',
    created_at: '2025-12-20',
    applicationDate: '2025-12-20',
    method: '價購',
    contactPerson: '李老闆',
    contactPhone: '0912-345-678',
    contactEmail: 'antique@shop.com',
    address: '台南市中西區',
    description: '日治時期風景寫真帖，共 3 冊。',
    quantity: '3 冊',
    condition: '封面磨損，內頁完整。'
  },
  {
    id: 'ACQ-2024-055',
    title: '陳澄波書信補遺',
    donor: '陳氏家屬',
    year: '2024',
    status: 'approved',
    created_at: '2024-11-15',
    applicationDate: '2024-11-15',
    method: '補遺捐贈',
    contactPerson: '陳先生',
    contactPhone: '-',
    contactEmail: '-',
    address: '嘉義市',
    description: '發現之未登錄書信一批。',
    quantity: '10 封',
    condition: '良好'
  },
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
        <a href="#/acquisition" style="color: var(--color-text-muted); text-decoration: none; display: flex; align-items: center; gap: 0.5rem;">
           <span>←</span> 返回列表
        </a>
      </div>

      <div class="glass-card" style="padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 0.75rem;">
               ${renderStatusBadge(item.status)}
               <span style="font-family: monospace; color: var(--color-text-muted); font-size: 0.9rem;">${item.id}</span>
            </div>
            <h1 style="margin: 0 0 0.5rem 0; font-size: 1.75rem; font-weight: 600;">${item.title}</h1>
            <p class="text-muted" style="margin: 0;">捐贈者: ${item.donor} <span style="margin: 0 0.5rem;">•</span> 年度: ${item.year}</p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            ${getNextAction(item.status)}
            <button class="btn btn-secondary" style="background: #eef2f6; color: #555; border: 1px solid #d0d7de;">編輯</button>
          </div>
        </div>
      </div>

      <!-- Workflow Progress Stepper -->
      <div style="margin: 2rem 0; padding: 0 1rem;">
        <div style="display: flex; align-items: center;">
             ${renderStep('1. 草稿', item.status === 'draft' ? 'active' : 'completed')}
             <div style="flex: 1; height: 2px; background: #e0e0e0; margin: 0 1rem;"></div>
             ${renderStep('2. 評估', item.status === 'evaluating' ? 'active' : (item.status === 'approved' ? 'completed' : 'pending'))}
             <div style="flex: 1; height: 2px; background: #e0e0e0; margin: 0 1rem;"></div>
             ${renderStep('3. 決議', item.status === 'approved' ? 'completed' : 'pending')}
        </div>
      </div>

      <div class="glass-card" style="padding: 2rem;">
        <h3 style="margin-top: 0; margin-bottom: 1.5rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; font-size: 1.25rem;">案件詳細資訊</h3>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 2rem;">
            ${renderDetailField('申請日期', item.applicationDate)}
            ${renderDetailField('徵集方式', item.method)}
            ${renderDetailField('年度', item.year)}
            
            ${renderDetailField('聯絡人', item.contactPerson)}
            ${renderDetailField('聯絡電話', item.contactPhone)}
            ${renderDetailField('電子信箱', item.contactEmail)}
            
            <div style="grid-column: span 3;">
               ${renderDetailField('通訊地址', item.address)}
            </div>
        </div>

        <h4 style="margin-bottom: 1rem; color: var(--color-primary); font-size: 1rem;">內容說明</h4>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
            ${renderDetailField('數量', item.quantity)}
            ${renderDetailField('保存狀況', item.condition)}
            <div style="grid-column: span 2;">
                ${renderDetailField('內容描述', item.description)}
            </div>
        </div>

      </div>
    </div>
  `;
}

function renderStep(label, state) {
  let color = '#999';
  let fontWeight = '400';

  if (state === 'active') {
    color = '#2563eb'; // Blue
    fontWeight = '600';
  } else if (state === 'completed') {
    color = '#10b981'; // Green
    fontWeight = '500';
  }

  return `
    <div style="color: ${color}; font-weight: ${fontWeight}; white-space: nowrap;">
      ${label}
    </div>
  `;
}

function renderStatusBadge(status) {
  const styles = {
    draft: { bg: '#e5e7eb', color: '#374151', label: '草稿' },
    evaluating: { bg: '#3b82f6', color: '#fff', label: '評估中' },
    approved: { bg: '#10b981', color: '#fff', label: '已決議' }
  };
  const s = styles[status] || styles.draft;
  // Use inline-block for proper alignment
  return `<span style="background: ${s.bg}; color: ${s.color}; padding: 4px 12px; border-radius: 9999px; font-size: 0.8rem; display: inline-block; font-weight: 500;">${s.label}</span>`;
}

function renderDetailField(label, value) {
  return `
    <div>
      <div style="font-size: 0.85rem; color: #6b7280; margin-bottom: 0.25rem;">${label}</div>
      <div style="font-size: 1rem; color: #111827; font-weight: 500;">${value || '-'}</div>
    </div>
  `;
}
