"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "../search-bar";
import { UserAvatar } from "./user-avatar";
import { Notifications } from "./notifications";
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
    <header className="flex items-center justify-between mb-6">
      <UserAvatar userName={userName} />
      <SearchBar />
      <Notifications userName={userName} />
    </header>
  );
}