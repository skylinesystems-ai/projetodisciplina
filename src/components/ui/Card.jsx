import { motion } from "framer-motion";
import { cn } from "@/lib/cn.js";

function Card({
  as: Component = motion.article,
  children,
  className,
  delay = 0,
  interactive = true,
  reveal = true,
  ...props
}) {
  const motionProps = reveal
    ? {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.6, delay },
      }
    : {};

  return (
    <Component
      className={cn("forge-card", interactive && "forge-card-interactive", className)}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Card;
