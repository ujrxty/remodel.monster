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
        <link rel="dns-prefetch" href="//connect.facebook.net" />
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

        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '807212798789334');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=807212798789334&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
