import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

import {
  LayoutDashboard,
  Search,
  ListChecks,
  LogOut,
} from "lucide-react";

import logo from "@/assets/logo.svg";

export default function AdminSidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-64 min-h-screen bg-white border-r border-[#4DA3FF] relative">

      {/* LOGO */}
      <div className="px-4 py-4">
        <img src={logo} className="h-12" />
      </div>

      {/* Underline */}
      <div className="h-[1px] w-full bg-[#4DA3FF]"></div>

      {/* NAVIGATION */}
      <nav className="mt-2">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `
              flex items-center gap-3 px-6 py-3 
              text-[17px]
              ${isActive ? "bg-blue-500 text-white font-medium" : "text-gray-900 hover:bg-blue-100"}
            `
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/employees"
          className={({ isActive }) =>
            `
              flex items-center gap-3 px-6 py-3 
              text-[17px]
              ${isActive ? "bg-blue-500 text-white font-medium" : "text-gray-900 hover:bg-blue-100"}
            `
          }
        >
          <Search size={18} />
          View Employees
        </NavLink>

        <NavLink
          to="/admin/requests"
          className={({ isActive }) =>
            `
              flex items-center gap-3 px-6 py-3 
              text-[17px]
              ${isActive ? "bg-blue-500 text-white font-medium" : "text-gray-900 hover:bg-blue-100"}
            `
          }
        >
          <ListChecks size={18} />
          View Requests
        </NavLink>

      </nav>

      {/* LOGOUT BUTTON */}
      <div className="absolute bottom-0 w-full px-6 py-4 border-t border-[#4DA3FF] bg-white">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-800 hover:text-red-500 text-[15px]"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </div>
  );
}
