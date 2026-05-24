"use client";

import { motion } from "framer-motion";
import { Heart, Award, Users, Clock } from "lucide-react";

const values = [
  { icon: Heart,  title: "Pasión",         desc: "Amamos lo que hacemos y se nota en cada resultado." },
  { icon: Award,  title: "Calidad",         desc: "Solo usamos productos premium de las mejores marcas." },
  { icon: Users,  title: "Confianza",       desc: "Más de 500 clientas confían en nosotras cada mes."  },
  { icon: Clock,  title: "Puntualidad",     desc: "Respetamos tu tiempo. Citas puntuales, siempre."    },
];

export default function About() {
  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-ivory overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-mauve" />
              <span className="eyebrow">Nuestra historia</span>
            </div>

            <h2 className="heading-section text-charcoal mb-6">
              Más que un salón,{" "}
              <em className="font-display italic text-mauve">
                una experiencia
              </em>
            </h2>

            <p className="font-body text-mink leading-relaxed mb-4">
              Lumière nació del sueño de crear un espacio donde cada mujer se
              sienta poderosa, hermosa y cuidada. Llevamos más de 8 años
              transformando miradas y elevando la autoestima de cientos de
              clientas.
            </p>
            <p className="font-body text-mink leading-relaxed mb-8">
              Nuestro equipo de estilistas certificadas se capacita
              constantemente en las últimas tendencias de Europa y LATAM. Aquí
              no existe el "no se puede" — solo resultados que te van a
              enamorar.
            </p>

            <a href="#reservar" className="btn-primary">
              Reserva tu cita
            </a>
          </motion.div>

          {/* Right: Visual + values */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Photo placeholder */}
            <div className="relative mb-10">
              <div className="w-full h-72 rounded-4xl bg-gradient-to-br from-blush via-petal to-champagne flex items-center justify-center shadow-medium overflow-hidden">
                <span className="font-display text-3xl text-mauve/40 italic">
                  Foto del equipo / salón
                </span>
                {/* Replace with:
                    <Image src="/images/about.jpg" alt="Nuestro equipo" fill className="object-cover" />
                */}
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-3xl bg-mauve flex items-center justify-center shadow-medium">
                <div className="text-center">
                  <p className="font-display text-2xl font-semibold text-white">8+</p>
                  <p className="font-body text-white/80 text-[0.6rem] uppercase tracking-wider">años</p>
                </div>
              </div>
            </div>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="bg-white rounded-2xl p-4 shadow-card border border-nude/40"
                  >
                    <Icon size={18} className="text-mauve mb-2" />
                    <p className="font-body font-semibold text-charcoal text-sm">{v.title}</p>
                    <p className="font-body text-mink text-xs leading-relaxed mt-1">{v.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
