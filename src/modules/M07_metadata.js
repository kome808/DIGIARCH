/**
 * M07: Metadata & Cataloging (詮釋資料維護)
 * Deep Dive: Editable Forms & AI Suggestions (Light Mode)
 */
import { createModal } from '../components/Modal.js';

// Mock Catalog Item (In-Memory State)
let catalogItem = {
  id: 'CAT-2025-08',
  title: '巴黎隨筆手稿',
  identifier: 'AH-1964-001',
  status: 'draft',
  metadata: {
    title: '巴黎隨筆手稿',
    creator: '謝里法',
    date: '1964-05-20',
    description: '此為謝里法於巴黎留學期間之手稿...',
    keywords: '巴黎, 留學, 素描',
    language: '中文',
    format: '紙本',
    extent: '35頁'
  },
  aiSuggestions: {
    keywords: ['藝術史', '法國', '現代藝術'],
    description: '建議補充：本件手稿記錄了藝術家在巴黎高等美術學院的學習歷程...'
  }
};

export function renderM07Metadata(path) {
  window.m07_saveField = saveField;
  window.m07_acceptSuggestion = acceptSuggestion;
  window.m07_submitForReview = submitForReview;

  return `
    <div class="fade-in" style="display: flex; height: calc(100vh - 80px); gap: 1rem;">
      
      <!-- Left: Editor -->
      <div class="glass-card" style="flex: 2; padding: 2rem; overflow-y: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
          <div>
            <span class="badge" style="background: ${catalogItem.status === 'draft' ? 'hsl(220, 15%, 70%)' : 'var(--color-success)'};">
              ${catalogItem.status === 'draft' ? '草稿 v1.2' : '已提交'}
            </span>
            <h2 style="margin-top: 0.5rem;">${catalogItem.title}</h2>
          </div>
          <div style="display: flex; gap: 0.5rem;">
             <button class="btn btn-secondary" onclick="alert('草稿已儲存')">儲存草稿</button>
             <button class="btn btn-primary" onclick="window.m07_submitForReview()">提交審核</button>
          </div>
        </div>

        <!-- Form -->
        <div class="form-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
           ${renderEditableField('題名 (Title)', 'title', catalogItem.metadata.title)}
           ${renderEditableField('作者 (Creator)', 'creator', catalogItem.metadata.creator)}
           ${renderEditableField('年代 (Date)', 'date', catalogItem.metadata.date, 'date')}
           ${renderEditableField('語言', 'language', catalogItem.metadata.language)}
           ${renderEditableField('格式', 'format', catalogItem.metadata.format)}
           ${renderEditableField('數量/頁數', 'extent', catalogItem.metadata.extent)}
           
           <div class="form-group" style="grid-column: span 2;">
             <label>描述 (Description)</label>
             <textarea id="field_description" onchange="window.m07_saveField('description', this.value)" 
               style="width: 100%; height: 100px; resize: vertical;">${catalogItem.metadata.description}</textarea>
           </div>
           
           <div class="form-group" style="grid-column: span 2;">
             <label>關鍵詞 (Keywords)</label>
             <input type="text" id="field_keywords" value="${catalogItem.metadata.keywords}" 
               onchange="window.m07_saveField('keywords', this.value)">
           </div>
        </div>
      </div>

      <!-- Right: AI & OCR Panel -->
      <div style="flex: 1; display: flex; flex-direction: column; gap: 1rem;">
        
        <!-- AI Suggestions -->
        <div class="glass-card ai-panel">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3>AI 編目建議</h3>
            <span class="badge" style="background: var(--color-primary);">New</span>
          </div>
          
          <div class="ai-suggestion-box">
            <p style="font-size: 0.9rem; margin-bottom: 0.5rem;"><strong>建議關鍵詞:</strong></p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
               ${catalogItem.aiSuggestions.keywords.map(k => `
                 <span class="tag clickable" onclick="window.m07_acceptSuggestion('keyword', '${k}')" 
                   style="cursor: pointer; background: var(--color-primary); color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; transition: opacity 0.2s;">
                   + ${k}
                 </span>
               `).join('')}
            </div>
          </div>
          
          <div class="ai-suggestion-box">
            <p style="font-size: 0.9rem; margin-bottom: 0.5rem;"><strong>建議描述優化:</strong></p>
            <p style="font-size: 0.85rem;">${catalogItem.aiSuggestions.description}</p>
            <div style="text-align: right; margin-top: 0.5rem;">
               <button class="btn btn-sm btn-primary" onclick="window.m07_acceptSuggestion('description', \`${catalogItem.aiSuggestions.description}\`)">套用</button>
            </div>
          </div>
        </div>

        <!-- OCR Viewer Mock -->
        <div class="glass-card" style="flex: 1; overflow-y: auto;">
           <h3>OCR 文字 (辨識率 92%)</h3>
           <div class="ocr-preview" style="margin-top: 1rem;">
              <p>1964年 5月20日 巴黎 晴</p>
              <p>今天在塞納河畔寫生，遇見了一位日本畫家...</p>
              <p>下午前往羅浮宮，臨摹德拉克洛瓦...</p>
           </div>
        </div>

      </div>

    </div>
  `;
}

function renderEditableField(label, fieldName, value, type = 'text') {
  return `
    <div class="form-group">
      <label>${label}</label>
      <input type="${type}" id="field_${fieldName}" value="${value}" 
        onchange="window.m07_saveField('${fieldName}', this.value)">
    </div>
  `;
}

function saveField(fieldName, value) {
  catalogItem.metadata[fieldName] = value;
  console.log(`[M07] Field '${fieldName}' saved:`, value);
  const input = document.getElementById(`field_${fieldName}`);
  if (input) {
    input.style.borderColor = 'var(--color-success)';
    setTimeout(() => {
      input.style.borderColor = '';
    }, 1000);
  }
}

function acceptSuggestion(type, value) {
  if (type === 'keyword') {
    const currentKeywords = catalogItem.metadata.keywords;
    catalogItem.metadata.keywords = currentKeywords ? `${currentKeywords}, ${value}` : value;
    const input = document.getElementById('field_keywords');
    if (input) input.value = catalogItem.metadata.keywords;
    alert(`已加入關鍵詞: ${value}`);
  } else if (type === 'description') {
    catalogItem.metadata.description = value;
    const textarea = document.getElementById('field_description');
    if (textarea) textarea.value = value;
    alert('已套用 AI 建議描述');
  }
}

function submitForReview() {
  catalogItem.status = 'submitted';
  alert('已提交審核！');
  location.reload();
}
