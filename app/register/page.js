"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${process.env.API}/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          number,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        toast.error(data.error);
        setLoading(flase);
      } else {
        toast.success("Account Created Sucessfully");
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
      <div className="w-1/3  h-full flex justify-center items-center p-8 bg-gray-100 sm:w-full">
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
            <div className="flex justify-center items-center gap-1">
              <input
                type="text"
                className="border-b border-secondary py-2 px-4 focus:outline-none focus:border-primary w-full"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <input
              type="email"
              className="border-b border-secondary py-2 px-4 focus:outline-none focus:border-primary w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="border-b border-secondary py-2 px-4 focus:outline-none focus:border-primary w-full"
              placeholder="Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <input
              type="password"
              className="border-b border-secondary py-2 px-4 focus:outline-none focus:border-primary w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="border-b border-secondary py-2 px-4 focus:outline-none focus:border-primary w-full"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-secondary font-bold text-primary py-2 px-4 rounded-full hover:bg-secondaryLight focus:outline-none focus:shadow-outline-primary"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
          <p>or</p>
          <Link href="/login" className=" text-secondary">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
