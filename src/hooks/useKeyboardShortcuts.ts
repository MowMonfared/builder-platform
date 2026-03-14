import { useEffect } from 'react'
import { useCanvasStore } from '../store/canvasStore'
import { useSelectionStore } from '../store/selectionStore'
import { useHistory } from './useHistory'

export function useKeyboardShortcuts() {
  const { undo, redo, snapshot } = useHistory()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return
      }

      const ctrl = e.ctrlKey || e.metaKey
      const { selectedIds, select, clearSelection } = useSelectionStore.getState()
      const { removeElement, duplicateElement } = useCanvasStore.getState()

      // Delete / Backspace
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedIds.length > 0) {
        e.preventDefault()
        snapshot()
        selectedIds.forEach((id) => removeElement(id))
        clearSelection()
        return
      }

      // Escape — deselect
      if (e.key === 'Escape') {
        clearSelection()
        return
      }

      // Ctrl+Z — undo
      if (ctrl && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
        return
      }

      // Ctrl+Shift+Z or Ctrl+Y — redo
      if ((ctrl && e.shiftKey && e.key === 'z') || (ctrl && e.key === 'y')) {
        e.preventDefault()
        redo()
        return
      }

      // Ctrl+D — duplicate
      if (ctrl && e.key === 'd' && selectedIds.length > 0) {
        e.preventDefault()
        snapshot()
        selectedIds.forEach((id) => {
          const newId = duplicateElement(id)
          if (newId) select(newId)
        })
        return
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [undo, redo, snapshot])
}
