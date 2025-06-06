
export const metadata = {
  title: "Call Now for Windows | Expert Window Installation & Replacement",
  description: "Need windows replaced or repaired? Call (866) 204-3787 now for instant quote. Skip the questions, talk to a specialist, same-day service available.",
  keywords: ["windows", "window replacement", "window installation", "window repair", "call now", "instant quote"],
};

import Link from 'next/link';

export default function WindowsCallPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Remodel MONSTER</h2>
          <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
            ← Back to Form
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Need Windows Replaced or Repaired?
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-2">
              Call Now for Instant Quote!
            </p>
            <p className="text-lg text-gray-600">
              Professional Window Installation & Repair
            </p>
          </div>

          {/* Main Call Button */}
          <div className="mb-8">
            <a 
              href="tel:+18662043787" 
              className="block w-full bg-green-600 hover:bg-green-700 text-white text-2xl font-bold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-center"
            >
              📞 Call (866) 204-3787
            </a>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Why Call Instead of Form?
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-green-600 text-xl mr-3">✓</span>
                <span className="text-gray-700">Skip the Questions</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 text-xl mr-3">✓</span>
                <span className="text-gray-700">Talk to Window Specialist</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 text-xl mr-3">✓</span>
                <span className="text-gray-700">Same-Day Service Available</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 text-xl mr-3">✓</span>
                <span className="text-gray-700">Instant Price Quote</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 text-xl mr-3">✓</span>
                <span className="text-gray-700">Licensed & Insured Contractors</span>
              </div>
            </div>
          </div>

          {/* Urgency Section */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-orange-900 mb-3 text-center">
              🔥 Limited Time Offers Available
            </h3>
            <p className="text-orange-800 text-center">
              Call now to discuss current promotions and seasonal discounts on window replacement projects.
            </p>
          </div>

          {/* Secondary Call Button */}
          <div className="mb-8">
            <a 
              href="tel:+18662043787" 
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-center"
            >
              📱 Tap to Call (866) 204-3787
            </a>
          </div>

          {/* Services */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Window Services We Provide
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
              <div>• Window Replacement</div>
              <div>• Window Installation</div>
              <div>• Window Repair</div>
              <div>• Glass Replacement</div>
              <div>• Energy Efficient Windows</div>
              <div>• Custom Windows</div>
              <div>• Storm Windows</div>
              <div>• Emergency Repair</div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center text-sm text-gray-600 space-y-2">
            <p>🏆 Over 10,000 Windows Installed</p>
            <p>⭐ 4.8/5 Star Customer Rating</p>
            <p>🛡️ Licensed, Bonded & Insured</p>
            <p>📞 Available 7 Days a Week</p>
          </div>

          {/* Final Call to Action */}
          <div className="mt-8 text-center">
            <p className="text-lg font-medium text-gray-900 mb-4">
              Ready to Transform Your Home?
            </p>
            <a 
              href="tel:+18662043787" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              🚀 Call (866) 204-3787 Now
            </a>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 bg-secondary text-black" data-theme="light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="font-bold text-xl mb-2 text-black">iClick Interactive</h3>
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
    </div>
  );
}