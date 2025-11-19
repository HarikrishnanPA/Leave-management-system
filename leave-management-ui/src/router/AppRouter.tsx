import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/login";
import EmployeeDashboard from "../pages/EmployeeDashboard/EmployeeDashboard";
import ApplyLeave from "../pages/ApplyLeave/ApplyLeave";
import ViewLeaveStatus from "../pages/RequestStatus/RequestStatus";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ViewEmployees from "../pages/ViewEmployees/ViewEmployees";
import ViewRequests from "../pages/ViewRequests/ViewRequests";
import AdminRequestDetails from "@/pages/AdminRequestDetails/AdminRequestDetails";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Employee */}
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/apply" element={<ApplyLeave />} />
        <Route path="/employee/status" element={<ViewLeaveStatus />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/employees" element={<ViewEmployees />} />
        <Route path="/admin/requests" element={<ViewRequests />} />
        <Route path="/admin/requests/:id" element={<AdminRequestDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
