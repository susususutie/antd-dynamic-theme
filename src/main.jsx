import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ThemeManager from 'antd-dual-theme-manager/index.js'
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'
import { App as AntApp } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import zhCN4 from 'antd4/es/locale/zh_CN'
import 'dayjs/locale/zh-cn' // for date-picker i18n

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeManager
      locale={zhCN}
      // prefixCls='asd'
      // iconPrefixCls='zxc'
      seedToken={{
        colorPrimary: '#3f51b5',
        colorInfo: '#0288d1',
        colorSuccess: '#2fad35',
        colorWarning: '#ed6c02',
        colorError: '#d32f2f',
      }}
      configProviderProps4={{
        locale: zhCN4,
      }}
    >
      <StyleProvider hashPriority='high' transformers={[legacyLogicalPropertiesTransformer]}>
        <AntApp>
          <App />
          <div id='portal-root'></div>
        </AntApp>
      </StyleProvider>
    </ThemeManager>
  </StrictMode>
)
