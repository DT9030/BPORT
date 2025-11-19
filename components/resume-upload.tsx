"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react"

interface ParsedResumeData {
  fullName: string
  title: string
  email: string
  phone: string
  summary: string
  experience: Array<{
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    institution: string
    degree: string
    field: string
    graduationYear: string
  }>
  skills: string[]
}

interface ResumeUploadProps {
  onParsed: (data: ParsedResumeData) => void
  onBack: () => void
}

export default function ResumeUpload({ onParsed, onBack }: ResumeUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelection(files[0])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelection(files[0])
    }
  }

  const handleFileSelection = (file: File) => {
    // Validate file type
    const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a PDF or DOCX file")
      return
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB")
      return
    }

    setError(null)
    setUploadedFile(file)
  }

  const removeFile = () => {
    setUploadedFile(null)
    setError(null)
    setProcessingProgress(0)
  }

  const processResume = async () => {
    if (!uploadedFile) return

    setIsProcessing(true)
    setProcessingProgress(0)

    // Simulated progress while uploading/parsing
    const progressSteps = [20, 40, 60, 80]
    for (const p of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setProcessingProgress(p)
    }

    try {
      const form = new FormData()
      form.append('file', uploadedFile)

      const res = await fetch('/api/parse-resume', {
        method: 'POST',
        body: form,
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error || 'Failed to parse resume')
      }

      const { data } = await res.json()
      setProcessingProgress(100)
      setIsProcessing(false)
      onParsed(data as ParsedResumeData)
    } catch (e: any) {
      setIsProcessing(false)
      setProcessingProgress(0)
      setError(e?.message || 'Failed to process resume')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Upload Your Resume</h1>
        <p className="text-muted-foreground">
          Upload your existing resume in PDF or DOCX format and we'll extract the information automatically
        </p>
      </div>

      <Card>
        <CardContent className="p-8">
          {!uploadedFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 cursor-pointer ${
                isDragOver
                  ? "border-primary bg-primary/5"
                  : error
                    ? "border-destructive bg-destructive/5"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <Upload
                className={`w-12 h-12 mx-auto mb-4 transition-colors ${
                  isDragOver ? "text-primary" : error ? "text-destructive" : "text-muted-foreground"
                }`}
              />
              <p className="text-lg font-medium mb-2">
                {isDragOver ? "Drop your resume here" : "Drop your resume here"}
              </p>
              <p className="text-muted-foreground mb-4">or click to browse files</p>
              <Button variant="outline" className="bg-transparent">
                Choose File
              </Button>
              <input id="file-input" type="file" accept=".pdf,.docx" onChange={handleFileInput} className="hidden" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* File Preview */}
              <div className="flex items-center gap-4 p-4 border border-border rounded-lg bg-card">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(uploadedFile.size)}</p>
                </div>
                {!isProcessing && (
                  <Button variant="ghost" size="sm" onClick={removeFile}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Processing Progress */}
              {isProcessing && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-medium">Processing your resume...</span>
                  </div>
                  <Progress value={processingProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground text-center">{processingProgress}% complete</p>
                </div>
              )}

              {/* Success State */}
              {processingProgress === 100 && !isProcessing && (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="font-medium text-green-700">Resume processed successfully!</p>
                  <p className="text-sm text-muted-foreground">
                    We've extracted your information and pre-filled your portfolio
                  </p>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="mt-6 space-y-2 text-sm text-muted-foreground text-center">
            <p>Supported formats: PDF, DOCX (Max size: 10MB)</p>
            <p>We'll automatically extract your personal info, experience, and skills</p>
            <p className="text-xs">Files are sent securely to our server for AI parsing and are not persisted.</p>
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={onBack} disabled={isProcessing}>
              Back
            </Button>
            <Button onClick={processResume} disabled={!uploadedFile || isProcessing || processingProgress === 100}>
              {isProcessing ? "Processing..." : processingProgress === 100 ? "Processed" : "Process Resume"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
