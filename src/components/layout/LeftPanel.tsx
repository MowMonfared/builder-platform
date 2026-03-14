import { useUiStore } from '../../store/uiStore'
import { AssetsPanel } from '../panels/assets/AssetsPanel'
import { LayersPanel } from '../panels/layers/LayersPanel'

export function LeftPanel() {
  const leftPanelTab = useUiStore((s) => s.leftPanelTab)
  const leftPanelWidth = useUiStore((s) => s.leftPanelWidth)

  const TITLES: Record<string, string> = { assets: 'Assets', layers: 'Layers' }

  return (
    <div
      className="flex flex-col bg-white border-r border-[#e5e7eb] shrink-0"
      style={{ width: leftPanelWidth }}
    >
      {/* Panel title */}
      <div className="px-3 py-2.5 border-b border-[#e5e7eb] shrink-0">
        <span className="text-xs font-semibold text-[#111827]">{TITLES[leftPanelTab] ?? ''}</span>
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-hidden">
        {leftPanelTab === 'assets' ? <AssetsPanel /> : <LayersPanel />}
      </div>
    </div>
  )
}
