import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchHolidays } from "@/api/employeeDashboardApi";

export default function AdminCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchHolidays();
        const formatted = data.map((h: any) => h.date); // "2025-12-25"
        setHolidays(formatted);
      } catch (err) {
        console.error("Failed to load holidays", err);
      }
    };
    load();
  }, []);

  const getMonthData = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = firstDay.getDay(); // 0 = Sun
    const weeks: number[][] = [];
    let week: number[] = [];

    // Fill blanks before start
    for (let i = 0; i < (startDay === 0 ? 6 : startDay - 1); i++) {
      week.push(0);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    while (week.length < 7) week.push(0);
    weeks.push(week);

    return weeks;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const month1 = new Date(year, month, 1);
  const month2 = new Date(year, month + 1, 1);

  const m1 = getMonthData(month1.getFullYear(), month1.getMonth());
  const m2 = getMonthData(month2.getFullYear(), month2.getMonth());

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return (
    <div className="border border-blue-300 rounded-2xl p-6 bg-white shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="p-2 hover:bg-gray-200 rounded-full"
          onClick={() =>
            setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
          }
        >
          <ChevronLeft />
        </button>

        <div className="flex items-center gap-4 text-xl font-semibold">
          {monthNames[month]} {year}
          <span className="text-gray-400">|</span>
          {monthNames[month2.getMonth()]} {month2.getFullYear()}
        </div>

        <button
          className="p-2 hover:bg-gray-200 rounded-full"
          onClick={() =>
            setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
          }
        >
          <ChevronRight />
        </button>
      </div>

      {/* TWO MONTH GRID */}
      <div className="grid grid-cols-2 gap-6">
        <AdminMonth
          title={`${monthNames[month1.getMonth()]} ${month1.getFullYear()}`}
          weeks={m1}
          year={month1.getFullYear()}
          month={month1.getMonth()}
          holidays={holidays}
          today={today}
        />

        <AdminMonth
          title={`${monthNames[month2.getMonth()]} ${month2.getFullYear()}`}
          weeks={m2}
          year={month2.getFullYear()}
          month={month2.getMonth()}
          holidays={holidays}
          today={today}
        />
      </div>

      {/* LEGEND */}
      <div className="flex gap-4 mt-6 text-sm">
        <LegendDot color="bg-pink-300" label="Holiday" />
        <LegendDot color="bg-blue-500" label="Today" />
        <LegendDot color="bg-red-500" label="Weekend" />
      </div>
    </div>
  );
}

/* ============================================================
   SINGLE MONTH COMPONENT (Admin)
=============================================================== */
function AdminMonth({ title, weeks, year, month, holidays, today }: any) {
  const format = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  return (
    <div>
      {/* <h3 className="text-center text-lg font-medium mb-3">{title}</h3> */}

      {/* Week Headers */}
      <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
        {["Mo","Tu","We","Th","Fr","Sa","Su"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid gap-2">
        {weeks.map((week: number[], wi: number) => (
          <div key={wi} className="grid grid-cols-7 gap-2">
            {week.map((day: number, di: number) => {
              if (day === 0) return <div key={di} className="h-10"></div>;

              const dateStr = format(year, month, day);

              const isToday =
                today.getFullYear() === year &&
                today.getMonth() === month &&
                today.getDate() === day;

              const isWeekend = di === 5 || di === 6;
              const isHoliday = holidays.includes(dateStr);

              let bg = "";
              if (isHoliday) bg = "bg-pink-300";
              else if (isToday) bg = "bg-blue-500 text-white";

              const weekendText = isWeekend && !bg ? "text-red-500 font-bold" : "";

              return (
                <div
                  key={di}
                  className={`h-10 flex items-center justify-center rounded-md border border-gray-300
                    ${bg}
                    ${!bg ? weekendText : ""}
                  `}
                >
                  {day}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function LegendDot({ color, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}
