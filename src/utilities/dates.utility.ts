export const currentDate = new Date();

export const getMilitaryTimeString = (date: Date): string => {
  return date.toLocaleTimeString('default', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use 24-hour format
  });
};

export const getISODateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const militaryTimeStringToDate = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(':');

  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};
