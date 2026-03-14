import type { ButtonElement } from '../../types'
import { stylePropsToCSS } from '../../lib/styleUtils'

interface Props {
  element: ButtonElement
}

export function ButtonRenderer({ element }: Props) {
  const css = stylePropsToCSS(element.style)

  return (
    <div
      style={{
        ...css,
        width: '100%',
        height: '100%',
        cursor: 'default',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {element.label || 'Button'}
    </div>
  )
}
