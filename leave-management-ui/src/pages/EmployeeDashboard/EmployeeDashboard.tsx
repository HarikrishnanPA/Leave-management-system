import EmployeeLayout from "@/layouts/EmployeeLayout";
import EmployeeCalendar from "@/components/Calendar/EmployeeCalendar";
import RemainingLeaves from "@/components/RemainingLeaves/RemainingLeaves";

const leaveData = [
  { type: "Casual Leave", remaining: 5, total: 7, color: "#ef4444" }, // red
  { type: "Sick Leave", remaining: 3, total: 5, color: "#f59e0b" }, // amber
  { type: "Annual Leave", remaining: 10, total: 15, color: "#3b82f6" }, // blue
  { type: "Designated Leave", remaining: 1, total: 2, color: "#ec4899" }, // pink
];

export default function EmployeeDashboard() {
  return (
    <EmployeeLayout>
      <div>

        {/* Greeting */}
        <h1 className="text-4xl font-bold mb-1">
          Hello Robert 👋
        </h1>
        <p className="text-gray-500 mb-6">Want a day off?</p>

        {/* Calendar + remaining leaves goes here */}
        <div className="grid grid-cols-1 gap-8">
          {/* Calendar section */}
          <div className="mb-10">
            <EmployeeCalendar />
          </div>


          {/* Remaining leaves */}
          <div className="mt-10">
            <RemainingLeaves leaves={leaveData} />
          </div>
        </div>

      </div>
    </EmployeeLayout>
  );
}
