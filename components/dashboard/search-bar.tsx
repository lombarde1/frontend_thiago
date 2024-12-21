"use client";

import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="flex-1 mx-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Pesquisar"
          className="w-full bg-gray-800/50 rounded-full py-2 pl-10 pr-4 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}