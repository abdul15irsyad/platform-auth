"use client";

import { API_URL } from "@/app.config";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const LoginLocal = () => {
  const [form, setForm] = useState<LoginDto>({
    email: "",
    password: "",
  });

  interface LoginDto {
    email: string;
    password: string;
  }

  const mutation = useMutation<
    {
      accessToken: { token: string; grantType: string };
      refreshToken: { token: string };
    },
    {},
    LoginDto
  >({
    mutationKey: ["login"],
    mutationFn: async (loginDto) => {
      return (
        await fetch(`${API_URL}/v1/auth/login`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginDto),
        })
      ).json();
    },
    onSuccess: (response) => {
      if (response.accessToken) setForm({ email: "", password: "" });
      // TODO: redirect to protected route
    },
  });
  return (
    <form
      className="space-y-3 md:space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(form);
      }}
    >
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          placeholder="example@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      <div className="flex items-center justify-end">
        <Link
          href="/auth/forgot-password"
          className="text-sm font-medium text-green-600 hover:underline dark:text-green-500"
        >
          Forgot password?
        </Link>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Login
      </button>
      <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
        Don{"'"}t have an account yet?{" "}
        <Link
          href="/auth/sign-up"
          className="font-medium text-green-600 hover:underline dark:text-green-500"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginLocal;
