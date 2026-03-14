import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { ComponentDefinition } from '../../../types'
import {
  Type, Square, Image, Box, LayoutTemplate, Minus,
} from 'lucide-react'

const TYPE_ICONS: Record<string, React.ReactNode> = {
  text: <Type size={14} />,
  button: <Square size={14} />,
  image: <Image size={14} />,
  container: <Box size={14} />,
  divider: <Minus size={14} />,
}

interface Props {
  component: ComponentDefinition
}

export function ComponentCard({ component }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `asset-component-${component.id}`,
    data: { type: 'ASSET_COMPONENT', componentDefId: component.id },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  }

  const rootType = component.rootElement.type
  const icon = TYPE_ICONS[rootType] ?? <LayoutTemplate size={14} />

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex flex-col items-center gap-1 p-2 rounded cursor-grab active:cursor-grabbing hover:bg-[#f0f2f4] group"
      title={component.name}
    >
      {/* Preview box */}
      <div className="w-full h-14 rounded bg-[#f3f4f6] border border-[#e5e7eb] flex items-center justify-center text-[#6b7280] group-hover:border-[#d1d5db]">
        {icon}
      </div>
      <span className="text-[#374151] text-[10px] text-center w-full truncate leading-tight">
        {component.name}
      </span>
    </div>
  )
}
