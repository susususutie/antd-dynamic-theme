import { useContext } from 'react'
import Demo from './components/Demo'
import { SeedTokenContext, UpdaterContext } from 'antd-dual-theme-manager/index.js'
import { Button } from 'antd'

function App() {
  // TODO 动态加载组件，测试自定义样式是否被覆盖
  const seedToken = useContext(SeedTokenContext)
  const updater = useContext(UpdaterContext)


  return (
    <div>
      <Button
        onClick={() =>
          updater.updateSeedToken({
            colorPrimary: '#' + Math.round(Math.random() * 0xffffff).toString(16),
          })
        }
      >
        更新{seedToken?.colorPrimary}
      </Button>
      <Demo />
    </div>
  )
}

export default App
