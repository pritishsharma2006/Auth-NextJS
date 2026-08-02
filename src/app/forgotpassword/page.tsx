"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Loader2, ArrowLeft, MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;

    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", { email });
      toast.success(response.data?.message || "Password reset email sent!");
      setSubmitted(true);
    } catch (error: any) {
      console.error("Forgot password error:", error);
      const errMsg = error.response?.data?.error || error.message || "Failed to send reset email";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto py-4 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-extrabold text-[#e0e0e0]">Forgot Password</h1>
        <p className="text-xs text-[#848484]">
          Enter your registered email address to receive a password reset link
        </p>
      </div>

      {submitted ? (
        <div className="bg-[#1c1c1c] border border-[#565656] p-4 text-center space-y-3">
          <MailCheck className="h-6 w-6 text-[#b3b3b3] mx-auto" />
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-[#e0e0e0]">Check Your Inbox</h2>
            <p className="text-xs text-[#848484]">
              We have dispatched a password reset link to <span className="text-[#e0e0e0] font-mono">{email}</span>.
            </p>
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-[#b3b3b3] underline hover:text-[#e0e0e0]"
          >
            Resend or try another email
          </button>
        </div>
      ) : (
        <form onSubmit={onSendResetEmail} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-[#848484] uppercase tracking-wider mb-1.5 text-left"
            >
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
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !email.trim()}
            className={`w-full py-2.5 px-4 minimal-btn-primary text-sm flex items-center justify-center gap-2 ${
              loading || !email.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-[#e0e0e0]" />
                <span>Sending Email...</span>
              </>
            ) : (
              <span>Send Reset Link</span>
            )}
          </button>
        </form>
      )}

      <div className="pt-4 border-t border-[#565656] text-center text-xs text-[#848484]">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 font-medium text-[#848484] hover:text-[#e0e0e0]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </div>
  );
}
