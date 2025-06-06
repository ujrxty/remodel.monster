import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import PageHeader from "@/components/PageHeader";

export default async function Privacy() {
  // Read the markdown file
  const markdownPath = path.join(process.cwd(), 'app', 'privacy', 'privacy.md');
  const source = fs.readFileSync(markdownPath, 'utf8');
  
  // Compile the MDX
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true }
  });

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Privacy Policy" />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none text-foreground">
          <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}