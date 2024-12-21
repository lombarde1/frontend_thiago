"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { PortfolioList } from "@/components/dashboard/portfolio-list";

export default function TradingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-4">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-gray-800"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Comprar Criptomoedas</h1>
        </div>

        <Card className="bg-gray-900 p-6 mb-6">
          <p className="text-gray-400 mb-4">
            Selecione uma criptomoeda para comprar e começar a investir
          </p>
        </Card>

        <div className="space-y-4 pb-24">
          <PortfolioList />
        </div>
      </div>
    </div>
  );
}