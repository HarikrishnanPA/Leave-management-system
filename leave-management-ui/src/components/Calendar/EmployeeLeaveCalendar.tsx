import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LeaveDay {
  day: number;
  type: "approved" | "applied" | "designated";
}

export default function EmployeeLeaveCalendar({
  approved = [],
  applied = [],
  designated = [],
}: {
  approved: number[];
  applied: number[];
  designated: number[];
}) {
  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();
  const month = date.getMonth();

  const getMatrix = (year: number, month: number) => {
    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const start = (first.getDay() + 6) % 7;

    const rows: number[][] = [];
    let row = Array(start).fill(0);

    for (let d = 1; d <= daysInMonth; d++) {
      row.push(d);
      if (row.length === 7) {
        rows.push(row);
        row = [];
      }
    }
    if (row.length) rows.push([...row, ...Array(7 - row.length).fill(0)]);
    return rows;
  };

  const m1 = getMatrix(year, month);
  const m2 = getMatrix(year, month + 1);

  const months = [
    "January","February","March","April","May",
    "June","July","August","September","October","November","December"
  ];

  const today = new Date();

  const renderMonth = (matrix: number[][], year: number, monthIndex: number) => (
    <div>
      <h3 className="text-center text-lg font-medium mb-3">
        {months[monthIndex]} {year}
      </h3>

      <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
        {["Mo","Tu","We","Th","Fr","Sa","Su"].map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid gap-2">
        {matrix.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-2">
            {week.map((day, di) => {
              const isToday =
                day &&
                today.getDate() === day &&
                today.getMonth() === monthIndex &&
                today.getFullYear() === year;

              return (
                <div
                  key={di}
                  className={`h-10 flex items-center justify-center border rounded-md
                    ${day === 0 ? "border-transparent" : "border-gray-300"}
                    ${designated.includes(day) ? "bg-red-300" : ""}
                    ${applied.includes(day) ? "bg-yellow-300" : ""}
                    ${approved.includes(day) ? "bg-green-400" : ""}
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

  return (
    <div className="border border-blue-300 rounded-2xl p-6 bg-white shadow-sm">

      {/* Header Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() =>
            setDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
          }
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() =>
            setDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
          }
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Two months */}
      <div className="grid grid-cols-2 gap-6">
        {renderMonth(m1, year, month)}
        {renderMonth(m2, month === 11 ? year + 1 : year, (month + 1) % 12)}
      </div>
    </div>
  );
}
