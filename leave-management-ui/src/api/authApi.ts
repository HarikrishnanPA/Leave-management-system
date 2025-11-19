import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/login"; // update if needed

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(API_URL, {
    email,
    password,
  });

  return response.data; // expected: { token}
};
