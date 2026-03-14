import type { CanvasElement } from '../types'
import { TextRenderer } from './renderers/TextRenderer'
import { ButtonRenderer } from './renderers/ButtonRenderer'
import { ImageRenderer } from './renderers/ImageRenderer'
import { ContainerRenderer } from './renderers/ContainerRenderer'
import { ShadcnCanvasRenderer } from './ShadcnCanvasRenderer'

interface Props {
  element: CanvasElement
  elements: Record<string, CanvasElement>
  renderChild: (childId: string) => React.ReactNode
}

export function ElementRenderer({ element, elements, renderChild }: Props) {
  switch (element.type) {
    case 'text':
      return <TextRenderer element={element} />
    case 'button':
      return <ButtonRenderer element={element} />
    case 'image':
      return <ImageRenderer element={element} />
    case 'container':
      return (
        <ContainerRenderer
          element={element}
          elements={elements}
          renderChild={renderChild}
        />
      )
    case 'shadcn':
      return <ShadcnCanvasRenderer element={element} />
    case 'component-instance':
    case 'block-instance':
      return (
        <div
          style={{
            width: '100%', height: '100%', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#f3f4f6', border: '1px dashed #9ca3af',
            fontSize: 12, color: '#6b7280', fontFamily: 'Inter, sans-serif',
          }}
        >
          {element.name}
        </div>
      )
    default:
      return null
  }
}
