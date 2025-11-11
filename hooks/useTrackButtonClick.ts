"use client";

import { useCallback, useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";

type ExtraParams = Record<string, string | number | boolean | null | undefined>;

export function useTrackButtonClick(defaultCategory = "engagement") {
  // Ensure we only fire after client mount so GA has a chance to initialize
  const ready = useRef(false);
  useEffect(() => {
    ready.current = true;
  }, []);

  // De-dupe rapid double clicks
  const last = useRef<{ name: string; t: number } | null>(null);

  return useCallback(
    (buttonName: string, extraParams: ExtraParams = {}) => {
      if (!buttonName) return;
      if (!ready.current) return; // prevent '@next/third-parties: GA has not been initialized'

      // ignore repeated clicks within 400ms
      const now = Date.now();
      if (last.current && last.current.name === buttonName && now - last.current.t < 400) {
        return;
      }
      last.current = { name: buttonName, t: now };

      // Page context
      const pageLocation = typeof window !== "undefined" ? window.location.href : undefined;
      const pagePath = typeof window !== "undefined" ? window.location.pathname : undefined;
      const pageTitle = typeof document !== "undefined" ? document.title : undefined;

      // Never send PII (email, phone, full names, raw IP)
      const params: ExtraParams = {
        button_label: buttonName,           // stable, human-readable label
        button_category: defaultCategory,   
        page_location: pageLocation,
        page_path: pagePath,
        page_title: pageTitle,
        ...extraParams,                     // item_id, item_name, placement, etc.
      };

      // Dispatch to the Google tag (works with GTM or inline gtag)
      try {
        sendGAEvent("event", "button_click", params);
      } catch {
        // Silently ignore if GA is not ready to avoid runtime errors during dev
      }
    },
    [defaultCategory]
  );
}
