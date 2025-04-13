"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Edit,
  Filter,
  MoreHorizontal,
  Package,
  Plus,
  ShoppingCart,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function OrderDeliveryControl() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGroup, setFilterGroup] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [orders, setOrders] = useState([
    {
      id: 1,
      item: "Tent",
      group: "Camping Trip",
      status: "delivered",
      orderedDate: "2023-07-25",
      estimatedDelivery: "2023-08-02",
      actualDelivery: "2023-08-01",
      price: 129.99,
      vendor: "OutdoorGear",
      orderedBy: { name: "Alex", avatar: "/placeholder-user.jpg", initials: "AJ" },
      notes: "Delivered early, in perfect condition",
    },
    {
      id: 2,
      item: "Sleeping Bags",
      group: "Camping Trip",
      status: "in-transit",
      orderedDate: "2023-07-28",
      estimatedDelivery: "2023-08-05",
      actualDelivery: null,
      price: 89.99,
      vendor: "SleepWell",
      orderedBy: { name: "Jamie", avatar: "/placeholder-user.jpg", initials: "JT" },
      notes: "Tracking shows it's on the way",
    },
    {
      id: 3,
      item: "Cooler",
      group: "Camping Trip",
      status: "ordered",
      orderedDate: "2023-08-01",
      estimatedDelivery: "2023-08-10",
      actualDelivery: null,
      price: 75.5,
      vendor: "CoolStuff",
      orderedBy: { name: "Taylor", avatar: "/placeholder-user.jpg", initials: "TS" },
      notes: "Order confirmed",
    },
    {
      id: 4,
      item: "Office Supplies",
      group: "Office Party",
      status: "delivered",
      orderedDate: "2023-07-15",
      estimatedDelivery: "2023-07-20",
      actualDelivery: "2023-07-19",
      price: 45.25,
      vendor: "OfficeDepot",
      orderedBy: { name: "Morgan", avatar: "/placeholder-user.jpg", initials: "MR" },
      notes: "All items received",
    },
    {
      id: 5,
      item: "Decorations",
      group: "Office Party",
      status: "delayed",
      orderedDate: "2023-07-20",
      estimatedDelivery: "2023-07-30",
      actualDelivery: null,
      price: 65.75,
      vendor: "PartyCity",
      orderedBy: { name: "Casey", avatar: "/placeholder-user.jpg", initials: "CK" },
      notes: "Shipping delayed due to weather",
    },
    {
      id: 6,
      item: "Beach Umbrellas",
      group: "Family Vacation",
      status: "in-transit",
      orderedDate: "2023-07-10",
      estimatedDelivery: "2023-07-25",
      actualDelivery: null,
      price: 120.0,
      vendor: "BeachGear",
      orderedBy: { name: "Jordan", avatar: "/placeholder-user.jpg", initials: "JK" },
      notes: "Tracking shows it's on the way",
    },
  ])

  // Filter orders based on search term and filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.group.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGroup = filterGroup === "all" || order.group === filterGroup
    const matchesStatus = filterStatus === "all" || order.status === filterStatus

    return matchesSearch && matchesGroup && matchesStatus
  })

  // Get unique groups for filter dropdown
  const groups = [...new Set(orders.map((order) => order.group))]

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Order Created",
      description: "Your new order has been added successfully",
    })
  }

  const handleUpdateStatus = (orderId: number, newStatus: string) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: newStatus }
        }
        return order
      }),
    )

    toast({
      title: "Status Updated",
      description: `Order status changed to ${newStatus.replace("-", " ")}`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-500 bg-green-100 dark:bg-green-900/20"
      case "in-transit":
        return "text-blue-500 bg-blue-100 dark:bg-blue-900/20"
      case "ordered":
        return "text-purple-500 bg-purple-100 dark:bg-purple-900/20"
      case "delayed":
        return "text-red-500 bg-red-100 dark:bg-red-900/20"
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return CheckCircle2
      case "in-transit":
        return Truck
      case "ordered":
        return ShoppingCart
      case "delayed":
        return AlertCircle
      default:
        return Package
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

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
        <h1 className="text-3xl font-bold tracking-tight">Orders & Deliveries</h1>
        <div className="flex w-full sm:w-auto gap-2">
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[300px]"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleCreateOrder}>
                <DialogHeader>
                  <DialogTitle>Add New Order</DialogTitle>
                  <DialogDescription>Track a new order or delivery for your group.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="item" className="text-sm font-medium">
                      Item Name
                    </label>
                    <Input id="item" placeholder="Enter item name" required />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="group" className="text-sm font-medium">
                      Group
                    </label>
                    <Select>
                      <SelectTrigger id="group">
                        <SelectValue placeholder="Select group" />
                      </SelectTrigger>
                      <SelectContent>
                        {groups.map((group) => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="vendor" className="text-sm font-medium">
                      Vendor
                    </label>
                    <Input id="vendor" placeholder="Enter vendor name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="price" className="text-sm font-medium">
                        Price
                      </label>
                      <Input id="price" type="number" step="0.01" placeholder="0.00" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="estimatedDelivery" className="text-sm font-medium">
                        Estimated Delivery
                      </label>
                      <Input id="estimatedDelivery" type="date" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="notes" className="text-sm font-medium">
                      Notes
                    </label>
                    <Textarea id="notes" placeholder="Add any notes about this order" />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.querySelector<HTMLButtonElement>("[data-dismiss]")?.click()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Order</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter by:</span>
        </div>
        <Select value={filterGroup} onValueChange={setFilterGroup}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Groups</SelectItem>
            {groups.map((group) => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="ordered">Ordered</SelectItem>
            <SelectItem value="in-transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="delayed">Delayed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="cards" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="cards">Card View</TabsTrigger>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
        </TabsList>
        <TabsContent value="cards">
          <motion.div variants={container} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status)

              return (
                <motion.div key={order.id} variants={item}>
                  <Card className={order.status === "delayed" ? "border-red-200 dark:border-red-900/50" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{order.item}</CardTitle>
                          <CardDescription>{order.group}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "ordered")}>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Mark as Ordered
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "in-transit")}>
                              <Truck className="mr-2 h-4 w-4" />
                              Mark as In Transit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "delivered")}>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Mark as Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "delayed")}>
                              <AlertCircle className="mr-2 h-4 w-4" />
                              Mark as Delayed
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={order.orderedBy.avatar || "/placeholder.svg"}
                              alt={order.orderedBy.name}
                            />
                            <AvatarFallback>{order.orderedBy.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{order.orderedBy.name}</span>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace("-", " ")}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Order Progress</span>
                        </div>
                        <div className="relative pt-4">
                          <div className="absolute top-0 left-0 w-full flex justify-between">
                            <div className="flex flex-col items-center">
                              <ShoppingCart
                                className={`h-4 w-4 ${order.status === "ordered" || order.status === "in-transit" || order.status === "delivered" ? "text-green-500" : "text-muted-foreground"}`}
                              />
                              <div
                                className={`h-2 w-2 rounded-full mt-1 ${order.status === "ordered" || order.status === "in-transit" || order.status === "delivered" ? "bg-green-500" : "bg-muted-foreground"}`}
                              ></div>
                            </div>
                            <div className="flex flex-col items-center">
                              <Truck
                                className={`h-4 w-4 ${order.status === "in-transit" || order.status === "delivered" ? "text-green-500" : "text-muted-foreground"}`}
                              />
                              <div
                                className={`h-2 w-2 rounded-full mt-1 ${order.status === "in-transit" || order.status === "delivered" ? "bg-green-500" : "bg-muted-foreground"}`}
                              ></div>
                            </div>
                            <div className="flex flex-col items-center">
                              <Package
                                className={`h-4 w-4 ${order.status === "delivered" ? "text-green-500" : "text-muted-foreground"}`}
                              />
                              <div
                                className={`h-2 w-2 rounded-full mt-1 ${order.status === "delivered" ? "bg-green-500" : "bg-muted-foreground"}`}
                              ></div>
                            </div>
                          </div>
                          <Progress
                            value={
                              order.status === "ordered"
                                ? 33
                                : order.status === "in-transit"
                                  ? 66
                                  : order.status === "delivered"
                                    ? 100
                                    : order.status === "delayed"
                                      ? 50
                                      : 0
                            }
                            className="h-2 mt-3"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Vendor</p>
                          <p className="font-medium">{order.vendor}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Price</p>
                          <p className="font-medium">${order.price.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Ordered</p>
                          <p className="font-medium">{formatDate(order.orderedDate)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Est. Delivery</p>
                          <p className="font-medium">{formatDate(order.estimatedDelivery)}</p>
                        </div>
                      </div>

                      {order.notes && (
                        <div className="text-sm">
                          <p className="text-muted-foreground">Notes</p>
                          <p>{order.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </TabsContent>
        <TabsContent value="timeline">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-8">
                {filteredOrders.map((order, index) => {
                  const StatusIcon = getStatusIcon(order.status)

                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`${getStatusColor(order.status)} h-10 w-10 rounded-full flex items-center justify-center`}
                        >
                          <StatusIcon className="h-5 w-5" />
                        </div>
                        {index < filteredOrders.length - 1 && <div className="flex-1 w-px bg-border mt-2"></div>}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{order.item}</span>
                            <Badge variant="outline">{order.group}</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>Ordered: {formatDate(order.orderedDate)}</span>
                          </div>
                        </div>

                        <div className="mt-2 space-y-2">
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback>{order.orderedBy.initials}</AvatarFallback>
                              </Avatar>
                              <span>{order.orderedBy.name}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Vendor:</span> {order.vendor}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Price:</span> ${order.price.toFixed(2)}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Est. Delivery:</span>{" "}
                              {formatDate(order.estimatedDelivery)}
                            </div>
                          </div>

                          <div className="relative pt-4">
                            <div className="absolute top-0 left-0 w-full flex justify-between">
                              <div className="flex flex-col items-center">
                                <ShoppingCart
                                  className={`h-3 w-3 ${order.status === "ordered" || order.status === "in-transit" || order.status === "delivered" ? "text-green-500" : "text-muted-foreground"}`}
                                />
                                <span className="text-xs mt-1">Ordered</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Truck
                                  className={`h-3 w-3 ${order.status === "in-transit" || order.status === "delivered" ? "text-green-500" : "text-muted-foreground"}`}
                                />
                                <span className="text-xs mt-1">In Transit</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Package
                                  className={`h-3 w-3 ${order.status === "delivered" ? "text-green-500" : "text-muted-foreground"}`}
                                />
                                <span className="text-xs mt-1">Delivered</span>
                              </div>
                            </div>
                            <Progress
                              value={
                                order.status === "ordered"
                                  ? 33
                                  : order.status === "in-transit"
                                    ? 66
                                    : order.status === "delivered"
                                      ? 100
                                      : order.status === "delayed"
                                        ? 50
                                        : 0
                              }
                              className="h-1 mt-8"
                            />
                          </div>

                          {order.notes && (
                            <div className="mt-2 text-sm">
                              <span className="text-muted-foreground">Notes:</span> {order.notes}
                            </div>
                          )}

                          <div className="mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleUpdateStatus(
                                  order.id,
                                  order.status === "ordered"
                                    ? "in-transit"
                                    : order.status === "in-transit"
                                      ? "delivered"
                                      : "ordered",
                                )
                              }
                            >
                              {order.status === "ordered"
                                ? "Mark In Transit"
                                : order.status === "in-transit"
                                  ? "Mark Delivered"
                                  : "Update Status"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
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
