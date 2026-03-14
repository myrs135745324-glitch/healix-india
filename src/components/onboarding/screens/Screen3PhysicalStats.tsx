import { useOnboarding } from "@/contexts/OnboardingContext";
import { Input } from "@/components/ui/input";
import NavButtons from "../NavButtons";
import FieldError from "../FieldError";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFieldValidation } from "@/hooks/useFieldValidation";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500", bg: "bg-blue-50 border-blue-200" };
  if (bmi < 25) return { label: "Healthy", color: "text-primary", bg: "bg-primary/5 border-primary/20" };
  if (bmi < 30) return { label: "Overweight", color: "text-amber-500", bg: "bg-amber-50 border-amber-200" };
  return { label: "Obese", color: "text-destructive", bg: "bg-red-50 border-red-200" };
}

function bmiMessage(bmi: number) {
  if (bmi < 18.5) return "You're a bit underweight. Let's work on a healthy diet plan!";
  if (bmi < 25) return "You're in a healthy range. Great job maintaining your weight!";
  if (bmi < 30) return "Slightly overweight. Small lifestyle changes can make a big difference!";
  return "Let's create a plan to help you reach a healthier weight.";
}

export default function Screen3PhysicalStats() {
  const { data, updateData, setStep } = useOnboarding();

  const { errors, validateAll, clearError } = useFieldValidation({
    height: { required: true, label: "Height", min: 50, max: 300 },
    weight: { required: true, label: "Weight", min: 10, max: 500 },
  });

  const h = parseFloat(data.height);
  const w = parseFloat(data.weight);
  const bmi = h && w ? w / ((h / 100) ** 2) : null;

  if (bmi && data.bmi !== bmi.toFixed(1)) {
    updateData({ bmi: bmi.toFixed(1) });
  }

  const handleNext = () => {
    if (validateAll({ height: data.height, weight: data.weight })) {
      setStep(4);
    }
  };

  const cat = bmi ? bmiCategory(bmi) : null;

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-foreground">Physical stats</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Height (cm) *</label>
          <Input
            type="number"
            value={data.height}
            onChange={e => { updateData({ height: e.target.value }); clearError("height"); }}
            placeholder="e.g. 170"
            className={errors.height ? "border-destructive" : ""}
          />
          <FieldError message={errors.height} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Weight (kg) *</label>
          <Input
            type="number"
            value={data.weight}
            onChange={e => { updateData({ weight: e.target.value }); clearError("weight"); }}
            placeholder="e.g. 65"
            className={errors.weight ? "border-destructive" : ""}
          />
          <FieldError message={errors.weight} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Blood Group</label>
          <select
            value={data.bloodGroup}
            onChange={e => updateData({ bloodGroup: e.target.value })}
            className="w-full bg-background border border-input rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select</option>
            {BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <AnimatePresence>
        {bmi && cat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={cn("border rounded-lg p-5 text-center space-y-2", cat.bg)}
          >
            <p className="text-sm text-muted-foreground">Your BMI</p>
            <p className="text-4xl font-bold text-foreground">{bmi.toFixed(1)}</p>
            <span className={cn("text-sm font-semibold", cat.color)}>{cat.label}</span>
            <p className="text-xs text-muted-foreground mt-1">{bmiMessage(bmi)}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <NavButtons onNext={handleNext} />
    </div>
  );
}
