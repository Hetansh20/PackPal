"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, CheckCircle2, Clock, Package, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { DashboardHeatmap } from "@/components/dashboard/dashboard-heatmap"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { UpcomingDeliveries } from "@/components/dashboard/upcoming-deliveries"
import { CounterValue } from "@/components/ui/counter-value"

export function DashboardOverview() {
  const [timeRange, setTimeRange] = useState("week")

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

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Tabs defaultValue="week" onValueChange={setTimeRange} value={timeRange}>
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <motion.div variants={container} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Groups</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CounterValue value={12} duration={1.5} />
              </div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
              <Progress value={75} className="mt-3 h-1" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Checklists</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CounterValue value={24} duration={1.5} />
              </div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                <span>18% increase</span>
              </div>
              <Progress value={65} className="mt-3 h-1" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CounterValue value={7} duration={1.5} />
              </div>
              <div className="flex items-center text-xs text-red-500">
                <ArrowDown className="mr-1 h-3 w-3" />
                <span>3 delayed</span>
              </div>
              <Progress value={32} className="mt-3 h-1" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Packing Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CounterValue value={68} duration={1.5} suffix="%" />
              </div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                <span>12% increase</span>
              </div>
              <Progress value={68} className="mt-3 h-1" />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={item} className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Packing Progress</CardTitle>
            <CardDescription>Items packed vs pending over time</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardCharts timeRange={timeRange} />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Team contribution heatmap</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardHeatmap />
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions across all groups</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity limit={5} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Upcoming Deliveries</CardTitle>
              <CardDescription>Expected deliveries in the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <UpcomingDeliveries />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
