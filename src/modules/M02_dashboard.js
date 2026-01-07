/**
 * M02: Dashboard & Todo (首頁與待辦) - Light Mode
 */

const dashboardData = {
  stats: [
    { label: '徵集案件', value: 12, trend: '+2', icon: '📥' },
    { label: '待編目', value: 45, trend: '-5', icon: '🏷️' },
    { label: '數位化', value: 128, trend: '+12', icon: '📷' },
    { label: '提借申請', value: 5, trend: '0', icon: '🔄' },
  ],
  todos: [
    { id: 1, type: 'acquisition', title: '2025年度謝里法捐贈案 - 待評估', deadline: '2025-12-30', status: 'urgent' },
    { id: 2, type: 'ingest', title: '入庫批次 #2025-003 - 點收差異確認', deadline: '2025-12-31', status: 'normal' },
    { id: 3, type: 'digitization', title: '數位化案 #DG-2025-01 - 待 QC', deadline: '2026-01-05', status: 'normal' },
    { id: 4, type: 'metadata', title: '編目案 #CAT-2025-08 - 審核退回', deadline: 'Today', status: 'warning' },
  ],
  notifications: [
    { id: 1, type: 'system', message: '索引任務 #IDX-99 失敗，請檢查日誌', time: '10 mins ago', level: 'error' },
    { id: 2, type: 'assign', message: '王大明 指派了新的編目任務給您', time: '1 hour ago', level: 'info' },
  ],
  yearProgress: 35
};

