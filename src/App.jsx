import Antd5Demo from './Antd5Demo'
// import Antd4Demo from './Antd4Demo'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn' // for date-picker i18n
import { useContext } from 'react'
import { ThemeContext } from './stores/themeContext'
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'

function App() {
  const {
    prefixCls,
    iconPrefixCls,
    antd4prefixCls: _antd4prefixCls,
    antd4IconPrefixCls: _antd4IconPrefixCls,
    ...token
  } = useContext(ThemeContext).value

  console.log(token)

  // TODO 动态加载组件，测试自定义样式是否被覆盖

  return (
    <ConfigProvider
      prefixCls={prefixCls}
      iconPrefixCls={iconPrefixCls}
      locale={zhCN}
      theme={{
        token: token,
      }}
    >
      <StyleProvider hashPriority='high' transformers={[legacyLogicalPropertiesTransformer]}>
        <Antd5Demo />
        {/* <Antd4Demo /> */}
      </StyleProvider>
    </ConfigProvider>
  )
}

export default App
