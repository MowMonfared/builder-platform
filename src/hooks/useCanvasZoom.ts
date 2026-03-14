import { useCallback, useRef } from 'react'
import { useCanvasStore } from '../store/canvasStore'

const MIN_SCALE = 0.1
const MAX_SCALE = 5

export function useCanvasZoom(viewportRef: React.RefObject<HTMLDivElement | null>) {
  const setCanvasTransform = useCanvasStore((s) => s.setCanvasTransform)
  const isPanning = useRef(false)
  const lastPan = useRef({ x: 0, y: 0 })

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      const { canvasTransform } = useCanvasStore.getState()

      if (e.ctrlKey || e.metaKey) {
        // Zoom
        const delta = e.deltaY < 0 ? 1.1 : 0.9
        const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, canvasTransform.scale * delta))

        // Zoom toward cursor
        const rect = viewportRef.current?.getBoundingClientRect()
        if (!rect) return
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const scaleChange = newScale / canvasTransform.scale
        const newOffsetX = mouseX - scaleChange * (mouseX - canvasTransform.offsetX)
        const newOffsetY = mouseY - scaleChange * (mouseY - canvasTransform.offsetY)

        setCanvasTransform({ scale: newScale, offsetX: newOffsetX, offsetY: newOffsetY })
      } else {
        // Pan
        setCanvasTransform({
          offsetX: canvasTransform.offsetX - e.deltaX,
          offsetY: canvasTransform.offsetY - e.deltaY,
        })
      }
    },
    [setCanvasTransform, viewportRef]
  )

  const handleMiddleMouseDown = useCallback((e: MouseEvent) => {
    if (e.button === 1) {
      e.preventDefault()
      isPanning.current = true
      lastPan.current = { x: e.clientX, y: e.clientY }
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isPanning.current) return
      const dx = e.clientX - lastPan.current.x
      const dy = e.clientY - lastPan.current.y
      lastPan.current = { x: e.clientX, y: e.clientY }
      const { canvasTransform } = useCanvasStore.getState()
      setCanvasTransform({
        offsetX: canvasTransform.offsetX + dx,
        offsetY: canvasTransform.offsetY + dy,
      })
    },
    [setCanvasTransform]
  )

  const handleMouseUp = useCallback(() => {
    isPanning.current = false
  }, [])

  return { handleWheel, handleMiddleMouseDown, handleMouseMove, handleMouseUp }
}
