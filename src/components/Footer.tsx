import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#565656] bg-[#2b2b2b] px-6 py-4 flex items-center justify-between text-xs text-[#848484]">
      <div className="flex items-center gap-1.5">
        <ShieldCheck className="h-4 w-4 text-[#848484]" />
        <span>AuthNext</span>
      </div>
      <span>&copy; {new Date().getFullYear()} AuthNext</span>
    </footer>
  );
}




