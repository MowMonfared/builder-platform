import type { StyleProps } from '../types'

/**
 * Convert StyleProps to React CSSProperties for canvas rendering.
 * Excludes x/y/width/height as those are managed by react-rnd.
 */
export function stylePropsToCSS(style: Partial<StyleProps>): React.CSSProperties {
  const css: React.CSSProperties = {}

  if (style.backgroundColor) css.backgroundColor = style.backgroundColor
  if (style.borderRadius !== undefined) css.borderRadius = style.borderRadius
  if (style.opacity !== undefined) css.opacity = style.opacity
  if (style.boxShadow) css.boxShadow = style.boxShadow

  // Border
  if (style.borderWidth !== undefined && style.borderWidth > 0) {
    css.borderWidth = style.borderWidth
    css.borderStyle = style.borderStyle ?? 'solid'
    css.borderColor = style.borderColor ?? '#000000'
  }

  // Spacing
  if (style.paddingTop !== undefined) css.paddingTop = style.paddingTop
  if (style.paddingRight !== undefined) css.paddingRight = style.paddingRight
  if (style.paddingBottom !== undefined) css.paddingBottom = style.paddingBottom
  if (style.paddingLeft !== undefined) css.paddingLeft = style.paddingLeft
  if (style.marginTop !== undefined) css.marginTop = style.marginTop
  if (style.marginRight !== undefined) css.marginRight = style.marginRight
  if (style.marginBottom !== undefined) css.marginBottom = style.marginBottom
  if (style.marginLeft !== undefined) css.marginLeft = style.marginLeft

  // Typography
  if (style.fontFamily) css.fontFamily = style.fontFamily
  if (style.fontSize !== undefined) css.fontSize = style.fontSize
  if (style.fontWeight !== undefined) css.fontWeight = style.fontWeight
  if (style.lineHeight !== undefined) css.lineHeight = style.lineHeight
  if (style.letterSpacing !== undefined) css.letterSpacing = style.letterSpacing
  if (style.color) css.color = style.color
  if (style.textAlign) css.textAlign = style.textAlign

  // Flex
  if (style.display) css.display = style.display
  if (style.flexDirection) css.flexDirection = style.flexDirection
  if (style.alignItems) css.alignItems = style.alignItems
  if (style.justifyContent) css.justifyContent = style.justifyContent
  if (style.flexWrap) css.flexWrap = style.flexWrap
  if (style.gap !== undefined) css.gap = style.gap

  // Overflow
  if (style.overflow) css.overflow = style.overflow

  // Rotation
  if (style.rotation !== undefined && style.rotation !== 0) {
    css.transform = `rotate(${style.rotation}deg)`
  }

  return css
}

export function getDefaultStyle(type: string): Partial<StyleProps> {
  const base: Partial<StyleProps> = {
    x: 100,
    y: 100,
    opacity: 1,
    rotation: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#000000',
    borderRadius: 0,
    boxShadow: '',
    overflow: 'visible',
  }

  switch (type) {
    case 'text':
      return {
        ...base,
        width: 200,
        height: 32,
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: 0,
        color: '#000000',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'left',
        backgroundColor: 'transparent',
      }
    case 'button':
      return {
        ...base,
        width: 120,
        height: 40,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 6,
        backgroundColor: '#0d99ff',
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 500,
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    case 'image':
      return {
        ...base,
        width: 200,
        height: 150,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
      }
    case 'container':
      return {
        ...base,
        width: 300,
        height: 200,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 8,
        overflow: 'visible',
      }
    default:
      return { ...base, width: 100, height: 100 }
  }
}
