'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" }); // Call API to clear session
    router.push("/sign-in");
  };

  return (
    <Button
      variant="secondary"
      className="w-full justify-center"
      onClick={handleLogout}
    >
      <p className="text-sm font-semibold text-primary-200 text-center">
        Logout
      </p>
    </Button>
  );
};

export default LogoutButton;
