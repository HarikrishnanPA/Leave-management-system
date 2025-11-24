import { X } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  designation: string;
  department: string;
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

interface RequestModalProps {
  request: LeaveRequest;
  onClose: () => void;
  onRespond: (requestId: number, approved: boolean, comment: string) => void;
}

export default function RequestModal({
  request,
  onClose,
  onRespond,
}: RequestModalProps) {
  let comment = "";

  return (
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
    <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg relative">
        {/* Close button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-4">
          {request.leaveType.typeName} Request
        </h2>

        {/* Details */}
        <div className="space-y-3 text-sm">
          <p>
            <strong>Employee:</strong> {request.employee.name}
          </p>
          <p>
            <strong>Department:</strong> {request.employee.department}
          </p>
          <p>
            <strong>Dates:</strong> {request.startDate} → {request.endDate}
          </p>
          <p>
            <strong>Reason:</strong> {request.reason}
          </p>
        </div>

        {/* Comment box */}
        <textarea
          placeholder="Add a comment (optional)"
          className="w-full border rounded-md p-2 mt-4"
          rows={3}
          onChange={(e) => (comment = e.target.value)}
        />

        {/* Approve / Reject */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => onRespond(request.id, false, comment)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Reject
          </button>

          <button
            onClick={() => onRespond(request.id, true, comment)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
