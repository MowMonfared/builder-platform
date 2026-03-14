import {
  Undo2, Redo2, Grid3X3, Magnet, ZoomIn, ZoomOut, RotateCcw,
  Eye, Plus, Trash2,
} from 'lucide-react'
import { useCanvasStore } from '../../store/canvasStore'
import { useUiStore } from '../../store/uiStore'
import { useHistory } from '../../hooks/useHistory'

export function TopToolbar() {
  const pages = useCanvasStore((s) => s.pages)
  const activePageId = useCanvasStore((s) => s.activePageId)
  const setActivePage = useCanvasStore((s) => s.setActivePage)
  const addPage = useCanvasStore((s) => s.addPage)
  const deletePage = useCanvasStore((s) => s.deletePage)
  const canvasTransform = useCanvasStore((s) => s.canvasTransform)
  const setCanvasTransform = useCanvasStore((s) => s.setCanvasTransform)
  const resetCanvasTransform = useCanvasStore((s) => s.resetCanvasTransform)
  const gridEnabled = useUiStore((s) => s.gridEnabled)
  const snapEnabled = useUiStore((s) => s.snapEnabled)
  const previewMode = useUiStore((s) => s.previewMode)
  const toggleGrid = useUiStore((s) => s.toggleGrid)
  const toggleSnap = useUiStore((s) => s.toggleSnap)
  const togglePreview = useUiStore((s) => s.togglePreview)
  const { undo, redo, canUndo, canRedo } = useHistory()

  const zoomIn = () =>
    setCanvasTransform({ scale: Math.min(5, canvasTransform.scale * 1.2) })
  const zoomOut = () =>
    setCanvasTransform({ scale: Math.max(0.1, canvasTransform.scale / 1.2) })

  return (
    <div className="flex items-center h-10 bg-white border-b border-[#e5e7eb] px-2 gap-1 shrink-0 no-select">
      {/* Brand */}
      <div className="text-[#111827] font-semibold text-sm mr-3 px-1">
        <span className="text-[#0d99ff]">⬡</span> Builder
      </div>

      {/* Page tabs */}
      <div className="flex items-center gap-0.5 flex-1 overflow-x-auto">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => setActivePage(page.id)}
            className={`px-3 py-1 text-xs rounded whitespace-nowrap transition-colors ${
              page.id === activePageId
                ? 'bg-[#f3f4f6] text-[#111827]'
                : 'text-[#6b7280] hover:text-[#374151] hover:bg-[#f0f2f4]'
            }`}
          >
            {page.name}
          </button>
        ))}
        <button
          onClick={() => addPage()}
          className="p-1 text-[#9ca3af] hover:text-[#374151] hover:bg-[#f0f2f4] rounded"
          title="Add page"
        >
          <Plus size={13} />
        </button>
        {pages.length > 1 && (
          <button
            onClick={() => activePageId && deletePage(activePageId)}
            className="p-1 text-[#9ca3af] hover:text-red-400 hover:bg-[#f0f2f4] rounded"
            title="Delete page"
          >
            <Trash2 size={13} />
          </button>
        )}
      </div>

      {/* Separator */}
      <div className="w-px h-5 bg-[#e5e7eb] mx-1" />

      {/* Undo/Redo */}
      <button
        onClick={undo}
        disabled={!canUndo()}
        className="p-1.5 text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6] rounded disabled:opacity-30 disabled:cursor-not-allowed"
        title="Undo (Ctrl+Z)"
      >
        <Undo2 size={14} />
      </button>
      <button
        onClick={redo}
        disabled={!canRedo()}
        className="p-1.5 text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6] rounded disabled:opacity-30 disabled:cursor-not-allowed"
        title="Redo (Ctrl+Y)"
      >
        <Redo2 size={14} />
      </button>

      {/* Separator */}
      <div className="w-px h-5 bg-[#e5e7eb] mx-1" />

      {/* Zoom controls */}
      <button
        onClick={zoomOut}
        className="p-1.5 text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6] rounded"
        title="Zoom Out"
      >
        <ZoomOut size={14} />
      </button>
      <button
        onClick={resetCanvasTransform}
        className="px-2 py-1 text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6] rounded text-xs min-w-[44px] text-center"
        title="Reset zoom"
      >
        {Math.round(canvasTransform.scale * 100)}%
      </button>
      <button
        onClick={zoomIn}
        className="p-1.5 text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6] rounded"
        title="Zoom In"
      >
        <ZoomIn size={14} />
      </button>

      {/* Separator */}
      <div className="w-px h-5 bg-[#e5e7eb] mx-1" />

      {/* Grid */}
      <button
        onClick={toggleGrid}
        className={`p-1.5 rounded ${
          gridEnabled ? 'text-[#0d99ff] bg-[#0d99ff22]' : 'text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6]'
        }`}
        title="Toggle Grid"
      >
        <Grid3X3 size={14} />
      </button>

      {/* Snap */}
      <button
        onClick={toggleSnap}
        className={`p-1.5 rounded ${
          snapEnabled ? 'text-[#0d99ff] bg-[#0d99ff22]' : 'text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6]'
        }`}
        title="Toggle Snap"
      >
        <Magnet size={14} />
      </button>

      {/* Separator */}
      <div className="w-px h-5 bg-[#e5e7eb] mx-1" />

      {/* Preview */}
      <button
        onClick={togglePreview}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
          previewMode
            ? 'bg-[#0d99ff] text-white'
            : 'bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]'
        }`}
        title="Toggle Preview"
      >
        <Eye size={13} />
        Preview
      </button>

      {/* Reset zoom button */}
      <button
        onClick={resetCanvasTransform}
        className="p-1.5 text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6] rounded"
        title="Fit to screen"
      >
        <RotateCcw size={14} />
      </button>
    </div>
  )
}
