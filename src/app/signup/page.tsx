"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSignup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (buttonDisabled || loading) return;

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Account created successfully! Please sign in.");
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed", error.message);
      const errMsg = error.response?.data?.error || error.message || "Signup failed";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.trim().length > 0 &&
      user.password.trim().length > 0 &&
      user.username.trim().length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="w-full max-w-sm mx-auto py-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-extrabold text-[#e0e0e0]">Create Account</h1>
        <p className="text-xs text-[#848484]">Enter your details to create a new user account</p>
      </div>

      {/* Signup Form */}
      <form onSubmit={onSignup} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-xs font-medium text-[#848484] uppercase tracking-wider mb-1.5">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#848484]">
              <User className="h-4 w-4" />
            </div>
            <input
              id="username"
              type="text"
              className="w-full minimal-input pl-9 pr-3 py-2 text-sm"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="johndoe"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-medium text-[#848484] uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#848484]">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="email"
              type="email"
              className="w-full minimal-input pl-9 pr-3 py-2 text-sm"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="name@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-medium text-[#848484] uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#848484]">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full minimal-input pl-9 pr-9 py-2 text-sm"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#848484] hover:text-[#e0e0e0]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={buttonDisabled || loading}
          className={`w-full py-2.5 px-4 minimal-btn-primary text-sm flex items-center justify-center gap-2 ${
            buttonDisabled || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-[#e0e0e0]" />
              <span>Creating Account...</span>
            </>
          ) : (
            <span>Sign Up</span>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-[#565656] text-center text-xs text-[#848484]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#e0e0e0] hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}


