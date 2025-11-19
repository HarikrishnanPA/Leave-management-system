import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { LogOut, User } from "lucide-react";
import logo from "@/assets/logo.svg";
import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { CalendarPlus } from 'lucide-react';
import { FileChartColumnIncreasing } from 'lucide-react';

export default function EmployeeSidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();                 // clear context
    localStorage.clear();     // clear stored tokens
    navigate("/login");       // redirect to login
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between">

      {/* TOP PART */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 py-3 border-b">
          <img src={logo} className="h-12" />
        </div>

        {/* Menu */}
        <nav className="mt-4">
          <NavLink
            to="/employee/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium ${
                isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/employee/apply"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium ${
                isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <CalendarPlus size={18} />
            Apply leave
          </NavLink>

          <NavLink
            to="/employee/status"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium ${
                isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <FileChartColumnIncreasing size={18} />
            Request status
          </NavLink>
        </nav>
      </div>

      {/* LOGOUT + USER INFO */}
      <div className="px-6 py-4 border-t flex flex-col gap-4">

        {/* LOGOUT BUTTON (FUNCTIONAL) */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

        {/* USER INFO */}
        <div className="flex items-center gap-3">
          <div className="rounded-full border p-2">
            <User size={20} />
          </div>
          <div className="text-sm">
            <p className="font-semibold">Robert</p>
            <p className="text-gray-500 text-xs">robert@noemail.com</p>
          </div>
        </div>
      </div>

    </div>
  );
}
