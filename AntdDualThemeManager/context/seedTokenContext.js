import { createContext } from 'react'

/**
 * @type {import('antd/es/theme/internal').SeedToken}
 */
export const initialSeedTokenValue = {
  colorPrimary: '#3f51b5',
  colorInfo: '#0288d1',
  colorSuccess: '#2fad35',
  colorWarning: '#ed6c02',
  colorError: '#d32f2f',
  borderRadius: 2,
}

export const SeedTokenContext = createContext({ value: initialSeedTokenValue, update: () => void 0 })

export const SeedTokenProvider = SeedTokenContext.Provider
