/**
 * Design Tokens Generator
 * 解析 tokens/ 目錄下的 JSON 檔案，生成 src/styles/tokens.css
 * 
 * 邏輯：
 * 1. 讀取 Ref Tokens 建立基礎參照表
 * 2. 讀取 Sys Tokens (預設 themeblue)
 * 3. 解析 value 中的參照 {Ref.xxx}
 * 4. 輸出 CSS Variables
 */

import fs from 'fs';
import path from 'path';

const TOKENS_DIR = path.resolve(process.cwd(), 'tokens');
const OUTPUT_FILE = path.resolve(process.cwd(), 'src/styles/tokens.css');

// 顏色與尺寸的遞迴解析
function flattenTokens(obj: any, prefix: string = '', result: Record<string, any> = {}) {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            if ('value' in obj[key]) {
                // 這是一個 token node
                result[prefix + key] = obj[key].value;
            } else {
                // 繼續遞迴
                flattenTokens(obj[key], prefix + key + '.', result);
            }
        }
    }
    return result;
}

// 解析參照值 {Ref.Color.Primary.30} -> #014d92
function resolveValue(value: any, refMap: Record<string, any>): string {
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
        const refKey = value.slice(1, -1); // 去掉 {}
        // Figma 參照通常忽略大小寫差異，或是路徑略有不同，這裡做簡單對應
        // Token JSON example: Ref.Color.Primary.30
        // FlattenMap keys: Ref.Color.Primary.30

        // 嘗試直接對應
        if (refMap[refKey] !== undefined) {
            return resolveValue(refMap[refKey], refMap); // 遞迴解析 (若 Ref 指向另一個 Ref)
        }

        // 嘗試忽略大小寫比對
        const lowerKey = refKey.toLowerCase();
        const foundKey = Object.keys(refMap).find(k => k.toLowerCase() === lowerKey);
        if (foundKey) {
            return resolveValue(refMap[foundKey], refMap);
        }

        console.warn(`Warning: Could not resolve token reference: ${value}`);
        return value;
    }
    return String(value);
}

// 將 Token Key 轉為 CSS Variable Name
// Sys.Color.Primary.30 -> --color-primary-30
// Sys.Size.Radius.sm -> --radius-sm
function toCssVar(key: string): string {
    // 移除 themeblue.Sys, Ref 等前綴
    let cleanKey = key
        .replace(/^themeblue\.Sys\./i, '')
        .replace(/^Ref\./i, '')
        .replace(/^sys\./i, ''); // 處理 2_sys_size_tokens 的 sys 小寫開頭

    // 移除非法字元 (空格, %, 等) 並轉小寫
    return '--' + cleanKey
        .split('.')
        .map(s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))
        .join('-');
}

async function main() {
    console.log('Generating design tokens...');

    // 1. Load Ref Tokens
    const refTokens = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, '1_ref_tokens.json'), 'utf-8'));
    const refMap = flattenTokens(refTokens);

    // 2. Load Sys Color Tokens (Theme Blue)
    const sysColorTokens = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, '2_sys_color_tokens.json'), 'utf-8'));
    // 只取 themeblue
    const themeBlueMap = flattenTokens(sysColorTokens['themeblue']);

    // 3. Load Sys Size Tokens
    const sysSizeTokens = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, '2_sys_size_tokens.json'), 'utf-8'));
    const sysSizeMap = flattenTokens(sysSizeTokens);

    // 4. Merge Maps for resolution context (Ref + Self)
    // 解析 Sys Tokens 時需要查 Ref 表
    // 解析 Size 時也可能查 Ref
    const fullContext = { ...refMap, ...themeBlueMap, ...sysSizeMap };

    let cssContent = `/* Auto-generated Design Tokens */\n:root {\n`;

    // Process Colors
    // 我們只輸出 Sys 層級的變數供 UI 使用，Ref 層級通常作為內部變數，但為了方便也可以輸出
    // 這裡專注於輸出 Sys 且符合開發規範的命名

    // 輸出 System Colors
    // e.g. Sys.Color.Primary.30 -> --color-primary-30
    Object.keys(themeBlueMap).forEach(key => {
        // key 類似 Sys.Color.Primary.30
        if (key.toLowerCase().startsWith('sys.')) {
            const val = resolveValue(themeBlueMap[key], fullContext);
            const varName = toCssVar(key);
            cssContent += `  ${varName}: ${val};\n`;
        }
    });

    // 輸出 System Sizes
    // e.g. sys.Radius.sm -> --radius-sm
    Object.keys(sysSizeMap).forEach(key => {
        if (key.toLowerCase().startsWith('sys.')) {
            let val = resolveValue(sysSizeMap[key], fullContext);

            // 處理 px 單位：如果值是純數字，加上 px
            // 檢查 1_ref_tokens.json 的 Size 定義是 number (e.g. 4)，所以這裡出來也是 string "4"
            // 需要判斷是否為數字
            if (!isNaN(Number(val)) && val.trim() !== '') {
                val = `${val}px`;
            }

            // 處理 Line-height, Letter-spacing 等可能有不同單位
            // 觀察 JSON: Letter-spacing 是小數點 (0.6)，通常是 em 或 px? Design system 沒寫單位通常是 px 或無單位
            // 假設 Letter-spacing 是 px (0.6px 很小?) 或者是 em? 
            // 1_ref.json Size 都是整數 4, 6... 
            // sys.Line-height H_lg -> Ref.Size.48 -> 48. 這應該是 px.

            const varName = toCssVar(key);
            cssContent += `  ${varName}: ${val};\n`;
        }
    });

    cssContent += `}\n`;

    fs.writeFileSync(OUTPUT_FILE, cssContent);
    console.log(`Successfully generated ${OUTPUT_FILE}`);
}

main().catch(console.error);
