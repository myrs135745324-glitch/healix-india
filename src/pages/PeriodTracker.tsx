import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MOODS = ["😊", "😐", "😢", "😤", "😴"];
const FLOWS = ["Light", "Medium", "Heavy"];
const SYMPTOMS = ["Cramps", "Bloating", "Headache", "Fatigue", "Mood swings", "Back pain"];

export default function PeriodTracker() {
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [pmsReminder, setPmsReminder] = useState(true);
  const [month, setMonth] = useState(2); // March 2026
  const [year] = useState(2026);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = 14;
  const periodDays = [24, 25, 26, 27, 28].map(d => d - (daysInMonth === 28 ? 0 : 0)); // Feb period days mapped to current
  // Simulating period was ~18 days ago: Feb 24-28
  const periodDaysInMonth: number[] = []; // No period days in March for this cycle

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const saveLog = () => {
    toast({ title: "✅ Period log saved!", duration: 2500 });
  };

  return (
    <div className="space-y-8">
      {/* Prediction banner */}
      <div className="bg-primary text-primary-foreground rounded-lg p-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">🗓️ Next period predicted in 10 days</h3>
          <p className="text-primary-foreground/70 text-sm mt-1">Based on 28-day cycle • Last: 18 days ago</p>
        </div>
        <div className="w-16 h-16 rounded-full border-4 border-primary-foreground/30 flex items-center justify-center">
          <span className="text-2xl font-bold">10</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setMonth(m => Math.max(0, m - 1))} className="p-1 hover:bg-card rounded">
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <h3 className="font-bold text-foreground">{monthNames[month]} {year}</h3>
            <button onClick={() => setMonth(m => Math.min(11, m + 1))} className="p-1 hover:bg-card rounded">
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
              <div key={d} className="text-xs text-muted-foreground font-medium py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today && month === 2;
              const isPeriod = periodDaysInMonth.includes(day);
              return (
                <button
                  key={day}
                  className={`w-9 h-9 rounded-full text-sm font-medium mx-auto flex items-center justify-center transition-colors
                    ${isToday ? "bg-healix-button text-primary-foreground" : ""}
                    ${isPeriod ? "bg-primary text-primary-foreground" : ""}
                    ${!isToday && !isPeriod ? "hover:bg-card text-foreground" : ""}`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <button className="mt-6 w-full py-3 bg-healix-button text-primary-foreground font-bold rounded-lg text-sm">
            📅 Log Period Start Today
          </button>
        </div>

        {/* Daily Log */}
        <div className="space-y-6">
          {/* Mood */}
          <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h4 className="font-bold text-foreground mb-3">How are you feeling today?</h4>
            <div className="flex gap-3">
              {MOODS.map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedMood(m)}
                  className={`w-12 h-12 text-2xl rounded-full flex items-center justify-center transition-all
                    ${selectedMood === m ? "border-2 border-healix-button scale-110 bg-card" : "border border-border hover:bg-card"}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Flow */}
          <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h4 className="font-bold text-foreground mb-3">Flow Level</h4>
            <div className="flex gap-2">
              {FLOWS.map(f => (
                <button
                  key={f}
                  onClick={() => setSelectedFlow(f)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all
                    ${selectedFlow === f ? "bg-healix-button text-primary-foreground" : "bg-background border border-border text-foreground"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h4 className="font-bold text-foreground mb-3">Symptoms</h4>
            <div className="flex flex-wrap gap-2">
              {SYMPTOMS.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSymptom(s)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all
                    ${selectedSymptoms.includes(s) ? "bg-primary text-primary-foreground" : "bg-background border border-border text-foreground"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Add notes..."
            rows={3}
            className="w-full bg-card border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
          />

          {/* PMS Reminder */}
          <div className="bg-background border border-border rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="font-bold text-foreground">🔔 PMS Reminder</p>
              <p className="text-xs text-muted-foreground">Notify 3 days before next period</p>
            </div>
            <button
              onClick={() => setPmsReminder(!pmsReminder)}
              className={`w-12 h-7 rounded-full transition-colors relative ${pmsReminder ? "bg-healix-button" : "bg-muted-foreground/30"}`}
            >
              <div className={`w-5 h-5 bg-background rounded-full absolute top-1 transition-all ${pmsReminder ? "left-6" : "left-1"}`} />
            </button>
          </div>

          <button
            onClick={saveLog}
            className="w-full py-3 bg-healix-button text-primary-foreground font-bold rounded-lg text-sm"
          >
            💾 Save Today's Log
          </button>
        </div>
      </div>
    </div>
  );
}
