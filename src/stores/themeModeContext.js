import { createContext } from 'react'

/**
 * 主题模式有三种，最终显示的主题效果只有两种，dark和light
 * dark | light | auto
 */
export const initialThemeModeValue = 'auto'

export const ThemeModeContext = createContext({ value: initialThemeModeValue, update: () => void 0 })

export const ThemeModeProvider = ThemeModeContext.Provider
