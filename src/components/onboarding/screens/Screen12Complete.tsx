import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const MODULES = [
  "BMI Tracker", "Diet Planner", "Med Reminders", "Sleep Tracker",
  "Health Monitor", "AI Assistant", "Water Tracker", "Goal Tracker",
];

export default function Screen12Complete() {
  const { data } = useOnboarding();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleFinish = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Upload photo if exists
      let photoUrl = "";
      if (data.profilePhoto) {
        const ext = data.profilePhoto.name.split(".").pop();
        const path = `${user.id}/avatar.${ext}`;
        await supabase.storage.from("profile-photos").upload(path, data.profilePhoto, { upsert: true });
        const { data: urlData } = supabase.storage.from("profile-photos").getPublicUrl(path);
        photoUrl = urlData.publicUrl;
      }

      // Save profile
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: data.fullName,
        age: parseInt(data.age) || null,
        gender: data.gender,
        profile_photo_url: photoUrl || null,
        language: data.language,
        height_cm: parseFloat(data.height) || null,
        weight_kg: parseFloat(data.weight) || null,
        blood_group: data.bloodGroup || null,
        bmi: parseFloat(data.bmi) || null,
        occupation: data.occupation || null,
        hostel_mode: data.hostelMode,
        activity_level: data.activityLevel || null,
        sleep_time: data.sleepTime || null,
        wake_time: data.wakeTime || null,
        diet_type: data.dietType || null,
        cuisine_preference: data.cuisine || null,
        allergies: data.allergies || null,
        meal_budget: data.mealBudget || null,
        health_conditions: data.healthConditions,
        health_goals: data.healthGoals,
        smoking: data.smoking,
        drinking: data.drinking,
        gym_member: data.gymMember,
        fitness_goal: data.fitnessGoal || null,
        period_date: data.periodDate || null,
        pcos: data.pcos,
        pregnant: data.pregnant,
        onboarding_complete: true,
      } as any);

      if (profileError) throw profileError;

      // Save medications
      if (data.medications.length > 0) {
        const meds = data.medications.filter(m => m.name).map(m => ({
          user_id: user.id,
          name: m.name,
          dose: m.dose,
          frequency: m.frequency,
          reminder_time: m.reminderTime,
        }));
        if (meds.length > 0) {
          const { error: medsError } = await supabase.from("medications").insert(meds as any);
          if (medsError) throw medsError;
        }
      }

      // Save reminders
      const reminderRows = [
        { user_id: user.id, type: "medication", time: data.reminders.medication, enabled: true },
        { user_id: user.id, type: "water", time: data.reminders.water, enabled: true },
        { user_id: user.id, type: "sleep", time: data.reminders.sleep, enabled: true },
      ];
      if (data.gender === "Female") {
        reminderRows.push({ user_id: user.id, type: "period", time: data.reminders.period, enabled: true });
      }
      const { error: remError } = await supabase.from("reminders").insert(reminderRows as any);
      if (remError) throw remError;

      toast({ title: "🎉 You're all set!" });
      navigate("/");
    } catch (err: any) {
      console.error(err);
      toast({ title: err.message || "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 text-center">
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto"
      >
        <Check className="w-10 h-10 text-primary-foreground" strokeWidth={3} />
      </motion.div>

      <div>
        <h2 className="text-2xl font-bold text-foreground">You're all set!</h2>
        <p className="text-sm text-muted-foreground mt-1">Your AI health modules are now active</p>
      </div>

      {/* Module cards */}
      <div className="grid grid-cols-2 gap-3">
        {MODULES.map((mod, i) => (
          <motion.div
            key={mod}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="bg-card border border-border rounded-lg p-4 flex items-center gap-2"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
            <span className="text-sm font-medium text-foreground text-left">{mod}</span>
          </motion.div>
        ))}
      </div>

      <Button onClick={handleFinish} disabled={saving} className="w-full bg-primary text-primary-foreground" size="lg">
        {saving ? "Saving..." : "Meet your AI Assistant →"}
      </Button>
    </div>
  );
}
