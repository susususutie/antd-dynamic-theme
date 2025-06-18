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
