import { useEffect, useState } from "react";
import { fetchAllLeaveRequests } from "@/api/adminLeaveApi";

interface LeaveRequest {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  employee: {
    id: number;
    name: string;
    department: string;
    designation: string;
  };
  leaveType: {
    id: number;
    typeName: string;
  };
}

export default function OnLeaveToday() {
  const [todaysLeaves, setTodaysLeaves] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const allRequests: LeaveRequest[] = await fetchAllLeaveRequests();

        const today = new Date().toISOString().split("T")[0];

        const filtered = allRequests.filter((req) => {
          return (
            req.status === "APPROVED" &&
            req.startDate <= today &&
            req.endDate >= today
          );
        });

        setTodaysLeaves(filtered);
      } catch (err) {
        console.error("❌ Failed to load today's leaves", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="mt-10 border border-blue-300 rounded-2xl p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Employees on leave today</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : todaysLeaves.length === 0 ? (
        <div className="text-gray-500 text-sm bg-gray-50 border rounded-xl p-4">
          No employees are on leave today.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {todaysLeaves.map((req) => (
            <div
              key={req.id}
              className="border border-gray-200 rounded-xl p-5 bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex justify-between items-start">
                {/* Name + Department */}
                <div>
                  <p className="font-semibold text-lg">{req.employee.name}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    {req.employee.department || "Not Assigned"}
                  </p>
                </div>

                {/* Leave Type Badge */}
                <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                  {req.leaveType.typeName}
                </span>
              </div>

              {/* Reason */}
              <p className="text-sm mt-3">
                <span className="font-medium text-gray-700">Reason:</span>{" "}
                {req.reason}
              </p>

              {/* Dates */}
              <div className="text-xs text-gray-600 mt-2">
                {req.startDate} → {req.endDate}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
