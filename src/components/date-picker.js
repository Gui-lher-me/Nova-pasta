import { daysOfWeek, monthOptions } from "@/constants";
import { ArrowLeftIcon, ArrowRightIcon } from "@/icons";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function DatePicker({ onApply, onCancel }) {
  const today = new Date();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const [currentMonth, setCurrentMonth] = useState(
    from ? parseDate(from).getMonth() : today.getMonth(),
  );
  const [currentYear, setCurrentYear] = useState(
    from ? parseDate(from).getFullYear() : today.getFullYear(),
  );
  const [selectedFrom, setSelectedFrom] = useState(() => parseDate(from));
  const [selectedTo, setSelectedTo] = useState(() => parseDate(to));

  const weeks = generateWeeks(currentYear, currentMonth);

  const handlePreviousClick = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextClick = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  const handleDayClick = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);

    if (!selectedFrom || (selectedFrom && selectedTo)) {
      // If no start date is selected, or if both start and end dates are selected, reset the selection
      setSelectedFrom(selectedDate);
      setSelectedTo(null);
    } else if (selectedFrom && !selectedTo) {
      // If the start date is selected but not the end date, set the end date
      if (selectedDate >= selectedFrom) {
        setSelectedTo(selectedDate);
      } else {
        // If the selected date is before the start date, reset and start over
        setSelectedFrom(selectedDate);
      }
    }
  };

  const handleApply = () => {
    const [from] = selectedFrom.toISOString().split("T");
    const [to] = selectedTo.toISOString().split("T");
    onApply(from, to);
  };

  const isSelected = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    return (
      (selectedFrom && selectedDate.getTime() === selectedFrom.getTime()) ||
      (selectedTo && selectedDate.getTime() === selectedTo.getTime()) ||
      (selectedFrom &&
        selectedTo &&
        selectedDate > selectedFrom &&
        selectedDate < selectedTo)
    );
  };

  const isFuture = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    return selectedDate > today;
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="space-y-0.5 p-3">
        <div className="mx-1.5 grid grid-cols-5 items-center gap-x-3 pb-3">
          <div className="col-span-1">
            <button
              type="button"
              onClick={handlePreviousClick}
              className="flex size-8 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              aria-label="Previous"
            >
              <ArrowLeftIcon />
            </button>
          </div>
          <div className="col-span-3 flex items-center justify-center gap-x-1">
            <span className="text-gray-800 dark:text-neutral-200">
              {monthOptions[currentMonth]}
            </span>
            <span className="text-gray-800 dark:text-neutral-200">/</span>
            <span className="text-gray-800 dark:text-neutral-200">
              {currentYear}
            </span>
          </div>
          <div className="col-span-1 flex justify-end">
            <button
              type="button"
              onClick={handleNextClick}
              className="flex size-8 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              aria-label="Next"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
        <div className="flex pb-1.5">
          {daysOfWeek.map((day) => (
            <span
              key={day}
              className="m-px block w-10 text-center text-sm text-gray-500 dark:text-neutral-500"
            >
              {day}
            </span>
          ))}
        </div>
        {weeks.map((week, index) => (
          <div key={index} className="flex">
            {week.map((day, idx) => (
              <div key={idx}>
                <button
                  type="button"
                  onClick={() => day && handleDayClick(day)}
                  className={`m-px flex size-10 items-center justify-center rounded-full border border-transparent text-sm text-gray-800 hover:border-primary-600 focus:border-primary-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-black ${
                    day === "" ? "invisible" : ""
                  } ${
                    isSelected(day)
                      ? "bg-primary-600 text-white"
                      : "dark:text-neutral-200"
                  }`}
                  disabled={isFuture(day)}
                >
                  {day}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-x-2 border-t border-gray-200 px-4 py-3 dark:border-neutral-700">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleApply}
          disabled={!selectedFrom || !selectedTo}
          className="inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent bg-primary-600 px-3 py-2 text-xs font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 dark:text-black"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

function parseDate(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split("-");
  return new Date(year, month - 1, day); // month is 0-based in JavaScript Date
}

// Helper function to get the number of days in a month
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Generate the days of the month and arrange them into weeks
function generateWeeks(year, month) {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const totalDays = getDaysInMonth(year, month);

  const weeks = [];
  let currentWeek = [];

  // Fill in the empty days before the start of the month
  for (let i = 1; i < (firstDayOfMonth === 0 ? 7 : firstDayOfMonth); i++) {
    currentWeek.push("");
  }

  // Fill the current month days into weeks
  for (let day = 1; day <= totalDays; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Fill in the remaining empty days at the end of the month
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push("");
    }
    weeks.push(currentWeek);
  }

  return weeks;
}
