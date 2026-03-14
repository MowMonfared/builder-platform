import { CirclePlus, Layers } from 'lucide-react'
import { useUiStore } from '../../store/uiStore'

type SidebarItem = {
  id: 'assets' | 'layers'
  label: string
  icon: React.ReactNode
}

const ITEMS: SidebarItem[] = [
  { id: 'assets', label: 'Assets', icon: <CirclePlus size={18} strokeWidth={1.5} /> },
  { id: 'layers', label: 'Layers', icon: <Layers size={18} strokeWidth={1.5} /> },
]

export function LeftSidebar() {
  const leftPanelTab = useUiStore((s) => s.leftPanelTab)
  const setLeftPanelTab = useUiStore((s) => s.setLeftPanelTab)

  const renderItem = (item: SidebarItem) => {
    const isActive = leftPanelTab === item.id
    return (
      <button
        key={item.id}
        onClick={() => setLeftPanelTab(item.id)}
        className="flex flex-col items-center justify-center gap-1 w-full py-2 px-1 rounded-lg transition-colors"
        style={{
          backgroundColor: isActive ? '#dbeafe' : 'transparent',
          color: isActive ? '#2563eb' : '#6b7280',
        }}
        title={item.label}
      >
        {item.icon}
        <span
          className="text-[9px] font-medium leading-none"
          style={{ color: isActive ? '#2563eb' : '#6b7280' }}
        >
          {item.label}
        </span>
      </button>
    )
  }

  return (
    <div className="flex flex-col items-center bg-white border-r border-[#e5e7eb] shrink-0 py-2 gap-1"
      style={{ width: 52 }}>
      <div className="flex flex-col items-center gap-1 w-full px-2">
        {ITEMS.map(renderItem)}
      </div>
    </div>
  )
}
