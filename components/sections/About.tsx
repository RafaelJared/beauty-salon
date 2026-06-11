"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, Award, Users, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const values = [
  { icon: Heart,  title: "Pasión",     desc: "Amamos lo que hacemos y se nota en cada resultado." },
  { icon: Award,  title: "Calidad",    desc: "Solo usamos productos premium de las mejores marcas." },
  { icon: Users,  title: "Confianza",  desc: "Más de 500 clientas confían en nosotras cada mes."  },
  { icon: Clock,  title: "Puntualidad",desc: "Respetamos tu tiempo. Citas puntuales, siempre."    },
];

// ─── Agrega tus fotos en public/images/ ───
const PHOTOS = [
  { src: "/images/about-1.jpg", alt: "Nuestro salón" },
  { src: "/images/about-2.jpg", alt: "Nuestro equipo" },
  { src: "/images/about-3.jpg", alt: "Trabajo del salón" },
  { src: "/images/about-4.jpg", alt: "Ambiente del salón" },
];

export default function About() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + PHOTOS.length) % PHOTOS.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % PHOTOS.length);
  }, []);

  // Auto-avance
  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit:  (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

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
              <em className="font-display italic text-mauve">una experiencia</em>
            </h2>

            <p className="font-body text-mink leading-relaxed mb-4">
              RAGAS nació del sueño de crear un espacio donde cada mujer se
              sienta poderosa, hermosa y cuidada. Llevamos años
              transformando miradas y elevando la autoestima de cientos de
              clientas en San Salvador.
            </p>
            <p className="font-body text-mink leading-relaxed mb-8">
              Nuestro equipo de estilistas certificadas se capacita
              constantemente en las últimas tendencias. Aquí no existe el
              "no se puede" — solo resultados que te van a enamorar.
            </p>

            <a href="#reservar" className="btn-primary">
              Reserva tu cita
            </a>
          </motion.div>

          {/* Right: Carrusel + values */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Carrusel */}
            <div className="relative mb-10">
              <div className="w-full h-72 rounded-4xl overflow-hidden shadow-medium bg-gradient-to-br from-blush via-petal to-champagne relative">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0"
                  >
                    {/* Placeholder — reemplaza con Image cuando tengas fotos:
                    <Image
                      src={PHOTOS[current].src}
                      alt={PHOTOS[current].alt}
                      fill
                      className="object-cover"
                    />
                    */}
                    <div className="w-full h-full bg-gradient-to-br from-blush via-petal to-champagne flex items-center justify-center">
                      <span className="font-display text-2xl text-mauve/40 italic">
                        {PHOTOS[current].alt}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Flechas */}
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-mauve hover:bg-white transition-all shadow-soft"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-mauve hover:bg-white transition-all shadow-soft"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {PHOTOS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                      className={`transition-all duration-300 rounded-full ${
                        i === current
                          ? "w-5 h-1.5 bg-mauve"
                          : "w-1.5 h-1.5 bg-white/60 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Badge años */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-3xl bg-mauve flex items-center justify-center shadow-medium">
                <div className="text-center">
                  <p className="font-display text-2xl font-semibold text-white">8+</p>
                  <p className="font-body text-white/80 text-[0.6rem] uppercase tracking-wider">años</p>
                </div>
              </div>
            </div>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
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
