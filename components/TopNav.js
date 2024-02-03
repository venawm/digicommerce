"use client";
// Import missing dependencies
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { BsSearch } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";

const TopNav = () => {
  const { data, status } = useSession();
  console.log(data);

  return (
    // <nav className="bg-primary h-16 w-screen flex items-center justify-between px-10 shadow-sm">
    //   <Link href="/">
    //     <p className="text-secondary font-extrabold text-2xl">Digicommerce</p>
    //   </Link>
    //   {status === "authenticated" ? (
    //     <>
    //       <p className="text-secondary font-bold px-4 py-2 transition-all hover:bg-dark hover:text-white rounded text-center cursor-pointer">
    //         {data.user.name}
    //       </p>
    //       <p
    //         className="text-secondary font-bold px-4 py-2 transition-all hover:bg-dark hover:text-white rounded text-center cursor-pointer"
    //         onClick={() => signOut({ callbackUrl: "/login" })}
    //       >
    //         Logout
    //       </p>
    //     </>
    //   ) : status === "loading" ? (
    //     <>
    //       <p className="text-secondary font-bold px-4 py-2 rounded text-center cursor-not-allowed">
    //         Loading...
    //       </p>
    //     </>
    //   ) : (
    //     <div className="flex gap-4">
    //       <Link href="/login" className="text-secondary font-bold">
    //         <p className="px-4 py-2 transition-all hover:bg-dark hover:text-white rounded text-center cursor-pointer">
    //           Login
    //         </p>
    //       </Link>
    //       <Link href="/register" className="text-secondary font-bold">
    //         <p className="px-4 py-2 transition-all hover:bg-dark hover:text-white rounded text-center cursor-pointer">
    //           Register
    //         </p>
    //       </Link>
    //     </div>
    //   )}
    // </nav>

    <nav className="w-full h-16 bg-secondary px-24 ">
      <div className=" max-w-screen-2xl mx-auto px-4 flex items-center h-full justify-between">
        <h1 className="text-3xl font-bold text-primary">Digicommerce</h1>
        <form className="hidden lg:inline-flex w-1/2  ">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
            <input
              type="search"
              id="default-search"
              class="block w-full h-10 p-4 ps-10 text-sm text-gray-900 border border-secondary rounded-xl bg-gray-50 outline-none"
              placeholder="Search"
              required
            ></input>
            <button
              type="submit"
              class="text-primary w-12 h-8 absolute end-2 bottom-[0.25rem] bg-[#FFE1D2] hover:bg-secondaryLight focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4 text-gray-500 dark:text-secondary hover:text-primary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </form>
        <ul className="hidden lg:inline-flex gap-4 items-center text-primary">
          <div>
            <CiShoppingCart className="text-3xl hover:cursor-pointer" />
          </div>

          <Link href="/login" className="text-primary font-bold">
            <p className="px-4 py-2 transition-all hover:bg-secondaryDark hover:text-primary rounded text-center cursor-pointer">
              Login
            </p>
          </Link>
          <Link href="/register" className="text-primary font-bold">
            <p className="px-4 py-2 transition-all hover:bg-secondaryDark hover:text-primary rounded text-center cursor-pointer">
              Register
            </p>
          </Link>
        </ul>
        <div className="inline-flex lg:hidden text-primary" onClick={() => {}}>
          <FiMenu className="text-3xl" />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
