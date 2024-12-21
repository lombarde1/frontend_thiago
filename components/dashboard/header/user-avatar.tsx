"use client";

import { Avatar } from "@/components/ui/avatar";
import { UserCircle2 } from "lucide-react";

interface UserAvatarProps {
  userName: string;
}

export function UserAvatar({ userName }: UserAvatarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
        <UserCircle2 className="h-6 w-6 text-gray-400" />
      </div>
      {userName && <span className="text-sm font-medium text-white">{userName}</span>}
    </div>
  );
}