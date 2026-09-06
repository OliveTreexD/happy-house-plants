"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { hasUtmParams, persistUtmParams, readUtmFromSearch } from "@/lib/utm";

/** Capture landing UTMs into sessionStorage and send a first-party page view. */
export function UtmCapture() {
  useEffect(() => {
    const utm = readUtmFromSearch(window.location.search);
    if (hasUtmParams(utm)) {
      persistUtmParams(utm);
    }
    trackEvent({ name: "page_view", utm });
  }, []);

  return null;
}
