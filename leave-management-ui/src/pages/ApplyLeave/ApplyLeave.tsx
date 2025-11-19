import EmployeeLayout from "@/layouts/EmployeeLayout";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ApplyLeave() {
  const [leaveType, setLeaveType] = useState("");
  const [days, setDays] = useState("");
  const [startDate, setStartDate] = useState("");
  const [reason, setReason] = useState("");

  return (
    <EmployeeLayout>

      {/* Page heading */}
      <h1 className="text-4xl font-bold">Apply leave</h1>
      <p className="text-gray-500 mb-8">Add your leave requests here!</p>

      {/* Form Container */}
      <div className="border border-blue-300 rounded-2xl p-8 bg-white shadow-sm max-w-5xl">

        <h2 className="text-xl font-semibold mb-6">Application form</h2>

        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-6">

          {/* Leave type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Leave type</label>
            <Select onValueChange={(v) => setLeaveType(v)}>
              <SelectTrigger className="bg-gray-100">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Casual Leave</SelectItem>
                <SelectItem value="sick">Sick Leave</SelectItem>
                <SelectItem value="earned">Earned Leave</SelectItem>
                <SelectItem value="bereavement">Bereavement Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* No. of days */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">No. of days</label>
            <Select onValueChange={(v) => setDays(v)}>
              <SelectTrigger className="bg-gray-100">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5,6,7].map((d) => (
                  <SelectItem key={d} value={String(d)}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </div>

        {/* Start Date */}
        <div className="mt-6 flex flex-col gap-2 max-w-sm">
          <label className="text-sm font-medium text-gray-700">Start date</label>
          <Input
            type="date"
            className="bg-gray-100"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* Reason */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700">Describe your reason</label>
          <textarea
            className="w-full mt-1 bg-gray-100 border border-gray-300 rounded-md p-3 h-24 outline-none"
            placeholder="Type here"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-10 flex justify-center">
          <Button className="
            bg-blue-500 text-white px-10 py-4 rounded-md 
            text-lg font-medium shadow-[5px_5px_10px_rgba(0,0,0,0.25)]
            hover:bg-blue-600 transition
          ">
            Submit
          </Button>
        </div>

      </div>
    </EmployeeLayout>
  );
}
