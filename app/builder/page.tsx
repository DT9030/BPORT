"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import ResumeUpload from "@/components/resume-upload"
import PortfolioPreview from "@/components/portfolio-preview"
import PortfolioEditor from "@/components/portfolio-editor"
import ColorPicker from "@/components/color-picker"
import { Badge } from "@/components/ui/badge" // Fixed import to use named import instead of default import
import ExportModal from "@/components/export-modal"
import { ProgressBar } from "@/components/progress-bar"
import {
  ArrowLeft,
  FileText,
  Upload,
  User,
  CheckCircle,
  Plus,
  X,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Download,
  Share,
  Eye,
  Palette,
  Maximize2,
  X as CloseIcon,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import FloatingIcons from "@/components/floating-icons"
import { Sparkles, Star } from "lucide-react"

type BuilderStep = "userCategory" | "questions" | "manual" | "resume" | "layouts" | "preview" | "colors" | "edit"

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
  buildMethod: "manual" | "resume" | null
  experience: Experience[]
  education: Education[]
  skills: string[]
  projects: Project[]
  category?: "fresher" | "professional" | "business" | null
  categoryAnswers?: Record<string, string>
}

interface ColorScheme {
  name: string
  primary: string
  secondary: string
  accent: string
  description: string
}

export default function BuilderPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<BuilderStep>("userCategory")
  const [manualStep, setManualStep] = useState<"personal" | "experience" | "education" | "skills" | "projects">(
    "personal",
  )
  const [selectedCategory, setSelectedCategory] = useState<"fresher" | "professional" | "business" | null>(null)
  const [navigationDirection, setNavigationDirection] = useState<"forward" | "backward">("forward")
  const [isBuilding, setIsBuilding] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("minimal")
  const [colorScheme, setColorScheme] = useState<ColorScheme>({
    name: "Professional Blue",
    primary: "#2563eb",
    secondary: "#3b82f6",
    accent: "#60a5fa",
    description: "Classic and trustworthy",
  })
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    summary: "",
    buildMethod: null,
    experience: [],
    education: [],
    skills: [],
    projects: [],
    category: null,
    categoryAnswers: {},
  })
  const [showExportModal, setShowExportModal] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isColorSidebarOpen, setIsColorSidebarOpen] = useState(false)

  // Handle ESC key to close fullscreen
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isFullscreen])

  // Dummy data for empty fields
  const getDummyData = (): UserData => {
    const dummyExperience: Experience[] = [
      {
        id: '1',
        company: 'Tech Innovations Inc.',
        position: 'Senior Software Engineer',
        startDate: '2021-01',
        endDate: '',
        current: true,
        description: 'Led development of scalable web applications using React and Node.js. Mentored junior developers and improved code quality by 40%.'
      },
      {
        id: '2',
        company: 'Digital Solutions Ltd.',
        position: 'Software Developer',
        startDate: '2019-03',
        endDate: '2020-12',
        current: false,
        description: 'Developed and maintained multiple client-facing applications. Collaborated with cross-functional teams to deliver high-quality software.'
      }
    ]

    const dummyEducation: Education[] = [
      {
        id: '1',
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        graduationYear: '2018',
        gpa: '3.8/4.0'
      }
    ]

    const dummySkills = [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
      'SQL', 'MongoDB', 'AWS', 'Docker', 'Git',
      'Agile', 'REST APIs', 'GraphQL', 'CI/CD'
    ]

    const dummyProjects: Project[] = [
      {
        id: '1',
        name: 'E-Commerce Platform',
        description: 'Built a full-stack e-commerce platform with real-time inventory management and payment integration.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        url: 'https://example.com',
        github: 'https://github.com/example'
      },
      {
        id: '2',
        name: 'Task Management App',
        description: 'Developed a collaborative task management application with real-time updates and team features.',
        technologies: ['Next.js', 'PostgreSQL', 'Socket.io'],
        url: 'https://example.com',
        github: ''
      }
    ]

    return {
      fullName: userData.fullName || 'John Doe',
      title: userData.title || 'Full Stack Developer',
      email: userData.email || 'john.doe@example.com',
      phone: userData.phone || '+1 (555) 123-4567',
      summary: userData.summary || 'Passionate software engineer with 5+ years of experience building scalable web applications. Specialized in modern JavaScript frameworks and cloud technologies. Committed to writing clean, maintainable code and delivering exceptional user experiences.',
      buildMethod: userData.buildMethod,
      experience: userData.experience.length > 0 ? userData.experience : dummyExperience,
      education: userData.education.length > 0 ? userData.education : dummyEducation,
      skills: userData.skills.length > 0 ? userData.skills : dummySkills,
      projects: userData.projects.length > 0 ? userData.projects : dummyProjects,
      category: userData.category,
      categoryAnswers: userData.categoryAnswers
    }
  }

  const steps = [
    { id: "userCategory", name: "Category", completed: false },
    { id: "questions", name: "Choose Method", completed: false },
    { id: "manual", name: "Content", completed: false },
    { id: "layouts", name: "Template", completed: false },
    { id: "colors", name: "Colors", completed: false },
    { id: "edit", name: "Final Edit", completed: false },
  ]

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep)
  }

  const getProgressPercentage = () => {
    const currentIndex = getCurrentStepIndex()
    return ((currentIndex + 1) / steps.length) * 100
  }

  const handleStepChange = (step: BuilderStep) => {
    setCurrentStep(step)
  }

  const handleMethodSelection = (method: "manual" | "resume") => {
    setUserData({ ...userData, buildMethod: method })
    if (method === "manual") {
      setCurrentStep("manual")
    } else {
      setCurrentStep("resume")
    }
  }

  const handleTemplateSelection = (templateId: string) => {
    setSelectedTemplate(templateId)
    setIsBuilding(true)
    setTimeout(() => {
      setIsBuilding(false)
      setCurrentStep("colors")
    }, 1200)
  }

  const handleExport = (format: "pdf" | "link") => {
    setShowExportModal(true)
  }

  const handleDownloadZip = async () => {
    try {
      const res = await fetch("/api/export/zip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template: selectedTemplate }),
      })
      if (!res.ok) throw new Error("Failed to create ZIP")
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `template-${selectedTemplate}.zip`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
    }
  }

  // Experience handlers
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setUserData({ ...userData, experience: [...userData.experience, newExperience] })
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setUserData({
      ...userData,
      experience: userData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    setUserData({
      ...userData,
      experience: userData.experience.filter((exp) => exp.id !== id),
    })
  }

  // Education handlers
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      graduationYear: "",
      gpa: "",
    }
    setUserData({ ...userData, education: [...userData.education, newEducation] })
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setUserData({
      ...userData,
      education: userData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    setUserData({
      ...userData,
      education: userData.education.filter((edu) => edu.id !== id),
    })
  }

  // Skills handlers
  const addSkill = (skill: string) => {
    if (skill.trim() && !userData.skills.includes(skill.trim())) {
      setUserData({ ...userData, skills: [...userData.skills, skill.trim()] })
    }
  }

  const removeSkill = (skill: string) => {
    setUserData({ ...userData, skills: userData.skills.filter((s) => s !== skill) })
  }

  // Projects handlers
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      url: "",
      github: "",
    }
    setUserData({ ...userData, projects: [...userData.projects, newProject] })
  }

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setUserData({
      ...userData,
      projects: userData.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    })
  }

  const removeProject = (id: string) => {
    setUserData({
      ...userData,
      projects: userData.projects.filter((proj) => proj.id !== id),
    })
  }

  const handleNextManualStep = () => {
    const stepsOrder = ["personal", "experience", "education", "skills", "projects"]
    const currentIndex = stepsOrder.indexOf(manualStep)

    if (currentIndex < stepsOrder.length - 1) {
      setNavigationDirection("forward")
      setManualStep(stepsOrder[currentIndex + 1] as any)
    } else {
      setCurrentStep("layouts")
    }
  }

  const handlePreviousManualStep = () => {
    const stepsOrder = ["personal", "experience", "education", "skills", "projects"]
    const currentIndex = stepsOrder.indexOf(manualStep)

    if (currentIndex > 0) {
      setNavigationDirection("backward")
      setManualStep(stepsOrder[currentIndex - 1] as any)
    } else {
      setCurrentStep("questions")
    }
  }

  const handleHeaderBack = () => {
    if (currentStep === "manual") {
      handlePreviousManualStep()
    } else if (currentStep === "layouts") {
      handleStepChange(userData.buildMethod === "resume" ? "resume" : "manual")
    } else if (currentStep === "colors") {
      handleStepChange("layouts")
    } else if (currentStep === "edit") {
      handleStepChange("colors")
    } else if (currentStep === "resume") {
      handleStepChange("questions")
    } else if (currentStep === "questions") {
      handleStepChange("userCategory")
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleHeaderBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">Portfolio Builder</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Step {getCurrentStepIndex() + 1} of {steps.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full">
            <ProgressBar currentStep={getCurrentStepIndex() + 1} totalSteps={steps.length} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="relative overflow-hidden"
          >
            {currentStep === "userCategory" && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <Badge variant="outline" className="mb-3">
                <Sparkles className="w-3 h-3 mr-1" /> Guided Setup
              </Badge>
              <h1 className="text-3xl font-bold mb-2">Pick your category</h1>
              <p className="text-muted-foreground">We’ll tailor questions and templates for your choice.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {(
                [
                  {
                    id: "fresher",
                    name: "Fresher",
                    icon: GraduationCap,
                    blurb: "First portfolio, internships, campus projects",
                  },
                  {
                    id: "professional",
                    name: "Professional",
                    icon: Briefcase,
                    blurb: "Experienced roles, achievements, leadership",
                  },
                  {
                    id: "business",
                    name: "Business",
                    icon: FileText,
                    blurb: "Services, clients, case studies, testimonials",
                  },
                ] as const
              ).map(({ id, name, icon: Icon, blurb }) => (
                <Card
                  key={id}
                  className={`relative overflow-hidden cursor-pointer transition-all ${
                    selectedCategory === id ? "border-primary bg-primary/5" : "hover:shadow-lg hover:border-primary/40"
                  }`}
                  onClick={() => {
                    setSelectedCategory(id)
                    setUserData((d) => ({ ...d, category: id }))
                  }}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <p className="text-sm text-muted-foreground text-center">{blurb}</p>
                  </CardContent>
                  <FloatingIcons icons={[Sparkles, Star, Icon]} className="opacity-80" />
                </Card>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Link href="/">
                <Button variant="outline">Back</Button>
              </Link>
              <Button onClick={() => setCurrentStep("questions")} disabled={!selectedCategory} className="px-8">
                Continue
              </Button>
            </div>
          </div>
        )}

        {currentStep === "questions" && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">How would you like to start?</h1>
              <p className="text-muted-foreground">Choose your preferred method to create your portfolio or resume</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  userData.buildMethod === "manual" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                }`}
                onClick={() => handleMethodSelection("manual")}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-center flex items-center justify-center gap-2">
                    Build Manually
                    {userData.buildMethod === "manual" && <CheckCircle className="w-5 h-5 text-primary" />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center mb-4">
                    Start from scratch and manually enter your personal details, experience, and skills
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Full control over content
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Step-by-step guidance
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Perfect for first-time users
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  userData.buildMethod === "resume" ? "border-secondary bg-secondary/5" : "hover:border-secondary/50"
                }`}
                onClick={() => handleMethodSelection("resume")}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle className="text-center flex items-center justify-center gap-2">
                    Upload Resume
                    {userData.buildMethod === "resume" && <CheckCircle className="w-5 h-5 text-secondary" />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center mb-4">
                    Upload your existing resume and we'll extract the information automatically
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      Quick setup process
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      AI-powered extraction
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      Supports PDF & DOCX
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {userData.buildMethod && (
              <div className="mt-8">
                <Button size="lg" onClick={() => handleMethodSelection(userData.buildMethod!)} className="px-8">
                  Continue with {userData.buildMethod === "manual" ? "Manual Entry" : "Resume Upload"}
                </Button>
              </div>
            )}
          </div>
        )}

        {currentStep === "manual" && (
          <div className="max-w-4xl mx-auto">
            {/* Manual Entry Navigation */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { id: "personal", label: "Personal Info", icon: User },
                  { id: "experience", label: "Experience", icon: Briefcase },
                  { id: "education", label: "Education", icon: GraduationCap },
                  { id: "skills", label: "Skills", icon: Code },
                  { id: "projects", label: "Projects", icon: Award },
                ].map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    variant={manualStep === id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setManualStep(id as any)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={manualStep}
                initial={{ x: navigationDirection === "forward" ? 80 : -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: navigationDirection === "forward" ? -80 : 80, opacity: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="relative overflow-hidden"
              >
            {/* Personal Information */}
            {manualStep === "personal" && (
              <>
                {selectedCategory === "professional" && (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Professional Focus
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Years of Experience</label>
                        <input
                          type="number"
                          min={0}
                          className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                          value={userData.categoryAnswers?.yoe || ""}
                          onChange={(e) =>
                            setUserData((d) => ({
                              ...d,
                              categoryAnswers: { ...d.categoryAnswers, yoe: e.target.value },
                            }))
                          }
                          placeholder="e.g., 4"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Key Achievements</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                          value={userData.categoryAnswers?.achievements || ""}
                          onChange={(e) =>
                            setUserData((d) => ({
                              ...d,
                              categoryAnswers: { ...d.categoryAnswers, achievements: e.target.value },
                            }))
                          }
                          placeholder="e.g., Increased conversion by 20%"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Certifications</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                          value={userData.categoryAnswers?.certs || ""}
                          onChange={(e) =>
                            setUserData((d) => ({
                              ...d,
                              categoryAnswers: { ...d.categoryAnswers, certs: e.target.value },
                            }))
                          }
                          placeholder="e.g., AWS SAA, PMP"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={userData.fullName}
                        onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                        className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Professional Title *</label>
                      <input
                        type="text"
                        value={userData.title}
                        onChange={(e) => setUserData({ ...userData, title: e.target.value })}
                        className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                        placeholder="e.g., Software Developer, Designer, Marketing Manager"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                          className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                          className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Professional Summary</label>
                      <textarea
                        rows={4}
                        value={userData.summary}
                        onChange={(e) => setUserData({ ...userData, summary: e.target.value })}
                        className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-colors"
                        placeholder="Write a brief summary of your professional background and key achievements..."
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        This will be displayed prominently on your portfolio
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Experience Section */}
            {manualStep === "experience" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Work Experience
                    </CardTitle>
                    <Button onClick={addExperience} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {userData.experience.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No work experience added yet</p>
                      <p className="text-sm">Click "Add Experience" to get started</p>
                    </div>
                  ) : (
                    userData.experience.map((exp) => (
                      <div key={exp.id} className="border border-border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Experience Entry</h4>
                          <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Company *</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                              placeholder="Company name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Position *</label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                              placeholder="Job title"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Start Date</label>
                            <input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">End Date</label>
                            <input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                              disabled={exp.current}
                            />
                          </div>

                          <div className="flex items-center pt-8">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={exp.current}
                                onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                                className="rounded border-border"
                              />
                              <span className="text-sm">Current position</span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Description</label>
                          <textarea
                            rows={3}
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                            className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-colors"
                            placeholder="Describe your responsibilities and achievements..."
                          />
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {/* Education Section */}
            {manualStep === "education" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Education
                    </CardTitle>
                    <Button onClick={addEducation} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {userData.education.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No education added yet</p>
                      <p className="text-sm">Click "Add Education" to get started</p>
                    </div>
                  ) : (
                    userData.education.map((edu) => (
                      <div key={edu.id} className="border border-border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Education Entry</h4>
                          <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Institution *</label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                              placeholder="University or College name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Degree *</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                              placeholder="e.g., Bachelor of Science, Master of Arts"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Field of Study</label>
                            <input
                              type="text"
                              value={edu.field}
                              onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                              placeholder="e.g., Computer Science, Psychology"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Graduation Year</label>
                            <input
                              type="number"
                              min="1900"
                              max={new Date().getFullYear()}
                              value={edu.graduationYear}
                              onChange={(e) => updateEducation(edu.id, "graduationYear", e.target.value)}
                              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                              placeholder="YYYY"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">GPA (Optional)</label>
                          <input
                            type="text"
                            value={edu.gpa || ""}
                            onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                            className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                            placeholder="e.g., 3.8/4.0"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {/* Skills Section */}
            {manualStep === "skills" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      placeholder="Add a skill (e.g., React, Python, Project Management)"
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addSkill(e.currentTarget.value)
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                    <Button
                      onClick={() =>
                        addSkill(
                          (document.querySelector(
                            'input[placeholder="Add a skill (e.g., React, Python, Project Management)"]',
                          ) as HTMLInputElement)?.value || '',
                        )
                      }
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {userData.skills.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No skills added yet</p>
                      <p className="text-sm">Type a skill and press Enter or click Add</p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {userData.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="flex items-center gap-1 px-3 py-2 text-base cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => removeSkill(skill)}
                        >
                          {skill}
                          <X className="w-3 h-3" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Projects Section */}
            {manualStep === "projects" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Projects
                    </CardTitle>
                    <Button onClick={addProject} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {userData.projects.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No projects added yet</p>
                      <p className="text-sm">Click "Add Project" to get started</p>
                    </div>
                  ) : (
                    userData.projects.map((proj) => (
                      <div key={proj.id} className="border border-border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Project Entry</h4>
                          <Button variant="ghost" size="sm" onClick={() => removeProject(proj.id)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Project Name *</label>
                          <input
                            type="text"
                            value={proj.name}
                            onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                            className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                            placeholder="Project title"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Description</label>
                          <textarea
                            rows={3}
                            value={proj.description}
                            onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                            className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-colors"
                            placeholder="Describe the project and your role..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Technologies Used</label>
                          <input
                            type="text"
                            placeholder="Add technologies (e.g., React, Node.js, Tailwind CSS)"
                            className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors mb-2"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                const tech = e.currentTarget.value.trim()
                                if (tech && !proj.technologies.includes(tech)) {
                                  updateProject(proj.id, "technologies", [...proj.technologies, tech])
                                  e.currentTarget.value = ""
                                }
                              }
                            }}
                          />
                          <div className="flex flex-wrap gap-2">
                            {proj.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                                onClick={() =>
                                  updateProject(
                                    proj.id,
                                    "technologies",
                                    proj.technologies.filter((t) => t !== tech),
                                  )
                                }
                              >
                                {tech}
                                <X className="w-3 h-3" />
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Project URL (Optional)</label>
                            <input
                              type="url"
                              value={proj.url || ""}
                              onChange={(e) => updateProject(proj.id, "url", e.target.value)}
                              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                              placeholder="https://your-project-link.com"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">GitHub URL (Optional)</label>
                            <input
                              type="url"
                              value={proj.github || ""}
                              onChange={(e) => updateProject(proj.id, "github", e.target.value)}
                              className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                              placeholder="https://github.com/your-repo"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => handlePreviousManualStep()}>
                {manualStep === "personal" ? "Back" : "Previous"}
              </Button>
              <Button
                onClick={() => handleNextManualStep()}
                disabled={manualStep === "personal" && (!userData.fullName || !userData.title || !userData.email)}
              >
                {manualStep === "projects" ? "Continue to Templates" : "Next"}
              </Button>
            </div>
            </motion.div>
          </AnimatePresence>
        </div>
        )}

        {currentStep === "resume" && (
          <ResumeUpload
            onParsed={(parsedData) => {
              setUserData({
                ...userData,
                fullName: parsedData.fullName,
                title: parsedData.title,
                email: parsedData.email,
                phone: parsedData.phone,
                summary: parsedData.summary,
                experience: parsedData.experience.map((exp, index) => ({
                  ...exp,
                  id: (Date.now() + index).toString(),
                })),
                education: parsedData.education.map((edu, index) => ({
                  ...edu,
                  id: (Date.now() + index).toString(),
                  gpa: "",
                })),
                skills: parsedData.skills,
                projects: [], // Initialize empty projects array
              })
              // Move directly to layouts after successful parsing
              setCurrentStep("layouts")
            }}
            onBack={() => handleStepChange("questions")}
          />
        )}



        {currentStep === "layouts" && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-4">Choose Your Template</h1>
              <p className="text-muted-foreground">
                We’ve curated templates for {selectedCategory ? selectedCategory : "your"} profile. Each has subtle
                animations.
              </p>
            </div>

            {(() => {
              const cat = selectedCategory || "professional"
              const base = (prefix: string) => [
                {
                  id: `${prefix}-01`,
                  name: "Minimal Focus",
                  description: "Clean, content-first layout with tidy sections",
                  preview: "/minimal-clean-layout.jpg",
                  features: ["Clean typography", "Tight spacing", "Neutral accents"],
                  bestFor: "General",
                },
                {
                  id: `${prefix}-02`,
                  name: "Modern Blocks",
                  description: "Bold headings, modular blocks, crisp dividers",
                  preview: "/modern-block-portfolio.jpg",
                  features: ["Bold sections", "Grid blocks", "Contemporary"],
                  bestFor: "Tech/Startup",
                },
                {
                  id: `${prefix}-03`,
                  name: "Creative Wave",
                  description: "Playful accents and asymmetric balance",
                  preview: "/creative-portfolio-asymmetric.jpg",
                  features: ["Playful accents", "Unique layout", "Expressive"],
                  bestFor: "Design",
                },
                {
                  id: `${prefix}-04`,
                  name: "Professional Edge",
                  description: "Formal, balanced, recruiter-friendly",
                  preview: "/professional-resume-layout.jpg",
                  features: ["Formal structure", "Readable", "ATS-friendly"],
                  bestFor: "Corporate",
                },
                {
                  id: `${prefix}-05`,
                  name: "Elegant Serif",
                  description: "Refined typography with generous whitespace",
                  preview: "/elegant-serif-portfolio.jpg",
                  features: ["Serif headings", "Refined spacing", "Sophisticated"],
                  bestFor: "Luxury",
                },
                {
                  id: `${prefix}-06`,
                  name: "Tech Dark",
                  description: "Dark UI with code-friendly rhythm",
                  preview: "/dark-tech-portfolio.jpg",
                  features: ["Dark accents", "Dev focus", "Modern"],
                  bestFor: "Engineering",
                },
                {
                  id: `${prefix}-07`,
                  name: "Showcase Grid",
                  description: "Project-first grid with hover details",
                  preview: "/project-showcase-grid.jpg",
                  features: ["Gallery grid", "Hover reveals", "Case studies"],
                  bestFor: "Projects",
                },
                {
                  id: `${prefix}-08`,
                  name: "Timeline Pro",
                  description: "Vertical timeline for experience highlights",
                  preview: "/timeline-resume-layout.jpg",
                  features: ["Timeline", "Milestones", "Story-driven"],
                  bestFor: "Experience",
                },
                {
                  id: `${prefix}-09`,
                  name: "Cards Bento",
                  description: "Bento grid sections with animated cards",
                  preview: "/bento-cards-portfolio.jpg",
                  features: ["Bento layout", "Animated cards", "Versatile"],
                  bestFor: "All",
                },
              ]
              const mapCatToPrefix = {
                fresher: "fresher",
                professional: "pro",
                business: "biz",
              } as const
              const prefix = mapCatToPrefix[cat as "fresher" | "professional" | "business"] ?? "pro"
              const templates = base(prefix).slice(0, 3)

              return (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template, idx) => (
                    <Card
                      key={template.id}
                      className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg group ${
                        selectedTemplate === template.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                      }`}
                      onClick={() => handleTemplateSelection(template.id)}
                    >
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg h-48 bg-gray-50">
                          {/* Live Preview Thumbnail */}
                          <div className="scale-[0.15] origin-top-left absolute -left-[100px] -top-[50px] pointer-events-none">
                            <div className="w-[800px] h-[1000px]">
                              <PortfolioPreview userData={getDummyData()} template={template.id} colorScheme={colorScheme} />
                            </div>
                          </div>
                          {/* Floating icons accent */}
                          <FloatingIcons
                            icons={[Sparkles, Star, Briefcase, GraduationCap, Award, Code]}
                            className="opacity-80"
                            density={3 + (idx % 3)}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          {selectedTemplate === template.id && (
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-primary text-primary-foreground">Selected</Badge>
                            </div>
                          )}
                          {/* Expand button */}
                          <div className="absolute top-2 left-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedTemplate(template.id)
                                setIsFullscreen(true)
                              }}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{template.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              Animated
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-1">
                              {template.features.map((feature) => (
                                <Badge key={feature} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Best for: <span className="font-medium">{template.bestFor}</span>
                            </p>
                          </div>
                          <Button
                            className={`w-full mt-4 ${
                              selectedTemplate === template.id
                                ? "bg-primary text-primary-foreground"
                                : "group-hover:bg-primary group-hover:text-primary-foreground"
                            }`}
                            onClick={() => handleTemplateSelection(template.id)}
                          >
                            {selectedTemplate === template.id ? "Selected" : "Use Template"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )
            })()}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => handleStepChange(userData.buildMethod === "resume" ? "resume" : "manual")}
              >
                Back
              </Button>
              <Button
                onClick={() => selectedTemplate && handleTemplateSelection(selectedTemplate)}
                disabled={!selectedTemplate}
              >
                Continue
              </Button>
            </div>
          </div>
        )}



        {currentStep === "colors" && (
          <div className="relative max-w-6xl mx-auto">


            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-4">Customize Your Colors</h1>
              <p className="text-muted-foreground">
                Choose colors that match your personal brand and make your portfolio stand out
              </p>
            </div>

            {/* Color Picker Sidebar */}
            <AnimatePresence>
              {isColorSidebarOpen && (
                <motion.div
                  initial={{ x: -400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -400, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed left-0 top-0 h-full w-[600px] bg-card border-r border-border shadow-lg z-20"
                >
                  <div className="overflow-y-auto h-full scrollbar-thin scrollbar-track-background scrollbar-thumb-muted-foreground/20">
                    <div className="sticky top-0 bg-card border-b border-border z-10 pt-8 px-4 pb-4 flex items-center justify-between">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        Color Customization
                      </h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsColorSidebarOpen(false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="p-6">
                      <ColorPicker selectedScheme={colorScheme} onSchemeChange={setColorScheme} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Portfolio Preview */}
            <div className={`transition-all duration-300 ${isColorSidebarOpen ? 'ml-[600px]' : 'ml-0'}`}>
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsColorSidebarOpen(!isColorSidebarOpen)}
                    className="bg-[#71c66b] hover:bg-[#71c66b]/90 text-black border-[#71c66b]"
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    Customize Colors
                  </Button>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setIsFullscreen(true)}>
                      <Maximize2 className="w-4 h-4 mr-1" />
                      Expand
                    </Button>
                    <Button onClick={() => handleStepChange("edit")}>Continue to Final Edit</Button>
                  </div>
                </div>
                <div className="border border-border rounded-lg overflow-hidden bg-white">
                  <PortfolioPreview userData={getDummyData()} template={selectedTemplate} colorScheme={colorScheme} />
                </div>
              </div>
            </div>

            {/* Overlay when sidebar is open */}
            {isColorSidebarOpen && (
              <div
                className="fixed inset-0 bg-black/20 z-10"
                onClick={() => setIsColorSidebarOpen(false)}
              />
            )}
          </div>
        )}

        {currentStep === "edit" && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h1 className="text-3xl font-bold">Final Preview</h1>
                  <p className="text-muted-foreground">Review your portfolio and export or publish it.</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleDownloadZip}>
                    <Download className="w-4 h-4 mr-2" />
                    Download ZIP
                  </Button>
                  <Button variant="secondary" onClick={() => handleExport("link")}>
                    <Share className="w-4 h-4 mr-2" />
                    Publish
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <div className="max-w-6xl mx-auto">
                <PortfolioPreview userData={getDummyData()} template={selectedTemplate} colorScheme={colorScheme} />
              </div>
            </div>

          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </main>

      {isBuilding && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-md border border-border rounded-xl bg-card p-8 text-center"
          >
            <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Building your portfolio…</h3>
            <p className="text-sm text-muted-foreground mb-6">Applying template, wiring animations, and styling.</p>
            <div className="relative h-2 w-full rounded-full bg-muted overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: ["0%", "45%", "75%", "100%"] }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
            </div>
            <FloatingIcons icons={[Sparkles, Star, Briefcase, GraduationCap]} className="opacity-80" />
          </motion.div>
        </div>
      )}

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        userData={userData}
        template={selectedTemplate}
        colorScheme={colorScheme}
      />

      {/* Fullscreen Preview Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fullscreen Header */}
            <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-md border-b border-white/10">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Full Preview</span>
                <Badge variant="outline" className="text-white border-white/30">
                  {selectedTemplate}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10"
                  onClick={handleDownloadZip}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download ZIP
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10"
                  onClick={() => handleExport("link")}
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share Link
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  onClick={() => setIsFullscreen(false)}
                  title="Close (ESC)"
                >
                  <CloseIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Fullscreen Content */}
            <div className="flex-1 overflow-auto p-8">
              <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-2xl">
                <PortfolioPreview userData={getDummyData()} template={selectedTemplate} colorScheme={colorScheme} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
