"use client"

import { motion } from "framer-motion"
import { AlertCircle, Calendar, Package, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function UpcomingDeliveries() {
  // Sample delivery data
  const deliveries = [
    {
      id: 1,
      item: "Tent",
      vendor: "OutdoorGear",
      orderedDate: "2023-08-01",
      estimatedDelivery: "2023-08-07",
      status: "in-transit",
      isDelayed: false,
      group: "Camping Trip",
    },
    {
      id: 2,
      item: "Sleeping Bags",
      vendor: "SleepWell",
      orderedDate: "2023-08-02",
      estimatedDelivery: "2023-08-08",
      status: "in-transit",
      isDelayed: false,
      group: "Camping Trip",
    },
    {
      id: 3,
      item: "Cooler",
      vendor: "CoolStuff",
      orderedDate: "2023-08-03",
      estimatedDelivery: "2023-08-06",
      status: "ordered",
      isDelayed: true,
      group: "Camping Trip",
    },
    {
      id: 4,
      item: "Portable Grill",
      vendor: "OutdoorCooking",
      orderedDate: "2023-08-04",
      estimatedDelivery: "2023-08-10",
      status: "ordered",
      isDelayed: false,
      group: "Camping Trip",
    },
  ]

  const getStatusColor = (status: string, isDelayed: boolean) => {
    if (isDelayed) return "text-red-500 bg-red-100 dark:bg-red-900/20"
    switch (status) {
      case "in-transit":
        return "text-blue-500 bg-blue-100 dark:bg-blue-900/20"
      case "ordered":
        return "text-purple-500 bg-purple-100 dark:bg-purple-900/20"
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getStatusIcon = (status: string, isDelayed: boolean) => {
    if (isDelayed) return AlertCircle
    switch (status) {
      case "in-transit":
        return Truck
      case "ordered":
        return Package
      default:
        return Package
    }
  }

  const getStatusText = (status: string, isDelayed: boolean) => {
    if (isDelayed) return "Delayed"
    return status === "in-transit" ? "In Transit" : "Ordered"
  }

  const getProgressValue = (status: string) => {
    switch (status) {
      case "ordered":
        return 25
      case "in-transit":
        return 75
      default:
        return 0
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getDaysRemaining = (dateString: string) => {
    const today = new Date()
    const deliveryDate = new Date(dateString)
    const diffTime = deliveryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-4">
      <TooltipProvider>
        {deliveries.map((delivery, index) => {
          const StatusIcon = getStatusIcon(delivery.status, delivery.isDelayed)
          const daysRemaining = getDaysRemaining(delivery.estimatedDelivery)

          return (
            <motion.div
              key={delivery.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-lg border p-4 ${delivery.isDelayed ? "border-red-200 dark:border-red-900/50" : ""}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{delivery.item}</h3>
                  <p className="text-xs text-muted-foreground">{delivery.vendor}</p>
                </div>
                <Badge className={getStatusColor(delivery.status, delivery.isDelayed)}>
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {getStatusText(delivery.status, delivery.isDelayed)}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <div className="flex items-center">
                    <Package className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span>Ordered: {formatDate(delivery.orderedDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span>Expected: {formatDate(delivery.estimatedDelivery)}</span>
                  </div>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <Progress value={getProgressValue(delivery.status)} className="h-1" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Ordered</span>
                        <span>In Transit</span>
                        <span>Delivered</span>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{delivery.isDelayed ? "Delivery delayed" : `${daysRemaining} days remaining`}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </motion.div>
          )
        })}
      </TooltipProvider>
    </div>
  )
}
