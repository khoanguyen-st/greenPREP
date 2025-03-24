import React from "react";
import { useState, useEffect } from "react";
import formatTime from "../../utils/formatTime";

/**Cách dùng TimeRemaining trong mỗi Skills (speaking, listening, reading, writing, vocal/grammar)
 * B1: ⚠️Import TimeRemaining from "../shared/ui/TimeRemaining/TimeRemaining";⚠️
 * B2: ⚠️Phải có handleAutoSubmit để đếm ngược thời gian kết thúc thì auto submit⚠️
 * B3: Add dòng này ⚠️<TimeRemaining duration={số phút của skill * 60} onAutoSubmit={handAutoSubmit}/>⚠️
 */

const TimeRemaining = ({
  duration,
  label = "Time remaining",
  onAutoSubmit,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onAutoSubmit) onAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onAutoSubmit]);

  const percentage = ((timeLeft / duration) * 100).toFixed(2);

  return (
    <div className="fixed top-4 right-2 z-50 flex flex-col items-center space-y-2 bg-white shadow-md rounded-lg px-2 py-2 w-60 border border-black">
      {/* Time */}
      <div className="text-3xl font-bold text-black">
        {formatTime(timeLeft)}
      </div>

      {/* Label */}
      <div className="text-gray-600 text-sm">{label}</div>

      {/* Progress bar */}
      <div className="w-3/4 h-2 bg-gray-300 rounded-full mt-2">
        <div
          className="h-2 bg-blue-700 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default React.memo(TimeRemaining);
