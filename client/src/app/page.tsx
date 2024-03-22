"use server";

import LogoutButton from "@/components/logout-button.component";
import { authConfig } from "@/configs/auth.config";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Root = async () => {
  const session = await getServerSession(authConfig);
  if (!session) redirect("auth/login");

  return (
    <div>
      <h1>Home</h1>
      <LogoutButton />
    </div>
  );
};

export default Root;
