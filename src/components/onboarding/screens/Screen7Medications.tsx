import { useOnboarding, Medication } from "@/contexts/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NavButtons from "../NavButtons";
import { Plus, Trash2 } from "lucide-react";

export default function Screen7Medications() {
  const { data, updateData } = useOnboarding();

  const addMed = () => {
    updateData({ medications: [...data.medications, { name: "", dose: "", frequency: "Once daily", reminderTime: "08:00" }] });
  };

  const updateMed = (i: number, field: keyof Medication, val: string) => {
    const meds = [...data.medications];
    meds[i] = { ...meds[i], [field]: val };
    updateData({ medications: meds });
  };

  const removeMed = (i: number) => {
    updateData({ medications: data.medications.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-foreground">Your medications</h2>

      <div className="space-y-4 max-h-[50vh] overflow-y-auto scrollbar-healix">
        {data.medications.map((med, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-4 space-y-3 relative">
            <button onClick={() => removeMed(i)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </button>
            <Input value={med.name} onChange={e => updateMed(i, "name", e.target.value)} placeholder="Medicine name" />
            <Input value={med.dose} onChange={e => updateMed(i, "dose", e.target.value)} placeholder="Dose (e.g. 500mg)" />
            <select
              value={med.frequency}
              onChange={e => updateMed(i, "frequency", e.target.value)}
              className="w-full bg-background border border-input rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option>Once daily</option>
              <option>Twice daily</option>
              <option>3x daily</option>
            </select>
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={addMed} className="w-full border-dashed border-primary text-primary">
        <Plus className="w-4 h-4 mr-1" /> Add medication
      </Button>

      <NavButtons />
    </div>
  );
}
