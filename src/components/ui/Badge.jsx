import { cn } from "@/lib/cn.js";

const toneClass = {
  cyan: "forge-badge-cyan",
  green: "forge-badge-green",
  violet: "forge-badge-violet",
  amber: "forge-badge-amber",
  neutral: "forge-badge-neutral",
};

function Badge({ children, className, tone = "cyan" }) {
  return <span className={cn("forge-badge", toneClass[tone], className)}>{children}</span>;
}

export default Badge;
