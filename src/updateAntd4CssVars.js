import { updateCSS } from 'rc-util/lib/Dom/dynamicCSS'
import { generate } from '@ant-design/colors';
import { TinyColor } from '@ctrl/tinycolor';

const dynamicStyleMark = `-ant-${Date.now()}-${Math.random()}`

function getStyle(prefixCls, seedToken) {
  const variables = {}

  const formatColor = (color, updater) => {
    let clone = color.clone()
    clone = updater?.(clone) || clone
    return clone.toRgbString()
  }

  const fillColor = (colorVal, type) => {
    const baseColor = new TinyColor(colorVal)
    const colorPalettes = generate(baseColor.toRgbString())

    variables[`${type}-color`] = formatColor(baseColor)
    variables[`${type}-color-disabled`] = colorPalettes[1]
    variables[`${type}-color-hover`] = colorPalettes[4]
    variables[`${type}-color-active`] = colorPalettes[6]
    variables[`${type}-color-outline`] = baseColor.clone().setAlpha(0.2).toRgbString()
    variables[`${type}-color-deprecated-bg`] = colorPalettes[0]
    variables[`${type}-color-deprecated-border`] = colorPalettes[2]
  }

  // ================ Primary Color ================
  if (seedToken.primaryColor) {
    fillColor(seedToken.primaryColor, 'primary')

    const primaryColor = new TinyColor(seedToken.primaryColor)
    const primaryColors = generate(primaryColor.toRgbString())

    // Legacy - We should use semantic naming standard
    primaryColors.forEach((color, index) => {
      variables[`primary-${index + 1}`] = color
    })
    // Deprecated
    variables['primary-color-deprecated-l-35'] = formatColor(primaryColor, c => c.lighten(35))
    variables['primary-color-deprecated-l-20'] = formatColor(primaryColor, c => c.lighten(20))
    variables['primary-color-deprecated-t-20'] = formatColor(primaryColor, c => c.tint(20))
    variables['primary-color-deprecated-t-50'] = formatColor(primaryColor, c => c.tint(50))
    variables['primary-color-deprecated-f-12'] = formatColor(primaryColor, c => c.setAlpha(c.getAlpha() * 0.12))

    const primaryActiveColor = new TinyColor(primaryColors[0])
    variables['primary-color-active-deprecated-f-30'] = formatColor(primaryActiveColor, c =>
      c.setAlpha(c.getAlpha() * 0.3)
    )
    variables['primary-color-active-deprecated-d-02'] = formatColor(primaryActiveColor, c => c.darken(2))
  }

  // ================ Success Color ================
  if (seedToken.successColor) {
    fillColor(seedToken.successColor, 'success')
  }

  // ================ Warning Color ================
  if (seedToken.warningColor) {
    fillColor(seedToken.warningColor, 'warning')
  }

  // ================= Error Color =================
  if (seedToken.errorColor) {
    fillColor(seedToken.errorColor, 'error')
  }

  // ================= Info Color ==================
  if (seedToken.infoColor) {
    fillColor(seedToken.infoColor, 'info')
  }

  // Convert to css variables
  const cssList = Object.keys(variables).map(key => `--${prefixCls}-${key}: ${variables[key]};`)

  return `
  :root {
    ${cssList.join('\n')}
  }
  `.trim()
}

/**
 * 替换官方的 ConfigProvider4.config 方法
 * ConfigProvider4.config 的本质是根据传入主题生成一系列 CSS 变量，然后将 CSS 变量写入到 DOM 中
 * 但官方方法支持的变量较少，自定义方法中扩充了部分 antd5 的变量
 */
export default function updateAntd4CssVars(prefixCls, seedToken) {
  const style = getStyle(prefixCls, seedToken)
  console.log('style', style === _result)
  updateCSS(style, `${dynamicStyleMark}-dynamic-theme`)
}


const _result = `:root {
    --ant-primary-color: rgb(63, 81, 181);
--ant-primary-color-disabled: #dadee8;
--ant-primary-color-hover: #6374c2;
--ant-primary-color-active: #2b378f;
--ant-primary-color-outline: rgba(63, 81, 181, 0.2);
--ant-primary-color-deprecated-bg: #e6ebf5;
--ant-primary-color-deprecated-border: #b6bfdb;
--ant-primary-1: #e6ebf5;
--ant-primary-2: #dadee8;
--ant-primary-3: #b6bfdb;
--ant-primary-4: #8a99cf;
--ant-primary-5: #6374c2;
--ant-primary-6: #3f51b5;
--ant-primary-7: #2b378f;
--ant-primary-8: #1a2169;
--ant-primary-9: #0d1042;
--ant-primary-10: #05061c;
--ant-primary-color-deprecated-l-35: rgb(190, 197, 232);
--ant-primary-color-deprecated-l-20: rgb(133, 145, 213);
--ant-primary-color-deprecated-t-20: rgb(101, 116, 196);
--ant-primary-color-deprecated-t-50: rgb(159, 168, 218);
--ant-primary-color-deprecated-f-12: rgba(63, 81, 181, 0.12);
--ant-primary-color-active-deprecated-f-30: rgba(230, 235, 245, 0.3);
--ant-primary-color-active-deprecated-d-02: rgb(223, 229, 242);
--ant-success-color: rgb(47, 173, 53);
--ant-success-color-disabled: #cee0cc;
--ant-success-color-hover: #50ba52;
--ant-success-color-active: #1e8727;
--ant-success-color-outline: rgba(47, 173, 53, 0.2);
--ant-success-color-deprecated-bg: #e1eddf;
--ant-success-color-deprecated-border: #a1d49f;
--ant-warning-color: rgb(237, 108, 2);
--ant-warning-color-disabled: #ffdaa6;
--ant-warning-color-hover: #fa8f2a;
--ant-warning-color-active: #c75300;
--ant-warning-color-outline: rgba(237, 108, 2, 0.2);
--ant-warning-color-deprecated-bg: #fff5e6;
--ant-warning-color-deprecated-border: #ffc47d;
--ant-error-color: rgb(211, 47, 47);
--ant-error-color-disabled: #ffe0db;
--ant-error-color-hover: #e05a55;
--ant-error-color-active: #ad1d22;
--ant-error-color-outline: rgba(211, 47, 47, 0.2);
--ant-error-color-deprecated-bg: #fff2f0;
--ant-error-color-deprecated-border: #fab6af;
--ant-info-color: rgb(2, 136, 209);
--ant-info-color-disabled: #a6ecff;
--ant-info-color-hover: #26a4de;
--ant-info-color-active: #0069ab;
--ant-info-color-outline: rgba(2, 136, 209, 0.2);
--ant-info-color-deprecated-bg: #e6faff;
--ant-info-color-deprecated-border: #79d8f7;
  }`