export function renderM02Dashboard() {
  return `
    <div class="dashboard-container fade-in">
      
      <!-- Welcome Section -->
      <div class="glass-card header-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h2>早安，管理員</h2>
            <p class="text-muted">今天是 2026年1月2日，目前系統運作正常。</p>
          </div>
          <div style="text-align: right;">
            <span class="badge">Release Candidate V1.0</span>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        ${dashboardData.stats.map(stat => `
          <div class="glass-card stat-card">
            <div class="stat-icon">${stat.icon}</div>
            <div class="stat-info">
              <span class="stat-label text-muted">${stat.label}</span>
              <div class="stat-value-row">
                <span class="stat-value">${stat.value}</span>
                <span class="stat-trend" style="color: var(--color-success);">${stat.trend}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Main Columns -->
      <div class="dashboard-columns">
        
        <!-- Left Column: Todos -->
        <div class="col-main">
          <div class="glass-card">
            <div class="card-header">
              <h3>我的待辦事項</h3>
              <button class="btn btn-sm btn-secondary">查看全部</button>
            </div>
            
            <div class="todo-list">
              ${dashboardData.todos.map(todo => `
                <div class="todo-item ${todo.status}">
                  <div class="todo-icon">
                    ${getIconForType(todo.type)}
                  </div>
                  <div class="todo-content">
                    <div class="todo-title">${todo.title}</div>
                    <div class="todo-meta text-muted">
                      <span class="tag">${translateType(todo.type)}</span> • 截止: ${todo.deadline}
                    </div>
                  </div>
                  <div class="todo-action">
                     <button class="btn btn-sm btn-secondary">➔</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Overall Progress -->
          <div class="glass-card">
             <div class="card-header">
              <h3>2025 年度目標進度</h3>
            </div>
            <div class="progress-container">
               <div class="progress-bar-bg">
                 <div class="progress-bar-fill" style="width: ${dashboardData.yearProgress}%"></div>
               </div>
               <div class="progress-labels text-muted">
                 <span>已完成 ${dashboardData.yearProgress}%</span>
                 <span>目標: 100%</span>
               </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Notifications -->
        <div class="col-side">
          <div class="glass-card">
            <div class="card-header">
              <h3>通知中心</h3>
              <span class="badge" style="background: var(--color-danger);">1 新</span>
            </div>
            <div class="notification-list">
              ${dashboardData.notifications.map(notif => `
                <div class="notification-item ${notif.level}">
                   <div class="notif-message">${notif.message}</div>
                   <div class="notif-time text-muted">${notif.time}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="glass-card">
            <div class="card-header">
              <h3>系統狀態</h3>
            </div>
            <ul class="system-status-list">
              <li class="status-item ok">
                <span class="status-dot success"></span> Database Service (PostgreSQL)
              </li>
              <li class="status-item ok">
                <span class="status-dot success"></span> Search Engine (Hybrid)
              </li>
              <li class="status-item warning">
                <span class="status-dot warning"></span> AI Service (LLM/OCR) - Latency High
              </li>
              <li class="status-item ok">
                <span class="status-dot success"></span> Storage (S3)
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>

    <style>
      .dashboard-container {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 1.5rem;
      }
      
      .dashboard-columns {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1.5rem;
      }
      @media (max-width: 900px) {
        .dashboard-columns { grid-template-columns: 1fr; }
      }

      .stat-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.2rem;
      }
      .stat-icon {
        font-size: 2rem;
        background: hsl(220, 15%, 95%);
        width: 50px; height: 50px;
        display: flex; align-items: center; justify-content: center;
        border-radius: 12px;
      }
      .stat-value { font-size: 1.5rem; font-weight: 700; display: block; }
      .stat-trend { font-size: 0.9rem; margin-left: 0.5rem; }
      
      .card-header {
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--glass-border);
      }
      
      .todo-list { display: flex; flex-direction: column; gap: 0.8rem; }
      .todo-item {
        display: flex; align-items: center; gap: 1rem;
        padding: 0.8rem;
        background: hsl(220, 15%, 98%);
        border-radius: 8px;
        border-left: 3px solid transparent;
        transition: transform 0.2s;
      }
      .todo-item:hover { transform: translateX(2px); background: hsl(220, 15%, 96%); }
      .todo-item.urgent { border-left-color: var(--color-danger); }
      .todo-item.warning { border-left-color: var(--color-warning); }
      .todo-item.normal { border-left-color: var(--color-primary); }

      .todo-content { flex: 1; }
      .todo-title { font-weight: 500; margin-bottom: 0.2rem; }
      .todo-meta { font-size: 0.8rem; }
      .tag { 
        background: hsl(220, 15%, 92%); 
        padding: 2px 6px; border-radius: 4px; 
      }

      .progress-container { padding: 0.5rem 0; }
      .progress-bar-bg {
        height: 10px; background: hsl(220, 15%, 92%);
        border-radius: 5px; overflow: hidden; margin-bottom: 0.5rem;
      }
      .progress-bar-fill {
        height: 100%; background: var(--color-primary);
        box-shadow: 0 0 10px var(--color-primary-glow);
      }
      .progress-labels { display: flex; justify-content: space-between; font-size: 0.85rem; }

      .notification-list { display: flex; flex-direction: column; gap: 0.8rem; }
      .notification-item {
        padding: 0.8rem; border-radius: 8px;
        font-size: 0.9rem;
        border: 1px solid transparent;
      }
      .notification-item.error {
        background: hsla(0, 80%, 95%, 1);
        border-color: hsla(0, 50%, 80%, 1);
        color: hsl(0, 50%, 40%);
      }
      .notification-item.info {
        background: hsl(220, 15%, 98%);
      }
      .notif-time { font-size: 0.75rem; margin-top: 4px; }

      .system-status-list { list-style: none; }
      .status-item {
        display: flex; align-items: center; gap: 0.5rem;
        padding: 0.5rem 0;
        font-size: 0.9rem;
      }
    </style>
  `;
}

function getIconForType(type) {
  const map = {
    acquisition: '📥',
    ingest: '📦',
    digitization: '📷',
    metadata: '🏷️'
  };
  return map[type] || '📝';
}

function translateType(type) {
  const map = {
    acquisition: '徵集審議',
    ingest: '入庫作業',
    digitization: '數位化',
    metadata: '編目'
  };
  return map[type] || type;
}
