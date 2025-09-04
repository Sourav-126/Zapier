"use client";
import Link from "next/link";
import { Icons } from "../icons";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  return (
    <div className="flex justify-between items-center px-12 py-16 gap-12 ml-10">
      <div className="flex flex-col gap-6 max-w-xl">
        <h1 className="font-bold text-4xl leading-tight">
          Join millions worldwide who automate their work with Zapier
        </h1>
        <p className="text-lg font-light text-gray-600">
          Zapier Enterprise empowers everyone in your business to securely
          automate their work in minutes, not months—no coding required.
        </p>
      </div>

      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border flex flex-col gap-6 mt-12 mr-12 ">
        <span className="text-2xl font-bold text-center">
          Log in to your account
        </span>

        <button className="px-4 py-2 rounded-lg border flex items-center justify-center gap-2s text-white transition cursor-pointer bg-blue-500">
          <Icons.Google /> Continue With Google
        </button>

        <div className="flex items-center gap-2">
          <span className="h-px flex-1 bg-gray-300"></span>
          <span className="text-sm text-gray-500">or</span>
          <span className="h-px flex-1 bg-gray-300"></span>
        </div>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          type="text"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          type="password"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <button
          onClick={() => {
            axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
              name: name,
              email: email,
              password: password,
            });
            router.push("/signin");
          }}
          type="submit"
          className="w-full px-4 py-2 rounded-md bg-gray-300 text-white font-medium hover:bg-amber-800 transition cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
