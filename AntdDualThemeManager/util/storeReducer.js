import updateAntd4CssVars from './updateAntd4CssVars'

export default function storeReducer(state, action) {
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
