"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Mail, Phone, ExternalLink, Github, MapPin, Calendar, Award, 
  Briefcase, GraduationCap, Code, Star, Sparkles, Trophy, 
  Target, Zap, Heart, Rocket, TrendingUp, Users, Lightbulb,
  CheckCircle, ArrowRight, Globe, Linkedin
} from "lucide-react"

interface TemplateProps {
  userData: any
  colorScheme: any
}

// Helper function to format dates
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

// Pro-01: Minimal Focus - Professional Clean Layout
export function ProfessionalMinimalTemplate({ userData, colorScheme }: TemplateProps) {
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        {[Briefcase, TrendingUp, Award, Target, Star].map((Icon, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -30, 0], 
              x: [0, 15, 0],
              rotate: [0, 360] 
            }}
            transition={{ 
              duration: 8 + i * 2, 
              repeat: Infinity,
              delay: i * 0.5 
            }}
            className="absolute"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`
            }}
          >
            <Icon size={40 + i * 5} />
          </motion.div>
        ))}
      </div>

      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white px-12 py-16"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: colorScheme.accent }}
        />

        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative z-10"
        >
          <motion.h1 
            className="text-6xl font-bold mb-4"
            whileHover={{ scale: 1.02 }}
            style={{ color: colorScheme.accent }}
          >
            {userData.fullName || "Your Name"}
          </motion.h1>
          
          <motion.p 
            className="text-2xl mb-6 text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {userData.title || "Professional Title"}
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {userData.email && (
              <motion.div 
                whileHover={{ scale: 1.05, y: -3 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-lg hover:bg-white/20 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">{userData.email}</span>
              </motion.div>
            )}
            {userData.phone && (
              <motion.div 
                whileHover={{ scale: 1.05, y: -3 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-lg hover:bg-white/20 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">{userData.phone}</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="px-12 py-12 space-y-12 relative">
        {/* Professional Summary */}
        {userData.summary && (
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${colorScheme.primary}20` }}
              >
                <Sparkles className="w-7 h-7" style={{ color: colorScheme.primary }} />
              </motion.div>
              <h2 className="text-4xl font-bold" style={{ color: colorScheme.primary }}>
                Professional Summary
              </h2>
            </div>
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed pl-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {userData.summary}
            </motion.p>
          </motion.section>
        )}

        {/* Experience Section */}
        {userData.experience?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${colorScheme.secondary}20` }}
              >
                <Briefcase className="w-7 h-7" style={{ color: colorScheme.secondary }} />
              </motion.div>
              <h2 className="text-4xl font-bold" style={{ color: colorScheme.primary }}>
                Experience
              </h2>
            </div>

            <div className="space-y-8 pl-16">
              {userData.experience.map((exp: any, index: number) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="relative border-l-4 pl-8 pb-8 group"
                  style={{ borderColor: colorScheme.secondary }}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="absolute -left-3 top-0 w-6 h-6 rounded-full border-4 border-white"
                    style={{ backgroundColor: colorScheme.secondary }}
                  />

                  <motion.div
                    className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl shadow-md group-hover:shadow-xl transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-2xl font-bold" style={{ color: colorScheme.primary }}>
                          {exp.position}
                        </h3>
                        <p className="text-lg text-gray-600 font-semibold mt-1">{exp.company}</p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="px-4 py-2 rounded-full text-sm font-medium"
                        style={{ 
                          backgroundColor: `${colorScheme.accent}20`,
                          color: colorScheme.accent 
                        }}
                      >
                        {getDateRange(exp.startDate, exp.endDate, exp.current)}
                      </motion.div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Skills Section */}
        {userData.skills?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${colorScheme.accent}20` }}
              >
                <Code className="w-7 h-7" style={{ color: colorScheme.accent }} />
              </motion.div>
              <h2 className="text-4xl font-bold" style={{ color: colorScheme.primary }}>
                Core Competencies
              </h2>
            </div>

            <div className="flex flex-wrap gap-4 pl-16">
              {userData.skills.map((skill: string, index: number) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.15, y: -8 }}
                >
                  <Badge
                    className="px-5 py-3 text-base font-semibold shadow-lg cursor-pointer"
                    style={{ 
                      backgroundColor: colorScheme.primary,
                      color: 'white'
                    }}
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Education */}
        {userData.education?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${colorScheme.primary}20` }}
              >
                <GraduationCap className="w-7 h-7" style={{ color: colorScheme.primary }} />
              </motion.div>
              <h2 className="text-4xl font-bold" style={{ color: colorScheme.primary }}>
                Education
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pl-16">
              {userData.education.map((edu: any, index: number) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border-2 transition-all"
                  style={{ borderColor: `${colorScheme.secondary}40` }}
                >
                  <h3 className="text-xl font-bold mb-2" style={{ color: colorScheme.primary }}>
                    {edu.degree}
                  </h3>
                  <p className="text-gray-600 font-medium">{edu.field}</p>
                  <p className="text-gray-500 text-sm mt-2">{edu.institution}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{edu.graduationYear}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Projects */}
        {userData.projects?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${colorScheme.accent}20` }}
              >
                <Rocket className="w-7 h-7" style={{ color: colorScheme.accent }} />
              </motion.div>
              <h2 className="text-4xl font-bold" style={{ color: colorScheme.primary }}>
                Key Projects
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pl-16">
              {userData.projects.map((project: any, index: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full border-2 hover:border-opacity-100 shadow-xl hover:shadow-2xl transition-all" style={{ borderColor: `${colorScheme.secondary}60` }}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold" style={{ color: colorScheme.primary }}>
                          {project.name}
                        </h3>
                        <motion.div 
                          whileHover={{ rotate: 360, scale: 1.3 }} 
                          transition={{ duration: 0.5 }}
                        >
                          <Trophy className="w-6 h-6" style={{ color: colorScheme.accent }} />
                        </motion.div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                      
                      {project.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech: string) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex gap-3 mt-4">
                        {project.url && (
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-white transition-all">
                              <ExternalLink className="w-3 h-3 mr-2" />
                              Live Demo
                            </Button>
                          </motion.div>
                        )}
                        {project.github && (
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Button size="sm" variant="outline" className="group-hover:bg-secondary group-hover:text-white transition-all">
                              <Github className="w-3 h-3 mr-2" />
                              Source
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}

// Pro-02: Modern Blocks - Bold Modular Design
export function ProfessionalModernTemplate({ userData, colorScheme }: TemplateProps) {
  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: colorScheme.primary }}
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          style={{ background: colorScheme.accent }}
        />
      </div>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 px-12 py-24 text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-full shadow-lg" style={{ backgroundColor: `${colorScheme.accent}20` }}>
              <Star className="w-5 h-5" style={{ color: colorScheme.accent }} />
              <span className="font-semibold" style={{ color: colorScheme.accent }}>Professional Portfolio</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-8xl font-black mb-6 tracking-tight"
            style={{ color: colorScheme.primary }}
            whileHover={{ scale: 1.03 }}
          >
            {userData.fullName || "YOUR NAME"}
          </motion.h1>

          <motion.div
            className="inline-block px-10 py-4 rounded-2xl text-2xl font-bold text-white shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})` }}
            whileHover={{ scale: 1.1, rotate: -1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {userData.title || "Professional Title"}
          </motion.div>

          <motion.div
            className="flex justify-center gap-6 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {userData.email && (
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-2 bg-white px-6 py-4 rounded-xl shadow-lg"
              >
                <Mail className="w-5 h-5" style={{ color: colorScheme.primary }} />
                <span style={{ color: colorScheme.primary }}>{userData.email}</span>
              </motion.div>
            )}
            {userData.phone && (
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-2 bg-white px-6 py-4 rounded-xl shadow-lg"
              >
                <Phone className="w-5 h-5" style={{ color: colorScheme.primary }} />
                <span style={{ color: colorScheme.primary }}>{userData.phone}</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="relative z-10 px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
          {/* About Card - Spans 2 columns */}
          {userData.summary && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              className="md:col-span-2 bg-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="p-4 rounded-2xl"
                  style={{ backgroundColor: `${colorScheme.primary}20` }}
                >
                  <Sparkles className="w-8 h-8" style={{ color: colorScheme.primary }} />
                </motion.div>
                <h2 className="text-3xl font-black">About Me</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{userData.summary}</p>
            </motion.div>
          )}

          {/* Experience Cards */}
          {userData.experience?.slice(0, 2).map((exp: any, index: number) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
            >
              <motion.div
                className="p-3 rounded-xl inline-block mb-4"
                style={{ backgroundColor: `${colorScheme.secondary}20` }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Briefcase className="w-7 h-7" style={{ color: colorScheme.secondary }} />
              </motion.div>
              
              <h3 className="text-xl font-bold mb-2" style={{ color: colorScheme.primary }}>
                {exp.position}
              </h3>
              <p className="text-gray-600 font-semibold mb-2">{exp.company}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4" />
                {getDateRange(exp.startDate, exp.endDate, exp.current)}
              </div>
              {exp.description && (
                <p className="text-gray-600 text-sm line-clamp-3">{exp.description}</p>
              )}
            </motion.div>
          ))}

          {/* Skills Card - Spans 2 columns */}
          {userData.skills?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              className="md:col-span-2 bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="p-4 rounded-2xl"
                  style={{ backgroundColor: `${colorScheme.accent}20` }}
                >
                  <Code className="w-8 h-8" style={{ color: colorScheme.accent }} />
                </motion.div>
                <h2 className="text-3xl font-black">Skills & Expertise</h2>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {userData.skills.map((skill: string, index: number) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.02 }}
                    whileHover={{ scale: 1.2, rotate: 3 }}
                    className="px-5 py-3 rounded-xl font-bold text-white shadow-lg cursor-pointer"
                    style={{ background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})` }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Education Card */}
          {userData.education?.[0] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: -1 }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
            >
              <motion.div
                className="p-3 rounded-xl inline-block mb-4"
                style={{ backgroundColor: `${colorScheme.primary}20` }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <GraduationCap className="w-7 h-7" style={{ color: colorScheme.primary }} />
              </motion.div>
              
              <h3 className="text-xl font-bold mb-2" style={{ color: colorScheme.primary }}>
                {userData.education[0].degree}
              </h3>
              <p className="text-gray-600 font-medium">{userData.education[0].field}</p>
              <p className="text-gray-500 text-sm mt-2">{userData.education[0].institution}</p>
              <p className="text-gray-400 text-xs mt-2">{userData.education[0].graduationYear}</p>
            </motion.div>
          )}

          {/* Project Cards */}
          {userData.projects?.slice(0, 3).map((project: any, index: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: colorScheme.primary }}>
                  {project.name}
                </h3>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <Rocket className="w-6 h-6" style={{ color: colorScheme.accent }} />
                </motion.div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
              
              {project.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech: string) => (
                    <span key={tech} className="text-xs px-3 py-1 rounded-lg bg-gray-200 text-gray-700 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Pro-03: Creative Wave - Asymmetric Dynamic Layout
export function ProfessionalCreativeTemplate({ userData, colorScheme }: TemplateProps) {
  return (
    <div className="max-w-6xl mx-auto bg-white overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? colorScheme.primary : colorScheme.accent,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Asymmetric Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        <div className="grid md:grid-cols-5 gap-0">
          {/* Left Column */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 bg-gradient-to-br p-12 flex flex-col justify-center relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})` }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-20 bg-white blur-3xl"
            />
            
            <motion.h1
              className="text-6xl font-black text-white mb-6 relative z-10"
              whileHover={{ scale: 1.05 }}
            >
              {userData.fullName || "Your Name"}
            </motion.h1>
            
            <motion.p
              className="text-2xl text-white/90 mb-8 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {userData.title || "Title"}
            </motion.p>
            
            <div className="space-y-4 relative z-10">
              {userData.email && (
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-3 text-white/90"
                >
                  <Mail className="w-5 h-5" />
                  <span>{userData.email}</span>
                </motion.div>
              )}
              {userData.phone && (
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-3 text-white/90"
                >
                  <Phone className="w-5 h-5" />
                  <span>{userData.phone}</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-3 p-12 bg-gradient-to-br from-gray-50 to-white"
          >
            {userData.summary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    style={{ color: colorScheme.accent }}
                  >
                    <Zap className="w-6 h-6" />
                  </motion.div>
                  <h2 className="text-2xl font-bold" style={{ color: colorScheme.primary }}>
                    Profile
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">{userData.summary}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Wavy Divider */}
      <svg viewBox="0 0 1200 60" className="w-full" style={{ fill: colorScheme.primary, opacity: 0.1 }}>
        <motion.path
          d="M0,20 Q300,40 600,20 T1200,20 L1200,60 L0,60 Z"
          animate={{ d: ["M0,20 Q300,40 600,20 T1200,20 L1200,60 L0,60 Z", "M0,30 Q300,10 600,30 T1200,30 L1200,60 L0,60 Z", "M0,20 Q300,40 600,20 T1200,20 L1200,60 L0,60 Z"] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </svg>

      {/* Main Content */}
      <div className="px-12 py-12 space-y-16">
        {/* Experience with Timeline */}
        {userData.experience?.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl font-black mb-12 flex items-center gap-4"
              style={{ color: colorScheme.primary }}
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <TrendingUp className="w-10 h-10" />
              </motion.div>
              Career Journey
            </motion.h2>

            <div className="space-y-12">
              {userData.experience.map((exp: any, index: number) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                      className={`${index % 2 === 1 ? 'md:order-2' : ''}`}
                    >
                      <div
                        className="p-8 rounded-2xl shadow-xl"
                        style={{ background: `linear-gradient(135deg, ${colorScheme.secondary}20, ${colorScheme.accent}20)` }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Briefcase className="w-6 h-6" style={{ color: colorScheme.primary }} />
                          </motion.div>
                          <h3 className="text-2xl font-bold" style={{ color: colorScheme.primary }}>
                            {exp.position}
                          </h3>
                        </div>
                        <p className="text-lg font-semibold text-gray-700 mb-2">{exp.company}</p>
                        <p className="text-sm text-gray-500 mb-4">
                          {getDateRange(exp.startDate, exp.endDate, exp.current)}
                        </p>
                        {exp.description && (
                          <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                        )}
                      </div>
                    </motion.div>

                    <div className={`flex justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
                        style={{ background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.accent})` }}
                      >
                        <CheckCircle className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Skills Constellation */}
        {userData.skills?.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl font-black mb-12 flex items-center gap-4"
              style={{ color: colorScheme.primary }}
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <Target className="w-10 h-10" />
              </motion.div>
              Expertise
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-4">
              {userData.skills.map((skill: string, index: number) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.2, rotate: 5, y: -10 }}
                  className="relative"
                >
                  <div
                    className="px-6 py-3 rounded-2xl font-bold text-white shadow-xl cursor-pointer"
                    style={{ background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})` }}
                  >
                    {skill}
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: colorScheme.accent, opacity: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Projects Gallery */}
        {userData.projects?.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl font-black mb-12 flex items-center gap-4"
              style={{ color: colorScheme.primary }}
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <Lightbulb className="w-10 h-10" />
              </motion.div>
              Featured Work
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.projects.map((project: any, index: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -15 }}
                  className="group relative"
                >
                  <Card className="h-full border-2 shadow-xl hover:shadow-2xl transition-all overflow-hidden" style={{ borderColor: `${colorScheme.secondary}40` }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${colorScheme.primary}10, ${colorScheme.accent}10)` }} />
                    
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold" style={{ color: colorScheme.primary }}>
                          {project.name}
                        </h3>
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.3 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Rocket className="w-6 h-6" style={{ color: colorScheme.accent }} />
                        </motion.div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>

                      {project.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech: string) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        {project.url && (
                          <motion.div whileHover={{ scale: 1.1 }}>
                            <Button size="sm" variant="outline">
                              <ArrowRight className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}

// Export all professional templates
export const professionalTemplates = {
  "pro-01": ProfessionalMinimalTemplate,
  "pro-02": ProfessionalModernTemplate,
  "pro-03": ProfessionalCreativeTemplate,
}
