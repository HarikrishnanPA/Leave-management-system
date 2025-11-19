interface EmployeeRow {
  name: string;
  role: string;
  dept: string;
}

const sampleData: EmployeeRow[] = [
  { name: "John Doe", role: "Software Engineer", dept: "Digital" },
  { name: "Christy Theresa Chaco", role: "Finance Analyst", dept: "Finance" },
  { name: "Aby Pious Vinoy", role: "Network Analyst", dept: "Networks" },
];

export default function OnLeaveToday() {
  return (
    <div className="mt-10">
      <div className="bg-blue-500 text-white px-4 py-2 rounded-t-md font-semibold">
        On leave today
      </div>

      <div className="border border-gray-200 rounded-b-md">
        {sampleData.map((emp, idx) => (
          <div
            key={idx}
            className="grid grid-cols-3 px-4 py-3 text-sm border-b last:border-b-0"
          >
            <span>{emp.name}</span>
            <span>{emp.role}</span>
            <span>{emp.dept}</span>
          </div>
        ))}
      </div>

      <div className="h-2 bg-blue-500 rounded-full mt-2"></div>
    </div>
  );
}
