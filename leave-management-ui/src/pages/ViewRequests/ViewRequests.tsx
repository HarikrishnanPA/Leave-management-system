import AdminLayout from "@/layouts/AdminLayout";
import { ExternalLink } from "lucide-react";

interface RequestRow {
  name: string;
  role: string;
  dept: string;
  leaveType: string;
  date: string;
  days: string;
}

const sampleRequests: RequestRow[] = [
  {
    name: "Robert Philip",
    role: "Software Engineer",
    dept: "Digital",
    leaveType: "Casual Leave",
    date: "15th July",
    days: "4 days",
  },
  {
    name: "John Doe",
    role: "Software Engineer",
    dept: "Digital",
    leaveType: "Casual Leave",
    date: "15th July",
    days: "4 days",
  },
];

export default function ViewRequests() {
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
        {sampleRequests.map((req, idx) => (
          <div
            key={idx}
            className="grid grid-cols-5 px-4 py-4 text-sm border-b last:border-b-0 items-center"
          >
            {/* Employee info (3 lines) */}
            <div className="col-span-2">
              <p>{req.name}</p>
              <p className="text-gray-500">{req.role}</p>
              <p className="text-gray-500">{req.dept}</p>
            </div>

            {/* Leave type */}
            <div>{req.leaveType}</div>

            {/* Date + days */}
            <div>
              <p>{req.date}</p>
              <p className="text-gray-500">{req.days}</p>
            </div>

            {/* Open details icon */}
            <button className="justify-self-end hover:text-blue-600">
              <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Blue underline */}
      <div className="h-2 bg-blue-500 rounded-full mt-3 max-w-4xl"></div>

    </AdminLayout>
  );
}
