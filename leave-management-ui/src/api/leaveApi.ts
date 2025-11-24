import api from "@/api/axios";

export const applyLeave = async (payload: {
  leaveTypeId: number;
  startDate: string;
  endDate: string;
  reason: string;
}) => {
  const res = await api.post("/leave-requests", payload);
  return res.data;
};

export const fetchLeaveTypes = async () => {
  const res = await api.get("/leave-types");
  return res.data; // because data IS the array
};
