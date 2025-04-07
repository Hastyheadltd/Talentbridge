import axios from 'axios';

let intervalId: NodeJS.Timeout | null = null;

export function startPingingBackend() {
  const pingBackend = () => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/ping`)
      .then(() => console.log(' Backend pinged successfully'))
      .catch((err) => console.error(' Ping failed:', err));
  };

  pingBackend();

  // Start pinging every 5 minutes
  intervalId = setInterval(pingBackend, 5 * 60 * 1000);
}

export function stopPingingBackend() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
