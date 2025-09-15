// Portfolio update - 2024
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SaveContactButton from "@/components/SaveContactButton";
import CursorSpotlight from "@/components/CursorSpotlight";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gebin George - Cybersecurity Enthusiast",
  description: "Portfolio of Gebin George, a passionate cybersecurity enthusiast specializing in ethical hacking, bug bounty hunting, and secure application development. Currently pursuing MCA at Christ University.",
  keywords: ["Gebin George", "Cybersecurity Enthusiast", "Portfolio", "Bug Bounty", "Ethical Hacking", "Security Researcher", "Web Development", "Penetration Testing"],
  authors: [{ name: "Gebin George" }],
  creator: "Gebin George",
  publisher: "Gebin George",
  manifest: "/manifest.json",
  openGraph: {
    title: "Gebin George - Cybersecurity Enthusiast",
    description: "Portfolio showcasing innovative projects in cybersecurity, bug bounty hunting, and secure web development by Gebin George.",
    type: "website",
    locale: "en_US",
    siteName: "Gebin George Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gebin George - Cybersecurity Enthusiast",
    description: "Portfolio showcasing innovative projects in cybersecurity, bug bounty hunting, and secure web development.",
    creator: "@gebingeorge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className} suppressHydrationWarning={true}>
        <CursorSpotlight />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <ScrollToTopButton />
        <SaveContactButton />
      </body>
    </html>
  );
} 