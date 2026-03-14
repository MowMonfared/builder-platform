import type { CanvasElement, StyleProps } from '../../../types'
import { useCanvasStore } from '../../../store/canvasStore'

interface Props {
  element: CanvasElement
}

const FONT_FAMILIES = [
  'Inter, sans-serif',
  'Georgia, serif',
  'Courier New, monospace',
  'Arial, sans-serif',
  'Verdana, sans-serif',
]

const FONT_WEIGHTS = [
  { label: 'Thin', value: 100 },
  { label: 'Light', value: 300 },
  { label: 'Regular', value: 400 },
  { label: 'Medium', value: 500 },
  { label: 'Semibold', value: 600 },
  { label: 'Bold', value: 700 },
  { label: 'Black', value: 900 },
]

const TEXT_ALIGNS: StyleProps['textAlign'][] = ['left', 'center', 'right', 'justify']

export function TypographySection({ element }: Props) {
  const updateElementStyle = useCanvasStore((s) => s.updateElementStyle)
  const s = element.style

  // Only show for text-bearing elements
  if (element.type !== 'text' && element.type !== 'button') return null

  const update = (key: string, value: unknown) =>
    updateElementStyle(element.id, { [key]: value })

  return (
    <div className="px-3 py-3 border-b border-[#e5e7eb]">
      <div className="text-[#9ca3af] text-[10px] font-semibold uppercase tracking-wider mb-2">
        Typography
      </div>

      {/* Font family */}
      <div className="mb-2">
        <label className="prop-label block mb-0.5">Font</label>
        <select
          value={s.fontFamily ?? 'Inter, sans-serif'}
          onChange={(e) => update('fontFamily', e.target.value)}
          className="w-full bg-[#f3f4f6] text-[#111827] text-xs px-2 py-1.5 rounded border border-transparent focus:outline-none focus:border-[#0d99ff]"
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f} value={f}>
              {f.split(',')[0]}
            </option>
          ))}
        </select>
      </div>

      {/* Size & Weight */}
      <div className="grid grid-cols-2 gap-1.5 mb-2">
        <div>
          <label className="prop-label block mb-0.5">Size</label>
          <div className="flex items-center gap-1 bg-[#f3f4f6] rounded px-2 py-1 border border-transparent focus-within:border-[#0d99ff]">
            <input
              type="number"
              value={s.fontSize ?? 16}
              onChange={(e) => update('fontSize', parseFloat(e.target.value) || 16)}
              className="bg-transparent text-[#111827] text-xs w-full outline-none"
            />
            <span className="text-[#9ca3af] text-xs">px</span>
          </div>
        </div>
        <div>
          <label className="prop-label block mb-0.5">Weight</label>
          <select
            value={s.fontWeight ?? 400}
            onChange={(e) => update('fontWeight', parseInt(e.target.value))}
            className="w-full bg-[#f3f4f6] text-[#111827] text-xs px-2 py-1.5 rounded border border-transparent focus:outline-none focus:border-[#0d99ff]"
          >
            {FONT_WEIGHTS.map((w) => (
              <option key={w.value} value={w.value}>
                {w.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Line height & Letter spacing */}
      <div className="grid grid-cols-2 gap-1.5 mb-2">
        <div>
          <label className="prop-label block mb-0.5">Line Height</label>
          <div className="flex items-center gap-1 bg-[#f3f4f6] rounded px-2 py-1 border border-transparent focus-within:border-[#0d99ff]">
            <input
              type="number"
              step="0.1"
              value={s.lineHeight ?? 1.5}
              onChange={(e) => update('lineHeight', parseFloat(e.target.value) || 1.5)}
              className="bg-transparent text-[#111827] text-xs w-full outline-none"
            />
          </div>
        </div>
        <div>
          <label className="prop-label block mb-0.5">Spacing</label>
          <div className="flex items-center gap-1 bg-[#f3f4f6] rounded px-2 py-1 border border-transparent focus-within:border-[#0d99ff]">
            <input
              type="number"
              step="0.1"
              value={s.letterSpacing ?? 0}
              onChange={(e) => update('letterSpacing', parseFloat(e.target.value) || 0)}
              className="bg-transparent text-[#111827] text-xs w-full outline-none"
            />
          </div>
        </div>
      </div>

      {/* Text align */}
      <div className="mb-2">
        <label className="prop-label block mb-0.5">Align</label>
        <div className="flex gap-1">
          {TEXT_ALIGNS.map((align) => (
            <button
              key={align}
              onClick={() => update('textAlign', align)}
              className={`flex-1 py-1 text-xs rounded border ${
                (s.textAlign ?? 'left') === align
                  ? 'border-[#0d99ff] text-[#0d99ff] bg-[#0d99ff11]'
                  : 'border-[#e5e7eb] text-[#9ca3af] hover:border-[#d1d5db] hover:text-[#374151]'
              }`}
            >
              {align === 'left' ? '←' : align === 'center' ? '↔' : align === 'right' ? '→' : '≡'}
            </button>
          ))}
        </div>
      </div>

      {/* Text color */}
      <div>
        <label className="prop-label block mb-0.5">Color</label>
        <div className="flex items-center gap-2 bg-[#f3f4f6] rounded px-2 py-1 border border-transparent hover:border-[#d1d5db]">
          <input
            type="color"
            value={s.color ?? '#000000'}
            onChange={(e) => update('color', e.target.value)}
            className="w-5 h-5 rounded cursor-pointer bg-transparent border-none outline-none"
          />
          <span className="text-[#111827] text-xs font-mono">{s.color ?? '#000000'}</span>
        </div>
      </div>
    </div>
  )
}
