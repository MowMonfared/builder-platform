import type { CanvasElement, StyleProps } from '../../../types'
import { useCanvasStore } from '../../../store/canvasStore'

interface Props {
  element: CanvasElement
}

const DIRECTIONS: { label: string; value: StyleProps['flexDirection'] }[] = [
  { label: '→', value: 'row' },
  { label: '↓', value: 'column' },
  { label: '←', value: 'row-reverse' },
  { label: '↑', value: 'column-reverse' },
]

const ALIGN_ITEMS: { label: string; value: StyleProps['alignItems'] }[] = [
  { label: 'Start', value: 'flex-start' },
  { label: 'Center', value: 'center' },
  { label: 'End', value: 'flex-end' },
  { label: 'Stretch', value: 'stretch' },
]

const JUSTIFY_CONTENT: { label: string; value: StyleProps['justifyContent'] }[] = [
  { label: 'Start', value: 'flex-start' },
  { label: 'Center', value: 'center' },
  { label: 'End', value: 'flex-end' },
  { label: 'Between', value: 'space-between' },
  { label: 'Around', value: 'space-around' },
]

export function FlexSection({ element }: Props) {
  const updateElementStyle = useCanvasStore((s) => s.updateElementStyle)
  const s = element.style

  if (element.type !== 'container') return null
  if (s.display !== 'flex' && s.display !== 'grid') return null

  const update = (key: string, value: unknown) =>
    updateElementStyle(element.id, { [key]: value })

  return (
    <div className="px-3 py-3 border-b border-[#e5e7eb]">
      <div className="text-[#9ca3af] text-[10px] font-semibold uppercase tracking-wider mb-2">
        Flex Layout
      </div>

      {/* Direction */}
      <div className="mb-2">
        <label className="prop-label block mb-1">Direction</label>
        <div className="flex gap-1">
          {DIRECTIONS.map((d) => (
            <button
              key={d.value}
              onClick={() => update('flexDirection', d.value)}
              className={`flex-1 py-1 text-xs rounded border ${
                (s.flexDirection ?? 'row') === d.value
                  ? 'border-[#0d99ff] text-[#0d99ff] bg-[#0d99ff11]'
                  : 'border-[#e5e7eb] text-[#9ca3af] hover:border-[#d1d5db]'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Align items */}
      <div className="mb-2">
        <label className="prop-label block mb-1">Align</label>
        <div className="flex gap-1 flex-wrap">
          {ALIGN_ITEMS.map((a) => (
            <button
              key={a.value}
              onClick={() => update('alignItems', a.value)}
              className={`px-2 py-0.5 text-[10px] rounded border ${
                (s.alignItems ?? 'flex-start') === a.value
                  ? 'border-[#0d99ff] text-[#0d99ff] bg-[#0d99ff11]'
                  : 'border-[#e5e7eb] text-[#9ca3af] hover:border-[#d1d5db]'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Justify content */}
      <div>
        <label className="prop-label block mb-1">Justify</label>
        <div className="flex gap-1 flex-wrap">
          {JUSTIFY_CONTENT.map((j) => (
            <button
              key={j.value}
              onClick={() => update('justifyContent', j.value)}
              className={`px-2 py-0.5 text-[10px] rounded border ${
                (s.justifyContent ?? 'flex-start') === j.value
                  ? 'border-[#0d99ff] text-[#0d99ff] bg-[#0d99ff11]'
                  : 'border-[#e5e7eb] text-[#9ca3af] hover:border-[#d1d5db]'
              }`}
            >
              {j.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
