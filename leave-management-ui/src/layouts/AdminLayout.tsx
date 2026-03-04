import AdminSidebar from "@/components/Sidebar/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      
      {/* FIXED SIDEBAR */}
      <div className="w-64 h-screen fixed left-0 top-0">
        <AdminSidebar />
      </div>

      {/* PAGE CONTENT (SHIFTED RIGHT) */}
      <main className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
