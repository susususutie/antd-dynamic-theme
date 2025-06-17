import { useState, useMemo } from 'react'
import { initialThemeValue, ThemeProvider } from './themeContext'
// import { ConfigProvider as ConfigProvider4 } from 'antd4'

export default function StoreProvider({ children }) {
  const [themeValue, setThemeValue] = useState(initialThemeValue)
  const themeContext = useMemo(
    () => ({
      value: themeValue,
      update: theme => {
        const { iconPrefixCls, prefixCls, antd4prefixCls, antd4IconPrefixCls, ..._theme } = theme
        setThemeValue(_theme)
        // ConfigProvider4.config({
        //   theme: {
        //     primaryColor: '#1b67d2',
        //     infoColor: '#1b67d2',
        //     successColor: '#4fcf0e',
        //     warningColor: '#e1a836',
        //     errorColor: '#da3437',
        //     textBaseColor: '#101010',
        //   },
        // })
      },
    }),
    [themeValue]
  )

  return <ThemeProvider value={themeContext}>{children}</ThemeProvider>
}
