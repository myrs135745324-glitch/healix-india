import { useState } from "react";
import { USER_DATA } from "@/data/userData";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [toggles, setToggles] = useState({
    medReminders: true, waterReminders: true, periodReminders: true, darkMode: false,
  });

  const Toggle = ({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: () => void }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-foreground text-sm">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        onClick={onChange}
        className={`w-12 h-7 rounded-full transition-colors relative ${value ? "bg-healix-button" : "bg-muted-foreground/30"}`}
      >
        <div className={`w-5 h-5 bg-background rounded-full absolute top-1 transition-all ${value ? "left-6" : "left-1"}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Profile header */}
      <div className="bg-primary text-primary-foreground rounded-lg p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 bg-healix-button rounded-full flex items-center justify-center text-primary-foreground font-bold text-4xl shadow-inner">
          P
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold">{USER_DATA.name}</h2>
          <p className="text-primary-foreground/80">{USER_DATA.age} years • {USER_DATA.gender} • {USER_DATA.stats.blood} Blood Group</p>
          <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
            <span className="bg-primary-foreground/20 text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">{USER_DATA.role}</span>
            <span className="bg-primary-foreground/10 text-primary-foreground/70 text-xs px-3 py-1 rounded-full">{USER_DATA.activity} Activity • {USER_DATA.budget}/meal</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left */}
        <div className="space-y-6">
          <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-foreground mb-4">Health Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ["Height", `${USER_DATA.stats.height} cm`],
                ["Weight", `${USER_DATA.stats.weight} kg`],
                ["BMI", `${USER_DATA.stats.bmi}`],
                ["Blood Group", USER_DATA.stats.blood],
                ["Activity", USER_DATA.activity],
                ["Budget", USER_DATA.budget],
                ["Language", USER_DATA.language],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-muted-foreground text-xs">{label}</p>
                  <p className="font-bold text-foreground flex items-center gap-2">
                    {value}
                    {label === "BMI" && <span className="text-xs bg-healix-button text-primary-foreground px-2 py-0.5 rounded-full">Normal</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-foreground mb-3">Conditions</h3>
            <div className="flex gap-2">
              {USER_DATA.conditions.map(c => (
                <span key={c} className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full">{c}</span>
              ))}
            </div>
            <h3 className="font-bold text-foreground mt-4 mb-3">Goals</h3>
            <div className="flex flex-wrap gap-2">
              {USER_DATA.goals.map(g => (
                <span key={g} className="bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full">{g}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-foreground mb-4">Medications</h3>
            <div className="space-y-3">
              {USER_DATA.meds.map(med => (
                <div key={med.id} className="flex items-center justify-between p-3 bg-card border border-border/50 rounded-lg">
                  <div>
                    <p className="font-bold text-foreground text-sm">{med.name}</p>
                    <p className="text-xs text-muted-foreground">{med.time}</p>
                  </div>
                  <span className="text-xs font-bold text-healix-button">✅ Active</span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2 border border-healix-button text-healix-button font-bold text-sm rounded-lg hover:bg-healix-button hover:text-primary-foreground transition-colors">
              + Add Medication
            </button>
          </div>

          <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-foreground mb-4">This Month Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ["💧 Avg water", "1,760 ml/day"],
                ["😴 Avg sleep", "7.2 hrs/day"],
                ["🔥 Avg calories", "1,570/day"],
                ["👟 Avg steps", "5,700/day"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-muted-foreground text-xs">{label}</p>
                  <p className="font-bold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-foreground mb-4">Settings</h3>
            <Toggle label="Medication Reminders" desc="Daily medicine notifications" value={toggles.medReminders} onChange={() => setToggles(t => ({ ...t, medReminders: !t.medReminders }))} />
            <Toggle label="Water Reminders" desc="Hourly hydration alerts" value={toggles.waterReminders} onChange={() => setToggles(t => ({ ...t, waterReminders: !t.waterReminders }))} />
            <Toggle label="Period Reminders" desc="Cycle tracking notifications" value={toggles.periodReminders} onChange={() => setToggles(t => ({ ...t, periodReminders: !t.periodReminders }))} />
            <Toggle label="Dark Mode" desc="Switch to dark theme" value={toggles.darkMode} onChange={() => setToggles(t => ({ ...t, darkMode: !t.darkMode }))} />
          </div>

          <button
            onClick={() => {
              if (editing) toast({ title: "✅ Profile saved!", duration: 2500 });
              setEditing(!editing);
            }}
            className="w-full py-3 bg-healix-button text-primary-foreground font-bold rounded-lg text-sm"
          >
            {editing ? "💾 Save Changes" : "✏️ Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
