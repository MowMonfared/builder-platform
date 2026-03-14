import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  id: string
  dndData: Record<string, unknown>
  icon: React.ReactNode
  name: string
}

export function AssetCard({ id, dndData, icon, name }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: dndData,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.4 : 1,
      }}
      {...listeners}
      {...attributes}
      className="flex flex-col items-center gap-1 p-2 rounded cursor-grab active:cursor-grabbing hover:bg-[#f0f2f4] group"
      title={name}
    >
      <div className="w-full h-14 rounded bg-[#f3f4f6] border border-[#e5e7eb] flex items-center justify-center text-[#6b7280] group-hover:border-[#d1d5db]">
        {icon}
      </div>
      <span className="text-[#374151] text-[10px] text-center w-full truncate leading-tight">
        {name}
      </span>
    </div>
  )
}
