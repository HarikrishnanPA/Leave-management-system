import { NavLink } from "react-router-dom";
import { LayoutDashboard, ListChecks, LogOut, User } from "lucide-react";
import logo from "@/assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Search } from 'lucide-react';

export default function AdminSidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between">

      {/* Logo */}
      <div>
        <div className="flex items-center gap-3 px-6 py-6 border-b">
          <img src={logo} className="h-12" />
        </div>

        {/* Menu */}
        <nav className="mt-4">
          <NavLink
            to="/admin/dashboard"
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
            to="/admin/employees"
            className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 text-sm font-medium ${
                isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-blue-50"
                }`
            }
          >
            <Search size={18} />
            View Employees
          </NavLink>

          <NavLink
            to="/admin/requests"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium ${
                isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <ListChecks size={18} />
            View Requests
          </NavLink>
        </nav>
      </div>

      {/* Logout + admin info */}
      <div className="px-6 py-4 border-t flex flex-col gap-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-700 hover:text-red-500"
        >
          <LogOut size={18} />
          Logout
        </button>

        <div className="flex items-center gap-3">
          <div className="rounded-full border p-2">
            <User size={20} />
          </div>
          <div className="text-sm">
            <p className="font-semibold">Admin</p>
            <p className="text-gray-500 text-xs">admin@noemail.com</p>
          </div>
        </div>
      </div>

    </div>
  );
}
