
// import { createIcons, icons } from 'lucide'; // Removed for static server compatibility

export function AppShell() {
  return `
    <nav class="app-sidebar">
      <div class="app-brand">
        <span>現代化數位典藏</span>
      </div>
      
      <div class="nav-menu">
        <div class="nav-item" data-path="/unified_search" onclick="location.hash='/unified_search'">
          <span>整合查詢</span>
        </div>
        <div class="nav-item" data-path="/dashboard" onclick="location.hash='/dashboard'">
          <span>首頁與待辦</span>
        </div>
        
        <div style="height: 1px; background: var(--glass-border); margin: 0.5rem 0;"></div>
        
        <div class="nav-item" data-path="/acquisition" onclick="location.hash='/acquisition'">
          <span>徵集審議 (M03)</span>
        </div>
        <div class="nav-item" data-path="/hierarchy" onclick="location.hash='/hierarchy'">
          <span>全宗架構 (M04)</span>
        </div>
        <div class="nav-item" data-path="/ingest" onclick="location.hash='/ingest'">
          <span>入庫作業 (M05)</span>
        </div>
        <div class="nav-item" data-path="/digitization" onclick="location.hash='/digitization'">
          <span>數位化 (M06)</span>
        </div>
        <div class="nav-item" data-path="/metadata" onclick="location.hash='/metadata'">
          <span>詮釋資料 (M07)</span>
        </div>
        <div class="nav-item" data-path="/cms" onclick="location.hash='/cms'">
          <span>網站管理 (M08)</span>
        </div>
        <div class="nav-item" data-path="/circulation" onclick="location.hash='/circulation'">
          <span>提借(閱) (M09)</span>
        </div>
        <div class="nav-item" data-path="/analytics" onclick="location.hash='/analytics'">
          <span>統計報表 (M10)</span>
        </div>
        
        <div style="margin-top: auto;"></div>
        <div class="nav-item" data-path="/settings" onclick="location.hash='/settings'">
          <span>系統設定 (M11)</span>
        </div>
      </div>
    </nav>

    <main class="app-main">
      <header class="app-header">
        <div id="page-title" class="page-title">首頁</div>
        <div class="user-profile">
          <button class="btn btn-primary" style="font-size: 0.9rem;">管理員</button>
        </div>
      </header>

      <div id="main-content" class="app-content">
        <!-- Dynamic Content Injected Here -->
      </div>
    </main>
  `;
}
