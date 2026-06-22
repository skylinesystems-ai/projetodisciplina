import { useCallback, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, Sparkles } from "lucide-react";
import { ToastContext } from "@/lib/toastContext.js";
import { cn } from "@/lib/cn.js";

const toastIcons = {
  error: AlertTriangle,
  info: Info,
  success: CheckCircle2,
  xp: Sparkles,
};

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback(
    ({ description, title, type = "info" }) => {
      const id = crypto.randomUUID();
      setToasts((current) => [...current, { description, id, title, type }]);
      window.setTimeout(() => dismiss(id), 3800);
      return id;
    },
    [dismiss]
  );

  const value = useMemo(() => ({ dismiss, notify }), [dismiss, notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="forge-toast-region" aria-live="polite" aria-relevant="additions text">
        {toasts.map((toast) => {
          const Icon = toastIcons[toast.type] || Info;
          return (
            <div key={toast.id} className={cn("forge-toast", `forge-toast-${toast.type}`)} role="status">
              <Icon className="h-5 w-5 shrink-0" />
              <div>
                <strong>{toast.title}</strong>
                {toast.description && <p>{toast.description}</p>}
              </div>
              <button type="button" onClick={() => dismiss(toast.id)} aria-label="Dispensar notificação">
                x
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
