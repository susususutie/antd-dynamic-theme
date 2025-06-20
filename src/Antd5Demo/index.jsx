import { Button, Menu, Space, theme, Tag, Alert, Typography } from 'antd'
import { useState } from 'react'
import { Global, useStyles } from './styles'
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons'

export default function Antd5Demo() {
  const [count, setCount] = useState(0)

  // 1. 行内样式
  const { token } = theme.useToken()
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
  const { cx, styles } = useStyles({ border: false })

  return (
    <div>
      <Typography.Title level={3}>Antd5Demo {count}</Typography.Title>

      <Global />

      <div style={{ marginBottom: 16 }}>
        <Tag color='success'>success</Tag>
        <Tag color='processing'>processing</Tag>
        <Tag color='error'>error</Tag>
        <Tag color='warning'>warning</Tag>
        <Tag color='default'>default</Tag>
      </div>

      <Space direction='vertical' style={{ width: '100%', marginBottom: 16 }}>
        <Alert message='Success Text' type='success' />
        <Alert message='Info Text' type='info' />
        <Alert message='Warning Text' type='warning' />
        <Alert message='Error Text' type='error' />
      </Space>

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
    </div>
  )
}
