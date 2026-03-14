import { cn } from "@/lib/utils";

interface Props {
  options: string[];
  selected: string | string[];
  onSelect: (val: string) => void;
  multi?: boolean;
}

export default function ChipSelect({ options, selected, onSelect, multi = false }: Props) {
  const isSelected = (o: string) => multi ? (selected as string[]).includes(o) : selected === o;

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => (
        <button
          key={o}
          type="button"
          onClick={() => onSelect(o)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all border",
            isSelected(o)
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-foreground border-border hover:border-primary/50"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
