import { useEffect, useState } from 'react';

export default function AgentActivityMonitor() {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      const res = await fetch('http://localhost:4000/api/agent-activity');
      const data = await res.json();
      setActivity(data.reverse());
    };
    fetchActivity();
    const interval = setInterval(fetchActivity, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>PC Activity Log</h2>
      <ul>
        {activity.map((item, idx) => (
          <li key={idx}>
            <b>{item.app}</b> - {item.title} <i>{new Date(item.timestamp).toLocaleTimeString()}</i>
          </li>
        ))}
      </ul>
    </div>
  );
}