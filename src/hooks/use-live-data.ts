"use client";

import { useState, useEffect } from "react";

export interface LiveData {
  monPrice: number;
  networkStake: number;
  activeValidators: number;
  updatedAt: string | null;
}

export function useLiveData() {
  const [data, setData] = useState<LiveData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    fetch("/api/live-data", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error("Live data fetch failed:", err);
        setData(null);
      })
      .finally(() => {
        clearTimeout(timeoutId);
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => { clearTimeout(timeoutId); controller.abort(); };
  }, []);

  return { data, loading };
}
