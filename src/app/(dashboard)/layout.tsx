import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
