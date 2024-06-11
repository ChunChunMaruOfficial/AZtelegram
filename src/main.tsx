import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './components/index/index.tsx'
import Settings from './components/settings/settings.tsx'
import './index.css'
import './reset.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Settings />
  </React.StrictMode>,
)
