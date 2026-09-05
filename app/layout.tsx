import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Verified hackathons, bootcamps, internships, and competitions for Saudi university students and fresh graduates.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <header className="border-b border-hairline">
          <div className="mx-auto max-w-3xl px-4 py-4">
            <Link
              href="/"
              className="text-base font-semibold text-ink transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-accent"
            >
              Opportunities
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
