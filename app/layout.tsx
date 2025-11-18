import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "eCollab - Inovação e Sustentabilidade",
  description: "Transforming ideas into sustainable solutions through collaboration",
  keywords: ["innovation", "sustainability", "collaboration", "technology"],
  authors: [{ name: "eCollab" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: "eCollab",
    description: "Transforming ideas into sustainable solutions through collaboration",
    siteName: "eCollab",
  },
  twitter: {
    card: "summary_large_image",
    title: "eCollab",
    description: "Transforming ideas into sustainable solutions through collaboration",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

