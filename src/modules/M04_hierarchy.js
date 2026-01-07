/**
 * M04: Hierarchy Management (全宗架構管理) - Light Mode
 */
import { createModal } from '../components/Modal.js';

let hierarchyData = [
  {
    id: 'F01', type: 'fonds', title: '謝里法全宗', collapsed: false,
    children: [
      {
        id: 'S01', type: 'series', title: '藝術家資料', collapsed: false,
        children: [
          { id: 'FU01', type: 'file_unit', title: '手稿', count: 12 },
          { id: 'FU02', type: 'file_unit', title: '書信', count: 45 },
          { id: 'FU03', type: 'file_unit', title: '照片', count: 128 }
        ]
      },
      {
        id: 'S02', type: 'series', title: '展覽資料', collapsed: true,
        children: []
      }
    ]
  }
];

let selectedNodeId = 'FU01';

export function renderM04Hierarchy() {
  window.m04_selectNode = selectNode;
  window.m04_addChildNode = addChildNode;
  window.m04_deleteNode = deleteNode;
  window.m04_renameNode = renameNode;

  return `
    <div class="hierarchy-container fade-in" style="display: flex; height: calc(100vh - 80px); gap: 1rem;">
      
      <!-- Left: Tree View -->
      <div class="glass-card" style="width: 320px; display: flex; flex-direction: column; padding: 1rem; overflow-y: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="font-size: 1rem;">全宗導覽</h3>
          <button class="btn btn-sm btn-primary" onclick="window.m04_addChildNode(null)">+ 新增全宗</button>
        </div>
        
        <div class="tree-root">
          ${renderTree(hierarchyData)}
        </div>
      </div>

      <!-- Right: Content Area -->
      <div class="glass-card" style="flex: 1; display: flex; flex-direction: column; overflow: hidden;">
        ${renderSelectedNodeContent()}
      </div>

    </div>

    <style>
      .tree-node { margin-left: 0.5rem; }
      .node-row { 
        display: flex; align-items: center; gap: 0.5rem; 
        padding: 6px 8px; border-radius: 4px; cursor: pointer;
        color: var(--color-text-muted);
        position: relative;
      }
      .node-row:hover { background: hsl(220, 20%, 96%); color: var(--color-text-main); }
      .node-row.active { background: hsla(var(--primary-h), 80%, 95%, 1); color: var(--color-primary); }
      
      .node-icon { font-size: 0.9rem; }
      .node-title { flex: 1; }
      .file-unit-badge { 
        background: hsl(220, 15%, 92%); font-size: 0.7rem; padding: 1px 4px; border-radius: 4px; 
        color: var(--color-text-muted);
      }
      
      .node-actions {
        display: none;
        gap: 0.25rem;
      }
      .node-row:hover .node-actions { display: flex; }
    </style>
  `;
}

function renderTree(nodes, level = 0) {
  return nodes.map(node => `
    <div class="tree-node" style="padding-left: ${level * 12}px">
      <div class="node-row ${node.id === selectedNodeId ? 'active' : ''}" onclick="window.m04_selectNode('${node.id}')">
        <span class="node-icon">${getNodeIcon(node.type)}</span>
        <span class="node-title">${node.title}</span>
        ${node.count ? `<span class="file-unit-badge">${node.count}</span>` : ''}
        <div class="node-actions" onclick="event.stopPropagation()">
          <button onclick="window.m04_addChildNode('${node.id}')" title="新增子層級">+</button>
          <button onclick="window.m04_renameNode('${node.id}')" title="重新命名">✎</button>
          <button onclick="window.m04_deleteNode('${node.id}')" title="刪除">×</button>
        </div>
      </div>
      ${node.children && node.children.length > 0 ? `
        <div class="node-children">
          ${renderTree(node.children, level + 1)}
        </div>
      ` : ''}
    </div>
  `).join('');
}

function getNodeIcon(type) {
  if (type === 'fonds') return '🏛️';
  if (type === 'series') return '📁';
  if (type === 'file_unit') return '📄';
  return '•';
}

