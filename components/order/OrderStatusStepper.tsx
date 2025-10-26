"use client";

import { BadgeCheck, Check, Clock, PackageCheck, Truck } from "lucide-react";
import { useMemo } from "react";

interface OrderStatusStepperProps {
  currentStatus: string;
}

const ORDER_STATUSES = [
  { key: "pending", label: "Pending", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: BadgeCheck },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: PackageCheck },
];

export default function OrderStatusStepper({ currentStatus }: OrderStatusStepperProps) {
  const currentIndex = useMemo(() => {
    const idx = ORDER_STATUSES.findIndex((s) => s.key === currentStatus);
    return Math.max(0, idx);
  }, [currentStatus]);

  const isCancelled = currentStatus === "cancelled";
  if (isCancelled) {
    return (
      <div className="flex items-center justify-center py-4 sm:py-6">
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-100 rounded-full border-2 border-red-300">
          <p className="text-red-700 font-semibold flex items-center gap-2 text-sm sm:text-base">
            <span className="text-lg sm:text-xl">❌</span>
            Order Cancelled
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Horizontal-scroll fallback on very narrow screens to avoid overlap */}
      <div className="mx-auto max-w-full overflow-x-auto py-4 sm:py-6">
        {/* Wrapper keeps the stepper centered within a responsive max width */}
        <div className="mx-auto w-max sm:w-auto sm:max-w-3xl">
          <div className="flex items-center justify-center px-2 sm:px-0">
            {ORDER_STATUSES.map((status, index) => {
              const isCompleted = index <= currentIndex;
              const isActive = index === currentIndex;
              const Icon = status.icon;

              return (
                <div key={status.key} className="flex items-center justify-center">
                  {/* Circle + Label */}
                  <div className="flex flex-col items-center min-w-[52px] sm:min-w-[64px]">
                    <div
                      className={[
                        "relative flex items-center justify-center rounded-full border-2 transition-all duration-300",
                        "w-10 h-10 sm:w-14 sm:h-14",
                        isCompleted
                          ? "bg-theme-primary border-theme-primary scale-105 sm:scale-110"
                          : isActive
                          ? "bg-theme-primary border-theme-primary ring-2 sm:ring-4 ring-theme-primary/20"
                          : "bg-gray-200 border-gray-300",
                      ].join(" ")}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={3} />
                      ) : (
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                      )}
                    </div>

                    <p
                      className={[
                        "mt-1.5 sm:mt-2 text-[11px] sm:text-sm font-medium text-center leading-tight",
                        "max-w-[64px] sm:max-w-none truncate sm:whitespace-nowrap",
                        isCompleted || isActive ? "text-theme-primary" : "text-gray-500",
                      ].join(" ")}
                      title={status.label}
                    >
                      {status.label}
                    </p>
                  </div>

                  {/* Connector (except after last) */}
                  {index < ORDER_STATUSES.length - 1 && (
                    <div className="relative w-10 sm:w-24 mx-1.5 sm:mx-3 -mt-5">
                      {/* Track */}
                      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 sm:h-1 rounded bg-gray-400" />
                      {/* Fill */}
                      <div
                        className={[
                          "absolute left-0 top-1/2 -translate-y-1/2 h-0.5 sm:h-1 rounded transition-all duration-500",
                          isCompleted ? "bg-theme-primary" : "bg-gray-200",
                        ].join(" ")}
                        style={{ width: isCompleted ? "100%" : "0%" }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
