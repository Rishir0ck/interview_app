// components/Footer.tsx
import { Mail, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full flex justify-center mt-auto py-8 bg-transparent">
      <div className="flex items-center gap-6 px-6 py-4 rounded-xl shadow-lg border border-neutral-800 bg-neutral-900 text-sm text-neutral-300">
        <a
          href="mailto:devstack.rishii@gmail.com"
          className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          aria-label="Send Email"
        >
          <Mail className="h-4 w-4" />
          devstack.rishii@gmail.com
        </a>

        <span className="h-4 w-px bg-neutral-700" />

        <a
          href="https://www.instagram.com/rishi_r0ck"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-pink-400 transition-colors"
          aria-label="Visit Instagram"
        >
          <Instagram className="h-4 w-4" />
          @rishi_r0ck
        </a>
      </div>
    </footer>
  );
};

export default Footer;
