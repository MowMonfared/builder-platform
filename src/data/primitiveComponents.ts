import type { ComponentDefinition } from '../types'

const ts = '2024-01-01T00:00:00.000Z'

/** Helper to create a shadcn component definition that drops a container onto the canvas */
function shadcn(id: string, name: string, category: string, w: number, h: number): ComponentDefinition {
  return {
    id,
    name,
    category,
    isBuiltIn: true,
    propSchema: [],
    rootElement: {
      id: `${id}_root`,
      type: 'container',
      name,
      locked: false,
      visible: true,
      parentId: null,
      children: [],
      style: {
        x: 0, y: 0,
        width: w, height: h,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 8,
        paddingTop: 16, paddingRight: 16, paddingBottom: 16, paddingLeft: 16,
        opacity: 1, rotation: 0,
      },
    },
    createdAt: ts,
    updatedAt: ts,
  }
}

export const PRIMITIVE_COMPONENTS: ComponentDefinition[] = [
  // ── Layout ──────────────────────────────────────────────
  shadcn('shadcn_card',        'Card',         'Layout',  320, 180),
  shadcn('shadcn_separator',   'Separator',    'Layout',  300, 24),
  shadcn('shadcn_scroll_area', 'Scroll Area',  'Layout',  280, 200),
  shadcn('shadcn_resizable',   'Resizable',    'Layout',  320, 140),
  shadcn('shadcn_collapsible', 'Collapsible',  'Layout',  280, 100),

  // ── Forms ────────────────────────────────────────────────
  shadcn('shadcn_button',      'Button',       'Forms',   120,  40),
  shadcn('shadcn_input',       'Input',        'Forms',   240,  40),
  shadcn('shadcn_textarea',    'Textarea',     'Forms',   240, 100),
  shadcn('shadcn_checkbox',    'Checkbox',     'Forms',   160,  28),
  shadcn('shadcn_radio_group', 'Radio Group',  'Forms',   180,  80),
  shadcn('shadcn_select',      'Select',       'Forms',   200,  40),
  shadcn('shadcn_slider',      'Slider',       'Forms',   240,  32),
  shadcn('shadcn_switch',      'Switch',       'Forms',   100,  28),
  shadcn('shadcn_toggle',      'Toggle',       'Forms',   100,  36),
  shadcn('shadcn_toggle_group','Toggle Group', 'Forms',   200,  36),
  shadcn('shadcn_label',       'Label',        'Forms',   160,  28),
  shadcn('shadcn_input_otp',   'Input OTP',    'Forms',   220,  44),
  shadcn('shadcn_combobox',    'Combobox',     'Forms',   220,  40),
  shadcn('shadcn_form',        'Form',         'Forms',   320, 160),
  shadcn('shadcn_date_picker', 'Date Picker',  'Forms',   220,  40),

  // ── Navigation ───────────────────────────────────────────
  shadcn('shadcn_accordion',        'Accordion',         'Navigation', 320, 160),
  shadcn('shadcn_breadcrumb',       'Breadcrumb',        'Navigation', 280,  28),
  shadcn('shadcn_tabs',             'Tabs',              'Navigation', 320, 120),
  shadcn('shadcn_menubar',          'Menubar',           'Navigation', 320,  36),
  shadcn('shadcn_navigation_menu',  'Navigation Menu',   'Navigation', 320, 120),
  shadcn('shadcn_pagination',       'Pagination',        'Navigation', 280,  36),

  // ── Overlay ──────────────────────────────────────────────
  shadcn('shadcn_dialog',        'Dialog',         'Overlay', 320, 160),
  shadcn('shadcn_alert_dialog',  'Alert Dialog',   'Overlay', 320, 140),
  shadcn('shadcn_sheet',         'Sheet',          'Overlay', 320, 200),
  shadcn('shadcn_drawer',        'Drawer',         'Overlay', 320, 160),
  shadcn('shadcn_popover',       'Popover',        'Overlay', 240, 120),
  shadcn('shadcn_hover_card',    'Hover Card',     'Overlay', 240, 120),
  shadcn('shadcn_tooltip',       'Tooltip',        'Overlay', 160,  60),
  shadcn('shadcn_context_menu',  'Context Menu',   'Overlay', 200, 160),
  shadcn('shadcn_dropdown_menu', 'Dropdown Menu',  'Overlay', 200, 140),
  shadcn('shadcn_command',       'Command',        'Overlay', 280, 180),

  // ── Data Display ─────────────────────────────────────────
  shadcn('shadcn_avatar',      'Avatar',       'Data Display', 160,  60),
  shadcn('shadcn_badge',       'Badge',        'Data Display', 200,  40),
  shadcn('shadcn_table',       'Table',        'Data Display', 360, 160),
  shadcn('shadcn_data_table',  'Data Table',   'Data Display', 400, 200),
  shadcn('shadcn_calendar',    'Calendar',     'Data Display', 280, 220),

  // ── Feedback ─────────────────────────────────────────────
  shadcn('shadcn_alert',     'Alert',     'Feedback', 320,  72),
  shadcn('shadcn_progress',  'Progress',  'Feedback', 280,  28),
  shadcn('shadcn_skeleton',  'Skeleton',  'Feedback', 280, 100),
  shadcn('shadcn_toast',     'Toast',     'Feedback', 280,  72),
  shadcn('shadcn_sonner',    'Sonner',    'Feedback', 280,  80),
]
