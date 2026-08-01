"use client";

import { useEffect } from "react";

const STORAGE_KEY = "iec_launch_loader_seen";
const DISPLAY_DURATION = 4000;

export default function LaunchLoaderClient() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loader = document.getElementById("launch-loader");
    const alreadySeen = sessionStorage.getItem(STORAGE_KEY);

    if (!loader) return;

    if (!alreadySeen) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      const timer = window.setTimeout(() => {
        loader.style.display = "none";
      }, DISPLAY_DURATION);
      return () => window.clearTimeout(timer);
    }

    loader.style.display = "none";
  }, []);

  return null;
}
