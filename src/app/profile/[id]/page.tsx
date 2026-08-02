import Link from "next/link";
import { User, ArrowLeft, Hash } from "lucide-react";

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="w-full max-w-sm mx-auto py-4 text-center space-y-5">
      <div className="h-12 w-12 rounded-xl bg-[#1c1c1c] border border-[#565656] flex items-center justify-center text-[#b3b3b3] mx-auto">
        <User className="h-6 w-6" />
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-[#e0e0e0]">User Profile</h1>
        <p className="text-xs text-[#848484]">User account record identifier</p>
      </div>

      <div className="bg-[#1c1c1c] border border-[#565656] rounded-lg p-4 text-left space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-[#848484] uppercase tracking-wider">
          <Hash className="h-3.5 w-3.5 text-[#b3b3b3]" />
          Object Identifier (_id)
        </div>
        <div className="px-3 py-2 rounded bg-[#2b2b2b] border border-[#565656] text-[#e0e0e0] font-mono text-xs break-all">
          {id}
        </div>
      </div>

      <div className="pt-2 border-t border-[#565656]">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#848484] hover:text-[#e0e0e0] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}


