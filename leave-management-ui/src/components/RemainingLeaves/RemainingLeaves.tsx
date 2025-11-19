interface LeaveType {
  type: string;
  remaining: number;
  total: number;
  color: string;
}

export default function RemainingLeaves({ leaves }: { leaves: LeaveType[] }) {
  return (
    <div className="border border-blue-300 rounded-2xl p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Remaining Leaves</h2>

      <div className="flex flex-col gap-6">
        {leaves.map((leave, index) => {
          const percent = (leave.remaining / leave.total) * 100;

          return (
            <div key={index} className="flex flex-col gap-2">
              {/* Top row */}
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">{leave.type}</span>
                <span className="font-bold">
                  {leave.remaining}/{leave.total} days
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: leave.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
