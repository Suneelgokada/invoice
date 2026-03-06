import React from "react";
import { Menu } from "lucide-react";

export default function Header({ setIsSidebarOpen }) {
  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between md:hidden">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="text-gray-700"
      >
        <Menu size={26} />
      </button>

      <h1 className="text-lg font-semibold text-gray-800">
        Admin Dashboard
      </h1>
    </header>
  );
}