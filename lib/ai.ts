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

const SYSTEM_PROMPT = `You are a resume information extractor.
Return ONLY valid JSON with this exact TypeScript type:
{
  fullName: string;
  title: string;
  email: string;
  phone: string;
  summary: string;
  experience: Array<{
    id: string; // generate a short stable id like "exp-1"
    company: string;
    position: string;
    startDate: string; // YYYY-MM if available, else ""
    endDate: string;   // YYYY-MM if available, else ""
    current: boolean;  // true if present/ongoing
    description: string;
  }>;
  education: Array<{
    id: string; // generate a short stable id like "edu-1"
    institution: string;
    degree: string;
    field: string;
    graduationYear: string; // YYYY if available, else ""
  }>;
  skills: string[]; // concise, unique list
}
- Normalize dates to YYYY-MM or YYYY.
- If something is unknown, use empty string or reasonable fallback.
- Ensure JSON is minified and syntactically valid.`

export async function parseResumeTextToData(text: string): Promise<ParsedResumeData> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set')
  }

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    temperature: 0.2,
    response_format: { type: 'json_object' } as any,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Extract structured data from this resume text:\n\n${text}` },
    ],
  })

  const content = completion.choices?.[0]?.message?.content || '{}'
  try {
    return JSON.parse(content) as ParsedResumeData
  } catch (e) {
    // Attempt to salvage JSON
    const start = content.indexOf('{')
    const end = content.lastIndexOf('}')
    if (start >= 0 && end > start) {
      const maybe = content.slice(start, end + 1)
      return JSON.parse(maybe) as ParsedResumeData
    }
    throw e
  }
}