// src/components/EmployeeSidebar.tsx

import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  LogOut,
  LayoutDashboard,
  CalendarPlus,
  FileChartColumnIncreasing,
} from "lucide-react";
import logo from "@/assets/logo.svg";

export default function EmployeeSidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between min-h-screen">

      {/* TOP */}
      <div>
        <div className="flex items-center gap-3 px-3 py-3 border-b">
          <img src={logo} className="h-12" />
        </div>

        <nav className="mt-4">
          <NavLink
            to="/employee/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 ${
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
              `flex items-center gap-3 px-6 py-3 ${
                isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <CalendarPlus size={18} />
            Apply Leave
          </NavLink>

          <NavLink
            to="/employee/status"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 ${
                isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <FileChartColumnIncreasing size={18} />
            Request Status
          </NavLink>
        </nav>
      </div>

      {/* USER INFO */}
      <div className="px-6 py-4 border-t flex flex-col gap-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-700 hover:text-red-500"
        >
          <LogOut size={18} />
          Logout
        </button>

        <div>
          <p className="text-lg font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

    </div>
  );
}
