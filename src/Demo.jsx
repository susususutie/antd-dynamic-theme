import { App as AntApp } from 'antd'
import Antd5Demo from './Antd5Demo'
import Antd4Demo from './Antd4Demo'
import { ConfigProvider as ConfigProvider4 } from 'antd4'
import zhCN4 from 'antd4/es/locale/zh_CN'

export default function Demo() {
  return (
    <AntApp>
      <Antd5Demo />
      <ConfigProvider4 locale={zhCN4}>
        <Antd4Demo />
      </ConfigProvider4>
    </AntApp>
  )
}
