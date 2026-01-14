import Groq from 'groq-sdk'

export const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export interface ParsedResumeData {
  fullName: string
  title: string
  email: string
  phone: string
  summary: string
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    graduationYear: string
  }>
  skills: string[]
}

const SYSTEM_PROMPT = `You are an expert resume information extractor. Extract structured data from resume text and return ONLY valid JSON.

IMPORTANT INSTRUCTIONS:
- Return ONLY valid JSON with this exact structure:
{
  "fullName": "string",
  "title": "string",
  "email": "string",
  "phone": "string",
  "summary": "string",
  "experience": [
    {
      "id": "exp-1",
      "company": "string",
      "position": "string",
      "startDate": "YYYY-MM or YYYY",
      "endDate": "YYYY-MM or YYYY or empty string",
      "current": false,
      "description": "string"
    }
  ],
  "education": [
    {
      "id": "edu-1",
      "institution": "string",
      "degree": "string",
      "field": "string",
      "graduationYear": "YYYY"
    }
  ],
  "skills": ["skill1", "skill2"]
}

EXTRACTION RULES:
- fullName: Extract the person's complete name
- title: Extract professional title/role (e.g., "Software Engineer", "Product Manager")
- email: Extract valid email address
- phone: Extract phone number with formatting
- summary: Create a 2-3 sentence professional summary based on experience
- experience: Extract all work experiences with accurate dates and descriptions
- education: Extract all educational qualifications
- skills: Extract technical and soft skills as a clean, deduplicated array

VALIDATION RULES:
- Dates must be in YYYY-MM or YYYY format only
- Use empty string "" for missing dates
- Set current: true only for ongoing positions
- Generate unique IDs like "exp-1", "exp-2", "edu-1", "edu-2"
- Skills should be concise and relevant (max 15 skills)
- Ensure all strings are properly escaped
- JSON must be minified and syntactically perfect`

export function validateAndCleanParsedData(data: any): ParsedResumeData {
  // Ensure required fields exist with defaults
  const cleaned: ParsedResumeData = {
    fullName: String(data.fullName || '').trim(),
    title: String(data.title || '').trim(),
    email: String(data.email || '').trim(),
    phone: String(data.phone || '').trim(),
    summary: String(data.summary || '').trim(),
    experience: [],
    education: [],
    skills: []
  }

  // Clean and validate experience
  if (Array.isArray(data.experience)) {
    cleaned.experience = data.experience
      .filter((exp: any) => exp && typeof exp === 'object')
      .map((exp: any, index: number) => ({
        id: String(exp.id || `exp-${index + 1}`).trim(),
        company: String(exp.company || '').trim(),
        position: String(exp.position || '').trim(),
        startDate: String(exp.startDate || '').trim(),
        endDate: String(exp.endDate || '').trim(),
        current: Boolean(exp.current),
        description: String(exp.description || '').trim()
      }))
      .filter((exp: any) => exp.company || exp.position) // Keep only entries with some data
  }

  // Clean and validate education
  if (Array.isArray(data.education)) {
    cleaned.education = data.education
      .filter((edu: any) => edu && typeof edu === 'object')
      .map((edu: any, index: number) => ({
        id: String(edu.id || `edu-${index + 1}`).trim(),
        institution: String(edu.institution || '').trim(),
        degree: String(edu.degree || '').trim(),
        field: String(edu.field || '').trim(),
        graduationYear: String(edu.graduationYear || '').trim()
      }))
      .filter((edu: any) => edu.institution || edu.degree) // Keep only entries with some data
  }

  // Clean and validate skills
  if (Array.isArray(data.skills)) {
    cleaned.skills = data.skills
      .filter((skill: any) => skill && typeof skill === 'string')
      .map((skill: string) => skill.trim())
      .filter((skill: string) => skill.length > 0)
      .filter((skill: string, index: number, arr: string[]) =>
        arr.indexOf(skill) === index // Remove duplicates
      )
      .slice(0, 20) // Limit to 20 skills max
  }

  return cleaned
}

export async function parseResumeTextToData(text: string): Promise<ParsedResumeData> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set')
  }

  // Clean the input text
  const cleanText = text
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .slice(0, 50000) // Limit text length for API

  if (!cleanText) {
    throw new Error('No valid text content found in resume')
  }

  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    temperature: 0.2,
    response_format: { type: 'json_object' } as any,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Extract structured data from this resume text:\n\n${cleanText}` },
    ],
  })

  const content = completion.choices?.[0]?.message?.content || '{}'

  try {
    const rawData = JSON.parse(content)
    return validateAndCleanParsedData(rawData)
  } catch (e) {
    console.warn('Initial JSON parse failed, attempting to salvage:', e)

    // Attempt to salvage JSON
    const start = content.indexOf('{')
    const end = content.lastIndexOf('}')
    if (start >= 0 && end > start) {
      try {
        const maybe = content.slice(start, end + 1)
        const rawData = JSON.parse(maybe)
        return validateAndCleanParsedData(rawData)
      } catch (salvageError) {
        console.error('JSON salvage also failed:', salvageError)
      }
    }

    // Return minimal valid data structure if all parsing fails
    return {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      summary: '',
      experience: [],
      education: [],
      skills: []
    }
  }
}
