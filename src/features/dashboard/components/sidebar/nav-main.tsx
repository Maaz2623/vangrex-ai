"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
      </motion.div>

      <SidebarMenu>
        {items.map((item, index) => {
          const isActive =
            pathname === item.url ||
            (item.url !== "/" && pathname.startsWith(`${item.url}/`));

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}

                  <motion.span
                    initial={{
                      opacity: 0,
                      x: -4,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.18,
                      delay: index * 0.025,
                      ease: "easeOut",
                    }}
                    className="truncate"
                  >
                    {item.title}
                  </motion.span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
