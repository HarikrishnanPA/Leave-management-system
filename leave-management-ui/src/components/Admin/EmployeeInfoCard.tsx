import { Mail, Phone, Briefcase, Building } from "lucide-react";

export default function EmployeeInfoCard() {
  return (
    <div className="border border-blue-300 rounded-xl p-6 max-w-xs bg-white shadow-sm">
      {/* Placeholder Image */}
      <div className="w-20 h-20 bg-gray-200 rounded-md mx-auto mb-4"></div>

      <div className="space-y-3 text-sm">

        <div className="flex items-center gap-3">
          <Phone size={18} />
          <span>+91 84723 28837</span>
        </div>

        <div className="flex items-center gap-3">
          <Mail size={18} />
          <span>robert.ph@noemail.com</span>
        </div>

        <div className="flex items-center gap-3">
          <Briefcase size={18} />
          <span>Software Engineer</span>
        </div>

        <div className="flex items-center gap-3">
          <Building size={18} />
          <span>Engineering</span>
        </div>

      </div>
    </div>
  );
}
