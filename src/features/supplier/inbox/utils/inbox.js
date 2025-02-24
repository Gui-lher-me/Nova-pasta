export function formatTimeDifference(sentTimestamp) {
  const currentTime = new Date();
  const sentTime = new Date(sentTimestamp);

  const diffInSeconds = Math.floor((currentTime - sentTime) / 1000);

  let timeString = "";

  if (diffInSeconds < 60) {
    timeString = `${diffInSeconds}s`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    timeString = `${minutes}m`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    timeString = `${hours}h`;
  } else if (diffInSeconds < 2592000) {
    // less than 30 days
    const days = Math.floor(diffInSeconds / 86400);
    timeString = `${days}d`;
  } else if (diffInSeconds < 31536000) {
    // less than 365 days
    const months = Math.floor(diffInSeconds / 2592000); // 30 days per month
    timeString = `${months}mo`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000); // 365 days per year
    timeString = `${years}y`;
  }

  return timeString;
}
