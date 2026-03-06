import React from "react";

export default function SidebarItem({
  icon: Icon,
  label,
  tab,
  activeTab,
  setActiveTab,
  setIsSidebarOpen
}) {
  const handleClick = () => {
    setActiveTab(tab);

    // mobile lo sidebar close avvadaniki
    if (setIsSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition
        ${
          activeTab === tab
            ? "bg-indigo-700 text-white shadow"
            : "text-indigo-100 hover:bg-indigo-800"
        }
      `}
    >
      {Icon && <Icon size={18} className="mr-3" />}
      {label}
    </button>
  );
}