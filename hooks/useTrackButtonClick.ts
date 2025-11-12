"use client";

import { useCallback, useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";

type ExtraParams = Record<string, string | number | boolean | null | undefined>;

export function useTrackButtonClick(defaultCategory = "engagement") {
  // This ref will be true only after the component has mounted and a short delay has passed.
  const isReady = useRef(false);

  useEffect(() => {
    // Set ready to true after a short delay to give GTM/GA time to initialize.
    const timer = setTimeout(() => {
      isReady.current = true;
    }, 100); // 100ms is usually plenty.

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  // De-dupe rapid double clicks
  const lastClick = useRef<{ name: string; t: number } | null>(null);

  return useCallback(
    (buttonName: string, extraParams: ExtraParams = {}) => {
      // 1. Exit if the hook isn't ready or if there's no button name.
      if (!isReady.current || !buttonName) {
        // This will prevent the "GA has not been initialized" error.
        return;
      }

      // 2. Ignore repeated clicks within 400ms
      const now = Date.now();
      if (lastClick.current && lastClick.current.name === buttonName && now - lastClick.current.t < 400) {
        return;
      }
      lastClick.current = { name: buttonName, t: now };

      // 3. Prepare parameters (no PII)
      const params: ExtraParams = {
        button_label: buttonName,
        button_category: defaultCategory,
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title,
        ...extraParams,
      };

      // 4. Dispatch the event safely.
      try {
        sendGAEvent("event", "button_click", params);
      } catch (error) {
        // Silently fail if something still goes wrong, preventing a crash.
        console.error("Failed to send GA event:", error);
      }
    },
    [defaultCategory]
  );
}
