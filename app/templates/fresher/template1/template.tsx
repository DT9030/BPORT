import React from 'react';
import { UserData } from '@/types';

interface FresherTemplateProps {
  data: UserData;
  colorScheme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const FresherTemplate: React.FC<FresherTemplateProps> = ({ data, colorScheme = {
  primary: '#3b82f6',
  secondary: '#10b981',
  accent: '#8b5cf6'
} }) => {
  return (
    <div className="min-h-screen p-8" style={{ color: '#1f2937' }}>
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2" style={{ color: colorScheme.primary }}>
          {data.fullName}
        </h1>
        <p className="text-xl text-gray-600">{data.title}</p>
        <div className="flex justify-center gap-4 mt-2">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>• {data.phone}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 pb-2 border-b" style={{ borderColor: colorScheme.primary }}>
            Summary
          </h2>
          <p className="text-gray-700">{data.summary}</p>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 pb-2 border-b" style={{ borderColor: colorScheme.primary }}>
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold" style={{ color: colorScheme.primary }}>
                    {edu.institution}
                  </h3>
                  <span className="text-gray-600">
                    {edu.graduationYear}
                  </span>
                </div>
                <p className="text-gray-700">
                  {edu.degree} in {edu.field}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 pb-2 border-b" style={{ borderColor: colorScheme.primary }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full text-sm"
                style={{ 
                  backgroundColor: `${colorScheme.secondary}20`,
                  color: colorScheme.secondary
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 pb-2 border-b" style={{ borderColor: colorScheme.primary }}>
            Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-lg" style={{ color: colorScheme.primary }}>
                  {project.name}
                </h3>
                <p className="text-gray-700 mt-1">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="text-xs px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: `${colorScheme.accent}20`,
                          color: colorScheme.accent
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default FresherTemplate;
