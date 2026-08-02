"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, LogOut, Shield, ExternalLink, Loader2, RefreshCw } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    try {
      setLoggingOut(true);
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message || "Logout failed");
    } finally {
      setLoggingOut(false);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      if (res.data?.data) {
        setUserDetails(res.data.data);
        setData(res.data.data._id);
        toast.success("User details loaded.");
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.response?.data?.error || "Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#565656] pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#e0e0e0]">User Dashboard</h1>
          <p className="text-xs text-[#848484]">Active authenticated session</p>
        </div>
        <span className="px-2.5 py-1 rounded bg-[#1c1c1c] border border-[#565656] text-[#b3b3b3] text-xs font-medium">
          Session Active
        </span>
      </div>

      {/* User Details */}
      <div className="bg-[#1c1c1c] border border-[#565656] rounded-lg p-4 space-y-3 text-left">
        <div>
          <span className="text-xs text-[#848484] block mb-1">User ID (_id)</span>
          {data === "nothing" ? (
            <span className="text-xs italic text-[#848484]">Not loaded yet. Click button below.</span>
          ) : (
            <Link
              href={`/profile/${data}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2b2b2b] border border-[#565656] text-[#e0e0e0] text-xs font-mono hover:border-[#b3b3b3]"
            >
              <span>{data}</span>
              <ExternalLink className="h-3 w-3 text-[#b3b3b3]" />
            </Link>
          )}
        </div>

        {userDetails && (
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#565656] text-xs">
            <div>
              <span className="text-[#848484] block">Username</span>
              <span className="text-[#e0e0e0] font-semibold">{userDetails.username || "N/A"}</span>
            </div>
            <div>
              <span className="text-[#848484] block">Email</span>
              <span className="text-[#e0e0e0] font-semibold">{userDetails.email || "N/A"}</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          onClick={getUserDetails}
          disabled={loading}
          className="py-2 px-3 minimal-btn-primary text-xs flex items-center justify-center gap-1.5"
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-[#e0e0e0]" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" />
          )}
          <span>Get User Details</span>
        </button>

        <button
          onClick={logout}
          disabled={loggingOut}
          className="py-2 px-3 minimal-btn-secondary text-xs flex items-center justify-center gap-1.5"
        >
          {loggingOut ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-[#b3b3b3]" />
          ) : (
            <LogOut className="h-3.5 w-3.5" />
          )}
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}


