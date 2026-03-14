import type { ContainerElement, CanvasElement } from '../../types'
import { stylePropsToCSS } from '../../lib/styleUtils'

interface Props {
  element: ContainerElement
  elements: Record<string, CanvasElement>
  renderChild: (childId: string) => React.ReactNode
}

export function ContainerRenderer({ element, renderChild }: Props) {
  const css = stylePropsToCSS(element.style)

  return (
    <div
      style={{
        ...css,
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {element.children.map((childId) => renderChild(childId))}
    </div>
  )
}
