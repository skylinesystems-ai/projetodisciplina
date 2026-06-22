import { motion } from "framer-motion";
import { cn } from "@/lib/cn.js";

function Progress({ label, value, max = 100, className }) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className={cn("forge-progress", className)}>
      {label && (
        <div className="mb-3 flex items-center justify-between text-sm font-bold text-white/72">
          <span>{label}</span>
          <span className="text-forge-cyan">
            {value.toLocaleString("pt-BR")} / {max.toLocaleString("pt-BR")}
          </span>
        </div>
      )}
      <div
        className="xp-track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <motion.div
          className="xp-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default Progress;
