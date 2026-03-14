export type DragItem =
  | { type: 'ASSET_COMPONENT'; componentDefId: string }
  | { type: 'ASSET_BLOCK'; blockDefId: string }
  | { type: 'CANVAS_ELEMENT'; elementId: string }
  | { type: 'LAYER_REORDER'; elementId: string; sourceParentId: string | null }
