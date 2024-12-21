"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Edit, Ban, DollarSign } from "lucide-react";
import { getUsers, adjustUserBalance, toggleUserStatus } from "@/lib/api/admin/service";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { User } from "@/lib/api/admin/types";
import { toast } from "sonner";

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [adjustmentAmount, setAdjustmentAmount] = useState("");
  const [adjustmentOperation, setAdjustmentOperation] = useState<"add" | "subtract" | "set">("add");

  useEffect(() => {
    loadUsers();
  }, [page, search]);

  const loadUsers = async () => {
    try {
      const data = await getUsers({ page, search, limit: 10 });
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to load users:", error);
      toast.error("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  const handleAdjustBalance = async () => {
    if (!selectedUser || !adjustmentAmount) return;

    try {
      await adjustUserBalance({
        userId: selectedUser._id,
        amount: parseFloat(adjustmentAmount),
        operation: adjustmentOperation,
        reason: "Ajuste administrativo"
      });

      toast.success("Saldo ajustado com sucesso");
      setShowBalanceModal(false);
      loadUsers();
    } catch (error) {
      console.error("Error adjusting balance:", error);
      toast.error("Erro ao ajustar saldo");
    }
  };

  const handleToggleStatus = async (userId: string) => {
    try {
      await toggleUserStatus(userId);
      toast.success("Status do usuário alterado");
      loadUsers();
    } catch (error) {
      toast.error("Erro ao alterar status");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="h-24 bg-gray-800" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar usuários..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-800 text-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {users.map((user) => (
            <Card key={user._id} className="bg-gray-900 p-4 border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">{user.name}</h3>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  <p className="text-sm text-gray-400">CPF: {user.cpf}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-medium text-white">
                    R$ {user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowBalanceModal(true);
                      }}
                      className="hover:bg-gray-800"
                    >
                      <DollarSign className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleStatus(user._id)}
                      className="hover:bg-gray-800"
                    >
                      <Ban className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="border-gray-800"
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="border-gray-800"
          >
            Próxima
          </Button>
        </div>
      </div>

      {/* Balance Adjustment Modal */}
      <Dialog open={showBalanceModal} onOpenChange={setShowBalanceModal}>
        <DialogContent className="bg-gray-900 text-white border-gray-800">
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-semibold">Ajustar Saldo</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Operação</label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button
                    variant={adjustmentOperation === "add" ? "default" : "outline"}
                    onClick={() => setAdjustmentOperation("add")}
                    className="border-gray-700"
                  >
                    Adicionar
                  </Button>
                  <Button
                    variant={adjustmentOperation === "subtract" ? "default" : "outline"}
                    onClick={() => setAdjustmentOperation("subtract")}
                    className="border-gray-700"
                  >
                    Subtrair
                  </Button>
                  <Button
                    variant={adjustmentOperation === "set" ? "default" : "outline"}
                    onClick={() => setAdjustmentOperation("set")}
                    className="border-gray-700"
                  >
                    Definir
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">Valor</label>
                <Input
                  type="number"
                  value={adjustmentAmount}
                  onChange={(e) => setAdjustmentAmount(e.target.value)}
                  className="mt-2 bg-gray-800 border-gray-700"
                />
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleAdjustBalance}
                disabled={!adjustmentAmount}
              >
                Confirmar Ajuste
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}