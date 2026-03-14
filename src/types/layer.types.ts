import type { ElementType } from './element.types'

export interface LayerNode {
  id: string
  name: string
  type: ElementType
  visible: boolean
  locked: boolean
  children: LayerNode[]
  depth: number
}
