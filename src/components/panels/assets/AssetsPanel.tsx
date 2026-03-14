import { useState } from 'react'
import { Search, LayoutTemplate } from 'lucide-react'
import { useLibraryStore } from '../../../store'
import { useUiStore } from '../../../store'
import { AssetCard } from './AssetCard'
import { COMPONENT_PREVIEWS } from './ShadcnPreview'
import { TYPE_ICONS_MD } from '../../../lib/typeIcons'

export function AssetsPanel() {
  const assetsPanelTab = useUiStore((s) => s.assetsPanelTab)
  const setAssetsPanelTab = useUiStore((s) => s.setAssetsPanelTab)
  const components = useLibraryStore((s) => s.components)
  const blocks = useLibraryStore((s) => s.blocks)
  const [search, setSearch] = useState('')

  const filteredComponents = components.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )
  const filteredBlocks = blocks.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  const componentGroups = filteredComponents.reduce<Record<string, typeof filteredComponents>>(
    (acc, c) => {
      if (!acc[c.category]) acc[c.category] = []
      acc[c.category].push(c)
      return acc
    },
    {}
  )
  const blockGroups = filteredBlocks.reduce<Record<string, typeof filteredBlocks>>(
    (acc, b) => {
      if (!acc[b.category]) acc[b.category] = []
      acc[b.category].push(b)
      return acc
    },
    {}
  )

  return (
    <div className="flex flex-col h-full">
      {/* Tab switcher */}
      <div className="flex border-b border-[#e5e7eb] shrink-0">
        {(['components', 'blocks'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setAssetsPanelTab(tab)}
            className={`flex-1 py-2 text-xs font-medium capitalize transition-colors ${
              assetsPanelTab === tab
                ? 'text-[#111827] border-b-2 border-[#0d99ff] -mb-px'
                : 'text-[#6b7280] hover:text-[#374151]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="p-2 shrink-0">
        <div className="flex items-center gap-2 bg-[#f3f4f6] rounded px-2 py-1.5">
          <Search size={12} className="text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-[#374151] text-xs w-full outline-none placeholder-[#9ca3af]"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {assetsPanelTab === 'components' && (
          <div>
            {Object.entries(componentGroups).map(([category, items]) => (
              <div key={category} className="mb-4">
                <div className="text-[#9ca3af] text-[10px] font-semibold uppercase tracking-wider px-1 py-1.5">
                  {category}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {items.map((comp) => (
                    <AssetCard
                      key={comp.id}
                      id={`asset-component-${comp.id}`}
                      dndData={{ type: 'ASSET_COMPONENT', componentDefId: comp.id }}
                      preview={
                        COMPONENT_PREVIEWS[comp.id] ??
                        <div className="flex items-center justify-center text-[#9ca3af]">
                          {TYPE_ICONS_MD[comp.rootElement.type] ?? <LayoutTemplate size={14} />}
                        </div>
                      }
                      name={comp.name}
                    />
                  ))}
                </div>
              </div>
            ))}
            {filteredComponents.length === 0 && (
              <div className="text-[#9ca3af] text-xs text-center py-8">No components found</div>
            )}
          </div>
        )}

        {assetsPanelTab === 'blocks' && (
          <div>
            {Object.entries(blockGroups).map(([category, items]) => (
              <div key={category} className="mb-4">
                <div className="text-[#9ca3af] text-[10px] font-semibold uppercase tracking-wider px-1 py-1.5">
                  {category}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {items.map((block) => (
                    <AssetCard
                      key={block.id}
                      id={`asset-block-${block.id}`}
                      dndData={{ type: 'ASSET_BLOCK', blockDefId: block.id }}
                      preview={<LayoutTemplate size={20} className="text-[#9ca3af]" />}
                      name={block.name}
                    />
                  ))}
                </div>
              </div>
            ))}
            {filteredBlocks.length === 0 && (
              <div className="text-[#9ca3af] text-xs text-center py-8">No blocks found</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
