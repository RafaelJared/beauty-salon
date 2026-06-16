"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const reviews = [
  {
    id: 1,
    name: "Valentina M.",
    service: "Tinte + Corte",
    rating: 5,
    text: "El mejor salón de la ciudad sin duda. Llegué con el cabello muy dañado y salí con un tinte hermoso y lleno de vida. ¡Volvería mil veces!",
    avatar: "V",
    date: "hace 2 semanas",
  },
  {
    id: 2,
    name: "Isabella R.",
    service: "Alisado Keratina",
    rating: 5,
    text: "Llevaba años buscando un buen alisado y finalmente lo encontré. El resultado fue increíble, cabello súper liso y sedoso. Duró 5 meses perfectamente.",
    avatar: "I",
    date: "hace 1 mes",
  },
  {
    id: 3,
    name: "Sofía L.",
    service: "Pintado de Uñas",
    rating: 5,
    text: "Vine por primera vez y quedé enamorada del lugar. Muy limpio, el ambiente es precioso y el nail art que me hicieron fue exactamente lo que pedí.",
    avatar: "S",
    date: "hace 3 semanas",
  },
  {
    id: 4,
    name: "Camila T.",
    service: "Ondas + Planchado",
    rating: 5,
    text: "Fui para un evento especial y me dejaron espectacular. Las ondas duraron todo el día y la noche. ¡Súper recomendado!",
    avatar: "C",
    date: "hace 1 semana",
  },
  {
    id: 5,
    name: "Andrea P.",
    service: "Corte de Cabello",
    rating: 5,
    text: "La estilista entendió perfectamente lo que quería. Corte preciso, explicó todo el proceso y quedé feliz con el resultado.",
    avatar: "A",
    date: "hace 2 meses",
  },
  {
    id: 6,
    name: "Daniela F.",
    service: "Balayage",
    rating: 5,
    text: "Mi balayage quedó de revista. Me mostraron el proceso paso a paso y el resultado fue exactamente lo que había guardado en mis inspiraciones.",
    avatar: "D",
    date: "hace 3 días",
  },
  {
    id: 7,
    name: "Gabriela R.",
    service: "Tinte de Cabello",
    rating: 5,
    text: "Excelente atención desde el primer momento. Me asesoraron sobre el color ideal para mi tono de piel y quedé encantada con el resultado.",
    avatar: "G",
    date: "hace 5 días",
  },
  {
    id: 8,
    name: "Fernanda O.",
    service: "Alisado Permanente",
    rating: 5,
    text: "Jamás había tenido el cabello tan liso y brillante. El alisado duró muchísimo y el trato fue increíble. Ya agendé mi próxima cita.",
    avatar: "F",
    date: "hace 2 semanas",
  },
  {
    id: 9,
    name: "Patricia C.",
    service: "Planchado + Corte",
    rating: 4,
    text: "Muy buen servicio y atención. El resultado fue hermoso, definitivamente regreso. El ambiente del salón es muy agradable y relajante.",
    avatar: "P",
    date: "hace 1 mes",
  },
];

const VISIBLE = 3;   // cuántas tarjetas se muestran a la vez
const INTERVAL = 6500;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? "fill-mauve text-mauve" : "text-nude"}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [startIdx, setStartIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setStartIdx((prev) => (prev + 1) % reviews.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, []);

  // Obtiene 3 reseñas a partir del índice actual (circular)
  const visible = Array.from({ length: VISIBLE }, (_, i) =>
    reviews[(startIdx + i) % reviews.length]
  );

  return (
    <section id="opiniones" className="py-24 lg:py-32 bg-blush/40">
      <div className="section-padding max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-8 h-px bg-mauve" />
            <span className="eyebrow">Lo que dicen ellas</span>
            <div className="w-8 h-px bg-mauve" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-section text-charcoal"
          >
            Opiniones
          </motion.h2>

          {/* Rating 4.9 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mt-4"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < 4 ? "fill-mauve text-mauve" : "fill-mauve/70 text-mauve/70"}
                />
              ))}
            </div>
            <span className="font-display text-2xl font-medium text-charcoal">4.9</span>
            <span className="font-body text-sm text-mink">(+120 reseñas)</span>
          </motion.div>
        </div>

        {/* Cards rotativas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {visible.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{    opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white rounded-3xl p-6 shadow-card border border-nude/40 relative overflow-hidden"
              >
                <Quote size={40} className="absolute top-4 right-4 text-petal/60" />

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mauve to-dusty flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-lg font-medium text-white">
                      {review.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-charcoal text-sm">{review.name}</p>
                    <p className="font-body text-xs text-mink/70">{review.service}</p>
                  </div>
                </div>

                <StarRating rating={review.rating} />

                <p className="font-body text-sm text-mink leading-relaxed mt-3">
                  {review.text}
                </p>

                <p className="font-body text-xs text-mink/50 mt-4">{review.date}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Indicador de progreso */}
        <div className="flex justify-center gap-1.5 mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > startIdx ? 1 : -1); setStartIdx(i); }}
              className={`transition-all duration-500 rounded-full ${
                i === startIdx ? "w-6 h-2 bg-mauve" : "w-2 h-2 bg-mauve/25 hover:bg-mauve/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
