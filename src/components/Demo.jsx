import Antd5Demo from './Antd5Demo'
import Antd4Demo from './Antd4Demo'

export default function Demo() {
  return (
    <div style={{ padding: 24, display: 'flex', gap: 16 }}>
      <Antd5Demo />
      <Antd4Demo />
    </div>
  )
}
