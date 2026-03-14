import { Layers, Package } from 'lucide-react'
import { useUiStore } from '../../store/uiStore'
import { AssetsPanel } from '../panels/assets/AssetsPanel'
import { LayersPanel } from '../panels/layers/LayersPanel'

export function LeftPanel() {
  const leftPanelTab = useUiStore((s) => s.leftPanelTab)
  const setLeftPanelTab = useUiStore((s) => s.setLeftPanelTab)
  const leftPanelWidth = useUiStore((s) => s.leftPanelWidth)

  return (
    <div
      className="flex flex-col bg-white border-r border-[#e5e7eb] shrink-0"
      style={{ width: leftPanelWidth }}
    >
      {/* Tab bar */}
      <div className="flex border-b border-[#e5e7eb] shrink-0">
        <button
          onClick={() => setLeftPanelTab('assets')}
          className={`flex items-center gap-1.5 flex-1 px-3 py-2.5 text-xs font-medium transition-colors ${
            leftPanelTab === 'assets'
              ? 'text-[#111827] border-b-2 border-[#0d99ff] -mb-px'
              : 'text-[#9ca3af] hover:text-[#374151]'
          }`}
        >
          <Package size={13} />
          Assets
        </button>
        <button
          onClick={() => setLeftPanelTab('layers')}
          className={`flex items-center gap-1.5 flex-1 px-3 py-2.5 text-xs font-medium transition-colors ${
            leftPanelTab === 'layers'
              ? 'text-[#111827] border-b-2 border-[#0d99ff] -mb-px'
              : 'text-[#9ca3af] hover:text-[#374151]'
          }`}
        >
          <Layers size={13} />
          Layers
        </button>
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-hidden">
        {leftPanelTab === 'assets' ? <AssetsPanel /> : <LayersPanel />}
      </div>
    </div>
  )
}
