"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const FILTER_OPTIONS = [
  { label: "Todos", value: "all" },
  { label: "Depósitos", value: "deposit" },
  { label: "Saques", value: "withdraw" },
  { label: "Trades", value: "trade" }
] as const;

type FilterValue = typeof FILTER_OPTIONS[number]['value'];

interface ActivityFiltersProps {
  onFilterChange: (filter: FilterValue) => void;
  currentFilter: FilterValue;
}

export function ActivityFilters({ onFilterChange, currentFilter }: ActivityFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {FILTER_OPTIONS.map((filter) => (
        <Button
          key={filter.value}
          variant={currentFilter === filter.value ? "default" : "outline"}
          className={`whitespace-nowrap px-4 py-2 rounded-xl ${
            currentFilter === filter.value 
              ? "bg-blue-600 hover:bg-blue-700 text-white" 
              : "bg-gray-900 hover:bg-gray-800 text-gray-300"
          }`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}