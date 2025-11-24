export default function UpcomingHolidayCard({ holiday }: { holiday: any }) {
  if (!holiday) {
    return (
      <div className="border border-blue-300 rounded-2xl p-6 bg-white shadow-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Upcoming Holiday</h2>
        <p className="text-gray-500">No upcoming holidays</p>
      </div>
    );
  }

  const formattedDate = new Date(holiday.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border border-blue-300 rounded-2xl p-6 bg-white shadow-sm w-full">
      <h2 className="text-xl font-semibold mb-4">Upcoming Holiday</h2>

      <div className="bg-blue-50 border border-blue-300 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-blue-700">{holiday.name}</h3>
        <p className="text-gray-700 mt-2">{formattedDate}</p>
      </div>
    </div>
  );
}
