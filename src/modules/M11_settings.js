/**
 * M11: System Settings (系統設定) - Light Mode
 */

const users = [
  { id: 'u001', name: 'admin', role: '系統管理員', email: 'admin@museum.org', status: 'active' },
  { id: 'u002', name: '王大明', role: '編目人員', email: 'wang@museum.org', status: 'active' },
  { id: 'u003', name: '李小華', role: '數位化人員', email: 'li@museum.org', status: 'active' },
];

export function renderM11Settings(path) {
  return `
    <div class="fade-in">
       <div class="glass-card">
         <h2>系統設定</h2>
         <p class="text-muted">使用者管理、角色權限與 AI 服務配置</p>
       </div>

       <!-- Tabs -->
       <div style="display: flex; gap: 1rem; border-bottom: 1px solid var(--glass-border); margin-bottom: 1.5rem;">
          <div class="settings-tab active" style="padding: 0.75rem 1rem; cursor: pointer; border-bottom: 2px solid var(--color-primary); color: var(--color-primary); font-weight: 600;">使用者管理</div>
          <div class="settings-tab" style="padding: 0.75rem 1rem; cursor: pointer; color: var(--color-text-muted);">角色與權限</div>
          <div class="settings-tab" style="padding: 0.75rem 1rem; cursor: pointer; color: var(--color-text-muted);">AI 配置</div>
          <div class="settings-tab" style="padding: 0.75rem 1rem; cursor: pointer; color: var(--color-text-muted);">系統參數</div>
       </div>

       <!-- User List -->
       <div class="glass-card">
         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
           <h3>使用者列表</h3>
           <button class="btn btn-primary">+ 新增使用者</button>
         </div>
         
         <table>
           <thead>
             <tr>
               <th style="padding: 1rem;">帳號</th>
               <th style="padding: 1rem;">角色</th>
               <th style="padding: 1rem;">Email</th>
               <th style="padding: 1rem;">狀態</th>
               <th style="padding: 1rem;">操作</th>
             </tr>
           </thead>
           <tbody>
             ${users.map(user => `
               <tr>
                 <td style="padding: 1rem; font-weight: 500;">${user.name}</td>
                 <td style="padding: 1rem;">${user.role}</td>
                 <td style="padding: 1rem;">${user.email}</td>
                 <td style="padding: 1rem;">
                   <span class="status-dot ${user.status === 'active' ? 'success' : 'danger'}"></span>
                   ${user.status === 'active' ? '啟用' : '停用'}
                 </td>
                 <td style="padding: 1rem;">
                   <button class="btn btn-sm btn-secondary">編輯</button>
                   <button class="btn btn-sm btn-secondary">重設密碼</button>
                 </td>
               </tr>
             `).join('')}
           </tbody>
         </table>
       </div>

       <!-- AI Configuration Mock -->
       <div class="glass-card" style="margin-top: 1.5rem;">
         <h3 style="margin-bottom: 1rem;">🤖 AI 服務配置</h3>
         <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
            <div class="form-group">
               <label>LLM 服務端點</label>
               <input type="text" value="https://api.openai.com/v1/chat/completions" readonly style="background: hsl(220, 15%, 95%);">
            </div>
            <div class="form-group">
               <label>OCR 服務端點</label>
               <input type="text" value="https://ocr.museum.internal/api/v1" readonly style="background: hsl(220, 15%, 95%);">
            </div>
            <div class="form-group">
               <label>Embedding Model</label>
               <select>
                 <option>text-embedding-3-small</option>
                 <option>text-embedding-ada-002</option>
               </select>
            </div>
            <div class="form-group">
               <label>AI 建議功能</label>
               <select>
                 <option>啟用</option>
                 <option>停用</option>
               </select>
            </div>
         </div>
         <button class="btn btn-primary" style="margin-top: 1rem;">儲存設定</button>
       </div>
    </div>
  `;
}
