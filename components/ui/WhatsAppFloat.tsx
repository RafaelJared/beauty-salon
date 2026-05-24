"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const WA_NUMBER  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50300000000";
const WA_MESSAGE = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE
  ?? "Hola! Me gustaría reservar una cita 💅";

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

  return (
    <div className="whatsapp-float">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-strong border border-nude/40 p-4 w-56"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-mink/40 hover:text-mink"
            >
              <X size={14} />
            </button>
            <p className="font-body text-sm font-semibold text-charcoal mb-1">
              ¿Lista para brillar? ✨
            </p>
            <p className="font-body text-xs text-mink mb-3 leading-relaxed">
              Reserva tu cita fácilmente por WhatsApp. Respondemos en minutos.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white text-xs font-body font-medium px-4 py-2 rounded-full hover:bg-[#20b558] transition-colors"
            >
              <MessageCircle size={14} />
              Escríbenos ahora
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.4, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowTooltip(!showTooltip)}
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-strong"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={26} className="text-white fill-white" />
      </motion.button>

      {/* Pulsing ring */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-[#25D366]/40 -z-10"
      />
    </div>
  );
}
