import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const SALON_NAME = process.env.NEXT_PUBLIC_SALON_NAME ?? "Lumière Beauty Studio";

export const metadata: Metadata = {
  title: {
    default: `${SALON_NAME} | Salón de Belleza Premium`,
    template: `%s | ${SALON_NAME}`,
  },
  description:
    "Salón de belleza femenino premium. Tintes, alisados, cortes, uñas y más. Reserva tu cita ahora.",
  keywords: [
    "salón de belleza",
    "tintes de cabello",
    "alisados",
    "corte de cabello",
    "pintado de uñas",
    "belleza femenina",
    "planchados",
    "ondas",
  ],
  openGraph: {
    type: "website",
    locale: "es_SV",
    url: "https://lumiere-beauty.vercel.app",
    siteName: SALON_NAME,
    title: `${SALON_NAME} | Salón de Belleza Premium`,
    description:
      "Salón de belleza femenino premium. Tintes, alisados, cortes, uñas y más.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SALON_NAME} | Salón de Belleza Premium`,
    description: "Salón de belleza femenino premium.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://lumiere-beauty.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-cream font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#fff",
              color: "#2c2c2c",
              fontFamily: "var(--font-jost)",
              fontSize: "14px",
              borderRadius: "50px",
              border: "1px solid #f2cdd5",
              padding: "12px 20px",
              boxShadow: "0 8px 40px rgba(192,112,128,0.15)",
            },
            success: { iconTheme: { primary: "#c07080", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}
