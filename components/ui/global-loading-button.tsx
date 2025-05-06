// components/ui/global-loading-button.tsx
"use client";

import { Button } from "@/components/ui/button";  // Adjust to your actual Button import
import { useLoading } from "@/context/LoadingContext";
import { Loader2 } from "lucide-react";
import { useState } from "react";

type Props = {
  onClick: () => Promise<void>;
  disabled?: boolean;
  children: React.ReactNode;
};

const GlobalLoadingButton = ({ onClick, children, disabled, ...props }: Props) => {
  const { setLoading } = useLoading();
  const [localLoading, setLocalLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      setLocalLoading(true);
      await onClick();
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  };

  return (
    <Button {...props} disabled={localLoading || disabled} onClick={handleClick}>
      {localLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-white" />
          <span>Processing...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default GlobalLoadingButton;
