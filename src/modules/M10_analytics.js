/**
 * M10: Analytics & Reports (資料統計及報表) - Light Mode
 */

export function renderM10Analytics(path) {
  return `
    <div class="fade-in">
      <div class="glass-card" style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2>資料統計及報表</h2>
          <p class="text-muted">系統指標、審計日誌與自訂報表</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-secondary">匯出報表</button>
          <button class="btn btn-primary">自訂報表</button>
        </div>
      </div>

      <!-- Charts Row -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 1.5rem;">
        <div class="glass-card" style="text-align: center;">
          <h4 class="text-muted" style="font-size: 0.9rem;">本月新增館藏</h4>
          <div style="font-size: 3rem; font-weight: bold; color: var(--color-primary); margin: 1rem 0;">156</div>
          <div style="color: var(--color-success);">▲ 12% (vs 上月)</div>
        </div>
        
        <div class="glass-card" style="text-align: center;">
          <h4 class="text-muted" style="font-size: 0.9rem;">數位化完成率</h4>
          <div style="font-size: 3rem; font-weight: bold; color: var(--color-success); margin: 1rem 0;">89%</div>
          <div style="color: var(--color-success);">▲ 5%</div>
        </div>
        
        <div class="glass-card" style="text-align: center;">
          <h4 class="text-muted" style="font-size: 0.9rem;">系統使用者</h4>
          <div style="font-size: 3rem; font-weight: bold; margin: 1rem 0;">24</div>
          <div class="text-muted">活躍 / 日</div>
        </div>
      </div>

      <!-- Charts & Audit Log -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem;">
        
        <div class="glass-card">
          <h3 style="margin-bottom: 1rem;">📊 編目產量趨勢</h3>
          <div style="height: 200px; background: linear-gradient(to top, hsla(var(--primary-h), 60%, 90%, 0.5), transparent); border-radius: 8px; display: flex; align-items: flex-end; justify-content: space-around; padding: 0 1rem;">
            <div style="width: 30px; background: var(--color-primary); border-radius: 4px 4px 0 0; height: 60%;"></div>
            <div style="width: 30px; background: var(--color-primary); border-radius: 4px 4px 0 0; height: 75%;"></div>
            <div style="width: 30px; background: var(--color-primary); border-radius: 4px 4px 0 0; height: 50%;"></div>
            <div style="width: 30px; background: var(--color-primary); border-radius: 4px 4px 0 0; height: 90%;"></div>
            <div style="width: 30px; background: var(--color-primary); border-radius: 4px 4px 0 0; height: 80%;"></div>
            <div style="width: 30px; background: var(--color-primary); border-radius: 4px 4px 0 0; height: 100%;"></div>
          </div>
          <div style="display: flex; justify-content: space-around; margin-top: 0.5rem; font-size: 0.8rem;" class="text-muted">
            <span>7月</span><span>8月</span><span>9月</span><span>10月</span><span>11月</span><span>12月</span>
          </div>
        </div>

        <div class="glass-card">
          <h3 style="margin-bottom: 1rem;">📋 審計日誌 (近期)</h3>
          <table>
            <thead>
              <tr>
                <th style="padding: 0.5rem;">時間</th>
                <th style="padding: 0.5rem;">使用者</th>
                <th style="padding: 0.5rem;">動作</th>
                <th style="padding: 0.5rem;">目標</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 0.5rem; font-size: 0.9rem;">10:23</td>
                <td style="padding: 0.5rem;">admin</td>
                <td style="padding: 0.5rem;"><span class="badge" style="background: var(--color-info);">UPDATE</span></td>
                <td style="padding: 0.5rem;">CAT-2025-08</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem; font-size: 0.9rem;">09:58</td>
                <td style="padding: 0.5rem;">王大明</td>
                <td style="padding: 0.5rem;"><span class="badge" style="background: var(--color-success);">CREATE</span></td>
                <td style="padding: 0.5rem;">ACQ-2025-003</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem; font-size: 0.9rem;">09:15</td>
                <td style="padding: 0.5rem;">system</td>
                <td style="padding: 0.5rem;"><span class="badge" style="background: var(--color-warning);">INDEX</span></td>
                <td style="padding: 0.5rem;">全文索引任務</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  `;
}
