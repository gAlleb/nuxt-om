export function getTimeFromTimestamp(timestamp) {
    if (timestamp == "") {
      return ""
    }  else {
    let tmp = new Date(timestamp * 1000);
    return tmp.getHours().toString().padStart(2,'0') + ":"
      + tmp.getMinutes().toString().padStart(2,'0');
    }
  }  
export function minSec(duration) {
        const minutes = Math.trunc(duration / 60);
        const seconds = Math.trunc(duration % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  