"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleDollarSign, ArrowUpRight, ArrowDownRight, Users, Wallet, ArrowDown } from "lucide-react";
import { WithdrawModal } from "@/components/withdraw/withdraw-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

const actions = [
  { 
    icon: <CircleDollarSign className="h-5 w-5" />, 
    label: "Comprar", 
    path: "/trading", 
    color: "#0052FF",
    restricted: false
  },
  { 
    icon: <ArrowUpRight className="h-5 w-5" />, 
    label: "Trocar", 
    action: "swap",
    color: "#00C087",
    restricted: true,
    message: "O recurso de troca está disponível apenas para usuários com volume de negociação superior a R$ 1.000,00"
  },
  { 
    icon: <ArrowDownRight className="h-5 w-5" />, 
    label: "Bridge", 
    action: "bridge",
    color: "#FF6B00",
    restricted: true,
    message: "O recurso de bridge entre redes está disponível apenas para usuários com volume de negociação superior a R$ 5.000,00"
  },
  { 
    icon: <Users className="h-5 w-5" />, 
    label: "Indique", 
    path: "/referral",
    color: "#7B61FF",
    restricted: false
  },
  { 
    icon: <Wallet className="h-5 w-5" />, 
    label: "Depositar", 
    path: "/deposit",
    color: "#FF4D4D",
    restricted: false
  },
  { 
    icon: <ArrowDown className="h-5 w-5" />, 
    label: "Sacar", 
    action: "withdraw",
    color: "#22C55E",
    restricted: false
  }
];

export function QuickActions() {
  const router = useRouter();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showRestrictionDialog, setShowRestrictionDialog] = useState(false);
  const [restrictionMessage, setRestrictionMessage] = useState("");

  const handleAction = (action: any) => {
    if (action.action === "withdraw") {
      setShowWithdrawModal(true);
    } else if (action.restricted) {
      setRestrictionMessage(action.message || "");
      setShowRestrictionDialog(true);
    } else if (action.path) {
      router.push(action.path);
    }
  };

  return (
    <>
      <div className="flex justify-between px-2">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-1 p-2 hover:opacity-80 transition-opacity"
            onClick={() => handleAction(action)}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${action.color}20`, color: action.color }}
            >
              {action.icon}
            </div>
            <span className="text-xs text-white/80">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Restriction Dialog */}
      <Dialog open={showRestrictionDialog} onOpenChange={setShowRestrictionDialog}>
        <DialogContent className="bg-gray-900 text-white border-gray-800 sm:max-w-md">
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold">Recurso Restrito</h3>
            <p className="text-gray-400">{restrictionMessage}</p>
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
              onClick={() => setShowRestrictionDialog(false)}
            >
              Entendi
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdraw Modal */}
      <WithdrawModal 
        open={showWithdrawModal} 
        onClose={() => setShowWithdrawModal(false)} 
      />
    </>
  );
}