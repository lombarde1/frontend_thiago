"use client";

import { Button } from "@/components/ui/button";
import { Home, Clock, FileText, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: "Início", path: "/dashboard" },
    { icon: <Clock className="h-5 w-5" />, label: "Atividade", path: "/activity" },
    { icon: <FileText className="h-5 w-5" />, label: "Finanças", path: "/finances" },
    { icon: <Settings className="h-5 w-5" />, label: "Ajustes", path: "/settings" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1E2025]/95 backdrop-blur-lg border-t border-gray-800/50">
      <div className="max-w-md mx-auto px-8 py-4 flex justify-between">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            className="flex flex-col items-center gap-1 px-2"
            onClick={() => router.push(item.path)}
          >
            <div className={pathname === item.path ? "text-blue-500" : "text-gray-400"}>
              {item.icon}
            </div>
            <span className="text-xs text-gray-400">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}