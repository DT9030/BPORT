"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit3, Save, X, Plus, Trash2, ExternalLink, Github, Mail, Phone } from "lucide-react"

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

interface PortfolioEditorProps {
  userData: UserData
  template: string
  colorScheme: {
    primary: string
    secondary: string
    accent: string
  }
  onDataChange: (data: UserData) => void
}

export default function PortfolioEditor({ userData, template, colorScheme, onDataChange }: PortfolioEditorProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [tempData, setTempData] = useState<UserData>(userData)

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

  const handleSave = () => {
    onDataChange(tempData)
    setEditingSection(null)
    setEditingItem(null)
  }

  const handleCancel = () => {
    setTempData(userData)
    setEditingSection(null)
    setEditingItem(null)
  }

  const updateField = (field: keyof UserData, value: any) => {
    setTempData({ ...tempData, [field]: value })
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setTempData({
      ...tempData,
      experience: tempData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setTempData({
      ...tempData,
      education: tempData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setTempData({
      ...tempData,
      projects: tempData.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    })
  }

  const addSkill = (skill: string) => {
    if (skill.trim() && !tempData.skills.includes(skill.trim())) {
      setTempData({ ...tempData, skills: [...tempData.skills, skill.trim()] })
    }
  }

  const removeSkill = (skill: string) => {
    setTempData({ ...tempData, skills: tempData.skills.filter((s) => s !== skill) })
  }

  const removeExperience = (id: string) => {
    setTempData({ ...tempData, experience: tempData.experience.filter((exp) => exp.id !== id) })
  }

  const removeEducation = (id: string) => {
    setTempData({ ...tempData, education: tempData.education.filter((edu) => edu.id !== id) })
  }

  const removeProject = (id: string) => {
    setTempData({ ...tempData, projects: tempData.projects.filter((proj) => proj.id !== id) })
  }

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden portfolio-preview">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-12 text-center relative group">
        {editingSection !== "header" && (
          <Button
            size="sm"
            variant="outline"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
            onClick={() => setEditingSection("header")}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}

        {editingSection === "header" ? (
          <div className="space-y-4">
            <Input
              value={tempData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              className="text-center text-2xl font-bold"
              placeholder="Your Full Name"
            />
            <Input
              value={tempData.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="text-center text-lg"
              placeholder="Your Professional Title"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                value={tempData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="Email"
                type="email"
              />
              <Input
                value={tempData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="Phone"
                type="tel"
              />
            </div>
            <div className="flex justify-center gap-2">
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>

      <div className="px-8 py-8 space-y-8">
        {/* Summary Section */}
        {(userData.summary || editingSection === "summary") && (
          <section className="relative group">
            {editingSection !== "summary" && (
              <Button
                size="sm"
                variant="outline"
                className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                onClick={() => setEditingSection("summary")}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}

            <h2 className="text-2xl font-semibold mb-4" style={{ color: colorScheme.primary }}>
              About
            </h2>

            {editingSection === "summary" ? (
              <div className="space-y-4">
                <Textarea
                  value={tempData.summary}
                  onChange={(e) => updateField("summary", e.target.value)}
                  rows={4}
                  placeholder="Write a brief summary of your professional background..."
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed">{userData.summary}</p>
            )}
          </section>
        )}

        {/* Experience Section */}
        {userData.experience.length > 0 && (
          <section className="relative group">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: colorScheme.primary }}>
              Experience
            </h2>
            <div className="space-y-6">
              {userData.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="border-l-2 pl-4 relative group/item"
                  style={{ borderColor: colorScheme.secondary }}
                >
                  {editingItem !== exp.id && (
                    <div className="absolute top-0 right-0 opacity-0 group-hover/item:opacity-100 transition-opacity flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingItem(exp.id)}>
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => removeExperience(exp.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {editingItem === exp.id ? (
                    <div className="space-y-4">
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                        placeholder="Position"
                      />
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        placeholder="Company"
                      />
                      <div className="grid md:grid-cols-3 gap-4">
                        <Input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                        />
                        <Input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                          disabled={exp.current}
                        />
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                          />
                          Current
                        </label>
                      </div>
                      <Textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                        rows={3}
                        placeholder="Description"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingItem(null)}>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold">{exp.position}</h3>
                      <p className="text-gray-600 mb-1">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        {getDateRange(exp.startDate, exp.endDate, exp.current)}
                      </p>
                      {exp.description && <p className="text-gray-700">{exp.description}</p>}
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {userData.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: colorScheme.primary }}>
              Education
            </h2>
            <div className="space-y-4">
              {userData.education.map((edu) => (
                <div key={edu.id} className="relative group/item">
                  {editingItem !== edu.id && (
                    <div className="absolute top-0 right-0 opacity-0 group-hover/item:opacity-100 transition-opacity flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingItem(edu.id)}>
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => removeEducation(edu.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {editingItem === edu.id ? (
                    <div className="space-y-4">
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        placeholder="Degree"
                      />
                      <Input
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                        placeholder="Field of Study"
                      />
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                        placeholder="Institution"
                      />
                      <Input
                        value={edu.graduationYear}
                        onChange={(e) => updateEducation(edu.id, "graduationYear", e.target.value)}
                        placeholder="Graduation Year"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingItem(null)}>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">Class of {edu.graduationYear}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {userData.skills.length > 0 && (
          <section className="relative group">
            {editingSection !== "skills" && (
              <Button
                size="sm"
                variant="outline"
                className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                onClick={() => setEditingSection("skills")}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}

            <h2 className="text-2xl font-semibold mb-4" style={{ color: colorScheme.primary }}>
              Skills
            </h2>

            {editingSection === "skills" ? (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addSkill(e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Add a skill"]') as HTMLInputElement
                      if (input) {
                        addSkill(input.value)
                        input.value = ""
                      }
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tempData.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeSkill(skill)}
                    >
                      {skill}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
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
            )}
          </section>
        )}

        {/* Projects Section */}
        {userData.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: colorScheme.primary }}>
              Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {userData.projects.map((project) => (
                <Card key={project.id} className="border-gray-200 relative group/item">
                  {editingItem !== project.id && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover/item:opacity-100 transition-opacity flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingItem(project.id)}>
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => removeProject(project.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  <CardContent className="p-4">
                    {editingItem === project.id ? (
                      <div className="space-y-4">
                        <Input
                          value={project.name}
                          onChange={(e) => updateProject(project.id, "name", e.target.value)}
                          placeholder="Project Name"
                        />
                        <Textarea
                          value={project.description}
                          onChange={(e) => updateProject(project.id, "description", e.target.value)}
                          rows={3}
                          placeholder="Project Description"
                        />
                        <Input
                          value={project.url || ""}
                          onChange={(e) => updateProject(project.id, "url", e.target.value)}
                          placeholder="Project URL"
                        />
                        <Input
                          value={project.github || ""}
                          onChange={(e) => updateProject(project.id, "github", e.target.value)}
                          placeholder="GitHub URL"
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSave}>
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingItem(null)}>
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
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
                      </>
                    )}
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
