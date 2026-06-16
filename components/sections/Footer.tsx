import { Instagram, MessageCircle, Heart } from "lucide-react";

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
    <footer className="bg-charcoal text-white/70">
      <div className="section-padding max-w-7xl mx-auto py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-light text-white mb-1">RAGAS</h3>
            <p className="eyebrow text-white/40 mb-4">Beauty Salon</p>
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
                href="https://instagram.com/ragasbeautysalon"
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
            © {YEAR} RAGAS Beauty Salon. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-white/30 flex items-center gap-1">
            Hecho con <Heart size={10} className="text-petal fill-petal" /> para bellas mujeres
          </p>
        </div>
      </div>
    </footer>
  );
}
