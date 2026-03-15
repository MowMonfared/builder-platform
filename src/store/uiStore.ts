import { create } from 'zustand'

type LeftPanelTab = 'assets' | 'layers'
type AssetsPanelTab = 'components' | 'blocks'
type RightPanelTab = 'design' | 'component-props'
type CurrentView = 'home' | 'canvas'
export type ActiveTool = 'select' | 'frame' | 'rectangle' | 'text' | 'image' | 'component'

interface UiState {
  currentView: CurrentView
  activeTool: ActiveTool
  leftPanelTab: LeftPanelTab
  assetsPanelTab: AssetsPanelTab
  rightPanelTab: RightPanelTab
  gridEnabled: boolean
  snapEnabled: boolean
  rulerEnabled: boolean
  previewMode: boolean
  leftPanelWidth: number
  rightPanelWidth: number

  setCurrentView: (view: CurrentView) => void
  setActiveTool: (tool: ActiveTool) => void
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
  currentView: 'home',
  activeTool: 'select',
  leftPanelTab: 'layers',
  assetsPanelTab: 'components',
  rightPanelTab: 'design',
  gridEnabled: false,
  snapEnabled: true,
  rulerEnabled: false,
  previewMode: false,
  leftPanelWidth: 240,
  rightPanelWidth: 280,

  setCurrentView: (view) => set({ currentView: view }),
  setActiveTool: (tool) => set({ activeTool: tool }),
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
