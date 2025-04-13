"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckSquare, ChevronLeft, ChevronRight, ClipboardList, Home, Package, SettingsIcon, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DashboardSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function DashboardSidebar({ activeView, setActiveView }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "groups", label: "Groups", icon: Users },
    { id: "checklists", label: "Checklists", icon: CheckSquare },
    { id: "orders", label: "Orders & Deliveries", icon: Package },
    { id: "logs", label: "Activity Logs", icon: ClipboardList },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ]

  return (
    <motion.div
      className={cn("bg-card border-r border-border flex flex-col z-30", collapsed ? "w-16" : "w-64")}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center h-14 px-4 border-b border-border">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-bold text-xl"
          >
            PackPal
          </motion.div>
        )}
        {collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-bold text-xl mx-auto"
          >
            PP
          </motion.div>
        )}
        <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <Button
                variant={activeView === item.id ? "secondary" : "ghost"}
                className={cn("w-full justify-start", collapsed ? "px-2" : "px-3")}
                onClick={() => setActiveView(item.id)}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-2")} />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            O
          </div>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-3">
              <div className="font-medium">Owner</div>
              <div className="text-xs text-muted-foreground">Admin Access</div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
