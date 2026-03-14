import { useOnboarding } from "@/contexts/OnboardingContext";
import { Input } from "@/components/ui/input";
import ChipSelect from "../ChipSelect";
import NavButtons from "../NavButtons";

export default function Screen5Diet() {
  const { data, updateData } = useOnboarding();

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-foreground">Diet preferences</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Diet type</label>
          <ChipSelect
            options={["Vegetarian", "Non-veg", "Vegan", "Eggetarian"]}
            selected={data.dietType}
            onSelect={v => updateData({ dietType: v })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Cuisine preference</label>
          <ChipSelect
            options={["South Indian", "North Indian", "Mixed", "Continental"]}
            selected={data.cuisine}
            onSelect={v => updateData({ cuisine: v })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Allergies</label>
          <Input value={data.allergies} onChange={e => updateData({ allergies: e.target.value })} placeholder="e.g. peanuts, dairy (comma separated)" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Meal budget</label>
          <ChipSelect
            options={["Under ₹50", "₹50–150", "₹150+"]}
            selected={data.mealBudget}
            onSelect={v => updateData({ mealBudget: v })}
          />
        </div>
      </div>

      <NavButtons />
    </div>
  );
}
