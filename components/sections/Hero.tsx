"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

// ─── Agrega aquí tus fotos en public/images/ ───
const SLIDES = [
  { src: "/images/hero-1.jpg", alt: "Servicio premium de cabello" },
  { src: "/images/hero-2.jpg", alt: "Tinte de cabello profesional" },
  { src: "/images/hero-3.jpg", alt: "Alisado y planchado" },
  { src: "/images/hero-4.jpg", alt: "Pintado de uñas" },
];

const INTERVAL = 4000; // cambia cada 4 segundos

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto-avance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream">

      {/* ── Slideshow background ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blush via-cream to-champagne" />
            {/* Cuando tengas fotos reales, reemplaza el div de arriba con:
            <Image
              src={SLIDES[current].src}
              alt={SLIDES[current].alt}
              fill
              className="object-cover"
              priority
            />
            */}
            {/* Overlay para legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/60 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-petal/30 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-blush/40 blur-3xl" />
      </div>

      {/* Controles del slideshow */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-mauve hover:bg-white transition-all shadow-soft"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-mauve hover:bg-white transition-all shadow-soft"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-6 h-2 bg-mauve"
                : "w-2 h-2 bg-mauve/30 hover:bg-mauve/60"
            }`}
          />
        ))}
      </div>

      {/* ── Contenido ── */}
      <div className="relative z-10 section-padding w-full pt-28 pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.1}
              className="flex items-center gap-2 mb-6"
            >
              <Sparkles size={14} className="text-mauve" />
              <span className="eyebrow">Salón de Belleza Premium</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.25}
              className="heading-hero text-charcoal mb-6"
            >
              Tu belleza,{" "}
              <em className="italic text-mauve font-light">nuestro</em>
              <br />
              arte.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.4}
              className="font-body text-mink text-lg leading-relaxed mb-10 max-w-md"
            >
              Transforma tu imagen en un espacio diseñado para ti. Tintes,
              alisados, cortes y más — con amor y precisión en cada detalle.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.55}
              className="flex flex-wrap gap-4"
            >
              <a href="#reservar" className="btn-primary">
                Reservar Cita
              </a>
              <a href="#servicios" className="btn-outline">
                Ver Servicios
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.7}
              className="flex gap-8 mt-14 pt-10 border-t border-nude/60"
            >
              {[
                { value: "500+", label: "Clientas felices" },
                { value: "8+",   label: "Años de experiencia" },
                { value: "100%", label: "Satisfacción garantizada" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-semibold text-charcoal">{s.value}</p>
                  <p className="font-body text-xs text-mink mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#servicios"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-mink/60 hover:text-mauve transition-colors z-20"
      >
        <span className="font-body text-[0.65rem] tracking-widest uppercase">Explorar</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}
