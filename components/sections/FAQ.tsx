"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const FAQS = [
  {
    q: "¿Cuánto dura una cita?",
    a: "Depende del servicio: un corte toma entre 45 y 60 minutos, mientras que un color o alisado puede tomar de 2 a 4 horas. Al reservar te confirmamos el tiempo estimado para que organices tu día con tranquilidad.",
  },
  {
    q: "Tengo el cabello teñido, ¿hay algún problema?",
    a: "Para nada. De hecho, es muy común. Empezamos con un diagnóstico para entender el estado de tu color y tu fibra, y diseñamos el proceso más seguro para llegar al resultado que quieres sin dañar tu cabello.",
  },
  {
    q: "¿Puedo reservar por WhatsApp?",
    a: "Claro. Puedes reservar desde el botón de esta página o escribirnos directamente por WhatsApp. Te respondemos rápido y te ayudamos a elegir el mejor horario y servicio para ti.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Aceptamos efectivo, tarjetas de débito y crédito. Si necesitas otra opción, escríbenos por WhatsApp y lo resolvemos.",
  },
  {
    q: "¿Cuánto tiempo tarda en verse el resultado final?",
    a: "El resultado se ve el mismo día, al salir del salón. En tratamientos, notarás una mejora inmediata que se potencia con las siguientes sesiones. Siempre te dejamos indicaciones para mantenerlo el mayor tiempo posible.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-bg">
      <div className="section-padding max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="eyebrow block mb-3">Antes de reservar</span>
          <h2 className="heading-section text-ink">Resolvamos tus dudas.</h2>
        </motion.div>

        <div>
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left bg-transparent border-0 py-6 font-display text-lg font-semibold cursor-pointer flex justify-between items-center gap-5 text-ink"
                >
                  {item.q}
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full border border-line flex items-center justify-center text-lg transition-all duration-300 ${
                      isOpen ? "rotate-45 bg-ink text-white border-ink" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{ maxHeight: isOpen ? "300px" : "0px" }}
                >
                  <p className="pb-6 text-ink-soft font-body text-[0.98rem] leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
