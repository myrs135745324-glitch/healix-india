import { useOnboarding } from "@/contexts/OnboardingContext";
import ChipSelect from "../ChipSelect";
import NavButtons from "../NavButtons";

const CONDITIONS = ["Diabetes", "Hypertension", "Asthma", "Thyroid", "PCOD", "Anemia", "Heart disease", "Migraine", "Anxiety", "Depression", "None of these"];

export default function Screen6Conditions() {
  const { data, updateData } = useOnboarding();

  const handleSelect = (val: string) => {
    if (val === "None of these") {
      updateData({ healthConditions: data.healthConditions.includes(val) ? [] : ["None of these"] });
    } else {
      const filtered = data.healthConditions.filter(c => c !== "None of these");
      const updated = filtered.includes(val) ? filtered.filter(c => c !== val) : [...filtered, val];
      updateData({ healthConditions: updated });
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Health conditions</h2>
        <p className="text-sm text-muted-foreground mt-1">Select all that apply — we'll activate relevant modules</p>
      </div>

      <ChipSelect options={CONDITIONS} selected={data.healthConditions} onSelect={handleSelect} multi />

      <NavButtons />
    </div>
  );
}
