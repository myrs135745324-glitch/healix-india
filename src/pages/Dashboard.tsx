import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Droplets, Moon, Zap, Footprints, Plus, CheckCircle2, Pill } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { USER_DATA, WEEKLY_LOGS, type Med } from "@/data/userData";
import { useToast } from "@/hooks/use-toast";

function StatCard({ icon: Icon, label, value, target, unit, progress }: {
  icon: React.ElementType; label: string; value: string; target: string; unit: string; progress: number;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-background rounded-lg border border-border">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-xs font-semibold text-primary bg-accent/20 px-2 py-1 rounded-full">
          {Math.round(progress)}%
        </span>
      </div>
      <p className="text-[13px] text-muted-foreground font-medium">{label}</p>
      <h4 className="text-xl font-bold text-foreground mt-1">
        {value}{unit} <span className="text-sm font-normal text-muted-foreground">/ {target}{unit}</span>
      </h4>
      <div className="w-full h-2 bg-secondary rounded-full mt-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-healix-button rounded-full"
        />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { toast } = useToast();
  const [meds, setMeds] = useState<Med[]>(USER_DATA.meds);
  const [aiTip, setAiTip] = useState("Try adding Fenugreek (Methi) seeds to your hostel breakfast; it helps manage insulin sensitivity for PCOS and Diabetes.");
  const [tipLoading, setTipLoading] = useState(false);

  const refreshTip = () => {
    setTipLoading(true);
    setTimeout(() => {
      const tips = [
        "Try adding Fenugreek (Methi) seeds to your hostel breakfast; it helps manage insulin sensitivity for PCOS and Diabetes.",
        "Replace white rice with brown rice or millets to keep blood sugar stable throughout the day.",
        "A 15-minute post-meal walk can reduce blood sugar spikes by up to 30% — perfect for hostel corridors!",
        "Include curd (dahi) with lunch daily — probiotics help with both PCOS hormone balance and digestion.",
      ];
      setAiTip(tips[Math.floor(Math.random() * tips.length)]);
      setTipLoading(false);
    }, 1200);
  };

  const markMedDone = (id: number) => {
    setMeds(prev => prev.map(m => m.id === id ? { ...m, status: "taken" as const } : m));
    toast({ title: "✅ Medicine marked as taken!", duration: 2500 });
  };

  const logQuick = (item: string) => {
    toast({ title: `✅ ${item} logged successfully!`, duration: 2500 });
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Good Morning, Priya! 👋</h1>
          <p className="text-muted-foreground mt-1">Saturday, 14 March 2026</p>
          <div className="flex gap-2 mt-4">
            {USER_DATA.conditions.map(c => (
              <span key={c} className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="relative flex flex-col items-center">
          <div className="w-40 h-40 relative">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (283 * 74) / 100 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-primary">74</span>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Health Score</span>
            </div>
          </div>
          <div className="mt-2 bg-healix-button text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-md shadow-sm">
            GOOD
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Droplets} label="Water" value="1.2" target="2.5" unit="L" progress={48} />
        <StatCard icon={Moon} label="Sleep" value="7.2" target="8" unit=" hrs" progress={90} />
        <StatCard icon={Zap} label="Calories" value="1,240" target="1,800" unit=" kcal" progress={69} />
        <StatCard icon={Footprints} label="Steps" value="4,200" target="8,000" unit="" progress={52} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
          {/* AI Tip */}
          <div className="bg-background rounded-lg p-6 shadow-sm border-l-4 border-primary">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-primary">
                <Zap className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold uppercase tracking-wider">Today's AI Tip</span>
              </div>
              <button onClick={refreshTip} className="text-xs font-bold text-healix-button hover:underline">
                Refresh Tip
              </button>
            </div>
            {tipLoading ? (
              <div className="flex gap-1 py-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            ) : (
              <p className="text-base leading-relaxed text-foreground font-medium italic">"{aiTip}"</p>
            )}
          </div>

          {/* Chart */}
          <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-6 text-foreground">Weekly Activity</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEKLY_LOGS}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
                  <YAxis hide />
                  <Bar dataKey="steps" radius={[6, 6, 0, 0]}>
                    {WEEKLY_LOGS.map((_, i) => (
                      <Cell key={i} fill={i === 5 ? "hsl(121, 58%, 43%)" : "hsl(88, 51%, 52%)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {/* Medicines */}
          <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Pill className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Today's Medicines</h3>
            </div>
            <div className="space-y-4">
              {meds.map(med => (
                <div key={med.id} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/50">
                  <div>
                    <p className={`font-bold ${med.status === "taken" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {med.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">{med.time}</p>
                  </div>
                  {med.status === "taken" ? (
                    <CheckCircle2 className="w-6 h-6 text-healix-button" />
                  ) : (
                    <button
                      onClick={() => markMedDone(med.id)}
                      className="bg-healix-button text-primary-foreground text-xs font-bold px-4 py-2 rounded-lg shadow-sm hover:scale-105 transition-transform"
                    >
                      Mark Done
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Log */}
          <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-foreground">Quick Log</h3>
            <div className="grid grid-cols-2 gap-3">
              {["Water", "Meal", "Exercise", "Mood"].map(item => (
                <button
                  key={item}
                  onClick={() => logQuick(item)}
                  className="flex flex-col items-center justify-center p-4 bg-card border border-border rounded-lg hover:bg-healix-button hover:text-primary-foreground transition-all group"
                >
                  <Plus className="w-5 h-5 mb-1 text-healix-button group-hover:text-primary-foreground" />
                  <span className="text-xs font-bold">{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
