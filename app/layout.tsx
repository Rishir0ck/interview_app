import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import { LoadingProvider } from "@/context/LoadingContext";
import GlobalLoadingOverlay from "@/components/GlobalLoadingOverlay";


const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview App",
  description: "An AI-Powered Interview Assistant",
};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className="dark">
//       <body className={`${monaSans.className} antialiased pattern`}>
//         {children}
//         <Toaster />
//       </body>
//     </html>
//   );
// }



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} antialiased pattern`} >
      <LoadingProvider>
       <GlobalLoadingOverlay />
        {children}
        <Footer />
        <Toaster />
        </LoadingProvider>
      </body>
    </html>
  );
}


