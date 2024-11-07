export function convertTime(
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
) {
  if (
    typeof days !== "number" ||
    typeof hours !== "number" ||
    typeof minutes !== "number" ||
    typeof seconds !== "number" ||
    typeof milliseconds !== "number"
  ) {
    throw new Error("All input values must be numbers.");
  }

  // Ensure non-negative values
  if (days < 0 || hours < 0 || minutes < 0 || seconds < 0 || milliseconds < 0) {
    throw new Error("All input values must be non-negative.");
  }

  // Calculate total milliseconds
  const totalMs =
    (((days * 24 + hours) * 60 + minutes) * 60 + seconds) * 1000 + milliseconds;

  // Calculate other units
  const totalSecs = totalMs / 1000;
  const totalMins = totalSecs / 60;
  const totalHrs = totalMins / 60;
  const totalDays = totalHrs / 24;

  return {
    ms: totalMs,
    secs: totalSecs,
    mins: totalMins,
    hours: totalHrs,
    days: totalDays,
  };
}
