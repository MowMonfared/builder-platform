import { useMemo } from 'react'
import { Layers } from 'lucide-react'
import { useCanvasStore } from '../../../store/canvasStore'
import { buildLayerTree } from '../../../lib/layerTree'
import { LayerRow } from './LayerRow'
import type { CanvasElement } from '../../../types'

export function LayersPanel() {
  const activePage = useCanvasStore((s) => s.activePage)
  const page = activePage()

  const layerTree = useMemo(() => {
    if (!page) return []
    return buildLayerTree(page.elements as Record<string, CanvasElement>, page.rootIds)
  }, [page])

  if (!page) return null

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#e5e7eb] shrink-0">
        <Layers size={13} className="text-[#9ca3af]" />
        <span className="text-[#6b7280] text-xs font-medium">Layers</span>
        <span className="ml-auto text-[#9ca3af] text-[10px]">
          {Object.keys(page.elements).length} elements
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-1">
        {layerTree.length === 0 ? (
          <div className="text-[#9ca3af] text-xs text-center py-8 px-4">
            No elements yet. Drag components from the Assets panel.
          </div>
        ) : (
          layerTree.map((node) => <LayerRow key={node.id} node={node} />).reverse()
        )}
      </div>
    </div>
  )
}
