import { createContext } from 'react'

export const initialThemeValue = {
  prefixCls: 'ant5',
  iconPrefixCls: 'ant5-icon',
  antd4prefixCls: 'ant',
  antd4IconPrefixCls: 'ant-icon',

  colorPrimary: '#1b67d2',
  colorInfo: '#1b67d2',
  colorSuccess: '#4fcf0e',
  colorWarning: '#e1a836',
  colorError: '#da3437',
}

export const ThemeContext = createContext({ value: initialThemeValue, update: () => void 0 })

export const ThemeProvider = ThemeContext.Provider
