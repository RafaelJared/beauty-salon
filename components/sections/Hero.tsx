"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// ─── Pon tus videos en public/images/ ───
const VIDEOS = [
  "/images/hero-1.mp4",
  "/images/hero-2.mp4",
  "/images/hero-3.mp4",
  "/images/hero-4.mp4",
];

const INTERVAL = 6000;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] },
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream">

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-petal/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-blush/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 section-padding w-full pt-28 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-12">

          {/* ── Izquierda: Texto ── */}
          <div className="order-2 lg:order-1">
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={0.1}
              className="flex items-center gap-2 mb-6"
            >
              <Sparkles size={14} className="text-mauve" />
              <span className="eyebrow">Salón de Belleza Premium</span>
            </motion.div>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={0.25}
              className="heading-hero text-charcoal mb-6"
            >
              Tu belleza,{" "}
              <em className="italic text-mauve font-light">nuestro</em>
              <br />
              arte.
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={0.4}
              className="font-body text-mink text-lg leading-relaxed mb-10 max-w-md"
            >
              Transforma tu imagen en un espacio diseñado para ti. Tintes,
              alisados, cortes y más — con amor y precisión en cada detalle.
            </motion.p>

            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={0.55}
              className="flex flex-wrap gap-4"
            >
              <a href="#reservar" className="btn-primary">Reservar Cita</a>
              <a href="#servicios" className="btn-outline">Ver Servicios</a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={0.7}
              className="flex gap-8 mt-14 pt-10 border-t border-nude/60"
            >
              {[
                { value: "500+", label: "Clientas felices"    },
                { value: "8+",   label: "Años de experiencia" },
                { value: "100%", label: "Satisfacción"        },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-semibold text-charcoal">{s.value}</p>
                  <p className="font-body text-xs text-mink mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Derecha: Video vertical ── */}
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {/* Marco del video */}
              <div className="relative w-64 sm:w-72 h-[480px] sm:h-[540px] rounded-[3rem] overflow-hidden shadow-strong">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
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

                {/* Overlay suave en los bordes */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent pointer-events-none" />

                {/* Flechas dentro del video */}
                <button onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-mauve hover:bg-white transition-all shadow-soft">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-mauve hover:bg-white transition-all shadow-soft">
                  <ChevronRight size={16} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {VIDEOS.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)}
                      className={`transition-all duration-300 rounded-full ${
                        i === current ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Tarjeta flotante — popular */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-8 bg-white rounded-2xl p-4 shadow-medium border border-nude/40"
              >
                <p className="eyebrow mb-1">Más popular</p>
                <p className="font-display text-lg font-medium text-charcoal">Tinte + Baño</p>
                <p className="font-body text-xs text-mink">de color</p>
              </motion.div>

              {/* Tarjeta flotante — disponible */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-6 bg-mauve rounded-2xl p-4 shadow-medium"
              >
                <p className="font-body text-xs text-white/80 mb-0.5">Nuevas citas</p>
                <p className="font-display text-lg font-medium text-white">Disponibles 🌸</p>
              </motion.div>

              {/* Sombra decorativa */}
              <div className="absolute -z-10 top-8 left-8 w-full h-full rounded-[3rem] bg-petal/40" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a href="#servicios"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-mink/60 hover:text-mauve transition-colors z-10"
      >
        <span className="font-body text-[0.65rem] tracking-widest uppercase">Explorar</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}
