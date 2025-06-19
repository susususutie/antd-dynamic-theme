import { useState, useMemo } from 'react'
import { initialSeedTokenValue, SeedTokenProvider } from './seedTokenContext'
import { initialPrefixValue, PrefixProvider } from './prefixContext'
import { initialThemeModeValue, ThemeModeProvider } from './themeModeContext'
import { useEffect } from 'react'
import updateAntd4CssVars from '../updateAntd4CssVars'

export default function StoreProvider({ children }) {
  const [prefixValue, setPrefixValue] = useState(initialPrefixValue)
  const prefixContext = useMemo(() => ({ value: prefixValue, update: setPrefixValue }), [prefixValue])

  const [seedTokenValue, setSeedTokenValue] = useState(initialSeedTokenValue)
  useEffect(() => {
    updateAntd4CssVars('ant', {
      primaryColor: initialSeedTokenValue.colorPrimary,
      infoColor: initialSeedTokenValue.colorInfo,
      successColor: initialSeedTokenValue.colorSuccess,
      errorColor: initialSeedTokenValue.colorError,
      warningColor: initialSeedTokenValue.colorWarning,
    })
  }, [])
  const seedTokenContext = useMemo(
    () => ({
      value: seedTokenValue,
      update: seed => {
        setSeedTokenValue(seed)
        updateAntd4CssVars('ant', {
          primaryColor: seed.colorPrimary,
          infoColor: seed.colorInfo,
          successColor: seed.colorSuccess,
          errorColor: seed.colorError,
          warningColor: seed.colorWarning,
        })
      },
    }),
    [seedTokenValue]
  )

  const [themeMode, setThemeMode] = useState(initialThemeModeValue)
  const themeModeContext = useMemo(() => ({ value: themeMode, update: setThemeMode }), [themeMode])

  useEffect(() => {
    window.test = {
      prefixContext,
      seedTokenContext,
      themeModeContext,
    }
  }, [prefixContext, seedTokenContext, themeModeContext])

  return (
    <PrefixProvider value={prefixContext}>
      <SeedTokenProvider value={seedTokenContext}>
        <ThemeModeProvider value={themeModeContext}>{children}</ThemeModeProvider>
      </SeedTokenProvider>
    </PrefixProvider>
  )
}
