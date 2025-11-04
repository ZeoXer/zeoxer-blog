"use client";

import { createContext, useContext, useState } from "react";
import { Spinner } from "@heroui/spinner";

type LoadingContextValue = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextValue | undefined>(
  undefined
);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading(): LoadingContextValue {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within a LoadingProvider");
  return ctx;
}

export const FullPageLoading = () => {
  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden">
      <div className="fixed inset-0 z-[99999] backdrop-blur-md flex items-center justify-center">
        <Spinner size="lg" color="warning" variant="wave" />
      </div>
    </div>
  );
};
