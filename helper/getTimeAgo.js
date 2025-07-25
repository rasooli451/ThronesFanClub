function getTimeAgo(timestamp) {
  const now = new Date();
  const postDate = new Date(timestamp);
  const diffMs = now - postDate;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffHr < 1) {
    return `${diffMin}m`;
  } else if (diffDay < 1) {
    return `${diffHr}h`;
  } else if (diffDay < 30) {
    return `${diffDay}d`;
  } else if (diffYear < 1) {
    const options = { month: 'long', day: 'numeric' }; // e.g., "June 15"
    return postDate.toLocaleDateString('en-US', options);
  } else {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // e.g., "2023 June 15"
    return postDate.toLocaleDateString('en-US', options);
  }
}





module.exports = getTimeAgo;