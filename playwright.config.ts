import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright 測試配置
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './tests',
    /* 每個測試的最大執行時間 */
    timeout: 30 * 1000,
    /* 斷言逾時 */
    expect: {
        timeout: 5000
    },
    /* 完整報告 */
    reporter: [
        ['html', { outputFolder: 'playwright-report' }],
        ['list']
    ],
    /* 共用設定 */
    use: {
        /* 基礎 URL */
        baseURL: 'http://localhost:7777',
        /* 追蹤記錄 (僅首次重試) */
        trace: 'on-first-retry',
        /* 截圖 (僅失敗時) */
        screenshot: 'only-on-failure',
    },
    /* 測試專案 (瀏覽器設定) */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        /* 手機版測試 */
        {
            name: 'mobile',
            use: { ...devices['iPhone 13'] },
        },
    ],
    /* 本地開發伺服器 */
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:7777',
        reuseExistingServer: true,
        timeout: 120 * 1000,
    },
});
