import { useOnboarding } from "@/contexts/OnboardingContext";
import ToggleRow from "../ToggleRow";
import NavButtons from "../NavButtons";
import { Shield } from "lucide-react";

export default function Screen11Permissions() {
  const { data, updateData } = useOnboarding();

  const updateNotif = (key: keyof typeof data.notifications, val: boolean) => {
    updateData({ notifications: { ...data.notifications, [key]: val } });
  };

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <Shield className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold text-foreground">Almost done!</h2>
        <p className="text-sm text-muted-foreground">These permissions help us serve you better</p>
      </div>

      <div className="bg-card border border-border rounded-lg px-4">
        <ToggleRow label="Push notifications" subtitle="Recommended" checked={data.notifications.push} onChange={v => updateNotif("push", v)} />
        <ToggleRow label="Camera access" subtitle="For profile photo" checked={data.notifications.camera} onChange={v => updateNotif("camera", v)} />
        <ToggleRow label="Health data sync" subtitle="Optional" checked={data.notifications.healthSync} onChange={v => updateNotif("healthSync", v)} />
      </div>

      <NavButtons />
    </div>
  );
}
