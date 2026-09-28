"use client";

import * as React from "react";
import Link from "next/link";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebarHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="lg"
          className="hover:bg-sidebar-accent  hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center"
        >
          <Link href="/">
            <div className="flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg">
              <img
                src="/logo.png"
                alt="Vangrex"
                className="size-full object-cover"
              />
            </div>

            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-semibold">Vangrex</span>
              <span className="truncate text-xs text-muted-foreground">
                AI Platform
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
