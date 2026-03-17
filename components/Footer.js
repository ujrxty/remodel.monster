import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="max-w-sm">
            <h3 className="font-bold text-xl text-white mb-3 tracking-tight">Lead Plateau</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Connecting homeowners with trusted, licensed contractors for every home improvement need.
            </p>
            <p className="text-slate-500 text-xs">8 The Green Suite 4000, Dover, DE 19901</p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Navigate</h4>
              <ul className="space-y-2.5">
                <li><Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-slate-400 hover:text-white text-sm transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2.5">
                <li><Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <p className="text-slate-500 text-xs">
              &copy; {new Date().getFullYear()} Lead Plateau. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs max-w-2xl leading-relaxed">
              This website is a free service to assist homeowners in connecting with local service providers. All contractors are independent and this website does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
