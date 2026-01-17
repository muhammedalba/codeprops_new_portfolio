import { FieldError } from "react-hook-form";

interface FormErrorProps {
  error?: FieldError;
}

export function FormError({ error }: FormErrorProps) {
  if (!error) return null;

  return (
    <p className="text-xs text-destructive mt-1 font-medium">
      {error.message}
    </p>
  );
}
