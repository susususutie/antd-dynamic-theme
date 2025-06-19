import { createContext } from 'react'

export const initialPrefixValue = {
  prefixCls: 'ant5',
  iconPrefixCls: 'ant5icon',
}

export const PrefixContext = createContext({ value: initialPrefixValue, update: () => void 0 })

export const PrefixProvider = PrefixContext.Provider
