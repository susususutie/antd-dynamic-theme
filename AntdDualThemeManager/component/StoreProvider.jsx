import { useMemo, useReducer } from 'react'
import { UpdaterProvider } from '../context/updaterContext'
import { initialSeedTokenValue, SeedTokenProvider } from '../context/seedTokenContext'
import { initialPrefixValue, PrefixProvider } from '../context/prefixContext'
import { initialThemeModeValue, ThemeModeProvider } from '../context/themeModeContext'
import { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { ThemeProvider } from 'antd-style'
import { ConfigProvider as ConfigProvider4 } from 'antd4'
import '../style/antd4.variable.css'
import Antd4ThemeUpdater from './Antd4ThemeUpdater'
import storeReducer from '../util/storeReducer'
import { useRef } from 'react'

export default function StoreProvider(props) {
  const {
    children,
    themeMode = initialThemeModeValue,
    seedToken = initialSeedTokenValue,
    configProviderProps4,
    prefixCls = initialPrefixValue.prefixCls,
    iconPrefixCls = initialPrefixValue.iconPrefixCls,
    ...configProviderProps
  } = props

  const isInitialMount = useRef(true)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      dispatch({ type: 'update-themeMode', payload: themeMode })
      dispatch({ type: 'update-seedToken', payload: seedToken })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [storeState, dispatch] = useReducer(storeReducer, {
    prefix: { prefixCls, iconPrefixCls },
    themeMode,
    seedToken: { ...initialSeedTokenValue, ...seedToken },
  })
  const themeUpdater = useMemo(
    () => ({
      updateThemeMode: payload => dispatch({ type: 'update-themeMode', payload }),
      updateSeedToken: payload => dispatch({ type: 'update-seedToken', payload }),
      updatePrefix: payload => dispatch({ type: 'update-prefix', payload }),
    }),
    []
  )

  useEffect(() => {
    window.dispatch = dispatch
    // dispatch({ type: 'update-themeMode', payload: 'auto' })
  }, [])

  return (
    <UpdaterProvider value={themeUpdater}>
      <PrefixProvider value={storeState.prefix}>
        <SeedTokenProvider value={storeState.seedToken}>
          <ThemeModeProvider value={storeState.themeMode}>
            <ConfigProvider
              {...configProviderProps}
              prefixCls={storeState.prefix.prefixCls}
              iconPrefixCls={storeState.prefix.iconPrefixCls}
              theme={{
                ...configProviderProps?.token,
                token: storeState.seedToken,
              }}
            >
              <ConfigProvider4 {...configProviderProps4}>
                <ThemeProvider themeMode={storeState.themeMode}>
                  <Antd4ThemeUpdater />
                  {children}
                </ThemeProvider>
              </ConfigProvider4>
            </ConfigProvider>
          </ThemeModeProvider>
        </SeedTokenProvider>
      </PrefixProvider>
    </UpdaterProvider>
  )
}
