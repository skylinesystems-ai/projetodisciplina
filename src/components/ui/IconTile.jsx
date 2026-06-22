import { cn } from "@/lib/cn.js";

const toneClass = {
  cyan: "forge-icon-cyan",
  green: "forge-icon-green",
  violet: "forge-icon-violet",
  amber: "forge-icon-amber",
};

function IconTile({ children, className, size = "md", tone = "cyan" }) {
  return (
    <span className={cn("forge-icon-tile", `forge-icon-${size}`, toneClass[tone], className)}>
      {children}
    </span>
  );
}

export default IconTile;
