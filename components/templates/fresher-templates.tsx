"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, ExternalLink, Github, MapPin, Calendar, Award, Briefcase, GraduationCap, Code, Star, Sparkles, Trophy, Target, Zap, Heart, Rocket } from "lucide-react"

interface TemplateProps {
  userData: any
  colorScheme: any
}

// Fresher-01: Minimal Focus Template
export function FresherMinimalTemplate({ userData, colorScheme }: TemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 shadow-2xl rounded-2xl overflow-hidden">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-20 left-10">
          <GraduationCap size={40} />
        </motion.div>
        <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-40 right-20">
          <Code size={35} />
        </motion.div>
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-20 left-1/4">
          <Star size={30} />
        </motion.div>
      </div>

      {/* Header with gradient and animation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-8 py-16 text-center overflow-hidden"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
          style={{ background: colorScheme.primary, opacity: 0.2 }}
        />
        
        <motion.h1 
          className="text-5xl font-bold mb-3 relative z-10"
          style={{ color: colorScheme.primary }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {userData.fullName || "Your Name"}
        </motion.h1>
        <motion.p 
          className="text-2xl text-gray-600 mb-6 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {userData.title || "Your Professional Title"}
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-6 text-sm relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {userData.email && (
            <motion.div 
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              style={{ color: colorScheme.primary }}
            >
              <Mail className="w-4 h-4" />
              {userData.email}
            </motion.div>
          )}
          {userData.phone && (
            <motion.div 
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              style={{ color: colorScheme.primary }}
            >
              <Phone className="w-4 h-4" />
              {userData.phone}
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <div className="px-8 py-10 space-y-10 relative">
        {/* Summary */}
        {userData.summary && (
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                style={{ color: colorScheme.primary }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <h2 className="text-3xl font-bold" style={{ color: colorScheme.primary }}>About Me</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{userData.summary}</p>
          </motion.section>
        )}

        {/* Education */}
        {userData.education?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                style={{ color: colorScheme.primary }}
              >
                <GraduationCap className="w-6 h-6" />
              </motion.div>
              <h2 className="text-3xl font-bold" style={{ color: colorScheme.primary }}>Education</h2>
            </div>
            <div className="space-y-6">
              {userData.education.map((edu: any, index: number) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                  className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-l-4 transition-all"
                  style={{ borderColor: colorScheme.secondary }}
                >
                  <h3 className="text-xl font-bold">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-600 mt-1">{edu.institution}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Class of {edu.graduationYear}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Skills */}
        {userData.skills?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                style={{ color: colorScheme.primary }}
              >
                <Code className="w-6 h-6" />
              </motion.div>
              <h2 className="text-3xl font-bold" style={{ color: colorScheme.primary }}>Skills</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {userData.skills.map((skill: string, index: number) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <Badge
                    className="px-4 py-2 text-base font-medium shadow-md hover:shadow-lg transition-all"
                    style={{ 
                      backgroundColor: `${colorScheme.secondary}20`,
                      color: colorScheme.primary,
                      borderColor: colorScheme.secondary 
                    }}
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Projects */}
        {userData.projects?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                style={{ color: colorScheme.primary }}
              >
                <Rocket className="w-6 h-6" />
              </motion.div>
              <h2 className="text-3xl font-bold" style={{ color: colorScheme.primary }}>Projects</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {userData.projects.map((project: any, index: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full border-2 hover:border-opacity-100 transition-all duration-300 shadow-lg hover:shadow-2xl" style={{ borderColor: `${colorScheme.secondary}40` }}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold" style={{ color: colorScheme.primary }}>{project.name}</h3>
                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                          <Trophy className="w-5 h-5" style={{ color: colorScheme.accent }} />
                        </motion.div>
                      </div>
                      <p className="text-gray-700 text-sm mb-4 leading-relaxed">{project.description}</p>
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
                          <Button size="sm" variant="outline" className="group-hover:scale-105 transition-transform">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Demo
                          </Button>
                        )}
                        {project.github && (
                          <Button size="sm" variant="outline" className="group-hover:scale-105 transition-transform">
                            <Github className="w-3 h-3 mr-1" />
                            Code
                          </Button>
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

// Fresher-02: Modern Blocks Template
export function FresherModernTemplate({ userData, colorScheme }: TemplateProps) {
  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900">
      {/* Hero Section with Bold Typography */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl"
            style={{ background: colorScheme.primary }}
          />
          <motion.div 
            animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl"
            style={{ background: colorScheme.accent }}
          />
        </div>

        <div className="relative z-10 px-8 py-20 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.h1 
              className="text-7xl font-black mb-4 tracking-tight"
              style={{ color: colorScheme.primary }}
              whileHover={{ scale: 1.05 }}
            >
              {userData.fullName || "YOUR NAME"}
            </motion.h1>
            <motion.div 
              className="inline-block px-8 py-3 rounded-full text-xl font-bold text-white shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.accent})` }}
              whileHover={{ scale: 1.1, rotate: 2 }}
            >
              {userData.title || "Your Title"}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Grid Blocks Layout */}
      <div className="px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contact Block */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="col-span-full md:col-span-1 bg-white rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${colorScheme.primary}20` }}>
                <Mail className="w-6 h-6" style={{ color: colorScheme.primary }} />
              </div>
              <h3 className="text-xl font-bold">Contact</h3>
            </div>
            <div className="space-y-3">
              {userData.email && <p className="text-gray-700">{userData.email}</p>}
              {userData.phone && <p className="text-gray-700">{userData.phone}</p>}
            </div>
          </motion.div>

          {/* About Block */}
          {userData.summary && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02, rotate: -0.5 }}
              className="col-span-full md:col-span-2 bg-white rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${colorScheme.secondary}20` }}>
                  <Sparkles className="w-6 h-6" style={{ color: colorScheme.secondary }} />
                </div>
                <h3 className="text-2xl font-bold">About</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">{userData.summary}</p>
            </motion.div>
          )}

          {/* Education Blocks */}
          {userData.education?.map((edu: any, index: number) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${colorScheme.accent}20` }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <GraduationCap className="w-6 h-6" style={{ color: colorScheme.accent }} />
                </motion.div>
              </div>
              <h3 className="text-lg font-bold mb-2">{edu.degree}</h3>
              <p className="text-gray-600">{edu.field}</p>
              <p className="text-sm text-gray-500 mt-2">{edu.institution}</p>
              <p className="text-xs text-gray-400 mt-1">{edu.graduationYear}</p>
            </motion.div>
          ))}

          {/* Skills Block */}
          {userData.skills?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="col-span-full bg-white rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${colorScheme.primary}20` }}>
                  <Code className="w-6 h-6" style={{ color: colorScheme.primary }} />
                </div>
                <h3 className="text-2xl font-bold">Skills</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {userData.skills.map((skill: string, index: number) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="px-4 py-2 rounded-xl font-semibold text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})` }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Project Blocks */}
          {userData.projects?.map((project: any, index: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold" style={{ color: colorScheme.primary }}>{project.name}</h3>
                <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                  <Rocket className="w-5 h-5" style={{ color: colorScheme.accent }} />
                </motion.div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{project.description}</p>
              {project.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech: string) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600">
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

// Export all templates
export const fresherTemplates = {
  "fresher-01": FresherMinimalTemplate,
  "fresher-02": FresherModernTemplate,
  // Additional templates will be added in subsequent files
}
