"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MailCheck, CheckCircle2, AlertCircle, Loader2, LogIn } from "lucide-react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success("Email verified successfully!");
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data);
      const errMsg = error.response?.data?.error || "Email verification failed";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="w-full max-w-sm mx-auto py-4 text-center space-y-5">
      <div className="h-12 w-12 rounded-xl bg-[#1c1c1c] border border-[#565656] flex items-center justify-center text-[#b3b3b3] mx-auto">
        <MailCheck className="h-6 w-6" />
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-[#e0e0e0]">Email Verification</h1>
        <p className="text-xs text-[#848484]">Validating email verification token</p>
      </div>

      <div className="bg-[#1c1c1c] border border-[#565656] rounded-lg p-3 text-left">
        <span className="text-xs font-medium text-[#848484] uppercase tracking-wider block mb-1">
          Verification Token
        </span>
        <p className="font-mono text-xs text-[#e0e0e0] break-all bg-[#2b2b2b] p-2 rounded border border-[#565656]">
          {token ? token : "No token provided in URL"}
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-2 text-[#848484] text-xs">
          <Loader2 className="h-4 w-4 animate-spin text-[#b3b3b3]" />
          <span>Verifying token with server...</span>
        </div>
      )}

      {verified && (
        <div className="bg-[#1c1c1c] border border-[#565656] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-center gap-2 text-[#e0e0e0] font-semibold text-xs">
            <CheckCircle2 className="h-4 w-4 text-[#b3b3b3]" />
            <span>Email Account Verified</span>
          </div>
          <Link
            href="/login"
            className="w-full py-2 px-3 minimal-btn-primary text-xs flex items-center justify-center gap-1.5"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In Now</span>
          </Link>
        </div>
      )}

      {error && (
        <div className="bg-[#1c1c1c] border border-[#565656] rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-center gap-2 text-rose-300 font-semibold text-xs">
            <AlertCircle className="h-4 w-4" />
            <span>Verification Token Invalid</span>
          </div>
          <Link
            href="/login"
            className="inline-block text-xs text-[#848484] hover:text-[#e0e0e0] underline"
          >
            Back to Sign In
          </Link>
        </div>
      )}
    </div>
  );
}


