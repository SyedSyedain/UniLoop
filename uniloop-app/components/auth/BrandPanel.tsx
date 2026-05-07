"use client";

import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

const STATS = [
  { value: "50K+", label: "Families" },
  { value: "200+", label: "Schools"  },
  { value: "12T",  label: "CO₂ Saved"},
] as const;

function FloatingShape({ className, style }: { className: string; style?: React.CSSProperties }) {
  return <div className={className} style={style} aria-hidden="true" />;
}

export function BrandPanel() {
  return (
    <aside
      className="hidden lg:flex flex-col justify-between w-[42%] flex-shrink-0 p-10 relative overflow-hidden"
      aria-label="Uniloop brand information"
      style={{
        background:
          "linear-gradient(145deg, rgba(13,43,94,0.48) 0%, rgba(10,22,40,0.30) 100%)",
      }}
    >
      {/* Vertical gold separator */}
      <div
        className="absolute right-0 top-0 bottom-0 w-px"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(212,168,67,0.28) 30%, rgba(212,168,67,0.16) 70%, transparent)",
        }}
      />

      {/* Decorative floating shapes */}
      <FloatingShape className="float-a absolute top-16  right-14 w-20 h-20 rounded-2xl border border-[rgba(212,168,67,0.14)]" />
      <FloatingShape className="float-b absolute top-36  right-2  w-10 h-10 rounded-xl  border border-[rgba(212,168,67,0.10)]" />
      <FloatingShape className="float-c absolute bottom-44 right-6 w-16 h-16 rounded-2xl border border-[rgba(212,168,67,0.12)]" />
      <FloatingShape className="float-d absolute bottom-28 left-4  w-11 h-11 rounded-full border border-[rgba(212,168,67,0.10)]" />
      <FloatingShape
        className="float-a absolute top-56 left-2 w-8 h-8 rounded-lg border border-[rgba(212,168,67,0.08)]"
        style={{ animationDelay: "1.2s" }}
      />
      <FloatingShape
        className="float-b absolute top-72 right-20 w-5 h-5 rounded-full"
        style={{
          background: "rgba(212,168,67,0.18)",
          animationDelay: "0.6s",
          boxShadow: "0 0 12px rgba(212,168,67,0.25)",
        }}
      />

      {/* Logo */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #D4A843, #C49332)",
              boxShadow: "0 0 22px rgba(212,168,67,0.45)",
            }}
          >
            <RefreshCw size={19} className="text-navy-950" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">
            uni<span className="text-gold-500">loop</span>
          </span>
        </div>
        <p className="text-[10px] text-white/28 font-semibold tracking-[0.2em] uppercase">
          Closing the loop on uniform waste
        </p>
      </div>

      {/* Headline + stats */}
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-[2rem] font-extrabold text-white leading-[1.2] mb-3"
        >
          India&apos;s first<br />
          <span className="text-gold-500">uniform resale</span>
          <br />marketplace
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-sm text-white/40 leading-relaxed mb-8 max-w-[220px]"
        >
          Buy &amp; sell pre-loved school uniforms within your institution.
          Quality-verified, trusted, and sustainable.
        </motion.p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.08, duration: 0.5 }}
              className="text-center py-3 px-2 rounded-xl border border-white/[0.07] bg-white/[0.03]"
            >
              <p className="text-[1.1rem] font-extrabold text-gold-500">{stat.value}</p>
              <p className="text-[10px] text-white/32 font-semibold mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live indicator */}
      <div className="flex items-center gap-2">
        <span className="live-dot w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" aria-hidden="true" />
        <span className="text-[10px] text-white/30 font-medium">
          Live in Bangalore · Expanding to 10 cities
        </span>
      </div>
    </aside>
  );
}
