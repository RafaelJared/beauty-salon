"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, Award, Users, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const values = [
  { icon: Heart,  title: "Pasión",      desc: "Amamos lo que hacemos y se nota en cada resultado." },
  { icon: Award,  title: "Calidad",     desc: "Solo usamos productos premium de las mejores marcas." },
  { icon: Users,  title: "Confianza",   desc: "Más de 500 clientas confían en nosotras cada mes."  },
  { icon: Clock,  title: "Puntualidad", desc: "Respetamos tu tiempo. Citas puntuales, siempre."    },
];

// ─── Tus fotos van en public/images/ ───
// Nómbralas: about-1.jpg, about-2.jpg, about-3.jpg, about-4.jpg
const PHOTOS = [
  { src: "/images/about-1.jpg", alt: "Nuestro salón"    },
  { src: "/images/about-2.jpg", alt: "Nuestro equipo"   },
  { src: "/images/about-3.jpg", alt: "Trabajo del salón"},
  { src: "/images/about-4.jpg", alt: "Ambiente del salón"},
];

export default function About() {
  const [current,   setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);
  const [imgError,  setImgError]  = useState<Record<number, boolean>>({});

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + PHOTOS.length) % PHOTOS.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % PHOTOS.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next]);

  const variants = {
    enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ?  60 : -60 }),
    center:               ({ opacity: 1, x: 0 }),
    exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 :  60 }),
  };

  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-ivory overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Texto ── */}
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
              sienta poderosa, hermosa y cuidada. Llevamos años transformando
              miradas y elevando la autoestima de cientos de clientas en
              San Salvador.
            </p>
            <p className="font-body text-mink leading-relaxed mb-8">
              Nuestro equipo de estilistas certificadas se capacita
              constantemente en las últimas tendencias. Aquí no existe el
              "no se puede" — solo resultados que te van a enamorar.
            </p>

            <a href="#reservar" className="btn-primary">Reserva tu cita</a>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
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

          {/* ── Carrusel de fotos ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="relative">
              {/* Marco vertical */}
              <div className="relative w-full max-w-sm mx-auto h-[520px] sm:h-[600px] rounded-4xl overflow-hidden shadow-strong bg-gradient-to-br from-blush via-petal to-champagne">

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
                    {!imgError[current] ? (
                      <Image
                        src={PHOTOS[current].src}
                        alt={PHOTOS[current].alt}
                        fill
                        className="object-cover"
                        onError={() => setImgError((prev) => ({ ...prev, [current]: true }))}
                      />
                    ) : (
                      /* Placeholder si la foto no existe aún */
                      <div className="w-full h-full bg-gradient-to-br from-blush via-petal to-champagne flex flex-col items-center justify-center gap-3">
                        <span className="font-display text-2xl text-mauve/40 italic text-center px-6">
                          {PHOTOS[current].alt}
                        </span>
                        <span className="font-body text-xs text-mink/40">
                          Agrega tu foto: about-{current + 1}.jpg
                        </span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Flechas */}
                <button onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-mauve hover:bg-white transition-all shadow-soft">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-mauve hover:bg-white transition-all shadow-soft">
                  <ChevronRight size={16} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {PHOTOS.map((_, i) => (
                    <button key={i}
                      onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                      className={`transition-all duration-300 rounded-full ${
                        i === current ? "w-5 h-1.5 bg-mauve" : "w-1.5 h-1.5 bg-white/60 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Badge 8+ años */}
              <div className="absolute -bottom-4 -right-2 sm:-right-6 w-20 h-20 rounded-3xl bg-mauve flex items-center justify-center shadow-medium z-20">
                <div className="text-center">
                  <p className="font-display text-xl font-semibold text-white">8+</p>
                  <p className="font-body text-white/80 text-[0.55rem] uppercase tracking-wider">años</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
