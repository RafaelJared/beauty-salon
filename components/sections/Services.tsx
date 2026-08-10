"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Scissors, Sparkles, Wind, Waves, Palette, Brush,
  Highlighter, Droplets, MessageCircle, ChevronRight,
} from "lucide-react";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50322285580";

const services = [
  {
    id: 1,
    icon: Palette,
    name: "Tinte de Cabello",
    solves: "Resuelve: color apagado, canas, raíces marcadas",
    description:
      "Coloración profesional con marcas premium. Tinte completo y técnicas de fantasía.",
    price: "Desde $49.90",
    duration: "2–3 horas",
    popular: true,
    color: "from-rose/25 to-rose/20",
  },
  {
    id: 2,
    icon: Wind,
    name: "Alisado Permanente",
    solves: "Resuelve: cabello encrespado, frizz, difícil de peinar",
    description:
      "Alisado keratina, japonés y nanoplastia. Hasta 6 meses de duración con cabello liso y brillante.",
    price: "Desde $89.90",
    duration: "3–4 horas",
    popular: true,
    color: "from-bg-alt to-line",
  },
  {
    id: 7,
    icon: Highlighter,
    name: "Diseño de Color",
    solves: "Resuelve: color plano, sin dimensión ni luz",
    description:
      "Mechas tradicionales, baby lights y balayage. Iluminación y dimensión personalizada.",
    price: "Desde $99.90",
    duration: "3–4 horas",
    popular: true,
    color: "from-rose/25 to-line",
  },
  {
    id: 8,
    icon: Droplets,
    name: "Rituales SOS",
    solves: "Resuelve: cabello sumamente dañado y sin vida",
    description:
      "Nutrición, reparación, hidratación o fortalecimiento para cabellos dañados y/o procedados químicamente, incluye estilizado.",
    price: "Desde $45.90",
    duration: "1–2 horas",
    popular: false,
    color: "from-line to-rose/20",
  },
  {
    id: 3,
    icon: Sparkles,
    name: "Secado/Planchado",
    solves: "Resuelve: falta de brillo, ondas indeseadas",
    description:
      "Secado o Planchado profesional, con finalizado profesional y duradero, incluye protector térmico y gotas selladoras.",
    price: "Desde $15.90",
    duration: "45 min",
    popular: false,
    color: "from-rose/20 to-rose/25",
  },
  {
    id: 4,
    icon: Waves,
    name: "Ondas Perfectas",
    solves: "Resuelve: cabello sin movimiento, look plano",
    description:
      "Ondas románticas, surferas o clásicas. Usamos técnica de ondas con pinza y difusor.",
    price: "Desde $15.90",
    duration: "1 hora",
    popular: false,
    color: "from-line to-bg-alt",
  },
  {
    id: 6,
    icon: Brush,
    name: "Esmaltado de Uñas",
    solves: "Resuelve: uñas descuidadas, ocasión especial",
    description:
      "Manicure express o pedicure express de gel permanente. Diseños personalizados y nail art.",
    price: "$15.90",
    duration: "45 min–1.5h",
    popular: false,
    color: "from-rose/20 to-line",
  },
  {
    id: 5,
    icon: Scissors,
    name: "Corte de Cabello",
    solves: "Resuelve: falta de forma, puntas dañadas",
    description:
      "Corte personalizado según tu estructura facial y estilo de vida.",
    price: "$15.90",
    duration: "1 hora",
    popular: false,
    color: "from-rose/25 to-bg-alt",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = service.icon;

  const waMessage = encodeURIComponent(
    `Hola! Me gustaría reservar una cita para *${service.name}* 💅`
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card-service group flex flex-col relative overflow-hidden"
    >
      <div className={`-m-[30px] mb-6 aspect-[16/10] bg-gradient-to-br ${service.color} flex items-center justify-center relative`}>
        <Icon size={28} className="text-gold-deep" />
        {service.popular && (
          <span className="absolute top-4 right-4 bg-gold text-white text-[0.6rem] font-body font-medium tracking-widest uppercase px-3 py-1 rounded-full">
            Popular
          </span>
        )}
      </div>

      <h3 className="font-display text-2xl font-medium text-ink mb-1">
        {service.name}
      </h3>
      <p className="font-body text-xs text-gold-deep font-medium mb-3">
        {service.solves}
      </p>
      <p className="font-body text-sm text-ink-soft leading-relaxed flex-1 mb-4">
        {service.description}
      </p>

      <div className="flex items-center justify-between mb-4 pt-4 border-t border-b border-line/60 py-4">
        <span className="font-display text-2xl font-semibold text-ink">{service.price}</span>
        <span className="font-body text-xs text-ink-soft">⏱ {service.duration}</span>
      </div>

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold justify-center text-xs py-2.5 mt-auto w-full"
      >
        <MessageCircle size={15} />
        Reservar por WhatsApp
      </a>
    </motion.div>
  );
}

export default function Services() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section id="servicios" className="py-24 lg:py-32 bg-bg">
      <div className="section-padding max-w-7xl mx-auto">

        <div ref={headRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-8 h-px bg-gold" />
            <span className="eyebrow">Lo que ofrecemos</span>
            <div className="w-8 h-px bg-gold" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="heading-section text-ink"
          >
            Nuestros Servicios
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-body text-ink-soft mt-4 max-w-lg mx-auto leading-relaxed"
          >
            Cada servicio está diseñado para realzar tu belleza natural con
            productos premium y técnicas modernas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-14"
        >
          <p className="font-body text-sm text-ink-soft mb-4">
            ¿Tienes dudas sobre algún servicio?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola! Quisiera más información sobre sus servicios 💅")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2"
            >
              Consultar ahora <ChevronRight size={16} />
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola! Me gustaría preguntar por más servicios que ofrecen ✨")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2"
            >
              Preguntar por más servicios <ChevronRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
