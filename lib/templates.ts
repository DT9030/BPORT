import fs from 'fs';
import path from 'path';

export interface TemplateConfig {
  name: string;
  description: string;
  category: string;
  preview: string;
  author: string;
  version: string;
  sections: string[];
}

export interface Template {
  id: string;
  config: TemplateConfig;
  component: React.ComponentType<any>;
}

export async function getTemplates(category?: string): Promise<Template[]> {
  const templatesDir = path.join(process.cwd(), 'app', 'templates');
  const categories = category ? [category] : ['fresher', 'professional', 'business'];
  const templates: Template[] = [];

  for (const cat of categories) {
    const categoryPath = path.join(templatesDir, cat);
    if (!fs.existsSync(categoryPath)) continue;

    const templateDirs = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter(dir => dir.isDirectory())
      .map(dir => dir.name);

    for (const templateDir of templateDirs) {
      const templatePath = path.join(categoryPath, templateDir);
      const configPath = path.join(templatePath, 'config.json');
      const componentPath = path.join(templatePath, 'template.tsx');

      if (fs.existsSync(configPath) && fs.existsSync(componentPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as TemplateConfig;
        const component = (await import(`@/app/templates/${cat}/${templateDir}/template`)).default;
        
        templates.push({
          id: `${cat}/${templateDir}`,
          config,
          component
        });
      }
    }
  }

  return templates;
}

export async function getTemplateById(id: string): Promise<Template | null> {
  const [category, templateName] = id.split('/');
  if (!category || !templateName) return null;

  const templatePath = path.join(process.cwd(), 'app', 'templates', category, templateName);
  const configPath = path.join(templatePath, 'config.json');
  const componentPath = path.join(templatePath, 'template.tsx');

  if (!fs.existsSync(configPath) || !fs.existsSync(componentPath)) {
    return null;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as TemplateConfig;
  const component = (await import(`@/app/templates/${category}/${templateName}/template`)).default;

  return {
    id,
    config,
    component
  };
}
