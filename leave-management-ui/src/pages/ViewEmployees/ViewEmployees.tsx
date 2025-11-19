import AdminLayout from "@/layouts/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { Funnel } from 'lucide-react';

interface Employee {
  name: string;
  role: string;
  dept: string;
}

const sampleEmployees: Employee[] = [
  { name: "John Doe", role: "Software Engineer", dept: "Digital" },
  { name: "Christy Theresa Chaco", role: "Finance Analyst", dept: "Finance" },
  { name: "Aby Pious Vinoy", role: "Network Analyst", dept: "Networks" },
  { name: "John Doe", role: "Software Engineer", dept: "Digital" },
  { name: "Christy Theresa Chaco", role: "Finance Analyst", dept: "Finance" },
  { name: "Aby Pious Vinoy", role: "Network Analyst", dept: "Networks" },
];

export default function ViewEmployees() {
  const [search, setSearch] = useState("");

  const filtered = sampleEmployees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      {/* Page Title */}
      <h1 className="text-4xl font-bold">View Employees</h1>
      <p className="text-gray-500 mb-8">search to view any employees!</p>

      {/* Search + Filter */}
      <div className="flex items-center gap-4 mb-6">
        <Input
          placeholder="Search employees"
          className="bg-white border-gray-300 max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
          Filtre <Funnel size={16} />
        </Button>
      </div>

      {/* Table Header */}
      <div className="bg-blue-500 text-white px-4 py-2 rounded-t-md font-semibold max-w-4xl">
        All Employees
      </div>

      {/* Table Rows */}
      <div className="border border-gray-200 rounded-b-md max-w-4xl">
        {filtered.map((emp, index) => (
          <div
            key={index}
            className="grid grid-cols-4 px-4 py-3 text-sm border-b last:border-b-0 items-center"
          >
            <span>{emp.name}</span>
            <span>{emp.role}</span>
            <span>{emp.dept}</span>

            {/* Profile icon */}
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
