import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Ishara Lakshitha — Software Engineer & DevOps",
  description:
    "Software Engineer & DevOps at KingIT Solutions. Building scalable cloud systems. AWS, Node.js, Next.js, Docker, PostgreSQL.",
  keywords: ["Software Engineer", "DevOps", "AWS", "Node.js", "Sri Lanka", "KingIT"],
  openGraph: {
    title: "Ishara Lakshitha — Software Engineer & DevOps",
    description: "Building scalable systems that last.",
    url: "https://isharalakshitha.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@isharax9",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
