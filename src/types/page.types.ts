import type { CanvasElement } from './element.types'

export interface PageDefinition {
  id: string
  name: string
  slug: string
  elements: Record<string, CanvasElement>
  rootIds: string[]
  canvasWidth: number
  canvasHeight: number
  background: string
  createdAt: string
  updatedAt: string
}
