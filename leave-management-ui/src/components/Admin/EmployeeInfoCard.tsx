import React from "react";

interface Employee {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  designation: string;
  department: string;
  role: string;
}

export default function EmployeeInfoCard({ employee }: { employee: Employee }) {
  return (
    <div className="border border-blue-300 rounded-2xl p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Employee Details</h2>

      <div className="space-y-2 text-xl">
        <p>
          <span className="font-semibold">Name:</span> {employee.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {employee.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span>{" "}
          {employee.phoneNumber ?? "N/A"}
        </p>
        <p>
          <span className="font-semibold">Designation:</span>{" "}
          {employee.designation ?? "N/A"}
        </p>
        <p>
          <span className="font-semibold">Department:</span>{" "}
          {employee.department ?? "N/A"}
        </p>
        <p>
          <span className="font-semibold">Role:</span>{" "}
          {employee.role.replace("ROLE_", "")}
        </p>
      </div>
    </div>
  );
}
