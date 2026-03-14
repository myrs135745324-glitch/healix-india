import { useEffect, useState } from "react";
import { OnboardingProvider, useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import Screen1Welcome from "@/components/onboarding/screens/Screen1Welcome";
import Screen2Identity from "@/components/onboarding/screens/Screen2Identity";
import Screen3PhysicalStats from "@/components/onboarding/screens/Screen3PhysicalStats";
import Screen4Lifestyle from "@/components/onboarding/screens/Screen4Lifestyle";
import Screen5Diet from "@/components/onboarding/screens/Screen5Diet";
import Screen6Conditions from "@/components/onboarding/screens/Screen6Conditions";
import Screen7Medications from "@/components/onboarding/screens/Screen7Medications";
import Screen8GenderSpecific from "@/components/onboarding/screens/Screen8GenderSpecific";
import Screen9Goals from "@/components/onboarding/screens/Screen9Goals";
import Screen10Notifications from "@/components/onboarding/screens/Screen10Notifications";
import Screen11Permissions from "@/components/onboarding/screens/Screen11Permissions";
import Screen12Complete from "@/components/onboarding/screens/Screen12Complete";

function OnboardingSteps() {
  const { step, setStep, data } = useOnboarding();
  const [direction, setDirection] = useState(1);
  const [prevStep, setPrevStep] = useState(step);

  useEffect(() => {
    setDirection(step > prevStep ? 1 : -1);
    setPrevStep(step);
  }, [step]);

  // Auto-skip screen 8 for "Other" gender
  useEffect(() => {
    if (step === 8 && data.gender === "Other") {
      setStep(direction > 0 ? 9 : 7);
    }
  }, [step, data.gender]);

  const screens: Record<number, JSX.Element> = {
    1: <Screen1Welcome />,
    2: <Screen2Identity />,
    3: <Screen3PhysicalStats />,
    4: <Screen4Lifestyle />,
    5: <Screen5Diet />,
    6: <Screen6Conditions />,
    7: <Screen7Medications />,
    8: <Screen8GenderSpecific />,
    9: <Screen9Goals />,
    10: <Screen10Notifications />,
    11: <Screen11Permissions />,
    12: <Screen12Complete />,
  };

  if (step === 1) return <Screen1Welcome />;

  return (
    <OnboardingLayout direction={direction}>
      {screens[step] || <Screen1Welcome />}
    </OnboardingLayout>
  );
}

export default function Onboarding() {
  return (
    <OnboardingProvider>
      <OnboardingSteps />
    </OnboardingProvider>
  );
}
