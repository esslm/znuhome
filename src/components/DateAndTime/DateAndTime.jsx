import { useState, useEffect } from "react";
import "./DateAndTime.css";

const DateAndTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const hours = time.getHours() % 12 || 12;
    const minutes = time.getMinutes();

    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  const time = formatTime(currentTime);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = `${daysOfWeek[currentTime.getDay()]}, ${
    monthsOfYear[currentTime.getMonth()]
  } ${currentTime.getDate()}`;

  return (
    <>
      <div className="dateandtime">
        <span className="time">{time}</span>
        <span className="date">{date}</span>
      </div>
    </>
  );
};

export default DateAndTime;
