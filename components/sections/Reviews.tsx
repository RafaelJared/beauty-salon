"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const reviews = [
  {
    id: 1,
    name: "Alex Rivera",
    service: "Pedicura",
    rating: 5,
    text: "Excelente servicio, el personal muy atento y amable estoy muy satisfecho!! Visítenlo!!!",
    avatar: "A",
    date: "hace 3 semanas",
  },
  {
    id: 2,
    name: "Melida L.",
    service: "Alisado Permanente",
    rating: 5,
    text: "Excelente servicio, un personal bien profesional y atento!. Instalaciones limpias y estoy encantada con el trabajo que me realizaron, definitivamente los vuelvo a visitar.",
    avatar: "M",
    date: "hace 3 días",
  },
  {
    id: 3,
    name: "Sofía L.",
    service: "Esmaltado de uñas",
    rating: 5,
    text: "Vine por primera vez y quedé enamorada del lugar. Muy limpio, el ambiente es precioso y el nail art que me hicieron fue exactamente lo que pedí.",
    avatar: "S",
    date: "hace 3 semanas",
  },
  {
    id: 4,
    name: "Rocio Gallardo",
    service: "Esmaltado de Uñas",
    rating: 5,
    text: "Me encantó el servicio, las uñas quedaron perfectas 😍✨ súper prolijas, brillantes y justo como las quería, 100% recomendado 💖💅",
    avatar: "R",
    date: "hace 8 meses",
  },
  {
    id: 5,
    name: "Andrea P.",
    service: "Corte de Cabello",
    rating: 5,
    text: "La estilista entendió perfectamente lo que quería. Corte preciso, explicó todo el proceso y quedé feliz con el resultado.",
    avatar: "A",
    date: "hace 2 meses",
  }
  {
  id: 6,
  name: "Valeria M.",
  service: "Tinte de Cabello",
  rating: 5,
  text: "Quedé fascinada con el color de mi cabello. Me asesoraron para elegir el tono ideal y el resultado superó mis expectativas. Mi cabello quedó brillante, suave y con un acabado muy natural.",
  avatar: "V",
  date: "hace 1 día",
},
{
  id: 7,
  name: "Daniela C.",
  service: "Diseño de Color",
  rating: 5,
  text: "El diseño de color quedó espectacular. Hicieron un degradado hermoso y cuidaron mucho la salud de mi cabello durante todo el proceso. Sin duda volveré y lo recomiendo al 100%.",
  avatar: "D",
  date: "hace 2 semanas",
}
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
          className={i < rating ? "fill-gold text-gold" : "text-line"}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [startIdx, setStartIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDirection(1);
      setStartIdx((prev) => (prev + 1) % reviews.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  // Obtiene 3 reseñas a partir del índice actual (circular)
  const visible = Array.from({ length: VISIBLE }, (_, i) =>
    reviews[(startIdx + i) % reviews.length]
  );

  return (
    <section id="opiniones" className="py-24 lg:py-32 bg-bg-alt">
      <div className="section-padding max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-8 h-px bg-gold" />
            <span className="eyebrow">Lo que dicen ellas</span>
            <div className="w-8 h-px bg-gold" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-section text-ink"
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
                  className="text-gold fill-gold"
                />
              ))}
            </div>
            <span className="font-display text-2xl font-medium text-ink">4.9</span>
            <a
              href="https://www.google.com/maps/place/RAGAS+Beauty+Salon/@13.69128,-89.226611,17z/data=!3m2!1e3!4b1!4m6!3m5!1s0x8f63310cf2187955:0xa1f4ffa6681c99ad!8m2!3d13.69128!4d-89.226611!16s%2Fg%2F11hgk3__gv"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-ink-soft underline decoration-gold/40 underline-offset-2 hover:text-gold transition-colors"
            >
              (+29 reseñas)
            </a>
          </motion.div>

          {/* Flecha dibujada a mano señalando el link de reseñas */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="flex items-center justify-center gap-1.5 mt-1.5"
          >
            <a
              href="https://www.google.com/maps/place/RAGAS+Beauty+Salon/@13.69128,-89.226611,17z/data=!3m2!1e3!4b1!4m6!3m5!1s0x8f63310cf2187955:0xa1f4ffa6681c99ad!8m2!3d13.69128!4d-89.226611!16s%2Fg%2F11hgk3__gv"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body italic text-xs text-ink-soft/60 hover:text-gold transition-colors"
            >
              Ver más opiniones de clientas satisfechas
            </a>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              className="text-gold/60 -scale-x-100 -rotate-[10deg]"
            >
              <path
                d="M4 22C4 14 8 5 17 3"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M11.5 4.2C13 3.5 15.2 3 17 3C16.7 4.7 16.7 6.9 17.1 8.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </motion.div>
        </div>

        {/* Cards rotativas (se pausan al pasar el mouse para poder leer) */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{    opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white rounded-3xl p-6 shadow-card border border-line/40 relative overflow-hidden"
              >
                <Quote size={40} className="absolute top-4 right-4 text-rose/60" />

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-rose flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-lg font-medium text-white">
                      {review.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-ink text-sm">{review.name}</p>
                    <p className="font-body text-xs text-ink-soft/70">{review.service}</p>
                  </div>
                </div>

                <StarRating rating={review.rating} />

                <p className="font-body text-sm text-ink-soft leading-relaxed mt-3">
                  {review.text}
                </p>

                <p className="font-body text-xs text-ink-soft/50 mt-4">{review.date}</p>
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
                i === startIdx ? "w-6 h-2 bg-gold" : "w-2 h-2 bg-gold/25 hover:bg-gold/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
