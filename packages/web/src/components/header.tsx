"use client"

import { Bell, Search, User, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"

interface HeaderProps {
  onMenuClick?: () => void
}

/**
 * 头部组件
 * @param onMenuClick - 菜单点击回调函数
 */
export function Header ({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white border-b-8 border-black shadow-[0_8px_0px_0px_#000] sticky top-0 z-40">
      <div className="flex items-center justify-between p-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={onMenuClick}
            variant="ghost"
            size="icon"
            className="lg:hidden border-4 border-black hover:bg-yellow-400"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="bg-red-500 text-white px-4 py-2 transform rotate-1 border-4 border-black">
            <h1 className="font-black text-xl uppercase">DASHBOARD</h1>
          </div>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              placeholder="Search anything..."
              className="pl-10 h-12 border-4 border-black focus:border-blue-500 focus:ring-0 bg-blue-100 font-bold"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative border-4 border-black bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-black">
              3
            </span>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-12 w-12 border-4 border-black bg-green-400 hover:bg-green-500 p-0"
              >
                <Avatar className="h-8 w-8 border-2 border-black">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback className="bg-purple-400 text-black font-black">AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 border-4 border-black shadow-[8px_8px_0px_0px_#000] bg-white"
              align="end"
            >
              <div className="p-2 bg-pink-400 border-b-4 border-black">
                <p className="font-black uppercase text-sm">Admin User</p>
                <p className="text-xs font-bold text-gray-700">admin@example.com</p>
              </div>
              <DropdownMenuItem className="font-bold hover:bg-yellow-400 cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="font-bold hover:bg-yellow-400 cursor-pointer">Settings</DropdownMenuItem>
              <DropdownMenuSeparator className="border-2 border-black" />
              <DropdownMenuItem className="font-bold hover:bg-red-400 cursor-pointer">
                <Link to="/login" className="flex items-center w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
