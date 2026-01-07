/**
 * M09: Circulation (提借閱作業) - Light Mode
 */
import { createModal } from '../components/Modal.js';

let requests = [
  { id: 'REQ-2025-055', applicant: '王小美 (研究員)', purpose: '學術研究', items: 3, status: 'reviewing', step: '館長核決', created_at: '2025-12-26' },
  { id: 'REQ-2025-054', applicant: '李四 (外部人員)', purpose: '出版授權', items: 1, status: 'approved', step: '已完成', created_at: '2025-12-24' },
  { id: 'REQ-2025-053', applicant: '張三 (學生)', purpose: '論文研究', items: 5, status: 'pending', step: '承辦初審', created_at: '2025-12-22' },
];

export function renderM09Circulation(path) {
  window.m09_approveRequest = approveRequest;
  window.m09_rejectRequest = rejectRequest;
  window.m09_returnRequest = returnRequest;
  window.m09_viewDetail = viewDetail;

  return `
    <div class="fade-in">
       <div class="glass-card" style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2>提借(閱)作業</h2>
          <p class="text-muted">管理實體提借、數位閱覽與授權申請</p>
        </div>
        <button class="btn btn-primary" onclick="alert('開啟新增申請表單')">+ 新增申請</button>
      </div>

      <!-- Stats -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1.5rem 0;">
        <div class="glass-card" style="text-align: center; padding: 1rem;">
          <div style="font-size: 2rem; font-weight: bold; color: var(--color-warning);">2</div>
          <div class="text-muted">待審核</div>
        </div>
        <div class="glass-card" style="text-align: center; padding: 1rem;">
          <div style="font-size: 2rem; font-weight: bold; color: var(--color-success);">15</div>
          <div class="text-muted">本月核准</div>
        </div>
        <div class="glass-card" style="text-align: center; padding: 1rem;">
          <div style="font-size: 2rem; font-weight: bold; color: var(--color-danger);">1</div>
          <div class="text-muted">退回補件</div>
        </div>
        <div class="glass-card" style="text-align: center; padding: 1rem;">
          <div style="font-size: 2rem; font-weight: bold; color: var(--color-text-main);">45</div>
          <div class="text-muted">總案件數</div>
        </div>
      </div>

      <div class="glass-card" style="margin-top: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3>申請案件列表</h3>
          <select>
            <option>所有狀態</option>
            <option>待審核</option>
            <option>已核准</option>
            <option>已駁回</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th style="padding: 1rem;">申請單號</th>
              <th style="padding: 1rem;">申請人</th>
              <th style="padding: 1rem;">用途</th>
              <th style="padding: 1rem;">項目數</th>
              <th style="padding: 1rem;">狀態</th>
              <th style="padding: 1rem;">目前關卡</th>
              <th style="padding: 1rem;">操作</th>
            </tr>
          </thead>
          <tbody>
            ${requests.map(req => `
              <tr>
                <td style="padding: 1rem; font-family: monospace;">${req.id}</td>
                <td style="padding: 1rem;">${req.applicant}</td>
                <td style="padding: 1rem;">${req.purpose}</td>
                <td style="padding: 1rem;">${req.items}</td>
                <td style="padding: 1rem;">${renderStatusBadge(req.status)}</td>
                <td style="padding: 1rem; font-size: 0.9rem;" class="text-muted">${req.step}</td>
                <td style="padding: 1rem;">
                  ${renderActionButtons(req)}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderStatusBadge(status) {
  const styles = {
    pending: { bg: 'var(--color-warning)', label: '待審核' },
    reviewing: { bg: 'var(--color-info)', label: '審核中' },
    approved: { bg: 'var(--color-success)', label: '已核准' },
    rejected: { bg: 'var(--color-danger)', label: '已駁回' },
    returned: { bg: 'hsl(220, 15%, 70%)', label: '退補件' }
  };
  const s = styles[status] || styles.pending;
  return `<span class="badge" style="background: ${s.bg};">${s.label}</span>`;
}

function renderActionButtons(req) {
  if (req.status === 'approved' || req.status === 'rejected') {
    return `<button class="btn btn-sm" onclick="window.m09_viewDetail('${req.id}')">查看</button>`;
  }

  return `
    <div style="display: flex; gap: 0.25rem;">
      <button class="btn btn-sm" style="background: var(--color-success); color: white;" onclick="window.m09_approveRequest('${req.id}')">核准</button>
      <button class="btn btn-sm" style="background: var(--color-danger); color: white;" onclick="window.m09_rejectRequest('${req.id}')">駁回</button>
      <button class="btn btn-sm btn-secondary" onclick="window.m09_returnRequest('${req.id}')">退補</button>
    </div>
  `;
}

function approveRequest(id) {
  const req = requests.find(r => r.id === id);
  if (req) {
    req.status = 'approved';
    req.step = '已完成';
    alert(`申請單 ${id} 已核准！`);
    location.reload();
  }
}

function rejectRequest(id) {
  const content = `
    <div class="form-group">
      <label>駁回原因</label>
      <textarea id="reject_reason" rows="4" placeholder="請說明駁回原因..."></textarea>
    </div>
  `;

  const modal = createModal({
    title: '駁回申請',
    content: content,
    confirmText: '確認駁回',
    onConfirm: () => {
      const reason = document.getElementById('reject_reason').value;
      const req = requests.find(r => r.id === id);
      if (req) {
        req.status = 'rejected';
        req.step = '已駁回';
        alert(`申請單 ${id} 已駁回。原因: ${reason || '(無)'}`);
        location.reload();
      }
    }
  });

  document.body.appendChild(modal);
}

function returnRequest(id) {
  const content = `
    <div class="form-group">
      <label>補件說明</label>
      <textarea id="return_reason" rows="4" placeholder="請說明需要補充的資料..."></textarea>
    </div>
  `;

  const modal = createModal({
    title: '退回補件',
    content: content,
    confirmText: '確認退回',
    onConfirm: () => {
      const reason = document.getElementById('return_reason').value;
      const req = requests.find(r => r.id === id);
      if (req) {
        req.status = 'returned';
        req.step = '待補件';
        alert(`申請單 ${id} 已退回補件。說明: ${reason || '(無)'}`);
        location.reload();
      }
    }
  });

  document.body.appendChild(modal);
}

function viewDetail(id) {
  alert(`查看申請單詳情: ${id}`);
}
