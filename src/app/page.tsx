import Link from "next/link";
import { ArrowRight, UserCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center text-center space-y-6 py-6">
      <h1 className="text-3xl font-extrabold text-[#e0e0e0] tracking-tight sm:text-4xl">
        User Authentication System
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/signup"
          className="px-5 py-2.5 minimal-btn-primary text-sm flex items-center gap-2"
        >
          <span>Create Account</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/login"
          className="px-5 py-2.5 minimal-btn-secondary text-sm flex items-center gap-2"
        >
          <span>Sign In</span>
        </Link>
        <Link
          href="/profile"
          className="px-5 py-2.5 minimal-btn-secondary text-sm flex items-center gap-2"
        >
          <UserCheck className="h-4 w-4 text-[#b3b3b3]" />
          <span>Dashboard</span>
        </Link>
      </div>
    </div>
  );
}





