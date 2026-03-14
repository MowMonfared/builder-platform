import type { CanvasElement } from '../../../types'
import { useCanvasStore } from '../../../store/canvasStore'

interface Props {
  element: CanvasElement
}

export function ColorsSection({ element }: Props) {
  const updateElementStyle = useCanvasStore((s) => s.updateElementStyle)
  const s = element.style

  const update = (key: string, value: unknown) =>
    updateElementStyle(element.id, { [key]: value })

  return (
    <div className="px-3 py-3 border-b border-[#e5e7eb]">
      <div className="text-[#9ca3af] text-[10px] font-semibold uppercase tracking-wider mb-2">
        Appearance
      </div>

      {/* Fill */}
      <div className="mb-3">
        <label className="prop-label block mb-1">Fill</label>
        <div className="flex items-center gap-2 bg-[#f3f4f6] rounded px-2 py-1.5 border border-transparent hover:border-[#d1d5db]">
          <input
            type="color"
            value={
              s.backgroundColor && s.backgroundColor !== 'transparent'
                ? s.backgroundColor
                : '#ffffff'
            }
            onChange={(e) => update('backgroundColor', e.target.value)}
            className="w-5 h-5 rounded cursor-pointer bg-transparent border-none outline-none shrink-0"
          />
          <input
            type="text"
            value={s.backgroundColor ?? 'transparent'}
            onChange={(e) => update('backgroundColor', e.target.value)}
            className="bg-transparent text-[#111827] text-xs font-mono w-full outline-none"
          />
        </div>
      </div>

      {/* Border */}
      <div className="mb-3">
        <label className="prop-label block mb-1">Border</label>
        <div className="grid grid-cols-3 gap-1.5">
          <div>
            <label className="prop-label block mb-0.5">Width</label>
            <input
              type="number"
              value={s.borderWidth ?? 0}
              onChange={(e) => update('borderWidth', parseFloat(e.target.value) || 0)}
              className="prop-input"
            />
          </div>
          <div>
            <label className="prop-label block mb-0.5">Style</label>
            <select
              value={s.borderStyle ?? 'solid'}
              onChange={(e) => update('borderStyle', e.target.value)}
              className="w-full bg-[#f3f4f6] text-[#111827] text-xs px-2 py-1 rounded border border-transparent focus:outline-none focus:border-[#0d99ff]"
            >
              <option>solid</option>
              <option>dashed</option>
              <option>dotted</option>
              <option>none</option>
            </select>
          </div>
          <div>
            <label className="prop-label block mb-0.5">Color</label>
            <input
              type="color"
              value={s.borderColor ?? '#000000'}
              onChange={(e) => update('borderColor', e.target.value)}
              className="w-full h-[26px] rounded cursor-pointer bg-[#f3f4f6] border border-[#d1d5db] outline-none p-0.5"
            />
          </div>
        </div>
      </div>

      {/* Border radius */}
      <div className="mb-3">
        <label className="prop-label block mb-1">Border Radius</label>
        <div className="flex items-center gap-1.5 bg-[#f3f4f6] rounded px-2 py-1 border border-transparent focus-within:border-[#0d99ff]">
          <input
            type="number"
            value={s.borderRadius ?? 0}
            onChange={(e) => update('borderRadius', parseFloat(e.target.value) || 0)}
            className="bg-transparent text-[#111827] text-xs w-full outline-none"
          />
          <span className="text-[#9ca3af] text-xs">px</span>
        </div>
      </div>

      {/* Box Shadow */}
      <div>
        <label className="prop-label block mb-1">Shadow</label>
        <input
          type="text"
          value={s.boxShadow ?? ''}
          onChange={(e) => update('boxShadow', e.target.value)}
          placeholder="0 2px 8px rgba(0,0,0,0.15)"
          className="prop-input"
        />
      </div>
    </div>
  )
}
