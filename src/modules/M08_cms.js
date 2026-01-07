/**
 * M08: CMS (網站管理) - Light Mode
 */

const siteTree = [
  { id: 'home', title: '首頁', type: 'page' },
  { id: 'about', title: '關於我們', type: 'page' },
  {
    id: 'collections', title: '數位典藏', type: 'section', children: [
      { id: 'browse', title: '瀏覽典藏', type: 'page' },
      { id: 'themes', title: '主題策展', type: 'page' }
    ]
  }
];

export function renderM08CMS(path) {
  return `
    <div class="fade-in">
      <div class="glass-card" style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2>網站管理 (CMS)</h2>
          <p class="text-muted">管理前台網站結構與內容</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-secondary">預覽前台</button>
          <button class="btn btn-primary">發布變更</button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 300px 1fr; gap: 1.5rem; margin-top: 1.5rem; height: calc(100vh - 200px);">
        
        <!-- Sitemap -->
        <div class="glass-card" style="overflow-y: auto;">
          <h3 style="margin-bottom: 1rem; font-size: 1rem;">🗺️ 網站地圖</h3>
          <div style="font-size: 0.95rem;">
            ${renderSiteTree(siteTree)}
          </div>
          <button class="btn btn-sm btn-secondary" style="margin-top: 1rem; width: 100%;">+ 新增頁面</button>
        </div>

        <!-- Block Editor -->
        <div class="glass-card" style="overflow-y: auto;">
          <h3 style="margin-bottom: 1rem;">📝 區塊編輯器 <span class="text-muted" style="font-size: 0.9rem;">(home)</span></h3>
          
          <div class="preview-area">
             <!-- Mock Blocks -->
             <div class="cms-block">
                <span class="block-label">Hero Banner</span>
                <div style="height: 150px; background: linear-gradient(135deg, var(--color-primary), hsl(250, 60%, 60%)); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                  典藏雲歡迎您
                </div>
             </div>

             <div class="cms-block">
                <span class="block-label">Featured Items</span>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                  <div style="height: 100px; background: hsl(220, 15%, 95%); border-radius: 4px;"></div>
                  <div style="height: 100px; background: hsl(220, 15%, 95%); border-radius: 4px;"></div>
                  <div style="height: 100px; background: hsl(220, 15%, 95%); border-radius: 4px;"></div>
                </div>
             </div>

             <div class="cms-block">
                <span class="block-label">Text Block</span>
                <p>歡迎來到典藏雲，這裡收藏了豐富的歷史文獻與藝術資產...</p>
             </div>
          </div>
          
          <button class="btn btn-sm btn-primary" style="margin-top: 1rem;">+ 新增區塊</button>
        </div>

      </div>
    </div>
  `;
}

function renderSiteTree(nodes, level = 0) {
  return nodes.map(node => `
    <div style="padding-left: ${level * 16}px; margin-bottom: 0.5rem;">
      <div style="padding: 0.5rem; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: background 0.2s;"
           onmouseover="this.style.background='hsl(220, 15%, 96%)'" onmouseout="this.style.background='transparent'">
        <span>${node.type === 'section' ? '📁' : '📄'}</span>
        <span>${node.title}</span>
      </div>
      ${node.children ? renderSiteTree(node.children, level + 1) : ''}
    </div>
  `).join('');
}
