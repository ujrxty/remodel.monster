/**
 * Root layout component
 */
import "./globals.css";
import "./prose.css";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, ModeToggle } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


export const metadata = {
  title: "Remodel Monster | Premium Home Improvement Services",
  description: "Connect with top-rated home improvement professionals near you. Windows, roofing, bathroom, HVAC and more. Free qualification in 60 seconds.",

  keywords: ["Home Improvement","Remodeling","Contractors","Windows","Roofing","HVAC","Bathroom"],

  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
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
          <Navbar />
          <Toaster position="top-center" />
          {children}
          <Footer />
          <ModeToggle />
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
