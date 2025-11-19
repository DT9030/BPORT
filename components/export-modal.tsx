"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Share, Link, Copy, CheckCircle, FileText, Globe, Mail, MessageSquare } from "lucide-react"

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

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  userData: UserData
  template: string
  colorScheme: ColorScheme
}

export default function ExportModal({ isOpen, onClose, userData, template, colorScheme }: ExportModalProps) {
  const [exportType, setExportType] = useState<"pdf" | "link" | null>(null)
  const [shareableUrl, setShareableUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [customDomain, setCustomDomain] = useState("")
  const [seoTitle, setSeoTitle] = useState(`${userData.fullName} - ${userData.title}`)
  const [seoDescription, setSeoDescription] = useState(
    userData.summary || `Professional portfolio of ${userData.fullName}`,
  )

  const generateShareableUrl = () => {
    const portfolioData = {
      userData,
      template,
      colorScheme,
      seo: {
        title: seoTitle,
        description: seoDescription,
      },
    }

    const encodedData = btoa(JSON.stringify(portfolioData))
    const baseUrl = customDomain || window.location.origin
    const url = `${baseUrl}/portfolio/${encodedData}`
    setShareableUrl(url)
    return url
  }

  const handlePdfExport = () => {
    // Create a new window with the portfolio content optimized for printing
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      const portfolioElement = document.querySelector(".portfolio-preview")
      if (portfolioElement) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${userData.fullName} - Portfolio</title>
              <meta charset="utf-8">
              <style>
                * { box-sizing: border-box; }
                body { 
                  margin: 0; 
                  padding: 0; 
                  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                  line-height: 1.5;
                  color: #1f2937;
                }
                .portfolio-preview { 
                  max-width: 800px; 
                  margin: 0 auto; 
                  background: white;
                }
                @media print { 
                  body { padding: 0; }
                  .portfolio-preview { box-shadow: none; }
                  @page { margin: 0.5in; }
                }
                @media screen {
                  body { padding: 20px; background: #f3f4f6; }
                }
                /* Ensure proper text rendering */
                h1, h2, h3, h4, h5, h6 { 
                  font-weight: 600; 
                  margin-top: 0;
                  page-break-after: avoid;
                }
                p { margin-bottom: 1rem; }
                .badge { 
                  display: inline-block; 
                  padding: 0.25rem 0.5rem; 
                  border-radius: 0.25rem; 
                  font-size: 0.75rem; 
                  font-weight: 500;
                  border: 1px solid #d1d5db;
                }
                /* Prevent page breaks inside sections */
                section { page-break-inside: avoid; }
                .experience-item, .education-item, .project-item { 
                  page-break-inside: avoid; 
                  margin-bottom: 1.5rem;
                }
              </style>
            </head>
            <body>
              ${portfolioElement.outerHTML}
              <script>
                window.onload = function() {
                  setTimeout(function() {
                    window.print();
                  }, 500);
                }
              </script>
            </body>
          </html>
        `)
        printWindow.document.close()
      }
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Check out ${userData.fullName}'s Portfolio`)
    const body = encodeURIComponent(
      `Hi,\n\nI wanted to share ${userData.fullName}'s professional portfolio with you:\n\n${shareableUrl}\n\nBest regards`,
    )
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const shareViaLinkedIn = () => {
    const text = encodeURIComponent(`Check out my professional portfolio: ${shareableUrl}`)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableUrl)}`)
  }

  const shareViaTwitter = () => {
    const text = encodeURIComponent(`Check out my professional portfolio: ${shareableUrl}`)
    window.open(`https://twitter.com/intent/tweet?text=${text}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share className="w-5 h-5" />
            Export Your Portfolio
          </DialogTitle>
          <DialogDescription>Choose how you'd like to export and share your portfolio</DialogDescription>
        </DialogHeader>

        {!exportType && (
          <div className="grid md:grid-cols-2 gap-6 py-6">
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/50"
              onClick={() => setExportType("pdf")}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-center">Download PDF</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center mb-4">
                  Generate a high-quality PDF version of your portfolio for printing or offline sharing
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Print-optimized layout
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Perfect for job applications
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Works offline
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-secondary/50"
              onClick={() => setExportType("link")}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Link className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="text-center">Shareable Link</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center mb-4">
                  Create a live, shareable link that you can send to employers or add to your social profiles
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                    Always up-to-date
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                    Mobile-friendly
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                    SEO optimized
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {exportType === "pdf" && (
          <div className="py-6 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">PDF Export Ready</h3>
              <p className="text-muted-foreground mb-6">
                Your portfolio will be optimized for printing and saved as a PDF file
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">PDF Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Print-optimized layout</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">High-quality typography</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Proper page breaks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Professional formatting</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setExportType(null)}>
                Back
              </Button>
              <Button onClick={handlePdfExport} className="px-8">
                <Download className="w-4 h-4 mr-2" />
                Generate PDF
              </Button>
            </div>
          </div>
        )}

        {exportType === "link" && (
          <div className="py-6 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Shareable Link</h3>
              <p className="text-muted-foreground mb-6">
                Generate a live link to your portfolio that you can share anywhere
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Page Title</label>
                    <Input
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder="Your Name - Professional Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      rows={3}
                      placeholder="Brief description of your professional background..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Custom Domain (Optional)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Domain</label>
                    <Input
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      placeholder="https://yourname.com"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Leave empty to use our default domain</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Pro tip:</strong> Use your own domain for a more professional appearance
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {shareableUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Link className="w-5 h-5" />
                    Your Portfolio Link
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input value={shareableUrl} readOnly className="font-mono text-sm" />
                    <Button variant="outline" onClick={() => copyToClipboard(shareableUrl)} className="shrink-0">
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={shareViaEmail}>
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button size="sm" variant="outline" onClick={shareViaLinkedIn}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button size="sm" variant="outline" onClick={shareViaTwitter}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-800">Link Generated Successfully!</p>
                        <p className="text-sm text-green-700">
                          Your portfolio is now live and ready to share. The link will always show your latest updates.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setExportType(null)}>
                Back
              </Button>
              {!shareableUrl ? (
                <Button onClick={generateShareableUrl} className="px-8">
                  <Link className="w-4 h-4 mr-2" />
                  Generate Link
                </Button>
              ) : (
                <Button onClick={onClose} className="px-8">
                  Done
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
