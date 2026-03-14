import { useOnboarding } from "@/contexts/OnboardingContext";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  direction?: number;
}

export default function OnboardingLayout({ children, direction = 1 }: Props) {
  const { step, totalSteps } = useOnboarding();
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center font-poppins">
      {/* Progress bar */}
      <div className="w-full max-w-[420px] px-4 pt-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <img src="/healix-logo.png" className="h-7 w-auto" alt="Healix" />
            <span className="text-primary font-bold text-base">Healix</span>
          </div>
          <span className="text-xs text-muted-foreground">Step {step} of {totalSteps}</span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 w-full max-w-[420px] px-4 py-6 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
