function calculateRemainingTime(endTime) {
  const now = new Date();
  const end = new Date(endTime);
  const difference = end - now;

  console.log(end);
  if (difference <= 0) {
    // If end time has passed, return 0 for all fields
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  // Calculate remaining time in days, hours, minutes, and seconds
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
export default calculateRemainingTime;
