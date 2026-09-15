import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/features/chat/component/app-sidebar";
import React from "react";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <TooltipProvider>
          <AppSidebar />
          <SidebarInset>
            <main className="w-full ">{children}</main>
          </SidebarInset>
        </TooltipProvider>
      </SidebarProvider>
    </div>
  );
}
