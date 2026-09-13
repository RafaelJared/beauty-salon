"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

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
  const [open, setOpen] = useState<number | null>(null);
  const [showList, setShowList] = useState(false);

  return (
    <section id="faq" className="py-16 lg:py-32 bg-bg">
      <div className="section-padding max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 lg:mb-8"
        >
          <span className="eyebrow block mb-3">Antes de reservar</span>
          <h2 className="heading-section text-ink">Resolvamos tus dudas.</h2>
        </motion.div>

        {/* Botón para desplegar las preguntas (opcional) */}
        <button
          onClick={() => setShowList((v) => !v)}
          aria-expanded={showList}
          className="w-full flex items-center justify-center gap-2.5 rounded-full border border-line bg-white px-5 py-3.5 font-body text-sm font-medium text-ink cursor-pointer transition-colors hover:border-gold"
        >
          <HelpCircle size={18} className="text-gold-deep" />
          {showList ? "Ocultar preguntas frecuentes" : "Ver preguntas frecuentes"}
          <ChevronDown
            size={18}
            className={`text-ink-soft transition-transform duration-300 ${showList ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {showList && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="mt-6">
                {FAQS.map((item, i) => {
                  const isOpen = open === i;
                  return (
                    <div key={item.q} className="border-b border-line">
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="w-full text-left bg-transparent border-0 py-5 font-display text-base sm:text-lg font-semibold cursor-pointer flex justify-between items-center gap-4 text-ink"
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
                        style={{ maxHeight: isOpen ? "320px" : "0px" }}
                      >
                        <p className="pb-5 text-ink-soft font-body text-[0.95rem] leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
