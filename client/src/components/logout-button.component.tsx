"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      type="button"
      className="rounded px-5 py-1.5 bg-red-400 text-white hover:bg-red-600"
      onClick={() => signOut({ callbackUrl: "/auth/login" })}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
