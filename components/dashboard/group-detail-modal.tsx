"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Edit, MoreHorizontal, Plus, Trash, UserPlus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

interface GroupDetailModalProps {
  isOpen: boolean
  onClose: () => void
  group: any
}

export function GroupDetailModal({ isOpen, onClose, group }: GroupDetailModalProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("members")
  const [inviteEmail, setInviteEmail] = useState("")

  if (!group) return null

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (inviteEmail) {
      toast({
        title: "Invitation Sent",
        description: `An invitation has been sent to ${inviteEmail}`,
      })
      setInviteEmail("")
    }
  }

  const handleRemoveMember = (memberId: number) => {
    toast({
      title: "Member Removed",
      description: "The member has been removed from the group",
    })
  }

  const handleChangeRole = (memberId: number, role: string) => {
    toast({
      title: "Role Updated",
      description: `Member role has been updated to ${role}`,
    })
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            className="z-50 w-full max-w-3xl max-h-[90vh] overflow-auto rounded-lg border bg-background p-6 shadow-lg"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{group.name}</h2>
                <p className="text-muted-foreground">{group.description}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Tabs defaultValue="members" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="checklists">Checklists</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
              </TabsList>

              <TabsContent value="members" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Group Members</h3>
                  <form onSubmit={handleInviteMember} className="flex gap-2">
                    <Input
                      placeholder="Email address"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="w-[200px]"
                    />
                    <Button type="submit" size="sm">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite
                    </Button>
                  </form>
                </div>

                <div className="space-y-2">
                  {group.members.map((member: any) => (
                    <motion.div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-md border"
                      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.initials}</AvatarFallback>
                          </Avatar>
                          <span
                            className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background ${member.status === "online" ? "bg-green-500" : "bg-gray-300"}`}
                          ></span>
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.status === "online" ? "Online" : "Offline"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant={member.role === "admin" ? "default" : "outline"}>
                          {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleChangeRole(member.id, "admin")}>
                              Make Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleChangeRole(member.id, "member")}>
                              Make Member
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleRemoveMember(member.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="checklists" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Group Checklists</h3>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Checklist
                  </Button>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 1, name: "Camping Essentials", items: 12, completed: 8 },
                    { id: 2, name: "Food & Drinks", items: 8, completed: 5 },
                  ].map((checklist) => (
                    <motion.div
                      key={checklist.id}
                      className="flex items-center justify-between p-3 rounded-md border"
                      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{checklist.name}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span>
                              {checklist.completed}/{checklist.items} items completed
                            </span>
                            <Progress value={(checklist.completed / checklist.items) * 100} className="h-1 w-20" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Plus className="mr-2 h-4 w-4" />
                              Add Items
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="stats" className="space-y-4">
                <h3 className="text-lg font-medium">Group Statistics</h3>

                <div className="grid gap-4 grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Completion Rate</h4>
                    <div className="text-3xl font-bold mb-2">{group.progress}%</div>
                    <Progress value={group.progress} className="h-2" />
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Total Items</h4>
                    <div className="text-3xl font-bold">{group.items}</div>
                    <div className="text-sm text-muted-foreground">Across {group.checklists} checklists</div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Active Members</h4>
                    <div className="text-3xl font-bold">
                      {group.members.filter((m: any) => m.status === "online").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Out of {group.members.length} members</div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Last Activity</h4>
                    <div className="text-xl font-medium">2 hours ago</div>
                    <div className="text-sm text-muted-foreground">By {group.members[0].name}</div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-4">Member Contributions</h4>
                  <div className="space-y-3">
                    {group.members.map((member: any, index: number) => {
                      const contribution = Math.floor(Math.random() * 50) + 10
                      return (
                        <div key={member.id} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>{member.initials}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{member.name}</span>
                            </div>
                            <span className="text-sm font-medium">{contribution} items</span>
                          </div>
                          <Progress value={contribution * 2} className="h-1" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
