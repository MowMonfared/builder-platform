import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { CanvasElement, PageDefinition, StyleProps } from '../types'
import { generateId } from '../lib/idGenerator'
import { getDefaultStyle } from '../lib/styleUtils'
import { collectDescendants } from '../lib/layerTree'

interface CanvasTransform {
  scale: number
  offsetX: number
  offsetY: number
}

interface CanvasState {
  pages: PageDefinition[]
  activePageId: string | null
  canvasTransform: CanvasTransform

  // Computed helpers
  activePage: () => PageDefinition | null

  // Page actions
  addPage: (name?: string) => void
  setActivePage: (pageId: string) => void
  updatePage: (pageId: string, partial: Partial<Omit<PageDefinition, 'id' | 'elements' | 'rootIds'>>) => void
  deletePage: (pageId: string) => void

  // Element actions
  addElement: (element: CanvasElement, parentId?: string | null) => void
  updateElement: (id: string, partial: Partial<CanvasElement>) => void
  updateElementStyle: (id: string, style: Partial<StyleProps>) => void
  removeElement: (id: string) => void
  moveElement: (elementId: string, newParentId: string | null, atIndex?: number) => void
  reorderElements: (parentId: string | null, fromIndex: number, toIndex: number) => void
  duplicateElement: (id: string) => string | null
  createElement: (type: string, x: number, y: number, parentId?: string | null) => string

  // Canvas transform
  setCanvasTransform: (transform: Partial<CanvasTransform>) => void
  resetCanvasTransform: () => void
}

