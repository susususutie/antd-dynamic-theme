import { createContext } from 'react'

export const initialSeedTokenValue = {
  colorPrimary: '#3f51b5',
  colorInfo: '#0288d1',
  colorSuccess: '#2e7d32',
  colorWarning: '#ed6c02',
  colorError: '#d32f2f',
}

export const SeedTokenContext = createContext({ value: initialSeedTokenValue, update: () => void 0 })

export const SeedTokenProvider = SeedTokenContext.Provider
