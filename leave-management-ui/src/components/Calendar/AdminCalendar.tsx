import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminCalendar() {
  const [date, setDate] = useState(new Date());

  const getMonthMatrix = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Monday as first day of week
    const start = (firstDay.getDay() + 6) % 7;

    const weeks: number[][] = [];
    let row: number[] = Array(start).fill(0);

    for (let day = 1; day <= daysInMonth; day++) {
      row.push(day);
      if (row.length === 7) {
        weeks.push(row);
        row = [];
      }
    }

    if (row.length) weeks.push([...row, ...Array(7 - row.length).fill(0)]);
    return weeks;
  };

  const year = date.getFullYear();
  const month = date.getMonth();

  const month1 = new Date(year, month);
  const month2 = new Date(year, month + 1);

  const m1 = getMonthMatrix(year, month);
  const m2 = getMonthMatrix(month2.getFullYear(), month2.getMonth());

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // EMPTY → Backend will later send designated holidays
  const designated: number[] = [];

  return (
    <div className="border border-blue-300 rounded-2xl p-6 bg-white shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() =>
            setDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
          }
        >
          <ChevronLeft />
        </button>

        <div className="flex items-center gap-5 text-xl font-semibold">
          {monthNames[month1.getMonth()]} {month1.getFullYear()}
          <span className="text-gray-400">|</span>
          {monthNames[month2.getMonth()]} {month2.getFullYear()}
        </div>

        <button
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() =>
            setDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
          }
        >
          <ChevronRight />
        </button>
      </div>

      {/* 2 Month Grid */}
      <div className="grid grid-cols-2 gap-6">
        <Month
          title={`${monthNames[month1.getMonth()]} ${month1.getFullYear()}`}
          days={m1}
          monthDate={month1}
          designated={designated}
        />
        <Month
          title={`${monthNames[month2.getMonth()]} ${month2.getFullYear()}`}
          days={m2}
          monthDate={month2}
          designated={designated}
        />
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-6 text-sm">
        <Legend color="bg-red-300" label="Weekend" />
        <Legend color="bg-pink-300" label="Designated leave" />
        <Legend color="bg-blue-500" label="Today" />
      </div>
    </div>
  );
}

function Month({ title, days, designated, monthDate }: any) {
  const today = new Date();

  return (
    <div>
      <h3 className="text-center text-lg font-medium mb-3">{title}</h3>

      {/* Days of week */}
      <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid gap-2">
        {days.map((week: number[], idx: number) => (
          <div key={idx} className="grid grid-cols-7 gap-2">

            {week.map((day, colIndex) => {
              const isWeekend = colIndex === 5 || colIndex === 6; // Sat = 5, Sun = 6
              const isToday =
                day !== 0 &&
                today.getDate() === day &&
                today.getMonth() === monthDate.getMonth() &&
                today.getFullYear() === monthDate.getFullYear();

              return (
                <div
                  key={colIndex}
                  className={`
                    h-10 flex items-center justify-center rounded-md border
                    ${day === 0 ? "border-transparent" : "border-gray-300"}
                    ${isWeekend && day !== 0 ? "bg-red-300 text-black" : ""}
                    ${designated.includes(day) ? "bg-pink-300 text-black" : ""}
                    ${isToday ? "bg-blue-500 text-white font-bold" : ""}
                  `}
                >
                  {day !== 0 && day}
                </div>
              );
            })}

          </div>
        ))}
      </div>
    </div>
  );
}

function Legend({ color, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span>{label}</span>
    </div>
  );
}
