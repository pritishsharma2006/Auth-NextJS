"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import toast from "react-hot-toast";
import { KeyRound, Lock, Eye, EyeOff, Loader2, ArrowLeft, ShieldAlert } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, [searchParams]);

  const resetPassword = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (loading || password.length === 0) return;

    try {
      setLoading(true);

      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });

      toast.success(response.data?.message || "Password reset successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto py-4 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-extrabold text-[#e0e0e0]">
          {loading ? "Updating Password..." : "Reset Password"}
        </h1>
        <p className="text-xs text-[#848484]">Enter your new password below</p>
      </div>

      {!token && (
        <div className="bg-[#1c1c1c] border border-[#565656] p-4 flex flex-col items-center text-center space-y-3">
          <ShieldAlert className="h-5 w-5 text-[#b3b3b3]" />
          <div className="text-xs text-[#848484] space-y-1">
            <span className="font-bold text-[#e0e0e0] block">Missing Reset Token</span>
            <p>You need a valid reset link sent to your email to reset your password.</p>
          </div>
          <Link
            href="/forgotpassword"
            className="w-full py-2 px-3 minimal-btn-primary text-xs flex items-center justify-center"
          >
            Request Reset Email
          </Link>
        </div>
      )}

      <form onSubmit={resetPassword} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-xs font-medium text-[#848484] uppercase tracking-wider mb-1.5 text-left">
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#848484]">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full minimal-input pl-9 pr-9 py-2 text-sm"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          disabled={loading || password.length === 0}
          className={`w-full py-2.5 px-4 minimal-btn-primary text-sm flex items-center justify-center gap-2 ${
            loading || password.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-[#e0e0e0]" />
              <span>Updating...</span>
            </>
          ) : (
            <span>Update Password</span>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-[#565656] text-center text-xs text-[#848484]">
        <Link href="/login" className="inline-flex items-center gap-1.5 font-medium text-[#848484] hover:text-[#e0e0e0]">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="text-center text-xs text-[#848484] py-8">
        Loading reset form...
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}


