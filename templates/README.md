# Templates directory

This folder is where you can add or replace portfolio templates by category.

Structure:
- `templates/freshers` — templates aimed at fresh graduates or interns
- `templates/professional` — templates for experienced professionals
- `templates/business` — templates for business/agency style portfolios

How to add a template
1. Create a new component file inside the category folder, for example:
   - `templates/professional/pro-04-professional-edge.tsx`
2. Your component should accept the same props used by existing templates:

   ```tsx path=null start=null
   interface TemplateProps {
     userData: {
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
         gpa?: string
       }>
       skills: string[]
       projects: Array<{
         id: string
         name: string
         description: string
         technologies: string[]
         url?: string
         github?: string
       }>
     }
     colorScheme: { primary: string; secondary: string; accent: string }
   }
   ```

3. Export your component as default (recommended) and/or a named export.
4. Wire it into the app by updating your registry/preview mapping (for example, `components/templates/*` or `components/portfolio-preview.tsx`) so that a template ID (e.g. `pro-04`) points to your new component.

Notes
- This repo already includes examples in `components/templates`. You can keep them there, or migrate them under `templates/*` and update imports accordingly.
- Keep assets (images, svgs) in `public/` or colocated beside the component.
- For Git tracking of empty dirs, `.gitkeep` files are included.
