// src/index.tsx
import React from 'react'
import { createRoot } from 'react-dom/client'   // React 18 の場合
import styled, { createGlobalStyle } from 'styled-components'
import { Editor } from './pages/editor'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { History } from './pages/history'

const GlobalStyle = createGlobalStyle`
  body * { box-sizing: border-box; }
`

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Router>
      <Routes>
        {/* / → /editor へ */}
        <Route path="/" element={<Navigate to="/editor" replace />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/history" element={<History />} />
        {/* 不明パスも /editor へ */}
        <Route path="*" element={<Navigate to="/editor" replace />} />
      </Routes>
    </Router>
  </>
)

// index.html 側の id と合わせる（例: <div id="app"></div>）
const el = document.getElementById('app')!
createRoot(el).render(<App />)

// ※ React 17 を使っているなら下を使う：
// import { render } from 'react-dom'
// render(<App />, document.getElementById('app'))
