"use client";

import { useState, useEffect } from "react";

export function useContent<T>(key: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/content/${key}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((value) => {
        if (!cancelled && value != null) setData(value);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [key]);

  return data;
}
