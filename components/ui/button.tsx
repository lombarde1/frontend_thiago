import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm" | "lg" | "icon";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "button-modern inline-flex items-center justify-center font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
      "disabled:pointer-events-none disabled:opacity-50",
      {
        "bg-blue-600 text-white hover:bg-blue-700": variant === "default",
        "border border-white/20 bg-transparent hover:bg-white/10": variant === "outline",
        "hover:bg-white/10": variant === "ghost",
        "h-10 px-4 py-2": size === "default",
        "h-9 px-3": size === "sm",
        "h-11 px-8": size === "lg",
        "h-10 w-10": size === "icon",
      },
      className
    )}
    {...props}
  />
));
Button.displayName = "Button";

export { Button };