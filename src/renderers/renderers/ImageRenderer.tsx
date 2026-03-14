import type { ImageElement } from '../../types'
import { stylePropsToCSS } from '../../lib/styleUtils'

interface Props {
  element: ImageElement
}

export function ImageRenderer({ element }: Props) {
  const css = stylePropsToCSS(element.style)

  return (
    <div
      style={{
        ...css,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {element.src ? (
        <img
          src={element.src}
          alt={element.alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: element.objectFit ?? 'cover',
            display: 'block',
          }}
          draggable={false}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e5e7eb',
            color: '#9ca3af',
            fontSize: 13,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Image
        </div>
      )}
    </div>
  )
}
