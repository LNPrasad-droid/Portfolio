import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leo's Portfolio — AI Engineer",
  description:
    "Lakshmi Narasimha Prasad (Leo) — AI Engineer specializing in Generative AI, Agentic AI, Geospatial AI, Computer Vision, and Full Stack AI Development.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-bg-primary text-text-primary">{children}</body>
    </html>
  );
}
