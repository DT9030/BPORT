# Professional Portfolio Templates

## Overview
This document describes the **Professional Category** portfolio templates with advanced animations, hover effects, and floating icons. Each template is fully responsive and visually stunning.

---

## Professional Templates

### Pro-01: Minimal Focus
**Best For:** Corporate professionals, executives, and formal portfolios

**Key Features:**
- 🎨 Clean, sophisticated design with dark hero header
- ✨ Floating icon animations in background (Briefcase, TrendingUp, Award, Target, Star)
- 💫 Animated gradient orbs with pulsing effects
- 📍 Timeline-style experience section with animated dots
- 🎯 Large, bold skill badges with hover lift effects
- 📱 Fully responsive grid layout for education and projects
- 🌊 Smooth scroll-triggered animations (fade-in, slide-in)

**Animations:**
- Hero section: Fade-in with spring animation
- Contact badges: Scale up and lift on hover
- Experience cards: Slide in from left with timeline dots that scale on hover
- Skills: Staggered fade-in with scale and lift on hover
- Projects: Fade-up animation with card lift on hover
- Icon rotations: 360° rotate on hover

**Color Scheme Usage:**
- Primary: Headers, titles, and main text accents
- Secondary: Timeline borders, experience indicators
- Accent: Hero gradient, date badges, project icons

---

### Pro-02: Modern Blocks
**Best For:** Tech professionals, startups, and modern industries

**Key Features:**
- 🎆 Bold, oversized typography (8xl font size)
- 🌈 Animated background blobs (floating gradient orbs)
- 🎪 Bento grid layout (modular card system)
- 🎭 "Professional Portfolio" badge with animated icon
- 🎨 Gradient backgrounds on skill badges
- 🏗️ Asymmetric grid (cards span multiple columns)
- 💎 Frosted glass contact cards
- ⚡ Fast-paced entrance animations

**Animations:**
- Background: Massive gradient blobs moving infinitely
- Hero: Spring bounce entrance animation
- Cards: Individual fade-up animations with rotation on hover
- Skills: Pop-in animation with gradient pulsing
- Contact: Scale and lift with shadow enhancement
- Projects: Scale and lift with rotation on hover

**Layout Highlights:**
- About Card: Spans 2 columns
- Experience: Individual cards with icon animations
- Skills Card: Full-width with gradient badges
- Projects: Grid layout with hover overlays

---

### Pro-03: Creative Wave
**Best For:** Creative professionals, designers, and innovative portfolios

**Key Features:**
- 🌊 Animated wavy SVG divider
- 🎨 Asymmetric two-column hero (2/5 split)
- ✨ Floating particle system (12 animated particles)
- 🔄 Alternating zigzag experience timeline
- 🎯 Skills constellation with pulsing glow effects
- 🌀 Rotating gradient background in hero
- 💫 Project cards with gradient hover overlays
- 🎪 Animated checkmarks between experience items

**Unique Animations:**
- Particles: 12 dots floating with random trajectories
- Wavy Divider: Morphing wave animation (infinite loop)
- Hero: Split-panel entrance (left slides in from left, right from right)
- Experience: Alternating slide-in directions (zigzag pattern)
- Skills: Constellation effect with scale, rotate, and lift + pulsing outer glow
- Projects: Scale and lift with gradient overlay transition
- Rotating orb: 50-second continuous rotation in hero background

**Layout Pattern:**
- Hero: Asymmetric split (40% gradient left, 60% white right)
- Experience: Alternating left-right with centered animated icons
- Skills: Centered constellation pattern
- Projects: Standard grid with overlay effects

---

## Technical Implementation

### Dependencies
All templates use:
- `framer-motion` - For all animations and transitions
- `lucide-react` - For icons
- `@/components/ui/badge`, `button`, `card` - UI components
- Tailwind CSS - For styling

### Animation Patterns

#### 1. Entrance Animations
```typescript
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: index * 0.1 }}
```

