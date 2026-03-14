import { useCallback } from 'react'
import { useCanvasStore } from '../store/canvasStore'
import { useHistoryStore } from '../store/historyStore'
import { useSelectionStore } from '../store/selectionStore'
import type { CanvasSnapshot } from '../store/historyStore'

function applySnapshot(snap: CanvasSnapshot, clearSelection: () => void) {
  useCanvasStore.setState((state) => {
    const pg = state.pages.find((p) => p.id === snap.pageId)
    if (!pg) return state
    pg.elements = snap.elements
    pg.rootIds = snap.rootIds
    return { ...state }
  })
  clearSelection()
}

export function useHistory() {
  const canvasStore = useCanvasStore()
  const historyStore = useHistoryStore()
  const clearSelection = useSelectionStore((s) => s.clearSelection)

  const snapshot = useCallback(() => {
    const page = canvasStore.activePage()
    if (!page) return
    historyStore.pushSnapshot({
      elements: structuredClone(page.elements),
      rootIds: [...page.rootIds],
      pageId: page.id,
    })
  }, [canvasStore, historyStore])

  const undo = useCallback(() => {
    const page = canvasStore.activePage()
    if (!page) return
    historyStore.undo(
      (snap) => applySnapshot(snap, clearSelection),
      {
        elements: structuredClone(page.elements),
        rootIds: [...page.rootIds],
        pageId: page.id,
      }
    )
  }, [canvasStore, historyStore, clearSelection])

  const redo = useCallback(() => {
    const page = canvasStore.activePage()
    if (!page) return
    historyStore.redo(
      (snap) => applySnapshot(snap, clearSelection),
      {
        elements: structuredClone(page.elements),
        rootIds: [...page.rootIds],
        pageId: page.id,
      }
    )
  }, [canvasStore, historyStore, clearSelection])

  return { snapshot, undo, redo, canUndo: historyStore.canUndo, canRedo: historyStore.canRedo }
}
