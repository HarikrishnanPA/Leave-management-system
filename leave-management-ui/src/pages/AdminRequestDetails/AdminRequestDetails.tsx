import AdminLayout from "@/layouts/AdminLayout";
import EmployeeLeaveCalendar from "@/components/Calendar/EmployeeLeaveCalendar";
import EmployeeInfoCard from "@/components/Admin/EmployeeInfoCard";
import EmployeeRequestList from "@/components/Admin/EmployeeRequestList";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminRequestDetails() {
  const navigate = useNavigate();

  return (
    <AdminLayout>

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 mb-4 hover:text-blue-700"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Header */}
      <h1 className="text-4xl font-bold mb-4">Robert Philip</h1>

      {/* Layout: Calendar + Profile */}
      <div className="grid grid-cols-3 gap-8">
        {/* Calendar spans 2 columns */}
        <div className="col-span-2">
          <EmployeeLeaveCalendar
            approved={[8, 21]}
            applied={[25]}
            designated={[3, 4, 10, 11, 17, 18, 24, 25]}
          />
        </div>

        {/* Right Info Card */}
        <EmployeeInfoCard />
      </div>

      {/* List of all requests */}
      <EmployeeRequestList />

    </AdminLayout>
  );
}
