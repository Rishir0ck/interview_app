// components/GlobalLoadingOverlay.tsx
"use client";

import { useLoading } from "@/context/LoadingContext";
import { Loader2 } from "lucide-react";

const GlobalLoadingOverlay = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-white" />
    </div>
  );
};

export default GlobalLoadingOverlay;
