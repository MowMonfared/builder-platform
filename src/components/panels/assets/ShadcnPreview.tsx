/** Mini visual previews for each shadcn/ui component — pure CSS, no deps */

const s = {
  // Shared tokens
  border: '1px solid #e5e7eb',
  radius4: '4px',
  radius6: '6px',
  radius8: '8px',
  radiusFull: '9999px',
  bg: '#f9fafb',
  bgWhite: '#ffffff',
  muted: '#e5e7eb',
  mutedFg: '#9ca3af',
  fg: '#374151',
  fgDark: '#111827',
  primary: '#18181b',
  primaryFg: '#fafafa',
  blue: '#3b82f6',
  ring: '#18181b',
}

/* ─── Reusable micro-elements ─── */
const Line = ({ w = '100%', h = 8, r = 4, bg = s.muted, style = {} }: { w?: string | number; h?: number; r?: number; bg?: string; style?: React.CSSProperties }) => (
  <div style={{ width: w, height: h, borderRadius: r, backgroundColor: bg, ...style }} />
)
const Box = ({ children, style = {} }: { children?: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ border: s.border, borderRadius: s.radius8, padding: '8px', backgroundColor: s.bgWhite, ...style }}>{children}</div>
)

/* ─── Individual previews ─── */

export const AccordionPreview = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, fontFamily: 'Inter, sans-serif' }}>
    {/* open item */}
    <div style={{ border: s.border, borderRadius: s.radius6, padding: '6px 8px', backgroundColor: s.bgWhite }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Line w={60} h={6} bg={s.fgDark} r={3} />
        <div style={{ width: 8, height: 8, borderRight: '1.5px solid #9ca3af', borderTop: '1.5px solid #9ca3af', transform: 'rotate(135deg)', marginRight: 2 }} />
      </div>
      <Line w="90%" h={5} r={3} />
    </div>
    {/* closed items */}
    {[0, 1].map(i => (
      <div key={i} style={{ border: s.border, borderRadius: s.radius6, padding: '6px 8px', backgroundColor: s.bgWhite, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Line w={50} h={6} bg={s.fg} r={3} />
        <div style={{ width: 8, height: 8, borderRight: '1.5px solid #9ca3af', borderTop: '1.5px solid #9ca3af', transform: 'rotate(45deg)', marginRight: 2 }} />
      </div>
    ))}
  </div>
)

export const AlertPreview = () => (
  <div style={{ border: s.border, borderRadius: s.radius8, padding: '8px 10px', backgroundColor: s.bgWhite, width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
      <div style={{ width: 12, height: 12, borderRadius: '50%', border: '1.5px solid #374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: '#374151', fontWeight: 700 }}>!</div>
      <Line w={60} h={6} bg={s.fgDark} r={3} />
    </div>
    <Line w="85%" h={5} r={3} />
  </div>
)

export const AlertDialogPreview = () => (
  <div style={{ border: s.border, borderRadius: s.radius8, padding: '10px', backgroundColor: s.bgWhite, width: '100%' }}>
    <Line w={70} h={7} bg={s.fgDark} r={3} style={{ marginBottom: 6 }} />
    <Line w="90%" h={5} r={3} style={{ marginBottom: 4 }} />
    <Line w="70%" h={5} r={3} style={{ marginBottom: 8 }} />
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
      <div style={{ padding: '3px 8px', borderRadius: s.radius6, border: s.border, fontSize: 7, color: s.fg, backgroundColor: s.bgWhite }}>Cancel</div>
      <div style={{ padding: '3px 8px', borderRadius: s.radius6, backgroundColor: s.primary, fontSize: 7, color: s.primaryFg }}>Continue</div>
    </div>
  </div>
)

export const AvatarPreview = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    {[40, 32, 24].map(size => (
      <div key={size} style={{ width: size, height: size, borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.3, fontWeight: 600, color: '#6b7280', fontFamily: 'Inter, sans-serif', border: s.border }}>CN</div>
    ))}
  </div>
)

export const BadgePreview = () => (
  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
    <span style={{ padding: '2px 8px', borderRadius: s.radiusFull, backgroundColor: s.primary, color: s.primaryFg, fontSize: 9, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Default</span>
    <span style={{ padding: '2px 8px', borderRadius: s.radiusFull, backgroundColor: '#f1f5f9', color: '#475569', fontSize: 9, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Secondary</span>
    <span style={{ padding: '2px 8px', borderRadius: s.radiusFull, border: s.border, color: s.fg, fontSize: 9, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Outline</span>
    <span style={{ padding: '2px 8px', borderRadius: s.radiusFull, backgroundColor: '#fee2e2', color: '#dc2626', fontSize: 9, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Destructive</span>
  </div>
)

export const BreadcrumbPreview = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Inter, sans-serif' }}>
    {['Home', 'Docs', 'Components'].map((label, i, arr) => (
      <>
        <span key={label} style={{ fontSize: 9, color: i === arr.length - 1 ? s.fgDark : s.mutedFg, fontWeight: i === arr.length - 1 ? 500 : 400 }}>{label}</span>
        {i < arr.length - 1 && <span key={`sep-${i}`} style={{ fontSize: 9, color: s.mutedFg }}>/</span>}
      </>
    ))}
  </div>
)

export const ButtonPreview = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-start', width: '100%' }}>
    <div style={{ display: 'flex', gap: 5 }}>
      <span style={{ padding: '4px 10px', borderRadius: s.radius6, backgroundColor: s.primary, color: s.primaryFg, fontSize: 9, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Default</span>
      <span style={{ padding: '4px 10px', borderRadius: s.radius6, backgroundColor: '#f1f5f9', color: '#0f172a', fontSize: 9, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Secondary</span>
    </div>
    <div style={{ display: 'flex', gap: 5 }}>
      <span style={{ padding: '4px 10px', borderRadius: s.radius6, border: s.border, color: s.fgDark, fontSize: 9, fontFamily: 'Inter, sans-serif', fontWeight: 500, backgroundColor: s.bgWhite }}>Outline</span>
      <span style={{ padding: '4px 10px', borderRadius: s.radius6, color: s.fgDark, fontSize: 9, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Ghost</span>
    </div>
  </div>
)

export const CalendarPreview = () => (
  <div style={{ border: s.border, borderRadius: s.radius8, padding: '6px', backgroundColor: s.bgWhite, width: '100%' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
      <Line w={50} h={6} bg={s.fgDark} r={3} />
      <div style={{ display: 'flex', gap: 3 }}>
        <Line w={14} h={14} r={3} bg={s.muted} />
        <Line w={14} h={14} r={3} bg={s.muted} />
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
      {Array.from({ length: 28 }).map((_, i) => (
        <div key={i} style={{ height: 10, borderRadius: 2, backgroundColor: i === 14 ? s.primary : i % 7 === 0 ? '#f3f4f6' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {i < 7 && <div style={{ width: 6, height: 4, borderRadius: 1, backgroundColor: s.mutedFg }} />}
        </div>
      ))}
    </div>
  </div>
)

export const CardPreview = () => (
  <div style={{ border: s.border, borderRadius: s.radius8, backgroundColor: s.bgWhite, overflow: 'hidden', width: '100%' }}>
    <div style={{ padding: '8px 10px', borderBottom: s.border }}>
      <Line w={80} h={7} bg={s.fgDark} r={3} style={{ marginBottom: 3 }} />
      <Line w={100} h={5} r={3} />
    </div>
    <div style={{ padding: '8px 10px' }}>
      <Line w="90%" h={5} r={3} style={{ marginBottom: 3 }} />
      <Line w="75%" h={5} r={3} />
    </div>
    <div style={{ padding: '6px 10px', borderTop: s.border, display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ padding: '3px 10px', borderRadius: s.radius6, backgroundColor: s.primary, fontSize: 8, color: s.primaryFg }}>Action</div>
    </div>
  </div>
)

export const CheckboxPreview = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {[{ checked: true, label: 'Accept terms' }, { checked: false, label: 'Notify me' }, { checked: true, label: 'Remember me' }].map(({ checked, label }) => (
      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 13, height: 13, borderRadius: 3, border: checked ? 'none' : s.border, backgroundColor: checked ? s.primary : s.bgWhite, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {checked && <div style={{ width: 7, height: 4, borderLeft: '1.5px solid white', borderBottom: '1.5px solid white', transform: 'rotate(-45deg) translate(1px, -1px)' }} />}
        </div>
        <span style={{ fontSize: 9, color: s.fg, fontFamily: 'Inter, sans-serif' }}>{label}</span>
      </div>
    ))}
  </div>
)

export const CollapsiblePreview = () => (
  <div style={{ border: s.border, borderRadius: s.radius8, backgroundColor: s.bgWhite, overflow: 'hidden', width: '100%' }}>
    <div style={{ padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Line w={80} h={6} bg={s.fgDark} r={3} />
      <Line w={20} h={20} r={4} bg={s.muted} />
    </div>
    <div style={{ padding: '6px 10px', borderTop: s.border, backgroundColor: '#f9fafb' }}>
      <Line w="100%" h={5} r={3} style={{ marginBottom: 3 }} />
      <Line w="80%" h={5} r={3} />
    </div>
  </div>
)

export const ComboboxPreview = () => (
  <div style={{ border: s.border, borderRadius: s.radius6, padding: '5px 10px', backgroundColor: s.bgWhite, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
    <span style={{ fontSize: 9, color: s.mutedFg, fontFamily: 'Inter, sans-serif' }}>Select framework...</span>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <div style={{ width: 6, height: 1.5, borderRadius: 1, backgroundColor: s.mutedFg }} />
      <div style={{ width: 6, height: 1.5, borderRadius: 1, backgroundColor: s.mutedFg }} />
    </div>
  </div>
)

export const CommandPreview = () => (
  <div style={{ border: s.border, borderRadius: s.radius8, backgroundColor: s.bgWhite, overflow: 'hidden', width: '100%' }}>
    <div style={{ padding: '6px 8px', borderBottom: s.border, display: 'flex', alignItems: 'center', gap: 5 }}>
      <div style={{ width: 9, height: 9, borderRadius: '50%', border: '1.5px solid #9ca3af' }} />
      <Line w={60} h={5} r={3} />
    </div>
    {['Calendar', 'Search Emoji', 'Calculator'].map(item => (
      <div key={item} style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 5 }}>
        <Line w={8} h={8} r={2} bg={s.muted} />
        <span style={{ fontSize: 8, color: s.fg, fontFamily: 'Inter, sans-serif' }}>{item}</span>
      </div>
    ))}
  </div>
)

export const ContextMenuPreview = () => (
  <div style={{ position: 'relative', width: '100%' }}>
    <div style={{ border: '1.5px dashed #d1d5db', borderRadius: s.radius6, padding: '8px', textAlign: 'center', fontSize: 8, color: s.mutedFg, fontFamily: 'Inter, sans-serif', marginBottom: 4 }}>Right click here</div>
    <div style={{ border: s.border, borderRadius: s.radius6, backgroundColor: s.bgWhite, padding: '3px 0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      {['Back', 'Forward', 'Reload', '—', 'Save As', 'Print'].map(item => (
        <div key={item} style={{ padding: '3px 10px', fontSize: 8, color: item === '—' ? s.mutedFg : s.fg, fontFamily: 'Inter, sans-serif', borderTop: item === '—' ? s.border : 'none' }}>{item === '—' ? '' : item}</div>
      ))}
    </div>
  </div>
)

export const DataTablePreview = () => (
  <div style={{ border: s.border, borderRadius: s.radius8, backgroundColor: s.bgWhite, overflow: 'hidden', width: '100%' }}>
    <div style={{ padding: '5px 8px', borderBottom: s.border, display: 'flex', gap: 6 }}>
      {['Status', 'Email', 'Amount'].map(h => (
        <div key={h} style={{ flex: 1, fontSize: 7, fontWeight: 600, color: s.fg, fontFamily: 'Inter, sans-serif' }}>{h}</div>
      ))}
    </div>
    {[['Paid', 'user@ex.com', '$250'], ['Pending', 'test@ex.com', '$150']].map((row, i) => (
      <div key={i} style={{ padding: '4px 8px', borderBottom: i === 0 ? s.border : 'none', display: 'flex', gap: 6 }}>
        {row.map((cell, j) => (
          <div key={j} style={{ flex: 1 }}><Line w="80%" h={5} r={3} /></div>
        ))}
      </div>
    ))}
  </div>
)

export const DatePickerPreview = () => (
  <div style={{ border: s.border, borderRadius: s.radius6, padding: '5px 10px', backgroundColor: s.bgWhite, display: 'flex', alignItems: 'center', gap: 6, width: '100%' }}>
    <div style={{ width: 11, height: 11, borderRadius: 2, border: s.border, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1.5, padding: 2 }}>
      {Array.from({ length: 9 }).map((_, i) => <div key={i} style={{ backgroundColor: s.muted, borderRadius: 1 }} />)}
    </div>
    <span style={{ fontSize: 9, color: s.mutedFg, fontFamily: 'Inter, sans-serif' }}>Pick a date</span>
  </div>
)

export const DialogPreview = () => (
  <div style={{ position: 'relative', width: '100%' }}>
    <div style={{ border: s.border, borderRadius: s.radius8, padding: '8px 10px', backgroundColor: s.bgWhite, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <Line w={70} h={7} bg={s.fgDark} r={3} />
        <div style={{ width: 10, height: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: s.mutedFg }}>×</div>
      </div>
      <Line w="100%" h={5} r={3} style={{ marginBottom: 2 }} />
      <Line w="80%" h={5} r={3} style={{ marginBottom: 8 }} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
        <div style={{ padding: '3px 8px', borderRadius: s.radius6, border: s.border, fontSize: 7, color: s.fg }}>Cancel</div>
        <div style={{ padding: '3px 8px', borderRadius: s.radius6, backgroundColor: s.primary, fontSize: 7, color: s.primaryFg }}>Save</div>
      </div>
    </div>
  </div>
)

export const DrawerPreview = () => (
  <div style={{ width: '100%', position: 'relative' }}>
    <div style={{ backgroundColor: '#f3f4f6', borderRadius: s.radius8, height: 40, marginBottom: 3 }} />
    <div style={{ border: s.border, borderRadius: `${s.radius8} ${s.radius8} 0 0`, padding: '8px 10px', backgroundColor: s.bgWhite }}>
      <div style={{ width: 24, height: 3, borderRadius: 2, backgroundColor: s.muted, margin: '0 auto 6px' }} />
      <Line w={80} h={7} bg={s.fgDark} r={3} style={{ marginBottom: 4 }} />
      <Line w="100%" h={5} r={3} />
    </div>
  </div>
)

export const DropdownMenuPreview = () => (
  <div style={{ width: '100%' }}>
    <div style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: s.radius6, border: s.border, backgroundColor: s.bgWhite, fontSize: 9, color: s.fgDark, fontFamily: 'Inter, sans-serif', gap: 5, alignItems: 'center', marginBottom: 4 }}>
      Open <div style={{ width: 0, height: 0, borderLeft: '3px solid transparent', borderRight: '3px solid transparent', borderTop: `4px solid ${s.fg}` }} />
    </div>
    <div style={{ border: s.border, borderRadius: s.radius6, backgroundColor: s.bgWhite, padding: '3px 0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      {['Profile', 'Billing', 'Settings', '—', 'Logout'].map(item => (
        <div key={item} style={{ padding: '3px 10px', fontSize: 8, color: item === '—' ? s.mutedFg : s.fg, fontFamily: 'Inter, sans-serif', borderTop: item === '—' ? s.border : 'none' }}>{item === '—' ? '' : item}</div>
      ))}
    </div>
  </div>
)

export const FormPreview = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
    {[{ label: 'Username', ph: 'shadcn' }, { label: 'Email', ph: 'you@example.com' }].map(({ label, ph }) => (
      <div key={label}>
        <div style={{ fontSize: 8, fontWeight: 500, color: s.fgDark, fontFamily: 'Inter, sans-serif', marginBottom: 2 }}>{label}</div>
        <div style={{ border: s.border, borderRadius: s.radius6, padding: '4px 8px', backgroundColor: s.bgWhite, fontSize: 8, color: s.mutedFg, fontFamily: 'Inter, sans-serif' }}>{ph}</div>
      </div>
    ))}
    <div style={{ padding: '4px 10px', borderRadius: s.radius6, backgroundColor: s.primary, fontSize: 8, color: s.primaryFg, fontFamily: 'Inter, sans-serif', display: 'inline-block', alignSelf: 'flex-start' }}>Submit</div>
  </div>
)

export const HoverCardPreview = () => (
  <div style={{ width: '100%' }}>
    <span style={{ fontSize: 9, color: s.blue, textDecoration: 'underline', fontFamily: 'Inter, sans-serif' }}>@nextjs</span>
    <div style={{ border: s.border, borderRadius: s.radius8, padding: '8px', backgroundColor: s.bgWhite, marginTop: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: s.muted, border: s.border }} />
        <div>
          <Line w={50} h={6} bg={s.fgDark} r={3} style={{ marginBottom: 2 }} />
          <Line w={40} h={5} r={3} />
        </div>
      </div>
      <Line w="90%" h={5} r={3} />
    </div>
  </div>
)

export const InputPreview = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 5 }}>
    <div style={{ border: s.border, borderRadius: s.radius6, padding: '5px 8px', backgroundColor: s.bgWhite, fontSize: 9, color: s.mutedFg, fontFamily: 'Inter, sans-serif' }}>Email</div>
    <div style={{ border: `1.5px solid ${s.ring}`, borderRadius: s.radius6, padding: '5px 8px', backgroundColor: s.bgWhite, fontSize: 9, color: s.fgDark, fontFamily: 'Inter, sans-serif' }}>shadcn@example.com</div>
    <div style={{ border: s.border, borderRadius: s.radius6, padding: '5px 8px', backgroundColor: '#f9fafb', fontSize: 9, color: s.mutedFg, fontFamily: 'Inter, sans-serif', opacity: 0.6 }}>Disabled</div>
  </div>
)

export const InputOTPPreview = () => (
  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
    {['1', '2', '3', '·', '4', '5', '6'].map((d, i) =>
      d === '·' ? <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: s.muted }} /> :
        <div key={i} style={{ width: 22, height: 28, border: i === 3 ? `1.5px solid ${s.ring}` : s.border, borderRadius: s.radius6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, color: s.fgDark, fontFamily: 'Inter, sans-serif', backgroundColor: s.bgWhite }}>{d}</div>
    )}
  </div>
)

export const LabelPreview = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
    {[{ label: 'Your email address', hasInput: true }, { label: 'Accept terms', isCheckbox: true }].map(({ label, hasInput, isCheckbox }) => (
      <div key={label} style={{ display: 'flex', flexDirection: isCheckbox ? 'row' : 'column', alignItems: isCheckbox ? 'center' : 'flex-start', gap: isCheckbox ? 5 : 2 }}>
        {isCheckbox && <div style={{ width: 11, height: 11, border: s.border, borderRadius: 2, backgroundColor: s.bgWhite }} />}
        <span style={{ fontSize: 9, fontWeight: 500, color: s.fgDark, fontFamily: 'Inter, sans-serif' }}>{label}</span>
        {hasInput && <div style={{ border: s.border, borderRadius: s.radius6, padding: '4px 8px', width: '100%', backgroundColor: s.bgWhite }} />}
      </div>
    ))}
  </div>
)

export const MenubarPreview = () => (
  <div style={{ border: s.border, borderRadius: s.radius6, padding: '3px 4px', backgroundColor: s.bgWhite, display: 'flex', gap: 1, width: '100%' }}>
    {['File', 'Edit', 'View', 'Help'].map((item, i) => (
      <div key={item} style={{ padding: '3px 7px', borderRadius: 4, backgroundColor: i === 0 ? '#f3f4f6' : 'transparent', fontSize: 9, color: s.fgDark, fontFamily: 'Inter, sans-serif' }}>{item}</div>
    ))}
  </div>
)

export const NavigationMenuPreview = () => (
  <div style={{ width: '100%' }}>
    <div style={{ display: 'flex', gap: 1, marginBottom: 4 }}>
      {['Getting Started', 'Components', 'Docs'].map((item, i) => (
        <div key={item} style={{ padding: '3px 7px', borderRadius: 4, backgroundColor: i === 1 ? '#f3f4f6' : 'transparent', fontSize: 8, color: s.fgDark, fontFamily: 'Inter, sans-serif' }}>{item}</div>
      ))}
    </div>
    <div style={{ border: s.border, borderRadius: s.radius8, padding: '6px', backgroundColor: s.bgWhite, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
      {['Introduction', 'Installation', 'Typography', 'Icons'].map(item => (
        <div key={item} style={{ padding: '3px 5px', borderRadius: 4 }}>
          <Line w={50} h={5} bg={s.fgDark} r={3} style={{ marginBottom: 2 }} />
          <Line w="80%" h={4} r={2} />
        </div>
      ))}
    </div>
  </div>
)

export const PaginationPreview = () => (
  <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
    <div style={{ padding: '3px 6px', borderRadius: s.radius6, border: s.border, fontSize: 8, color: s.fg, fontFamily: 'Inter, sans-serif', backgroundColor: s.bgWhite }}>«</div>
    {[1, 2, 3, '...', 10].map((p, i) => (
      <div key={i} style={{ padding: '3px 6px', borderRadius: s.radius6, border: p === 1 ? 'none' : s.border, fontSize: 8, color: p === 1 ? s.primaryFg : s.fg, fontFamily: 'Inter, sans-serif', backgroundColor: p === 1 ? s.primary : s.bgWhite, minWidth: 22, textAlign: 'center' }}>{p}</div>
    ))}
    <div style={{ padding: '3px 6px', borderRadius: s.radius6, border: s.border, fontSize: 8, color: s.fg, fontFamily: 'Inter, sans-serif', backgroundColor: s.bgWhite }}>»</div>
  </div>
)

export const PopoverPreview = () => (
  <div style={{ width: '100%' }}>
    <div style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: s.radius6, border: s.border, fontSize: 9, color: s.fgDark, fontFamily: 'Inter, sans-serif', backgroundColor: s.bgWhite, marginBottom: 4 }}>Open popover</div>
    <div style={{ border: s.border, borderRadius: s.radius8, padding: '8px', backgroundColor: s.bgWhite, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <Line w={60} h={6} bg={s.fgDark} r={3} style={{ marginBottom: 3 }} />
      <Line w="90%" h={5} r={3} style={{ marginBottom: 2 }} />
      <Line w="70%" h={5} r={3} />
    </div>
  </div>
)

export const ProgressPreview = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
    {[0.6, 0.35, 0.85].map((val, i) => (
      <div key={i} style={{ height: 7, borderRadius: s.radiusFull, backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
        <div style={{ width: `${val * 100}%`, height: '100%', borderRadius: s.radiusFull, backgroundColor: s.primary }} />
      </div>
    ))}
  </div>
)

export const RadioGroupPreview = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {[{ label: 'Default', checked: true }, { label: 'Comfortable', checked: false }, { label: 'Compact', checked: false }].map(({ label, checked }) => (
      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 13, height: 13, borderRadius: '50%', border: checked ? `3.5px solid ${s.primary}` : s.border, backgroundColor: s.bgWhite, boxSizing: 'border-box' }} />
        <span style={{ fontSize: 9, color: s.fg, fontFamily: 'Inter, sans-serif' }}>{label}</span>
      </div>
    ))}
  </div>
)

export const ResizablePreview = () => (
  <div style={{ display: 'flex', border: s.border, borderRadius: s.radius8, overflow: 'hidden', width: '100%', height: 50 }}>
    <div style={{ flex: 2, backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Line w={30} h={5} r={3} />
    </div>
    <div style={{ width: 5, backgroundColor: '#e5e7eb', cursor: 'col-resize', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 2, height: 16, borderRadius: 1, backgroundColor: '#d1d5db' }} />
    </div>
    <div style={{ flex: 1, backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Line w={20} h={5} r={3} />
    </div>
  </div>
)

export const ScrollAreaPreview = () => (
  <div style={{ border: s.border, borderRadius: s.radius8, backgroundColor: s.bgWhite, overflow: 'hidden', width: '100%', position: 'relative', height: 56 }}>
    <div style={{ padding: '6px 8px', paddingRight: 14 }}>
      {['Radix Primitives', 'Headless UI', 'React Aria', 'Ariakit'].map(item => (
        <div key={item} style={{ padding: '3px 0', borderBottom: s.border }}>
          <Line w={`${40 + Math.random() * 30}%`} h={5} r={3} />
        </div>
      ))}
    </div>
    <div style={{ position: 'absolute', right: 3, top: 3, bottom: 3, width: 4, borderRadius: 2, backgroundColor: '#e5e7eb' }}>
      <div style={{ height: '40%', borderRadius: 2, backgroundColor: '#9ca3af', marginTop: '20%' }} />
    </div>
  </div>
)

export const SelectPreview = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
    <div style={{ border: s.border, borderRadius: s.radius6, padding: '5px 10px', backgroundColor: s.bgWhite, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 9, color: s.mutedFg, fontFamily: 'Inter, sans-serif' }}>Select a fruit…</span>
      <div style={{ width: 0, height: 0, borderLeft: '3px solid transparent', borderRight: '3px solid transparent', borderTop: `4px solid ${s.mutedFg}` }} />
    </div>
    <div style={{ border: s.border, borderRadius: s.radius6, backgroundColor: s.bgWhite, padding: '3px 0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      {['Apple', 'Banana', 'Blueberry'].map((f, i) => (
        <div key={f} style={{ padding: '3px 10px', fontSize: 8, color: i === 0 ? s.primaryFg : s.fg, backgroundColor: i === 0 ? s.primary : 'transparent', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: 4 }}>
          {i === 0 && <div style={{ width: 7, height: 4, borderLeft: '1.5px solid white', borderBottom: '1.5px solid white', transform: 'rotate(-45deg) translate(1px, -1px)' }} />}
          {f}
        </div>
      ))}
    </div>
  </div>
)

export const SeparatorPreview = () => (
  <div style={{ width: '100%' }}>
    <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
      <Line w={40} h={6} bg={s.fgDark} r={3} />
      <div style={{ width: 1, height: 16, backgroundColor: s.muted }} />
      <Line w={40} h={6} bg={s.fgDark} r={3} />
      <div style={{ width: 1, height: 16, backgroundColor: s.muted }} />
      <Line w={40} h={6} bg={s.fgDark} r={3} />
    </div>
    <div style={{ height: 1, backgroundColor: s.muted, width: '100%' }} />
    <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
      <Line w={60} h={5} r={3} />
      <Line w={40} h={5} r={3} />
    </div>
  </div>
)

export const SheetPreview = () => (
  <div style={{ display: 'flex', width: '100%', height: 56, border: s.border, borderRadius: s.radius8, overflow: 'hidden' }}>
    <div style={{ flex: 1, backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Line w={40} h={5} r={3} />
    </div>
    <div style={{ width: '45%', backgroundColor: s.bgWhite, borderLeft: s.border, padding: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <Line w={40} h={6} bg={s.fgDark} r={3} />
        <span style={{ fontSize: 10, color: s.mutedFg }}>×</span>
      </div>
      <Line w="90%" h={4} r={2} style={{ marginBottom: 2 }} />
      <Line w="70%" h={4} r={2} />
    </div>
  </div>
)

export const SkeletonPreview = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#e5e7eb' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ height: 7, borderRadius: s.radiusFull, backgroundColor: '#e5e7eb' }} />
        <div style={{ height: 5, borderRadius: s.radiusFull, backgroundColor: '#e5e7eb', width: '70%' }} />
      </div>
    </div>
    <div style={{ height: 7, borderRadius: s.radiusFull, backgroundColor: '#e5e7eb' }} />
    <div style={{ height: 7, borderRadius: s.radiusFull, backgroundColor: '#e5e7eb', width: '80%' }} />
    <div style={{ height: 7, borderRadius: s.radiusFull, backgroundColor: '#e5e7eb', width: '60%' }} />
  </div>
)

export const SliderPreview = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
    {[0.65, 0.3].map((val, i) => (
      <div key={i} style={{ position: 'relative', height: 6, borderRadius: s.radiusFull, backgroundColor: '#e5e7eb' }}>
        <div style={{ position: 'absolute', left: 0, width: `${val * 100}%`, height: '100%', borderRadius: s.radiusFull, backgroundColor: s.primary }} />
        <div style={{ position: 'absolute', left: `${val * 100}%`, top: '50%', transform: 'translate(-50%, -50%)', width: 14, height: 14, borderRadius: '50%', backgroundColor: s.bgWhite, border: `2px solid ${s.primary}`, boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }} />
      </div>
    ))}
  </div>
)

export const SonnerPreview = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
    {[
      { icon: '✓', bg: '#f0fdf4', border: '#bbf7d0', msg: 'Event created' },
      { icon: '⚠', bg: '#fffbeb', border: '#fde68a', msg: 'Warning: check input' },
    ].map(({ icon, bg, border, msg }) => (
      <div key={msg} style={{ border: `1px solid ${border}`, borderRadius: s.radius8, padding: '5px 8px', backgroundColor: bg, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 9 }}>{icon}</span>
        <span style={{ fontSize: 8, color: s.fgDark, fontFamily: 'Inter, sans-serif' }}>{msg}</span>
      </div>
    ))}
  </div>
)

export const SwitchPreview = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {[true, false, true].map((on, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ width: 28, height: 16, borderRadius: s.radiusFull, backgroundColor: on ? s.primary : '#e5e7eb', position: 'relative', transition: 'background 0.2s' }}>
          <div style={{ position: 'absolute', top: 2, left: on ? 14 : 2, width: 12, height: 12, borderRadius: '50%', backgroundColor: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.15)', transition: 'left 0.2s' }} />
        </div>
        <span style={{ fontSize: 9, color: s.fg, fontFamily: 'Inter, sans-serif' }}>Airplane mode</span>
      </div>
    ))}
  </div>
)

export const TablePreview = () => (
  <div style={{ width: '100%', border: s.border, borderRadius: s.radius8, overflow: 'hidden', backgroundColor: s.bgWhite }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', backgroundColor: '#f9fafb', borderBottom: s.border }}>
      {['Invoice', 'Status', 'Amount'].map(h => (
        <div key={h} style={{ padding: '4px 6px', fontSize: 7, fontWeight: 600, color: s.fg, fontFamily: 'Inter, sans-serif' }}>{h}</div>
      ))}
    </div>
    {[['INV-001', 'Paid', '$250'], ['INV-002', 'Pending', '$150'], ['INV-003', 'Unpaid', '$350']].map((row, i) => (
      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', borderBottom: i < 2 ? s.border : 'none' }}>
        {row.map((cell, j) => (
          <div key={j} style={{ padding: '4px 6px', fontSize: 7, color: s.fg, fontFamily: 'Inter, sans-serif' }}>{cell}</div>
        ))}
      </div>
    ))}
  </div>
)

export const TabsPreview = () => (
  <div style={{ width: '100%' }}>
    <div style={{ display: 'flex', gap: 0, backgroundColor: '#f1f5f9', borderRadius: s.radius6, padding: 2, marginBottom: 6 }}>
      {['Account', 'Password', 'Settings'].map((tab, i) => (
        <div key={tab} style={{ flex: 1, padding: '3px 6px', borderRadius: 4, backgroundColor: i === 0 ? s.bgWhite : 'transparent', fontSize: 8, color: i === 0 ? s.fgDark : s.mutedFg, fontFamily: 'Inter, sans-serif', textAlign: 'center', boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,0.06)' : 'none' }}>{tab}</div>
      ))}
    </div>
    <div style={{ border: s.border, borderRadius: s.radius8, padding: '8px 10px', backgroundColor: s.bgWhite }}>
      <Line w={70} h={7} bg={s.fgDark} r={3} style={{ marginBottom: 4 }} />
      <Line w="90%" h={5} r={3} style={{ marginBottom: 2 }} />
      <Line w="75%" h={5} r={3} />
    </div>
  </div>
)

export const TextareaPreview = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
    <div style={{ border: s.border, borderRadius: s.radius6, padding: '5px 8px', backgroundColor: s.bgWhite, height: 36 }}>
      <Line w="60%" h={5} r={3} style={{ marginBottom: 3 }} />
      <Line w="40%" h={5} r={3} />
    </div>
    <div style={{ border: `1.5px solid ${s.ring}`, borderRadius: s.radius6, padding: '5px 8px', backgroundColor: s.bgWhite, height: 36 }}>
      <Line w="80%" h={5} r={3} style={{ marginBottom: 3 }} />
      <Line w="55%" h={5} r={3} />
    </div>
  </div>
)

export const ToastPreview = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
    <div style={{ border: s.border, borderRadius: s.radius8, padding: '7px 10px', backgroundColor: s.bgWhite, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', width: '90%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <Line w={80} h={6} bg={s.fgDark} r={3} style={{ marginBottom: 3 }} />
        <Line w={100} h={5} r={3} />
      </div>
      <span style={{ fontSize: 9, color: s.mutedFg, marginLeft: 6 }}>×</span>
    </div>
    <div style={{ border: s.border, borderRadius: s.radius8, padding: '7px 10px', backgroundColor: s.bgWhite, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', width: '85%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Line w={70} h={6} bg={s.fgDark} r={3} />
      <div style={{ padding: '2px 6px', borderRadius: 4, border: s.border, fontSize: 7, color: s.fg, fontFamily: 'Inter, sans-serif' }}>Undo</div>
    </div>
  </div>
)

export const TogglePreview = () => (
  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
    {[
      { label: 'B', active: true, bold: true },
      { label: 'I', active: false, italic: true },
      { label: 'U', active: false },
    ].map(({ label, active, bold, italic }) => (
      <div key={label} style={{ width: 28, height: 28, borderRadius: s.radius6, border: s.border, backgroundColor: active ? '#f3f4f6' : s.bgWhite, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: bold ? 700 : 400, fontStyle: italic ? 'italic' : 'normal', color: s.fgDark, fontFamily: 'Inter, sans-serif', textDecoration: label === 'U' ? 'underline' : 'none' }}>{label}</div>
    ))}
  </div>
)

export const ToggleGroupPreview = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div style={{ display: 'flex', border: s.border, borderRadius: s.radius6, overflow: 'hidden', width: 'fit-content' }}>
      {['Left', 'Center', 'Right'].map((item, i) => (
        <div key={item} style={{ padding: '4px 10px', fontSize: 8, color: i === 0 ? s.fgDark : s.mutedFg, backgroundColor: i === 0 ? '#f3f4f6' : s.bgWhite, fontFamily: 'Inter, sans-serif', borderRight: i < 2 ? s.border : 'none' }}>{item}</div>
      ))}
    </div>
    <div style={{ display: 'flex', border: s.border, borderRadius: s.radius6, overflow: 'hidden', width: 'fit-content' }}>
      {['S', 'M', 'L', 'XL'].map((item, i) => (
        <div key={item} style={{ padding: '4px 8px', fontSize: 8, color: i === 1 ? s.primaryFg : s.fg, backgroundColor: i === 1 ? s.primary : s.bgWhite, fontFamily: 'Inter, sans-serif', borderRight: i < 3 ? s.border : 'none' }}>{item}</div>
      ))}
    </div>
  </div>
)

export const TooltipPreview = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
    <div style={{ backgroundColor: s.primary, color: s.primaryFg, padding: '3px 8px', borderRadius: s.radius6, fontSize: 8, fontFamily: 'Inter, sans-serif' }}>Add to library</div>
    <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `5px solid ${s.primary}` }} />
    <div style={{ padding: '4px 10px', borderRadius: s.radius6, border: s.border, fontSize: 9, color: s.fg, fontFamily: 'Inter, sans-serif', backgroundColor: s.bgWhite }}>Hover me</div>
  </div>
)

/** Map component id → preview JSX */
export const COMPONENT_PREVIEWS: Record<string, React.ReactNode> = {
  'shadcn_accordion': <AccordionPreview />,
  'shadcn_alert': <AlertPreview />,
  'shadcn_alert_dialog': <AlertDialogPreview />,
  'shadcn_avatar': <AvatarPreview />,
  'shadcn_badge': <BadgePreview />,
  'shadcn_breadcrumb': <BreadcrumbPreview />,
  'shadcn_button': <ButtonPreview />,
  'shadcn_calendar': <CalendarPreview />,
  'shadcn_card': <CardPreview />,
  'shadcn_checkbox': <CheckboxPreview />,
  'shadcn_collapsible': <CollapsiblePreview />,
  'shadcn_combobox': <ComboboxPreview />,
  'shadcn_command': <CommandPreview />,
  'shadcn_context_menu': <ContextMenuPreview />,
  'shadcn_data_table': <DataTablePreview />,
  'shadcn_date_picker': <DatePickerPreview />,
  'shadcn_dialog': <DialogPreview />,
  'shadcn_drawer': <DrawerPreview />,
  'shadcn_dropdown_menu': <DropdownMenuPreview />,
  'shadcn_form': <FormPreview />,
  'shadcn_hover_card': <HoverCardPreview />,
  'shadcn_input': <InputPreview />,
  'shadcn_input_otp': <InputOTPPreview />,
  'shadcn_label': <LabelPreview />,
  'shadcn_menubar': <MenubarPreview />,
  'shadcn_navigation_menu': <NavigationMenuPreview />,
  'shadcn_pagination': <PaginationPreview />,
  'shadcn_popover': <PopoverPreview />,
  'shadcn_progress': <ProgressPreview />,
  'shadcn_radio_group': <RadioGroupPreview />,
  'shadcn_resizable': <ResizablePreview />,
  'shadcn_scroll_area': <ScrollAreaPreview />,
  'shadcn_select': <SelectPreview />,
  'shadcn_separator': <SeparatorPreview />,
  'shadcn_sheet': <SheetPreview />,
  'shadcn_skeleton': <SkeletonPreview />,
  'shadcn_slider': <SliderPreview />,
  'shadcn_sonner': <SonnerPreview />,
  'shadcn_switch': <SwitchPreview />,
  'shadcn_table': <TablePreview />,
  'shadcn_tabs': <TabsPreview />,
  'shadcn_textarea': <TextareaPreview />,
  'shadcn_toast': <ToastPreview />,
  'shadcn_toggle': <TogglePreview />,
  'shadcn_toggle_group': <ToggleGroupPreview />,
  'shadcn_tooltip': <TooltipPreview />,
}
