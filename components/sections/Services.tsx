"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Scissors, Sparkles, Wind, Waves, Palette, Brush,
  MessageCircle, ChevronRight,
} from "lucide-react";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50369741855";

const services = [
  {
    id: 1,
    icon: Palette,
    name: "Tinte de Cabello",
    description:
      "Coloración profesional con marcas premium. Mechas, balayage, tinte completo y técnicas de fantasía.",
    price: "Desde $49.90",
    duration: "2–3 horas",
    popular: true,
    color: "from-petal to-blush",
  },
  {
    id: 2,
    icon: Wind,
    name: "Alisado Permanente",
    description:
      "Alisado keratina, japonés y nanoplastia. Hasta 6 meses de duración con cabello liso y brillante.",
    price: "Desde $39.90",
    duration: "3–4 horas",
    popular: false,
    color: "from-champagne to-nude",
  },
  {
    id: 3,
    icon: Sparkles,
    name: "Planchado",
    description:
      "Planchado profesional con tratamiento térmico protector. Liso perfecto que dura días.",
    price: "Desde $12.90",
    duration: "45 min",
    popular: false,
    color: "from-blush to-petal",
  },
  {
    id: 4,
    icon: Waves,
    name: "Ondas Perfectas",
    description:
      "Ondas románticas, surferas o clásicas. Usamos técnica de ondas con pinza y difusor.",
    price: "Desde $15.90",
    duration: "1 hora",
    popular: false,
    color: "from-nude to-champagne",
  },
  {
    id: 5,
    icon: Scissors,
    name: "Corte de Cabello",
    description:
      "Corte personalizado según tu estructura facial y estilo de vida. Incluye lavado y secado.",
    price: "Desde $15.90",
    duration: "1 hora",
    popular: true,
    color: "from-petal to-champagne",
  },
  {
    id: 6,
    icon: Brush,
    name: "Pintado de Uñas",
    description:
      "Manicure y pedicure clásico, semipermanente y gel. Diseños personalizados y nail art.",
    price: "Desde $12.90",
    duration: "45 min–1.5h",
    popular: false,
    color: "from-blush to-nude",
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
      {service.popular && (
        <div className="absolute top-4 right-4">
          <span className="bg-mauve text-white text-[0.6rem] font-body font-medium tracking-widest uppercase px-3 py-1 rounded-full">
            Popular
          </span>
        </div>
      )}

      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={20} className="text-mauve" />
      </div>

      <h3 className="font-display text-2xl font-medium text-charcoal mb-2">
        {service.name}
      </h3>
      <p className="font-body text-sm text-mink leading-relaxed flex-1 mb-5">
        {service.description}
      </p>

      <div className="flex items-center justify-between text-xs text-mink/70 font-body mb-5 pt-4 border-t border-nude/50">
        <span className="font-semibold text-charcoal text-sm">{service.price}</span>
        <span>{service.duration}</span>
      </div>

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp justify-center text-xs py-2.5"
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
    <section id="servicios" className="py-24 lg:py-32 bg-cream">
      <div className="section-padding max-w-7xl mx-auto">

        <div ref={headRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-8 h-px bg-mauve" />
            <span className="eyebrow">Lo que ofrecemos</span>
            <div className="w-8 h-px bg-mauve" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="heading-section text-charcoal"
          >
            Nuestros Servicios
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-body text-mink mt-4 max-w-lg mx-auto leading-relaxed"
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
          <p className="font-body text-sm text-mink mb-4">
            ¿Tienes dudas sobre algún servicio?
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola! Quisiera más información sobre sus servicios 💅")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            Consultar ahora <ChevronRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
