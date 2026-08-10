import { Instagram, MessageCircle, Facebook, Heart } from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" className={className}>
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.1v12.3a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.4-2.46V9.6a5.7 5.7 0 0 0-.8-.06A5.69 5.69 0 0 0 4.2 15.2a5.69 5.69 0 0 0 5.69 5.69 5.69 5.69 0 0 0 5.69-5.69V9.01a7.35 7.35 0 0 0 4.28 1.37V7.28a4.28 4.28 0 0 1-3.26-1.46z" />
    </svg>
  );
}

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50369741855";
const YEAR      = new Date().getFullYear();

const links = [
  { href: "#servicios", label: "Servicios"    },
  { href: "#nosotros",  label: "Nosotras"     },
  { href: "#galeria",   label: "Galería"      },
  { href: "#opiniones", label: "Opiniones"    },
  { href: "#reservar",  label: "Agendar Cita" },
  { href: "#contacto",  label: "Contacto"     },
];

export default function Footer() {
  return (
    <footer className="bg-[#211d19] text-white/70">
      <div className="section-padding max-w-7xl mx-auto py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-white mb-1">AURÉ</h3>
            <p className="eyebrow text-gold/70 mb-4">Beauty Lounge</p>
            <p className="font-body text-sm leading-relaxed text-white/50">
              Tu espacio de belleza y bienestar. Cada detalle, cuidado con amor.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="eyebrow text-white/50 mb-4">Navegación</p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-body text-sm text-white/50 hover:text-white transition-colors link-underline"
                  >
                    {l.label}
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
                href="https://www.instagram.com/aure_beautylounge/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors"
              >
                <Instagram size={16} className="text-white/70" />
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition-colors"
              >
                <MessageCircle size={16} className="text-[#25D366]" />
              </a>
              <a
                href="https://www.facebook.com/AureBeautyLounge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-colors"
              >
                <Facebook size={16} className="text-white/70" />
              </a>
              <a
                href="https://www.tiktok.com/@aure_beautylounge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-colors"
              >
                <TikTokIcon className="text-white/70" />
              </a>
            </div>
            <a
              href="#reservar"
              className="btn-gold !py-2.5 !px-5 !text-xs"
            >
              Reservar Cita
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/30">
            © {YEAR} AURÉ Beauty Lounge. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-white/30 flex items-center gap-1">
            Hecho con <Heart size={10} className="text-rose fill-rose" /> para bellas mujeres
          </p>
        </div>
      </div>
    </footer>
  );
}
