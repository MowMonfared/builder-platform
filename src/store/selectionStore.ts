import { create } from 'zustand'

interface SelectionState {
  selectedIds: string[]
  hoveredId: string | null

  select: (id: string, addToSelection?: boolean) => void
  deselect: (id: string) => void
  clearSelection: () => void
  setHovered: (id: string | null) => void
  selectAll: (ids: string[]) => void
}

export const useSelectionStore = create<SelectionState>()((set) => ({
  selectedIds: [],
  hoveredId: null,

  select: (id, addToSelection = false) => {
    set((state) => ({
      selectedIds: addToSelection
        ? state.selectedIds.includes(id)
          ? state.selectedIds.filter((sid) => sid !== id)
          : [...state.selectedIds, id]
        : [id],
    }))
  },

  deselect: (id) => {
    set((state) => ({
      selectedIds: state.selectedIds.filter((sid) => sid !== id),
    }))
  },

  clearSelection: () => set({ selectedIds: [] }),

  setHovered: (id) => set({ hoveredId: id }),

  selectAll: (ids) => set({ selectedIds: ids }),
}))
