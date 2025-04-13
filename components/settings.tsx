"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Moon, Save, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Settings() {
  const { theme, setTheme } = useTheme()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)

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
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <motion.div variants={container} className="space-y-6">
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account profile information and settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                        <AvatarFallback>OP</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>
                    <div className="space-y-4 flex-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" defaultValue="Owner" />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Write a short bio about yourself"
                      className="min-h-[100px]"
                      defaultValue="Experienced logistics manager with a passion for organization and efficiency."
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Update your account settings and password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div variants={container} className="space-y-6">
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Configure how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-updates">Group Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about group changes and updates.
                          </p>
                        </div>
                        <Switch
                          id="email-updates"
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-checklist">Checklist Completions</Label>
                          <p className="text-sm text-muted-foreground">Receive emails when checklists are completed.</p>
                        </div>
                        <Switch id="email-checklist" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-delivery">Delivery Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about order and delivery status changes.
                          </p>
                        </div>
                        <Switch id="email-delivery" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-all">All Notifications</Label>
                          <p className="text-sm text-muted-foreground">Enable or disable all push notifications.</p>
                        </div>
                        <Switch id="push-all" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-mentions">Mentions</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications when you are mentioned.</p>
                        </div>
                        <Switch id="push-mentions" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-assignments">Assignments</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when items are assigned to you.
                          </p>
                        </div>
                        <Switch id="push-assignments" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="appearance">
          <motion.div variants={container} className="space-y-6">
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize the appearance of your dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div
                        className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer ${theme === "light" ? "border-primary bg-primary/10" : "border-border"}`}
                        onClick={() => setTheme("light")}
                      >
                        <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                          <Sun className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium">Light</span>
                      </div>
                      <div
                        className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer ${theme === "dark" ? "border-primary bg-primary/10" : "border-border"}`}
                        onClick={() => setTheme("dark")}
                      >
                        <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                          <Moon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium">Dark</span>
                      </div>
                      <div
                        className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer ${theme === "system" ? "border-primary bg-primary/10" : "border-border"}`}
                        onClick={() => setTheme("system")}
                      >
                        <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                          <div className="relative">
                            <Sun className="h-5 w-5 dark:opacity-0" />
                            <Moon className="h-5 w-5 absolute inset-0 opacity-0 dark:opacity-100" />
                          </div>
                        </div>
                        <span className="text-sm font-medium">System</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Dashboard Layout</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="compact-view">Compact View</Label>
                          <p className="text-sm text-muted-foreground">
                            Use a more compact layout for dashboard elements.
                          </p>
                        </div>
                        <Switch id="compact-view" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="show-avatars">Show Avatars</Label>
                          <p className="text-sm text-muted-foreground">Show user avatars in lists and activity logs.</p>
                        </div>
                        <Switch id="show-avatars" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Appearance
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
