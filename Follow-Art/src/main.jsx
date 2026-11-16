import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource-variable/bricolage-grotesque/wdth.css'; // weight + width axes
import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import 'lenis/dist/lenis.css';
import './styles/base.css';
import './styles/chrome.css';
import './styles/sections.css';
import './styles/inverted.css';

import App from './App.jsx';
import { ThemeProvider } from './ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
