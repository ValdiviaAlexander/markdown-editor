// src/index.tsx
import React from 'react'
import { createRoot } from 'react-dom/client'   // React 18 の場合
import styled, { createGlobalStyle } from 'styled-components'
import { Editor } from './pages/editor'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { History } from './pages/history'
import { useStateWithStorage } from './hooks/use_state_with_storage'

const GlobalStyle = createGlobalStyle`
  body * { box-sizing: border-box; }
`

const StorageKey = '/editor:text'

const Main: React.FC = () => {
    const [text, setText] = useStateWithStorage('', StorageKey)
  
    return (
      <>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route
              path="/editor"
              element={<Editor text={text} setText={setText} />}
            />
            <Route
              path="/history"
              element={<History setText={setText} />}
            />
            <Route
              path="*"
              element={<Navigate to="/editor" replace />}
            />
          </Routes>
        </Router>
      </>
    )
  }
  
  const container = document.getElementById('app');
  if (container) {
    createRoot(container).render(<Main />);
  }

