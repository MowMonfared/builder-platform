import { create } from 'zustand'
import type { CanvasElement } from '../types'

interface CanvasSnapshot {
  elements: Record<string, CanvasElement>
  rootIds: string[]
  pageId: string
}

interface HistoryState {
  past: CanvasSnapshot[]
  future: CanvasSnapshot[]

  pushSnapshot: (snapshot: CanvasSnapshot) => void
  undo: (restore: (snapshot: CanvasSnapshot) => void, current: CanvasSnapshot) => void
  redo: (restore: (snapshot: CanvasSnapshot) => void, current: CanvasSnapshot) => void
  canUndo: () => boolean
  canRedo: () => boolean
  clear: () => void
}

const MAX_HISTORY = 50

export const useHistoryStore = create<HistoryState>()((set, get) => ({
  past: [],
  future: [],

  pushSnapshot: (snapshot) => {
    set((state) => ({
      past: [...state.past.slice(-MAX_HISTORY + 1), snapshot],
      future: [],
    }))
  },

  undo: (restore, current) => {
    const { past } = get()
    if (past.length === 0) return
    const previous = past[past.length - 1]
    set((state) => ({
      past: state.past.slice(0, -1),
      future: [current, ...state.future.slice(0, MAX_HISTORY - 1)],
    }))
    restore(previous)
  },

  redo: (restore, current) => {
    const { future } = get()
    if (future.length === 0) return
    const next = future[0]
    set((state) => ({
      past: [...state.past.slice(-MAX_HISTORY + 1), current],
      future: state.future.slice(1),
    }))
    restore(next)
  },

  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,
  clear: () => set({ past: [], future: [] }),
}))
