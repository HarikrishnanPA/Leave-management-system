import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import EmployeeCalendar from "@/components/Calendar/EmployeeCalendar";
import EmployeeInfoCard from "@/components/Admin/EmployeeInfoCard";
import EmployeeRequestList from "@/components/Admin/EmployeeRequestList";
import RequestModal from "@/components/Admin/RequestModal";
import { ArrowLeft } from "lucide-react";

import {
  fetchEmployeeById,
  fetchEmployeeLeaveRequests,
  respondToRequest,
} from "@/api/adminEmployeeApi";

// TYPES -----------------------------
interface Employee {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  designation: string;
  department: string;
  role: string;
}

interface LeaveRequest {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  datesBetween: string[];
  leaveType: {
    id: number;
    typeName: string;
  };
  employee: Employee;
}

export default function AdminRequestDetails() {
  const { id } = useParams();
  const employeeId = Number(id);
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // calendar
  const [approvedDates, setApprovedDates] = useState<string[]>([]);
  const [pendingDates, setPendingDates] = useState<string[]>([]);
  const [holidays] = useState<string[]>([]);

  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);

  // LOAD DATA ------------------------------------
  useEffect(() => {
    const load = async () => {
      try {
        const emp = await fetchEmployeeById(employeeId);
        setEmployee(emp);

        const reqs = await fetchEmployeeLeaveRequests(employeeId);
        setRequests(reqs);

        // fill calendar colors
        const ap: string[] = [];
        const pend: string[] = [];

        reqs.forEach((req: LeaveRequest) => {
          if (req.status === "APPROVED") ap.push(...req.datesBetween);
          if (req.status === "PENDING") pend.push(...req.datesBetween);
        });

        setApprovedDates(ap);
        setPendingDates(pend);
      } catch (err) {
        console.error("Error loading employee details", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [employeeId]);

  // HANDLE APPROVE/REJECT -------------------------
  const handleRespond = async (
    requestId: number,
    approved: boolean,
    comment: string
  ) => {
    await respondToRequest(requestId, approved, comment);

    // refresh list
    const updated = await fetchEmployeeLeaveRequests(employeeId);
    setRequests(updated);

    // rebuild calendar
    const ap: string[] = [];
    const pend: string[] = [];

    updated.forEach((req: LeaveRequest) => {
      if (req.status === "APPROVED") ap.push(...req.datesBetween);
      if (req.status === "PENDING") pend.push(...req.datesBetween);
    });

    setApprovedDates(ap);
    setPendingDates(pend);

    setSelectedRequest(null);
  };

  // UI -----------------------------------------
  if (loading) return <p>Loading...</p>;

  return (
    <AdminLayout>
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 mb-4 hover:text-blue-700"
      >
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-4xl font-bold mb-4">{employee?.name}</h1>

      {/* Calendar + Profile */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <EmployeeCalendar
            approved={approvedDates}
            pending={pendingDates}
            holidays={holidays}
          />
        </div>

        <EmployeeInfoCard employee={employee!} />
      </div>

      {/* REQUEST LIST */}
      <EmployeeRequestList
        requests={requests}
        onOpenRequest={(req: LeaveRequest) => setSelectedRequest(req)}
      />

      {/* MODAL */}
      {selectedRequest && (
        <RequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onRespond={handleRespond}
        />
      )}
    </AdminLayout>
  );
}
