"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { DashboardOverview } from "@/components/dashboard-overview"
import { GroupManagement } from "@/components/group-management"
import { ChecklistManagement } from "@/components/checklist-management"
import { OrderTracking } from "@/components/order-tracking"
import { ActivityLogs } from "@/components/activity-logs"
import { Settings } from "@/components/settings"

export default function Dashboard() {
  const [activeView, setActiveView] = useState("dashboard")

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview />
      case "groups":
        return <GroupManagement />
      case "checklists":
        return <ChecklistManagement />
      case "orders":
        return <OrderTracking />
      case "logs":
        return <ActivityLogs />
      case "settings":
        return <Settings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{renderView()}</main>
      </div>
    </div>
  )
}
