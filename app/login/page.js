"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast.error(result?.error);
      setLoading(false);
    } else {
      toast.success("Logged in sucessfully");
      router.push(callbackUrl);
    }

    try {
      setLoading(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <main className="flex h-screen">
      <div className="hidden md:block lg:w-full h-full">
        <Image
          src="/login.jpg"
          width={950}
          height={50}
          className="object-cover h-full"
          alt="Ecommerce Image"
        />
      </div>
      <div className="w-1/3  h-full flex justify-center items-center p-8 sm:w-full">
        <div className=" flex flex-col justify-center items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Welcome to <span className="text-secondary">Digicommerce</span>
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-4 w-4/5"
          >
            <input
              type="email"
              className="border-b border-secondary py-2 px-4 focus:outline-none focus:border-primary w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="border-b border-secondary py-2 px-4 focus:outline-none focus:border-primary w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-secondary font-bold text-primary py-2 px-4 rounded-full hover:bg-secondaryLight focus:outline-none focus:shadow-outline-primary"
              disabled={loading}
            >
              {loading ? "Loggin In..." : "Login"}
            </button>
          </form>
          <div className="flex flex-col gap-2 mt-4 justify-center items-center">
            <p>or</p>

            <button
              className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-secondary rounded-lg text-slate-900  hover:shadow transition duration-150"
              onClick={() => {
                signIn("google", { callbackUrl });
              }}
            >
              <Image
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                width={10}
                height={10}
                loading="lazy"
                alt="google logo"
              ></Image>
              <span>Login with Google</span>
            </button>
            <p>or</p>

            <Link href="/register" className=" text-secondary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
