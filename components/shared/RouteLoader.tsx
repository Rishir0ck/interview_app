// components/shared/RouteLoader.tsx
'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FullScreenLoader from "@/components/ui/fullscreen-loader";

const RouteLoader = () => {
  const pathname = usePathname();
  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  useEffect(() => {
    let delayTimer: NodeJS.Timeout;
    let clearTimer: NodeJS.Timeout;

    // Start a delay to show loader after 200ms
    delayTimer = setTimeout(() => {
      setShouldShowLoader(true);
    }, 100); // Delay before showing the loader

    // Always clear loader after route change (simulate loading end)
    clearTimer = setTimeout(() => {
      setShouldShowLoader(false);
      clearTimeout(delayTimer); // in case it never fired
    }, 500); // How long the loader remains visible (tweak as needed)

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(clearTimer);
    };
  }, [pathname]);

  return shouldShowLoader ? <FullScreenLoader /> : null;
};

export default RouteLoader;
