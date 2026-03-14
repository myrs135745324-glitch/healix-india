import { Switch } from "@/components/ui/switch";

interface Props {
  label: string;
  subtitle?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

export default function ToggleRow({ label, subtitle, checked, onChange }: Props) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
