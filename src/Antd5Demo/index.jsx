import { Button, theme } from 'antd'
import { useState } from 'react'

export default function Antd5Demo() {
  const [count, setCount] = useState(0)
  const { token } = theme.useToken()

  console.log('antd5 token', token)

  return (
    <>
      <div>Antd5Demo {count}</div>
      <Button type='primary' onClick={() => setCount(c => c + 1)}>
        官方组件
      </Button>
      <button style={{ backgroundColor: token.colorPrimary, color: '#fff' }}>自定义组件</button>
    </>
  )
}
