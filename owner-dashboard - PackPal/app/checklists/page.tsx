import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ChecklistManagement } from "@/components/dashboard/checklist-management"

export default function ChecklistsPage() {
  return (
    <DashboardLayout>
      <ChecklistManagement />
    </DashboardLayout>
  )
}
