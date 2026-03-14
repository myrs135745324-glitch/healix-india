import { useOnboarding } from "@/contexts/OnboardingContext";
import ChipSelect from "../ChipSelect";
import NavButtons from "../NavButtons";

const GOALS = ["Lose weight", "Gain weight", "Manage a condition", "Sleep better", "Reduce stress", "Eat healthier", "Be more active", "Track medications", "Improve fitness"];

export default function Screen9Goals() {
  const { data, updateData } = useOnboarding();

  const handleSelect = (val: string) => {
    const updated = data.healthGoals.includes(val)
      ? data.healthGoals.filter(g => g !== val)
      : [...data.healthGoals, val];
    updateData({ healthGoals: updated });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Your health goals</h2>
        <p className="text-sm text-muted-foreground mt-1">Select all that matter to you</p>
      </div>

      <ChipSelect options={GOALS} selected={data.healthGoals} onSelect={handleSelect} multi />

      <NavButtons />
    </div>
  );
}
