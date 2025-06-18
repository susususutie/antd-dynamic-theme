import { Button, Menu, Space, theme } from 'antd'
import { useState } from 'react'
import useStyles, { Global } from './useStyles'
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons'

export default function Antd5Demo() {
  const [count, setCount] = useState(0)

  // 1. 行内样式
  const { token } = theme.useToken()
  console.log('antd5 useToken', token.appearance)
  const inlineStyle = {
    outline: 'none',
    border: 'none',
    fontWeight: 400,
    fontSize: token.fontSize,
    height: token.controlHeight,
    padding: `${0}px ${token.paddingContentHorizontal - token.lineWidth}px`,
    borderRadius: token.borderRadius,
    color: token.colorTextLightSolid,
    backgroundColor: token.colorPrimary,
    cursor: 'pointer',
  }

  // 2. 单独样式文件 (css in js)
  const { cx, styles, theme: t } = useStyles({ border: false })
  console.log('antd5 useStyles', t.appearance, t.themeMode)

  return (
    <>
      <div>Antd5Demo {count}</div>

      <Global />

      <Space>
        <Button type='primary' onClick={() => setCount(c => c + 1)}>
          官方组件
        </Button>
        <button style={inlineStyle}>
          <span>自定义组件</span>
        </button>
      </Space>

      <Menu
        mode='horizontal'
        items={[
          {
            label: 'Navigation One',
            key: 'mail',
            icon: <MailOutlined />,
          },
          {
            label: 'Navigation Two',
            key: 'app',
            icon: <AppstoreOutlined />,
            disabled: true,
          },
        ]}
      />

      <div className={styles.container}>
        <Space direction='vertical' style={{ width: '100%' }} size={16}>
          <div className={styles.defaultCard}>普通卡片</div>
          <div className={cx(styles.baseCard, styles.primaryCard)}>主要卡片</div>
        </Space>
      </div>
    </>
  )
}
