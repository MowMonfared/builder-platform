import type { CanvasElement } from '../../../types'
import { useCanvasStore } from '../../../store/canvasStore'

interface Props {
  element: CanvasElement
}

function NumberInput({
  label,
  value,
  onChange,
  prefix,
}: {
  label: string
  value: number | string
  onChange: (v: number) => void
  prefix?: string
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="prop-label">{label}</label>
      <div className="flex items-center gap-1 bg-[#f3f4f6] rounded px-2 py-1 border border-transparent hover:border-[#d1d5db] focus-within:border-[#0d99ff]">
        {prefix && <span className="text-[#9ca3af] text-xs">{prefix}</span>}
        <input
          type="number"
          value={typeof value === 'number' ? Math.round(value) : value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="bg-transparent text-[#111827] text-xs w-full outline-none"
        />
      </div>
    </div>
  )
}

export function LayoutSection({ element }: Props) {
  const updateElementStyle = useCanvasStore((s) => s.updateElementStyle)
  const s = element.style

  const update = (key: string, value: number) =>
    updateElementStyle(element.id, { [key]: value })

  return (
    <div className="px-3 py-3 border-b border-[#e5e7eb]">
      <div className="text-[#9ca3af] text-[10px] font-semibold uppercase tracking-wider mb-2">
        Layout
      </div>

      {/* Position */}
      <div className="grid grid-cols-2 gap-1.5 mb-2">
        <NumberInput label="X" value={s.x ?? 0} onChange={(v) => update('x', v)} prefix="X" />
        <NumberInput label="Y" value={s.y ?? 0} onChange={(v) => update('y', v)} prefix="Y" />
      </div>

      {/* Size */}
      <div className="grid grid-cols-2 gap-1.5 mb-2">
        <NumberInput
          label="W"
          value={typeof s.width === 'string' ? s.width : (s.width ?? 0)}
          onChange={(v) => update('width', v)}
          prefix="W"
        />
        <NumberInput
          label="H"
          value={typeof s.height === 'string' ? s.height : (s.height ?? 0)}
          onChange={(v) => update('height', v)}
          prefix="H"
        />
      </div>

      {/* Rotation & Opacity */}
      <div className="grid grid-cols-2 gap-1.5">
        <NumberInput
          label="Rotation"
          value={s.rotation ?? 0}
          onChange={(v) => update('rotation', v)}
          prefix="°"
        />
        <NumberInput
          label="Opacity"
          value={Math.round((s.opacity ?? 1) * 100)}
          onChange={(v) => update('opacity', v / 100)}
          prefix="%"
        />
      </div>
    </div>
  )
}
