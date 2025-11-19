import { Button } from "@/components/ui/button";

const rows = [
  { date: "25th May", days: "1 Day", type: "Casual Leave", status: "pending" },
  { date: "25th May", days: "1 Day", type: "Casual Leave", status: "pending" },
  { date: "21st May", days: "1 Day", type: "Casual Leave", status: "approved" },
  { date: "8th April", days: "1 Day", type: "Casual Leave", status: "approved" },
  { date: "7th April", days: "1 Day", type: "Casual Leave", status: "rejected" },
];

export default function EmployeeRequestList() {
  return (
    <div className="mt-10 max-w-4xl">

      {/* Header */}
      <div className="bg-blue-500 text-white px-4 py-2 rounded-t-md font-semibold">
        All requests
      </div>

      <div className="border border-gray-200 rounded-b-md">
        {rows.map((r, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-4 px-4 py-4 text-sm border-b last:border-b-0 items-center
              ${
                r.status === "pending"
                  ? "bg-yellow-100"
                  : r.status === "approved"
                  ? "bg-green-100"
                  : "bg-red-100"
              }
            `}
          >
            <div>
              <p>{r.date}</p>
              <p className="text-gray-500">{r.days}</p>
            </div>

            <div>{r.type}</div>

            <div className="col-span-2 justify-self-end flex gap-4">

              {r.status === "pending" && (
                <>
                  <Button className="bg-green-500 text-white px-4">Approve</Button>
                  <Button className="bg-red-500 text-white px-4">Reject</Button>
                </>
              )}

              {r.status === "approved" && (
                <span className="text-green-700 font-semibold">Approved</span>
              )}

              {r.status === "rejected" && (
                <span className="text-red-700 font-semibold">Rejected</span>
              )}

            </div>
          </div>
        ))}
      </div>

      <div className="h-2 bg-blue-500 rounded-full mt-3"></div>
    </div>
  );
}
