import { useState, useMemo } from 'react'
import { initialSeedTokenValue, SeedTokenProvider } from './seedTokenContext'
import { initialPrefixValue, PrefixProvider } from './prefixContext'
import { initialThemeModeValue, ThemeModeProvider } from './themeModeContext'
import { useEffect } from 'react'

export default function StoreProvider({ children }) {
  const [prefixValue, setPrefixValue] = useState(initialPrefixValue)
  const prefixContext = useMemo(() => ({ value: prefixValue, update: setPrefixValue }), [prefixValue])

  const [seedTokenValue, setSeedTokenValue] = useState(initialSeedTokenValue)
  const seedTokenContext = useMemo(() => ({ value: seedTokenValue, update: setSeedTokenValue }), [seedTokenValue])

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
