"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ActivityList } from "@/components/activity/activity-list";
import type { Activity } from "@/lib/api/activity/types";
import { getActivityHistory } from "@/lib/api/activity/service";

export default function ActivityPage() {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivity() {
      try {
        const data = await getActivityHistory();
        setActivities(data);
      } catch (error) {
        console.error("Failed to load activity:", error);
      } finally {
        setLoading(false);
      }
    }

    loadActivity();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-gray-800"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Atividade</h1>
        </div>
        
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="h-24 bg-gray-900 animate-pulse" />
              ))}
            </div>
          ) : (
            <ActivityList activities={activities} />
          )}
        </div>
      </div>
    </div>
  );
}