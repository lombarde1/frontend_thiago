"use client";

import { X, Users } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ReferralBanner() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="mt-6 mb-6 relative">
      <div className="bg-[#0052FF] rounded-2xl p-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl -ml-24 -mb-24" />

        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Ganhe R$ 40,00 por indicação!
              </h3>
              <p className="text-sm text-white/80">
                Indique seus amigos e Ganhe R$ 40,00 quando eles fizerem o primeiro depósito.
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push('/referral')}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Começar a Indicar
            <Users className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-white/60">Bônus por Indicação</p>
              <p className="text-lg font-bold text-white">R$ 40,00</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-white/60">Depósito Mínimo</p>
              <p className="text-lg font-bold text-white">R$ 30,00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}