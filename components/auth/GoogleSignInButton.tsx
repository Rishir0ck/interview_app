
'use client';

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase/client";
import { Button } from "@/components/ui/button"; // Assuming you use shadcn/ui Button component
import { useRouter } from "next/navigation";


const GoogleSignInButton = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Logged in:", user.displayName);

      // Redirect user to home or another page after successful sign-in
      router.push("/"); // Example: Redirect to home page
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <Button onClick={handleGoogleSignIn} className="w-full  bg-dark-700 text-primary-100 items-center justify-center  hover:bg-dark-700 hover:text-primary-100">
       <img src="/google-logo.svg" alt="Google Logo" className="mr-2 w-6 h-6" />Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;
