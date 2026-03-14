import type { CanvasElement } from '../../../types'
import { useCanvasStore } from '../../../store/canvasStore'

interface Props {
  element: CanvasElement
}

function SpacingInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full bg-[#f3f4f6] text-[#111827] text-xs px-1 py-1 rounded border border-transparent focus:outline-none focus:border-[#0d99ff] text-center"
      />
      <span className="text-[#9ca3af] text-[9px]">{label}</span>
    </div>
  )
}

export function SpacingSection({ element }: Props) {
  const updateElementStyle = useCanvasStore((s) => s.updateElementStyle)
  const s = element.style

  const update = (key: string, value: number) =>
    updateElementStyle(element.id, { [key]: value })

  return (
    <div className="px-3 py-3 border-b border-[#e5e7eb]">
      <div className="text-[#9ca3af] text-[10px] font-semibold uppercase tracking-wider mb-3">
        Spacing
      </div>

      {/* Padding */}
      <div className="mb-3">
        <div className="text-[#9ca3af] text-[10px] mb-1.5">Padding</div>
        <div className="grid grid-cols-3 gap-1">
          <div />
          <SpacingInput
            label="Top"
            value={s.paddingTop ?? 0}
            onChange={(v) => update('paddingTop', v)}
          />
          <div />
          <SpacingInput
            label="Left"
            value={s.paddingLeft ?? 0}
            onChange={(v) => update('paddingLeft', v)}
          />
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border border-[#d1d5db] rounded-sm" />
          </div>
          <SpacingInput
            label="Right"
            value={s.paddingRight ?? 0}
            onChange={(v) => update('paddingRight', v)}
          />
          <div />
          <SpacingInput
            label="Bottom"
            value={s.paddingBottom ?? 0}
            onChange={(v) => update('paddingBottom', v)}
          />
          <div />
        </div>
      </div>

      {/* Gap (for flex containers) */}
      {(s.display === 'flex' || s.display === 'grid') && (
        <div>
          <div className="text-[#9ca3af] text-[10px] mb-1.5">Gap</div>
          <div className="flex items-center gap-1.5 bg-[#f3f4f6] rounded px-2 py-1 border border-transparent focus-within:border-[#0d99ff]">
            <input
              type="number"
              value={s.gap ?? 0}
              onChange={(e) => update('gap', parseFloat(e.target.value) || 0)}
              className="bg-transparent text-[#111827] text-xs w-full outline-none"
            />
            <span className="text-[#9ca3af] text-xs">px</span>
          </div>
        </div>
      )}
    </div>
  )
}
