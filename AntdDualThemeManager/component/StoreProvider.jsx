import { useMemo, useReducer } from 'react'
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
      dispatch({ type: 'update-seedToken', payload: { ...initialSeedTokenValue, ...seedToken } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [storeState, dispatch] = useReducer(storeReducer, {
    prefix: { prefixCls, iconPrefixCls },
    themeMode,
    seedToken: { ...initialSeedTokenValue, ...seedToken },
  })

  const prefixContext = useMemo(
    () => ({ value: storeState.prefix, update: prefix => dispatch({ type: 'update-prefix', payload: prefix }) }),
    [storeState.prefix]
  )

  const seedTokenContext = useMemo(
    () => ({
      value: storeState.seedToken,
      update: seedToken => dispatch({ type: 'update-seedToken', payload: seedToken }),
    }),
    [storeState.seedToken]
  )

  const themeModeContext = useMemo(
    () => ({ value: storeState.themeMode, update: theme => dispatch({ type: 'update-themeMode', payload: theme }) }),
    [storeState.themeMode]
  )

  useEffect(() => {
    window.dispatch = dispatch
    // dispatch({ type: 'update-themeMode', payload: 'auto' })
  }, [])

  return (
    <PrefixProvider value={prefixContext}>
      <SeedTokenProvider value={seedTokenContext}>
        <ThemeModeProvider value={themeModeContext}>
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
  )
}
