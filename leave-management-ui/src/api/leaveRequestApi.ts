// src/api/leaveRequestApi.ts
import api from "./axios";

export async function fetchEmployeeLeaveRequests(employeeId: number) {
  const res = await api.get(`/leave-requests/employee/${employeeId}`);
  return res.data.data.leaveRequests;  // <-- THIS must be returned
}
