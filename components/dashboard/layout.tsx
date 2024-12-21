"use client";

import { DashboardHeader } from "./header";
import { BalanceCard } from "./balance-card";
import { QuickActions } from "./quick-actions";
import { PortfolioList } from "./portfolio-list";
import { ReferralBanner } from "./referral-banner";
import { BottomNavigation } from "./navigation/bottom-nav";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto px-4 py-6">
        <DashboardHeader />
        <BalanceCard />
        <QuickActions />
        <ReferralBanner />

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Preços</h2>
            <button className="text-gray-400">
              Favoritos
            </button>
          </div>

          <div className="space-y-2 pb-24">
            <PortfolioList />
          </div>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}