"use client";

import { UserCircle2, Search, Gift, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/api/user";

export function DashboardHeader() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getUserProfile();
        setUserName(profile.name);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    }
    loadProfile();
  }, []);

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center">
          <UserCircle2 className="w-5 h-5 text-gray-400" />
        </div>
        <span className="text-sm text-white/90">{userName}</span>
      </div>
      
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Pesquisar"
          className="w-full bg-gray-800/50 rounded-full py-2 px-4 pl-10 text-sm placeholder-gray-500 border border-gray-800"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
      </div>

      <div className="flex items-center gap-3">
        <Gift className="w-5 h-5 text-gray-400" />
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
            2
          </span>
        </div>
      </div>
    </div>
  );
}