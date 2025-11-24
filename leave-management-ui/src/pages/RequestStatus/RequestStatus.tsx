// src/pages/employee/ViewStatus.tsx
import { useEffect, useState, useContext } from "react";
import EmployeeLayout from "@/layouts/EmployeeLayout";
import { AuthContext } from "@/context/AuthContext";
import StatusBadge from "@/components/StatusBadge/StatusBadge";
import { fetchEmployeeLeaveRequests } from "@/api/leaveRequestApi";

interface LeaveRequest {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  leaveType: {
    id: number;
    typeName: string;
  };
}

export default function ViewStatus() {
  const { user } = useContext(AuthContext);

  // Fix: extract userId correctly
  const userId =
    user?.userId ||
    user?.id ||
    Number(localStorage.getItem("userId"));

  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      console.error("❌ userId missing");
      return;
    }

    const load = async () => {
      try {
        const data = await fetchEmployeeLeaveRequests(userId);
        setRequests(data);
      } catch (err) {
        console.error("❌ Failed to fetch leave requests", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId]);

  const pending = requests.filter((r) => r.status === "PENDING");
  const approved = requests.filter((r) => r.status === "APPROVED");
  const rejected = requests.filter((r) => r.status === "REJECTED");

  return (
    <EmployeeLayout>
      <h1 className="text-4xl font-bold mb-2">Leave request status</h1>
      <p className="text-gray-500 mb-8">View your approved, pending and rejected leave requests</p>

      {loading ? (
        <p className="p-4">Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-8">

          {/* Pending */}
          <div className="border border-blue-300 rounded-xl p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Pending</h2>
            <div className="flex flex-col gap-4">
              {pending.length === 0 && (
                <p className="text-gray-500 text-sm">No pending requests</p>
              )}
              {pending.map((req) => (
                <div key={req.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between">
                    <p className="font-medium">{req.leaveType.typeName}</p>
                    <StatusBadge status={req.status} />
                  </div>
                  <p className="text-sm text-gray-600">
                    {req.startDate} → {req.endDate}
                  </p>
                  <p className="text-sm mt-1">Reason: {req.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Approved */}
          <div className="border border-green-300 rounded-xl p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Approved</h2>
            <div className="flex flex-col gap-4">
              {approved.length === 0 && (
                <p className="text-gray-500 text-sm">No approved requests</p>
              )}
              {approved.map((req) => (
                <div key={req.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between">
                    <p className="font-medium">{req.leaveType.typeName}</p>
                    <StatusBadge status={req.status} />
                  </div>
                  <p className="text-sm text-gray-600">
                    {req.startDate} → {req.endDate}
                  </p>
                  <p className="text-sm mt-1">Reason: {req.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rejected */}
          <div className="border border-red-300 rounded-xl p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Rejected</h2>
            <div className="flex flex-col gap-4">
              {rejected.length === 0 && (
                <p className="text-gray-500 text-sm">No rejected requests</p>
              )}
              {rejected.map((req) => (
                <div key={req.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between">
                    <p className="font-medium">{req.leaveType.typeName}</p>
                    <StatusBadge status={req.status} />
                  </div>
                  <p className="text-sm text-gray-600">
                    {req.startDate} → {req.endDate}
                  </p>
                  <p className="text-sm mt-1">Reason: {req.reason}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </EmployeeLayout>
  );
}
