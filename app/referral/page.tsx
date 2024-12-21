"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StatsCard } from "@/components/referral/stats-card";
import { ReferredUsersList } from "@/components/referral/referred-users-list";
import { getReferralStats, generateReferralCode } from "@/lib/api/referral/service";
import type { ReferralStats } from "@/lib/api/referral/types";

export default function ReferralPage() {
  const router = useRouter();
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReferralStats();
  }, []);

  const loadReferralStats = async () => {
    try {
      const data = await getReferralStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load referral stats:", error);
      toast.error("Erro ao carregar informações de indicação");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReferralLink = async () => {
    if (!stats?.referralCode) return;
    
    const referralLink = `${window.location.origin}/register?ref=${stats.referralCode}`;
    
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Link de indicação copiado!");
    } catch (error) {
      toast.error("Erro ao copiar link");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <div className="max-w-md mx-auto space-y-6">
          <div className="h-48 bg-gray-900 rounded-lg animate-pulse" />
          <div className="h-96 bg-gray-900 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-gray-800"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Programa de Indicação</h1>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Stats Card */}
          <StatsCard stats={stats} />

          {/* Share Button */}
          <Button
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
            onClick={handleCopyReferralLink}
          >
            <Copy className="w-5 h-5" />
            Copiar Link de Indicação
          </Button>

          {/* Referred Users Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Usuários Indicados</h2>
            </div>
            <ReferredUsersList users={stats.referredUsers} />
          </div>
        </div>
      </div>
    </div>
  );
}