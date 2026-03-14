import { useState } from 'react'
import type { ShadcnElement } from '../types'

interface Props {
  element: ShadcnElement
}

/* ─── Design tokens ─── */
const T = {
  border: '1px solid #e5e7eb',
  radius: '8px',
  radius6: '6px',
  radiusFull: '9999px',
  bg: '#ffffff',
  muted: '#f1f5f9',
  mutedBorder: '#e2e8f0',
  fg: '#0f172a',
  fgMuted: '#64748b',
  primary: '#18181b',
  primaryFg: '#fafafa',
  ring: '0 0 0 2px #18181b',
  fontSans: 'Inter, ui-sans-serif, system-ui, sans-serif',
}

/* ─── Shared sub-components ─── */

function Btn({
  children, variant = 'default', size = 'md', disabled = false,
  className = '', onClick,
}: {
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  disabled?: boolean
  className?: string
  onClick?: () => void
}) {
  const [hov, setHov] = useState(false)
  const [act, setAct] = useState(false)

  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 6, borderRadius: T.radius6, fontFamily: T.fontSans,
    fontWeight: 500, cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none', outline: 'none', transition: 'all 0.15s',
    opacity: disabled ? 0.5 : 1, userSelect: 'none',
  }
  const sizeMap: Record<string, React.CSSProperties> = {
    sm: { fontSize: 12, padding: '6px 12px', height: 32 },
    md: { fontSize: 14, padding: '8px 16px', height: 36 },
    lg: { fontSize: 16, padding: '10px 24px', height: 44 },
    icon: { width: 36, height: 36, padding: 0, fontSize: 14 },
  }
  const variantMap: Record<string, React.CSSProperties> = {
    default:     { backgroundColor: act ? '#27272a' : hov ? '#3f3f46' : T.primary, color: T.primaryFg },
    secondary:   { backgroundColor: act ? '#e2e8f0' : hov ? '#e2e8f0' : T.muted, color: T.fg },
    outline:     { backgroundColor: act ? T.muted : hov ? T.muted : T.bg, border: T.border, color: T.fg },
    ghost:       { backgroundColor: act ? T.muted : hov ? T.muted : 'transparent', color: T.fg },
    destructive: { backgroundColor: act ? '#b91c1c' : hov ? '#dc2626' : '#ef4444', color: '#fff' },
    link:        { backgroundColor: 'transparent', color: '#2563eb', textDecoration: hov ? 'underline' : 'none', padding: 0, height: 'auto' },
  }

  return (
    <button
      style={{ ...base, ...sizeMap[size], ...variantMap[variant] }}
      className={className}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setAct(false) }}
      onMouseDown={() => setAct(true)}
      onMouseUp={() => setAct(false)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

function Input({ placeholder = 'Input', disabled = false, value = '' }: { placeholder?: string; disabled?: boolean; value?: string }) {
  const [hov, setHov] = useState(false)
  const [foc, setFoc] = useState(false)
  return (
    <input
      style={{
        width: '100%', height: 36, padding: '0 12px',
        borderRadius: T.radius6, border: foc ? `1.5px solid ${T.primary}` : hov ? `1px solid #94a3b8` : T.border,
        backgroundColor: disabled ? T.muted : T.bg, color: T.fg, fontSize: 14,
        fontFamily: T.fontSans, outline: 'none', boxSizing: 'border-box',
        opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'text',
      }}
      placeholder={placeholder}
      defaultValue={value}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
    />
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <label style={{ fontSize: 14, fontWeight: 500, fontFamily: T.fontSans, color: T.fg, display: 'block' }}>{children}</label>
}

function Separator({ vertical = false }: { vertical?: boolean }) {
  return <div style={{ [vertical ? 'width' : 'height']: 1, [vertical ? 'height' : 'width']: '100%', backgroundColor: T.mutedBorder, flexShrink: 0 }} />
}

/* ─── Component renderers ─── */

function AccordionCanvas() {
  const [open, setOpen] = useState<number | null>(0)
  const items = ['Is it accessible?', 'Is it styled?', 'Is it animated?']
  const answers = [
    'Yes. It adheres to the WAI-ARIA design pattern.',
    'Yes. It comes with default styles that match your design system.',
    'Yes. It\'s animated by default, but you can disable it.',
  ]
  return (
    <div style={{ width: '100%', fontFamily: T.fontSans, display: 'flex', flexDirection: 'column', gap: 0 }}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} style={{ borderBottom: T.border }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 500, color: T.fg, fontFamily: T.fontSans, textAlign: 'left',
              }}
            >
              {item}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isOpen && (
              <div style={{ paddingBottom: 16, fontSize: 14, color: T.fgMuted, lineHeight: 1.6 }}>{answers[i]}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function AlertCanvas() {
  return (
    <div style={{ border: T.border, borderRadius: T.radius, padding: '16px', backgroundColor: T.bg, fontFamily: T.fontSans, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Heads up!</div>
          <div style={{ fontSize: 14, color: T.fgMuted, lineHeight: 1.5 }}>You can add components to your app using the cli.</div>
        </div>
      </div>
    </div>
  )
}

function AlertDialogCanvas() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ fontFamily: T.fontSans, position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Btn variant="outline" onClick={() => setOpen(true)}>Show Dialog</Btn>
      {open && (
        <>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: T.radius }} onClick={() => setOpen(false)} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', backgroundColor: T.bg, border: T.border, borderRadius: T.radius, padding: 24, width: 'calc(100% - 32px)', zIndex: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Are you absolutely sure?</div>
            <div style={{ fontSize: 14, color: T.fgMuted, marginBottom: 20, lineHeight: 1.5 }}>This action cannot be undone. This will permanently delete your account.</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Btn variant="outline" onClick={() => setOpen(false)}>Cancel</Btn>
              <Btn variant="destructive" onClick={() => setOpen(false)}>Continue</Btn>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function AvatarCanvas() {
  const [err, setErr] = useState(false)
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontFamily: T.fontSans, flexWrap: 'wrap' }}>
      {[{ size: 40, initials: 'CN' }, { size: 32, initials: 'JD' }, { size: 48, initials: 'AB' }].map(({ size, initials }) => (
        <div key={size} style={{ width: size, height: size, borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: 600, color: T.fgMuted, border: T.border, flexShrink: 0 }}>
          {initials}
        </div>
      ))}
    </div>
  )
}

function BadgeCanvas() {
  const variants = [
    { label: 'Default',     bg: T.primary,   fg: T.primaryFg, border: 'none' },
    { label: 'Secondary',  bg: T.muted,      fg: T.fg,        border: 'none' },
    { label: 'Outline',    bg: T.bg,         fg: T.fg,        border: T.border },
    { label: 'Destructive', bg: '#ef4444',   fg: '#fff',      border: 'none' },
  ]
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {variants.map(v => (
        <span key={v.label} style={{ padding: '2px 10px', borderRadius: T.radiusFull, backgroundColor: v.bg, color: v.fg, border: v.border, fontSize: 12, fontWeight: 500, fontFamily: T.fontSans, display: 'inline-flex', alignItems: 'center' }}>
          {v.label}
        </span>
      ))}
    </div>
  )
}

function BreadcrumbCanvas() {
  const items = ['Home', 'Documentation', 'Components', 'Breadcrumb']
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: T.fontSans }}>
      {items.map((item, i) => (
        <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {i > 0 && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>}
          <span style={{ fontSize: 14, color: i === items.length - 1 ? T.fg : '#2563eb', fontWeight: i === items.length - 1 ? 500 : 400, textDecoration: i < items.length - 1 ? 'underline' : 'none', cursor: i < items.length - 1 ? 'pointer' : 'default' }}>
            {item}
          </span>
        </span>
      ))}
    </nav>
  )
}

