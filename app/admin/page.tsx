"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar, Users, Scissors, Plus, Check, X,
  RefreshCw, LogOut, Eye
} from "lucide-react";
import toast from "react-hot-toast";

type Appointment = {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
};

// Simple PIN auth (change this in production!)
const ADMIN_PIN = "1234";

export default function AdminPage() {
  const [authed, setAuthed]             = useState(false);
  const [pin, setPin]                   = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading]           = useState(false);
  const [activeTab, setActiveTab]       = useState<"appointments" | "services">("appointments");

  // New service form
  const [newService, setNewService] = useState({
    name: "", description: "", price: "", duration: "", popular: false,
  });

  const handleLogin = () => {
    if (pin === ADMIN_PIN) { setAuthed(true); fetchAppointments(); }
    else toast.error("PIN incorrecto");
  };

  const fetchAppointments = async () => {
    setLoading(true);
    const res  = await fetch("/api/appointments");
    const data = await res.json();
    setAppointments(data.appointments ?? []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: "confirmed" | "cancelled") => {
    const res = await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
      toast.success(status === "confirmed" ? "Cita confirmada ✓" : "Cita cancelada");
    }
  };

  const addService = async () => {
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newService, sort_order: 99 }),
    });
    if (res.ok) {
      toast.success("Servicio agregado ✨");
      setNewService({ name: "", description: "", price: "", duration: "", popular: false });
    } else {
      toast.error("Error al agregar servicio");
    }
  };

  const statusColor = (s: string) =>
    s === "confirmed" ? "bg-green-100 text-green-700"
    : s === "cancelled" ? "bg-red-100 text-red-700"
    : "bg-amber-100 text-amber-700";

  if (!authed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-5">
        <div className="bg-white rounded-4xl shadow-card border border-nude/40 p-10 w-full max-w-sm text-center">
          <h1 className="font-display text-3xl text-charcoal mb-2">Admin</h1>
          <p className="font-body text-sm text-mink mb-8">Ingresa tu PIN de administrador</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="••••"
            className="w-full text-center px-4 py-3 rounded-xl border border-nude/60 font-body text-xl tracking-widest mb-4 focus:outline-none focus:border-mauve"
          />
          <button onClick={handleLogin} className="btn-primary w-full justify-center">
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-5 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-charcoal">Panel Admin</h1>
            <p className="font-body text-sm text-mink">Lumière Beauty Studio</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchAppointments} className="p-2 rounded-full bg-white border border-nude/40 text-mink hover:text-mauve transition-colors">
              <RefreshCw size={16} />
            </button>
            <button onClick={() => setAuthed(false)} className="p-2 rounded-full bg-white border border-nude/40 text-mink hover:text-red-500 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total citas", value: appointments.length, icon: Calendar, color: "bg-blush" },
            { label: "Pendientes",  value: appointments.filter(a => a.status === "pending").length,   icon: RefreshCw, color: "bg-champagne" },
            { label: "Confirmadas", value: appointments.filter(a => a.status === "confirmed").length, icon: Check, color: "bg-green-50" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`${s.color} rounded-2xl p-5 border border-nude/30`}>
                <Icon size={18} className="text-mauve mb-2" />
                <p className="font-display text-2xl text-charcoal">{s.value}</p>
                <p className="font-body text-xs text-mink">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["appointments", "services"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full font-body text-sm transition-all ${
                activeTab === tab ? "bg-mauve text-white" : "bg-white text-mink border border-nude/40 hover:border-petal"
              }`}
            >
              {tab === "appointments" ? "Citas" : "Servicios"}
            </button>
          ))}
        </div>

        {/* Appointments tab */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-3xl shadow-card border border-nude/40 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-12 gap-2 text-mink">
                <RefreshCw size={16} className="animate-spin" />
                <span className="font-body text-sm">Cargando...</span>
              </div>
            ) : appointments.length === 0 ? (
              <p className="text-center py-12 font-body text-sm text-mink/60">
                No hay citas registradas aún.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-ivory border-b border-nude/40">
                    <tr>
                      {["Clienta", "Servicio", "Fecha", "Hora", "Teléfono", "Estado", "Acciones"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-mink/60">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-nude/30">
                    {appointments.map((a) => (
                      <tr key={a.id} className="hover:bg-ivory/50 transition-colors">
                        <td className="px-4 py-3 font-body font-medium text-charcoal">{a.name}</td>
                        <td className="px-4 py-3 font-body text-mink text-xs">{a.service}</td>
                        <td className="px-4 py-3 font-body text-mink text-xs">{a.date}</td>
                        <td className="px-4 py-3 font-body text-mink text-xs">{a.time}</td>
                        <td className="px-4 py-3">
                          <a href={`https://wa.me/${a.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                            className="font-body text-xs text-[#25D366] hover:underline"
                          >{a.phone}</a>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[0.65rem] font-body font-medium ${statusColor(a.status)}`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {a.status === "pending" && (
                            <div className="flex gap-2">
                              <button onClick={() => updateStatus(a.id, "confirmed")}
                                className="p-1 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors">
                                <Check size={14} />
                              </button>
                              <button onClick={() => updateStatus(a.id, "cancelled")}
                                className="p-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                                <X size={14} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Services tab */}
        {activeTab === "services" && (
          <div className="bg-white rounded-3xl shadow-card border border-nude/40 p-6">
            <h3 className="font-display text-xl text-charcoal mb-6">Agregar nuevo servicio</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {["name", "description", "price", "duration"].map((field) => (
                <input
                  key={field}
                  value={(newService as any)[field]}
                  onChange={(e) => setNewService({ ...newService, [field]: e.target.value })}
                  placeholder={field === "name" ? "Nombre" : field === "description" ? "Descripción" : field === "price" ? "Precio (ej: Desde $30)" : "Duración (ej: 1 hora)"}
                  className="px-4 py-3 rounded-xl border border-nude/60 font-body text-sm focus:outline-none focus:border-mauve transition-all"
                />
              ))}
            </div>
            <label className="flex items-center gap-2 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={newService.popular}
                onChange={(e) => setNewService({ ...newService, popular: e.target.checked })}
                className="accent-mauve"
              />
              <span className="font-body text-sm text-mink">Marcar como popular</span>
            </label>
            <button onClick={addService} className="btn-primary">
              <Plus size={16} /> Agregar Servicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
