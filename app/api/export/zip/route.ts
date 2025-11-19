import { NextRequest, NextResponse } from "next/server"
import JSZip from "jszip"
import { promises as fs } from "fs"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    const { template } = await req.json()
    if (!template || typeof template !== "string") {
      return NextResponse.json({ error: "template is required" }, { status: 400 })
    }

    const projectRoot = process.cwd()
    const filesToInclude: { diskPath: string; zipPath: string }[] = []

    // Always include the preview wrapper so users can render the template easily
    filesToInclude.push({
      diskPath: path.join(projectRoot, "components", "portfolio-preview.tsx"),
      zipPath: "components/portfolio-preview.tsx",
    })

    if (template.startsWith("pro-")) {
      filesToInclude.push({
        diskPath: path.join(projectRoot, "components", "templates", "professional-templates.tsx"),
        zipPath: "components/templates/professional-templates.tsx",
      })
    } else if (template.startsWith("fresher-")) {
      filesToInclude.push({
        diskPath: path.join(projectRoot, "components", "templates", "fresher-templates.tsx"),
        zipPath: "components/templates/fresher-templates.tsx",
      })
    } else if (template.startsWith("biz-")) {
      // If business templates exist, include their registry file; fallback to professional for now
      filesToInclude.push({
        diskPath: path.join(projectRoot, "components", "templates", "professional-templates.tsx"),
        zipPath: "components/templates/professional-templates.tsx",
      })
    } else {
      // Default minimal/modern live previews are inside portfolio-preview.tsx already
    }

    // Add a minimal README for guidance
    const readme = `# Exported Template: ${template}\n\nThis zip contains the React components needed to render the selected template.\n\nIncluded files:\n${filesToInclude.map(f => `- ${f.zipPath}`).join("\n")}\n\nUsage:\n- Import the appropriate component from the exported file and render it with your userData and colorScheme props.\n- See components/portfolio-preview.tsx for examples of how templates are wired.\n`

    const zip = new JSZip()

    for (const f of filesToInclude) {
      try {
        const content = await fs.readFile(f.diskPath, "utf8")
        zip.file(f.zipPath, content)
      } catch (e) {
        // Skip missing files gracefully
      }
    }

    zip.file("README.md", readme)

    const blob = await zip.generateAsync({ type: "nodebuffer" })
    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=template-${template}.zip`,
      },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Internal error" }, { status: 500 })
  }
}
