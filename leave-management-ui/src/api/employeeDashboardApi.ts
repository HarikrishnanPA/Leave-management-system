import api from "axios";

export const fetchLeaveBalance = async () => {
  const res = await api.get("/leave-balance/my");
  return res.data.data.leaveBalances;
};

export const fetchEmployeeLeaveRequests = async (employeeId: number) => {
  const res = await api.get(`/leave-requests/employee/${employeeId}`);
  return res.data.data.leaveRequests;
};

export const fetchHolidays = async () => {
  const res = await api.get("/holidays");
  return res.data.data.holidays;
};