function renderSelectedNodeContent() {
  const node = findNode(hierarchyData, selectedNodeId);
  if (!node) {
    return `<div style="padding: 2rem; text-align: center;" class="text-muted">請從左側選擇一個節點</div>`;
  }

  return `
    <div style="padding: 1rem; border-bottom: 1px solid var(--glass-border); display: flex; justify-content: space-between;">
       <div>
         <h2 style="font-size: 1.25rem;">${getNodeIcon(node.type)} ${node.title}</h2>
         <span class="text-muted">類型: ${getTypeName(node.type)}</span>
       </div>
       <div style="display: flex; gap: 0.5rem;">
         <button class="btn btn-sm btn-secondary">匯入 Excel</button>
         <button class="btn btn-sm btn-primary">新增單件</button>
       </div>
    </div>

    <div style="flex: 1; overflow-y: auto; padding: 0;">
       <table>
         <thead>
           <tr>
             <th style="padding: 0.75rem 1rem;">順序</th>
             <th style="padding: 0.75rem 1rem;">件名</th>
             <th style="padding: 0.75rem 1rem;">年代</th>
             <th style="padding: 0.75rem 1rem;">狀態</th>
             <th style="padding: 0.75rem 1rem;">操作</th>
           </tr>
         </thead>
         <tbody>
           ${renderMockItems(node.count || 5)}
         </tbody>
       </table>
    </div>
  `;
}

function getTypeName(type) {
  const map = { fonds: '全宗', series: '系列', file_unit: '案卷/卷' };
  return map[type] || type;
}

function renderMockItems(count) {
  let html = '';
  for (let i = 1; i <= Math.min(count, 10); i++) {
    html += `
      <tr>
        <td style="padding: 0.75rem 1rem;">${i}</td>
        <td style="padding: 0.75rem 1rem;">典藏品項目 ${i}</td>
        <td style="padding: 0.75rem 1rem;">196${i % 10}</td>
        <td style="padding: 0.75rem 1rem;"><span class="status-dot success"></span></td>
        <td style="padding: 0.75rem 1rem;">
           <button class="btn btn-sm btn-secondary" style="padding: 2px 6px;">✎</button>
        </td>
      </tr>
    `;
  }
  return html;
}

function selectNode(id) {
  selectedNodeId = id;
  location.reload();
}

function addChildNode(parentId) {
  const content = `
    <div class="form-group" style="margin-bottom: 1rem;">
      <label>節點名稱</label>
      <input type="text" id="new_node_title" placeholder="例如：新系列">
    </div>
    <div class="form-group">
      <label>類型</label>
      <select id="new_node_type">
        <option value="fonds">全宗 (Fonds)</option>
        <option value="series">系列 (Series)</option>
        <option value="file_unit">案卷 (File Unit)</option>
      </select>
    </div>
  `;

  const modal = createModal({
    title: parentId ? '新增子層級' : '新增全宗',
    content: content,
    confirmText: '新增',
    onConfirm: () => {
      const title = document.getElementById('new_node_title').value;
      const type = document.getElementById('new_node_type').value;

      if (!title) {
        alert('請輸入節點名稱');
        return;
      }

      const newNode = {
        id: 'N-' + Date.now(),
        type,
        title,
        children: [],
        count: 0
      };

      if (parentId) {
        const parent = findNode(hierarchyData, parentId);
        if (parent) {
          if (!parent.children) parent.children = [];
          parent.children.push(newNode);
        }
      } else {
        hierarchyData.push(newNode);
      }

      location.reload();
    }
  });

  document.body.appendChild(modal);
}

function renameNode(id) {
  const node = findNode(hierarchyData, id);
  if (!node) return;

  const content = `
    <div class="form-group">
      <label>新名稱</label>
      <input type="text" id="rename_input" value="${node.title}">
    </div>
  `;

  const modal = createModal({
    title: '重新命名',
    content: content,
    confirmText: '儲存',
    onConfirm: () => {
      const newTitle = document.getElementById('rename_input').value;
      if (newTitle) {
        node.title = newTitle;
        location.reload();
      }
    }
  });

  document.body.appendChild(modal);
}

function deleteNode(id) {
  if (!confirm('確定要刪除此節點？')) return;
  removeNodeFromTree(hierarchyData, id);
  location.reload();
}

function findNode(nodes, id) {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

function removeNodeFromTree(nodes, id) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === id) {
      nodes.splice(i, 1);
      return true;
    }
    if (nodes[i].children && removeNodeFromTree(nodes[i].children, id)) {
      return true;
    }
  }
  return false;
}
