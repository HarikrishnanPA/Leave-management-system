import AdminLayout from "@/layouts/AdminLayout";
import { Input } from "@/components/ui/input";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAllEmployees,
  fetchEmployeesByDepartment,
} from "@/api/employeeApi";

interface Employee {
  id: number;
  name: string;
  email: string;
  phoneNumber: string | null;
  designation: string | null;
  department: string | null;
  role: string;
}

export default function ViewEmployees() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [departments, setDepartments] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  const indexOfLast = currentPage * employeesPerPage;
  const indexOfFirst = indexOfLast - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data: Employee[] = await fetchAllEmployees();
      setEmployees(data);
      setFilteredEmployees(data);

      // Extract unique department names
      const uniqueDepts: string[] = Array.from(
        new Set(
          data
            .map((e: Employee) => e.department || "")
            .filter((d: string) => d.trim() !== "")
        )
      ).sort();

      setDepartments(uniqueDepts);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };

  // Search
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);

    let updated: Employee[] = employees;

    if (selectedDept !== "") {
      updated = updated.filter(
        (e: Employee) =>
          (e.department || "").toLowerCase() === selectedDept.toLowerCase()
      );
    }

    setFilteredEmployees(
      updated.filter((emp: Employee) =>
        emp.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  // Department filter
  const handleDeptFilter = async (dept: string) => {
    setSelectedDept(dept);
    setCurrentPage(1);

    if (dept === "") {
      setFilteredEmployees(
        employees.filter((emp: Employee) =>
          emp.name.toLowerCase().includes(search.toLowerCase())
        )
      );
      return;
    }

    try {
      const deptEmployees: Employee[] = await fetchEmployeesByDepartment(dept);
      setFilteredEmployees(
        deptEmployees.filter((emp: Employee) =>
          emp.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } catch (err) {
      console.error("Failed to filter department", err);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold">View Employees</h1>
      <p className="text-gray-500 mb-8">Search and filter employees</p>

      {/* Search & Filter */}
      <div className="flex items-center gap-4 mb-6">
        <Input
          placeholder="Search employees"
          className="bg-white border-gray-300 max-w-md"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearch(e.target.value)
          }
        />

        {/* Dynamic department dropdown */}
        <select
          className="border border-gray-300 rounded-md p-2 bg-white"
          value={selectedDept}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleDeptFilter(e.target.value)
          }
        >
          <option value="">All Departments</option>

          {departments.map((dept: string) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Table Header */}
      <div className="bg-blue-500 text-white px-4 py-2 rounded-t-md font-semibold max-w-4xl">
        All Employees
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-b-md max-w-4xl">
        {filteredEmployees.length === 0 ? (
          <p className="p-4 text-gray-500">No employees found</p>
        ) : (
          currentEmployees.map((emp: Employee) => (
            <div
              key={emp.id}
              onClick={() => navigate(`/admin/employee/${emp.id}`)}
              className="
                grid grid-cols-4 px-4 py-3 text-sm border-b last:border-b-0 items-center
                cursor-pointer hover:bg-gray-100 transition
              "
            >
              <span>{emp.name}</span>
              <span>{emp.designation || "—"}</span>
              <span>{emp.department || "—"}</span>

              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  navigate(`/admin/employee/${emp.id}`);
                }}
                className="justify-self-end hover:text-blue-600"
              >
                <ExternalLink size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2 mt-4">
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className={`px-3 py-1 border rounded ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Prev
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num: number) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-3 py-1 border rounded ${
              currentPage === num
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {num}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className={`px-3 py-1 border rounded ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>

      <div className="h-2 bg-blue-500 rounded-full mt-3 max-w-4xl"></div>
    </AdminLayout>
  );
}
