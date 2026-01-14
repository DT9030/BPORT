import { NextRequest, NextResponse } from 'next/server'
import { parseResumeTextToData } from '@/lib/ai'
import pdf from 'pdf-parse'
import mammoth from 'mammoth'

export const runtime = 'nodejs'

async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    // Try pdf-parse first (better for text-based PDFs)
    const data = await pdf(buffer)
    if (data.text?.trim()) {
      console.log(`Extracted ${data.text.length} characters using pdf-parse`)
      return data.text.trim()
    }
  } catch (e: any) {
    console.warn('pdf-parse failed, trying fallback:', e?.message || e)
  }

  try {
    // Fallback to pdfjs-dist for image-based or complex PDFs
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
    const loadingTask = (pdfjs as any).getDocument({
      data: buffer,
      useSystemFonts: true,
      disableFontFace: false,
    })
    const doc = await loadingTask.promise
    let text = ''
    const max = Math.min(doc.numPages, 50) // Limit to 50 pages for performance

    console.log(`Processing ${max} pages with pdfjs fallback`)

    for (let i = 1; i <= max; i++) {
      try {
        const page = await doc.getPage(i)
        const content = await page.getTextContent()
        const strings = content.items?.map((it: any) => {
          const str = it.str?.trim()
          // Handle special characters and line breaks
          return str ? str.replace(/\s+/g, ' ') : ''
        }).filter(Boolean) || []
        text += strings.join(' ') + '\n'
      } catch (pageError: any) {
        console.warn(`Failed to process page ${i}:`, pageError?.message || pageError)
      }
    }

    await doc.cleanup?.()
    const cleanText = text.trim()
    console.log(`Extracted ${cleanText.length} characters using pdfjs fallback`)
    return cleanText
  } catch (e) {
    console.error('pdfjs fallback failed:', e)
    return ''
  }
}

async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer })
  return result.value || ''
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get('file') as unknown as File | null
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const ct = (file.type || '').toLowerCase()
    const name = (file as any).name?.toLowerCase?.() || ''
    let text = ''

    if (ct.includes('pdf') || name.endsWith('.pdf')) {
      text = await extractTextFromPdf(buffer)
    } else if (ct.includes('word') || name.endsWith('.docx')) {
      text = await extractTextFromDocx(buffer)
    } else {
      return NextResponse.json({ error: 'Unsupported file type. Upload PDF or DOCX.' }, { status: 400 })
    }

    if (!text || !text.trim()) {
      return NextResponse.json({ error: 'Could not extract text from document (PDF may be scanned without selectable text). Try exporting as DOCX or another PDF.' }, { status: 422 })
    }

    console.log(`Processing resume with ${text.length} characters of extracted text`)
    const data = await parseResumeTextToData(text)
    console.log(`Successfully parsed resume data:`, {
      fullName: data.fullName,
      title: data.title,
      experienceCount: data.experience.length,
      educationCount: data.education.length,
      skillsCount: data.skills.length
    })

    return NextResponse.json({ ok: true, data })
  } catch (err: any) {
    console.error('parse-resume error', err)
    return NextResponse.json({ error: err?.message || 'Failed to parse resume' }, { status: 500 })
  }
}
