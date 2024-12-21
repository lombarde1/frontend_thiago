"use client";

import { useEffect, useState } from "react";
import { AdminDashboard } from "@/components/admin/dashboard";
import { UsersList } from "@/components/admin/users-list";
import { ReferralStats } from "@/components/admin/referral-stats";
import { WithdrawalsList } from "@/components/admin/withdrawals-list";
import { BSPayCredentials } from "@/components/admin/bspay-credentials";
import { AdminLogin } from "@/components/admin/login";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isAdminAuthenticated, adminLogin, logoutAdmin } from "@/lib/api/admin/auth";
import { toast } from "sonner";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const isAuth = isAdminAuthenticated();
      setIsAuthenticated(isAuth);
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      await adminLogin(username, password);
      setIsAuthenticated(true);
      toast.success("Login realizado com sucesso!");
    } catch (error: any) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    try {
      logoutAdmin();
      setIsAuthenticated(false);
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Erro ao fazer logout");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Sair
          </button>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="bg-[#1A1B1E] border-[#2A2D36]">
            <TabsTrigger 
              value="dashboard"
              className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-[#2D5AF7]"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="users"
              className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-[#2D5AF7]"
            >
              Usuários
            </TabsTrigger>
            <TabsTrigger 
              value="withdrawals"
              className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-[#2D5AF7]"
            >
              Saques
            </TabsTrigger>
            <TabsTrigger 
              value="referrals"
              className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-[#2D5AF7]"
            >
              Indicações
            </TabsTrigger>
            <TabsTrigger 
              value="bspay"
              className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-[#2D5AF7]"
            >
              BS Pay
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <UsersList />
          </TabsContent>

          <TabsContent value="withdrawals" className="mt-6">
            <WithdrawalsList />
          </TabsContent>

          <TabsContent value="referrals" className="mt-6">
            <ReferralStats />
          </TabsContent>

          <TabsContent value="bspay" className="mt-6">
            <BSPayCredentials />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}