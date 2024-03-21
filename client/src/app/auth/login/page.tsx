"use client";

import { GoogleAuthButton } from "@/components/auth-button.component";
import AuthContainer from "@/components/auth-container.component";
import LoginLocal from "@/components/login-local.component";

export default function Login() {
  return (
    <AuthContainer>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center mb-6">
        Platform Auth Login
      </h1>
      <LoginLocal />
      <div className="flex justify-center">
        <h5 className="dark:text-white font-bold text-sm">OR</h5>
      </div>
      <GoogleAuthButton />
    </AuthContainer>
  );
}
