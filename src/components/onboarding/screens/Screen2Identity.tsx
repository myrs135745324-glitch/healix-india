import { useRef } from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import ChipSelect from "../ChipSelect";
import NavButtons from "../NavButtons";
import FieldError from "../FieldError";
import { Camera, User } from "lucide-react";
import { useFieldValidation } from "@/hooks/useFieldValidation";

export default function Screen2Identity() {
  const { data, updateData, setStep } = useOnboarding();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const { errors, validateAll, clearError } = useFieldValidation({
    fullName: { required: true, label: "Full name", minLength: 2 },
    age: { required: true, label: "Age", min: 1, max: 120 },
    gender: { required: true, label: "Gender" },
  });

  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateData({ profilePhoto: file, profilePhotoUrl: URL.createObjectURL(file) });
  };

  const handleNext = () => {
    if (validateAll({ fullName: data.fullName, age: data.age, gender: data.gender })) {
      setStep(3);
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-foreground">Tell us about you</h2>

      {/* Photo */}
      <div className="flex justify-center">
        <button onClick={() => fileRef.current?.click()} className="relative w-24 h-24 rounded-full bg-secondary border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden hover:border-primary transition-colors">
          {data.profilePhotoUrl ? (
            <img src={data.profilePhotoUrl} className="w-full h-full object-cover" alt="Profile" />
          ) : (
            <User className="w-8 h-8 text-muted-foreground" />
          )}
          <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5">
            <Camera className="w-3 h-3 text-primary-foreground" />
          </div>
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
          <Input
            value={data.fullName}
            onChange={e => { updateData({ fullName: e.target.value }); clearError("fullName"); }}
            placeholder="Enter your name"
            className={errors.fullName ? "border-destructive" : ""}
          />
          <FieldError message={errors.fullName} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Age *</label>
          <Input
            type="number"
            value={data.age}
            onChange={e => { updateData({ age: e.target.value }); clearError("age"); }}
            placeholder="Your age"
            className={errors.age ? "border-destructive" : ""}
          />
          <FieldError message={errors.age} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Gender *</label>
          <ChipSelect options={["Male", "Female", "Other"]} selected={data.gender} onSelect={v => { updateData({ gender: v }); clearError("gender"); }} />
          <FieldError message={errors.gender} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Language</label>
          <ChipSelect options={["English", "Telugu", "Hindi"]} selected={data.language} onSelect={v => updateData({ language: v })} />
        </div>
      </div>

      <NavButtons onNext={handleNext} />
    </div>
  );
}
