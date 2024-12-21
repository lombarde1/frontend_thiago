"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const MOCK_DATA = [
  { timestamp: '2024-01-01', value: 1000 },
  { timestamp: '2024-01-02', value: 1200 },
  { timestamp: '2024-01-03', value: 1100 },
  { timestamp: '2024-01-04', value: 1400 },
  { timestamp: '2024-01-05', value: 1300 },
  { timestamp: '2024-01-06', value: 1600 },
  { timestamp: '2024-01-07', value: 1500 },
];

export function EarningsChart() {
  return (
    <Card className="bg-gray-900 p-6">
      <h2 className="text-lg font-semibold mb-4 text-white">Rendimentos</h2>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={MOCK_DATA}>
            <XAxis 
              dataKey="timestamp" 
              stroke="#6B7280"
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis 
              stroke="#6B7280"
              tickFormatter={(value) => `R$ ${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px'
              }}
              formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Valor']}
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}