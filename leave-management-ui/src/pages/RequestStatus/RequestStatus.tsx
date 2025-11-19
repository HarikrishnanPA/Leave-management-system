import EmployeeLayout from "@/layouts/EmployeeLayout";

interface LeaveRow {
  type: string;
  date: string;
  days: string;
}

const approvedRequests: LeaveRow[] = [
  { type: "Casual Leave", date: "21st May", days: "2 Days" },
  { type: "Casual Leave", date: "8th April", days: "1 Day" },
  { type: "Casual Leave", date: "7th April", days: "1 Day" },
];

const pendingRequests: LeaveRow[] = [
  { type: "Casual Leave", date: "26th May", days: "1 Day" },
  { type: "Casual Leave", date: "25th May", days: "1 Day" },
];

const rejectedRequests: LeaveRow[] = [
  { type: "Casual Leave", date: "26th May", days: "1 Day" },
  { type: "Casual Leave", date: "25th May", days: "1 Day" },
];

function Section({
  title,
  color,
  rows,
}: {
  title: string;
  color: string;
  rows: LeaveRow[];
}) {
  return (
    <div className="mb-12">
      {/* Header */}
      <div className={`px-4 py-2 rounded-t-lg ${color} text-black font-semibold`}>
        {title}
      </div>

      {/* Rows */}
      <div className="border border-gray-200 rounded-b-lg">
        {rows.map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-3 px-4 py-3 text-sm border-b last:border-b-0"
          >
            <div>{row.type}</div>
            <div>{row.date}</div>
            <div>{row.days}</div>
          </div>
        ))}
      </div>

      {/* Blue underline */}
      <div className="h-2 bg-blue-500 rounded-full mt-2"></div>
    </div>
  );
}

export default function RequestStatus() {
  return (
    <EmployeeLayout>
      <div className="">

        {/* Page title */}
        <h1 className="text-4xl font-bold">View status</h1>
        <p className="text-gray-500 mb-10">View your pending and approved requests here!</p>

        {/* Sections */}
        <Section
          title="Approved requests"
          color="bg-green-400"
          rows={approvedRequests}
        />

        <Section
          title="Pending requests"
          color="bg-yellow-300"
          rows={pendingRequests}
        />

        <Section
          title="Rejected requests"
          color="bg-red-300"
          rows={rejectedRequests}
        />

      </div>
    </EmployeeLayout>
  );
}
