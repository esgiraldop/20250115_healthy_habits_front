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
