"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, RefreshCw } from "lucide-react"

interface ColorScheme {
  name: string
  primary: string
  secondary: string
  accent: string
  description: string
}

interface ColorPickerProps {
  selectedScheme: ColorScheme
  onSchemeChange: (scheme: ColorScheme) => void
}

const colorSchemes: ColorScheme[] = [
  {
    name: "Professional Blue",
    primary: "#2563eb",
    secondary: "#3b82f6",
    accent: "#60a5fa",
    description: "Classic and trustworthy",
  },
  {
    name: "Emerald Green",
    primary: "#059669",
    secondary: "#10b981",
    accent: "#34d399",
    description: "Fresh and modern",
  },
  {
    name: "Elegant Purple",
    primary: "#7c3aed",
    secondary: "#8b5cf6",
    accent: "#a78bfa",
    description: "Creative and sophisticated",
  },
  {
    name: "Warm Orange",
    primary: "#ea580c",
    secondary: "#f97316",
    accent: "#fb923c",
    description: "Energetic and friendly",
  },
  {
    name: "Deep Teal",
    primary: "#0f766e",
    secondary: "#14b8a6",
    accent: "#5eead4",
    description: "Calm and professional",
  },
  {
    name: "Charcoal Gray",
    primary: "#374151",
    secondary: "#6b7280",
    accent: "#9ca3af",
    description: "Minimal and timeless",
  },
]

export default function ColorPicker({ selectedScheme, onSchemeChange }: ColorPickerProps) {
  const [customColors, setCustomColors] = useState({
    primary: selectedScheme.primary,
    secondary: selectedScheme.secondary,
    accent: selectedScheme.accent,
  })

  const handleCustomColorChange = (colorType: keyof typeof customColors, color: string) => {
    const newColors = { ...customColors, [colorType]: color }
    setCustomColors(newColors)
    onSchemeChange({
      name: "Custom",
      ...newColors,
      description: "Your custom color scheme",
    })
  }

  return (
    <div className="space-y-6">
      {/* Custom Color Picker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Custom Colors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 break-words">Primary Color</label>
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="color"
                  value={customColors.primary}
                  onChange={(e) => handleCustomColorChange("primary", e.target.value)}
                  className="w-12 h-12 rounded-lg border border-border cursor-pointer shrink-0"
                />
                <div className="flex-1 min-w-0 max-w-full">
                  <input
                    type="text"
                    value={customColors.primary}
                    onChange={(e) => handleCustomColorChange("primary", e.target.value)}
                    className="w-full p-2 border border-border rounded-lg text-sm font-mono break-words"
                    placeholder="#000000"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Main headings and accents</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 break-words">Secondary Color</label>
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="color"
                  value={customColors.secondary}
                  onChange={(e) => handleCustomColorChange("secondary", e.target.value)}
                  className="w-12 h-12 rounded-lg border border-border cursor-pointer shrink-0"
                />
                <div className="flex-1 min-w-0 max-w-full">
                  <input
                    type="text"
                    value={customColors.secondary}
                    onChange={(e) => handleCustomColorChange("secondary", e.target.value)}
                    className="w-full p-2 border border-border rounded-lg text-sm font-mono break-words"
                    placeholder="#000000"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Subheadings and highlights</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 break-words">Accent Color</label>
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="color"
                  value={customColors.accent}
                  onChange={(e) => handleCustomColorChange("accent", e.target.value)}
                  className="w-12 h-12 rounded-lg border border-border cursor-pointer shrink-0"
                />
                <div className="flex-1 min-w-0 max-w-full">
                  <input
                    type="text"
                    value={customColors.accent}
                    onChange={(e) => handleCustomColorChange("accent", e.target.value)}
                    className="w-full p-2 border border-border rounded-lg text-sm font-mono break-words"
                    placeholder="#000000"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Buttons and links</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Color Preview</h4>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div
                  className="w-8 h-8 rounded-lg border border-gray-200"
                  style={{ backgroundColor: customColors.primary }}
                />
                <div
                  className="w-8 h-8 rounded-lg border border-gray-200"
                  style={{ backgroundColor: customColors.secondary }}
                />
                <div
                  className="w-8 h-8 rounded-lg border border-gray-200"
                  style={{ backgroundColor: customColors.accent }}
                />
              </div>
              <div className="text-sm text-muted-foreground">Your custom color combination</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preset Color Schemes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Preset Color Schemes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorSchemes.map((scheme) => (
              <div
                key={scheme.name}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                  selectedScheme.name === scheme.name
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => onSchemeChange(scheme)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-1">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: scheme.primary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: scheme.secondary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: scheme.accent }}
                    />
                  </div>
                </div>
                <h3 className="font-semibold text-sm mb-1">{scheme.name}</h3>
                <p className="text-xs text-muted-foreground">{scheme.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
