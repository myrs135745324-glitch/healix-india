import { useOnboarding } from "@/contexts/OnboardingContext";
import ChipSelect from "../ChipSelect";
import ToggleRow from "../ToggleRow";
import NavButtons from "../NavButtons";

const OCCUPATIONS = ["Student", "Working professional", "Homemaker", "Self-employed", "Other"];

export default function Screen4Lifestyle() {
  const { data, updateData } = useOnboarding();

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-foreground">Your lifestyle</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Occupation</label>
          <select
            value={data.occupation}
            onChange={e => updateData({ occupation: e.target.value })}
            className="w-full bg-background border border-input rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select</option>
            {OCCUPATIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div className="bg-card border border-border rounded-lg px-4">
          <ToggleRow
            label="Hostel mode"
            subtitle="Limited kitchen, budget meals"
            checked={data.hostelMode}
            onChange={v => updateData({ hostelMode: v })}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Activity Level</label>
          <ChipSelect
            options={["Sedentary", "Light", "Moderate", "Active", "Very active"]}
            selected={data.activityLevel}
            onSelect={v => updateData({ activityLevel: v })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Sleep time</label>
            <input
              type="time"
              value={data.sleepTime}
              onChange={e => updateData({ sleepTime: e.target.value })}
              className="w-full bg-background border border-input rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Wake time</label>
            <input
              type="time"
              value={data.wakeTime}
              onChange={e => updateData({ wakeTime: e.target.value })}
              className="w-full bg-background border border-input rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </div>

      <NavButtons />
    </div>
  );
}
