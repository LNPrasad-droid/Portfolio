import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const description =
  "Lakshmi Narasimha Prasad (Leo): AI/ML engineer in Bengaluru building Earth-observation ML on Sentinel and Landsat data, plus applied NLP and RAG systems.";

export const metadata: Metadata = {
  title: "Lakshmi Narasimha Prasad · AI/ML Engineer, Earth Observation",
  description,
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Lakshmi Narasimha Prasad · AI/ML Engineer",
    description,
    type: "website",
    url: "https://portfolioleo01.netlify.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${archivo.variable} ${plexMono.variable}`}>
      <body className="min-h-full bg-ink text-text">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
