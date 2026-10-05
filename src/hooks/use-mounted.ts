"use client";

import { useEffect, useState } from "react";

/** True after hydration — for UI that depends on client-only state like the resolved theme. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
