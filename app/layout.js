/**
 * Root layout component
 * Generated from configuration: home improvement online
 */
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, ModeToggle } from "@/components/theme-provider";

// Load fonts from configuration

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Premium Home Improvement Services Online | Nationwide",
  description: "Get affordable and top-quality home improvement services online. Available nationwide, we offer solutions to transform your home and add value.",
  
  keywords: ["Home Improvement","Online Services","Affordable","Nationwide","Quality"],
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
      <body className={inter ? inter.className : ""} suppressHydrationWarning>
        <ThemeProvider defaultTheme="light">
          <Toaster position="top-center" />
          {children}
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}