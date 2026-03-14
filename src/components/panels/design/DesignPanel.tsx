import { useCanvasStore } from '../../../store/canvasStore'
import { useSelectionStore } from '../../../store/selectionStore'
import { LayoutSection } from './LayoutSection'
import { SpacingSection } from './SpacingSection'
import { TypographySection } from './TypographySection'
import { ColorsSection } from './ColorsSection'
import { FlexSection } from './FlexSection'
import { MousePointer } from 'lucide-react'

export function DesignPanel() {
  const activePage = useCanvasStore((s) => s.activePage)
  const selectedIds = useSelectionStore((s) => s.selectedIds)

  const page = activePage()
  const selectedId = selectedIds[0]
  const element = selectedId && page ? page.elements[selectedId] : null

  if (!element) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-[#444]">
        <MousePointer size={24} />
        <p className="text-xs text-center px-6">Select an element on the canvas to inspect and edit its properties</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Element name & type badge */}
      <div className="px-3 py-2.5 border-b border-[#e9ebec] shrink-0">
        <div className="flex items-center gap-2">
          <span
            className="text-[9px] px-1.5 py-0.5 rounded font-medium uppercase tracking-wide"
            style={{ backgroundColor: '#0d99ff22', color: '#0d99ff' }}
          >
            {element.type}
          </span>
          <span className="text-[#111827] text-xs font-medium truncate">{element.name}</span>
        </div>
      </div>

      {/* Text content editor */}
      {element.type === 'text' && <TextContentEditor element={element} />}
      {element.type === 'button' && <ButtonLabelEditor element={element} />}
      {element.type === 'image' && <ImageSrcEditor element={element} />}

      {/* Design sections */}
      <LayoutSection element={element} />
      <FlexSection element={element} />
      <SpacingSection element={element} />
      <ColorsSection element={element} />
      <TypographySection element={element} />
    </div>
  )
}

import type { CanvasElement } from '../../../types'
import { useCanvasStore as useCS } from '../../../store/canvasStore'

function TextContentEditor({ element }: { element: CanvasElement }) {
  const updateElement = useCS((s) => s.updateElement)
  if (element.type !== 'text') return null

  return (
    <div className="px-3 py-3 border-b border-[#e9ebec]">
      <label className="prop-label block mb-1">Content</label>
      <textarea
        value={element.content}
        onChange={(e) => updateElement(element.id, { content: e.target.value })}
        rows={3}
        className="w-full bg-[#f3f4f6] text-[#111827] text-xs px-2 py-1.5 rounded border border-transparent focus:outline-none focus:border-[#0d99ff] resize-none"
      />
    </div>
  )
}

function ButtonLabelEditor({ element }: { element: CanvasElement }) {
  const updateElement = useCS((s) => s.updateElement)
  if (element.type !== 'button') return null

  return (
    <div className="px-3 py-3 border-b border-[#e9ebec]">
      <label className="prop-label block mb-1">Label</label>
      <input
        type="text"
        value={element.label}
        onChange={(e) => updateElement(element.id, { label: e.target.value })}
        className="prop-input"
      />
      <div className="mt-2">
        <label className="prop-label block mb-1">Variant</label>
        <select
          value={element.variant}
          onChange={(e) =>
            updateElement(element.id, {
              variant: e.target.value as 'primary' | 'secondary' | 'outline' | 'ghost',
            })
          }
          className="w-full bg-[#f3f4f6] text-[#111827] text-xs px-2 py-1.5 rounded border border-transparent focus:outline-none focus:border-[#0d99ff]"
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="outline">Outline</option>
          <option value="ghost">Ghost</option>
        </select>
      </div>
    </div>
  )
}

function ImageSrcEditor({ element }: { element: CanvasElement }) {
  const updateElement = useCS((s) => s.updateElement)
  if (element.type !== 'image') return null

  return (
    <div className="px-3 py-3 border-b border-[#e9ebec]">
      <label className="prop-label block mb-1">Image URL</label>
      <input
        type="text"
        value={element.src}
        onChange={(e) => updateElement(element.id, { src: e.target.value })}
        placeholder="https://..."
        className="prop-input mb-2"
      />
      <label className="prop-label block mb-1">Alt Text</label>
      <input
        type="text"
        value={element.alt}
        onChange={(e) => updateElement(element.id, { alt: e.target.value })}
        className="prop-input mb-2"
      />
      <label className="prop-label block mb-1">Object Fit</label>
      <select
        value={element.objectFit}
        onChange={(e) =>
          updateElement(element.id, {
            objectFit: e.target.value as 'cover' | 'contain' | 'fill' | 'none',
          })
        }
        className="w-full bg-[#f3f4f6] text-[#111827] text-xs px-2 py-1.5 rounded border border-transparent focus:outline-none focus:border-[#0d99ff]"
      >
        <option value="cover">Cover</option>
        <option value="contain">Contain</option>
        <option value="fill">Fill</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}
