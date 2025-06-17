import { Button } from 'antd4'
import { useState } from 'react'

export default function Antd4Demo() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>Antd4Demo {count}</div>
      <Button type='primary' onClick={() => setCount(c => c + 1)}>
        官方组件
      </Button>
      <button>自定义组件</button>
    </>
  )
}
