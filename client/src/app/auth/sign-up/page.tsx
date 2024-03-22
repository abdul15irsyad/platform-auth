"use client";

import AuthContainer from "@/components/auth-container.component";
import SignUpLocal from "@/components/sign-up-local.component";

export default function SignUp() {
  return (
    <AuthContainer>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center mb-6">
        Platform Auth Sign Up
      </h1>
      <SignUpLocal />
    </AuthContainer>
  );
}
