"use client"

import { useState } from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Home,
  Package,
  Settings,
  Users,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardSidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function DashboardSidebar({ isOpen, setIsOpen }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/groups", label: "Groups", icon: Users },
    { path: "/checklists", label: "Checklists", icon: CheckSquare },
    { path: "/orders", label: "Orders & Deliveries", icon: Package },
    { path: "/logs", label: "Activity Logs", icon: ClipboardList },
    { path: "/settings", label: "Settings", icon: Settings },
  ]

  const sidebarVariants = {
    expanded: { width: "240px" },
    collapsed: { width: "72px" },
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg md:hidden"
          >
            <div className="flex h-14 items-center justify-between border-b px-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">PackPal</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-col gap-1 p-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} passHref>
                  <Button
                    variant={pathname === item.path ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3"
                    aria-current={pathname === item.path ? "page" : undefined}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
            <div className="mt-auto p-4 border-t">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>OP</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Owner</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar for desktop */}
      <motion.div
        variants={sidebarVariants}
        initial={false}
        animate={collapsed ? "collapsed" : "expanded"}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="hidden border-r bg-card md:block z-30"
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div
                key="logo-expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">PackPal</span>
              </motion.div>
            ) : (
              <motion.div
                key="logo-collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center w-full"
              >
                <BarChart3 className="h-6 w-6 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex flex-col gap-1 p-2">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} passHref>
              <Button
                variant={pathname === item.path ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed ? "px-0" : "px-3",
                  pathname === item.path && "relative overflow-hidden",
                )}
                aria-current={pathname === item.path ? "page" : undefined}
              >
                {pathname === item.path && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  />
                )}
                <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            </Link>
          ))}
        </div>
        <div className="mt-auto p-4 border-t">
          <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>OP</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Owner</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}
