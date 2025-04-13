"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle2, Clock, Package, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface RecentActivityProps {
  limit?: number
}

export function RecentActivity({ limit }: RecentActivityProps) {
  const [expanded, setExpanded] = useState(false)

  // Sample activity data
  const activities = [
    {
      id: 1,
      user: { name: "Ravi", avatar: "/placeholder-user.jpg", initials: "RK" },
      action: "packed",
      item: "Power Bank",
      time: "3:42 PM",
      group: "Camping Trip",
      icon: CheckCircle2,
      iconColor: "text-green-500",
    },
    {
      id: 2,
      user: { name: "Sarah", avatar: "/placeholder-user.jpg", initials: "SJ" },
      action: "ordered",
      item: "Tent",
      time: "2:15 PM",
      group: "Camping Trip",
      icon: ShoppingCart,
      iconColor: "text-blue-500",
    },
    {
      id: 3,
      user: { name: "Mike", avatar: "/placeholder-user.jpg", initials: "ML" },
      action: "marked as in transit",
      item: "Sleeping Bags",
      time: "Yesterday",
      group: "Camping Trip",
      icon: Package,
      iconColor: "text-orange-500",
    },
    {
      id: 4,
      user: { name: "Lisa", avatar: "/placeholder-user.jpg", initials: "LT" },
      action: "added",
      item: "First Aid Kit",
      time: "Yesterday",
      group: "Camping Trip",
      icon: Clock,
      iconColor: "text-purple-500",
    },
    {
      id: 5,
      user: { name: "John", avatar: "/placeholder-user.jpg", initials: "JD" },
      action: "delivered",
      item: "Cooler",
      time: "2 days ago",
      group: "Camping Trip",
      icon: Package,
      iconColor: "text-green-500",
    },
    {
      id: 6,
      user: { name: "Emma", avatar: "/placeholder-user.jpg", initials: "EW" },
      action: "assigned",
      item: "Cooking Supplies",
      time: "2 days ago",
      group: "Camping Trip",
      icon: Clock,
      iconColor: "text-blue-500",
    },
    {
      id: 7,
      user: { name: "Alex", avatar: "/placeholder-user.jpg", initials: "AJ" },
      action: "created checklist",
      item: "Camping Essentials",
      time: "3 days ago",
      group: "Camping Trip",
      icon: CheckCircle2,
      iconColor: "text-green-500",
    },
  ]

  const displayedActivities = limit && !expanded ? activities.slice(0, limit) : activities

  return (
    <div className="space-y-4">
      {displayedActivities.map((activity, index) => {
        const ActivityIcon = activity.icon

        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4 rounded-lg border p-4 hover:bg-accent/50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
              <AvatarFallback>{activity.user.initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                <span className="font-semibold">{activity.user.name}</span> {activity.action}{" "}
                <span className="font-semibold">{activity.item}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.time} • {activity.group}
              </p>
            </div>

            <div
              className={`${activity.iconColor} h-8 w-8 rounded-full bg-background flex items-center justify-center`}
            >
              <ActivityIcon className="h-4 w-4" />
            </div>
          </motion.div>
        )
      })}

      {limit && activities.length > limit && (
        <div className="text-center">
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Show Less" : "View All"}
          </Button>
        </div>
      )}
    </div>
  )
}
