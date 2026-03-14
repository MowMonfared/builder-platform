import type { TextElement } from '../../types'
import { stylePropsToCSS } from '../../lib/styleUtils'

interface Props {
  element: TextElement
}

export function TextRenderer({ element }: Props) {
  const css = stylePropsToCSS(element.style)

  return (
    <div
      style={{
        ...css,
        width: '100%',
        height: '100%',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        pointerEvents: 'none',
      }}
    >
      {element.content || 'Text'}
    </div>
  )
}
