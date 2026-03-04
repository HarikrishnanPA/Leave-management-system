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
  const {logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
  <div className="w-64 min-h-screen bg-white border-r border-[#4DA3FF] relative">
      {/* BLUE LEFT BORDER */}
      {/* <div className="absolute left-0 top-0 h-full w-[3px] bg-blue-500"></div> */}

      {/* LOGO SECTION */}
      <div className="px-4 py-4">
        <img src={logo} className="h-12" />
      </div>
      <div className="h-[1px] w-full bg-[#4DA3FF] mt-3"></div>

      {/* NAVIGATION */}
      <nav className="mt-2">
        <NavLink
          to="/employee/dashboard"
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
          to="/employee/apply"
          className={({ isActive }) =>
            `
              flex items-center gap-3 px-6 py-3 
              text-[17px]
              ${isActive ? "bg-blue-500 text-white font-medium" : "text-gray-900 hover:bg-blue-100"}
            `
          }
        >
          <CalendarPlus size={18} />
          Apply leave
        </NavLink>

        <NavLink
          to="/employee/status"
          className={({ isActive }) =>
            `
              flex items-center gap-3 px-6 py-3 
              text-[17px]
              ${isActive ? "bg-blue-500 text-white font-medium" : "text-gray-900 hover:bg-blue-100"}
            `
          }
        >
          <FileChartColumnIncreasing size={18} />
          Request status
        </NavLink>
      </nav>

      {/* BOTTOM USER SECTION */}
      <div className="absolute bottom-0 w-full px-6 py-4 border-t bg-white text-[#4DA3FF]">
        
        {/* Logout */}
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
