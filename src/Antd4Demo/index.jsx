import { Button, Space, Menu, Tag, Alert } from 'antd4'
import { useState } from 'react'
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons'
import { Typography } from 'antd4'

export default function Antd4Demo() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Typography.Title level={3}>Antd4Demo {count}</Typography.Title>

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
        <button>自定义组件</button>
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
    </div>
  )
}
