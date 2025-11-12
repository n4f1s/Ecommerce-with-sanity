"use client";


type MobileSummaryBarProps = {
  itemCount: number;
  finalTotal: number;
  onOpen: () => void;
  label?: string; // e.g., "View summary"
};

export default function MobileSummaryBar({
  itemCount,
  finalTotal,
  onOpen,
  label = "View summary",
}: MobileSummaryBarProps) {

  return (
    <div className="z-40 border-t bg-white px-4 py-3 shadow-sm rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Items ({itemCount})</span>
          <span className="text-lg font-bold">Tk {finalTotal}</span>
        </div>
        <button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          aria-expanded="false"
          className="rounded-full bg-theme-primary px-4 py-2 text-white font-semibold hover:bg-theme-secondary"
        >
          {label}
        </button>
      </div>
    </div>
  );
}
