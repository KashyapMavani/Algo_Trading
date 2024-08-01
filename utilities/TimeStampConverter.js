function TimeStampCoverter(time) {
    // Create a JavaScript Date object from the timestamp (in milliseconds)
    timestamp = Number(time)
    const utcDate = new Date(timestamp);
  
    // Get the IST offset in hours (India is UTC+5:30)
    // const istOffset = 5.5 * 60 * 60 * 1000; // Convert hours to milliseconds
  
    // Create an IST datetime by adding the offset to the UTC datetime
    const istDate = new Date(utcDate.getTime());
  
    // Get the year, month (0-indexed), day, hours, minutes, and seconds
    const year = istDate.getFullYear();
    const month = String(istDate.getMonth() + 1).padStart(2, '0'); // Add padding for single-digit months
    const day = String(istDate.getDate()).padStart(2, '0');
    const hours = String(istDate.getHours()).padStart(2, '0');
    const minutes = String(istDate.getMinutes()).padStart(2, '0');
    const seconds = String(istDate.getSeconds()).padStart(2, '0');
  
    // Format the date and time in a human-readable way
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return formattedTime;
  }
  
module.exports = {TimeStampCoverter};