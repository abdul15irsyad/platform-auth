import { authConfig } from "@/configs/auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession(authConfig);
  if (session) redirect("/");
  return children;
};

export default AuthLayout;
