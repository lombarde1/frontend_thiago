import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label className="text-white">{label}</Label>
        <Input 
          ref={ref}
          className={cn(
            "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";