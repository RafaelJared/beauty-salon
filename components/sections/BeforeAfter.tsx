"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

const CASES = [
  {
    label: "Corte & color",
    eyebrow: " · Corte & Color",
    title: "Un cambio que le devolvió la seguridad",
    text: "Quería reinventarse. Rediseñamos su forma y color desde cero, pensando en su rostro y su rutina. El resultado: un look moderno que mantiene fácil en casa.",
    videoAntes: "/images/caso-02-antes.mp4",
    videoDespues: "/images/caso-02-despues.mp4",
  },
];

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (x: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let p = ((x - r.left) / r.width) * 100;
    p = Math.max(2, Math.min(98, p));
    setPos(p);
  };

  return (
    <section id="transformaciones" className="py-24 lg:py-32 bg-bg">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mb-14"
        >
          <span className="eyebrow block mb-3">Resultados reales</span>
          <h2 className="heading-section text-ink mb-4">
            La diferencia se ve.<br />Y se siente.
          </h2>
          <p className="font-body text-ink-soft">
            Desliza y mira lo que sucede cuando cada detalle se cuida. No editamos resultados: los diseñamos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={sliderRef}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] rounded-[18px] overflow-hidden shadow-strong cursor-ew-resize select-none"
            onMouseDown={(e) => { dragging.current = true; setFromClientX(e.clientX); }}
            onMouseMove={(e) => dragging.current && setFromClientX(e.clientX)}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onTouchStart={(e) => setFromClientX(e.touches[0].clientX)}
            onTouchMove={(e) => setFromClientX(e.touches[0].clientX)}
          >
            {CASES[active].videoAntes ? (
              <video
                key={CASES[active].videoAntes}
                src={CASES[active].videoAntes}
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 ph-img" data-label="[ ANTES ]" />
            )}
            {CASES[active].videoDespues ? (
              <video
                key={CASES[active].videoDespues}
                src={CASES[active].videoDespues}
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
              />
            ) : (
              <div
                className="absolute inset-0 ph-img v2"
                data-label="[ DESPUÉS ]"
                style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
              />
            )}
            <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-[0.68rem] tracking-wider uppercase font-semibold bg-ink/70 text-white backdrop-blur-sm">
              Antes
            </span>
            <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full text-[0.68rem] tracking-wider uppercase font-semibold bg-gold text-white">
              Después
            </span>
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(43,38,34,.15)]"
              style={{ left: `${pos}%`, transform: "translateX(-1px)" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center text-ink shadow-strong text-base">
                ⇄
              </div>
            </div>
          </motion.div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="eyebrow block mb-3">{CASES[active].eyebrow}</span>
            <h3 className="font-display text-3xl font-medium text-ink mb-3">{CASES[active].title}</h3>
            <p className="font-body text-ink-soft leading-relaxed mb-6">{CASES[active].text}</p>
            <div className="flex gap-2 flex-wrap">
              {CASES.map((c, i) => (
                <button
                  key={c.label}
                  onClick={() => setActive(i)}
                  className={`px-4 py-2 rounded-full border text-sm font-body transition-colors ${
                    i === active
                      ? "bg-ink text-white border-ink"
                      : "bg-white text-ink-soft border-line hover:border-gold"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
