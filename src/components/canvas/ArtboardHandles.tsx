import { useEffect, useRef } from 'react'
import { useCanvasStore } from '../../store/canvasStore'

type Dir = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w'

interface Props {
  /** Screen-space rect of the artboard */
  left: number
  top: number
  width: number
  height: number
  scale: number
  pageName: string
  canvasWidth: number
  canvasHeight: number
  pageId: string
}

const HANDLES: { dir: Dir; xPct: number; yPct: number; cursor: string }[] = [
  { dir: 'nw', xPct: 0,   yPct: 0,   cursor: 'nw-resize' },
  { dir: 'n',  xPct: 0.5, yPct: 0,   cursor: 'n-resize'  },
  { dir: 'ne', xPct: 1,   yPct: 0,   cursor: 'ne-resize' },
  { dir: 'e',  xPct: 1,   yPct: 0.5, cursor: 'e-resize'  },
  { dir: 'se', xPct: 1,   yPct: 1,   cursor: 'se-resize' },
  { dir: 's',  xPct: 0.5, yPct: 1,   cursor: 's-resize'  },
  { dir: 'sw', xPct: 0,   yPct: 1,   cursor: 'sw-resize' },
  { dir: 'w',  xPct: 0,   yPct: 0.5, cursor: 'w-resize'  },
]

const MIN = 80 // minimum canvas dimension in canvas units

export function ArtboardHandles({
  left, top, width, height, scale,
  pageName, canvasWidth, canvasHeight, pageId,
}: Props) {
  const updatePage = useCanvasStore((s) => s.updatePage)
  const setCanvasTransform = useCanvasStore((s) => s.setCanvasTransform)
  const dragging = useRef<{
    dir: Dir
    startX: number; startY: number
    startW: number; startH: number
    startOffsetX: number; startOffsetY: number
  } | null>(null)

  // Handle size in screen px (constant regardless of zoom)
  const H = 7

  function onMouseDown(dir: Dir, e: React.MouseEvent) {
    e.stopPropagation()
    e.preventDefault()
    const { offsetX, offsetY } = useCanvasStore.getState().canvasTransform
    dragging.current = {
      dir,
      startX: e.clientX,
      startY: e.clientY,
      startW: canvasWidth,
      startH: canvasHeight,
      startOffsetX: offsetX,
      startOffsetY: offsetY,
    }
  }

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const d = dragging.current
      if (!d) return

      const dx = e.clientX - d.startX  // screen px
      const dy = e.clientY - d.startY

      // Deltas in canvas units
      const du = dx / scale
      const dv = dy / scale

      let newW = d.startW
      let newH = d.startH
      let newOffsetX = d.startOffsetX
      let newOffsetY = d.startOffsetY

      const dir = d.dir

      // Width changes
      if (dir === 'e' || dir === 'se' || dir === 'ne') {
        newW = Math.max(MIN, d.startW + du)
      }
      if (dir === 'w' || dir === 'sw' || dir === 'nw') {
        newW = Math.max(MIN, d.startW - du)
        // Offset moves with the left edge in screen px
        newOffsetX = d.startOffsetX + Math.min(dx, (d.startW - MIN) * scale)
      }

      // Height changes
      if (dir === 's' || dir === 'se' || dir === 'sw') {
        newH = Math.max(MIN, d.startH + dv)
      }
      if (dir === 'n' || dir === 'ne' || dir === 'nw') {
        newH = Math.max(MIN, d.startH - dv)
        newOffsetY = d.startOffsetY + Math.min(dy, (d.startH - MIN) * scale)
      }

      updatePage(pageId, { canvasWidth: Math.round(newW), canvasHeight: Math.round(newH) })
      setCanvasTransform({ offsetX: newOffsetX, offsetY: newOffsetY })
    }

    function onUp() {
      dragging.current = null
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [scale, pageId, updatePage, setCanvasTransform])

  return (
    <>
      {/* Page name label above artboard */}
      <div
        style={{
          position: 'absolute',
          left,
          top: top - 22,
          fontSize: 11,
          color: '#3b82f6',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        {pageName}
      </div>

      {/* Blue selection border */}
      <div
        style={{
          position: 'absolute',
          left,
          top,
          width,
          height,
          border: '2px solid #3b82f6',
          borderRadius: 4,
          pointerEvents: 'none',
          boxSizing: 'border-box',
        }}
      />

      {/* Resize handles */}
      {HANDLES.map(({ dir, xPct, yPct, cursor }) => {
        const hx = left + width * xPct - H / 2
        const hy = top + height * yPct - H / 2
        return (
          <div
            key={dir}
            onMouseDown={(e) => onMouseDown(dir, e)}
            style={{
              position: 'absolute',
              left: hx,
              top: hy,
              width: H,
              height: H,
              backgroundColor: '#ffffff',
              border: '1.5px solid #3b82f6',
              borderRadius: 1,
              cursor,
              zIndex: 1000,
              boxSizing: 'border-box',
            }}
          />
        )
      })}

      {/* Dimension badge at bottom center */}
      <div
        style={{
          position: 'absolute',
          left: left + width / 2,
          top: top + height + 10,
          transform: 'translateX(-50%)',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          fontSize: 11,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          padding: '3px 10px',
          borderRadius: 4,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        {canvasWidth} × {canvasHeight}
      </div>
    </>
  )
}
