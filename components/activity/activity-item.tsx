"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, CircleDollarSign, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { formatActivityAmount } from "@/lib/api/activity/service";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Activity } from "@/lib/api/activity/types";

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const [showWarningModal, setShowWarningModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getActivityIcon = () => {
    switch (activity.category) {
      case 'deposit':
        return <ArrowDownLeft className="w-5 h-5 text-green-500" />;
      case 'withdraw':
        return <ArrowUpRight className="w-5 h-5 text-red-500" />;
      default:
        return <CircleDollarSign className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'rejected':
        return 'Rejeitado';
      case 'pending':
        return 'Pendente';
      default:
        return status;
    }
  };

  const isRejectedWithdrawal = activity.type === 'withdraw' && activity.status === 'rejected';

  return (
    <>
      <Card className={`bg-[#1A1B1E] p-4 border-none hover:bg-[#22242A] transition-colors`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activity.category === 'deposit' ? 'bg-green-500/10' :
              activity.category === 'withdraw' ? 'bg-red-500/10' :
              'bg-blue-500/10'
            }`}>
              {getActivityIcon()}
            </div>
            <div>
              <h3 className="font-medium text-white">{activity.description}</h3>
              <p className="text-sm text-gray-400">
                {new Date(activity.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          <div className="text-right flex flex-col items-end">
            <p className={`font-medium ${
              activity.category === 'deposit' ? 'text-green-500' : 'text-red-500'
            }`}>
              {formatActivityAmount(activity)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className={`px-3 py-1 rounded-full flex items-center gap-2 text-xs ${
                activity.status === 'completed' ? 'bg-green-500/10' :
                activity.status === 'rejected' ? 'bg-red-500/10' :
                'bg-yellow-500/10'
              }`}>
                {getStatusIcon(activity.status)}
                <span className={getStatusColor(activity.status)}>
                  {getStatusText(activity.status)}
                </span>
              </div>
              {isRejectedWithdrawal && (
                <button
                  onClick={() => setShowWarningModal(true)}
                  className="p-1 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-colors"
                >
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Warning Modal */}
      <Dialog open={showWarningModal} onOpenChange={setShowWarningModal}>
        <DialogContent className="bg-gray-900 text-white border-gray-800 sm:max-w-md">
          <div className="p-6 text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-red-500">Saque Rejeitado</h3>
              <p className="text-gray-400">
                Sua conta foi identificada com métodos ilegais de afiliação. 
                Não será possível prosseguir com o saque.
              </p>
            </div>

            <div className="bg-red-500/10 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <p className="text-sm font-medium">Conta em análise</p>
              </div>
            </div>

            <button 
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl"
              onClick={() => setShowWarningModal(false)}
            >
              Entendi
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}