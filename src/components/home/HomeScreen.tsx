import { useState } from 'react'
import { Plus, Search, LayoutGrid, List } from 'lucide-react'
import { useCanvasStore } from '../../store/canvasStore'
import { useUiStore } from '../../store/uiStore'
import type { PageDefinition } from '../../types'

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} minute${mins > 1 ? 's' : ''} ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`
  const months = Math.floor(days / 30)
  return `${months} month${months > 1 ? 's' : ''} ago`
}

/** Deterministic pastel background per project id */
function projectColor(id: string): string {
  const palette = [
    '#e0e7ff', '#fce7f3', '#d1fae5', '#fef3c7',
    '#f3e8ff', '#dbeafe', '#fde8d8', '#d1ecf1',
  ]
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffffffff
  return palette[Math.abs(h) % palette.length]
}

function ProjectCard({ project, onOpen }: { project: PageDefinition; onOpen: () => void }) {
  const [hov, setHov] = useState(false)
  const elementCount = Object.keys(project.elements).length

  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign: 'left', background: 'none', border: 'none', padding: 0,
        cursor: 'pointer', borderRadius: 12, transition: 'transform 0.15s',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: '100%', paddingBottom: '62%', position: 'relative',
        borderRadius: 10, overflow: 'hidden',
        backgroundColor: projectColor(project.id),
        border: hov ? '2px solid #3b82f6' : '2px solid transparent',
        transition: 'border-color 0.15s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {elementCount > 0 ? (
            /* Mini artboard preview */
            <div style={{
              width: '55%', height: '55%', backgroundColor: '#fff',
              borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, color: '#9ca3af', fontFamily: 'Inter, sans-serif',
            }}>
              {elementCount} element{elementCount !== 1 ? 's' : ''}
            </div>
          ) : (
            <div style={{
              width: '55%', height: '55%', backgroundColor: '#fff',
              borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }} />
          )}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '10px 4px 4px', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#111827', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {project.name}
        </div>
        <div style={{ fontSize: 12, color: '#9ca3af' }}>
          Edited {timeAgo(project.updatedAt)}
        </div>
      </div>
    </button>
  )
}

export function HomeScreen() {
  const pages = useCanvasStore((s) => s.pages)
  const addPage = useCanvasStore((s) => s.addPage)
  const setActivePage = useCanvasStore((s) => s.setActivePage)
  const setCurrentView = useUiStore((s) => s.setCurrentView)

  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState<'all' | 'recent'>('recent')

  const filtered = pages.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )

  function openProject(id: string) {
    setActivePage(id)
    setCurrentView('canvas')
  }

  function createNewProject() {
    addPage(`Project ${pages.length + 1}`)
    setCurrentView('canvas')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, ui-sans-serif, sans-serif', backgroundColor: '#fff' }}>

      {/* ── Left sidebar ── */}
      <div style={{ width: 200, borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', padding: '20px 0', flexShrink: 0 }}>
        {/* User */}
        <div style={{ padding: '0 16px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
            M
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Mohammad</div>
            <div style={{ fontSize: 11, color: '#9ca3af' }}>Free plan</div>
          </div>
        </div>

        {/* Nav */}
        {[
          { label: 'Files', active: true },
          { label: 'Learn', active: false },
        ].map(({ label, active }) => (
          <button key={label} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 20px',
            background: active ? '#f0f7ff' : 'none', border: 'none', cursor: 'pointer',
            fontSize: 14, color: active ? '#2563eb' : '#374151', fontWeight: active ? 500 : 400,
            fontFamily: 'Inter, sans-serif', textAlign: 'left', width: '100%',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {label === 'Files'
                ? <><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></>
                : <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>
              }
            </svg>
            {label}
          </button>
        ))}

        {/* Builder logo at bottom */}
        <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
            <span style={{ color: '#0d99ff' }}>⬡</span> Builder
          </div>
          <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>UI Design Platform</div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '28px 32px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Files</h1>
          <button
            onClick={createNewProject}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
              backgroundColor: '#111827', color: '#fff', border: 'none', borderRadius: 8,
              fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#374151')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#111827')}
          >
            <Plus size={14} />
            New file
          </button>
        </div>

        {/* Filters + search */}
        <div style={{ padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 0, borderRadius: 6, overflow: 'hidden' }}>
            {(['all', 'recent'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '5px 14px', border: 'none', cursor: 'pointer', fontSize: 13,
                fontFamily: 'Inter, sans-serif', fontWeight: filter === f ? 600 : 400,
                backgroundColor: 'transparent',
                color: filter === f ? '#111827' : '#6b7280',
                borderBottom: filter === f ? '2px solid #111827' : '2px solid transparent',
              }}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #e5e7eb', borderRadius: 8, padding: '5px 12px', width: 220 }}>
            <Search size={13} color="#9ca3af" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files"
              style={{ border: 'none', outline: 'none', fontSize: 13, fontFamily: 'Inter, sans-serif', color: '#111827', flex: 1, backgroundColor: 'transparent' }}
            />
          </div>

          {/* View toggles */}
          <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: 6, overflow: 'hidden' }}>
            {([['grid', LayoutGrid], ['list', List]] as const).map(([mode, Icon]) => (
              <button key={mode} onClick={() => setViewMode(mode)} style={{
                padding: '5px 8px', border: 'none', cursor: 'pointer',
                backgroundColor: viewMode === mode ? '#f3f4f6' : '#fff',
                color: viewMode === mode ? '#111827' : '#9ca3af',
              }}>
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* Project grid/list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
          {sorted.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: 14, paddingTop: 60 }}>
              No projects found. Create one to get started.
            </div>
          ) : viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
              {sorted.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={() => openProject(project.id)} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {sorted.map((project, i) => (
                <button
                  key={project.id}
                  onClick={() => openProject(project.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0',
                    borderBottom: i < sorted.length - 1 ? '1px solid #f3f4f6' : 'none',
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ width: 44, height: 36, borderRadius: 6, backgroundColor: projectColor(project.id), flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#111827', fontFamily: 'Inter, sans-serif' }}>{project.name}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>Edited {timeAgo(project.updatedAt)}</div>
                  </div>
                  <div style={{ fontSize: 12, color: '#d1d5db', fontFamily: 'Inter, sans-serif' }}>
                    {Object.keys(project.elements).length} elements
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
