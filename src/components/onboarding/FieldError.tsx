interface Props {
  message?: string;
}

export default function FieldError({ message }: Props) {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1 animate-in fade-in slide-in-from-top-1">{message}</p>;
}
