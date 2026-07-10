import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const SALON_NAME = process.env.NEXT_PUBLIC_SALON_NAME ?? "RAGAS Beauty Salon";

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
    url: "https://beauty-salon-bice.vercel.app",
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
  metadataBase: new URL("https://beauty-salon-bice.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-bg font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#fff",
              color: "#2b2622",
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
              borderRadius: "50px",
              border: "1px solid #e2d8cc",
              padding: "12px 20px",
              boxShadow: "0 8px 40px rgba(52,42,32,0.15)",
            },
            success: { iconTheme: { primary: "#b08d57", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}
