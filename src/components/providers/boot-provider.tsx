"use client";

import { createContext, useCallback, useContext, useState } from "react";

type BootContextValue = {
  /** True once the boot screen has finished (or was skipped). Hero animations wait for this. */
  ready: boolean;
  markReady: () => void;
};

const BootContext = createContext<BootContextValue>({ ready: true, markReady: () => {} });

export function BootProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  return <BootContext.Provider value={{ ready, markReady }}>{children}</BootContext.Provider>;
}

export function useBoot() {
  return useContext(BootContext);
}
