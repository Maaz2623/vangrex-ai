import { Workspaces } from "@/features/workspace/components/workspaces";
import { requireAuth } from "@/lib/auth-utils";
import React from "react";

const WorkspacesPage = async () => {
  await requireAuth();

  return <Workspaces />;
};

export default WorkspacesPage;
