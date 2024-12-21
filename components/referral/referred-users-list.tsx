"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Users, CheckCircle2, Clock, DollarSign } from "lucide-react";
import type { ReferredUser } from "@/lib/api/referral/types";

interface ReferredUsersListProps {
  users: ReferredUser[];
}

export function ReferredUsersList({ users }: ReferredUsersListProps) {
  if (!users.length) {
    return (
      <Card className="bg-gray-900 p-6 text-center border-gray-800">
        <Users className="w-12 h-12 mx-auto mb-3 text-gray-600" />
        <p className="text-gray-400">Nenhum usuário indicado ainda</p>
        <p className="text-sm text-gray-500">Compartilhe seu código e comece a ganhar!</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user, index) => (
        <Card key={index} className="bg-gray-900 p-4 border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">{user.user.name}</h3>
                <p className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(user.registeredAt), {
                    addSuffix: true,
                    locale: ptBR
                  })}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              {user.hasDeposited ? (
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Depósito realizado
                </Badge>
              ) : (
                <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                  <Clock className="w-3 h-3 mr-1" />
                  Aguardando depósito
                </Badge>
              )}

              {user.commissionPaid && (
                <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                  <DollarSign className="w-3 h-3 mr-1" />
                  Comissão paga
                </Badge>
              )}
            </div>
          </div>

          {user.hasDeposited && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Total Depositado</p>
                  <p className="text-white font-medium">
                    R$ {user.totalDeposits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                {user.lastDeposit && (
                  <div>
                    <p className="text-sm text-gray-400">Último Depósito</p>
                    <p className="text-white font-medium">
                      {formatDistanceToNow(new Date(user.lastDeposit), {
                        addSuffix: true,
                        locale: ptBR
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}