"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="relative overflow-hidden"> {/* Prevent blinking */}
      <motion.div
        key={pathname}
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: -200 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
}
