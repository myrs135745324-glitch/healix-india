import { useState } from "react";
import { Zap } from "lucide-react";
import { MEAL_DATA, type Meal } from "@/data/mealData";
import { useToast } from "@/hooks/use-toast";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const BORDER_COLORS: Record<string, string> = {
  Breakfast: "border-l-4 border-primary",
  Lunch: "border-l-4 border-healix-button",
  Dinner: "border-l-4 border-primary",
  Snacks: "border-l-4 border-accent",
};

export default function DietPlanner() {
  const { toast } = useToast();
  const today = new Date().toLocaleDateString("en-US", { weekday: "short" }).slice(0, 3);
  const defaultDay = DAYS.includes(today) ? today : "Mon";
  const [activeDay, setActiveDay] = useState(defaultDay);
  const [meals, setMeals] = useState(MEAL_DATA);
  const [generating, setGenerating] = useState(false);

  const dayMeals = meals[activeDay] || meals["Mon"];
  const totalCal = dayMeals.reduce((s, m) => s + m.cal, 0);
  const totalP = dayMeals.reduce((s, m) => s + m.p, 0);
  const totalC = dayMeals.reduce((s, m) => s + m.c, 0);
  const totalF = dayMeals.reduce((s, m) => s + m.f, 0);

  const generatePlan = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      toast({ title: "🤖 New AI meal plan generated!", duration: 2500 });
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Day tabs */}
      <div className="flex flex-wrap gap-2">
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all
              ${activeDay === day
                ? "bg-healix-button text-primary-foreground shadow-md"
                : "bg-background border border-border text-foreground hover:bg-card"}`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Meal cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dayMeals.map((meal, idx) => (
          <div key={idx} className="bg-card border border-border rounded-lg p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className={`pl-3 font-bold text-primary ${BORDER_COLORS[meal.type]}`}>
                  {meal.type}
                </div>
                <span className="bg-primary text-primary-foreground text-[11px] font-bold px-3 py-1 rounded-full">
                  {meal.cal} kcal
                </span>
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">{meal.dish}</h4>
              <div className="flex gap-4 text-xs text-muted-foreground font-medium">
                <span>Protein <b className="text-foreground">{meal.p}g</b></span>
                <span>Carbs <b className="text-foreground">{meal.c}g</b></span>
                <span>Fat <b className="text-foreground">{meal.f}g</b></span>
              </div>
            </div>
            <button className="mt-6 w-full py-2 bg-accent text-accent-foreground font-bold rounded-lg text-sm hover:opacity-90 transition-opacity">
              ↺ Swap Meal
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h3 className="font-bold text-foreground">
            Today's Total: <span className="text-healix-button">{totalCal.toLocaleString()} / 1,800 kcal</span>
          </h3>
          <span className="text-xs text-muted-foreground font-medium">
            P: {totalP}g | C: {totalC}g | F: {totalF}g
          </span>
        </div>
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-healix-button rounded-full transition-all duration-500"
            style={{ width: `${Math.min((totalCal / 1800) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={generatePlan}
        disabled={generating}
        className="w-full py-4 bg-healix-button text-primary-foreground font-bold rounded-lg shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {generating ? (
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        ) : (
          <>
            <Zap className="w-5 h-5 fill-current" />
            Generate New AI Meal Plan
          </>
        )}
      </button>
    </div>
  );
}
