import { useOnboarding } from "@/contexts/OnboardingContext";
import { Input } from "@/components/ui/input";
import NavButtons from "../NavButtons";
import { Bell, Droplets, Moon, Calendar } from "lucide-react";

export default function Screen10Notifications() {
  const { data, updateData } = useOnboarding();

  const updateReminder = (key: keyof typeof data.reminders, val: string) => {
    updateData({ reminders: { ...data.reminders, [key]: val } });
  };

  const rows = [
    { key: "medication" as const, icon: Bell, label: "Medication reminder", type: "time" },
    { key: "water" as const, icon: Droplets, label: "Water reminder", type: "text" },
    { key: "sleep" as const, icon: Moon, label: "Sleep reminder", type: "time" },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-foreground">Reminder settings</h2>

      <div className="space-y-4">
        {rows.map(({ key, icon: Icon, label, type }) => (
          <div key={key} className="flex items-center gap-3 bg-card border border-border rounded-lg p-4">
            <Icon className="w-5 h-5 text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{label}</p>
            </div>
            <input
              type={type}
              value={data.reminders[key]}
              onChange={e => updateReminder(key, e.target.value)}
              className="bg-background border border-input rounded-md px-2.5 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        ))}

        {data.gender === "Female" && (
          <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-4">
            <Calendar className="w-5 h-5 text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Period reminder</p>
            </div>
            <input
              type="text"
              value={data.reminders.period}
              onChange={e => updateReminder("period", e.target.value)}
              className="bg-background border border-input rounded-md px-2.5 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        )}
      </div>

      <NavButtons />
    </div>
  );
}
