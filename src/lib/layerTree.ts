import type { CanvasElement } from '../types/element.types'
import type { LayerNode } from '../types/layer.types'

export function buildLayerTree(
  elements: Record<string, CanvasElement>,
  rootIds: string[],
  depth = 0
): LayerNode[] {
  return rootIds
    .map((id) => {
      const el = elements[id]
      if (!el) return null
      return {
        id: el.id,
        name: el.name,
        type: el.type,
        visible: el.visible,
        locked: el.locked,
        depth,
        children: buildLayerTree(elements, el.children, depth + 1),
      } as LayerNode
    })
    .filter(Boolean) as LayerNode[]
}

export function flattenLayerTree(nodes: LayerNode[]): LayerNode[] {
  return nodes.flatMap((node) => [node, ...flattenLayerTree(node.children)])
}

/** Remove element from its parent's children array */
export function removeFromParent(
  elements: Record<string, CanvasElement>,
  rootIds: string[],
  elementId: string
): { elements: Record<string, CanvasElement>; rootIds: string[] } {
  const el = elements[elementId]
  if (!el) return { elements, rootIds }

  if (el.parentId === null) {
    return { elements, rootIds: rootIds.filter((id) => id !== elementId) }
  }

  const parent = elements[el.parentId]
  if (!parent) return { elements, rootIds }

  return {
    elements: {
      ...elements,
      [parent.id]: {
        ...parent,
        children: parent.children.filter((id) => id !== elementId),
      },
    },
    rootIds,
  }
}

/** Collect all descendant IDs of an element */
export function collectDescendants(
  elements: Record<string, CanvasElement>,
  elementId: string
): string[] {
  const el = elements[elementId]
  if (!el || !el.children.length) return []
  return el.children.flatMap((childId) => [
    childId,
    ...collectDescendants(elements, childId),
  ])
}
