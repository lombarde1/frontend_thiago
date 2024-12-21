"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleDollarSign, ArrowUpRight, ArrowDownRight, Building, CreditCard, Percent, Wallet, Calendar } from "lucide-react";

const features = [
  { icon: <CircleDollarSign className="h-6 w-6" />, label: "Comprar" },
  { icon: <ArrowUpRight className="h-6 w-6" />, label: "Enviar" },
  { icon: <ArrowDownRight className="h-6 w-6" />, label: "Receber" },
  { icon: <Building className="h-6 w-6" />, label: "Depositar" },
  { icon: <CreditCard className="h-6 w-6" />, label: "Card" },
  { icon: <Percent className="h-6 w-6" />, label: "Earn" },
  { icon: <Wallet className="h-6 w-6" />, label: "Wallet" },
  { icon: <Calendar className="h-6 w-6" />, label: "Compras programadas" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="relative w-48 h-48 mx-auto mb-12">
          <div className="absolute w-32 h-32 bg-yellow-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute w-32 h-32 bg-green-400 rounded-full blur-xl opacity-20 animate-pulse" style={{ left: "20px" }}></div>
          <div className="absolute w-32 h-32 bg-blue-400 rounded-full blur-xl opacity-20 animate-pulse" style={{ left: "40px" }}></div>
        </div>

        {/* Hero Text */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
            O futuro do dinheiro está aqui
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Compre, venda e gerencie centenas de criptomoedas de modo simples e seguro
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-gray-900 rounded-2xl hover:bg-gray-800 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <span className="text-sm font-medium">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full">
              Inscreva-se
            </Button>
          </Link>
          <Link href="/login">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto px-8 py-6 text-lg text-gray-800 bg-white hover:bg-gray-100 rounded-full"
            >
              Entrar
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-400">
          <Link href="/terms" className="hover:text-white">Termos</Link>
          <span className="mx-2">|</span>
          <Link href="/privacy" className="hover:text-white">Privacidade</Link>
        </div>
      </footer>
    </main>
  );
}