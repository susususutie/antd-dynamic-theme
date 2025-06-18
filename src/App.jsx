import Antd5Demo from './Antd5Demo'
// import Antd4Demo from './Antd4Demo'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn' // for date-picker i18n
import { useContext } from 'react'
import { PrefixContext } from './stores/prefixContext'
import { SeedTokenContext } from './stores/seedTokenContext'
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'
import { ThemeProvider } from 'antd-style'

function App() {
  const { prefixCls, iconPrefixCls } = useContext(PrefixContext).value
  const seedToken = useContext(SeedTokenContext).value

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
      <ThemeProvider themeMode='auto'>
        <StyleProvider hashPriority='high' transformers={[legacyLogicalPropertiesTransformer]}>
          <Antd5Demo />
          {/* <Antd4Demo /> */}
        </StyleProvider>
      </ThemeProvider>
    </ConfigProvider>
  )
}

export default App
