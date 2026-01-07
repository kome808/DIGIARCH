/**
 * Generic Modal Component (Light Mode Compatible)
 */

export function createModal({ title, content, onConfirm, confirmText = '確認', cancelText = '取消' }) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay fade-in';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000;
  `;

  const card = document.createElement('div');
  card.className = 'glass-card modal-card';
  card.style.cssText = `
    width: 90%; max-width: 500px;
    max-height: 90vh; overflow-y: auto;
    display: flex; flex-direction: column;
    padding: 0;
    background: white;
    border: 1px solid hsl(220, 15%, 88%);
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  `;

  // Header
  const header = document.createElement('div');
  header.style.cssText = `
    padding: 1.5rem; border-bottom: 1px solid hsl(220, 15%, 90%);
    display: flex; justify-content: space-between; align-items: center;
  `;
  header.innerHTML = `<h3 style="margin: 0; color: hsl(220, 25%, 20%);">${title}</h3>`;
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.style.cssText = 'background:none; border:none; color:hsl(220, 15%, 50%); font-size:1.5rem; cursor:pointer;';
  closeBtn.onclick = () => close();
  header.appendChild(closeBtn);

  // Body
  const body = document.createElement('div');
  body.style.cssText = 'padding: 1.5rem; flex: 1; overflow-y: auto; color: hsl(220, 25%, 20%);';
  if (typeof content === 'string') {
    body.innerHTML = content;
  } else {
    body.appendChild(content);
  }

  // Footer
  const footer = document.createElement('div');
  footer.style.cssText = `
    padding: 1rem 1.5rem; border-top: 1px solid hsl(220, 15%, 90%);
    display: flex; justify-content: flex-end; gap: 0.5rem;
    background: hsl(220, 15%, 98%);
  `;

  const btnCancel = document.createElement('button');
  btnCancel.className = 'btn btn-secondary';
  btnCancel.textContent = cancelText;
  btnCancel.onclick = () => close();

  const btnConfirm = document.createElement('button');
  btnConfirm.className = 'btn btn-primary';
  btnConfirm.textContent = confirmText;
  btnConfirm.onclick = () => {
    if (onConfirm) onConfirm();
    close();
  };

  footer.appendChild(btnCancel);
  footer.appendChild(btnConfirm);

  card.appendChild(header);
  card.appendChild(body);
  card.appendChild(footer);
  overlay.appendChild(card);

  function close() {
    overlay.remove();
  }

  // Close on outside click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  return overlay;
}
