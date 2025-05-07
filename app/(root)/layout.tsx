import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/LogoutButton";
import RouteLoader from "@/components/shared/RouteLoader";



const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/sign-in");
   const user = await getCurrentUser();

  return (
    <div className="min-h-screen px-6 py-4">
      
    <div className="root-layout">
      <nav className="flex justify-between items-center mb-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" height={32} width={38} />
          <h2 className="text-primary-100">AceReady</h2>
        </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-muted transition">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="user"
                    width={36}
                    height={36}
                    className="rounded-full object-cover text-primary-100"
                  />
                ) : (
                  <div className="w-9 h-9 md-6 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white">
                    {user?.name?.[0] ?? "U"}
                  </div>
                )}
                <span className="text-2xl font-bold text-primary-100 hidden sm:inline">{user?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-2 w-48">
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        <RouteLoader />
      </nav>
      {children}
    </div>
    
    </div>
    
  );
};

export default RootLayout;
