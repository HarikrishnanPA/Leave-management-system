import EmployeeLayout from "@/layouts/EmployeeLayout";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { applyLeave, fetchLeaveTypes } from "@/api/leaveApi";

export default function ApplyLeave() {
  const [leaveType, setLeaveType] = useState("");
  const [leaveTypes, setLeaveTypes] = useState<any[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(0);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // 🔥 FETCH LEAVE TYPES FROM BACKEND
  useEffect(() => {
    fetchLeaveTypes().then((types) => setLeaveTypes(types));
  }, []);

  // 🔥 AUTOCALCULATE NO. OF DAYS
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end >= start) {
        const diffTime = end.getTime() - start.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24) + 1;
        setDays(diffDays);
      } else {
        setDays(0);
      }
    }
  }, [startDate, endDate]);

  // 🔥 SUBMIT FORM
  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!leaveType || !startDate || !endDate || !reason) {
      setError("Please fill all fields.");
      return;
    }

    if (days <= 0) {
      setError("End date must be after start date.");
      return;
    }

    const payload = {
      leaveTypeId: Number(leaveType),
      startDate,
      endDate,
      reason,
    };

    try {
      setLoading(true);
      await applyLeave(payload);

      setSuccess("Leave request submitted successfully!");
      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setDays(0);
      setReason("");
    } catch (err) {
      setError("Failed to submit leave request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeLayout>
      {/* Page heading */}
      <h1 className="text-4xl font-bold">Apply leave</h1>
      <p className="text-gray-500 mb-8">Add your leave requests here!</p>

      {/* Form Container */}
      <div className="border border-blue-300 rounded-2xl p-8 bg-white shadow-sm max-w-5xl">
        <h2 className="text-xl font-semibold mb-6">Application form</h2>

        {/* ERROR / SUCCESS */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Leave type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Leave type
            </label>

            <Select value={leaveType} onValueChange={(v) => setLeaveType(v)}>
              <SelectTrigger className="bg-gray-100 border border-gray-300">
                <SelectValue placeholder="Select" />
              </SelectTrigger>

              <SelectContent className="bg-white border border-gray-300">
                {leaveTypes.map((lt) => (
                  <SelectItem key={lt.id} value={String(lt.id)}>
                    {lt.typeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* No. of days */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              No. of days
            </label>
            <Input
              type="text"
              className="bg-gray-100"
              value={days || ""}
              disabled
            />
          </div>
        </div>

        {/* Start Date */}
        <div className="mt-6 flex flex-col gap-2 max-w-sm">
          <label className="text-sm font-medium text-gray-700">
            Start date
          </label>
          <Input
            type="date"
            className="bg-gray-100"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* End Date */}
        <div className="mt-6 flex flex-col gap-2 max-w-sm">
          <label className="text-sm font-medium text-gray-700">End date</label>
          <Input
            type="date"
            className="bg-gray-100"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Reason */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700">
            Describe your reason
          </label>
          <textarea
            className="w-full mt-1 bg-gray-100 border border-gray-300 rounded-md p-3 h-24 outline-none"
            placeholder="Type here"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-10 flex justify-center">
          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="
              bg-blue-500 text-white px-10 py-4 rounded-md 
              text-lg font-medium shadow-[5px_5px_10px_rgba(0,0,0,0.25)]
              hover:bg-blue-600 transition
            "
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </EmployeeLayout>
  );
}
