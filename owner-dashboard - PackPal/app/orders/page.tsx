import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { OrderDeliveryControl } from "@/components/dashboard/order-delivery-control"

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <OrderDeliveryControl />
    </DashboardLayout>
  )
}
