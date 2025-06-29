import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ThemeManager from 'antd-dual-theme-manager/index.js'
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'
import { App as AntApp } from 'antd'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeManager>
      <StyleProvider hashPriority='high' transformers={[legacyLogicalPropertiesTransformer]}>
        <AntApp>
          <App />
          <div id='portal-root'></div>
        </AntApp>
      </StyleProvider>
    </ThemeManager>
  </StrictMode>
)
