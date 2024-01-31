import React from "react";
import Link from "next/link";

const TopNav = () => {
  return (
    <nav className="bg-primary h-16 w-screen flex items-center justify-between px-10 shadow-sm">
      <Link href="/">
        <p className="text-secondary font-extrabold text-2xl">Digicommerce</p>
      </Link>

      <div className="flex gap-4">
        <Link href="/login" className="text-secondary font-bold">
          <p className="px-4 py-2 transition-all hover:bg-dark hover:text-white rounded text-center cursor-pointer">
            Login
          </p>
        </Link>
        <Link href="/register" className="text-secondary font-bold">
          <p className="px-4 py-2 transition-all hover:bg-dark hover:text-white rounded text-center cursor-pointer">
            Register
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default TopNav;
