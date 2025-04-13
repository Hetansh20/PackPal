"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Clock, Filter, MoreHorizontal, Plus } from "lucide-react"
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

export function ChecklistManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGroup, setFilterGroup] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Sample checklist data
  const checklists = [
    {
      id: 1,
      name: "Camping Essentials",
      group: "Camping Trip",
      items: 12,
      completed: 8,
      priority: "high",
      dueDate: "2023-08-15",
      assignee: { name: "Alex", avatar: "/placeholder-user.jpg", initials: "AJ" },
    },
    {
      id: 2,
      name: "Food & Drinks",
      group: "Camping Trip",
      items: 8,
      completed: 5,
      priority: "medium",
      dueDate: "2023-08-14",
      assignee: { name: "Jamie", avatar: "/placeholder-user.jpg", initials: "JT" },
    },
    {
      id: 3,
      name: "Office Supplies",
      group: "Office Party",
      items: 6,
      completed: 2,
      priority: "low",
      dueDate: "2023-09-01",
      assignee: { name: "Morgan", avatar: "/placeholder-user.jpg", initials: "MR" },
    },
    {
      id: 4,
      name: "Decorations",
      group: "Office Party",
      items: 10,
      completed: 3,
      priority: "medium",
      dueDate: "2023-08-25",
      assignee: { name: "Casey", avatar: "/placeholder-user.jpg", initials: "CK" },
    },
    {
      id: 5,
      name: "Beach Gear",
      group: "Family Vacation",
      items: 15,
      completed: 4,
      priority: "high",
      dueDate: "2023-07-30",
      assignee: { name: "Jordan", avatar: "/placeholder-user.jpg", initials: "JK" },
    },
    {
      id: 6,
      name: "Tech Equipment",
      group: "Conference Setup",
      items: 20,
      completed: 18,
      priority: "high",
      dueDate: "2023-08-05",
      assignee: { name: "Quinn", avatar: "/placeholder-user.jpg", initials: "QS" },
    },
  ]

  // Filter checklists based on search term and filters
  const filteredChecklists = checklists.filter((checklist) => {
    const matchesSearch =
      checklist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checklist.group.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGroup = filterGroup === "all" || checklist.group === filterGroup

    const progress = Math.round((checklist.completed / checklist.items) * 100)
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "completed" && progress === 100) ||
      (filterStatus === "in-progress" && progress > 0 && progress < 100) ||
      (filterStatus === "not-started" && progress === 0)

    return matchesSearch && matchesGroup && matchesStatus
  })

  // Get unique groups for filter dropdown
  const groups = [...new Set(checklists.map((checklist) => checklist.group))]

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

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Checklists</h2>
        <div className="flex w-full sm:w-auto gap-2">
          <Input
            placeholder="Search checklists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[300px]"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Checklist
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Checklist</DialogTitle>
                <DialogDescription>Add a new checklist to organize your items.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Checklist Name
                  </label>
                  <Input id="name" placeholder="Enter checklist name" />
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
                  <label htmlFor="priority" className="text-sm font-medium">
                    Priority
                  </label>
                  <Select>
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
                  <label htmlFor="dueDate" className="text-sm font-medium">
                    Due Date
                  </label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create Checklist</Button>
              </DialogFooter>
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
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="not-started">Not Started</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <motion.div variants={container} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredChecklists.map((checklist) => {
              const progress = Math.round((checklist.completed / checklist.items) * 100)

              return (
                <motion.div key={checklist.id} variants={item}>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{checklist.name}</CardTitle>
                          <CardDescription>{checklist.group}</CardDescription>
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
                            <DropdownMenuItem>Edit Checklist</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={checklist.assignee.avatar || "/placeholder.svg"}
                              alt={checklist.assignee.name}
                            />
                            <AvatarFallback>{checklist.assignee.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{checklist.assignee.name}</span>
                        </div>
                        <Badge className={`${getPriorityColor(checklist.priority)}`}>
                          {checklist.priority.charAt(0).toUpperCase() + checklist.priority.slice(1)}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {checklist.completed}/{checklist.items} items
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Due {new Date(checklist.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </TabsContent>
        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                  <div className="col-span-4">Name</div>
                  <div className="col-span-2">Group</div>
                  <div className="col-span-2">Progress</div>
                  <div className="col-span-2">Assignee</div>
                  <div className="col-span-1">Priority</div>
                  <div className="col-span-1"></div>
                </div>
                {filteredChecklists.map((checklist) => {
                  const progress = Math.round((checklist.completed / checklist.items) * 100)

                  return (
                    <div key={checklist.id} className="grid grid-cols-12 gap-2 p-4 items-center border-b last:border-0">
                      <div className="col-span-4 font-medium">{checklist.name}</div>
                      <div className="col-span-2 text-sm text-muted-foreground">{checklist.group}</div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Progress value={progress} className="h-2 w-full max-w-24" />
                          <span className="text-sm">{progress}%</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={checklist.assignee.avatar || "/placeholder.svg"}
                              alt={checklist.assignee.name}
                            />
                            <AvatarFallback>{checklist.assignee.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{checklist.assignee.name}</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Badge className={`${getPriorityColor(checklist.priority)}`}>
                          {checklist.priority.charAt(0).toUpperCase() + checklist.priority.slice(1)}
                        </Badge>
                      </div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
