"use client";

import { motion } from "framer-motion";

const STEPS = [
  { n: "1", title: "Reserva",       text: "Eliges día y hora en segundos, por WhatsApp." },
  { n: "2", title: "Diagnóstico",   text: "Escuchamos qué quieres y estudiamos tu cabello." },
  { n: "3", title: "Servicio",      text: "Trabajamos con calma, técnica y productos profesionales." },
  { n: "4", title: "Resultado",     text: "Te mostramos, ajustamos y te enseñamos a mantenerlo." },
  { n: "5", title: "Seguimiento",   text: "Te acompañamos después para que dure más y mejor." },
];

export default function Process() {
  return (
    <section id="proceso" className="py-24 lg:py-32 bg-bg-alt">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center mb-16"
        >
          <span className="eyebrow block mb-3">Cómo trabajamos</span>
          <h2 className="heading-section text-ink mb-4">Sin sorpresas. Solo resultados.</h2>
          <p className="font-body text-ink-soft">
            Un proceso claro pensado para que llegues tranquila y salgas encantada.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-10 gap-x-4 mt-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center px-2 relative"
            >
              {i < STEPS.length - 1 && (
                <div className="hidden sm:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-gold to-transparent" />
              )}
              <div className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-full bg-white border border-line flex items-center justify-center font-display text-2xl text-gold-deep transition-all duration-300 hover:bg-ink hover:text-white hover:scale-105">
                {s.n}
              </div>
              <h4 className="font-display text-lg font-semibold text-ink mb-1">{s.title}</h4>
              <p className="font-body text-sm text-ink-soft">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
