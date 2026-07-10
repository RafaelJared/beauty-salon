import { Star, Crown, Sparkle, Gem, BadgeCheck } from "lucide-react";

const items = [
  { icon: Star,       label: "4.9 de calificación"      },
  { icon: Crown,      label: "500+ clientas atendidas"  },
  { icon: Sparkle,    label: "8 años de experiencia"    },
  { icon: Gem,        label: "Productos profesionales"  },
  { icon: BadgeCheck, label: "Especialistas certificadas" },
];

export default function TrustBar() {
  return (
    <section className="bg-ink text-[#eee5da]">
      <div className="section-padding max-w-7xl mx-auto py-6 flex flex-wrap justify-between items-center gap-5">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2.5 text-[0.86rem] font-body">
            <Icon size={17} className="text-gold shrink-0" />
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}
