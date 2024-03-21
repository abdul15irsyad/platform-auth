"use client";

import { GoogleAuthButton } from "@/components/auth-button.component";
import LoginLocal from "@/components/login-local.component";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("auth/login");
}
