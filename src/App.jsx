import Demo from './Demo'
import { ConfigProvider, App as AntApp } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn' // for date-picker i18n
import { useContext } from 'react'
import { PrefixContext } from './stores/prefixContext'
import { SeedTokenContext } from './stores/seedTokenContext'
import { ThemeModeContext } from './stores/themeModeContext'
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'
import { ThemeProvider } from 'antd-style'
import { ConfigProvider as ConfigProvider4 } from 'antd4'
import zhCN4 from 'antd4/es/locale/zh_CN'
import './antd4.variable.css'

function App() {
  const { prefixCls, iconPrefixCls } = useContext(PrefixContext).value
  const seedToken = useContext(SeedTokenContext).value
  const themeMode = useContext(ThemeModeContext).value

  // TODO 动态加载组件，测试自定义样式是否被覆盖

  return (
    <ConfigProvider
      prefixCls={prefixCls}
      iconPrefixCls={iconPrefixCls}
      locale={zhCN}
      theme={{
        token: seedToken,
      }}
    >
      <ConfigProvider4 locale={zhCN4}>
        <ThemeProvider themeMode={themeMode}>
          <StyleProvider hashPriority='high' transformers={[legacyLogicalPropertiesTransformer]}>
            <AntApp>
              <Demo />
            </AntApp>
          </StyleProvider>
        </ThemeProvider>
      </ConfigProvider4>
    </ConfigProvider>
  )
}

export default App
