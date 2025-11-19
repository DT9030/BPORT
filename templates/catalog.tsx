"use client"

import type React from 'react'
import { ProfessionalMinimalTemplate, ProfessionalModernTemplate, ProfessionalCreativeTemplate } from '@/components/templates/professional-templates'
// If you add your own templates under templates/<category>/<template-id>/index.tsx,
// import and register them below.

export type Category = 'freshers' | 'professional' | 'business'

export interface TemplateProps {
  userData: any
  colorScheme: { primary: string; secondary: string; accent: string }
}

export type TemplateComponent = React.FC<TemplateProps>

export interface TemplateEntry {
  id: string             // e.g., 'pro-01'
  category: Category
  name: string
  description?: string
  component: TemplateComponent
}

// Built-in mappings for existing professional templates so they are available via templates system
const builtin: TemplateEntry[] = [
  { id: 'pro-01', category: 'professional', name: 'Minimal Focus', component: ProfessionalMinimalTemplate },
  { id: 'pro-02', category: 'professional', name: 'Modern Blocks', component: ProfessionalModernTemplate },
  { id: 'pro-03', category: 'professional', name: 'Creative Wave', component: ProfessionalCreativeTemplate },
]

// User-extensible area: add your custom imports and entries below.
// Example (uncomment and adjust once you add files):
// import Pro04 from '@/templates/professional/pro-04-professional-edge'
// builtin.push({ id: 'pro-04', category: 'professional', name: 'Professional Edge', component: Pro04 })

const registry: Record<string, TemplateEntry> = Object.fromEntries(
  builtin.map((t) => [t.id, t])
)

export function resolveTemplateById(id: string): TemplateComponent | null {
  const entry = registry[id]
  return entry ? entry.component : null
}

export function listTemplatesByCategory(category: Category): TemplateEntry[] {
  return Object.values(registry).filter((t) => t.category === category)
}
