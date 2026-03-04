import { Phone, Mail, Briefcase, Building } from "lucide-react";
import NoDP from "@/assets/no_dp.jpg";

interface EmployeeInfoCardProps {
  employee: {
    phoneNumber?: string | null;
    email?: string | null;
    designation?: string | null;
    department?: string | null;
  };
}

export default function EmployeeInfoCard({ employee }: EmployeeInfoCardProps) {
  return (
    <div className="border border-blue-300 rounded-xl p-6 bg-white shadow-sm w-full max-w-sm">
      {/* Avatar */}
      <div className="w-full flex justify-center mb-15 mt-6">
        <img
          src={NoDP}
          alt="No profile"
          className="w-28 h-28 rounded-md object-cover"
        />
      </div>

      {/* Phone */}
      <div className="flex items-center gap-3 mb-3 ">
        <Phone className="w-5 h-5 text-gray-700" />
        <span className="text-gray-800">{employee.phoneNumber || "N/A"}</span>
      </div>

      {/* Email */}
      <div className="flex items-center gap-3 mb-3">
        <Mail className="w-5 h-5 text-gray-700" />
        <span className="text-gray-800 break-all">
          {employee.email || "N/A"}
        </span>
      </div>

      {/* Designation */}
      <div className="flex items-center gap-3 mb-3">
        <Briefcase className="w-5 h-5 text-gray-700" />
        <span className="text-gray-800">{employee.designation || "N/A"}</span>
      </div>

      {/* Department */}
      <div className="flex items-center gap-3">
        <Building className="w-5 h-5 text-gray-700" />
        <span className="text-gray-800">{employee.department || "N/A"}</span>
      </div>
    </div>
  );
}
