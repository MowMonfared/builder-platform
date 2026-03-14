import type { CanvasElement } from './element.types'

export interface ComponentPropSchema {
  key: string
  label: string
  type: 'string' | 'number' | 'boolean' | 'color' | 'enum'
  defaultValue: unknown
  options?: string[]
}

export interface ComponentDefinition {
  id: string
  name: string
  category: string
  thumbnail?: string
  rootElement: CanvasElement
  propSchema: ComponentPropSchema[]
  createdAt: string
  updatedAt: string
  isBuiltIn: boolean
}
