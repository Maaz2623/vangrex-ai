"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";

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
          className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center"
        >
          <Link href="/">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg"
            >
              <img
                src="/logo.png"
                alt="Vangrex"
                className="size-full object-cover"
              />
            </motion.div>

            {/* Brand */}
            <div className="grid flex-1 overflow-hidden text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.22,
                  delay: 0.04,
                  ease: "easeOut",
                }}
              >
                <span className="block truncate font-semibold">Vangrex</span>

                <span className="block truncate text-xs text-muted-foreground">
                  AI Platform
                </span>
              </motion.div>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
