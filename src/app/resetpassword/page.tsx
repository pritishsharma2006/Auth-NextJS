"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const urlToken = searchParams.get("token");
        if (urlToken) {
            setToken(urlToken);
        }
    }, [searchParams]);

    const resetPassword = async () => {
        try {
            setLoading(true);

            const response = await axios.post("/api/users/resetpassword", {
                token,
                password,
            });

            toast.success(response.data.message);

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl mb-6">
                {loading ? "Processing..." : "Reset Password"}
            </h1>

            <label htmlFor="password">New Password</label>

            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={resetPassword}
                disabled={loading || password.length === 0}
                className="p-2 border border-gray-300 rounded-lg bg-blue-600 text-white disabled:bg-gray-400"
            >
                {loading ? "Resetting..." : "Reset Password"}
            </button>

            <Link href="/login" className="mt-4 text-blue-600">
                Back to Login
            </Link>
        </div>
    );
}