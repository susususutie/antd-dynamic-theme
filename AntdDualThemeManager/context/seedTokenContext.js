import { createContext } from 'react'
// import antdSeedToken from 'antd/es/theme/themes/seed'

export const SeedTokenContext = createContext({ value: null, update: () => void 0 })

export const SeedTokenProvider = SeedTokenContext.Provider
