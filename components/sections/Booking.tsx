"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { es } from "date-fns/locale";
import { format, addDays, startOfToday } from "date-fns";
import { User, Phone, ChevronRight, CheckCircle2, MessageCircle } from "lucide-react";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50369741855";

const SERVICES_LIST = [
  "Tinte de Cabello",
  "Alisado Permanente",
  "Planchado",
  "Ondas Perfectas",
  "Corte de Cabello",
  "Pintado de Uñas",
];

const TIME_SLOTS = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM",
  "11:00 AM","11:30 AM","12:00 PM","2:00 PM",
  "2:30 PM","3:00 PM","3:30 PM","4:00 PM",
  "4:30 PM","5:00 PM",
];

const stepLabels = ["Servicio","Fecha","Hora","Datos"];

export default function Booking() {
  const [step, setStep]                       = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate]       = useState<Date | undefined>();
  const [selectedTime, setSelectedTime]       = useState("");
  const [name, setName]                       = useState("");
  const [phone, setPhone]                     = useState("");
  const [done, setDone]                       = useState(false);

  const today = startOfToday();
  const disabledDays = [{ before: addDays(today, 1) }, { dayOfWeek: [0] }];

  const handleConfirm = useCallback(() => {
    if (!name.trim() || !phone.trim()) return;
    const fechaFormato = selectedDate
      ? format(selectedDate, "EEEE dd 'de' MMMM yyyy", { locale: es })
      : "";
    const mensaje =
      `Hola! Quiero reservar una cita 💅\n\n` +
      `✂️ *Servicio:* ${selectedService}\n` +
      `📅 *Fecha:* ${fechaFormato}\n` +
      `🕐 *Hora:* ${selectedTime}\n` +
      `👤 *Nombre:* ${name}\n` +
      `📱 *Teléfono:* ${phone}\n\n` +
      `¿Está disponible ese horario?`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(mensaje)}`, "_blank");
    setDone(true);
  }, [name, phone, selectedService, selectedDate, selectedTime]);

  const resetForm = () => {
    setStep(1); setSelectedService(""); setSelectedDate(undefined);
    setSelectedTime(""); setName(""); setPhone(""); setDone(false);
  };

  return (
    <section id="reservar" className="py-24 lg:py-32 bg-cream">
      <div className="section-padding max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-8 h-px bg-mauve" />
            <span className="eyebrow">Agenda en línea</span>
            <div className="w-8 h-px bg-mauve" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="heading-section text-charcoal"
          >
            Reserva tu Cita
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="font-body text-sm text-mink mt-3"
          >
            Completa los pasos y te contactaremos por WhatsApp para confirmar 🌸
          </motion.p>
        </div>

        {/* Stepper */}
        {!done && (
          <div className="flex items-center justify-center gap-1 mb-10">
            {stepLabels.map((label, i) => {
              const s = i + 1;
              const active = step === s;
              const isDone = step > s;
              return (
                <div key={label} className="flex items-center gap-1">
                  <div className={`flex items-center gap-1.5 transition-all duration-300 ${active ? "opacity-100" : isDone ? "opacity-70" : "opacity-30"}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-medium transition-colors duration-300 ${active ? "bg-mauve text-white" : isDone ? "bg-petal text-mauve" : "bg-nude text-mink"}`}>
                      {isDone ? "✓" : s}
                    </div>
                    <span className="font-body text-xs text-charcoal hidden sm:block">{label}</span>
                  </div>
                  {i < 3 && <div className="w-5 h-px bg-nude mx-1" />}
                </div>
              );
            })}
          </div>
        )}

        {/* Card — SIN AnimatePresence para evitar el bug del nombre */}
        <div className="bg-white rounded-4xl p-8 sm:p-10 shadow-card border border-nude/40 min-h-[300px]">

          {/* Step 1 */}
          {step === 1 && !done && (
            <div>
              <h3 className="font-display text-2xl text-charcoal mb-6">¿Qué servicio deseas?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {SERVICES_LIST.map((s) => (
                  <button key={s} type="button" onClick={() => setSelectedService(s)}
                    className={`text-left px-5 py-4 rounded-2xl border-2 font-body text-sm transition-all duration-200 ${
                      selectedService === s
                        ? "border-mauve bg-blush text-charcoal font-medium"
                        : "border-nude/60 text-mink hover:border-petal hover:bg-blush/30"
                    }`}
                  >{s}</button>
                ))}
              </div>
              <div className="flex justify-end">
                <button type="button" disabled={!selectedService} onClick={() => setStep(2)}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                  Continuar <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && !done && (
            <div>
              <h3 className="font-display text-2xl text-charcoal mb-6">Elige una fecha</h3>
              <div className="flex justify-center mb-6">
                <DayPicker
                  mode="single" selected={selectedDate} onSelect={setSelectedDate}
                  disabled={disabledDays} locale={es} fromDate={addDays(today, 1)}
                />
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={() => setStep(1)} className="btn-outline text-xs py-2.5 px-5">Atrás</button>
                <button type="button" disabled={!selectedDate} onClick={() => setStep(3)}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                  Continuar <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && !done && (
            <div>
              <h3 className="font-display text-2xl text-charcoal mb-2">Elige un horario</h3>
              {selectedDate && (
                <p className="font-body text-sm text-mink mb-6">
                  {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                </p>
              )}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-8">
                {TIME_SLOTS.map((t) => (
                  <button key={t} type="button" onClick={() => setSelectedTime(t)}
                    className={`py-2.5 px-3 rounded-xl border font-body text-xs transition-all duration-200 ${
                      selectedTime === t ? "bg-mauve text-white border-mauve" : "border-nude/60 text-mink hover:border-petal"
                    }`}
                  >{t}</button>
                ))}
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={() => setStep(2)} className="btn-outline text-xs py-2.5 px-5">Atrás</button>
                <button type="button" disabled={!selectedTime} onClick={() => setStep(4)}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                  Continuar <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && !done && (
            <div>
              <h3 className="font-display text-2xl text-charcoal mb-6">Tus datos de contacto</h3>
              <div className="bg-blush/50 rounded-2xl p-4 mb-6 space-y-1.5">
                <p className="eyebrow mb-2">Resumen de tu cita</p>
                <p className="font-body text-sm text-charcoal">✂️ <span className="font-medium">{selectedService}</span></p>
                <p className="font-body text-sm text-charcoal">
                  📅 <span className="font-medium">
                    {selectedDate && format(selectedDate, "dd/MM/yyyy")} — {selectedTime}
                  </span>
                </p>
              </div>
              <div className="space-y-4 mb-6">
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mink/60 pointer-events-none" />
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Tu nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-nude/60 bg-cream font-body text-sm text-charcoal placeholder:text-mink/50 focus:outline-none focus:border-mauve focus:ring-2 focus:ring-mauve/10 transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mink/60 pointer-events-none" />
                  <input
                    type="tel"
                    autoComplete="off"
                    placeholder="Tu número de WhatsApp"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-nude/60 bg-cream font-body text-sm text-charcoal placeholder:text-mink/50 focus:outline-none focus:border-mauve focus:ring-2 focus:ring-mauve/10 transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button type="button" onClick={() => setStep(3)} className="btn-outline text-xs py-2.5 px-5">Atrás</button>
                <button
                  type="button"
                  disabled={!name.trim() || !phone.trim()}
                  onClick={handleConfirm}
                  className="btn-whatsapp disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <MessageCircle size={16} />
                  Confirmar por WhatsApp
                </button>
              </div>
            </div>
          )}

          {/* Éxito */}
          {done && (
            <div className="text-center py-8">
              <CheckCircle2 size={56} className="text-mauve mx-auto mb-4" />
              <h3 className="font-display text-3xl text-charcoal mb-2">¡Solicitud enviada!</h3>
              <p className="font-body text-mink text-sm mb-2 max-w-xs mx-auto leading-relaxed">
                Tu mensaje fue enviado por WhatsApp. Te confirmaremos la cita en breve 🌸
              </p>
              <div className="bg-blush rounded-2xl p-4 text-left max-w-xs mx-auto mt-6 space-y-1.5">
                <p className="font-body text-xs text-mink">✂️ <span className="font-semibold">{selectedService}</span></p>
                <p className="font-body text-xs text-mink">
                  📅 <span className="font-semibold">
                    {selectedDate && format(selectedDate, "dd/MM/yyyy")} — {selectedTime}
                  </span>
                </p>
                <p className="font-body text-xs text-mink">👤 <span className="font-semibold">{name}</span></p>
              </div>
              <button type="button" onClick={resetForm} className="btn-outline mt-6 text-xs py-2.5 px-6">
                Hacer otra reserva
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
