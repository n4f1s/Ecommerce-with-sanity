"use client";

import { useEffect, useId, useRef } from "react";

type DrawerSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function DrawerSheet({ open, onClose, title, children }: DrawerSheetProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Prevent background scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`absolute inset-x-0 bottom-0 rounded-t-2xl bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 id={titleId} className="text-lg font-semibold">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close order summary"
            className="rounded p-2 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
