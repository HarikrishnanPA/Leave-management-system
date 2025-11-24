import api from "./axios";

// Fetch all employees
export async function fetchAllEmployees() {
  const res = await api.get("/employees");
  return res.data.data.employees;
}

// Fetch employees by department
export async function fetchEmployeesByDepartment(dept: string) {
  const res = await api.get(`/employees/department/${dept}`);
  return res.data.data.employees;
}
