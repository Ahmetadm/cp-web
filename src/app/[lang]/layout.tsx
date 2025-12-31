import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { LocaleProvider } from "@/i18n";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { getDictionary } from "@/i18n/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

const metropolis = localFont({
  src: [
    { path: "../fonts/Metropolis-Thin.otf", weight: "100", style: "normal" },
    { path: "../fonts/Metropolis-ThinItalic.otf", weight: "100", style: "italic" },
    { path: "../fonts/Metropolis-ExtraLight.otf", weight: "200", style: "normal" },
    { path: "../fonts/Metropolis-ExtraLightItalic.otf", weight: "200", style: "italic" },
    { path: "../fonts/Metropolis-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/Metropolis-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../fonts/Metropolis-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/Metropolis-RegularItalic.otf", weight: "400", style: "italic" },
    { path: "../fonts/Metropolis-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/Metropolis-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../fonts/Metropolis-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../fonts/Metropolis-SemiBoldItalic.otf", weight: "600", style: "italic" },
    { path: "../fonts/Metropolis-Bold.otf", weight: "700", style: "normal" },
    { path: "../fonts/Metropolis-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "../fonts/Metropolis-ExtraBold.otf", weight: "800", style: "normal" },
    { path: "../fonts/Metropolis-ExtraBoldItalic.otf", weight: "800", style: "italic" },
    { path: "../fonts/Metropolis-Black.otf", weight: "900", style: "normal" },
    { path: "../fonts/Metropolis-BlackItalic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-metropolis",
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
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;

  const messages = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${metropolis.className} ${metropolis.variable} antialiased`}>
        <LocaleProvider locale={lang} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <AuthProvider>
                {props.children}
              </AuthProvider>
            </QueryProvider>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}