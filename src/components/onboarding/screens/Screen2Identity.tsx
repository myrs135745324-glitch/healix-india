import { useRef } from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import ChipSelect from "../ChipSelect";
import NavButtons from "../NavButtons";
import { Camera, User } from "lucide-react";

export default function Screen2Identity() {
  const { data, updateData, setStep } = useOnboarding();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateData({ profilePhoto: file, profilePhotoUrl: URL.createObjectURL(file) });
  };

  const validate = () => {
    if (!data.fullName.trim()) { toast({ title: "Name is required", variant: "destructive" }); return false; }
    if (!data.age || parseInt(data.age) < 1) { toast({ title: "Valid age is required", variant: "destructive" }); return false; }
    if (!data.gender) { toast({ title: "Please select gender", variant: "destructive" }); return false; }
    return true;
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
          <Input value={data.fullName} onChange={e => updateData({ fullName: e.target.value })} placeholder="Enter your name" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Age *</label>
          <Input type="number" value={data.age} onChange={e => updateData({ age: e.target.value })} placeholder="Your age" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Gender *</label>
          <ChipSelect options={["Male", "Female", "Other"]} selected={data.gender} onSelect={v => updateData({ gender: v })} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Language</label>
          <ChipSelect options={["English", "Telugu", "Hindi"]} selected={data.language} onSelect={v => updateData({ language: v })} />
        </div>
      </div>

      <NavButtons onNext={() => { if (validate()) setStep(3); }} />
    </div>
  );
}
