// src/api/adminEmployeeApi.ts
import api from "./axios";

export async function fetchEmployeeById(id: number) {
  const res = await api.get(`/employees/${id}`);
  return res.data.data.employee;
}

export async function fetchEmployeeLeaveRequests(id: number) {
  const res = await api.get(`/leave-requests/employee/${id}`);
  return res.data.data.leaveRequests;
}

// IMPORTANT: approved must be boolean
export async function respondToRequest(
  requestId: number,
  approved: boolean,
  message: string
) {
  const payload = {
    requestId,
    approved,
    message,
  };

  console.log("Sending payload → ", payload);

  const res = await api.post(`/manager-responses/respond`, payload);
  return res.data;
}
