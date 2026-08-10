"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram, MessageCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50369741855";
const MAPS_URL  = "https://maps.app.goo.gl/K9UoyzmkgKNiQYK5A";
const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.187091882905!2d-89.2040596847229!3d13.68918819029509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f633a7c6e7b8e9b%3A0x5c6e7b8e9b5c6e7b!2sRAGAS%20Beauty%20Salon!5e0!3m2!1sen!2ssv!4v1697041234567";

const info = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Ave. Jerusalén, calle la mascota, sunset plaza #14, San Salvador, El Salvador",
    href: MAPS_URL,
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: " 2228-5580",
    href: "tel:+50322285580",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun – Sáb: 9:00 AM – 6:00 PM",
    href: null,
  },
];

export default function Contact() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) { toast.error("Completa todos los campos."); return; }
    setLoading(true);
    const text = encodeURIComponent(`Hola! Soy *${name}* (${email}).\n\n${message}`);
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank");
    toast.success("¡Mensaje enviado por WhatsApp! ✨");
    setName(""); setEmail(""); setMessage("");
    setLoading(false);
  };

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-bg-alt">
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
            <span className="eyebrow">Estamos aquí</span>
            <div className="w-8 h-px bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-section text-ink"
          >
            Contáctanos
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-5 mb-10">
              {info.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div key={item.label} className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-rose/15 flex items-center justify-center flex-shrink-0 group-hover:bg-rose/25 transition-colors">
                      <Icon size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-ink-soft/60 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className={`font-body text-sm text-ink ${item.href ? "group-hover:text-gold transition-colors" : ""}`}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            {/* Social */}
            <div className="flex gap-3 mb-8">
              <a
                href="https://www.instagram.com/aure_beautylounge/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-rose/15 flex items-center justify-center text-gold hover:bg-rose/25 transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#e8f8ee] flex items-center justify-center text-[#25D366] hover:bg-[#d0f0da] transition-colors"
              >
                <MessageCircle size={16} />
              </a>
            </div>

            {/* Google Maps — clic abre Maps */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 rounded-3xl overflow-hidden shadow-soft border border-line/40 hover:shadow-medium transition-shadow"
            >
              <div className="relative w-full h-52 bg-line/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.081640833281!2d-89.25226892342536!3d13.6970359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f63310cf2187955%3A0xa1f4ffa6681c99ad!2sAUR%C3%89%20Beauty%20Lounge!5e1!3m2!1ses-419!2ssv!4v1786322749933!5m2!1ses-419!2ssv"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: "none" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación AURÉ Beauty Lounge"
                />
                {/* Overlay para que el clic abra Maps en vez de interactuar con iframe */}
                <div className="absolute inset-0 flex items-end justify-center pb-3">
                  <span className="bg-white/90 backdrop-blur-sm text-gold text-xs font-body font-medium px-4 py-1.5 rounded-full shadow-soft flex items-center gap-1.5">
                    <MapPin size={12} /> Abrir en Google Maps
                  </span>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <form onSubmit={handleSend} className="bg-white rounded-4xl p-8 shadow-card border border-line/40 space-y-4">
              <h3 className="font-display text-2xl text-ink mb-2">Envíanos un mensaje</h3>

              <div>
                <label className="font-body text-xs text-ink-soft/70 uppercase tracking-wider mb-1.5 block">Nombre</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 rounded-xl border border-line/60 bg-bg font-body text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
                />
              </div>

              <div>
                <label className="font-body text-xs text-ink-soft/70 uppercase tracking-wider mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-line/60 bg-bg font-body text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
                />
              </div>

              <div>
                <label className="font-body text-xs text-ink-soft/70 uppercase tracking-wider mb-1.5 block">Mensaje</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="¿En qué te podemos ayudar?"
                  className="w-full px-4 py-3 rounded-xl border border-line/60 bg-bg font-body text-sm resize-none focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-40"
              >
                {loading ? "Enviando..." : "Enviar Mensaje"}
              </button>

              <p className="font-body text-xs text-center text-ink-soft/50">
                También puedes escribirnos por{" "}
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">
                  WhatsApp
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
