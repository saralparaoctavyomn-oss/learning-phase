"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  PanelLeftClose,
  BookCopy,
  PiggyBank,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const navigation = [
  {
    title: "Overview",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Academic",
    url: "/admin/academic",
    icon: PiggyBank
  }, {
    title: "Class",
    url: "/admin/class",
    icon: BookCopy
  },
  {
    title: "Student",
    url: "/admin/students",
    icon: Users,
  },
  {
    title: "Techers",
    url: "/admin/techer",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const handelLogout = async () => {
    const current = new URLSearchParams(searchParams.toString());
    const res = await fetch('/api/auth/logout', { method: "POST" })
    // console.log(res)
    if (res.status === 200) {
      current.delete('srcId');
      router.push("/auth/admin")
      return router.refresh(); // Refreshes server data and UI state
    } else {
      return alert("Logout unsuccesfull")
    }
    return
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-border/70  font-medium">
      {/* Responsive sidebar header */}
      <SidebarHeader className="p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 group-data-[collapsible=icon]:hidden">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <LayoutDashboard className="size-5" />
            </div>
            <span className="truncate text-sm font-bold">
              Admin Panel
            </span>
          </div>

          <SidebarTrigger
            className="size-9 shrink-0 rounded-xl border border-border/70 transition-all hover:bg-accent hover:text-primary"
            aria-label="Toggle sidebar"
          >
            <Menu className="size-5" />
          </SidebarTrigger>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground group-data-[collapsible=icon]:hidden">
            Workspace
          </SidebarGroupLabel>

          <SidebarMenu className="gap-1">
            {navigation.map((item) => {
              const isActive =
                item.url === "/admin"
                  ? pathname === "/admin"
                  : pathname === item.url ||
                  pathname.startsWith(`${item.url}/`)

              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.title}
                    className="relative h-11 rounded-xl px-3 transition-all duration-200 hover:bg-accent data-[active=true]:bg-primary/10 data-[active=true]:font-semibold data-[active=true]:text-primary"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      {isActive && (
                        <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-primary" />
                      )}

                      <item.icon className="size-[18px] shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className={"bg-red-500 hover:bg-red-400 cursor-pointer"} onClick={() => handelLogout()}>
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  )
}
