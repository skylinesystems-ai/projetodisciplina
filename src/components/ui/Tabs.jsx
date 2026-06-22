import { useMemo, useState } from "react";
import { cn } from "@/lib/cn.js";

function Tabs({ defaultValue, items }) {
  const firstValue = items[0]?.value;
  const [activeValue, setActiveValue] = useState(defaultValue || firstValue);
  const activeItem = useMemo(
    () => items.find((item) => item.value === activeValue) || items[0],
    [activeValue, items]
  );

  if (!items.length) return null;

  return (
    <div className="forge-tabs">
      <div className="forge-tabs-list" role="tablist" aria-label="Nexus tabs">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.value === activeItem.value;
          return (
            <button
              key={item.value}
              type="button"
              className={cn("forge-tab", active && "forge-tab-active")}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveValue(item.value)}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="forge-tab-panel" role="tabpanel">
        {activeItem.content}
      </div>
    </div>
  );
}

export default Tabs;
