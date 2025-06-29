import { useTheme } from 'antd-style'
import { useContext } from 'react'
import { useEffect } from 'react'
import { ThemeModeContext } from '../context/themeModeContext'
import updateAntd4CssVars from '../util/updateAntd4CssVars'
import { theme } from 'antd'

/**
 * 用于在 themeMode 为 auto 时更新 antd4 的 css vars
 */
export default function Antd4ThemeUpdater() {
  const isDarkMode = useTheme().isDarkMode
  const { token } = theme.useToken()
  // const seedToken = useContext(SeedTokenContext).value
  const themeMode = useContext(ThemeModeContext).value

  useEffect(() => {
    if (themeMode === 'auto') {
      // console.log(`themeMode 为 auto，在组件渲染后获取真实主题为 ${isDarkMode?'dark':'light'}，更新 and@4 css 变量`)
      updateAntd4CssVars(isDarkMode, {
        colorPrimary: token.colorPrimary,
        colorSuccess: token.colorSuccess,
        colorWarning: token.colorWarning,
        colorError: token.colorError,
        colorInfo: token.colorInfo,
      })
    }
  }, [
    themeMode,
    isDarkMode,
    token.colorPrimary,
    token.colorSuccess,
    token.colorWarning,
    token.colorError,
    token.colorInfo,
  ])

  return null
}
