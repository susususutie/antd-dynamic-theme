import { useMemo, useReducer } from 'react'
import { initialSeedTokenValue, SeedTokenProvider } from '../context/seedTokenContext'
import { initialPrefixValue, PrefixProvider } from '../context/prefixContext'
import { initialThemeModeValue, ThemeModeProvider } from '../context/themeModeContext'
import { useEffect } from 'react'
import updateAntd4CssVars from '../util/updateAntd4CssVars'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn' // for date-picker i18n
import { ThemeProvider } from 'antd-style'
import { ConfigProvider as ConfigProvider4 } from 'antd4'
import zhCN4 from 'antd4/es/locale/zh_CN'
import '../style/antd4.variable.css'
import Antd4ThemeUpdater from './Antd4ThemeUpdater'

const initialStoreState = {
  prefix: initialPrefixValue,
  themeMode: initialThemeModeValue,
  seedToken: initialSeedTokenValue,
}

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
  const { children } = props

  const [storeState, dispatch] = useReducer(storeReducer, initialStoreState)

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
            prefixCls={storeState.prefix.prefixCls}
            iconPrefixCls={storeState.prefix.iconPrefixCls}
            locale={zhCN}
            theme={{
              token: storeState.seedToken,
            }}
          >
            <ConfigProvider4 locale={zhCN4}>
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
