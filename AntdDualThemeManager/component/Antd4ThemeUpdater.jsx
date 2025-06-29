import { useTheme } from 'antd-style'
import { useContext } from 'react'
import { useEffect } from 'react'
import { ThemeModeContext } from '../context/themeModeContext'
import { SeedTokenContext } from '../context/seedTokenContext'
import updateAntd4CssVars from '../util/updateAntd4CssVars'

/**
 * 用于在 themeMode 为 auto 时更新 antd4 的 css vars
 */
export default function Antd4ThemeUpdater() {
  const isDarkMode = useTheme().isDarkMode

  const seedToken = useContext(SeedTokenContext).value
  const themeMode = useContext(ThemeModeContext).value

  useEffect(() => {
    if (themeMode === 'auto') {
      // console.log(`themeMode 为 auto，在组件渲染后获取真实主题为 ${isDarkMode?'dark':'light'}，更新 and@4 css 变量`)
      updateAntd4CssVars(isDarkMode, seedToken)
    }
  }, [seedToken, themeMode, isDarkMode])

  return null
}