#### 2. Hover Effects
```typescript
whileHover={{ scale: 1.05, y: -10 }}
```

#### 3. Continuous Animations
```typescript
animate={{ 
  y: [0, -30, 0],
  rotate: [0, 360]
}}
transition={{ 
  duration: 8,
  repeat: Infinity
}}
```

#### 4. Icon Rotations
```typescript
whileHover={{ rotate: 360 }}
transition={{ duration: 0.5 }}
```

---

## Responsive Design

All templates are responsive using Tailwind's breakpoints:
- Mobile: Single column stacks
- Tablet (`md:`): 2-column grids
- Desktop (`lg:`): 3-column grids where appropriate

Grid patterns:
```css
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

---

## Color Scheme Integration

Each template accepts a `colorScheme` prop with:
```typescript
{
  primary: string    // Main brand color
  secondary: string  // Supporting color
  accent: string     // Highlight color
}
```

**Usage Examples:**
- Gradients: `linear-gradient(135deg, primary, secondary)`
- Backgrounds: `${primary}20` (20% opacity)
- Text colors: Direct color application
- Borders: `borderColor: secondary`

---

## Floating Icons

### Pro-01 Icons
- Briefcase, TrendingUp, Award, Target, Star
- Positioned absolutely with staggered animations
- Opacity: 5%
- Size: 40-60px progressive

### Pro-02 Icons
- Large gradient blob animations instead of discrete icons
- 500-600px orbs with blur
- 20% opacity

### Pro-03 Icons
- 12 small particle dots (2px x 2px)
- Random positioning
- Alternating primary/accent colors
- Complex multi-axis movement

---

## Hover Effects Summary

| Element | Effect | Duration |
|---------|--------|----------|
| Headers | Scale 1.02-1.05 | 0.3s |
| Icons | Rotate 360° | 0.5s |
| Cards | Lift (y: -10 to -15) | 0.3s |
| Skills | Scale 1.15-1.2 + Rotate | 0.3s |
| Buttons | Scale 1.05 | 0.2s |
| Contact | Scale 1.05-1.1 + Lift | 0.3s |

---

## Usage Example

```typescript
import { professionalTemplates } from '@/components/templates/professional-templates'

// In your component
const TemplateComponent = professionalTemplates['pro-01']

return (
  <TemplateComponent 
    userData={userData}
    colorScheme={{
      primary: '#2563eb',
      secondary: '#3b82f6',
      accent: '#60a5fa'
    }}
  />
)
```

---

## Template Selection Guide

| Template | Style | Industry | Personality |
|----------|-------|----------|-------------|
| Pro-01 | Professional, Clean | Corporate, Finance, Legal | Trustworthy, Experienced |
| Pro-02 | Bold, Modern | Tech, Startups, Marketing | Innovative, Dynamic |
| Pro-03 | Creative, Unique | Design, Arts, Media | Creative, Expressive |

---

## Performance Considerations

1. **Animations** use `framer-motion`'s optimized transforms
2. **Viewport triggers** prevent off-screen animation calculations
3. **GPU-accelerated** properties (transform, opacity)
4. **Staggered loading** prevents render blocking
5. **`once: true`** for entrance animations prevents re-triggering

---

## Future Enhancements

Additional templates in development:
- Pro-04: Professional Edge (Formal, ATS-friendly)
- Pro-05: Elegant Serif (Luxury, refined)
- Pro-06: Tech Dark (Dark mode, developer-focused)
- Pro-07: Showcase Grid (Project-first layout)
- Pro-08: Timeline Pro (Career timeline emphasis)
- Pro-09: Cards Bento (Bento grid masonry layout)

---

## Browser Compatibility

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note:** Animations gracefully degrade in browsers without full motion support via `prefers-reduced-motion` media query (handled by Tailwind).

---

## Credits

Built with:
- React 19
- Next.js 15
- Framer Motion
- Tailwind CSS 4
- Lucide React Icons
