// dateUtils.js
export function getFormattedCurrentDate() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const currentDay = currentDate.getDate().toString().padStart(2, '0');
    const formattedDateTime = `${currentYear}-${currentMonth}-${currentDay}`;
    return formattedDateTime;
  }
  
  export function getFormattedTomorrowDate() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); // Increment the date by 1 to get tomorrow's date
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const currentDay = currentDate.getDate().toString().padStart(2, '0');
    const formattedTomorrowDate = `${currentYear}-${currentMonth}-${currentDay}`;
    return formattedTomorrowDate;
  }

 const FM = {
  FormatBalance
 }
 export default FM;
 
 function FormatBalance(amount, decimals = 2) {
  return Number(amount).toFixed(decimals);
}