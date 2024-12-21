"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";
import { ActivityItem } from "./activity-item";
import { ActivityFilters } from "./activity-filters";
import type { Activity } from "@/lib/api/activity/types";

interface ActivityListProps {
  activities: Activity[];
}

export function ActivityList({ activities }: ActivityListProps) {
  const [currentFilter, setCurrentFilter] = useState<string>("all");

  const filteredActivities = activities.filter(activity => {
    if (currentFilter === "all") return true;
    return activity.category === currentFilter;
  });

  return (
    <div className="space-y-6">
      <ActivityFilters 
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />

      {filteredActivities.length === 0 ? (
        <Card className="bg-gray-900 p-6 text-center border-gray-800">
          <CircleDollarSign className="w-12 h-12 mx-auto mb-3 text-gray-600" />
          <p className="text-gray-400">Nenhuma atividade encontrada</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <ActivityItem 
              key={activity.id || activity.date} 
              activity={activity} 
            />
          ))}
        </div>
      )}
    </div>
  );
}