import { useState } from 'react'
import {
  Type, Square, Image, Box, Component, LayoutTemplate,
  Eye, EyeOff, Lock, Unlock, ChevronRight, ChevronDown,
} from 'lucide-react'
import type { LayerNode } from '../../../types'
import { useCanvasStore } from '../../../store/canvasStore'
import { useSelectionStore } from '../../../store/selectionStore'

const TYPE_ICONS: Record<string, React.ReactNode> = {
  text: <Type size={11} />,
  button: <Square size={11} />,
  image: <Image size={11} />,
  container: <Box size={11} />,
  'component-instance': <Component size={11} />,
  'block-instance': <LayoutTemplate size={11} />,
}

interface Props {
  node: LayerNode
}

export function LayerRow({ node }: Props) {
  const [expanded, setExpanded] = useState(true)
  const updateElement = useCanvasStore((s) => s.updateElement)
  const selectedIds = useSelectionStore((s) => s.selectedIds)
  const select = useSelectionStore((s) => s.select)

  const isSelected = selectedIds.includes(node.id)
  const hasChildren = node.children.length > 0
  const indentPx = node.depth * 12

  return (
    <>
      <div
        className={`flex items-center gap-1 px-2 py-[3px] cursor-pointer group rounded-sm mx-1 ${
          isSelected ? 'bg-[#0d99ff22] text-[#111827]' : 'hover:bg-[#f0f2f4] text-[#374151]'
        }`}
        style={{ paddingLeft: `${8 + indentPx}px` }}
        onClick={(e) => select(node.id, e.shiftKey)}
      >
        {/* Expand toggle */}
        <span
          className="w-3 h-3 flex items-center justify-center shrink-0"
          onClick={(e) => {
            e.stopPropagation()
            setExpanded((v) => !v)
          }}
        >
          {hasChildren ? (
            expanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />
          ) : null}
        </span>

        {/* Type icon */}
        <span className="shrink-0 text-[#9ca3af]">{TYPE_ICONS[node.type] ?? <Box size={11} />}</span>

        {/* Name */}
        <span className="flex-1 text-xs truncate ml-1">{node.name}</span>

        {/* Controls (visible on hover) */}
        <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation()
              updateElement(node.id, { visible: !node.visible })
            }}
            className="p-0.5 hover:text-[#111827]"
          >
            {node.visible ? <Eye size={10} /> : <EyeOff size={10} className="text-[#9ca3af]" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              updateElement(node.id, { locked: !node.locked })
            }}
            className="p-0.5 hover:text-[#111827]"
          >
            {node.locked ? <Lock size={10} className="text-amber-400" /> : <Unlock size={10} />}
          </button>
        </span>
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div>
          {node.children.map((child) => (
            <LayerRow key={child.id} node={child} />
          ))}
        </div>
      )}
    </>
  )
}
