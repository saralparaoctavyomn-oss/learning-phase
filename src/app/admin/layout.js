
import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"
import "../globals.css"


export default function Layout({ children }) {
  return (
    <SidebarProvider>
      
      <AppSidebar />

      <SidebarInset className="min-w-0 flex-1">
        <main className="min-h-screen w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
