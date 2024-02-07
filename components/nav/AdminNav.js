import React from "react";
import Link from "next/link";
import { MdDashboard, MdCategory } from "react-icons/md";

const AdminNav = () => {
  return (
    <nav>
      <aside
        id="default-sidebar"
        class="fixed top-16 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto  dark:bg-blueCustom">
          <ul class="space-y-2 font-medium flex flex-col gap-2">
            <li>
              <p class="admin-button">
                <MdDashboard className="text-2xl text-slate-50" />
                <span class="ms-3">Dashboard</span>
              </p>
            </li>

            <li>
              <p class="admin-button">
                <MdCategory className="text-2xl text-slate-50" />
                <span class="ms-3">Create Categories</span>
              </p>
            </li>
          </ul>
        </div>
      </aside>
    </nav>
  );
};

export default AdminNav;
