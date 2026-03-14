export interface StyleProps {
  // Position & Size
  x: number
  y: number
  width: number | string
  height: number | string
  rotation: number

  // Spacing
  paddingTop: number
  paddingRight: number
  paddingBottom: number
  paddingLeft: number
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number

  // Appearance
  backgroundColor: string
  borderRadius: number
  borderWidth: number
  borderColor: string
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'none'
  opacity: number
  boxShadow: string

  // Typography
  fontFamily: string
  fontSize: number
  fontWeight: number
  lineHeight: number
  letterSpacing: number
  color: string
  textAlign: 'left' | 'center' | 'right' | 'justify'

  // Flex/Layout
  display: 'block' | 'flex' | 'grid' | 'inline-block'
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap: number
  overflow: 'visible' | 'hidden' | 'scroll' | 'auto'
}

export type ElementType =
  | 'text'
  | 'button'
  | 'image'
  | 'container'
  | 'component-instance'
  | 'block-instance'

export interface BaseElement {
  id: string
  type: ElementType
  name: string
  style: Partial<StyleProps>
  locked: boolean
  visible: boolean
  parentId: string | null
  children: string[]
}

export interface TextElement extends BaseElement {
  type: 'text'
  content: string
}

export interface ButtonElement extends BaseElement {
  type: 'button'
  label: string
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
}

export interface ImageElement extends BaseElement {
  type: 'image'
  src: string
  alt: string
  objectFit: 'cover' | 'contain' | 'fill' | 'none'
}

export interface ContainerElement extends BaseElement {
  type: 'container'
}

export interface ComponentInstanceElement extends BaseElement {
  type: 'component-instance'
  componentDefId: string
  propOverrides: Record<string, unknown>
}

export interface BlockInstanceElement extends BaseElement {
  type: 'block-instance'
  blockDefId: string
  isDetached: boolean
}

export type CanvasElement =
  | TextElement
  | ButtonElement
  | ImageElement
  | ContainerElement
  | ComponentInstanceElement
  | BlockInstanceElement
