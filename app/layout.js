/**
 * Root layout component
 * Generated from configuration: home improvement online
 */
import "./globals.css";
import "./prose.css";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, ModeToggle } from "@/components/theme-provider";
import MonsterPeekaboo from "@/components/MonsterPeekaboo";


export const metadata = {
  title: "Remodel MONSTER",
  description: "Get affordable and top-quality home improvement services online. Available nationwide, we offer solutions to transform your home and add value.",
  
  keywords: ["Home Improvement","Online Services","Affordable","Nationwide","Quality"],
  
  icons: {
    icon: [
      { url: '/monster-favicon.webp', type: 'image/webp' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    shortcut: '/monster-favicon.webp',
    apple: '/monster-favicon.webp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical LCP image */}
        <link 
          rel="preload" 
          as="image" 
          href="/uploads/hero-landscape-1920.webp" 
          type="image/webp"
          fetchPriority="high"
        />
        <link 
          rel="preload" 
          as="image" 
          href="/uploads/hero-portrait-768.webp" 
          type="image/webp"
          media="(max-width: 768px)"
          fetchPriority="high"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//leads-inst523-client.phonexa.com" />
        <link rel="dns-prefetch" href="//api.trustedform.com" />
        {/* Preconnect for critical third-parties */}
        <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="//leads-inst523-client.phonexa.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('ui-theme') || 'light';
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider defaultTheme="light">
          <Toaster position="top-center" />
          {children}
          <ModeToggle />
          <MonsterPeekaboo />
        </ThemeProvider>
        
        {/* TrustedForm Lead Certification */}
        <Script
          id="trustedform-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var tf = document.createElement('script');
                tf.type = 'text/javascript';
                tf.async = true;
                tf.src = ("https:" == document.location.protocol ? 'https' : 'http') +
                  '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=' +
                  new Date().getTime() + Math.random();
                var s = document.getElementsByTagName('script')[0]; 
                s.parentNode.insertBefore(tf, s);
              })();
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src='https://api.trustedform.com/ns.gif' alt='' />
        </noscript>
      </body>
    </html>
  );
}
