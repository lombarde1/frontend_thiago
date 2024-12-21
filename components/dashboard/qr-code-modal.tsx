"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { getUserId } from "@/lib/auth/storage";

interface QRCodeModalProps {
  open: boolean;
  onClose: () => void;
}

export function QRCodeModal({ open, onClose }: QRCodeModalProps) {
  const userId = getUserId();
  const profileUrl = `${window.location.origin}/profile/${userId}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(profileUrl);
    toast.success("Link copiado!");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Seu QR Code</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-6 p-4">
          <div className="bg-white p-4 rounded-xl">
            <QRCodeSVG 
              value={profileUrl}
              size={200}
              level="H"
              includeMargin
            />
          </div>

          <div className="w-full">
            <p className="text-sm text-gray-400 mb-2">Link do perfil:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={profileUrl}
                readOnly
                className="flex-1 bg-gray-800 rounded-lg px-3 py-2 text-sm"
              />
              <Button size="icon" variant="outline" onClick={copyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}