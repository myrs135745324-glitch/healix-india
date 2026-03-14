import { useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OnboardingData } from "@/contexts/OnboardingContext";

function mapProfileToData(profile: any): Partial<OnboardingData> {
  return {
    fullName: profile.full_name || "",
    age: profile.age?.toString() || "",
    gender: profile.gender || "",
    language: profile.language || "",
    profilePhotoUrl: profile.profile_photo_url || "",
    height: profile.height_cm?.toString() || "",
    weight: profile.weight_kg?.toString() || "",
    bloodGroup: profile.blood_group || "",
    bmi: profile.bmi?.toString() || "",
    occupation: profile.occupation || "",
    hostelMode: profile.hostel_mode || false,
    activityLevel: profile.activity_level || "",
    sleepTime: profile.sleep_time || "22:00",
    wakeTime: profile.wake_time || "06:00",
    dietType: profile.diet_type || "",
    cuisine: profile.cuisine_preference || "",
    allergies: profile.allergies || "",
    mealBudget: profile.meal_budget || "",
    healthConditions: profile.health_conditions || [],
    healthGoals: profile.health_goals || [],
    smoking: profile.smoking || false,
    drinking: profile.drinking || false,
    gymMember: profile.gym_member || false,
    fitnessGoal: profile.fitness_goal || "",
    periodDate: profile.period_date || "",
    pcos: profile.pcos || false,
    pregnant: profile.pregnant || false,
  };
}

function mapDataToProfile(data: OnboardingData, userId: string) {
  return {
    id: userId,
    full_name: data.fullName || null,
    age: parseInt(data.age) || null,
    gender: data.gender || null,
    language: data.language || null,
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
  };
}

export function useOnboardingSync(
  data: OnboardingData,
  updateData: (updates: Partial<OnboardingData>) => void,
  step: number
) {
  const loaded = useRef(false);
  const prevStep = useRef(step);

  // Load existing profile on mount
  useEffect(() => {
    if (loaded.current) return;
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (profile) {
        updateData(mapProfileToData(profile));
      }
      // Load medications
      const { data: meds } = await supabase
        .from("medications")
        .select("*")
        .eq("user_id", user.id);
      if (meds && meds.length > 0) {
        updateData({
          medications: meds.map(m => ({
            name: m.name,
            dose: m.dose || "",
            frequency: m.frequency || "Once daily",
            reminderTime: m.reminder_time || "08:00",
          })),
        });
      }
      // Load reminders
      const { data: reminders } = await supabase
        .from("reminders")
        .select("*")
        .eq("user_id", user.id);
      if (reminders && reminders.length > 0) {
        const reminderMap: any = {};
        reminders.forEach(r => {
          reminderMap[r.type] = r.time;
        });
        updateData({
          reminders: {
            medication: reminderMap.medication || "08:00",
            water: reminderMap.water || "Every 2 hours",
            sleep: reminderMap.sleep || "22:00",
            period: reminderMap.period || "5 days before",
          },
        });
      }
      loaded.current = true;
    };
    load();
  }, []);

  // Auto-save profile when navigating between steps
  const saveProgress = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    try {
      await supabase.from("profiles").upsert(mapDataToProfile(data, user.id) as any);
    } catch (err) {
      console.error("Auto-save failed:", err);
    }
  }, [data]);

  useEffect(() => {
    if (prevStep.current !== step && step > 2 && loaded.current) {
      saveProgress();
    }
    prevStep.current = step;
  }, [step, saveProgress]);

  return { saveProgress };
}
