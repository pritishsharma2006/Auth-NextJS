"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, User, LogIn, UserPlus, Home } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Login", href: "/login", icon: LogIn },
    { name: "Sign Up", href: "/signup", icon: UserPlus },
  ];

  return (
    <header className="w-full border-b border-[#565656] bg-[#2b2b2b] px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-[#b3b3b3]" />
        <span className="font-semibold text-[#e0e0e0] text-base tracking-tight">AuthNext</span>
      </Link>

      <nav className="flex items-center space-x-1 sm:space-x-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-none transition-colors ${
                isActive
                  ? "bg-[#3d3d3d] text-[#e0e0e0] border border-[#565656]"
                  : "text-[#848484] hover:text-[#e0e0e0] hover:bg-[#1c1c1c]"
              }`}
            >

              <Icon className="h-3.5 w-3.5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}



