import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { buyCrypto } from "@/lib/api/trading/service";

interface BuyCryptoModalProps {
  open: boolean;
  onClose: () => void;
  crypto: {
    symbol: string;
    name: string;
    price: number;
  };
  onSuccess?: () => void;
}

export function BuyCryptoModal({ open, onClose, crypto, onSuccess }: BuyCryptoModalProps) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Por favor, insira um valor válido");
      return;
    }

    setLoading(true);
    try {
      await buyCrypto(crypto.symbol, Number(amount));
      toast.success("Compra realizada com sucesso!");
      onSuccess?.();
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Erro ao realizar compra");
    } finally {
      setLoading(false);
    }
  };

  const cryptoAmount = Number(amount) / crypto.price;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Comprar {crypto.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Valor em Reais (R$)
            </label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="bg-gray-800 border-gray-700"
            />
            {amount && (
              <p className="mt-2 text-sm text-gray-400">
                Você receberá: {cryptoAmount.toFixed(8)} {crypto.symbol}
              </p>
            )}
          </div>

          <Button
            onClick={handleBuy}
            disabled={loading || !amount || Number(amount) <= 0}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Processando..." : "Confirmar Compra"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}