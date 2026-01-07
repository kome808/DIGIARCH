
// import './style.css'; // Removed for static server compatibility
import { createRouter } from './router.js';
import { AppShell } from './components/AppShell.js';

// Setup Application
const app = document.querySelector('#app');

// Initialize Layout
app.innerHTML = AppShell();

// Initialize Router
createRouter();
