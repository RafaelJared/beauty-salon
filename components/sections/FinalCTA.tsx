"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50369741855";

export default function FinalCTA() {
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Hola! Me gustaría reservar una cita en AURÉ 💅"
  )}`;

  return (
    <section className="relative bg-ink text-[#f2ebe1] text-center overflow-hidden">
      <div className="section-padding max-w-3xl mx-auto py-28 lg:py-36 relative">
        <div
          className="absolute w-[520px] h-[520px] rounded-full pointer-events-none -top-40 left-1/2 -translate-x-1/2"
          style={{ background: "radial-gradient(circle, rgba(176,141,87,.32), transparent 65%)" }}
        />

        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow !text-[#d9b78a] relative block mb-4"
        >
          Tu momento
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-white relative text-[clamp(2.6rem,6vw,4.6rem)] font-medium leading-[1.05] mb-6"
        >
          Mereces sentirte<br />
          <em className="italic text-[#e6c79b]">irresistible.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-[#c9beb0] relative max-w-md mx-auto mb-10 text-lg"
        >
          Imagina salir de aquí sintiéndote segura, luminosa y completamente tú. Ese día empieza con una cita.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-gold justify-center">
            <MessageCircle size={16} />
            Reservar por WhatsApp
          </a>
          <a href="#servicios" className="btn-primary !bg-white !text-ink justify-center">
            Ver servicios
          </a>
        </motion.div>
      </div>
    </section>
  );
}
