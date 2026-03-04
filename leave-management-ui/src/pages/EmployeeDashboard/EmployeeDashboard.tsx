import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import EmployeeCalendar from "@/components/Calendar/EmployeeCalendar";
import RemainingLeaves from "@/components/RemainingLeaves/RemainingLeaves";
import UpcomingHolidayCard from "@/components/UpcomingHolidayCard/UpcomingHolidayCard";
import { fetchLeaveBalance, fetchEmployeeLeaveRequests, fetchHolidays } from "@/api/employeeDashboardApi";
import EmployeeLayout from "@/layouts/EmployeeLayout";

export default function EmployeeDashboard() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const [upcomingHoliday, setUpcomingHoliday] = useState<any>(null);
  const [leaveData, setLeaveData] = useState<any[]>([]);
  const [approvedDates, setApprovedDates] = useState<string[]>([]);
  const [pendingDates, setPendingDates] = useState<string[]>([]);
  const [holidays, setHolidays] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const balances = await fetchLeaveBalance();
        const colorMap: Record<string, string> = {
          "Casual Leave": "#3B82F6", // blue
          "Sick Leave": "#FACC15", // yellow
          "Earned Leave": "#22C55E", // green
          "Marriage Leave": "#EC4899", // pink
          "Study Leave": "#8B5CF6", // purple
          "Bereavement Leave": "#6B7280", // gray
        };

        const mappedBalances = balances.map((b: any) => ({
          type: b.leaveType.typeName,
          remaining: b.availableDays,
          total: b.leaveType.maxDays,
          used: b.usedDays,
          color: colorMap[b.leaveType.typeName] || "#3B82F6", // default color
        }));

        setLeaveData(mappedBalances);

        const requests = await fetchEmployeeLeaveRequests(17); // HARDCODE until Auth works
        const approved: string[] = [];
        const pending: string[] = [];

        requests.forEach((r: any) => {
          if (r.status === "APPROVED") approved.push(...r.datesBetween);
          if (r.status === "PENDING") pending.push(...r.datesBetween);
        });

        setApprovedDates(approved);
        setPendingDates(pending);

        const holidayList = await fetchHolidays();
        setHolidays(holidayList.map((h: any) => h.date));

        setLoading(false);

        const today = new Date();

        // Find the nearest future holiday
        const nextHoliday = holidayList
          .map((h: any) => ({
            ...h,
            dateObj: new Date(h.date),
          }))
          .filter((h: any) => h.dateObj >= today)
          .sort((a: any, b: any) => a.dateObj - b.dateObj)[0];

        setUpcomingHoliday(nextHoliday || null);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p className="p-10">Loading dashboard...</p>;

  return (
    <EmployeeLayout>
      <div className="p-2">
        {/* Greeting */}
        <h1 className="text-4xl font-bold">Hello {user?.name} 👋</h1>
        <p className="text-gray-500 mb-8">Want a day off?</p>

        {/* Calendar */}
        <EmployeeCalendar
          approved={approvedDates}
          pending={pendingDates}
          holidays={holidays}
        />

        {/* Remaining Leaves Card */}
        <div className="mt-10 flex gap-10">
          {/* Left: Remaining Leaves */}
          <div className="w-[55%]">
            <RemainingLeaves leaves={leaveData} />
          </div>

          {/* Right: Upcoming Holiday */}
          <div className="w-[45%]">
            <UpcomingHolidayCard holiday={upcomingHoliday} />
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}
