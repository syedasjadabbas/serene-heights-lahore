import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Lora } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Lora({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Serene Heights Lahore | 21-Storey Commercial Landmark on Gulberg Main Boulevard",
    template: "%s | Serene Heights Lahore",
  },
  description:
    "Serene Heights Lahore — a landmark 21-storey mixed-use commercial development on Gulberg Main Boulevard: commercial floors, offices, co-working and hotel apartments.",
  openGraph: {
    title: "Serene Heights Lahore",
    description: "A landmark 21-storey mixed-use commercial development on Gulberg Main Boulevard, Lahore.",
    images: ["/assets/amenities/amenities-1-new.jpg"],
    siteName: "Serene Heights Lahore",
    type: "website",
    locale: "en_PK",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollFx />
        <SmoothScroll />
      </body>
    </html>
  );
}
