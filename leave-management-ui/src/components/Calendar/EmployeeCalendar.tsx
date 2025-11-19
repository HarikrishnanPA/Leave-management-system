import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EmployeeCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthData = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = firstDay.getDay(); // 0=Sunday
    const weeks: number[][] = [];
    let week: number[] = [];

    // Add empty cells before month starts
    for (let i = 0; i < (startDay === 0 ? 6 : startDay - 1); i++) {
      week.push(0); // 0 = blank
    }

    // Add month days
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    // Fill trailing blanks
    while (week.length < 7) week.push(0);
    weeks.push(week);

    return weeks;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

    // Month 1 = current month
    const month1 = new Date(year, month, 1);

    // Month 2 = next month
    const month2 = new Date(year, month + 1, 1);

    // Month data
    const month1Data = getMonthData(month1.getFullYear(), month1.getMonth());
    const month2Data = getMonthData(month2.getFullYear(), month2.getMonth());

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return (
    <div className="border border-blue-300 rounded-2xl p-6 bg-white shadow-sm">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="p-2 hover:bg-gray-200 rounded-full"
          onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
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
          onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
        >
          <ChevronRight />
        </button>
      </div>

      {/* TWO MONTH GRID */}
      <div className="grid grid-cols-2 gap-6">

        {/* Month 1 */}
        <CalendarMonth
            title={`${monthNames[month1.getMonth()]} ${month1.getFullYear()}`}
            weeks={month1Data}
        />

        <CalendarMonth
            title={`${monthNames[month2.getMonth()]} ${month2.getFullYear()}`}
            weeks={month2Data}
        />

      </div>

      {/* LEGEND */}
      <div className="flex gap-4 mt-6 text-sm">
        <LegendDot color="bg-red-500" label="Casual leave" />
        <LegendDot color="bg-yellow-400" label="Leave Applied" />
        <LegendDot color="bg-green-500" label="Approved leave" />
        <LegendDot color="bg-pink-300" label="Designated leave" />
        <LegendDot color="bg-blue-500" label="Today" />
      </div>
    </div>
  );
}

/* ========== SUB COMPONENTS ========== */

function CalendarMonth({ title, weeks }: { title: string, weeks: number[][] }) {
  return (
    <div>
      <h3 className="text-center text-lg font-medium mb-3">{title}</h3>

      {/* WEEKHEADERS */}
      <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
        {["Mo","Tu","We","Th","Fr","Sa","Su"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* WEEK ROWS */}
      <div className="grid gap-2">
        {weeks.map((week, idx) => (
          <div key={idx} className="grid grid-cols-7 gap-2">
            {week.map((day, i) => (
              <div
                key={i}
                className={`h-10 flex items-center justify-center rounded-md border ${
                  day === 0 ? "border-transparent" : "border-gray-300"
                }`}
              >
                {day !== 0 ? day : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span>{label}</span>
    </div>
  );
}
