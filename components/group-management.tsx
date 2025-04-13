"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, MoreHorizontal, Plus, Trash, UserPlus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function GroupManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  // Sample group data
  const groups = [
    {
      id: 1,
      name: "Camping Trip",
      description: "Annual camping trip to Yosemite",
      members: [
        { id: 1, name: "Alex", avatar: "/placeholder-user.jpg", initials: "AJ", status: "online", role: "admin" },
        { id: 2, name: "Jamie", avatar: "/placeholder-user.jpg", initials: "JT", status: "offline", role: "member" },
        { id: 3, name: "Taylor", avatar: "/placeholder-user.jpg", initials: "TS", status: "online", role: "member" },
      ],
      checklists: 3,
      items: 24,
      progress: 65,
    },
    {
      id: 2,
      name: "Office Party",
      description: "End of year celebration",
      members: [
        { id: 1, name: "Morgan", avatar: "/placeholder-user.jpg", initials: "MR", status: "online", role: "admin" },
        { id: 4, name: "Casey", avatar: "/placeholder-user.jpg", initials: "CK", status: "online", role: "member" },
        { id: 5, name: "Riley", avatar: "/placeholder-user.jpg", initials: "RB", status: "offline", role: "member" },
      ],
      checklists: 2,
      items: 18,
      progress: 40,
    },
    {
      id: 3,
      name: "Family Vacation",
      description: "Summer trip to Hawaii",
      members: [
        { id: 6, name: "Jordan", avatar: "/placeholder-user.jpg", initials: "JK", status: "online", role: "admin" },
        { id: 7, name: "Avery", avatar: "/placeholder-user.jpg", initials: "AW", status: "offline", role: "member" },
      ],
      checklists: 4,
      items: 32,
      progress: 25,
    },
    {
      id: 4,
      name: "Conference Setup",
      description: "Annual tech conference",
      members: [
        { id: 8, name: "Quinn", avatar: "/placeholder-user.jpg", initials: "QS", status: "online", role: "admin" },
        { id: 9, name: "Parker", avatar: "/placeholder-user.jpg", initials: "PL", status: "online", role: "member" },
      ],
      checklists: 5,
      items: 45,
      progress: 80,
    },
  ]

  // Filter groups based on search term
  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
        <h2 className="text-3xl font-bold tracking-tight">Groups</h2>
        <div className="flex w-full sm:w-auto gap-2">
          <Input
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[300px]"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Group</DialogTitle>
                <DialogDescription>Add a new group to organize your checklists and team members.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Group Name
                  </label>
                  <Input id="name" placeholder="Enter group name" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Input id="description" placeholder="Enter description" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create Group</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <motion.div variants={container} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((group) => (
          <motion.div key={group.id} variants={item}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{group.name}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
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
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Group
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Invite Members
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Group
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Members</h4>
                    <div className="flex -space-x-2">
                      {group.members.map((member) => (
                        <div key={member.id} className="relative">
                          <Avatar className="border-2 border-background h-8 w-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.initials}</AvatarFallback>
                          </Avatar>
                          <span
                            className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ${member.status === "online" ? "bg-green-500" : "bg-gray-300"}`}
                          ></span>
                        </div>
                      ))}
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{group.checklists}</p>
                      <p className="text-muted-foreground">Checklists</p>
                    </div>
                    <div>
                      <p className="font-medium">{group.items}</p>
                      <p className="text-muted-foreground">Items</p>
                    </div>
                    <div>
                      <p className="font-medium">{group.progress}%</p>
                      <p className="text-muted-foreground">Progress</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Manage
                </Button>
                <Badge variant="outline">{group.members.length} members</Badge>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
