import { createContext } from 'react'

export const initialPrefixValue = {
  prefixCls: 'ant5',
  iconPrefixCls: 'ant5-icon',
  // antd4prefixCls: 'ant',
  // antd4IconPrefixCls: 'ant-icon',
}

export const PrefixContext = createContext({ value: initialPrefixValue, update: () => void 0 })

export const PrefixProvider = PrefixContext.Provider
