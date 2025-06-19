import { useTheme } from 'antd-style'
import { useContext } from 'react'
import { useEffect } from 'react'
import { ThemeModeContext } from './themeModeContext'
import { SeedTokenContext } from './seedTokenContext'
import updateAntd4CssVars from '../updateAntd4CssVars'

export default function ThemeAppearance() {
  const isDarkMode = useTheme().isDarkMode

  const seedToken = useContext(SeedTokenContext).value
  const themeMode = useContext(ThemeModeContext).value

  useEffect(() => {
    if (themeMode === 'auto') {
      console.log(`ThemeAppearance`)
      updateAntd4CssVars(isDarkMode, seedToken)
    }
  }, [seedToken, themeMode, isDarkMode])

  return null
}
