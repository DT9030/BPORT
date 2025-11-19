"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, ExternalLink, Github } from "lucide-react"
import { professionalTemplates } from "@/components/templates/professional-templates"
import { resolveTemplateById } from "@/templates/catalog"

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  graduationYear: string
  gpa?: string
}

interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  url?: string
  github?: string
}

interface UserData {
  fullName: string
  title: string
  email: string
  phone: string
  summary: string
  experience: Experience[]
  education: Education[]
  skills: string[]
  projects: Project[]
}

interface PortfolioPreviewProps {
  userData: UserData
  template: string
  colorScheme: {
    primary: string
    secondary: string
    accent: string
  }
}

export default function PortfolioPreview({ userData, template = "minimal", colorScheme }: PortfolioPreviewProps) {
  // 1) Try templates/ registry first (user-extensible)
  const FromTemplates = resolveTemplateById(template)
  if (FromTemplates) {
    const Comp = FromTemplates
    return <Comp userData={userData} colorScheme={colorScheme} />
  }

  // 2) Fallback to built-in professional templates for pro-*
  if (template.startsWith("pro-")) {
    const TemplateComponent = professionalTemplates[template as keyof typeof professionalTemplates]
    if (TemplateComponent) {
      return <TemplateComponent userData={userData} colorScheme={colorScheme} />
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const getDateRange = (startDate: string, endDate: string, current: boolean) => {
    const start = formatDate(startDate)
    const end = current ? "Present" : formatDate(endDate)
    return `${start} - ${end}`
  }

  // Minimal Template
  if (template === "minimal") {
    return (
      <div className="max-w-4xl mx-auto bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-12 text-center">
          <h1 className="text-4xl font-bold mb-2" style={{ color: colorScheme.primary }}>
            {userData.fullName || "Your Name"}
          </h1>
          <p className="text-xl text-gray-600 mb-4">{userData.title || "Your Professional Title"}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {userData.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {userData.email}
              </div>
            )}
            {userData.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {userData.phone}
              </div>
            )}
          </div>
        </div>

        <div className="px-8 py-8 space-y-8">
          {/* Summary */}
          {userData.summary && (
            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: colorScheme.primary }}>
                About
              </h2>
              <p className="text-gray-700 leading-relaxed">{userData.summary}</p>
            </section>
          )}

          {/* Experience */}
          {userData.experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: colorScheme.primary }}>
                Experience
              </h2>
              <div className="space-y-6">
                {userData.experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: colorScheme.secondary }}>
                    <h3 className="text-lg font-semibold">{exp.position}</h3>
                    <p className="text-gray-600 mb-1">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      {getDateRange(exp.startDate, exp.endDate, exp.current)}
                    </p>
                    {exp.description && <p className="text-gray-700">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {userData.education.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: colorScheme.primary }}>
                Education
              </h2>
              <div className="space-y-4">
                {userData.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-lg font-semibold">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">Class of {edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {userData.skills.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: colorScheme.primary }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-3 py-1"
                    style={{ borderColor: colorScheme.secondary, color: colorScheme.secondary }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {userData.projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: colorScheme.primary }}>
                Projects
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {userData.projects.map((project) => (
                  <Card key={project.id} className="border-gray-200">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                      <p className="text-gray-700 text-sm mb-3">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        {project.url && (
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Live Demo
                          </Button>
                        )}
                        {project.github && (
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            <Github className="w-3 h-3 mr-1" />
                            Code
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    )
  }

  // Modern Template
  if (template === "modern") {
    return (
      <div className="max-w-4xl mx-auto bg-white text-gray-900 shadow-xl rounded-xl overflow-hidden">
        {/* Header */}
        <div className="relative px-8 py-16 text-center" style={{ backgroundColor: colorScheme.primary }}>
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-3 text-white">{userData.fullName || "Your Name"}</h1>
            <p className="text-xl text-white/90 mb-6">{userData.title || "Your Professional Title"}</p>
            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              {userData.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  {userData.email}
                </div>
              )}
              {userData.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  {userData.phone}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-8 py-10 space-y-10">
          {/* Summary */}
          {userData.summary && (
            <section className="text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6" style={{ color: colorScheme.primary }}>
                  About Me
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">{userData.summary}</p>
              </div>
            </section>
          )}

          {/* Experience */}
          {userData.experience.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colorScheme.primary }}>
                Experience
              </h2>
              <div className="space-y-8">
                {userData.experience.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    <div className="flex items-start gap-6">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                        style={{ backgroundColor: colorScheme.secondary }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{exp.position}</h3>
                        <p className="text-lg text-gray-600 mb-2">{exp.company}</p>
                        <p className="text-sm text-gray-500 mb-3">
                          {getDateRange(exp.startDate, exp.endDate, exp.current)}
                        </p>
                        {exp.description && <p className="text-gray-700">{exp.description}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {userData.skills.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colorScheme.primary }}>
                Skills
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {userData.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="px-4 py-2 text-sm font-medium text-white"
                    style={{ backgroundColor: colorScheme.secondary }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    )
  }

  // Default fallback
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{userData.fullName || "Your Name"}</h1>
        <p className="text-xl text-gray-600">{userData.title || "Your Professional Title"}</p>
      </div>
      <p className="text-center text-gray-500">Template preview will appear here</p>
    </div>
  )
}
