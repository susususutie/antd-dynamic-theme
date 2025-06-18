import { useState, useMemo } from 'react'
import { initialSeedTokenValue, SeedTokenProvider } from './seedTokenContext'
import { initialPrefixValue, PrefixProvider } from './prefixContext'
import { useEffect } from 'react'
// import { ConfigProvider as ConfigProvider4 } from 'antd4'

export default function StoreProvider({ children }) {
  const [seedTokenValue, setSeedTokenValue] = useState(initialSeedTokenValue)

  const [prefixValue, setPrefixValue] = useState(initialPrefixValue)
  const prefixContext = useMemo(
    () => ({
      value: prefixValue,
      update: prefix => {
        // const { iconPrefixCls, prefixCls, antd4prefixCls, antd4IconPrefixCls, ..._theme } = theme
        console.log('update prefix', prefix)
        setPrefixValue(prefix)
        // ConfigProvider4.config({
        //   theme: {
        //     primaryColor: '#1b67d2',
        //     infoColor: '#1b67d2',
        //     successColor: '#4fcf0e',
        //     warningColor: '#e1a836',
        //     errorColor: '#da3437',
        //     textBaseColor: '#101010',
        //   },
        // })
      },
    }),
    [prefixValue]
  )
  const seedTokenContext = useMemo(
    () => ({
      value: seedTokenValue,
      update: seed => {
        console.log('update seed', seed)
        setSeedTokenValue(seed)
      },
    }),
    [seedTokenValue]
  )

  useEffect(() => {
    window.test = {
      prefixContext,
      seedTokenContext,
    }
  }, [prefixContext, seedTokenContext])

  return (
    <PrefixProvider value={prefixContext}>
      <SeedTokenProvider value={seedTokenContext}>{children}</SeedTokenProvider>
    </PrefixProvider>
  )
}
