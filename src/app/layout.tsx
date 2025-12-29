import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ComplaintHub - Share Your Experience, Help Others",
  description: "Consumer complaint platform. Share your experience and help others make better choices.",
  keywords: ["complaints", "consumer", "reviews", "help"],
  authors: [{ name: "ComplaintHub" }],
  openGraph: {
    title: "ComplaintHub - Share Your Experience, Help Others",
    description: "Consumer complaint platform. Share your experience and help others make better choices.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <LocaleProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
