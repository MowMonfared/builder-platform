import { Type, Square, Image, Box, Component, LayoutTemplate, Minus } from 'lucide-react'

/** Icons for element types — shared between LayerRow and asset cards */
export const TYPE_ICONS_SM: Record<string, React.ReactNode> = {
  text: <Type size={11} />,
  button: <Square size={11} />,
  image: <Image size={11} />,
  container: <Box size={11} />,
  'component-instance': <Component size={11} />,
  'block-instance': <LayoutTemplate size={11} />,
  divider: <Minus size={11} />,
}

export const TYPE_ICONS_MD: Record<string, React.ReactNode> = {
  text: <Type size={14} />,
  button: <Square size={14} />,
  image: <Image size={14} />,
  container: <Box size={14} />,
  'component-instance': <Component size={14} />,
  'block-instance': <LayoutTemplate size={14} />,
  divider: <Minus size={14} />,
}
