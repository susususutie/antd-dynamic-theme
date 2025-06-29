import { useMemo, useReducer } from 'react'
import { SeedTokenProvider } from '../context/seedTokenContext'
import { initialPrefixValue, PrefixProvider } from '../context/prefixContext'
import { initialThemeModeValue, ThemeModeProvider } from '../context/themeModeContext'
import { useEffect } from 'react'
import updateAntd4CssVars from '../util/updateAntd4CssVars'
import { ConfigProvider } from 'antd'
import { ThemeProvider } from 'antd-style'
import { ConfigProvider as ConfigProvider4 } from 'antd4'
import '../style/antd4.variable.css'
import Antd4ThemeUpdater from './Antd4ThemeUpdater'

function storeReducer(state, action) {
  // 1. themeMode !== 'auto'，能确定 appearance 则直接调用 updateAntd4Theme
  // 2. themeMode === 'auto'，无法立即确定 appearance，则在 ThemeAppearance 组件中调用
  switch (action.type) {
    case 'update-prefix': {
      return {
        ...state,
        prefix: { ...state.prefix, ...action.payload },
      }
    }
    case 'update-themeMode': {
      if (action.payload !== 'auto') {
        updateAntd4CssVars(action.payload === 'dark', state.seedToken)
      }
      return {
        ...state,
        themeMode: action.payload,
      }
    }
    case 'update-seedToken': {
      if (state.themeMode !== 'auto') {
        updateAntd4CssVars(state.themeMode === 'dark', action.payload)
      }
      return {
        ...state,
        seedToken: { ...state.seedToken, ...action.payload },
      }
    }
    default: {
      return state
    }
  }
}

export default function StoreProvider(props) {
  const {
    children,
    themeMode = initialThemeModeValue,
    seedToken,
    configProviderProps4,
    prefixCls = initialPrefixValue.prefixCls,
    iconPrefixCls = initialPrefixValue.iconPrefixCls,
    ...configProviderProps
  } = props

  const [storeState, dispatch] = useReducer(storeReducer, {
    prefix: { prefixCls, iconPrefixCls },
    themeMode,
    seedToken,
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
