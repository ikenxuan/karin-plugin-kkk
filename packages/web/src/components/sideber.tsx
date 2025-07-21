"use client"
import { BarChart3, Calendar, ChevronLeft, ChevronRight,FileText, Home, Mail, Settings, Users } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: Mail, label: "Messages", href: "/messages" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <div
      className={cn(
        "bg-black text-white border-r-8 border-yellow-400 transition-all duration-300 relative",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b-4 border-yellow-400">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="bg-yellow-400 text-black px-3 py-2 transform rotate-1">
              <h2 className="font-black text-lg uppercase">ADMIN</h2>
            </div>
          )}
          <Button
            onClick={onToggle}
            variant="ghost"
            size="icon"
            className="text-yellow-400 hover:bg-yellow-400 hover:text-black border-2 border-yellow-400"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} to={item.href}>
              <div
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-none border-4 font-bold uppercase tracking-wide transition-all hover:translate-x-1 hover:translate-y-1",
                  isActive
                    ? "bg-pink-500 border-pink-300 text-white shadow-[4px_4px_0px_0px_#ec4899]"
                    : "bg-white text-black border-gray-300 hover:bg-yellow-400 hover:border-yellow-300 shadow-[4px_4px_0px_0px_#6b7280]",
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom decoration */}
      <div className="absolute bottom-4 left-4 right-4">
        {!collapsed && (
          <div className="bg-green-400 text-black p-3 border-4 border-green-300 transform -rotate-1">
            <p className="text-xs font-black uppercase text-center">Neo Brutal UI</p>
          </div>
        )}
      </div>
    </div>
  )
}
