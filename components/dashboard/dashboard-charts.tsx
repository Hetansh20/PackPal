"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

interface DashboardChartsProps {
  timeRange: string
}

export function DashboardCharts({ timeRange }: DashboardChartsProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [activeIndex, setActiveIndex] = useState(0)
  const [chartType, setChartType] = useState<"area" | "bar" | "pie">("area")
  const [chartData, setChartData] = useState<any[]>([])

  // Generate data based on time range
  useEffect(() => {
    if (chartType === "area") {
      const data = generateAreaData(timeRange)
      setChartData(data)
    } else if (chartType === "bar") {
      const data = generateBarData(timeRange)
      setChartData(data)
    } else if (chartType === "pie") {
      const data = generatePieData()
      setChartData(data)
    }
  }, [timeRange, chartType])

  const generateAreaData = (range: string) => {
    const data = []
    const days = range === "day" ? 24 : range === "week" ? 7 : 30
    const labels =
      range === "day"
        ? Array.from({ length: 24 }, (_, i) => `${i}:00`)
        : range === "week"
          ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          : Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)

    for (let i = 0; i < days; i++) {
      const packed = Math.floor(Math.random() * 50) + 20
      const pending = Math.floor(Math.random() * 30) + 10
      data.push({
        name: labels[i],
        packed,
        pending,
      })
    }
    return data
  }

  const generateBarData = (range: string) => {
    const data = []
    const members = ["Alex", "Jamie", "Taylor", "Morgan", "Casey"]

    for (const member of members) {
      const completed = Math.floor(Math.random() * 50) + 10
      const pending = Math.floor(Math.random() * 30) + 5
      data.push({
        name: member,
        completed,
        pending,
      })
    }
    return data
  }

  const generatePieData = () => {
    return [
      { name: "Packed", value: 68, color: "#10b981" },
      { name: "In Transit", value: 12, color: "#3b82f6" },
      { name: "Pending", value: 20, color: "#f97316" },
    ]
  }

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const chartButtons = [
    { type: "area", label: "Progress" },
    { type: "bar", label: "Members" },
    { type: "pie", label: "Status" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {chartButtons.map((button) => (
          <button
            key={button.type}
            onClick={() => setChartType(button.type as any)}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              chartType === button.type
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {button.label}
          </button>
        ))}
      </div>

      <motion.div
        key={chartType}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-[300px] w-full"
      >
        {chartType === "area" && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
        )}

        {chartType === "bar" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333333" : "#eeeeee"} />
              <XAxis dataKey="name" stroke={isDark ? "#888888" : "#666666"} fontSize={12} />
              <YAxis stroke={isDark ? "#888888" : "#666666"} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  borderColor: isDark ? "#374151" : "#e5e7eb",
                  color: isDark ? "#ffffff" : "#000000",
                }}
              />
              <Legend />
              <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" name="Pending" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartType === "pie" && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={onPieEnter}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={isDark ? "#1f2937" : "#ffffff"}
                    strokeWidth={2}
                    className="transition-opacity duration-300"
                    style={{
                      opacity: activeIndex === index ? 1 : 0.7,
                      filter: activeIndex === index ? "drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))" : "none",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  borderColor: isDark ? "#374151" : "#e5e7eb",
                  color: isDark ? "#ffffff" : "#000000",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </div>
  )
}
