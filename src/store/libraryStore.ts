import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ComponentDefinition, BlockDefinition } from '../types'
import { generateId } from '../lib/idGenerator'
import { PRIMITIVE_COMPONENTS } from '../data/primitiveComponents'
import { DEFAULT_BLOCKS } from '../data/defaultBlocks'

interface LibraryState {
  components: ComponentDefinition[]
  blocks: BlockDefinition[]

  addComponent: (def: Omit<ComponentDefinition, 'id' | 'createdAt' | 'updatedAt'>) => string
  updateComponent: (id: string, partial: Partial<ComponentDefinition>) => void
  deleteComponent: (id: string) => void

  addBlock: (def: Omit<BlockDefinition, 'id' | 'createdAt' | 'updatedAt'>) => string
  updateBlock: (id: string, partial: Partial<BlockDefinition>) => void
  deleteBlock: (id: string) => void

  getComponent: (id: string) => ComponentDefinition | undefined
  getBlock: (id: string) => BlockDefinition | undefined
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLibraryStore = create<LibraryState>()(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  persist<LibraryState, [], [], any>(
    (set, get) => ({
      components: PRIMITIVE_COMPONENTS,
      blocks: DEFAULT_BLOCKS,

      addComponent: (def) => {
        const id = generateId('comp')
        const now = new Date().toISOString()
        const component: ComponentDefinition = { ...def, id, createdAt: now, updatedAt: now }
        set((state) => ({ components: [...state.components, component] }))
        return id
      },

      updateComponent: (id: string, partial: Partial<ComponentDefinition>) => {
        set((state) => ({
          components: state.components.map((c) =>
            c.id === id ? { ...c, ...partial, updatedAt: new Date().toISOString() } : c
          ),
        }))
      },

      deleteComponent: (id: string) => {
        set((state) => ({
          components: state.components.filter((c) => c.id !== id || c.isBuiltIn),
        }))
      },

      addBlock: (def) => {
        const id = generateId('block')
        const now = new Date().toISOString()
        const block: BlockDefinition = { ...def, id, createdAt: now, updatedAt: now }
        set((state) => ({ blocks: [...state.blocks, block] }))
        return id
      },

      updateBlock: (id: string, partial: Partial<BlockDefinition>) => {
        set((state) => ({
          blocks: state.blocks.map((b) =>
            b.id === id ? { ...b, ...partial, updatedAt: new Date().toISOString() } : b
          ),
        }))
      },

      deleteBlock: (id: string) => {
        set((state) => ({
          blocks: state.blocks.filter((b) => b.id !== id || b.isBuiltIn),
        }))
      },

      getComponent: (id: string) => get().components.find((c) => c.id === id),
      getBlock: (id: string) => get().blocks.find((b) => b.id === id),
    }),
    {
      name: 'builder-library',
      partialize: (state: LibraryState) => ({
        components: state.components.filter((c) => !c.isBuiltIn),
        blocks: state.blocks.filter((b) => !b.isBuiltIn),
      }),
      merge: (persisted: unknown, current: LibraryState): LibraryState => {
        const p = persisted as { components?: ComponentDefinition[]; blocks?: BlockDefinition[] } | undefined
        return {
          ...current,
          components: [...PRIMITIVE_COMPONENTS, ...(p?.components ?? [])],
          blocks: [...DEFAULT_BLOCKS, ...(p?.blocks ?? [])],
        }
      },
    }
  )
)
