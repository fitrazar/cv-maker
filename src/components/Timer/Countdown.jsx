import { useEffect, useState } from "react";

const Countdown = ({ unixTime, onExpire, paymentStatus }) => {
  const calculateTimeLeft = () => {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return Math.max(0, unixTime - nowInSeconds);
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Immediately check if already expired or paid
    if (timeLeft <= 0 || paymentStatus === "PAID") {
      if (onExpire) onExpire();
      return;
    }

    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft <= 0 || paymentStatus === "PAID") {
        clearInterval(interval);
        if (onExpire) onExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [unixTime, paymentStatus, onExpire]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  if (paymentStatus === "PAID") return null;

  return (
    <div className="text-red-600 font-semibold mb-4 text-center">
      {formatTime(timeLeft)}
    </div>
  );
};

export default Countdown;
