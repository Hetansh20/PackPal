"use client"

import { useTheme } from "next-themes"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

export function DashboardChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Sample data
  const data = [
    { name: "Mon", packed: 24, pending: 18 },
    { name: "Tue", packed: 30, pending: 15 },
    { name: "Wed", packed: 42, pending: 12 },
    { name: "Thu", packed: 50, pending: 10 },
    { name: "Fri", packed: 65, pending: 8 },
    { name: "Sat", packed: 75, pending: 5 },
    { name: "Sun", packed: 82, pending: 3 },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorPacked" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke={isDark ? "#888888" : "#666666"} fontSize={12} />
        <YAxis stroke={isDark ? "#888888" : "#666666"} fontSize={12} />
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333333" : "#eeeeee"} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            color: isDark ? "#ffffff" : "#000000",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="packed"
          stroke="#10b981"
          fillOpacity={1}
          fill="url(#colorPacked)"
          name="Packed Items"
        />
        <Area
          type="monotone"
          dataKey="pending"
          stroke="#f97316"
          fillOpacity={1}
          fill="url(#colorPending)"
          name="Pending Items"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
