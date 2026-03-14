import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { BlockDefinition } from '../../../types'
import { LayoutTemplate } from 'lucide-react'

interface Props {
  block: BlockDefinition
}

export function BlockCard({ block }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `asset-block-${block.id}`,
    data: { type: 'ASSET_BLOCK', blockDefId: block.id },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex flex-col items-center gap-1 p-2 rounded cursor-grab active:cursor-grabbing hover:bg-[#f0f2f4] group"
      title={block.name}
    >
      <div className="w-full h-14 rounded bg-[#f3f4f6] border border-[#e5e7eb] flex items-center justify-center text-[#6b7280] group-hover:border-[#d1d5db]">
        <LayoutTemplate size={14} />
      </div>
      <span className="text-[#374151] text-[10px] text-center w-full truncate leading-tight">
        {block.name}
      </span>
    </div>
  )
}
