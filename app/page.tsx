"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function LandingPage() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 3,
      },
    },
  }

  const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 3,
      },
    },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circles */}
        <div className="floating-shape absolute top-20 left-10 w-32 h-32 rounded-full bg-[#ACFFB1] opacity-10"></div>
        <div className="floating-shape absolute top-1/3 right-20 w-40 h-40 rounded-full bg-[#ACFFB1] opacity-10"></div>

        {/* Triangle shapes */}
        <div
          className="floating-shape-triangle absolute top-1/4 left-1/3 w-0 h-0"
          style={{
            borderLeft: "24px solid transparent",
            borderRight: "24px solid transparent",
            borderBottom: "42px solid rgba(172, 255, 177, 0.1)",
          }}
        ></div>
        <div
          className="floating-shape-triangle absolute bottom-1/3 right-1/4 w-0 h-0"
          style={{
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderBottom: "35px solid rgba(172, 255, 177, 0.1)",
          }}
        ></div>

        {/* Square/Rectangle shapes */}
        <div className="floating-shape-square absolute bottom-32 left-1/4 w-28 h-28 bg-[#ACFFB1] opacity-10 rotate-45"></div>
        <div className="floating-shape-square absolute top-2/3 right-1/3 w-24 h-24 bg-[#ACFFB1] opacity-10 rotate-12"></div>

        {/* Pentagon shapes */}
        <div
          className="floating-shape-pentagon absolute bottom-10 right-1/3 w-32 h-32"
          style={{
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
            background: "rgba(172, 255, 177, 0.1)",
          }}
        ></div>
        <div
          className="floating-shape-pentagon absolute top-1/2 left-20 w-24 h-24"
          style={{
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
            background: "rgba(172, 255, 177, 0.1)",
          }}
        ></div>
      </div>

      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated heading with sliding text */}
          <div className="flex flex-col items-center justify-center gap-4 mb-12">
            <motion.h1
              className="text-8xl md:text-9xl font-bold text-[#ACFFB1]"
              style={{ fontFamily: "Lilita One" }}
              variants={slideInLeft}
            >
              PORTFOLIO
            </motion.h1>
            <motion.h1
              className="text-8xl md:text-9xl font-bold text-[#ACFFB1]"
              style={{ fontFamily: "Lilita One" }}
              variants={slideInRight}
            >
              BUILDER
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-[#7FFF9C] text-balance mb-12 max-w-2xl mx-auto"
            variants={fadeIn}
          ></motion.p>

          {/* Get Started Button - fades in after animation */}
          {showButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/builder">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 group bg-[#ACFFB1] text-black hover:bg-[#A8FFB0] rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#333333] bg-black/50 w-full py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white font-semibold">Portfolio Builder</div>
            <div className="flex items-center gap-4 text-sm text-white">
              <div>Privacy First</div>
              <div>No Account Needed</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
