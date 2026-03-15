import { useRef, useEffect, useCallback } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { useCanvasStore } from '../../store/canvasStore'
import { useSelectionStore } from '../../store/selectionStore'
import { useUiStore } from '../../store/uiStore'
import { useCanvasZoom } from '../../hooks/useCanvasZoom'
import { CanvasElement } from './CanvasElement'

export function Canvas() {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const activePage = useCanvasStore((s) => s.activePage)
  const activePageId = useCanvasStore((s) => s.activePageId)
  const canvasTransform = useCanvasStore((s) => s.canvasTransform)
  const setCanvasTransform = useCanvasStore((s) => s.setCanvasTransform)
  const clearSelection = useSelectionStore((s) => s.clearSelection)
  const gridEnabled = useUiStore((s) => s.gridEnabled)

  const page = activePage()
  const { handleWheel, handleMiddleMouseDown, handleMouseMove, handleMouseUp } =
    useCanvasZoom(viewportRef)

  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-drop-zone' })

  // Wire up wheel events non-passively
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const wheelHandler = (e: WheelEvent) => handleWheel(e)
    const mouseDownHandler = (e: MouseEvent) => handleMiddleMouseDown(e)
    const mouseMoveHandler = (e: MouseEvent) => handleMouseMove(e)
    const mouseUpHandler = () => handleMouseUp()

    el.addEventListener('wheel', wheelHandler, { passive: false })
    el.addEventListener('mousedown', mouseDownHandler)
    window.addEventListener('mousemove', mouseMoveHandler)
    window.addEventListener('mouseup', mouseUpHandler)

    return () => {
      el.removeEventListener('wheel', wheelHandler)
      el.removeEventListener('mousedown', mouseDownHandler)
      window.removeEventListener('mousemove', mouseMoveHandler)
      window.removeEventListener('mouseup', mouseUpHandler)
    }
  }, [handleWheel, handleMiddleMouseDown, handleMouseMove, handleMouseUp])

  // Center the artboard at 50% zoom whenever the active project changes
  useEffect(() => {
    const el = viewportRef.current
    const pg = useCanvasStore.getState().activePage()
    if (!el || !pg) return
    const scale = 0.5
    const offsetX = (el.offsetWidth - pg.canvasWidth * scale) / 2
    const offsetY = Math.max(40, (el.offsetHeight - pg.canvasHeight * scale) / 4)
    setCanvasTransform({ scale, offsetX, offsetY })
  }, [activePageId, setCanvasTransform])

  const handleBackgroundClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        clearSelection()
      }
    },
    [clearSelection]
  )

  if (!page) return null

  const { scale, offsetX, offsetY } = canvasTransform
  const gridSize = 8

  return (
    <div
      ref={(node) => {
        viewportRef.current = node
        setNodeRef(node)
      }}
      className="relative flex-1 overflow-hidden"
      style={{
        backgroundColor: '#f8f8f8',
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        cursor: 'default',
      }}
      onClick={handleBackgroundClick}
    >
      {/* Grid overlay */}
      {gridEnabled && (
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <defs>
            <pattern
              id="grid"
              width={gridSize * scale}
              height={gridSize * scale}
              x={offsetX % (gridSize * scale)}
              y={offsetY % (gridSize * scale)}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${gridSize * scale} 0 L 0 0 0 ${gridSize * scale}`}
                fill="none"
                stroke="rgba(0,0,0,0.08)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      )}

      {/* Canvas artboard */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transformOrigin: '0 0',
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
        }}
      >
        {/* Artboard (the white page) */}
        <div
          style={{
            position: 'relative',
            width: page.canvasWidth,
            height: page.canvasHeight,
            backgroundColor: page.background,
            boxShadow: '0 0 0 1px rgba(0,0,0,0.15), 0 4px 32px rgba(0,0,0,0.4)',
            overflow: 'visible',
          }}
          onClick={handleBackgroundClick}
        >
          {/* Drop indicator */}
          {isOver && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                border: '2px dashed #0d99ff',
                pointerEvents: 'none',
                zIndex: 999,
                borderRadius: 2,
              }}
            />
          )}

          {/* Render root elements */}
          {page.rootIds.map((id) => (
            <CanvasElement
              key={id}
              elementId={id}
              elements={page.elements}
              scale={scale}
            />
          ))}
        </div>
      </div>

      {/* Zoom level indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          background: 'rgba(0,0,0,0.12)',
          color: '#6b7280',
          fontSize: 11,
          padding: '3px 8px',
          borderRadius: 4,
          fontFamily: 'Inter, sans-serif',
          pointerEvents: 'none',
        }}
      >
        {Math.round(scale * 100)}%
      </div>
    </div>
  )
}
