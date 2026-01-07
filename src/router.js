
/**
 * Simple Hash Router implementation
 */
import { renderM01Search } from './modules/M01_search.js';
import { renderM02Dashboard } from './modules/M02_dashboard.js';
import { renderM03Acquisition } from './modules/M03_acquisition.js';
import { renderM04Hierarchy } from './modules/M04_hierarchy.js';
import { renderM05Ingest } from './modules/M05_ingest.js';
import { renderM06Digitization } from './modules/M06_digitization.js';
import { renderM07Metadata } from './modules/M07_metadata.js';
import { renderM08CMS } from './modules/M08_cms.js';
import { renderM09Circulation } from './modules/M09_circulation.js';
import { renderM10Analytics } from './modules/M10_analytics.js';
import { renderM11Settings } from './modules/M11_settings.js';

// Route Definitions
const routes = {
    '/': { title: '首頁與待辦', component: renderM02Dashboard },
    '/dashboard': { title: '首頁與待辦 (M02)', component: renderM02Dashboard },
    '/unified_search': { title: '整合查詢 (M01)', component: renderM01Search },
    '/acquisition': { title: '徵集審議作業 (M03)', component: renderM03Acquisition },
    '/hierarchy': { title: '全宗架構管理 (M04)', component: renderM04Hierarchy },
    '/ingest': { title: '入庫作業管理 (M05)', component: renderM05Ingest },
    '/digitization': { title: '數位化作業 (M06)', component: renderM06Digitization },
    '/metadata': { title: '詮釋資料維護 (M07)', component: renderM07Metadata },
    '/cms': { title: '網站管理 (M08)', component: renderM08CMS },
    '/circulation': { title: '提借(閱)作業 (M09)', component: renderM09Circulation },
    '/analytics': { title: '資料統計及報表 (M10)', component: renderM10Analytics },
    '/settings': { title: '系統設定 (M11)', component: renderM11Settings },
};

export function createRouter() {
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
}

function router() {
    // Get hash or default to /
    let path = window.location.hash.slice(1) || '/';
    if (path === '') path = '/';

    // Handle redirect
    if (path === '/') {
        window.location.hash = '/dashboard';
        return;
    }

    // Simple route matching logic supporting sub-paths
    let route = routes[path];
    let params = [];

    if (!route) {
        const segments = path.split('/').filter(Boolean);
        const bashPathStr = '/' + segments[0];

        if (routes[bashPathStr]) {
            route = routes[bashPathStr];
            params = segments.slice(1);
        } else {
            route = routes['/dashboard']; // Fallback
        }
    }

    // Update Page Title
    const titleEl = document.getElementById('page-title');
    if (titleEl && route) titleEl.textContent = route.title;

    // Update Active Link State
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active');
        const itemPath = el.dataset.path;
        if (path.startsWith(itemPath) && itemPath !== '/') {
            el.classList.add('active');
        }
    });

    // Render Component
    const contentEl = document.getElementById('main-content');
    if (contentEl && route) {
        contentEl.innerHTML = route.component(path, params);
        contentEl.classList.remove('fade-in');
        void contentEl.offsetWidth;
        contentEl.classList.add('fade-in');
    }
}

// --- Component Renderers ---
function renderPlaceholder(path) {
    const route = routes[path] || { title: 'Unknown' };
    return `
    <div class="glass-card" style="text-align: center; padding: 3rem;">
      <h2 style="margin-bottom: 1rem;">🚧 建置中</h2>
      <p>模組 <strong>${route.title}</strong> 正在開發階段。</p>
      <br>
      <button class="btn btn-primary" onclick="window.history.back()">返回</button>
    </div>
  `;
}
