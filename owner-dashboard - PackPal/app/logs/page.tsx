import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ActivityLogs } from "@/components/dashboard/activity-logs"

export default function LogsPage() {
  return (
    <DashboardLayout>
      <ActivityLogs />
    </DashboardLayout>
  )
}
