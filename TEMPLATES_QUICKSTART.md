# Portfolio Templates - Quick Start Guide

## 🚀 Quick Start

### Step 1: Import the Templates
The templates are automatically integrated into your portfolio preview component:

```typescript
import { professionalTemplates } from '@/components/templates/professional-templates'
```

### Step 2: Use in Builder
Templates are referenced by ID in the builder page:
- `pro-01` - Professional Minimal Focus
- `pro-02` - Modern Blocks
- `pro-03` - Creative Wave

### Step 3: Select Template
In the layouts step, users can select from the professional templates which will automatically render with animations.

---

## 🎨 Template Overview

### Pro-01: Minimal Focus
```
┌─────────────────────────────────────┐
│  🎯 [Dark Header with Name/Title]  │
│     [Animated Gradient Orb]         │
│     [Contact Badges]                │
├─────────────────────────────────────┤
│  ✨ About Me                        │
│  📝 Summary text...                 │
├─────────────────────────────────────┤
│  💼 Experience [Timeline Dots]      │
│  ├─ Position @ Company              │
│  ├─ Position @ Company              │
│  └─ Position @ Company              │
├─────────────────────────────────────┤
│  🎓 Education [2-column grid]       │
│  [Card] [Card]                      │
├─────────────────────────────────────┤
│  💪 Skills [Badge Pills]            │
│  [Skill] [Skill] [Skill]...         │
├─────────────────────────────────────┤
│  🚀 Projects [2-column grid]        │
│  [Card] [Card]                      │
└─────────────────────────────────────┘
```

**Animations:**
- ⭐ Floating icons in background
- 💫 Pulsing gradient orb
- 🎯 Timeline dots scale on hover
- 📈 Cards lift on hover
- 🌟 Skills badges pop and lift

---

### Pro-02: Modern Blocks
```
┌─────────────────────────────────────┐
│   [Animated Blob Background]        │
│   🎪 Professional Portfolio Badge   │
│   YOUR NAME [Huge 8xl font]         │
│   [Title Gradient Badge]            │
│   [Email] [Phone]                   │
├─────────────────────────────────────┤
│  Bento Grid Layout:                 │
│  ┌─────────────┬─────────┐          │
│  │ About (2x1) │ Exp #1  │          │
│  ├─────────────┼─────────┤          │
│  │ Exp #2      │ Edu     │          │
│  ├─────────────┴─────────┤          │
│  │ Skills (Full Width)   │          │
│  ├─────┬─────────┬───────┤          │
│  │ Proj│ Proj #2 │ Proj#3│          │
│  └─────┴─────────┴───────┘          │
└─────────────────────────────────────┘
```

**Animations:**
- 🌈 Massive floating gradient blobs
- 🎪 Spring bounce hero entrance
- 🎭 Card rotations on hover
- 💎 Gradient skill pills with pop-in
- ⚡ Scale and rotate effects

---

### Pro-03: Creative Wave
```
┌───────────────┬─────────────────────┐
│   [Gradient]  │  [White Background] │
│   NAME        │  🎯 Profile         │
│   Title       │  Summary text...    │
│   [Email]     │                     │
│   [Phone]     │                     │
├───────────────┴─────────────────────┤
│   🌊 [Animated Wavy Divider]       │
├─────────────────────────────────────┤
│  🔄 Career Journey (Zigzag)         │
│  [Card] ← 🎪 → [Card]              │
│      ↓  🎪  ↓                       │
│  [Card] ← 🎪                        │
├─────────────────────────────────────┤
│  🎯 Expertise (Constellation)       │
│  [Skill] [Skill] [Skill]            │
│  Floating + pulsing glows           │
├─────────────────────────────────────┤
│  💡 Featured Work [3-col grid]      │
│  [Card] [Card] [Card]               │
└─────────────────────────────────────┘
```

**Animations:**
- ✨ 12 floating particles
- 🌊 Morphing wave divider
- 🔄 Zigzag alternating experience
- 💫 Pulsing skill constellation
- 🎨 Gradient overlays on hover

---

## 🎯 Feature Matrix

