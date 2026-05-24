"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { es } from "date-fns/locale";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import toast from "react-hot-toast";
import { Calendar, Clock, User, Phone, ChevronRight, CheckCircle2 } from "lucide-react";

const SERVICES_LIST = [
  "Tinte de Cabello",
  "Alisado Permanente",
  "Planchado",
  "Ondas Perfectas",
  "Corte de Cabello",
  "Pintado de Uñas",
];

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "2:00 PM",
  "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
  "4:30 PM", "5:00 PM",
];

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50300000000";

type Step = 1 | 2 | 3 | 4;

export default function Booking() {
  const [step, setStep]             = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [name, setName]             = useState("");
  const [phone, setPhone]           = useState("");
  const [loading, setLoading]       = useState(false);

  const today      = startOfToday();
  const disabledDays = [
    { before: addDays(today, 1) },
    { dayOfWeek: [0] }, // Sundays closed
  ];

  const handleSubmit = async () => {
    if (!name || !phone || !selectedDate || !selectedTime || !selectedService) {
      toast.error("Por favor completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service: selectedService,
          date: format(selectedDate, "yyyy-MM-dd"),
          time: selectedTime,
        }),
      });
      if (!res.ok) throw new Error();
      setStep(4);

      // Also open WhatsApp confirmation
      const msg = encodeURIComponent(
        `Hola! Quiero confirmar mi cita:\n👤 *${name}*\n✂️ *${selectedService}*\n📅 *${format(selectedDate, "dd/MM/yyyy")}* a las *${selectedTime}*\n📱 ${phone}`
      );
      setTimeout(() => window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank"), 1000);
    } catch {
      toast.error("Ocurrió un error. Intenta reservar por WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const stepLabels = ["Servicio", "Fecha", "Hora", "Datos"];

  return (
    <section id="reservar" className="py-24 lg:py-32 bg-cream">
      <div className="section-padding max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-8 h-px bg-mauve" />
            <span className="eyebrow">Agenda en línea</span>
            <div className="w-8 h-px bg-mauve" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-section text-charcoal"
          >
            Reserva tu Cita
          </motion.h2>
        </div>

        {/* Stepper */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-2 mb-10">
            {stepLabels.map((label, i) => {
              const s = (i + 1) as Step;
              const active = step === s;
              const done   = step > s;
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className={`flex items-center gap-1.5 transition-all duration-300 ${active ? "opacity-100" : done ? "opacity-70" : "opacity-30"}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-medium transition-colors duration-300 ${active ? "bg-mauve text-white" : done ? "bg-petal text-mauve" : "bg-nude text-mink"}`}>
                      {done ? "✓" : s}
                    </div>
                    <span className="font-body text-xs text-charcoal hidden sm:block">{label}</span>
                  </div>
                  {i < 3 && <div className="w-6 h-px bg-nude mx-1" />}
                </div>
              );
            })}
          </div>
        )}

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white rounded-4xl p-8 sm:p-10 shadow-card border border-nude/40"
        >
          {/* ─── Step 1: Service ─── */}
          {step === 1 && (
            <div>
              <h3 className="font-display text-2xl text-charcoal mb-6">
                ¿Qué servicio deseas?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES_LIST.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedService(s)}
                    className={`text-left px-5 py-4 rounded-2xl border-2 font-body text-sm transition-all duration-200 ${
                      selectedService === s
                        ? "border-mauve bg-blush text-charcoal font-medium"
                        : "border-nude/60 text-mink hover:border-petal hover:bg-blush/30"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <button
                  disabled={!selectedService}
                  onClick={() => setStep(2)}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuar <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ─── Step 2: Date ─── */}
          {step === 2 && (
            <div>
              <h3 className="font-display text-2xl text-charcoal mb-6">
                Elige una fecha
              </h3>
              <div className="flex justify-center">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={disabledDays}
                  locale={es}
                  fromDate={addDays(today, 1)}
                  className="border-0"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(1)} className="btn-outline text-xs py-2.5 px-5">
                  Atrás
                </button>
                <button
                  disabled={!selectedDate}
                  onClick={() => setStep(3)}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuar <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ─── Step 3: Time ─── */}
          {step === 3 && (
            <div>
              <h3 className="font-display text-2xl text-charcoal mb-2">
                Elige un horario
              </h3>
              {selectedDate && (
                <p className="font-body text-sm text-mink mb-6">
                  {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                </p>
              )}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-2.5 px-3 rounded-xl border font-body text-xs transition-all duration-200 ${
                      selectedTime === t
                        ? "bg-mauve text-white border-mauve"
                        : "border-nude/60 text-mink hover:border-petal"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="btn-outline text-xs py-2.5 px-5">
                  Atrás
                </button>
                <button
                  disabled={!selectedTime}
                  onClick={() => setStep(4 as any)}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                  // go to step 3.5 (info form)
                  // actually step numbering is 1-4 and step 4 is confirm
                  // let's keep it as is and add the form inside step 3 flow
                >
                  Continuar <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ─── "Step 3.5": Contact info (shown when step === 4 but not yet submitted) ─── */}
          {(step as any) === 4 && !loading && (
            <div>
              {/* Check if it's the success state */}
              {name && phone && (
                <div className="text-center py-8">
                  <CheckCircle2 size={56} className="text-mauve mx-auto mb-4" />
                  <h3 className="font-display text-3xl text-charcoal mb-2">¡Cita solicitada!</h3>
                  <p className="font-body text-mink text-sm mb-2">
                    Recibirás confirmación vía WhatsApp.
                  </p>
                  <div className="bg-blush rounded-2xl p-4 text-left max-w-xs mx-auto mt-6 space-y-2">
                    <p className="font-body text-xs text-mink"><span className="font-semibold">Servicio:</span> {selectedService}</p>
                    <p className="font-body text-xs text-mink"><span className="font-semibold">Fecha:</span> {selectedDate && format(selectedDate, "dd/MM/yyyy")}</p>
                    <p className="font-body text-xs text-mink"><span className="font-semibold">Hora:</span> {selectedTime}</p>
                    <p className="font-body text-xs text-mink"><span className="font-semibold">Nombre:</span> {name}</p>
                  </div>
                  <button
                    onClick={() => { setStep(1); setName(""); setPhone(""); setSelectedDate(undefined); setSelectedTime(""); setSelectedService(""); }}
                    className="btn-outline mt-6 text-xs py-2.5 px-6"
                  >
                    Nueva reserva
                  </button>
                </div>
              )}

              {!name && (
                <>
                  <h3 className="font-display text-2xl text-charcoal mb-6">
                    Tus datos de contacto
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mink/60" />
                      <input
                        type="text"
                        placeholder="Tu nombre completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-nude/60 bg-cream font-body text-sm text-charcoal placeholder:text-mink/50 focus:outline-none focus:border-mauve focus:ring-2 focus:ring-mauve/10 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mink/60" />
                      <input
                        type="tel"
                        placeholder="Tu número de WhatsApp"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-nude/60 bg-cream font-body text-sm text-charcoal placeholder:text-mink/50 focus:outline-none focus:border-mauve focus:ring-2 focus:ring-mauve/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-blush/60 rounded-2xl p-4 mb-6 space-y-1.5">
                    <p className="eyebrow mb-2">Resumen de tu cita</p>
                    <p className="font-body text-xs text-mink">✂️ {selectedService}</p>
                    <p className="font-body text-xs text-mink">📅 {selectedDate && format(selectedDate, "dd/MM/yyyy")} — {selectedTime}</p>
                  </div>

                  <div className="flex justify-between">
                    <button onClick={() => setStep(3)} className="btn-outline text-xs py-2.5 px-5">
                      Atrás
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading || !name || !phone}
                      className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {loading ? "Reservando..." : "Confirmar Cita"}
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
