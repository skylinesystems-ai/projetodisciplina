import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "./Button.jsx";

function Modal({ children, description, onClose, open, title }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-locked");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-locked");
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="forge-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
        >
          <button
            type="button"
            className="forge-modal-backdrop"
            aria-label="Fechar painel"
            onClick={onClose}
          />
          <motion.div
            className="forge-modal"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="forge-modal-title"
            aria-describedby={description ? "forge-modal-description" : undefined}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 id="forge-modal-title" className="font-display text-2xl font-black uppercase text-white">
                  {title}
                </h2>
                {description && (
                  <p id="forge-modal-description" className="mt-2 text-sm leading-6 text-white/72">
                    {description}
                  </p>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-10 w-10 px-0"
                onClick={onClose}
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="pt-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
