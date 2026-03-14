import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useState, useCallback } from 'react'
import { TopToolbar } from '../toolbar/TopToolbar'
import { LeftSidebar } from './LeftSidebar'
import { LeftPanel } from './LeftPanel'
import { RightPanel } from './RightPanel'
import { Canvas } from '../canvas/Canvas'
import { useCanvasStore } from '../../store/canvasStore'
import { useSelectionStore } from '../../store/selectionStore'
import { useLibraryStore } from '../../store/libraryStore'
import { useHistoryStore } from '../../store/historyStore'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import { generateId } from '../../lib/idGenerator'
import type { CanvasElement, BlockDefinition } from '../../types'

export function AppShell() {
  useKeyboardShortcuts()

  const addElement = useCanvasStore((s) => s.addElement)
  const activePage = useCanvasStore((s) => s.activePage)
  const canvasTransform = useCanvasStore((s) => s.canvasTransform)
  const select = useSelectionStore((s) => s.select)
  const getComponent = useLibraryStore((s) => s.getComponent)
  const getBlock = useLibraryStore((s) => s.getBlock)
  const pushSnapshot = useHistoryStore((s) => s.pushSnapshot)

  const [dragSource, setDragSource] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setDragSource(String(event.active.id))
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setDragSource(null)
      const { active, over } = event

      if (!over || over.id !== 'canvas-drop-zone') return

      const data = active.data.current as Record<string, unknown>
      if (!data) return

      const page = activePage()
      if (!page) return

      // Compute drop position relative to the artboard
      const { scale, offsetX, offsetY } = canvasTransform
      // Approximate drop at center of viewport
      const dropX = Math.max(0, (window.innerWidth / 2 - offsetX) / scale)
      const dropY = Math.max(0, (window.innerHeight / 2 - offsetY) / scale)

      // Take a snapshot for undo
      pushSnapshot({
        elements: JSON.parse(JSON.stringify(page.elements)),
        rootIds: [...page.rootIds],
        pageId: page.id,
      })

      if (data.type === 'ASSET_COMPONENT') {
        const comp = getComponent(data.componentDefId as string)
        if (!comp) return

        const newId = generateId('el')
        const cloned: CanvasElement = {
          ...JSON.parse(JSON.stringify(comp.rootElement)),
          id: newId,
          name: comp.name,
          parentId: null,
          children: [],
          style: {
            ...comp.rootElement.style,
            x: dropX - ((comp.rootElement.style.width as number) ?? 100) / 2,
            y: dropY - ((comp.rootElement.style.height as number) ?? 50) / 2,
          },
        }
        addElement(cloned)
        select(newId)
      }

      if (data.type === 'ASSET_BLOCK') {
        const block = getBlock(data.blockDefId as string)
        if (!block) return
        addBlockToCanvas(block, dropX, dropY, addElement, select, page.elements)
      }
    },
    [activePage, canvasTransform, addElement, select, getComponent, getBlock, pushSnapshot]
  )

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f0f2f4]">
        <TopToolbar />
        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar />
          <LeftPanel />
          <Canvas />
          <RightPanel />
        </div>
      </div>

      {/* Drag overlay for visual feedback */}
      <DragOverlay>
        {dragSource ? (
          <div className="bg-[#0d99ff] text-white text-xs px-2 py-1 rounded shadow-lg opacity-80">
            Drop on canvas
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

/** Deep-clone a block's elements and place them on the canvas */
function addBlockToCanvas(
  block: BlockDefinition,
  dropX: number,
  dropY: number,
  addElement: (el: CanvasElement, parentId?: string | null) => void,
  select: (id: string) => void,
  _existingElements: Record<string, CanvasElement>
) {
  // Generate new IDs for all elements in the block
  const idMap: Record<string, string> = {}
  Object.keys(block.elements).forEach((oldId) => {
    idMap[oldId] = generateId('el')
  })

  // Re-map and add each element
  const rootElements: CanvasElement[] = []

  block.rootIds.forEach((rootId) => {
    const processElement = (oldId: string, parentId: string | null) => {
      const el = block.elements[oldId]
      if (!el) return

      const newId = idMap[oldId]
      const newEl: CanvasElement = {
        ...JSON.parse(JSON.stringify(el)),
        id: newId,
        parentId,
        children: el.children.map((cid) => idMap[cid] ?? cid),
      }

      // Offset root elements to drop position
      if (parentId === null) {
        newEl.style = {
          ...newEl.style,
          x: dropX - ((newEl.style.width as number) ?? 0) / 2,
          y: dropY - ((newEl.style.height as number) ?? 0) / 2,
        }
        rootElements.push(newEl)
      }

      addElement(newEl, parentId)

      // Recursively process children
      el.children.forEach((childId) => processElement(childId, newId))
    }

    processElement(rootId, null)
  })

  // Select the first root element
  if (rootElements.length > 0) {
    select(rootElements[0].id)
  }
}
