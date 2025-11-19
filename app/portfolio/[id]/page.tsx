"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import PortfolioPreview from "@/components/portfolio-preview"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Share } from "lucide-react"
import Link from "next/link"

interface UserData {
  fullName: string
  title: string
  email: string
  phone: string
  summary: string
  experience: any[]
  education: any[]
  skills: string[]
  projects: any[]
}

interface ColorScheme {
  name: string
  primary: string
  secondary: string
  accent: string
  description: string
}

interface PortfolioData {
  userData: UserData
  template: string
  colorScheme: ColorScheme
  seo?: {
    title: string
    description: string
  }
}

export default function SharedPortfolioPage() {
  const params = useParams()
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const encodedData = params.id as string
      const decodedData = atob(encodedData)
      const data: PortfolioData = JSON.parse(decodedData)
      setPortfolioData(data)

      // Set page title and meta description
      if (data.seo) {
        document.title = data.seo.title
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
          metaDescription.setAttribute("content", data.seo.description)
        } else {
          const meta = document.createElement("meta")
          meta.name = "description"
          meta.content = data.seo.description
          document.head.appendChild(meta)
        }
      }
    } catch (err) {
      setError("Invalid portfolio link. Please check the URL and try again.")
    } finally {
      setLoading(false)
    }
  }, [params.id])

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: portfolioData?.seo?.title || `${portfolioData?.userData.fullName}'s Portfolio`,
          text:
            portfolioData?.seo?.description || `Check out ${portfolioData?.userData.fullName}'s professional portfolio`,
          url: window.location.href,
        })
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href)
        alert("Link copied to clipboard!")
      }
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowLeft className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Portfolio Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || "The portfolio you're looking for doesn't exist or the link is invalid."}
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-10 print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Create Your Own
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Download className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Portfolio Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="portfolio-preview">
          <PortfolioPreview
            userData={portfolioData.userData}
            template={portfolioData.template}
            colorScheme={portfolioData.colorScheme}
          />
        </div>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          header { display: none !important; }
          .container { padding: 0 !important; }
          .portfolio-preview { 
            box-shadow: none !important; 
            border-radius: 0 !important;
          }
          @page { margin: 0.5in; }
        }
      `}</style>
    </div>
  )
}
