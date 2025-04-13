"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, CheckCircle2, Clock, Download, Filter, Package, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ActivityLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterUser, setFilterUser] = useState("all")
  const [filterAction, setFilterAction] = useState("all")
  const [filterDate, setFilterDate] = useState("all")

  // Sample activity data
  const activities = [
    {
      id: 1,
      user: { name: "Ravi", avatar: "/placeholder-user.jpg", initials: "RK" },
      action: "packed",
      item: "Power Bank",
      time: "2023-08-05T15:42:00",
      group: "Camping Trip",
      icon: CheckCircle2,
      iconColor: "text-green-500",
    },
    {
      id: 2,
      user: { name: "Sarah", avatar: "/placeholder-user.jpg", initials: "SJ" },
      action: "ordered",
      item: "Tent",
      time: "2023-08-05T14:15:00",
      group: "Camping Trip",
      icon: ShoppingCart,
      iconColor: "text-blue-500",
    },
    {
      id: 3,
      user: { name: "Mike", avatar: "/placeholder-user.jpg", initials: "ML" },
      action: "marked as in transit",
      item: "Sleeping Bags",
      time: "2023-08-04T10:30:00",
      group: "Camping Trip",
      icon: Package,
      iconColor: "text-orange-500",
    },
    {
      id: 4,
      user: { name: "Lisa", avatar: "/placeholder-user.jpg", initials: "LT" },
      action: "added",
      item: "First Aid Kit",
      time: "2023-08-04T09:15:00",
      group: "Camping Trip",
      icon: Clock,
      iconColor: "text-purple-500",
    },
    {
      id: 5,
      user: { name: "John", avatar: "/placeholder-user.jpg", initials: "JD" },
      action: "delivered",
      item: "Cooler",
      time: "2023-08-03T16:45:00",
      group: "Camping Trip",
      icon: Package,
      iconColor: "text-green-500",
    },
    {
      id: 6,
      user: { name: "Emma", avatar: "/placeholder-user.jpg", initials: "EW" },
      action: "assigned",
      item: "Cooking Supplies",
      time: "2023-08-03T11:20:00",
      group: "Camping Trip",
      icon: User,
      iconColor: "text-blue-500",
    },
    {
      id: 7,
      user: { name: "Alex", avatar: "/placeholder-user.jpg", initials: "AJ" },
      action: "created checklist",
      item: "Camping Essentials",
      time: "2023-08-02T09:30:00",
      group: "Camping Trip",
      icon: CheckCircle2,
      iconColor: "text-green-500",
    },
    {
      id: 8,
      user: { name: "Morgan", avatar: "/placeholder-user.jpg", initials: "MR" },
      action: "created group",
      item: "Office Party",
      time: "2023-08-01T14:00:00",
      group: "Office Party",
      icon: User,
      iconColor: "text-purple-500",
    },
  ]

  // Filter activities based on search term and filters
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.group.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesUser = filterUser === "all" || activity.user.name === filterUser
    const matchesAction = filterAction === "all" || activity.action === filterAction

    const activityDate = new Date(activity.time).toISOString().split("T")[0]
    const today = new Date().toISOString().split("T")[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]

    const matchesDate =
      filterDate === "all" ||
      (filterDate === "today" && activityDate === today) ||
      (filterDate === "yesterday" && activityDate === yesterday) ||
      (filterDate === "week" && new Date(activity.time) > new Date(Date.now() - 7 * 86400000))

    return matchesSearch && matchesUser && matchesAction && matchesDate
  })

  // Get unique users and actions for filter dropdowns
  const users = [...new Set(activities.map((activity) => activity.user.name))]
  const actions = [...new Set(activities.map((activity) => activity.action))]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date >= today) {
      return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else if (date >= yesterday) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else {
      return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Activity Logs</h2>
        <div className="flex w-full sm:w-auto gap-2">
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[300px]"
          />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter by:</span>
        </div>
        <Select value={filterUser} onValueChange={setFilterUser}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            {users.map((user) => (
              <SelectItem key={user} value={user}>
                {user}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterAction} onValueChange={setFilterAction}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            {actions.map((action) => (
              <SelectItem key={action} value={action}>
                {action}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterDate} onValueChange={setFilterDate}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="timeline">
          <Card>
            <CardContent className="p-6">
              <motion.div variants={container} className="space-y-8">
                {filteredActivities.map((activity, index) => {
                  const ActivityIcon = activity.icon
                  const date = new Date(activity.time)
                  const prevDate = index > 0 ? new Date(filteredActivities[index - 1].time) : null
                  const showDateHeader = !prevDate || date.toDateString() !== prevDate.toDateString()

                  return (
                    <motion.div key={activity.id} variants={item}>
                      {showDateHeader && (
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <h3 className="font-semibold">{date.toDateString()}</h3>
                          <div className="flex-1 h-px bg-border"></div>
                        </div>
                      )}
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`${activity.iconColor} h-10 w-10 rounded-full bg-background flex items-center justify-center`}
                          >
                            <ActivityIcon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 w-px bg-border mt-2"></div>
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={activity.user.avatar || "/placeholder.svg"}
                                  alt={activity.user.name}
                                />
                                <AvatarFallback>{activity.user.initials}</AvatarFallback>
                              </Avatar>
                              <span className="font-semibold">{activity.user.name}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{formatTime(activity.time)}</span>
                          </div>
                          <p>
                            <span className="font-medium">{activity.action}</span> {activity.item} in{" "}
                            <Badge variant="outline">{activity.group}</Badge>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                  <div className="col-span-2">Time</div>
                  <div className="col-span-2">User</div>
                  <div className="col-span-2">Action</div>
                  <div className="col-span-3">Item</div>
                  <div className="col-span-3">Group</div>
                </div>
                {filteredActivities.map((activity) => {
                  const ActivityIcon = activity.icon

                  return (
                    <div key={activity.id} className="grid grid-cols-12 gap-2 p-4 items-center border-b last:border-0">
                      <div className="col-span-2 text-sm text-muted-foreground">{formatTime(activity.time)}</div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                            <AvatarFallback>{activity.user.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{activity.user.name}</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <ActivityIcon className={`h-4 w-4 ${activity.iconColor}`} />
                          <span className="text-sm">{activity.action}</span>
                        </div>
                      </div>
                      <div className="col-span-3 text-sm font-medium">{activity.item}</div>
                      <div className="col-span-3">
                        <Badge variant="outline">{activity.group}</Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
