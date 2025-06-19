# antd-dynamic-theme

多版本 antd 项目（antd@5 + antd@4）中，统一动态主题设置，分别需要测试各版本 antd 下官方组件、自定义组件、样式文件、动态加载组件的主题设置是否正确。

**antd@5**

1. 简单样式直接在组件中写行内样式

```jsx
import { theme } from 'antd'

const { token } = theme.useToken()

<div style={{ color: token.colorTextLightSolid }} ></div>
```

2. 复杂样式写在单独样式文件中，通过 `antd-style` 实现全局、局部的 `css in js` 样式

```js
import { createGlobalStyle, createStyles, css } from 'antd-style'

const useStyles = createStyles(() => ({}))
const GlobalStyle = createGlobalStyle``
```

**antd@4**

1. 尽量使用 antd@5 组件
2. 和 antd@5 一致，使用 `css in js`，旧的 css 文件中改为 css 变量的写法，且逐步优化
3. 暗色模式下样式一致性依旧存在问题，所以还是尽量使用 antd@5 的写法，新文件新写法，旧文件逐步替换
