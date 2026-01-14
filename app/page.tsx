"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Particles from "@/components/Particles"

export default function LandingPage() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000)
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
      <Particles
        particleColors={['#acffb1', '#c8acff','#ffdfac']}
        particleCount={300}
        particleSpread={15}
        speed={0.2}
        particleBaseSize={300}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />

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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={showButton ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
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
