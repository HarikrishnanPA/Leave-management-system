import { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import loginBg from "@/assets/Untitled design.png";
import logo from "@/assets/logo.svg";
import { jwtDecode } from "jwt-decode";

import { loginUser } from "@/api/authApi";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Mail, Key, Eye, EyeOff } from "lucide-react";
import api from "@/api/axios";

interface DecodedToken {
  sub: string;
  role: string;
  userId: number;
  exp: number;
  iat: number;
}

export default function Login() {
  const { login, fetchProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleLogin = async () => {
  setError("");

  if (!email || !password) {
    setError("Email and password are required");
    return;
  }

  try {
    // Login → get token
    const data = await loginUser(email, password);

    // 👉 FIX: Attach token BEFORE calling fetchProfile
    localStorage.setItem("token", data.token);
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    // Decode JWT
    const decoded = jwtDecode<DecodedToken>(data.token);
    const role = decoded.role.replace("ROLE_", "");
    const userId = decoded.userId;
    const userEmail = decoded.sub;

    // Fetch user profile (NOW TOKEN IS SENT)
    const profile = await fetchProfile();

    // Save to AuthContext
    login({
      token: data.token,
      role,
      userId,
      email: userEmail,
      name: profile.name,   // ⭐ NOW WORKS
    });

    // Redirect
    navigate(role === "ADMIN" ? "/admin/dashboard" : "/employee/dashboard");

  } catch (err) {
    setError("Invalid credentials");
  }
};


  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      
      <div
        className="bg-white w-full max-w-md rounded-xl 
        p-10 border border-gray-300
        shadow-[31px_31px_4px_rgba(0,0,0,0.25)]"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Vacanza Logo" />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-2 text-gray-500 w-5 h-5" />
            <Input
              type="email"
              placeholder="example@gmail.com"
              className="pl-10 bg-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-7">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative mt-1">
            <Key className="absolute left-3 top-2 text-gray-500 w-5 h-5" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="enter password"
              className="pl-10 bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-3 top-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="mb-4 text-red-500 text-sm font-medium">{error}</p>
        )}

        {/* Login Button */}
        <div className="mb-6 items-center">
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>

        {/* Register */}
        <p className="text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-500 font-semibold hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
