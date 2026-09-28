import { requireAuth } from "@/lib/auth-utils";
import React from "react";

const WorkspaceIdPage = async () => {
  await requireAuth();

  return <div>Workspace Id</div>;
};

export default WorkspaceIdPage;
