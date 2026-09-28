"use client";

import * as React from "react";

import { motion } from "motion/react";
import { Bell, Command } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center border-b bg-background/80 px-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <motion.div
        initial={{
          opacity: 0,
          y: 4,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className="flex min-w-0 flex-1 items-center gap-2"
      >
        <SidebarTrigger className="-ml-1" />

        <Separator orientation="vertical" className="mx-1 h-4" />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden sm:block">
              <BreadcrumbLink href="/workspaces">Vangrex</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="hidden sm:block" />

            <BreadcrumbItem>
              <BreadcrumbPage>Workspaces</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          y: 4,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.2,
          delay: 0.06,
          ease: "easeOut",
        }}
        className="flex items-center gap-1"
      >
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground transition-colors hover:text-foreground"
        >
          <Command className="size-4" />
          <span className="sr-only">Command menu</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground transition-colors hover:text-foreground"
        >
          <Bell className="size-4" />
          <span className="sr-only">Notifications</span>
        </Button>
      </motion.div>
    </header>
  );
}
