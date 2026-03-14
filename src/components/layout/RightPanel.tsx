import { useUiStore } from '../../store/uiStore'
import { DesignPanel } from '../panels/design/DesignPanel'
import { Sliders } from 'lucide-react'

export function RightPanel() {
  const rightPanelWidth = useUiStore((s) => s.rightPanelWidth)

  return (
    <div
      className="flex flex-col bg-white border-l border-[#e5e7eb] shrink-0"
      style={{ width: rightPanelWidth }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#e5e7eb] shrink-0">
        <Sliders size={13} className="text-[#9ca3af]" />
        <span className="text-[#6b7280] text-xs font-medium">Design</span>
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-hidden">
        <DesignPanel />
      </div>
    </div>
  )
}
