import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

export default async function About() {
  // Read the markdown file
  const markdownPath = path.join(process.cwd(), 'app', 'about', 'about.md');
  const source = fs.readFileSync(markdownPath, 'utf8');
  
  // Compile the MDX
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">About Us</h1>
        <div className="prose prose-lg max-w-none text-foreground">
          <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}