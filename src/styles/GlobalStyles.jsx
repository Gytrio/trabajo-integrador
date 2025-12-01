import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #2563eb;
    --accent: #22c55e;
    --danger: #ef4444;
    --bg: #0f172a;
    --surface: #1e293b;
    --text: #e2e8f0;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--bg);
    color: var(--text);
  }

  .app-main {
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .card-glass {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(12px);
  }

  .btn-rounded {
    border-radius: 999px;
  }

  .text-muted-small {
    color: #cbd5e1;
    font-size: 0.9rem;
  }
`;

export default GlobalStyles;
