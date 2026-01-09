/**
 * 徵集案件新增 - 自動化測試
 * 
 * 依據規格書生成：docs/specs/acquisition-case-create-spec.md
 * 
 * 測試案例對照：
 * - TC-001: 成功新增案件
 * - TC-002: 案件名稱為空時顯示錯誤
 * - TC-003: 未選擇分類時顯示錯誤
 * - TC-004: 案件名稱超過長度限制
 * - TC-005: Email 格式錯誤
 * - TC-006: 點擊取消按鈕返回列表
 * - TC-007: 未登入時禁止存取
 */

import { test, expect } from '@playwright/test';

test.describe('徵集案件新增', () => {

    // =========================================
    // TC-001: 成功新增案件 ✅
    // =========================================
    test('TC-001: 成功新增案件', async ({ page }) => {
        // 前置條件：假設使用者已登入 (此處可加入登入步驟或 Mock)

        // Step 1: 導航至案件列表頁
        await page.goto('/admin/acquisition/list');

        // Step 2: 點擊「新增案件」按鈕
        await page.click('button:has-text("新增案件")');

        // Step 3: 輸入案件名稱
        await page.fill('input[name="title"]', '自動化測試案件');

        // Step 4: 選擇分類
        await page.selectOption('select[name="category"]', '捐贈');

        // Step 5: 點擊儲存
        await page.click('button:has-text("儲存")');

        // 預期結果：顯示成功訊息並導回列表
        await expect(page.locator('.toast-success, [role="alert"]')).toContainText('成功');
        await expect(page).toHaveURL(/\/admin\/acquisition\/list/);
        await expect(page.locator('text=自動化測試案件')).toBeVisible();
    });

    // =========================================
    // TC-002: 案件名稱為空時顯示錯誤 ❌
    // =========================================
    test('TC-002: 案件名稱為空時顯示錯誤', async ({ page }) => {
        await page.goto('/admin/acquisition/create');

        // 不輸入案件名稱，直接選擇分類
        await page.selectOption('select[name="category"]', '捐贈');

        // 點擊儲存
        await page.click('button:has-text("儲存")');

        // 預期結果：顯示錯誤訊息，頁面不跳轉
        await expect(page.locator('.error-message, [role="alert"]')).toContainText('請輸入案件名稱');
        await expect(page).toHaveURL(/\/admin\/acquisition\/create/);
    });

    // =========================================
    // TC-003: 未選擇分類時顯示錯誤 ❌
    // =========================================
    test('TC-003: 未選擇分類時顯示錯誤', async ({ page }) => {
        await page.goto('/admin/acquisition/create');

        // 輸入案件名稱但不選擇分類
        await page.fill('input[name="title"]', '測試案件');

        // 點擊儲存
        await page.click('button:has-text("儲存")');

        // 預期結果：顯示錯誤訊息
        await expect(page.locator('.error-message, [role="alert"]')).toContainText('請選擇案件分類');
        await expect(page).toHaveURL(/\/admin\/acquisition\/create/);
    });

    // =========================================
    // TC-004: 案件名稱超過長度限制 ❌
    // =========================================
    test('TC-004: 案件名稱超過長度限制', async ({ page }) => {
        await page.goto('/admin/acquisition/create');

        // 輸入 201 個字元
        const longTitle = 'A'.repeat(201);
        await page.fill('input[name="title"]', longTitle);
        await page.selectOption('select[name="category"]', '捐贈');

        // 點擊儲存
        await page.click('button:has-text("儲存")');

        // 預期結果：顯示長度錯誤訊息
        await expect(page.locator('.error-message, [role="alert"]')).toContainText('案件名稱不可超過 200 字');
    });

    // =========================================
    // TC-005: Email 格式錯誤 ❌
    // =========================================
    test('TC-005: Email 格式錯誤', async ({ page }) => {
        await page.goto('/admin/acquisition/create');

        await page.fill('input[name="title"]', '測試案件');
        await page.selectOption('select[name="category"]', '捐贈');
        await page.fill('input[name="email"]', 'invalid-email');

        // 點擊儲存
        await page.click('button:has-text("儲存")');

        // 預期結果：顯示 Email 格式錯誤
        await expect(page.locator('.error-message, [role="alert"]')).toContainText('Email 格式不正確');
    });

    // =========================================
    // TC-006: 點擊取消按鈕返回列表 ↩️
    // =========================================
    test('TC-006: 點擊取消按鈕返回列表', async ({ page }) => {
        await page.goto('/admin/acquisition/create');

        // 輸入部分資料
        await page.fill('input[name="title"]', '即將取消的案件');

        // 點擊取消
        await page.click('button:has-text("取消")');

        // 預期結果：導回列表頁
        await expect(page).toHaveURL(/\/admin\/acquisition\/list/);
    });

    // =========================================
    // TC-007: 未登入時禁止存取 🔒
    // =========================================
    test('TC-007: 未登入時禁止存取', async ({ page, context }) => {
        // 清除所有 cookies 確保未登入狀態
        await context.clearCookies();

        // 直接訪問新增頁面
        await page.goto('/admin/acquisition/create');

        // 預期結果：導向登入頁
        await expect(page).toHaveURL(/\/login/);
    });

});
