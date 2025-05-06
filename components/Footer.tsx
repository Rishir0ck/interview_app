// components/Footer.tsx
import { Mail, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full flex justify-center mt-auto px-4 py-6 bg-transparent">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full max-w-2xl px-4 py-4 rounded-xl shadow-lg border border-neutral-800 bg-neutral-900 text-sm text-neutral-300 text-center sm:text-left">
        <a
          href="mailto:devstack.rishii@gmail.com"
          className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          aria-label="Send Email"
        >
          <Mail className="h-4 w-4 shrink-0" />
          <span className="break-all text-sm sm:text-base">
            devstack.rishii@gmail.com
          </span>
        </a>

        {/* Divider shown only on larger screens */}
        <span className="hidden sm:block h-4 w-px bg-neutral-700" />

        <a
          href="https://www.instagram.com/rishi_r0ck"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-pink-400 transition-colors"
          aria-label="Visit Instagram"
        >
          <Instagram className="h-4 w-4 shrink-0" />
          <span className="text-sm sm:text-base">@rishi_r0ck</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
