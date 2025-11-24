import AdminLayout from "@/layouts/AdminLayout";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAllLeaveRequests } from "@/api/adminLeaveApi";
import { useNavigate } from "react-router-dom";

interface LeaveRequest {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  employee: {
    id: number;
    name: string;
    role: string;
    designation: string;
    department: string;
  };
  leaveType: {
    id: number;
    typeName: string;
  };
  datesBetween: string[];
}

export default function ViewRequests() {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const allRequests: LeaveRequest[] = await fetchAllLeaveRequests();

        // Filter only pending requests
        const pending = allRequests.filter(req => req.status === "PENDING");

        setRequests(pending);
      } catch (err) {
        console.error("❌ Failed to load leave requests", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <AdminLayout>
      {/* Title */}
      <h1 className="text-4xl font-bold">View Requests</h1>
      <p className="text-gray-500 mb-8">approve or reject leave requests</p>

      {/* Section Header */}
      <div className="bg-blue-500 text-white px-4 py-2 rounded-t-md font-semibold max-w-4xl">
        Leave requests
      </div>

      {/* Rows */}
      <div className="border border-gray-200 rounded-b-md max-w-4xl">
        {loading ? (
          <p className="p-4 text-gray-500">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="p-4 text-gray-500">No pending requests.</p>
        ) : (
          requests.map((req) => (
            <div
              key={req.id}
              className="grid grid-cols-5 px-4 py-4 text-sm border-b last:border-b-0 items-center hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/admin/employee/${req.employee.id}`)}
            >
              {/* Employee info */}
              <div className="col-span-2">
                <p className="font-medium">{req.employee.name}</p>
                <p className="text-gray-500">{req.employee.designation}</p>
                <p className="text-gray-500">{req.employee.department}</p>
              </div>

              {/* Leave type */}
              <div>{req.leaveType.typeName}</div>

              {/* Dates */}
              <div>
                <p>
                  {req.startDate} → {req.endDate}
                </p>
                <p className="text-gray-500">
                  {req.datesBetween.length} days
                </p>
              </div>

              {/* Open profile icon */}
              <button className="justify-self-end hover:text-blue-600">
                <ExternalLink size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Blue underline */}
      <div className="h-2 bg-blue-500 rounded-full mt-3 max-w-4xl"></div>
    </AdminLayout>
  );
}
