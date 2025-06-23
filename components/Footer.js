import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-10 bg-secondary text-black" data-theme="light">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="font-bold text-xl mb-2 text-black">Lead Plateau</h3>
            <p className="text-black/60">© 2025 All Rights Reserved</p>
            <div className="mt-4 text-xs text-black/50 max-w-md">
              <p>This Website is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and This Website does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on This Website.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-4 text-black">Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-black/60 hover:text-black">Home</Link></li>
                <li><Link href="/about" className="text-black/60 hover:text-black">About</Link></li>
                <li><Link href="/contact" className="text-black/60 hover:text-black">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-black">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-black/60 hover:text-black">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-black/60 hover:text-black">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}