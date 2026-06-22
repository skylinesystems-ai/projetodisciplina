import { forwardRef } from "react";
import { cn } from "@/lib/cn.js";

const variantClass = {
  primary: "forge-button-primary",
  secondary: "forge-button-secondary",
  ghost: "forge-button-ghost",
  danger: "forge-button-danger",
};

const sizeClass = {
  sm: "forge-button-sm",
  md: "forge-button-md",
  lg: "forge-button-lg",
};

const Button = forwardRef(function Button(
  {
    as: Component = "button",
    children,
    className,
    disabled = false,
    size = "md",
    variant = "primary",
    ...props
  },
  ref
) {
  const isButton = Component === "button";

  return (
    <Component
      ref={ref}
      className={cn("forge-button", variantClass[variant], sizeClass[size], className)}
      disabled={isButton ? disabled : undefined}
      aria-disabled={!isButton && disabled ? "true" : undefined}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Button;