function ButtonCanvas() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Btn>Default</Btn>
      <Btn variant="secondary">Secondary</Btn>
      <Btn variant="outline">Outline</Btn>
      <Btn variant="ghost">Ghost</Btn>
      <Btn variant="destructive">Destructive</Btn>
      <Btn variant="link">Link</Btn>
    </div>
  )
}

function CalendarCanvas() {
  const [selected, setSelected] = useState(14)
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const dates = Array.from({ length: 35 }, (_, i) => (i - 2 + 1))
  return (
    <div style={{ fontFamily: T.fontSans, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <button style={{ background: 'none', border: T.border, borderRadius: 6, width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <span style={{ fontSize: 14, fontWeight: 500 }}>March 2025</span>
        <button style={{ background: 'none', border: T.border, borderRadius: 6, width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
        {days.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 11, color: T.fgMuted, fontWeight: 500, padding: '4px 0' }}>{d}</div>)}
        {dates.map((d, i) => {
          const valid = d >= 1 && d <= 31
          const isSel = d === selected
          return (
            <button key={i} onClick={() => valid && setSelected(d)}
              style={{ width: '100%', aspectRatio: '1', borderRadius: 6, border: 'none', cursor: valid ? 'pointer' : 'default', backgroundColor: isSel ? T.primary : 'transparent', color: isSel ? T.primaryFg : valid ? T.fg : T.mutedBorder, fontSize: 12, fontFamily: T.fontSans, transition: 'background 0.1s' }}>
              {valid ? d : ''}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function CardCanvas() {
  return (
    <div style={{ border: T.border, borderRadius: T.radius, backgroundColor: T.bg, fontFamily: T.fontSans, width: '100%', overflow: 'hidden' }}>
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Create project</div>
        <div style={{ fontSize: 14, color: T.fgMuted }}>Deploy your new project in one-click.</div>
      </div>
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div><Label>Name</Label><div style={{ marginTop: 4 }}><Input placeholder="Name of your project" /></div></div>
          <div><Label>Framework</Label>
            <div style={{ marginTop: 4, border: T.border, borderRadius: T.radius6, padding: '0 12px', height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span style={{ fontSize: 14, color: T.fgMuted, fontFamily: T.fontSans }}>Select</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 20px 20px', display: 'flex', justifyContent: 'space-between' }}>
        <Btn variant="outline">Cancel</Btn>
        <Btn>Deploy</Btn>
      </div>
    </div>
  )
}

function CheckboxCanvas() {
  const [checked, setChecked] = useState<Record<string, boolean>>({ terms: true, newsletter: false, updates: true })
  const items = [{ id: 'terms', label: 'Accept terms and conditions' }, { id: 'newsletter', label: 'Subscribe to newsletter' }, { id: 'updates', label: 'Receive product updates' }]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: T.fontSans }}>
      {items.map(({ id, label }) => (
        <label key={id} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <button onClick={() => setChecked(c => ({ ...c, [id]: !c[id] }))}
            style={{ width: 18, height: 18, borderRadius: 4, border: checked[id] ? 'none' : T.border, backgroundColor: checked[id] ? T.primary : T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            {checked[id] && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
          </button>
          <span style={{ fontSize: 14 }}>{label}</span>
        </label>
      ))}
    </div>
  )
}

function CollapsibleCanvas() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ fontFamily: T.fontSans, width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 500 }}>@peduarte starred 3 repositories</span>
        <button onClick={() => setOpen(o => !o)} style={{ background: 'none', border: T.border, borderRadius: 6, width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: open ? 'rotate(180deg)' : undefined }}><polyline points="6 9 12 15 18 9" /></svg>
        </button>
      </div>
      <div style={{ border: T.border, borderRadius: T.radius6, padding: '10px 12px', fontSize: 13, fontFamily: 'monospace', backgroundColor: '#f8fafc' }}>@radix-ui/primitives</div>
      {open && <>
        <div style={{ border: T.border, borderRadius: T.radius6, padding: '10px 12px', fontSize: 13, fontFamily: 'monospace', backgroundColor: '#f8fafc' }}>@radix-ui/colors</div>
        <div style={{ border: T.border, borderRadius: T.radius6, padding: '10px 12px', fontSize: 13, fontFamily: 'monospace', backgroundColor: '#f8fafc' }}>@stitches/react</div>
      </>}
    </div>
  )
}

function ComboboxCanvas() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro']
  return (
    <div style={{ fontFamily: T.fontSans, position: 'relative', width: '100%' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', border: T.border, borderRadius: T.radius6, backgroundColor: T.bg, cursor: 'pointer', fontSize: 14, fontFamily: T.fontSans }}>
        <span style={{ color: value ? T.fg : T.fgMuted }}>{value || 'Select framework...'}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, border: T.border, borderRadius: T.radius, backgroundColor: T.bg, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', zIndex: 20 }}>
          {frameworks.map(f => (
            <button key={f} onClick={() => { setValue(f); setOpen(false) }}
              style={{ width: '100%', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontFamily: T.fontSans, color: T.fg }}>
              {value === f && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>}
              {f}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function CommandCanvas() {
  const [q, setQ] = useState('')
  const all = [
    { icon: '📅', label: 'Calendar' }, { icon: '😊', label: 'Search Emoji' },
    { icon: '🧮', label: 'Calculator' }, { icon: '⚙️', label: 'Settings' },
    { icon: '👤', label: 'Profile' }, { icon: '💳', label: 'Billing' },
  ]
  const filtered = all.filter(i => i.label.toLowerCase().includes(q.toLowerCase()))
  return (
    <div style={{ border: T.border, borderRadius: T.radius, fontFamily: T.fontSans, overflow: 'hidden', backgroundColor: T.bg, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', borderBottom: T.border, gap: 8 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.fgMuted} strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Type a command or search..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, fontFamily: T.fontSans, backgroundColor: 'transparent', color: T.fg }} />
      </div>
      <div style={{ padding: '4px 0', maxHeight: 180, overflowY: 'auto' }}>
        {filtered.map(item => (
          <button key={item.label} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontFamily: T.fontSans, color: T.fg, textAlign: 'left' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.muted)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
        {filtered.length === 0 && <div style={{ padding: '12px', textAlign: 'center', fontSize: 14, color: T.fgMuted }}>No results found.</div>}
      </div>
    </div>
  )
}

function ContextMenuCanvas() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const items = ['Back', 'Forward', 'Reload', null, 'Save As...', 'Print...', 'Cast...', null, 'View Page Source', 'Inspect']
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }} onContextMenu={e => { e.preventDefault(); setPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }) }} onClick={() => setPos(null)}>
      <div style={{ border: '1px dashed #d1d5db', borderRadius: T.radius, height: '100%', minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: T.fgMuted, fontFamily: T.fontSans, userSelect: 'none' }}>
        Right click here
      </div>
      {pos && (
        <div style={{ position: 'absolute', top: pos.y, left: pos.x, border: T.border, borderRadius: T.radius6, backgroundColor: T.bg, boxShadow: '0 4px 16px rgba(0,0,0,0.1)', minWidth: 160, zIndex: 20, padding: '4px 0' }}>
          {items.map((item, i) => item === null
            ? <Separator key={`sep-${i}`} />
            : <button key={item} style={{ width: '100%', padding: '7px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontFamily: T.fontSans, color: T.fg, textAlign: 'left', display: 'block' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.muted)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>{item}</button>
          )}
        </div>
      )}
    </div>
  )
}

function DataTableCanvas() {
  const [sort, setSort] = useState<{ col: string; dir: 'asc' | 'desc' } | null>(null)
  const rows = [
    { status: 'Paid', email: 'alice@example.com', amount: '$250.00' },
    { status: 'Pending', email: 'bob@example.com', amount: '$150.00' },
    { status: 'Unpaid', email: 'carol@example.com', amount: '$350.00' },
    { status: 'Paid', email: 'dave@example.com', amount: '$450.00' },
  ]
  return (
    <div style={{ width: '100%', fontFamily: T.fontSans }}>
      <div style={{ padding: '0 0 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Input placeholder="Filter emails..." />
      </div>
      <div style={{ border: T.border, borderRadius: T.radius, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead style={{ backgroundColor: '#f8fafc' }}>
            <tr>{['Status', 'Email', 'Amount'].map(col => (
              <th key={col} onClick={() => setSort(s => s?.col === col ? { col, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { col, dir: 'asc' })}
                style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 500, color: T.fg, borderBottom: T.border, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {col} {sort?.col === col ? (sort.dir === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}</tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: i < rows.length - 1 ? T.border : 'none' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.muted)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <td style={{ padding: '10px 16px' }}><span style={{ padding: '2px 8px', borderRadius: T.radiusFull, fontSize: 12, fontWeight: 500, backgroundColor: row.status === 'Paid' ? '#dcfce7' : row.status === 'Pending' ? '#fef9c3' : '#fee2e2', color: row.status === 'Paid' ? '#16a34a' : row.status === 'Pending' ? '#ca8a04' : '#dc2626' }}>{row.status}</span></td>
                <td style={{ padding: '10px 16px', color: T.fgMuted }}>{row.email}</td>
                <td style={{ padding: '10px 16px', fontWeight: 500 }}>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: 13, color: T.fgMuted }}>
        <span>0 of 4 row(s) selected.</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <Btn variant="outline" size="sm">Previous</Btn>
          <Btn variant="outline" size="sm">Next</Btn>
        </div>
      </div>
    </div>
  )
}

function DatePickerCanvas() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<string | null>(null)
  return (
    <div style={{ fontFamily: T.fontSans, position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: T.border, borderRadius: T.radius6, backgroundColor: T.bg, cursor: 'pointer', fontSize: 14, fontFamily: T.fontSans, color: date ? T.fg : T.fgMuted }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
        {date ?? 'Pick a date'}
      </button>
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, border: T.border, borderRadius: T.radius, backgroundColor: T.bg, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', zIndex: 20, padding: 16 }}>
          <CalendarCanvas />
        </div>
      )}
    </div>
  )
}

function DialogCanvas() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ fontFamily: T.fontSans, position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Btn onClick={() => setOpen(true)}>Edit Profile</Btn>
      {open && (
        <>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: T.radius }} onClick={() => setOpen(false)} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', backgroundColor: T.bg, border: T.border, borderRadius: T.radius, padding: 24, width: 'calc(100% - 32px)', zIndex: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Edit profile</div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.fgMuted, fontSize: 18 }}>×</button>
            </div>
            <div style={{ fontSize: 14, color: T.fgMuted, marginBottom: 16 }}>Make changes to your profile here.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div><Label>Name</Label><div style={{ marginTop: 4 }}><Input placeholder="Pedro Duarte" /></div></div>
              <div><Label>Username</Label><div style={{ marginTop: 4 }}><Input placeholder="@peduarte" /></div></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
              <Btn onClick={() => setOpen(false)}>Save changes</Btn>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function DrawerCanvas() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ fontFamily: T.fontSans, position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <Btn onClick={() => setOpen(true)}>Open Drawer</Btn>
      {open && (
        <>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }} onClick={() => setOpen(false)} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: T.bg, borderRadius: `${T.radius} ${T.radius} 0 0`, padding: '24px 24px 32px', boxShadow: '0 -4px 32px rgba(0,0,0,0.1)', zIndex: 10 }}>
            <div style={{ width: 32, height: 4, borderRadius: 2, backgroundColor: T.mutedBorder, margin: '0 auto 16px' }} />
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>Move Goal</div>
            <div style={{ fontSize: 14, color: T.fgMuted, marginBottom: 20 }}>Set your daily activity goal.</div>
            <Btn variant="outline" onClick={() => setOpen(false)} className="w-full">Cancel</Btn>
          </div>
        </>
      )}
    </div>
  )
}

function DropdownMenuCanvas() {
  const [open, setOpen] = useState(false)
  const items = [['Profile', 'Ctrl+Shift+P'], ['Billing', null], ['Settings', 'Ctrl+,'], null, ['Logout', null]]
  return (
    <div style={{ fontFamily: T.fontSans, position: 'relative', display: 'inline-block' }}>
      <Btn variant="outline" onClick={() => setOpen(o => !o)}>Open ▾</Btn>
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, border: T.border, borderRadius: T.radius6, backgroundColor: T.bg, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', minWidth: 180, zIndex: 20, padding: '4px 0' }}>
          <div style={{ padding: '4px 8px', fontSize: 11, color: T.fgMuted, fontWeight: 500 }}>My Account</div>
          <Separator />
          {items.map((item, i) => item === null
            ? <Separator key={i} />
            : <button key={item[0]} onClick={() => setOpen(false)} style={{ width: '100%', padding: '7px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontFamily: T.fontSans, color: T.fg }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.muted)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <span>{item[0]}</span>
                {item[1] && <span style={{ fontSize: 11, color: T.fgMuted }}>{item[1]}</span>}
              </button>
          )}
        </div>
      )}
    </div>
  )
}

function FormCanvas() {
  return (
    <div style={{ fontFamily: T.fontSans, width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>Username</Label>
        <Input placeholder="shadcn" />
        <p style={{ fontSize: 12, color: T.fgMuted, margin: 0 }}>This is your public display name.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>Email</Label>
        <Input placeholder="you@example.com" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>Bio</Label>
        <textarea placeholder="Tell us a little bit about yourself" style={{ width: '100%', minHeight: 80, padding: '8px 12px', borderRadius: T.radius6, border: T.border, fontSize: 14, fontFamily: T.fontSans, resize: 'none', boxSizing: 'border-box', outline: 'none' }} />
      </div>
      <Btn>Update profile</Btn>
    </div>
  )
}

function HoverCardCanvas() {
  const [hov, setHov] = useState(false)
  return (
    <div style={{ fontFamily: T.fontSans, position: 'relative', display: 'inline-block' }}>
      <a onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ fontSize: 14, color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>@nextjs</a>
      {hov && (
        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 8, border: T.border, borderRadius: T.radius, backgroundColor: T.bg, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', padding: 16, width: 280, zIndex: 20 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#18181b', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 600 }}>N</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Next.js</div>
              <div style={{ fontSize: 13, color: T.fgMuted }}>@nextjs</div>
            </div>
          </div>
          <p style={{ margin: '0 0 10px', fontSize: 14, color: T.fgMuted, lineHeight: 1.5 }}>The React Framework – created and maintained by @vercel.</p>
          <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
            <span><strong>following</strong> <span style={{ color: T.fgMuted }}>0</span></span>
            <span><strong>followers</strong> <span style={{ color: T.fgMuted }}>2,145</span></span>
          </div>
        </div>
      )}
    </div>
  )
}

function InputCanvas() {
  return (
    <div style={{ fontFamily: T.fontSans, width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div><Label>Email</Label><div style={{ marginTop: 4 }}><Input placeholder="Email" /></div></div>
      <div><Label>Disabled</Label><div style={{ marginTop: 4 }}><Input placeholder="Disabled input" disabled /></div></div>
      <div><Label>With button</Label>
        <div style={{ marginTop: 4, display: 'flex', gap: 8 }}>
          <Input placeholder="shadcn@example.com" />
          <Btn>Subscribe</Btn>
        </div>
      </div>
    </div>
  )
}

function InputOTPCanvas() {
  const [value, setValue] = useState(['1', '2', '3', '', '4', '5'])
  return (
    <div style={{ fontFamily: T.fontSans, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', width: '100%' }}>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {[0, 1, 2].map(i => (
          <input key={i} maxLength={1} value={value[i]} onChange={e => setValue(v => { const n=[...v]; n[i]=e.target.value; return n })}
            style={{ width: 40, height: 48, textAlign: 'center', fontSize: 18, fontWeight: 500, fontFamily: T.fontSans, border: T.border, borderRadius: T.radius6, outline: 'none', backgroundColor: T.bg }} />
        ))}
        <div style={{ width: 8, height: 2, backgroundColor: T.fgMuted }} />
        {[3, 4, 5].map(i => (
          <input key={i} maxLength={1} value={value[i]} onChange={e => setValue(v => { const n=[...v]; n[i]=e.target.value; return n })}
            style={{ width: 40, height: 48, textAlign: 'center', fontSize: 18, fontWeight: 500, fontFamily: T.fontSans, border: T.border, borderRadius: T.radius6, outline: 'none', backgroundColor: T.bg }} />
        ))}
      </div>
      <p style={{ fontSize: 13, color: T.fgMuted }}>One-time password</p>
    </div>
  )
}

function LabelCanvas() {
  const [checked, setChecked] = useState(false)
  return (
    <div style={{ fontFamily: T.fontSans, display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Label>Your email address</Label>
        <Input placeholder="Enter email" />
        <span style={{ fontSize: 12, color: T.fgMuted }}>We'll never share your email.</span>
      </div>
      <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
        <button onClick={() => setChecked(c => !c)} style={{ width: 18, height: 18, borderRadius: 4, border: checked ? 'none' : T.border, backgroundColor: checked ? T.primary : T.bg, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {checked && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
        </button>
        <Label>Accept terms and conditions</Label>
      </label>
    </div>
  )
}

function MenubarCanvas() {
  const [open, setOpen] = useState<string | null>(null)
  const menus = {
    File: ['New Tab\tCtrl+T', 'New Window\tCtrl+N', null, 'Share', 'Print...'],
    Edit: ['Undo\tCtrl+Z', 'Redo\tCtrl+Y', null, 'Cut', 'Copy', 'Paste'],
    View: ['Zoom In', 'Zoom Out', null, 'Full Screen'],
  }
  return (
    <div style={{ fontFamily: T.fontSans, position: 'relative' }}>
      <div style={{ display: 'inline-flex', border: T.border, borderRadius: T.radius6, padding: '2px 4px', backgroundColor: T.bg, gap: 2 }}>
        {Object.keys(menus).map(menu => (
          <button key={menu} onClick={() => setOpen(open === menu ? null : menu)}
            style={{ padding: '4px 10px', borderRadius: 4, backgroundColor: open === menu ? T.muted : 'transparent', border: 'none', cursor: 'pointer', fontSize: 14, fontFamily: T.fontSans, color: T.fg }}>
            {menu}
          </button>
        ))}
      </div>
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, border: T.border, borderRadius: T.radius6, backgroundColor: T.bg, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', minWidth: 180, zIndex: 20, padding: '4px 0' }}>
          {(menus as Record<string, (string | null)[]>)[open].map((item, i) => item === null
            ? <Separator key={i} />
            : <button key={item} onClick={() => setOpen(null)} style={{ width: '100%', padding: '7px 12px', display: 'flex', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontFamily: T.fontSans, color: T.fg }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.muted)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                {item.split('\t').map((p, j) => <span key={j} style={{ fontSize: j === 1 ? 12 : 14, color: j === 1 ? T.fgMuted : T.fg }}>{p}</span>)}
              </button>
          )}
        </div>
      )}
    </div>
  )
}

function NavigationMenuCanvas() {
  const [active, setActive] = useState<string | null>(null)
  return (
    <div style={{ fontFamily: T.fontSans, position: 'relative' }}>
      <div style={{ display: 'flex', gap: 2 }}>
        {['Getting started', 'Components', 'Documentation'].map(item => (
          <button key={item} onMouseEnter={() => setActive(item)} onMouseLeave={() => setActive(null)}
            style={{ padding: '8px 14px', borderRadius: 6, backgroundColor: active === item ? T.muted : 'transparent', border: 'none', cursor: 'pointer', fontSize: 14, fontFamily: T.fontSans, color: T.fg }}>
            {item} <svg style={{ display: 'inline', verticalAlign: 'middle' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
        ))}
      </div>
      {active === 'Components' && (
        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, border: T.border, borderRadius: T.radius, backgroundColor: T.bg, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, zIndex: 20, width: 360 }}>
          {['Alert Dialog', 'Combobox', 'Dialog', 'Dropdown Menu', 'Navigation Menu', 'Popover'].map(c => (
            <a key={c} style={{ padding: '8px 10px', borderRadius: 6, fontSize: 13, color: T.fg, textDecoration: 'none', cursor: 'pointer', display: 'block' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.muted)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>{c}</a>
          ))}
        </div>
      )}
    </div>
  )
}

function PaginationCanvas() {
  const [page, setPage] = useState(3)
  const total = 10
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', fontFamily: T.fontSans }}>
      <Btn variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))}>← Previous</Btn>
      {[1, 2, 3, '...', total].map((p, i) => (
        typeof p === 'number'
          ? <button key={i} onClick={() => setPage(p)} style={{ width: 32, height: 32, borderRadius: T.radius6, border: p === page ? 'none' : T.border, backgroundColor: p === page ? T.primary : T.bg, color: p === page ? T.primaryFg : T.fg, fontSize: 13, cursor: 'pointer', fontFamily: T.fontSans }}>{p}</button>
          : <span key={i} style={{ padding: '0 4px', color: T.fgMuted }}>…</span>
      ))}
      <Btn variant="outline" size="sm" onClick={() => setPage(p => Math.min(total, p + 1))}>Next →</Btn>
    </div>
  )
}

function PopoverCanvas() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ fontFamily: T.fontSans, position: 'relative', display: 'inline-block' }}>
      <Btn variant="outline" onClick={() => setOpen(o => !o)}>Open popover</Btn>
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 8, border: T.border, borderRadius: T.radius, backgroundColor: T.bg, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', padding: 16, width: 260, zIndex: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Dimensions</div>
          <div style={{ fontSize: 13, color: T.fgMuted, marginBottom: 12 }}>Set the dimensions for the layer.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <Label>Width</Label><Input placeholder="100%" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <Label>Height</Label><Input placeholder="25px" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ProgressCanvas() {
  const [progress] = useState(60)
  return (
    <div style={{ fontFamily: T.fontSans, width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14 }}>
          <span>Uploading...</span><span style={{ color: T.fgMuted }}>{progress}%</span>
        </div>
        <div style={{ height: 8, borderRadius: T.radiusFull, backgroundColor: T.muted, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', borderRadius: T.radiusFull, backgroundColor: T.primary, transition: 'width 0.3s' }} />
        </div>
      </div>
      {[25, 80].map((v, i) => (
        <div key={i} style={{ height: 8, borderRadius: T.radiusFull, backgroundColor: T.muted, overflow: 'hidden' }}>
          <div style={{ width: `${v}%`, height: '100%', borderRadius: T.radiusFull, backgroundColor: T.primary }} />
        </div>
      ))}
    </div>
  )
}

function RadioGroupCanvas() {
  const [val, setVal] = useState('default')
  const options = [{ val: 'default', label: 'Default' }, { val: 'comfortable', label: 'Comfortable' }, { val: 'compact', label: 'Compact' }]
  return (
    <div style={{ fontFamily: T.fontSans, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {options.map(o => (
        <label key={o.val} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setVal(o.val)}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', border: val === o.val ? `5px solid ${T.primary}` : T.border, backgroundColor: T.bg, boxSizing: 'border-box', flexShrink: 0 }} />
          <span style={{ fontSize: 14 }}>{o.label}</span>
        </label>
      ))}
    </div>
  )
}

function ResizableCanvas() {
  const [split, setSplit] = useState(50)
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', border: T.border, borderRadius: T.radius, overflow: 'hidden', fontFamily: T.fontSans, minHeight: 120 }}>
      <div style={{ width: `${split}%`, backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: T.fgMuted }}>Panel One</div>
      <div style={{ width: 6, backgroundColor: T.mutedBorder, cursor: 'col-resize', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        onMouseDown={e => {
          const start = e.clientX; const startSplit = split
          const move = (ev: MouseEvent) => { const parent = (e.target as HTMLElement).parentElement; if (!parent) return; const pct = Math.min(80, Math.max(20, startSplit + ((ev.clientX - start) / parent.offsetWidth) * 100)); setSplit(pct) }
          const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
          window.addEventListener('mousemove', move); window.addEventListener('mouseup', up)
        }}>
        <div style={{ width: 2, height: 20, borderRadius: 1, backgroundColor: '#94a3b8' }} />
      </div>
      <div style={{ flex: 1, backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: T.fgMuted }}>Panel Two</div>
    </div>
  )
}

function ScrollAreaCanvas() {
  const tags = Array.from({ length: 20 }, (_, i) => `Tag ${i + 1}`)
  return (
    <div style={{ width: '100%', height: '100%', fontFamily: T.fontSans }}>
      <h4 style={{ fontSize: 14, fontWeight: 500, marginBottom: 8, marginTop: 0 }}>Tags</h4>
      <div style={{ border: T.border, borderRadius: T.radius, height: 200, overflowY: 'auto', padding: '8px 12px', position: 'relative' }}>
        {tags.map(tag => (
          <div key={tag} style={{ padding: '8px 0', borderBottom: T.border, fontSize: 14 }}>{tag}</div>
        ))}
      </div>
    </div>
  )
}

function SelectCanvas() {
  const [val, setVal] = useState('')
  const [open, setOpen] = useState(false)
  const opts = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']
  return (
    <div style={{ fontFamily: T.fontSans, position: 'relative', width: '100%' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', border: T.border, borderRadius: T.radius6, backgroundColor: T.bg, cursor: 'pointer', fontSize: 14, fontFamily: T.fontSans, color: val ? T.fg : T.fgMuted }}>
        {val || 'Select a fruit…'}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, border: T.border, borderRadius: T.radius6, backgroundColor: T.bg, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', zIndex: 20, padding: '4px 0' }}>
          {opts.map(o => (
            <button key={o} onClick={() => { setVal(o); setOpen(false) }}
              style={{ width: '100%', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontFamily: T.fontSans, color: T.fg, backgroundColor: val === o ? T.muted : 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.muted)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = val === o ? T.muted : 'transparent')}>
              {val === o && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>}
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function SeparatorCanvas() {
  return (
    <div style={{ fontFamily: T.fontSans, width: '100%' }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 500 }}>Radix Primitives</span>
        <Separator vertical />
        <span style={{ fontSize: 14, fontWeight: 500 }}>Tailwind CSS</span>
        <Separator vertical />
        <span style={{ fontSize: 14, fontWeight: 500 }}>TypeScript</span>
      </div>
      <Separator />
      <div style={{ display: 'flex', gap: 24, paddingTop: 12, fontSize: 14, color: T.fgMuted }}>
        <span>Blog</span><span>Docs</span><span>Source</span>
      </div>
    </div>
  )
}

function SheetCanvas() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ fontFamily: T.fontSans, position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <Btn variant="outline" onClick={() => setOpen(true)}>Open Sheet</Btn>
      {open && (
        <>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }} onClick={() => setOpen(false)} />
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '65%', backgroundColor: T.bg, borderLeft: T.border, padding: 24, boxShadow: '-4px 0 24px rgba(0,0,0,0.08)', zIndex: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Edit profile</div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.fgMuted, fontSize: 18 }}>×</button>
            </div>
            <div style={{ fontSize: 13, color: T.fgMuted, marginBottom: 20 }}>Make changes here.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div><Label>Name</Label><div style={{ marginTop: 4 }}><Input placeholder="Your name" /></div></div>
              <div><Label>Username</Label><div style={{ marginTop: 4 }}><Input placeholder="@username" /></div></div>
            </div>
            <div style={{ marginTop: 20 }}><Btn onClick={() => setOpen(false)}>Save</Btn></div>
          </div>
        </>
      )}
    </div>
  )
}

function SkeletonCanvas() {
  return (
    <div style={{ width: '100%', fontFamily: T.fontSans, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#e2e8f0', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 14, borderRadius: T.radiusFull, backgroundColor: '#e2e8f0' }} />
          <div style={{ height: 12, borderRadius: T.radiusFull, backgroundColor: '#e2e8f0', width: '70%' }} />
        </div>
      </div>
      <div style={{ height: 14, borderRadius: T.radiusFull, backgroundColor: '#e2e8f0' }} />
      <div style={{ height: 14, borderRadius: T.radiusFull, backgroundColor: '#e2e8f0', width: '85%' }} />
      <div style={{ height: 14, borderRadius: T.radiusFull, backgroundColor: '#e2e8f0', width: '60%' }} />
    </div>
  )
}

function SliderCanvas() {
  const [vals, setVals] = useState([60, 30, 80])
  return (
    <div style={{ fontFamily: T.fontSans, width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {vals.map((v, i) => (
        <div key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
            <span style={{ color: T.fgMuted }}>{i === 0 ? 'Volume' : i === 1 ? 'Brightness' : 'Speed'}</span>
            <span style={{ fontWeight: 500 }}>{v}%</span>
          </div>
          <div style={{ position: 'relative', height: 6, borderRadius: T.radiusFull, backgroundColor: T.muted, cursor: 'pointer' }}
            onClick={e => { const rect = e.currentTarget.getBoundingClientRect(); const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100); setVals(a => { const n=[...a]; n[i]=pct; return n }) }}>
            <div style={{ width: `${v}%`, height: '100%', borderRadius: T.radiusFull, backgroundColor: T.primary }} />
            <div style={{ position: 'absolute', left: `${v}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', backgroundColor: T.bg, border: `2px solid ${T.primary}`, boxShadow: '0 1px 4px rgba(0,0,0,0.15)', cursor: 'pointer' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function SonnerCanvas() {
  const [toasts, setToasts] = useState<{ id: number; type: 'success' | 'error' | 'info'; msg: string }[]>([
    { id: 1, type: 'success', msg: 'Event has been created' },
    { id: 2, type: 'error', msg: 'Something went wrong' },
  ])
  const colors = { success: { bg: '#f0fdf4', border: '#bbf7d0', icon: '✓', ic: '#16a34a' }, error: { bg: '#fef2f2', border: '#fecaca', icon: '✕', ic: '#dc2626' }, info: { bg: '#eff6ff', border: '#bfdbfe', icon: 'ℹ', ic: '#2563eb' } }
  return (
    <div style={{ fontFamily: T.fontSans, width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {toasts.map(t => {
        const c = colors[t.type]
        return (
          <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: `1px solid ${c.border}`, borderRadius: T.radius, padding: '12px 14px', backgroundColor: c.bg }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ color: c.ic, fontWeight: 600 }}>{c.icon}</span>
              <span style={{ fontSize: 14 }}>{t.msg}</span>
            </div>
            <button onClick={() => setToasts(ts => ts.filter(x => x.id !== t.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.fgMuted, fontSize: 16 }}>×</button>
          </div>
        )
      })}
      {toasts.length === 0 && <div style={{ textAlign: 'center', fontSize: 14, color: T.fgMuted, padding: 16 }}>No notifications</div>}
      <Btn variant="outline" size="sm" onClick={() => setToasts(ts => [...ts, { id: Date.now(), type: 'success', msg: 'New event created!' }])}>Show toast</Btn>
    </div>
  )
}

function SwitchCanvas() {
  const [states, setStates] = useState({ airplane: false, wifi: true, bluetooth: true })
  const items = [{ key: 'airplane', label: 'Airplane Mode' }, { key: 'wifi', label: 'Wi-Fi' }, { key: 'bluetooth', label: 'Bluetooth' }] as const
  return (
    <div style={{ fontFamily: T.fontSans, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {items.map(({ key, label }) => {
        const on = states[key]
        return (
          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14 }}>{label}</span>
            <button onClick={() => setStates(s => ({ ...s, [key]: !s[key] }))} style={{ width: 44, height: 24, borderRadius: T.radiusFull, backgroundColor: on ? T.primary : '#e2e8f0', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 18, height: 18, borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.15)', transition: 'left 0.2s' }} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

function TableCanvas() {
  const invoices = [
    { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
    { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
    { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
    { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
  ]
  return (
    <div style={{ width: '100%', fontFamily: T.fontSans }}>
      <h3 style={{ fontSize: 14, fontWeight: 500, color: T.fgMuted, marginTop: 0, marginBottom: 12 }}>A list of your recent invoices.</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: T.border }}>
            {['Invoice', 'Status', 'Method', 'Amount'].map(h => <th key={h} style={{ padding: '10px 0', textAlign: 'left', fontWeight: 500, color: T.fgMuted }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id} style={{ borderBottom: T.border }}>
              <td style={{ padding: '12px 0', fontWeight: 500 }}>{inv.id}</td>
              <td style={{ padding: '12px 0' }}>{inv.status}</td>
              <td style={{ padding: '12px 0', color: T.fgMuted }}>{inv.method}</td>
              <td style={{ padding: '12px 0', fontWeight: 500, textAlign: 'right' }}>{inv.amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ padding: '12px 0', fontWeight: 500 }}>Total</td>
            <td style={{ padding: '12px 0', fontWeight: 700, textAlign: 'right' }}>$1,200.00</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

function TabsCanvas() {
  const [active, setActive] = useState('account')
  return (
    <div style={{ fontFamily: T.fontSans, width: '100%' }}>
      <div style={{ display: 'inline-flex', backgroundColor: T.muted, borderRadius: T.radius6, padding: 3, marginBottom: 12, gap: 2 }}>
        {[{ id: 'account', label: 'Account' }, { id: 'password', label: 'Password' }, { id: 'settings', label: 'Settings' }].map(tab => (
          <button key={tab.id} onClick={() => setActive(tab.id)}
            style={{ padding: '6px 14px', borderRadius: 5, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, fontFamily: T.fontSans, backgroundColor: active === tab.id ? T.bg : 'transparent', color: active === tab.id ? T.fg : T.fgMuted, boxShadow: active === tab.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.15s' }}>
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ border: T.border, borderRadius: T.radius, padding: 16 }}>
        {active === 'account' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>Account</div>
            <div style={{ fontSize: 13, color: T.fgMuted }}>Make changes to your account here.</div>
            <div><Label>Name</Label><div style={{ marginTop: 4 }}><Input placeholder="Pedro Duarte" /></div></div>
            <Btn size="sm">Save changes</Btn>
          </div>
        )}
        {active === 'password' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Password</div>
            <div><Label>Current password</Label><div style={{ marginTop: 4 }}><Input placeholder="••••••••" /></div></div>
            <div><Label>New password</Label><div style={{ marginTop: 4 }}><Input placeholder="••••••••" /></div></div>
            <Btn size="sm">Change password</Btn>
          </div>
        )}
        {active === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Settings</div>
            <div style={{ fontSize: 13, color: T.fgMuted }}>Manage your notification preferences.</div>
            <SwitchCanvas />
          </div>
        )}
      </div>
    </div>
  )
}

function TextareaCanvas() {
  return (
    <div style={{ fontFamily: T.fontSans, width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <Label>Your message</Label>
        <textarea placeholder="Type your message here." style={{ marginTop: 4, width: '100%', minHeight: 80, padding: '8px 12px', borderRadius: T.radius6, border: T.border, fontSize: 14, fontFamily: T.fontSans, resize: 'none', boxSizing: 'border-box', outline: 'none', lineHeight: 1.5 }} />
      </div>
      <div>
        <Label>Disabled</Label>
        <textarea disabled placeholder="This is disabled." style={{ marginTop: 4, width: '100%', minHeight: 60, padding: '8px 12px', borderRadius: T.radius6, border: T.border, fontSize: 14, fontFamily: T.fontSans, resize: 'none', boxSizing: 'border-box', backgroundColor: T.muted, color: T.fgMuted, cursor: 'not-allowed' }} />
      </div>
    </div>
  )
}

function ToastCanvas() {
  const [toasts, setToasts] = useState([
    { id: 1, title: 'Scheduled: Catch up', desc: 'Friday, February 10, 2023 at 5:57 PM', action: 'Undo' },
    { id: 2, title: 'Uh oh! Something went wrong.', desc: 'There was a problem with your request.', action: 'Try again' },
  ])
  return (
    <div style={{ fontFamily: T.fontSans, display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      {toasts.map(t => (
        <div key={t.id} style={{ border: T.border, borderRadius: T.radius, padding: '14px 16px', backgroundColor: T.bg, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{t.title}</div>
            <div style={{ fontSize: 13, color: T.fgMuted }}>{t.desc}</div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0, alignItems: 'center' }}>
            <Btn variant="outline" size="sm">{t.action}</Btn>
            <button onClick={() => setToasts(ts => ts.filter(x => x.id !== t.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.fgMuted, fontSize: 18, padding: 2 }}>×</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function ToggleCanvas() {
  const [active, setActive] = useState<Set<string>>(new Set(['bold']))
  const items = [
    { id: 'bold', label: 'B', title: 'Bold', style: { fontWeight: 700 } as React.CSSProperties },
    { id: 'italic', label: 'I', title: 'Italic', style: { fontStyle: 'italic' } as React.CSSProperties },
    { id: 'underline', label: 'U', title: 'Underline', style: { textDecoration: 'underline' } as React.CSSProperties },
    { id: 'strikethrough', label: 'S', title: 'Strikethrough', style: { textDecoration: 'line-through' } as React.CSSProperties },
  ]
  const toggle = (id: string) => setActive(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  return (
    <div style={{ fontFamily: T.fontSans, display: 'flex', flex: 'column', gap: 12, flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {items.map(item => (
          <button key={item.id} onClick={() => toggle(item.id)}
            style={{ width: 36, height: 36, borderRadius: T.radius6, border: T.border, backgroundColor: active.has(item.id) ? T.muted : T.bg, cursor: 'pointer', fontSize: 14, fontFamily: T.fontSans, color: T.fg, ...item.style }}
            title={item.title}>{item.label}</button>
        ))}
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.6, color: T.fg }}>
        The quick <span style={{ fontWeight: active.has('bold') ? 700 : 400, fontStyle: active.has('italic') ? 'italic' : 'normal', textDecoration: [active.has('underline') ? 'underline' : '', active.has('strikethrough') ? 'line-through' : ''].filter(Boolean).join(' ') || 'none' }}>brown fox</span> jumps over the lazy dog.
      </div>
    </div>
  )
}

function ToggleGroupCanvas() {
  const [align, setAlign] = useState('center')
  const [size, setSize] = useState('M')
  return (
    <div style={{ fontFamily: T.fontSans, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 13, color: T.fgMuted, marginBottom: 8 }}>Text alignment</div>
        <div style={{ display: 'inline-flex', border: T.border, borderRadius: T.radius6, overflow: 'hidden' }}>
          {['Left', 'Center', 'Right', 'Justify'].map(a => (
            <button key={a} onClick={() => setAlign(a)} style={{ padding: '6px 14px', border: 'none', borderRight: T.border, backgroundColor: align === a ? T.muted : T.bg, cursor: 'pointer', fontSize: 13, fontFamily: T.fontSans, color: T.fg }}>{a}</button>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 13, color: T.fgMuted, marginBottom: 8 }}>Size</div>
        <div style={{ display: 'inline-flex', border: T.border, borderRadius: T.radius6, overflow: 'hidden' }}>
          {['XS', 'S', 'M', 'L', 'XL'].map(s => (
            <button key={s} onClick={() => setSize(s)} style={{ padding: '6px 12px', border: 'none', borderRight: T.border, backgroundColor: size === s ? T.primary : T.bg, color: size === s ? T.primaryFg : T.fg, cursor: 'pointer', fontSize: 13, fontFamily: T.fontSans }}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TooltipCanvas() {
  const [hov, setHov] = useState<string | null>(null)
  const items = ['Add', 'Edit', 'Delete', 'Share']
  return (
    <div style={{ fontFamily: T.fontSans, display: 'flex', gap: 12, flexWrap: 'wrap', padding: 16 }}>
      {items.map(label => (
        <div key={label} style={{ position: 'relative', display: 'inline-block' }}
          onMouseEnter={() => setHov(label)} onMouseLeave={() => setHov(null)}>
          <Btn variant="outline" size="icon">
            {label[0]}
          </Btn>
          {hov === label && (
            <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 6, backgroundColor: T.primary, color: T.primaryFg, fontSize: 12, padding: '4px 8px', borderRadius: T.radius6, whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 20 }}>
              {label} item
              <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: `4px solid ${T.primary}` }} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Dispatch map ─── */

const RENDERERS: Record<string, () => React.ReactNode> = {
  shadcn_accordion:       () => <AccordionCanvas />,
  shadcn_alert:           () => <AlertCanvas />,
  shadcn_alert_dialog:    () => <AlertDialogCanvas />,
  shadcn_avatar:          () => <AvatarCanvas />,
  shadcn_badge:           () => <BadgeCanvas />,
  shadcn_breadcrumb:      () => <BreadcrumbCanvas />,
  shadcn_button:          () => <ButtonCanvas />,
  shadcn_calendar:        () => <CalendarCanvas />,
  shadcn_card:            () => <CardCanvas />,
  shadcn_checkbox:        () => <CheckboxCanvas />,
  shadcn_collapsible:     () => <CollapsibleCanvas />,
  shadcn_combobox:        () => <ComboboxCanvas />,
  shadcn_command:         () => <CommandCanvas />,
  shadcn_context_menu:    () => <ContextMenuCanvas />,
  shadcn_data_table:      () => <DataTableCanvas />,
  shadcn_date_picker:     () => <DatePickerCanvas />,
  shadcn_dialog:          () => <DialogCanvas />,
  shadcn_drawer:          () => <DrawerCanvas />,
  shadcn_dropdown_menu:   () => <DropdownMenuCanvas />,
  shadcn_form:            () => <FormCanvas />,
  shadcn_hover_card:      () => <HoverCardCanvas />,
  shadcn_input:           () => <InputCanvas />,
  shadcn_input_otp:       () => <InputOTPCanvas />,
  shadcn_label:           () => <LabelCanvas />,
  shadcn_menubar:         () => <MenubarCanvas />,
  shadcn_navigation_menu: () => <NavigationMenuCanvas />,
  shadcn_pagination:      () => <PaginationCanvas />,
  shadcn_popover:         () => <PopoverCanvas />,
  shadcn_progress:        () => <ProgressCanvas />,
  shadcn_radio_group:     () => <RadioGroupCanvas />,
  shadcn_resizable:       () => <ResizableCanvas />,
  shadcn_scroll_area:     () => <ScrollAreaCanvas />,
  shadcn_select:          () => <SelectCanvas />,
  shadcn_separator:       () => <SeparatorCanvas />,
  shadcn_sheet:           () => <SheetCanvas />,
  shadcn_skeleton:        () => <SkeletonCanvas />,
  shadcn_slider:          () => <SliderCanvas />,
  shadcn_sonner:          () => <SonnerCanvas />,
  shadcn_switch:          () => <SwitchCanvas />,
  shadcn_table:           () => <TableCanvas />,
  shadcn_tabs:            () => <TabsCanvas />,
  shadcn_textarea:        () => <TextareaCanvas />,
  shadcn_toast:           () => <ToastCanvas />,
  shadcn_toggle:          () => <ToggleCanvas />,
  shadcn_toggle_group:    () => <ToggleGroupCanvas />,
  shadcn_tooltip:         () => <TooltipCanvas />,
}

export function ShadcnCanvasRenderer({ element }: Props) {
  const render = RENDERERS[element.shadcnId]
  if (!render) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#6b7280', fontFamily: 'Inter, sans-serif', border: '1px dashed #d1d5db', borderRadius: 8 }}>
        {element.name}
      </div>
    )
  }
  return (
    <div style={{ width: '100%', height: '100%', padding: 16, boxSizing: 'border-box', overflow: 'auto', backgroundColor: '#ffffff', borderRadius: 8, border: '1px solid #e5e7eb' }}>
      {render()}
    </div>
  )
}
