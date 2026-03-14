import React, { createContext, useContext, useState, ReactNode } from "react";
import { useOnboardingSync } from "@/hooks/useOnboardingSync";

export interface Medication {
  name: string;
  dose: string;
  frequency: string;
  reminderTime: string;
}

export interface OnboardingData {
  fullName: string;
  age: string;
  gender: string;
  language: string;
  profilePhoto: File | null;
  profilePhotoUrl: string;
  height: string;
  weight: string;
  bloodGroup: string;
  bmi: string;
  occupation: string;
  hostelMode: boolean;
  activityLevel: string;
  sleepTime: string;
  wakeTime: string;
  dietType: string;
  cuisine: string;
  allergies: string;
  mealBudget: string;
  healthConditions: string[];
  medications: Medication[];
  periodDate: string;
  pcos: boolean;
  pregnant: boolean;
  fitnessGoal: string;
  gymMember: boolean;
  smoking: boolean;
  drinking: boolean;
  healthGoals: string[];
  reminders: {
    medication: string;
    water: string;
    sleep: string;
    period: string;
  };
  notifications: {
    push: boolean;
    camera: boolean;
    healthSync: boolean;
  };
}

const defaultData: OnboardingData = {
  fullName: "",
  age: "",
  gender: "",
  language: "",
  profilePhoto: null,
  profilePhotoUrl: "",
  height: "",
  weight: "",
  bloodGroup: "",
  bmi: "",
  occupation: "",
  hostelMode: false,
  activityLevel: "",
  sleepTime: "22:00",
  wakeTime: "06:00",
  dietType: "",
  cuisine: "",
  allergies: "",
  mealBudget: "",
  healthConditions: [],
  medications: [],
  periodDate: "",
  pcos: false,
  pregnant: false,
  fitnessGoal: "",
  gymMember: false,
  smoking: false,
  drinking: false,
  healthGoals: [],
  reminders: {
    medication: "08:00",
    water: "Every 2 hours",
    sleep: "22:00",
    period: "5 days before",
  },
  notifications: {
    push: true,
    camera: true,
    healthSync: true,
  },
};

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  step: number;
  setStep: (s: number) => void;
  totalSteps: number;
  saving: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

function OnboardingProviderInner({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [step, setStep] = useState(1);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const totalSteps = 12;

  const { saveProgress } = useOnboardingSync(data, updateData, step);

  return (
    <OnboardingContext.Provider value={{ data, updateData, step, setStep, totalSteps, saving: false }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  return <OnboardingProviderInner>{children}</OnboardingProviderInner>;
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
