"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

interface AdBannerProps {
  /** Google AdSense Ad Slot ID (optional for Auto Ads) */
  slot?: string;
  /** Format of the ad unit */
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  /** Whether the ad unit is responsive */
  responsive?: boolean;
  /** Extra CSS classes for the container */
  className?: string;
  /** Custom inline styles for the ins element */
  style?: React.CSSProperties;
  /** Show subtle developer-themed label */
  label?: boolean;
}

export function AdBanner({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  style,
  label = true,
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const isPushed = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !isPushed.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushed.current = true;
      } catch (err) {
        // Suppress benign AdSense push warnings during development/SSR
        if (process.env.NODE_ENV === "development") {
          console.debug("AdSense push:", err);
        }
      }
    }
  }, []);

  return (
    <div
      className={`w-full my-8 mx-auto flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      {label && (
        <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-600 px-2 mb-1.5 select-none">
          <span>// advertisement</span>
          <span className="text-[10px] text-zinc-700">codershubinc</span>
        </div>
      )}
      <div className="w-full flex justify-center items-center bg-white/[0.015] border border-white/5 hover:border-white/10 rounded-xl p-3 min-h-[100px] transition-colors duration-300">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: "block",
            minWidth: "250px",
            width: "100%",
            textAlign: "center",
            ...style,
          }}
          data-ad-client="ca-pub-1775178587078079"
          {...(slot ? { "data-ad-slot": slot } : {})}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
}

export default AdBanner;
