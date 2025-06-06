import Link from 'next/link';

export default function PageHeader({ title }) {
  return (
    <div className="bg-card border-b border-border py-4 px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <Link 
          href="/" 
          className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all text-sm shadow-sm hover:-translate-y-0.5 active:translate-y-0.5"
        >
          ← Home
        </Link>
      </div>
    </div>
  );
}