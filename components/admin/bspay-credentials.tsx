"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { getBSPayCredentials, updateBSPayCredentials } from "@/lib/api/admin/service";

interface BSPayCredentials {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
  updatedAt: string;
}

export function BSPayCredentials() {
  const [credentials, setCredentials] = useState<BSPayCredentials | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    clientId: "",
    clientSecret: "",
    baseUrl: "https://api.bspay.co/v2"
  });

  useEffect(() => {
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    try {
      const data = await getBSPayCredentials();
      setCredentials(data);
      setFormData({
        clientId: data.clientId,
        clientSecret: data.clientSecret,
        baseUrl: data.baseUrl
      });
    } catch (error) {
      console.error("Failed to load BS Pay credentials:", error);
      toast.error("Erro ao carregar credenciais");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await updateBSPayCredentials(formData);
      toast.success("Credenciais atualizadas com sucesso!");
      loadCredentials();
    } catch (error) {
      console.error("Failed to update credentials:", error);
      toast.error("Erro ao atualizar credenciais");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-[#1A1B1E] p-6 animate-pulse">
        <div className="h-48 bg-gray-800 rounded-lg" />
      </Card>
    );
  }

  return (
    <Card className="bg-[#1A1B1E] p-6 border-[#2A2D36]">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
            <Key className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Credenciais BS Pay</h2>
            <p className="text-sm text-gray-400">
              Última atualização: {new Date(credentials?.updatedAt || "").toLocaleString()}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-2">Client ID</label>
            <Input
              value={formData.clientId}
              onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Seu Client ID"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">Client Secret</label>
            <Input
              type="password"
              value={formData.clientSecret}
              onChange={(e) => setFormData({ ...formData, clientSecret: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Seu Client Secret"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">URL Base</label>
            <Input
              value={formData.baseUrl}
              onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="URL da API"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleUpdate}
            disabled={updating}
          >
            {updating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Atualizando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>

        {/* Info Card */}
        <div className="bg-gray-800/50 rounded-xl p-4">
          <p className="text-sm text-gray-400">
            Estas credenciais são usadas para processar pagamentos via BS Pay. 
            Certifique-se de manter essas informações seguras e atualizadas.
          </p>
        </div>
      </div>
    </Card>
  );
}