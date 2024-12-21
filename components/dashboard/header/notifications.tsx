"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Gift, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface NotificationsProps {
  userName: string;
}

export function Notifications({ userName }: NotificationsProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Cadastro concluído",
      message: `Bem-vindo(a) ${userName}! Seu cadastro foi concluído com sucesso.`,
      time: "Agora",
      isNew: true
    },
    {
      id: 2,
      title: "Bônus de Indicação",
      message: "Ganhe R$ 40,00 para cada amigo que você indicar!",
      time: "5 min atrás",
      isNew: true
    }
  ];

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full relative hover:bg-gray-800"
        onClick={() => setShowGiftModal(true)}
      >
        <Gift className="h-5 w-5 text-gray-300" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full relative hover:bg-gray-800"
        onClick={() => setShowNotifications(true)}
      >
        <Bell className="h-5 w-5 text-gray-300" />
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
          2
        </span>
      </Button>

      {/* Notifications Modal */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="bg-gray-900 text-white border-gray-800 max-w-md">
          <DialogTitle>Notificações</DialogTitle>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className="bg-gray-800/50 rounded-lg p-4 relative hover:bg-gray-800/70 transition-colors"
              >
                {notification.isNew && (
                  <span className="absolute top-4 right-4 h-2 w-2 bg-blue-500 rounded-full" />
                )}
                <h3 className="font-semibold mb-1">{notification.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Gift Modal */}
      <Dialog open={showGiftModal} onOpenChange={setShowGiftModal}>
        <DialogContent className="bg-gray-900 text-white border-gray-800 max-w-md">
          <DialogTitle>Programa de Indicação</DialogTitle>
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto flex items-center justify-center">
              <Gift className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Ganhe R$ 40,00!</h2>
              <p className="text-gray-400 mt-2">
                Para cada amigo que você indicar, você receberá um bônus quando eles se cadastrarem.
              </p>
            </div>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                setShowGiftModal(false);
                window.location.href = '/referral';
              }}
            >
              Começar a Indicar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}