import type { CanvasElement } from './element.types'

export interface BlockDefinition {
  id: string
  name: string
  category: string
  thumbnail?: string
  elements: Record<string, CanvasElement>
  rootIds: string[]
  createdAt: string
  updatedAt: string
  isBuiltIn: boolean
}
