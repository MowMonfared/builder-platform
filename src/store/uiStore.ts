import { create } from 'zustand'

type LeftPanelTab = 'assets' | 'layers'
type AssetsPanelTab = 'components' | 'blocks'
type RightPanelTab = 'design' | 'component-props'

interface UiState {
  leftPanelTab: LeftPanelTab
  assetsPanelTab: AssetsPanelTab
  rightPanelTab: RightPanelTab
  gridEnabled: boolean
  snapEnabled: boolean
  rulerEnabled: boolean
  previewMode: boolean
  leftPanelWidth: number
  rightPanelWidth: number

  setLeftPanelTab: (tab: LeftPanelTab) => void
  setAssetsPanelTab: (tab: AssetsPanelTab) => void
  setRightPanelTab: (tab: RightPanelTab) => void
  toggleGrid: () => void
  toggleSnap: () => void
  toggleRuler: () => void
  togglePreview: () => void
  setLeftPanelWidth: (w: number) => void
  setRightPanelWidth: (w: number) => void
}

export const useUiStore = create<UiState>()((set) => ({
  leftPanelTab: 'layers',
  assetsPanelTab: 'components',
  rightPanelTab: 'design',
  gridEnabled: false,
  snapEnabled: true,
  rulerEnabled: false,
  previewMode: false,
  leftPanelWidth: 240,
  rightPanelWidth: 280,

  setLeftPanelTab: (tab) => set({ leftPanelTab: tab }),
  setAssetsPanelTab: (tab) => set({ assetsPanelTab: tab }),
  setRightPanelTab: (tab) => set({ rightPanelTab: tab }),
  toggleGrid: () => set((s) => ({ gridEnabled: !s.gridEnabled })),
  toggleSnap: () => set((s) => ({ snapEnabled: !s.snapEnabled })),
  toggleRuler: () => set((s) => ({ rulerEnabled: !s.rulerEnabled })),
  togglePreview: () => set((s) => ({ previewMode: !s.previewMode })),
  setLeftPanelWidth: (w) => set({ leftPanelWidth: w }),
  setRightPanelWidth: (w) => set({ rightPanelWidth: w }),
}))
