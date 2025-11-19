import AdminLayout from "@/layouts/AdminLayout";
import AdminCalendar from "@/components/Calendar/AdminCalendar";
import OnLeaveToday from "@/components/Admin/OnLeaveToday";

export default function AdminDashboard() {
  return (
    <AdminLayout>

      {/* Greeting */}
      <h1 className="text-4xl font-bold flex items-center gap-2">
        Hello Robert 👋
      </h1>
      <p className="text-gray-500 mb-8">here’s what going on today!</p>

      {/* Calendar */}
      <AdminCalendar />

      {/* On Leave Today */}
      <OnLeaveToday />

    </AdminLayout>
  );
}
