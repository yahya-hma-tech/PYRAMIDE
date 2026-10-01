import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type FieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

/** Champ de formulaire avec libellé et message d'erreur accessible. */
export default function Field({ label, error, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label className="mb-1.5 text-sm font-semibold text-navy">{label}</label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-[13px] font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
