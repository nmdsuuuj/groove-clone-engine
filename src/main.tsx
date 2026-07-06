import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

// PWA Service Worker を登録（vite-plugin-pwa）
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(new URL('./sw.ts', import.meta.url), {
      type: 'module'
    }).catch(() => {
      // Service Worker registration failed, app will still work
    })
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
