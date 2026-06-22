import { AlertTriangle, CheckCircle2, Loader2, Radar } from "lucide-react";
import { cn } from "@/lib/cn.js";

const stateMap = {
  loading: { icon: Loader2, className: "state-loading" },
  empty: { icon: Radar, className: "state-empty" },
  error: { icon: AlertTriangle, className: "state-error" },
  success: { icon: CheckCircle2, className: "state-success" },
};

function StatePanel({ action, className, description, state = "empty", title }) {
  const config = stateMap[state] || stateMap.empty;
  const Icon = config.icon;

  return (
    <div
      className={cn("forge-state-panel", config.className, className)}
      role={state === "error" ? "alert" : "status"}
    >
      <Icon className={cn("h-5 w-5", state === "loading" && "animate-spin")} />
      <div className="min-w-0 flex-1">
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

export default StatePanel;
