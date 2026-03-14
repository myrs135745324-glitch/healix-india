import { useOnboarding } from "@/contexts/OnboardingContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  hideBack?: boolean;
  hideNext?: boolean;
}

export default function NavButtons({ onNext, onBack, nextLabel = "Continue", nextDisabled = false, hideBack = false, hideNext = false }: Props) {
  const { step, setStep } = useOnboarding();

  const handleBack = () => {
    if (onBack) onBack();
    else setStep(step - 1);
  };

  const handleNext = () => {
    if (onNext) onNext();
    else setStep(step + 1);
  };

  return (
    <div className="flex gap-3 pt-6">
      {!hideBack && step > 1 && (
        <Button variant="outline" onClick={handleBack} className="flex-1 border-primary text-primary">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
      )}
      {!hideNext && (
        <Button onClick={handleNext} disabled={nextDisabled} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
          {nextLabel} <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      )}
    </div>
  );
}
