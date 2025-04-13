"use client"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function DashboardHeatmap() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Generate sample data for the heatmap
  // 7 days x 5 team members
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const members = ["Alex", "Jamie", "Taylor", "Morgan", "Casey"]

  const getRandomValue = () => Math.floor(Math.random() * 10)

  const data = days.map((day) => {
    const dayData: Record<string, number> = { day }
    members.forEach((member) => {
      dayData[member] = getRandomValue()
    })
    return dayData
  })

  // Color scale for the heatmap
  const getColor = (value: number) => {
    if (value === 0) return isDark ? "#1f2937" : "#f3f4f6"
    if (value < 3) return isDark ? "#064e3b" : "#d1fae5"
    if (value < 6) return isDark ? "#047857" : "#6ee7b7"
    if (value < 9) return isDark ? "#10b981" : "#34d399"
    return isDark ? "#059669" : "#10b981"
  }

  return (
    <div className="w-full">
      <div className="flex mb-2">
        <div className="w-16"></div>
        {members.map((member) => (
          <div key={member} className="flex-1 text-center text-xs font-medium truncate px-1">
            {member}
          </div>
        ))}
      </div>

      {data.map((dayData, rowIndex) => (
        <div key={dayData.day} className="flex mb-2">
          <div className="w-16 text-xs font-medium flex items-center">{dayData.day}</div>
          {members.map((member, colIndex) => {
            const value = dayData[member]
            return (
              <motion.div
                key={`${dayData.day}-${member}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.05 * (rowIndex + colIndex),
                  duration: 0.2,
                }}
                className="flex-1 mx-1 h-8 rounded-sm flex items-center justify-center"
                style={{ backgroundColor: getColor(value) }}
              >
                <span className="text-xs font-medium">{value > 0 ? value : ""}</span>
              </motion.div>
            )
          })}
        </div>
      ))}

      <div className="mt-4 flex items-center justify-center">
        <div className="text-xs text-muted-foreground mr-2">Activity Level:</div>
        <div className="flex">
          {[0, 3, 6, 9].map((level) => (
            <div key={level} className="flex items-center mr-3">
              <div className="w-3 h-3 rounded-sm mr-1" style={{ backgroundColor: getColor(level) }}></div>
              <span className="text-xs">
                {level === 0 ? "None" : level === 9 ? "High" : level === 3 ? "Low" : "Medium"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
