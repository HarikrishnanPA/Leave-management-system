import api from "./axios";

export const fetchAllLeaveRequests = async () => {
  const res = await api.get("/leave-requests");
  return res.data.data.leaveRequests;
};
