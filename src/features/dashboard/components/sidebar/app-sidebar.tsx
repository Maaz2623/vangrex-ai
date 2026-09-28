"use client";

import * as React from "react";
import { Bot, Settings2, SlidersHorizontal, Workflow } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { AppSidebarHeader } from "./team-switcher";

const data = {
  navMain: [
    {
      title: "Workspaces",
      url: "/workspaces",
      icon: Workflow,
      isActive: true,
    },
    {
      title: "Agents",
      url: "/agents",
      icon: Bot,
    },
    {
      title: "Models",
      url: "/models",
      icon: SlidersHorizontal,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
};

const motionProps = {
  initial: {
    opacity: 0,
    x: -6,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -6,
  },
  transition: {
    duration: 0.18,
    ease: "easeOut" as const,
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key="sidebar-header"
            {...motionProps}
            className="overflow-hidden"
          >
            <AppSidebarHeader />
          </motion.div>
        </AnimatePresence>
      </SidebarHeader>

      <SidebarContent>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.045,
              },
            },
          }}
        >
          <NavMain items={data.navMain} />
        </motion.div>
      </SidebarContent>

      <SidebarFooter>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: 0.1,
            ease: "easeOut",
          }}
        >
          <NavUser />
        </motion.div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
