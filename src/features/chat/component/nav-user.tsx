"use client";

import * as React from "react";
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

import { authClient } from "@/lib/auth-client";

function getInitials(name?: string | null) {
  if (!name?.trim()) return "V";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function NavUser() {
  const session = authClient.useSession();
  const { isMobile } = useSidebar();

  /*
   * Loading state
   */
  if (session.isPending) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex h-12 items-center gap-3 rounded-xl px-2">
            <Skeleton className="size-8 shrink-0 rounded-lg" />

            <div className="grid flex-1 gap-1.5">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>

            <Skeleton className="size-4 rounded-md" />
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  /*
   * No authenticated user
   */
  if (!session.data?.user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="cursor-default opacity-70">
            <Avatar className="size-8 rounded-lg">
              <AvatarFallback className="rounded-lg bg-muted text-xs">
                V
              </AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Vangrex User</span>

              <span className="truncate text-xs text-muted-foreground">
                Not signed in
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const user = session.data.user;

  const name = user.name?.trim() || "Vangrex User";
  const email = user.email?.trim() || "No email available";
  const initials = getInitials(user.name);

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="
                rounded-xl
                transition-colors
                data-[state=open]:bg-sidebar-accent
                data-[state=open]:text-sidebar-accent-foreground
              "
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={user.image ?? undefined} alt={name} />

                <AvatarFallback className="rounded-lg bg-muted text-xs font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>

                <span className="truncate text-xs text-muted-foreground">
                  {email}
                </span>
              </div>

              <IconDotsVertical className="ml-auto size-4 shrink-0 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={6}
          >
            {/* User header */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-2 py-2.5">
                <Avatar className="size-9 rounded-lg">
                  <AvatarImage src={user.image ?? undefined} alt={name} />

                  <AvatarFallback className="rounded-lg bg-muted text-xs font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="grid min-w-0 flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-medium">{name}</span>

                  <span className="truncate text-xs text-muted-foreground">
                    {email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Account */}
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer rounded-lg">
                <IconUserCircle />
                <span>Account</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer rounded-lg">
                <IconCreditCard />
                <span>Billing</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer rounded-lg">
                <IconNotification />
                <span>Notifications</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Logout */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="
                cursor-pointer
                rounded-lg
                text-destructive
                focus:text-destructive
              "
            >
              <IconLogout />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
