import { createContext } from 'react'

export const initialSeedTokenValue = {
  colorPrimary: '#1b67d2',
  colorInfo: '#1b67d2',
  colorSuccess: '#4fcf0e',
  colorWarning: '#e1a836',
  colorError: '#da3437',
}

export const SeedTokenContext = createContext({ value: initialSeedTokenValue, update: () => void 0 })

export const SeedTokenProvider = SeedTokenContext.Provider
