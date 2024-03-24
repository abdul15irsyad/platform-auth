"use client";

import { API_URL } from "@/app.config";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpLocal = () => {
  const [form, setForm] = useState<SignUpDto>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  interface SignUpDto {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const mutation = useMutation<
    { id: string; name: string; email: string; emailVerifiedAt?: string },
    {
      status: number;
      message: string;
    },
    SignUpDto
  >({
    mutationKey: ["sign-up"],
    mutationFn: async (signUpDto) => {
      const response = await fetch(`${API_URL}/v1/auth/register`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpDto),
      });
      const data = await response.json();
      if (response.status !== 201) {
        throw data;
      }
      return data;
    },
    onSuccess: () => {
      router.push("/auth/login");
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    try {
      e.preventDefault();
      mutation.mutate(form);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
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
      <div>
        <label
          htmlFor="confirm-password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />
      </div>
      <button
        type="submit"
        className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-8"
      >
        Sign Up
      </button>
      <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-green-600 hover:underline dark:text-green-500"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignUpLocal;
