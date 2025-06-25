import { useState } from "react";
import Layout from "../components/Layout";
import ZenDashboard from "../components/ZenDashboard";
import ActivityLog from "../components/ActivityLog";
import ZenAssistant from "../components/ZenAssistant";

const users = [
  { 
    id: 1, 
    name: "Alice Johnson", 
    productivity: 92, 
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alice",
    zenLevel: "Mindful Master",
    todayHours: 8.2,
    focusTime: 7.5,
    restTime: 0.5,
    distractedTime: 0.2,
    rewards: ["Productivity Master", "Zen Achiever", "Focus Champion"],
    status: "excellent"
  },
  { 
    id: 2, 
    name: "Bob Smith", 
    productivity: 78, 
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bob",
    zenLevel: "Steady Flow",
    todayHours: 7.1,
    focusTime: 5.8,
    restTime: 0.8,
    distractedTime: 0.5,
    rewards: ["Team Player", "Progress Badge"],
    status: "good"
  },
  { 
    id: 3, 
    name: "Carol Davis", 
    productivity: 85, 
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carol",
    zenLevel: "Balanced Achiever",
    todayHours: 7.8,
    focusTime: 6.9,
    restTime: 0.6,
    distractedTime: 0.3,
    rewards: ["Innovation Award", "Wellness Champion"],
    status: "excellent"
  },  { 
    id: 4, 
    name: "David Wilson", 
    productivity: 65, 
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=David",
    zenLevel: "Growing Mindfully",
    todayHours: 6.2,
    focusTime: 4.5,
    restTime: 1.0,
    distractedTime: 0.7,
    rewards: ["Improvement Star"],
    status: "needs-focus"
  },
  { 
    id: 5,    name: "Emma Brown", 
    productivity: 88, 
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma",
    zenLevel: "Balanced Flow",
    todayHours: 7.8,
    focusTime: 6.8,
    restTime: 0.7,
    distractedTime: 0.3,
    rewards: ["Wellness Day", "Focus Master"],
    status: "excellent"
  },
  { 
    id: 6, 
    name: "Frank Miller", 
    productivity: 73, 
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Frank",
    zenLevel: "Steady Growth",
    todayHours: 6.5,
    focusTime: 4.8,
    restTime: 1.2,
    distractedTime: 0.5,    rewards: ["Progress Badge"],
    status: "improving"
  },
];

const data = [
  { date: "Monday", productiveHours: 6.5 },
  { date: "Tuesday", productiveHours: 7.2 },
  { date: "Wednesday", productiveHours: 5.8 },
  { date: "Thursday", productiveHours: 8.1 },
  { date: "Friday", productiveHours: 6.9 },
  { date: "Saturday", productiveHours: 4.2 },
  { date: "Sunday", productiveHours: 2.5 },
];

const logs = [
  { time: "09:05", action: "Alice Johnson logged in", app: "Workzen Dashboard" },
  { time: "09:10", action: "Bob Smith opened Figma", app: "Figma" },
  { time: "09:15", action: "Carol Davis started coding", app: "VS Code" },
  { time: "10:30", action: "David Wilson joined meeting", app: "Zoom" },
  { time: "11:00", action: "Emma Brown updated project", app: "Notion" },
  { time: "13:00", action: "Alice Johnson break", app: "-" },
  { time: "14:20", action: "Bob Smith resumed work", app: "Figma" },
  { time: "15:45", action: "Frank Miller submitted report", app: "Google Docs" },
];

export default function DashboardPage() {
  const [isAssistantExpanded, setIsAssistantExpanded] = useState(true);

  return (
    <Layout>
      <ZenAssistant 
        userData={users[0]} 
        isExpanded={isAssistantExpanded}
        onToggle={() => setIsAssistantExpanded(!isAssistantExpanded)}
      />
      <ZenDashboard users={users} data={data} />
      <ActivityLog logs={logs} />
    </Layout>
  );
}