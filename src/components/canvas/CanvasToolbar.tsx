import { useUiStore, type ActiveTool } from '../../store/uiStore'
import { useCanvasStore } from '../../store/canvasStore'
import { useSelectionStore } from '../../store/selectionStore'

/* ─── SVG icons (inline, no extra deps) ─── */
function IconSelect() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3l14 9-7 1-4 7z" />
    </svg>
  )
}
function IconFrame() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="9" y1="2" x2="9" y2="22" /><line x1="15" y1="2" x2="15" y2="22" />
      <line x1="2" y1="9" x2="22" y2="9" /><line x1="2" y1="15" x2="22" y2="15" />
    </svg>
  )
}
function IconRect() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  )
}
function IconText() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="21" x2="14" y2="21" />
      <line x1="12" y1="7" x2="12" y2="21" />
    </svg>
  )
}
function IconImage() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}
function IconComponent() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="2" y="2" width="9" height="9" rx="1" /><rect x="13" y="2" width="9" height="9" rx="1" />
      <rect x="2" y="13" width="9" height="9" rx="1" />
      <line x1="17" y1="13" x2="17" y2="21" /><line x1="13" y1="17" x2="21" y2="17" />
    </svg>
  )
}
function IconPen() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
    </svg>
  )
}
function IconEllipse() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <ellipse cx="12" cy="12" rx="10" ry="10" />
    </svg>
  )
}
function IconCode() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  )
}
function IconPrototype() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  )
}
function IconDraw() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M3 17c3-3 6-5 9-2s5 4 9 2" />
    </svg>
  )
}

/* ─── Tool button ─── */
function ToolBtn({
  tool, active, onClick, children, title,
}: {
  tool?: ActiveTool
  active?: boolean
  onClick: () => void
  children: React.ReactNode
  title: string
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 36, height: 36, borderRadius: 8, border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: active ? '#2563eb' : 'transparent',
        color: active ? '#ffffff' : '#374151',
        cursor: 'pointer', transition: 'background 0.12s, color 0.12s',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        if (!active) e.currentTarget.style.backgroundColor = '#f3f4f6'
      }}
      onMouseLeave={e => {
        if (!active) e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      {children}
    </button>
  )
}

/* ─── Small right-side mode button ─── */
function ModeBtn({ active, onClick, children, title }: { active?: boolean; onClick: () => void; children: React.ReactNode; title: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 32, height: 32, borderRadius: 6, border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: active ? '#dbeafe' : 'transparent',
        color: active ? '#2563eb' : '#6b7280',
        cursor: 'pointer', transition: 'background 0.12s',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = '#f3f4f6' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = active ? '#dbeafe' : 'transparent' }}
    >
      {children}
    </button>
  )
}

/* ─── Main toolbar ─── */
export function CanvasToolbar() {
  const activeTool = useUiStore((s) => s.activeTool)
  const setActiveTool = useUiStore((s) => s.setActiveTool)
  const previewMode = useUiStore((s) => s.previewMode)
  const togglePreview = useUiStore((s) => s.togglePreview)
  const setLeftPanelTab = useUiStore((s) => s.setLeftPanelTab)
  const addPage = useCanvasStore((s) => s.addPage)
  const activePageId = useCanvasStore((s) => s.activePageId)
  const canvasTransform = useCanvasStore((s) => s.canvasTransform)
  const createElement = useCanvasStore((s) => s.createElement)
  const select = useSelectionStore((s) => s.select)

  /** Place an element at the center of the visible viewport */
  function placeAtCenter(type: string) {
    const { scale, offsetX, offsetY } = canvasTransform
    const vw = window.innerWidth / 2
    const vh = window.innerHeight / 2
    const x = Math.max(0, (vw - offsetX) / scale - 100)
    const y = Math.max(0, (vh - offsetY) / scale - 50)
    const id = createElement(type, Math.round(x), Math.round(y))
    select(id)
    setActiveTool('select')
  }

  function handleTool(tool: ActiveTool) {
    setActiveTool(tool)
    switch (tool) {
      case 'frame':
        if (activePageId) addPage()
        setActiveTool('select')
        break
      case 'rectangle':
        placeAtCenter('container')
        break
      case 'text':
        placeAtCenter('text')
        break
      case 'image':
        placeAtCenter('image')
        break
      case 'component':
        setLeftPanelTab('assets')
        setActiveTool('select')
        break
      case 'select':
      default:
        break
    }
  }

  const LEFT_TOOLS: { tool: ActiveTool; icon: React.ReactNode; title: string }[] = [
    { tool: 'select',    icon: <IconSelect />,    title: 'Select (V)' },
    { tool: 'frame',     icon: <IconFrame />,     title: 'New page / Frame (F)' },
    { tool: 'rectangle', icon: <IconRect />,      title: 'Rectangle (R)' },
    { tool: 'select',    icon: <IconPen />,       title: 'Pen (P) — coming soon' },
    { tool: 'text',      icon: <IconText />,      title: 'Text (T)' },
    { tool: 'select',    icon: <IconEllipse />,   title: 'Ellipse (O) — coming soon' },
    { tool: 'component', icon: <IconComponent />, title: 'Components (K)' },
  ]

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        backgroundColor: '#ffffff',
        borderRadius: 14,
        boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
        padding: '4px 6px',
        zIndex: 500,
        userSelect: 'none',
      }}
    >
      {/* Left: creation tools */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {LEFT_TOOLS.map(({ tool, icon, title }, i) => (
          <ToolBtn
            key={i}
            tool={tool}
            active={activeTool === tool && tool !== 'select' ? false : activeTool === tool}
            onClick={() => handleTool(tool as ActiveTool)}
            title={title}
          >
            {icon}
          </ToolBtn>
        ))}
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 24, backgroundColor: '#e5e7eb', margin: '0 4px' }} />

      {/* Right: mode buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ModeBtn onClick={() => {}} title="Draw mode" active={false}>
          <IconDraw />
        </ModeBtn>
        <ModeBtn onClick={togglePreview} title="Prototype / Preview" active={previewMode}>
          <IconPrototype />
        </ModeBtn>
        <ModeBtn onClick={() => {}} title="Code view" active={false}>
          <IconCode />
        </ModeBtn>
      </div>
    </div>
  )
}
