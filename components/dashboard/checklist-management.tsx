"use client"

import type React from "react"

import { useState } from "react"
import { motion, Reorder } from "framer-motion"
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  GripVertical,
  MoreHorizontal,
  Package,
  Plus,
  Trash,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Checkbox } from "@/components/ui/checkbox"

export function ChecklistManagement() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGroup, setFilterGroup] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterAssignee, setFilterAssignee] = useState("all")
  const [items, setItems] = useState<any[]>([
    {
      id: 1,
      title: "Tent",
      description: "4-person tent with rainfly",
      priority: "high",
      quantity: 1,
      category: "Shelter",
      status: "to-pack",
      assignee: { name: "Alex", avatar: "/placeholder-user.jpg", initials: "AJ" },
      group: "Camping Trip",
    },
    {
      id: 2,
      title: "Sleeping Bags",
      description: "Rated for 30°F",
      priority: "high",
      quantity: 4,
      category: "Shelter",
      status: "packed",
      assignee: { name: "Jamie", avatar: "/placeholder-user.jpg", initials: "JT" },
      group: "Camping Trip",
    },
    {
      id: 3,
      title: "Cooler",
      description: "With ice packs",
      priority: "medium",
      quantity: 1,
      category: "Food",
      status: "to-pack",
      assignee: { name: "Taylor", avatar: "/placeholder-user.jpg", initials: "TS" },
      group: "Camping Trip",
    },
    {
      id: 4,
      title: "First Aid Kit",
      description: "Basic supplies",
      priority: "high",
      quantity: 1,
      category: "Safety",
      status: "packed",
      assignee: { name: "Morgan", avatar: "/placeholder-user.jpg", initials: "MR" },
      group: "Camping Trip",
    },
    {
      id: 5,
      title: "Portable Stove",
      description: "With fuel",
      priority: "medium",
      quantity: 1,
      category: "Cooking",
      status: "delivered",
      assignee: { name: "Casey", avatar: "/placeholder-user.jpg", initials: "CK" },
      group: "Camping Trip",
    },
    {
      id: 6,
      title: "Water Filter",
      description: "Gravity filter system",
      priority: "high",
      quantity: 1,
      category: "Water",
      status: "to-pack",
      assignee: { name: "Alex", avatar: "/placeholder-user.jpg", initials: "AJ" },
      group: "Camping Trip",
    },
  ])

  // Filter items based on search term and filters
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGroup = filterGroup === "all" || item.group === filterGroup
    const matchesStatus = filterStatus === "all" || item.status === filterStatus
    const matchesAssignee = filterAssignee === "all" || item.assignee.name === filterAssignee

    return matchesSearch && matchesGroup && matchesStatus && matchesAssignee
  })

  // Get unique groups, assignees, and categories for filter dropdowns
  const groups = [...new Set(items.map((item) => item.group))]
  const assignees = [...new Set(items.map((item) => item.assignee.name))]
  const categories = [...new Set(items.map((item) => item.category))]

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Item Created",
      description: "Your new item has been added to the checklist",
    })
  }

  const handleDeleteItem = (itemId: number) => {
    toast({
      title: "Item Deleted",
      description: "The item has been removed from the checklist",
      variant: "destructive",
    })
  }

  const handleStatusChange = (itemId: number, newStatus: string) => {
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          return { ...item, status: newStatus }
        }
        return item
      }),
    )

    toast({
      title: "Status Updated",
      description: `Item status changed to ${newStatus.replace("-", " ")}`,
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-100 dark:bg-red-900/20"
      case "medium":
        return "text-orange-500 bg-orange-100 dark:bg-orange-900/20"
      case "low":
        return "text-green-500 bg-green-100 dark:bg-green-900/20"
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "to-pack":
        return Clock
      case "packed":
        return CheckCircle2
      case "delivered":
        return Package
      default:
        return AlertCircle
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "to-pack":
        return "text-orange-500 bg-orange-100 dark:bg-orange-900/20"
      case "packed":
        return "text-green-500 bg-green-100 dark:bg-green-900/20"
      case "delivered":
        return "text-blue-500 bg-blue-100 dark:bg-blue-900/20"
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-900/20"
    }
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
        <h1 className="text-3xl font-bold tracking-tight">Checklists</h1>
        <div className="flex w-full sm:w-auto gap-2">
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[300px]"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleCreateItem}>
                <DialogHeader>
                  <DialogTitle>Add New Item</DialogTitle>
                  <DialogDescription>Add a new item to your checklist.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Item Name
                    </label>
                    <Input id="title" placeholder="Enter item name" required />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description
                    </label>
                    <Textarea id="description" placeholder="Enter description" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="priority" className="text-sm font-medium">
                        Priority
                      </label>
                      <Select defaultValue="medium">
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="quantity" className="text-sm font-medium">
                        Quantity
                      </label>
                      <Input id="quantity" type="number" min="1" defaultValue="1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="category" className="text-sm font-medium">
                        Category
                      </label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                          <SelectItem value="new">+ Add New</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="assignee" className="text-sm font-medium">
                        Assignee
                      </label>
                      <Select>
                        <SelectTrigger id="assignee">
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent>
                          {assignees.map((assignee) => (
                            <SelectItem key={assignee} value={assignee}>
                              {assignee}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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
                  <Button type="submit">Add Item</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
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
            <SelectItem value="to-pack">To Pack</SelectItem>
            <SelectItem value="packed">Packed</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterAssignee} onValueChange={setFilterAssignee}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignees</SelectItem>
            {assignees.map((assignee) => (
              <SelectItem key={assignee} value={assignee}>
                {assignee}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <Reorder.Group values={filteredItems} onReorder={setItems} className="divide-y">
                {filteredItems.map((item) => {
                  const StatusIcon = getStatusIcon(item.status)

                  return (
                    <Reorder.Item
                      key={item.id}
                      value={item}
                      className="flex items-center p-4 gap-3 cursor-move"
                      whileDrag={{ scale: 1.02, backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                    >
                      <GripVertical className="h-5 w-5 text-muted-foreground flex-shrink-0" />

                      <Checkbox
                        id={`item-${item.id}`}
                        checked={item.status === "packed" || item.status === "delivered"}
                        onCheckedChange={(checked) => {
                          handleStatusChange(item.id, checked ? "packed" : "to-pack")
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <p className="font-medium truncate">{item.title}</p>
                            <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={getPriorityColor(item.priority)}>
                              {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                            </Badge>
                            <Badge variant="outline">{item.category}</Badge>
                            <Badge className={getStatusColor(item.status)}>
                              <StatusIcon className="mr-1 h-3 w-3" />
                              {item.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">Qty: {item.quantity}</div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={item.assignee.avatar || "/placeholder.svg"} alt={item.assignee.name} />
                          <AvatarFallback>{item.assignee.initials}</AvatarFallback>
                        </Avatar>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleStatusChange(item.id, "to-pack")}>
                              <Clock className="mr-2 h-4 w-4" />
                              Mark as To Pack
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(item.id, "packed")}>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Mark as Packed
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(item.id, "delivered")}>
                              <Package className="mr-2 h-4 w-4" />
                              Mark as Delivered
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit Item</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteItem(item.id)}>
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Item
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </Reorder.Item>
                  )
                })}
              </Reorder.Group>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="grid">
          <motion.div variants={container} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => {
              const StatusIcon = getStatusIcon(item.status)

              return (
                <motion.div key={item.id} variants={item}>
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>{item.description}</CardDescription>
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
                            <DropdownMenuItem onClick={() => handleStatusChange(item.id, "to-pack")}>
                              <Clock className="mr-2 h-4 w-4" />
                              Mark as To Pack
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(item.id, "packed")}>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Mark as Packed
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(item.id, "delivered")}>
                              <Package className="mr-2 h-4 w-4" />
                              Mark as Delivered
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit Item</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteItem(item.id)}>
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Item
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={item.assignee.avatar || "/placeholder.svg"} alt={item.assignee.name} />
                            <AvatarFallback>{item.assignee.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{item.assignee.name}</span>
                        </div>
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{item.category}</Badge>
                        <Badge variant="outline">Qty: {item.quantity}</Badge>
                        <Badge className={getStatusColor(item.status)}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {item.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      </div>

                      <div className="pt-2">
                        <Checkbox
                          id={`grid-item-${item.id}`}
                          checked={item.status === "packed" || item.status === "delivered"}
                          onCheckedChange={(checked) => {
                            handleStatusChange(item.id, checked ? "packed" : "to-pack")
                          }}
                          label={`Mark as ${item.status === "packed" || item.status === "delivered" ? "unpacked" : "packed"}`}
                        />
                        <label htmlFor={`grid-item-${item.id}`} className="ml-2 text-sm font-medium">
                          {item.status === "packed" || item.status === "delivered"
                            ? "Mark as unpacked"
                            : "Mark as packed"}
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
