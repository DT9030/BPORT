import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Lilita_One } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const lilitaOne = Lilita_One({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio Builder - Create Beautiful Portfolios & Resumes",
  description:
    "Create beautiful, personalized portfolios and resumes in minutes with our easy-to-use builder. No login required.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${lilitaOne.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
