'use client';

import { useState, useEffect } from 'react';
import { getTemplates } from '@/lib/templates';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function TemplateSelector({ onSelectTemplate }: { onSelectTemplate: (templateId: string) => void }) {
  const [templates, setTemplates] = useState<Record<string, any[]>>({});
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const loadTemplates = async () => {
      const allTemplates = await getTemplates();
      const grouped = allTemplates.reduce((acc, template) => {
        if (!acc[template.config.category]) {
          acc[template.config.category] = [];
        }
        acc[template.config.category].push(template);
        return acc;
      }, {} as Record<string, any[]>);
      setTemplates(grouped);
    };

    loadTemplates();
  }, []);

  const allTemplates = Object.values(templates).flat();
  const categories = Object.keys(templates);

  const renderTemplateCard = (template: any) => (
    <Card 
      key={template.id}
      className={`relative overflow-hidden transition-all hover:shadow-lg cursor-pointer border-2 ${
        selectedTemplate === template.id ? 'border-primary' : 'border-transparent'
      }`}
      onClick={() => setSelectedTemplate(template.id)}
    >
      <div className="relative h-48 bg-muted">
        {template.config.preview ? (
          <Image
            src={template.config.preview}
            alt={template.config.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted">
            <span className="text-muted-foreground">Preview not available</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-500" />
            Popular
          </Badge>
        </div>
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{template.config.name}</CardTitle>
            <CardDescription className="text-sm line-clamp-2">
              {template.config.description}
            </CardDescription>
          </div>
          {selectedTemplate === template.id && (
            <div className="bg-primary text-primary-foreground rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {template.config.features?.map((feature: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
      </CardHeader>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Choose a Template</h1>
        <p className="text-muted-foreground">
          Select a template that best fits your needs. You can customize it later.
        </p>
      </div>

      <Tabs 
        defaultValue="all" 
        className="w-full"
        onValueChange={setActiveTab}
      >
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="all">All Templates</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTemplates.map(renderTemplateCard)}
          </div>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates[category].map(renderTemplateCard)}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-end gap-4">
        <Button variant="outline">Back</Button>
        <Button 
          onClick={() => selectedTemplate && onSelectTemplate(selectedTemplate)}
          disabled={!selectedTemplate}
          className="gap-2"
        >
          Continue with Selected Template
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
