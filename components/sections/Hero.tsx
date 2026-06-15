"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// ─── Pon tus videos en public/images/ con estos nombres ───
// Formatos aceptados: .mp4 .webm
// Graba vertical (9:16) como los reels de Instagram
const VIDEOS = [
  "/images/hero-1.mp4",
  "/images/hero-2.mp4",
  "/images/hero-3.mp4",
  "/images/hero-4.mp4",
];

const INTERVAL = 8000; // cambia cada 8 segundos

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % VIDEOS.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + VIDEOS.length) % VIDEOS.length), []);

  useEffect(() => {
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* ── VIDEO DE FONDO — pantalla completa ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <video
            key={VIDEOS[current]}
            src={VIDEOS[current]}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── OVERLAY para legibilidad ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-charcoal/30" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-charcoal/30 via-transparent to-transparent" />

      {/* ── TEXTO centrado ── */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center section-padding text-center px-6">

        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={0.1}
          className="flex items-center justify-center gap-2 mb-5"
        >
          <Sparkles size={14} className="text-petal" />
          <span className="eyebrow text-petal/90">Salón de Belleza Premium</span>
        </motion.div>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="show" custom={0.25}
          className="heading-hero text-white mb-6 drop-shadow-lg"
        >
          Tu belleza,
          <br />
          <em className="italic text-petal font-light">nuestro arte.</em>
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={0.4}
          className="font-body text-white/80 text-lg leading-relaxed mb-10 max-w-lg"
        >
          Transforma tu imagen en un espacio diseñado para ti. Tintes,
          alisados, cortes y más — con amor y precisión en cada detalle.
        </motion.p>

        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={0.55}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <a href="#reservar" className="btn-primary shadow-strong">
            Reservar Cita
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 border border-white/60 text-white px-8 py-3.5 font-body text-sm tracking-widest uppercase rounded-full transition-all duration-300 hover:bg-white/20 backdrop-blur-sm"
          >
            Ver Servicios
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={0.7}
          className="flex gap-10 sm:gap-16"
        >
          {[
            { value: "500+", label: "Clientas felices"      },
            { value: "8+",   label: "Años de experiencia"   },
            { value: "100%", label: "Satisfacción"          },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-semibold text-white drop-shadow">{s.value}</p>
              <p className="font-body text-xs text-white/70 mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Flechas ── */}
      <button onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all">
        <ChevronRight size={20} />
      </button>

      {/* ── Dots ── */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {VIDEOS.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <motion.a href="#servicios"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
      >
        <span className="font-body text-[0.6rem] tracking-widest uppercase">Explorar</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.a>
    </section>
  );
}