| Feature | Pro-01 | Pro-02 | Pro-03 |
|---------|--------|--------|--------|
| Floating Icons | ✅ 5 icons | ❌ (uses blobs) | ✅ 12 particles |
| Animations | 🔥🔥🔥 | 🔥🔥🔥🔥 | 🔥🔥🔥🔥🔥 |
| Hover Effects | ✅ | ✅ | ✅ |
| Responsive | ✅ | ✅ | ✅ |
| Hero Style | Dark gradient | Bold centered | Split asymmetric |
| Layout | Linear | Bento grid | Zigzag timeline |
| Best For | Corporate | Tech/Startup | Creative |

---

## 🎨 Animation Types Used

### Entrance Animations
```typescript
// Fade in from bottom
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}

// Slide in from left
initial={{ opacity: 0, x: -50 }}
whileInView={{ opacity: 1, x: 0 }}

// Scale up
initial={{ scale: 0.9, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
```

### Hover Animations
```typescript
// Lift up
whileHover={{ y: -10 }}

// Scale up
whileHover={{ scale: 1.05 }}

// Rotate
whileHover={{ rotate: 360 }}

// Combined
whileHover={{ scale: 1.1, y: -5, rotate: 3 }}
```

### Continuous Animations
```typescript
// Float
animate={{ y: [0, -30, 0] }}
transition={{ duration: 8, repeat: Infinity }}

// Pulse
animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}

// Rotate
animate={{ rotate: 360 }}
transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
```

---

## 🚀 Testing the Templates

### 1. Run Development Server
```bash
npm run dev
```

### 2. Navigate to Builder
Go to `http://localhost:3000/builder`

### 3. Select Category
Choose "Professional" category

### 4. Fill in Information
Add your:
- Name & Title
- Contact info
- Summary
- Experience
- Skills
- Projects

### 5. Choose Template
In the "Layouts" step, select:
- "Minimal Focus" (pro-01)
- "Modern Blocks" (pro-02)
- "Creative Wave" (pro-03)

### 6. Preview
See the live animated preview!

---

## 🎨 Customizing Color Schemes

Templates adapt to any color scheme. Try these combos:

### Professional Blue
```typescript
{
  primary: '#2563eb',
  secondary: '#3b82f6',
  accent: '#60a5fa'
}
```

### Success Green
```typescript
{
  primary: '#059669',
  secondary: '#10b981',
  accent: '#34d399'
}
```

### Creative Purple
```typescript
{
  primary: '#7c3aed',
  secondary: '#8b5cf6',
  accent: '#a78bfa'
}
```

### Bold Red
```typescript
{
  primary: '#dc2626',
  secondary: '#ef4444',
  accent: '#f87171'
}
```

---

## 📱 Responsive Breakpoints

All templates respond to these breakpoints:

| Breakpoint | Width | Columns |
|------------|-------|---------|
| Mobile | < 768px | 1 |
| Tablet | 768px - 1024px | 2 |
| Desktop | > 1024px | 2-3 |

---

## ⚡ Performance Tips

1. **Animations run only once** - Using `viewport={{ once: true }}`
2. **GPU accelerated** - Using transform and opacity
3. **Staggered loading** - Prevents render blocking
4. **Lazy rendering** - `whileInView` waits for scroll
5. **Optimized icons** - SVG from lucide-react

---

## 🐛 Troubleshooting

### Issue: Animations not showing
**Solution:** Check that `framer-motion` is installed
```bash
npm install framer-motion
```

### Issue: Icons not rendering
**Solution:** Verify lucide-react is installed
```bash
npm install lucide-react
```

### Issue: Colors not applying
**Solution:** Ensure colorScheme prop is passed correctly with all three values

---

## 📚 Next Steps

1. ✅ Created 3 professional templates
2. 🔄 Integrate into builder flow (already done)
3. 🎨 Add more templates (6 more planned)
4. 📱 Test on mobile devices
5. 🚀 Deploy and share!

---

## 💡 Pro Tips

1. **Preview multiple templates** before choosing
2. **Customize colors** to match your brand
3. **Fill all sections** for best visual effect
4. **Test responsiveness** by resizing window
5. **Export as PDF** for sharing

---

## 🎉 You're Ready!

Your professional portfolio templates are now set up with:
- ✅ 3 unique animated designs
- ✅ Responsive layouts
- ✅ Hover effects
- ✅ Floating icons
- ✅ Color scheme support

Enjoy creating stunning portfolios! 🚀
