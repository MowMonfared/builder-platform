import { useCallback, useMemo } from 'react'
import { Rnd } from 'react-rnd'
import type { CanvasElement as CanvasElementType } from '../../types'
import { useCanvasStore } from '../../store/canvasStore'
import { useSelectionStore } from '../../store/selectionStore'
import { useHistoryStore } from '../../store/historyStore'
import { ElementRenderer } from '../../renderers/ElementRenderer'

interface Props {
  elementId: string
  elements: Record<string, CanvasElementType>
  scale: number
}

export function CanvasElement({ elementId, elements, scale }: Props) {
  const element = elements[elementId]
  const updateElementStyle = useCanvasStore((s) => s.updateElementStyle)
  const activePage = useCanvasStore((s) => s.activePage)
  const selectedIds = useSelectionStore((s) => s.selectedIds)
  const hoveredId = useSelectionStore((s) => s.hoveredId)
  const select = useSelectionStore((s) => s.select)
  const setHovered = useSelectionStore((s) => s.setHovered)
  const pushSnapshot = useHistoryStore((s) => s.pushSnapshot)

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])
  const isSelected = selectedSet.has(elementId)
  const isHovered = hoveredId === elementId && !isSelected

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      select(elementId, e.shiftKey)
    },
    [elementId, select]
  )

  const snapshotPage = useCallback(() => {
    const page = activePage()
    if (page) {
      pushSnapshot({
        elements: structuredClone(page.elements),
        rootIds: [...page.rootIds],
        pageId: page.id,
      })
    }
  }, [activePage, pushSnapshot])

  if (!element || !element.visible) return null

  const style = element.style
  const x = style.x ?? 0
  const y = style.y ?? 0
  const width = style.width ?? 100
  const height = style.height ?? 100

  const renderChild = (childId: string) => (
    <CanvasElement key={childId} elementId={childId} elements={elements} scale={scale} />
  )

  return (
    <Rnd
      position={{ x, y }}
      size={{ width, height }}
      scale={scale}
      disableDragging={element.locked}
      enableResizing={!element.locked}
      onDragStart={snapshotPage}
      onDragStop={(_e, d) => {
        updateElementStyle(elementId, { x: d.x, y: d.y })
      }}
      onResizeStart={snapshotPage}
      onResizeStop={(_e, _dir, ref, _delta, pos) => {
        updateElementStyle(elementId, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          x: pos.x,
          y: pos.y,
        })
      }}
      style={{ zIndex: isSelected ? 10 : 1 }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(elementId)}
      onMouseLeave={() => setHovered(null)}
      bounds="parent"
      cancel=".no-drag"
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          outline: isSelected
            ? '2px solid #0d99ff'
            : isHovered
            ? '1px solid rgba(13,153,255,0.5)'
            : 'none',
          outlineOffset: '-1px',
          position: 'relative',
          userSelect: 'none',
        }}
      >
        <ElementRenderer
          element={element}
          elements={elements}
          renderChild={renderChild}
        />

        {/* Element label on hover/select */}
        {(isSelected || isHovered) && (
          <div
            style={{
              position: 'absolute',
              top: -20,
              left: 0,
              background: '#0d99ff',
              color: '#fff',
              fontSize: 10,
              padding: '1px 4px',
              borderRadius: '2px 2px 0 0',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 100,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {element.name}
          </div>
        )}
      </div>
    </Rnd>
  )
}
