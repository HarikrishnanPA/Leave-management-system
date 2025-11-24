import { ExternalLink } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  designation: string;
  department: string;
}

export interface LeaveRequest {
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

interface Props {
  requests: LeaveRequest[];
  onOpenRequest: (req: LeaveRequest) => void;
}

export default function EmployeeRequestList({ requests, onOpenRequest }: Props) {
  return (
    <div className="mt-10 max-w-4xl">
      <div className="bg-blue-500 text-white px-4 py-2 rounded-t-md font-semibold">
        Employee Leave Requests
      </div>

      <div className="border border-gray-200 rounded-b-md">
        {requests.map((req) => (
          <div
            key={req.id}
            className="grid grid-cols-5 px-4 py-4 text-sm border-b last:border-b-0 items-center cursor-pointer hover:bg-gray-50"
            onClick={() => onOpenRequest(req)}
          >
            {/* Employee info */}
            <div className="col-span-2">
              <p>{req.employee.name}</p>
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
              <p className="text-gray-500">{req.datesBetween.length} days</p>
            </div>

            <button className="justify-self-end hover:text-blue-600">
              <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="h-2 bg-blue-500 rounded-full mt-3"></div>
    </div>
  );
}
