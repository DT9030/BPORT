import { NextRequest, NextResponse } from 'next/server'
import { parseResumeTextToData } from '@/lib/ai'
import pdf from 'pdf-parse'
import mammoth from 'mammoth'

export const runtime = 'nodejs'

async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer)
    if (data.text?.trim()) return data.text
  } catch (_) {}
  try {
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
    const loadingTask = (pdfjs as any).getDocument({ data: buffer })
    const doc = await loadingTask.promise
    let text = ''
    const max = Math.min(doc.numPages, 50)
    for (let i = 1; i <= max; i++) {
      const page = await doc.getPage(i)
      const content = await page.getTextContent()
      const strings = content.items?.map((it: any) => it.str).filter(Boolean) || []
      text += strings.join(' ') + '\n'
    }
    await doc.cleanup?.()
    return text
  } catch (e) {
    console.error('pdfjs fallback failed', e)
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

    const data = await parseResumeTextToData(text)

    return NextResponse.json({ ok: true, data })
  } catch (err: any) {
    console.error('parse-resume error', err)
    return NextResponse.json({ error: err?.message || 'Failed to parse resume' }, { status: 500 })
  }
}