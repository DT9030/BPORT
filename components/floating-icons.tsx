"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>

interface FloatingIconsProps {
  icons: IconType[]
  className?: string
  density?: number // number of icons to render (defaults to icons.length)
}

export default function FloatingIcons({ icons, className, density }: FloatingIconsProps) {
  const list = density ? icons.slice(0, density) : icons
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {list.map((Icon, idx) => {
        const delay = (idx % 5) * 0.4
        const left = 8 + ((idx * 18) % 84) // staggered positions
        const size = 16 + ((idx * 7) % 12) // 16-28px
        return (
          <motion.div
            key={idx}
            aria-hidden="true"
            className="absolute"
            style={{ left: `${left}%`, top: `${(idx * 11) % 70}%` }}
            initial={{ y: 0, opacity: 0.25, rotate: 0 }}
            animate={{ y: -12, opacity: 0.6, rotate: 6 }}
            transition={{
              duration: 2.4 + (idx % 3) * 0.6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay,
              ease: "easeInOut",
            }}
          >
            <Icon width={size} height={size} className="text-muted-foreground/40" />
          </motion.div>
        )
      })}
    </div>
  )
}
