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
    fetch("/api/live-data", { signal: controller.signal })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error("Live data fetch failed:", err);
        setData(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return { data, loading };
}
