import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const GENDERS = ["Male", "Female", "Other"];
const LANGUAGES = ["English", "Telugu", "Hindi", "Tamil"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const ACTIVITIES = ["Sedentary", "Low", "Medium", "High", "Very High"];
const BUDGETS = ["Under ₹50", "₹50-150", "₹150-300", "₹300+"];
const CONDITIONS = ["Diabetes", "Hypertension", "PCOS", "Thyroid", "Asthma", "Heart Disease", "None"];
const GOALS = ["Lose Weight", "Gain Weight", "Manage Condition", "Eat Healthier", "Sleep Better", "Reduce Stress", "Build Fitness", "Mental Wellness"];

export default function Onboarding() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", age: "", gender: "", language: "",
    height: "", weight: "", bloodGroup: "",
    hostelStudent: false, activity: "", budget: "",
    conditions: [] as string[], goals: [] as string[],
  });

  const bmi = form.height && form.weight
    ? (Number(form.weight) / ((Number(form.height) / 100) ** 2)).toFixed(1)
    : null;

  const bmiCategory = (bmi: string) => {
    const v = parseFloat(bmi);
    if (v < 18.5) return { label: "Underweight", color: "text-amber-500" };
    if (v < 25) return { label: "Normal", color: "text-healix-button" };
    if (v < 30) return { label: "Overweight", color: "text-amber-500" };
    return { label: "Obese", color: "text-destructive" };
  };

  const toggleArray = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];

  const Chip = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all
        ${selected ? "bg-primary text-primary-foreground" : "bg-background border border-border text-foreground hover:bg-card"}`}
    >
      {label}
    </button>
  );

  const complete = () => {
    toast({ title: "🎉 Setup complete! Welcome to Healix!", duration: 3000 });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-poppins">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/healix-logo.png" className="h-9 w-auto" alt="Healix" />
          <span className="text-primary font-bold text-xl tracking-tight">Healix</span>
        </div>
        <span className="text-muted-foreground text-sm">Step {step} of 5</span>
      </header>

      {/* Progress */}
      <div className="h-1.5 bg-secondary mx-6 rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-500 rounded-full" style={{ width: `${(step / 5) * 100}%` }} />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg space-y-6">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-foreground">Tell us about you</h2>
              <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-card border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              <input placeholder="Age" type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })}
                className="w-full bg-card border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              <div>
                <p className="text-sm text-muted-foreground mb-2">Gender</p>
                <div className="flex gap-2">{GENDERS.map(g => <Chip key={g} label={g} selected={form.gender === g} onClick={() => setForm({ ...form, gender: g })} />)}</div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Language</p>
                <div className="flex flex-wrap gap-2">{LANGUAGES.map(l => <Chip key={l} label={l} selected={form.language === l} onClick={() => setForm({ ...form, language: l })} />)}</div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold text-foreground">Your body stats</h2>
              <input placeholder="Height (cm)" type="number" value={form.height} onChange={e => setForm({ ...form, height: e.target.value })}
                className="w-full bg-card border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              <input placeholder="Weight (kg)" type="number" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })}
                className="w-full bg-card border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              <select value={form.bloodGroup} onChange={e => setForm({ ...form, bloodGroup: e.target.value })}
                className="w-full bg-card border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <option value="">Select Blood Group</option>
                {BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}
              </select>
              {bmi && (
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">Your BMI</p>
                  <p className="text-3xl font-bold text-foreground">{bmi}</p>
                  <span className={`text-sm font-bold ${bmiCategory(bmi).color}`}>{bmiCategory(bmi).label}</span>
                </div>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold text-foreground">Your lifestyle</h2>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Are you a hostel student?</p>
                <div className="flex gap-2">
                  <Chip label="YES" selected={form.hostelStudent} onClick={() => setForm({ ...form, hostelStudent: true })} />
                  <Chip label="NO" selected={!form.hostelStudent} onClick={() => setForm({ ...form, hostelStudent: false })} />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Activity Level</p>
                <div className="flex flex-wrap gap-2">{ACTIVITIES.map(a => <Chip key={a} label={a} selected={form.activity === a} onClick={() => setForm({ ...form, activity: a })} />)}</div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Meal Budget</p>
                <div className="flex flex-wrap gap-2">{BUDGETS.map(b => <Chip key={b} label={b} selected={form.budget === b} onClick={() => setForm({ ...form, budget: b })} />)}</div>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-2xl font-bold text-foreground">Health conditions</h2>
              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map(c => (
                  <Chip key={c} label={c} selected={form.conditions.includes(c)} onClick={() => setForm({ ...form, conditions: toggleArray(form.conditions, c) })} />
                ))}
              </div>
              {form.conditions.includes("Diabetes") && (
                <div className="bg-card border border-healix-button rounded-lg p-4 text-sm text-foreground">
                  ✅ Diabetes module activated
                </div>
              )}
              {form.conditions.includes("PCOS") && (
                <div className="bg-card border border-healix-button rounded-lg p-4 text-sm text-foreground">
                  ✅ PCOS manager activated
                </div>
              )}
            </>
          )}

          {step === 5 && (
            <>
              <h2 className="text-2xl font-bold text-foreground">Your goals</h2>
              <div className="flex flex-wrap gap-2">
                {GOALS.map(g => (
                  <button
                    key={g}
                    onClick={() => setForm({ ...form, goals: toggleArray(form.goals, g) })}
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all
                      ${form.goals.includes(g) ? "bg-healix-button text-primary-foreground" : "bg-background border border-border text-foreground hover:bg-card"}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)} className="flex-1 py-3 border border-primary text-primary font-bold rounded-lg text-sm">
                ← Back
              </button>
            )}
            <button
              onClick={() => step < 5 ? setStep(s => s + 1) : complete()}
              className="flex-1 py-3 bg-healix-button text-primary-foreground font-bold rounded-lg text-sm hover:-translate-y-0.5 transition-transform"
            >
              {step === 5 ? "🎉 Complete Setup →" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
