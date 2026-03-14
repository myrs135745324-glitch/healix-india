import { useOnboarding } from "@/contexts/OnboardingContext";
import { Input } from "@/components/ui/input";
import ChipSelect from "../ChipSelect";
import ToggleRow from "../ToggleRow";
import NavButtons from "../NavButtons";

export default function Screen8GenderSpecific() {
  const { data, updateData } = useOnboarding();

  if (data.gender === "Female") {
    return (
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-foreground">Women's health</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Last period date</label>
            <Input type="date" value={data.periodDate} onChange={e => updateData({ periodDate: e.target.value })} />
          </div>
          <div className="bg-card border border-border rounded-lg px-4">
            <ToggleRow label="PCOS / PCOD" checked={data.pcos} onChange={v => updateData({ pcos: v })} />
            <ToggleRow label="Pregnant" checked={data.pregnant} onChange={v => updateData({ pregnant: v })} />
          </div>
        </div>

        <NavButtons />
      </div>
    );
  }

  if (data.gender === "Male") {
    return (
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-foreground">Men's health</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Fitness goal</label>
            <ChipSelect
              options={["Build muscle", "Lose fat", "Maintain weight", "Improve stamina"]}
              selected={data.fitnessGoal}
              onSelect={v => updateData({ fitnessGoal: v })}
            />
          </div>
          <div className="bg-card border border-border rounded-lg px-4">
            <ToggleRow label="Gym member" checked={data.gymMember} onChange={v => updateData({ gymMember: v })} />
            <ToggleRow label="Smoking" checked={data.smoking} onChange={v => updateData({ smoking: v })} />
            <ToggleRow label="Drinking" checked={data.drinking} onChange={v => updateData({ drinking: v })} />
          </div>
        </div>

        <NavButtons />
      </div>
    );
  }

  // "Other" gender — skip this screen
  return null;
}
