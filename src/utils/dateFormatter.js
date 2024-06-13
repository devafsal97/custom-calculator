// dateFormatter.js
function formatDate(date) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  
    const timezoneOffset = date.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(timezoneOffset / 60)).toString().padStart(2, '0');
    const offsetMinutes = (Math.abs(timezoneOffset) % 60).toString().padStart(2, '0');
    const utcSign = timezoneOffset <= 0 ? '+' : '-';
    const utcString = `UTC${utcSign}${offsetHours}:${offsetMinutes}`;
  
    return `${month} ${day}, ${year} at ${hour}:${minutes} ${ampm} (${utcString})`;
  }
  
  export default formatDate;
  