function createDefaultPage(name = 'Page 1'): PageDefinition {
  return {
    id: generateId('page'),
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    elements: {},
    rootIds: [],
    canvasWidth: 1440,
    canvasHeight: 900,
    background: '#ffffff',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

const defaultPage = createDefaultPage()

export const useCanvasStore = create<CanvasState>()(
  immer((set, get) => ({
    pages: [defaultPage],
    activePageId: defaultPage.id,
    canvasTransform: { scale: 1, offsetX: 0, offsetY: 0 },

    activePage: () => {
      const { pages, activePageId } = get()
      return pages.find((p) => p.id === activePageId) ?? null
    },

    addPage: (name) => {
      const page = createDefaultPage(name ?? `Page ${get().pages.length + 1}`)
      set((state) => {
        state.pages.push(page)
        state.activePageId = page.id
      })
    },

    setActivePage: (pageId) => {
      set((state) => {
        state.activePageId = pageId
      })
    },

    updatePage: (pageId, partial) => {
      set((state) => {
        const page = state.pages.find((p) => p.id === pageId)
        if (!page) return
        Object.assign(page, { ...partial, updatedAt: new Date().toISOString() })
      })
    },

    deletePage: (pageId) => {
      set((state) => {
        const idx = state.pages.findIndex((p) => p.id === pageId)
        if (idx === -1 || state.pages.length === 1) return
        state.pages.splice(idx, 1)
        if (state.activePageId === pageId) {
          state.activePageId = state.pages[Math.max(0, idx - 1)].id
        }
      })
    },

    addElement: (element, parentId = null) => {
      set((state) => {
        const page = state.pages.find((p) => p.id === state.activePageId)
        if (!page) return

        const el = { ...element, parentId: parentId ?? null }
        page.elements[el.id] = el

        if (parentId && page.elements[parentId]) {
          page.elements[parentId].children.push(el.id)
        } else {
          page.rootIds.push(el.id)
        }
        page.updatedAt = new Date().toISOString()
      })
    },

    updateElement: (id, partial) => {
      set((state) => {
        const page = state.pages.find((p) => p.id === state.activePageId)
        if (!page || !page.elements[id]) return
        Object.assign(page.elements[id], partial)
        page.updatedAt = new Date().toISOString()
      })
    },

    updateElementStyle: (id, style) => {
      set((state) => {
        const page = state.pages.find((p) => p.id === state.activePageId)
        if (!page || !page.elements[id]) return
        Object.assign(page.elements[id].style, style)
        page.updatedAt = new Date().toISOString()
      })
    },

    removeElement: (id) => {
      set((state) => {
        const page = state.pages.find((p) => p.id === state.activePageId)
        if (!page || !page.elements[id]) return

        const el = page.elements[id]
        // Collect all descendants
        const toRemove = [id, ...collectDescendants(page.elements as Record<string, CanvasElement>, id)]

        // Remove from parent
        if (el.parentId && page.elements[el.parentId]) {
          page.elements[el.parentId].children = page.elements[el.parentId].children.filter(
            (cid) => cid !== id
          )
        } else {
          page.rootIds = page.rootIds.filter((rid) => rid !== id)
        }

        // Delete all
        toRemove.forEach((rid) => {
          delete page.elements[rid]
        })
        page.updatedAt = new Date().toISOString()
      })
    },

    moveElement: (elementId, newParentId, atIndex) => {
      set((state) => {
        const page = state.pages.find((p) => p.id === state.activePageId)
        if (!page || !page.elements[elementId]) return

        const el = page.elements[elementId]

        // Remove from old parent
        if (el.parentId && page.elements[el.parentId]) {
          page.elements[el.parentId].children = page.elements[el.parentId].children.filter(
            (id) => id !== elementId
          )
        } else {
          page.rootIds = page.rootIds.filter((id) => id !== elementId)
        }

        // Add to new parent
        el.parentId = newParentId
        if (newParentId && page.elements[newParentId]) {
          if (atIndex !== undefined) {
            page.elements[newParentId].children.splice(atIndex, 0, elementId)
          } else {
            page.elements[newParentId].children.push(elementId)
          }
        } else {
          if (atIndex !== undefined) {
            page.rootIds.splice(atIndex, 0, elementId)
          } else {
            page.rootIds.push(elementId)
          }
        }
        page.updatedAt = new Date().toISOString()
      })
    },

    reorderElements: (parentId, fromIndex, toIndex) => {
      set((state) => {
        const page = state.pages.find((p) => p.id === state.activePageId)
        if (!page) return

        const list = parentId && page.elements[parentId]
          ? page.elements[parentId].children
          : page.rootIds

        const [moved] = list.splice(fromIndex, 1)
        list.splice(toIndex, 0, moved)
        page.updatedAt = new Date().toISOString()
      })
    },

    duplicateElement: (id) => {
      const page = get().activePage()
      if (!page || !page.elements[id]) return null

      const newId = generateId('el')
      const original = page.elements[id]
      const cloned: CanvasElement = {
        ...JSON.parse(JSON.stringify(original)),
        id: newId,
        name: `${original.name} copy`,
        style: {
          ...original.style,
          x: (original.style.x ?? 0) + 20,
          y: (original.style.y ?? 0) + 20,
        },
        children: [],
      }

      set((state) => {
        const pg = state.pages.find((p) => p.id === state.activePageId)
        if (!pg) return
        pg.elements[newId] = cloned
        if (original.parentId && pg.elements[original.parentId]) {
          pg.elements[original.parentId].children.push(newId)
        } else {
          pg.rootIds.push(newId)
        }
      })

      return newId
    },

    createElement: (type, x, y, parentId = null) => {
      const id = generateId('el')
      const defaultStyle = getDefaultStyle(type)
      const base = {
        id,
        name: type.charAt(0).toUpperCase() + type.slice(1),
        locked: false,
        visible: true,
        parentId: parentId ?? null,
        children: [],
        style: { ...defaultStyle, x, y },
      }

      let element: CanvasElement

      switch (type) {
        case 'text':
          element = { ...base, type: 'text', content: 'Text' }
          break
        case 'button':
          element = { ...base, type: 'button', label: 'Button', variant: 'primary' }
          break
        case 'image':
          element = { ...base, type: 'image', src: '', alt: 'Image', objectFit: 'cover' }
          break
        case 'container':
        default:
          element = { ...base, type: 'container' }
          break
      }

      get().addElement(element, parentId)
      return id
    },

    setCanvasTransform: (transform) => {
      set((state) => {
        Object.assign(state.canvasTransform, transform)
      })
    },

    resetCanvasTransform: () => {
      set((state) => {
        state.canvasTransform = { scale: 1, offsetX: 0, offsetY: 0 }
      })
    },
  }))
)
