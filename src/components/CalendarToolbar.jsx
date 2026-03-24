import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatWeekRange } from "../lib/dates";

export default function CalendarToolbar({ weekStart, onPrevWeek, onNextWeek, onToday, viewMode, onViewModeChange, testDataOn, onToggleTestData }) {
  return (
    <div className="flex items-center gap-6 p-4 border-b border-gray-300 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onToday}
          className="h-[42px] px-4 rounded-xl border border-gray-200 bg-white cursor-pointer text-base text-[#10137b] hover:bg-gray-50 transition-all"
        >
          Today
        </button>
        <button
          onClick={onPrevWeek}
          className="size-[42px] rounded-xl border border-gray-200 bg-white cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={onNextWeek}
          className="size-[42px] rounded-xl border border-gray-200 bg-white cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex-1">
        <span className="text-2xl font-semibold text-gray-800">
          {formatWeekRange(weekStart)}
        </span>
      </div>

      <button
        onClick={onToggleTestData}
        className={`h-[42px] px-4 rounded-xl border cursor-pointer text-sm transition-all ${
          testDataOn
            ? "bg-[#10137b] text-white border-[#10137b]"
            : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
        }`}
      >
        {testDataOn ? "Clear test data" : "Load test data"}
      </button>

      <div className="flex border border-gray-300 rounded-xl overflow-hidden">
        {["Day", "Week", "Month"].map((v) => (
          <button
            key={v}
            onClick={() => onViewModeChange(v)}
            className={`h-[42px] px-4 border-none cursor-pointer text-base transition-all ${
              v === viewMode
                ? "bg-[#10137b] text-white"
                : "bg-white text-[#10137b] hover:bg-gray-50"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
