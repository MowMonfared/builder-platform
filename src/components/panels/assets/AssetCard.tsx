import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  id: string
  dndData: Record<string, unknown>
  preview: React.ReactNode
  name: string
}

export function AssetCard({ id, dndData, preview, name }: Props) {
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
      className="flex flex-col gap-1.5 p-2 rounded-lg cursor-grab active:cursor-grabbing hover:bg-[#f0f2f4] group"
      title={name}
    >
      {/* Preview box */}
      <div className="w-full rounded-md bg-[#f8f9fa] border border-[#e5e7eb] group-hover:border-[#d1d5db] overflow-hidden flex items-center justify-center p-3"
        style={{ minHeight: 80 }}>
        <div className="w-full pointer-events-none select-none" style={{ transform: 'scale(0.72)', transformOrigin: 'center center' }}>
          {preview}
        </div>
      </div>
      {/* Name */}
      <span className="text-[#374151] text-[11px] font-medium text-center w-full truncate leading-tight px-0.5">
        {name}
      </span>
    </div>
  )
}
