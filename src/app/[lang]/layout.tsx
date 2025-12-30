import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { LocaleProvider } from "@/i18n";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { getDictionary } from "@/i18n/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

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

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const { lang } = params;
  
  const messages = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <LocaleProvider locale={lang} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {props.children}
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}