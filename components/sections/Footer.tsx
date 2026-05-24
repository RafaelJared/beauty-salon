import Link from "next/link";
import { Instagram, MessageCircle, Heart } from "lucide-react";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50300000000";
const SALON_IG  = process.env.NEXT_PUBLIC_SALON_IG  ?? "@lumiere.beauty";
const YEAR      = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="section-padding max-w-7xl mx-auto py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-light text-white mb-1">Lumière</h3>
            <p className="eyebrow text-white/40 mb-4">Beauty Studio</p>
            <p className="font-body text-sm leading-relaxed text-white/50">
              Tu espacio de belleza y bienestar. Cada detalle, cuidado con amor.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="eyebrow text-white/50 mb-4">Navegación</p>
            <ul className="space-y-2">
              {["Servicios", "Nosotras", "Galería", "Opiniones", "Contacto"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="font-body text-sm text-white/50 hover:text-white transition-colors link-underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="eyebrow text-white/50 mb-4">Síguenos</p>
            <div className="flex gap-3 mb-6">
              <a
                href={`https://instagram.com/${SALON_IG.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram size={16} className="text-white/70" />
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center hover:bg-[#25D366]/30 transition-colors"
              >
                <MessageCircle size={16} className="text-[#25D366]" />
              </a>
            </div>
            <a
              href="#reservar"
              className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:bg-white/10 px-5 py-2.5 rounded-full font-body text-xs uppercase tracking-widest transition-all duration-200"
            >
              Reservar Cita
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/30">
            © {YEAR} Lumière Beauty Studio. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-white/30 flex items-center gap-1">
            Hecho con <Heart size={10} className="text-petal fill-petal" /> para bellas mujeres
          </p>
        </div>
      </div>
    </footer>
  );
}
