import EmployeeSidebar from "@/components/Sidebar/EmployeeSidebar";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      
      {/* FIXED SIDEBAR */}
      <div className="w-64 h-screen fixed left-0 top-0">
        <EmployeeSidebar />
      </div>

      {/* PAGE CONTENT (SHIFTED RIGHT) */}
      <div className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
        {children}
      </div>

    </div>
  );
}
