/**
 * M01: Unified Search (整合查詢) - Light Mode
 */

export function renderM01Search(path) {
   return `
    <div class="fade-in">
       <div class="glass-card" style="text-align: center; padding: 3rem 1rem;">
          <h2 style="font-size: 2rem; margin-bottom: 1.5rem;">全域整合查詢</h2>
          <div style="max-width: 600px; margin: 0 auto; position: relative;">
             <input type="text" placeholder="輸入關鍵詞搜尋全宗、圖片、案件或 OCR 內容..." 
                    style="width: 100%; padding: 1rem 1.5rem; border-radius: 30px; font-size: 1.1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
             <button style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: var(--color-primary); border: none; width: 40px; height: 40px; border-radius: 50%; color: white; cursor: pointer;">→</button>
          </div>
          <div style="margin-top: 1rem; font-size: 0.9rem;" class="text-muted">
             熱門搜尋: 謝里法, 巴黎, 1964, 手稿
          </div>
       </div>

       <!-- Search Results Container -->
       <div style="display: grid; grid-template-columns: 250px 1fr; gap: 1.5rem; margin-top: 2rem;">
          
          <!-- Facets -->
          <div class="glass-card">
             <h3 style="margin-bottom: 1rem; font-size: 1rem;">篩選條件</h3>
             
             <div class="facet-group" style="margin-bottom: 1.5rem;">
                <div style="font-weight: bold; margin-bottom: 0.5rem; color: var(--color-primary); border-bottom: 1px solid var(--glass-border); padding-bottom: 4px;">資料類型</div>
                <div style="margin-bottom: 0.4rem; font-size: 0.9rem;"><input type="checkbox" checked> 典藏單元 (Item) (120)</div>
                <div style="margin-bottom: 0.4rem; font-size: 0.9rem;"><input type="checkbox"> 數位檔案 (Asset) (450)</div>
                <div style="margin-bottom: 0.4rem; font-size: 0.9rem;"><input type="checkbox"> 案件 (Case) (12)</div>
             </div>

             <div class="facet-group" style="margin-bottom: 1.5rem;">
                <div style="font-weight: bold; margin-bottom: 0.5rem; color: var(--color-primary); border-bottom: 1px solid var(--glass-border); padding-bottom: 4px;">年代</div>
                <div style="margin-bottom: 0.4rem; font-size: 0.9rem;"><input type="checkbox"> 1960-1969 (85)</div>
                <div style="margin-bottom: 0.4rem; font-size: 0.9rem;"><input type="checkbox"> 1970-1979 (40)</div>
             </div>

             <div class="facet-group">
                <div style="font-weight: bold; margin-bottom: 0.5rem; color: var(--color-primary); border-bottom: 1px solid var(--glass-border); padding-bottom: 4px;">權利狀態</div>
                <div style="margin-bottom: 0.4rem; font-size: 0.9rem;"><input type="checkbox"> 公開 (Public)</div>
                <div style="margin-bottom: 0.4rem; font-size: 0.9rem;"><input type="checkbox"> 限館內 (On-site)</div>
             </div>
          </div>

          <!-- Results -->
          <div>
             <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <span class="text-muted">找到 120 筆結果 (耗時 0.12 秒)</span>
                <select>
                   <option>相關性排序</option>
                   <option>年代 (新->舊)</option>
                </select>
             </div>

             <div style="display: flex; flex-direction: column; gap: 1rem;">
                
                <!-- Result Item 1 -->
                <div class="glass-card result-item" style="padding: 1rem; border: 1px solid transparent; transition: border-color 0.2s; cursor: pointer;">
                   <div style="display: flex; gap: 1rem;">
                      <div style="width: 80px; height: 80px; background: hsl(220, 15%, 92%); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">IMG</div>
                      <div style="flex: 1;">
                         <div style="display: flex; gap: 0.5rem; margin-bottom: 0.2rem;">
                            <span class="badge" style="background: var(--color-primary);">Item</span>
                            <span style="font-size: 0.8rem;" class="text-muted">AH-1964-001</span>
                         </div>
                         <h3 style="color: var(--color-primary); margin-bottom: 0.5rem;">巴黎隨筆手稿</h3>
                         <p style="font-size: 0.9rem; -webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;">
                            本件為謝里法於1964年旅居<span class="highlight">巴黎</span>期間之隨筆手稿，內容記載了當時的藝術思潮與生活點滴...
                         </p>
                         <div style="margin-top: 0.5rem; font-size: 0.8rem;" class="text-muted">
                            關鍵詞: 巴黎, 留學, 素描 • 年代: 1964
                         </div>
                      </div>
                   </div>
                </div>

                <!-- Result Item 2 -->
                <div class="glass-card result-item" style="padding: 1rem; cursor: pointer;">
                   <div style="display: flex; gap: 1rem;">
                      <div style="width: 80px; height: 80px; background: hsl(220, 15%, 92%); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">DOC</div>
                      <div style="flex: 1;">
                         <div style="display: flex; gap: 0.5rem; margin-bottom: 0.2rem;">
                            <span class="badge" style="background: var(--color-info);">Case</span>
                            <span style="font-size: 0.8rem;" class="text-muted">ACQ-2025-001</span>
                         </div>
                         <h3 style="color: var(--color-primary); margin-bottom: 0.5rem;">謝里法 2025 年度捐贈案</h3>
                         <p style="font-size: 0.9rem;">
                            捐贈者謝里法擬捐贈其早年留學<span class="highlight">巴黎</span>時期之相關文件...
                         </p>
                      </div>
                   </div>
                </div>

             </div>
          </div>

       </div>
    </div>
    
    <style>
       .result-item:hover { border-color: var(--color-primary); }
    </style>
  `;
}
