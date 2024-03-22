import { authConfig } from "@/configs/auth.config";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export const authMiddleware = async (type: "server" | "client") => {
  if (type === "server") {
    const session = await getServerSession(authConfig);
    if (!session) return redirect("/");
  } else if (type === "client") {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const session = useSession();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      if (!session) router.push("/");
    }
  }
};
