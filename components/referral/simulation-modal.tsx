"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator } from "lucide-react";

interface SimulationModalProps {
  open: boolean;
  onClose: () => void;
}

export function SimulationModal({ open, onClose }: SimulationModalProps) {
  const [invites, setInvites] = useState<number>(1);
  const bonusPerInvite = 50;

  const totalEarnings = invites * bonusPerInvite;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white border-gray-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Simulador de Ganhos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Número de pessoas que você pretende indicar:
            </label>
            <Input
              type="number"
              min="1"
              value={invites}
              onChange={(e) => setInvites(Number(e.target.value))}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="bg-blue-500/10 rounded-lg p-4 space-y-4">
            <div>
              <p className="text-sm text-gray-400">Bônus por indicação:</p>
              <p className="text-lg font-bold text-blue-500">
                R$ {bonusPerInvite.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <p className="text-sm text-gray-400">Ganhos potenciais:</p>
              <p className="text-3xl font-bold text-green-500">
                R$ {totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center">
            *Os valores são estimativas e podem variar de acordo com os termos e condições do programa.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}