import { useRouter } from "next/router";
import { Box, Heading, Text, Badge, Avatar, VStack, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import ProductivityChart from "../../components/ProductivityChart";
import ActivityLog from "../../components/ActivityLog";
import PieChart from "../../components/PieChartNew";
import Layout from "../../components/Layout";

const employees = [
  { id: "1", name: "Alice Johnson", position: "Senior Developer", status: "Active", productivity: 90, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alice", 
    focusTime: 7.5, restTime: 0.5, distractedTime: 0.2, 
    skills: { Frontend: 85, Backend: 92, DevOps: 70, Testing: 88 },
    activity: [
    { time: "09:05", action: "Logged in", app: "Workzen Dashboard" },
    { time: "09:10", action: "Opened VS Code", app: "VS Code" },
    { time: "13:00", action: "Break", app: "-" },
    { time: "13:30", action: "Resumed work", app: "GitHub" },
  ], productivityData: [
    { date: "Monday", productiveHours: 6 },
    { date: "Tuesday", productiveHours: 7 },
    { date: "Wednesday", productiveHours: 5 },
    { date: "Thursday", productiveHours: 8 },
    { date: "Friday", productiveHours: 6 },
  ] },
  { id: "2", name: "Bob Martinez", position: "UX Designer", status: "Inactive", productivity: 75, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bob", 
    focusTime: 5.8, restTime: 0.8, distractedTime: 0.5,
    skills: { Design: 88, Prototyping: 82, Research: 75, Collaboration: 90 },
    activity: [
    { time: "10:00", action: "Logged in", app: "Workzen Dashboard" },
    { time: "10:10", action: "Opened Figma", app: "Figma" },
    { time: "14:00", action: "Break", app: "-" },
  ], productivityData: [
    { date: "Monday", productiveHours: 3 },
    { date: "Tuesday", productiveHours: 5 },
    { date: "Wednesday", productiveHours: 4 },
    { date: "Thursday", productiveHours: 6 },
    { date: "Friday", productiveHours: 3 },
  ] },
  { id: "3", name: "Carol Smith", position: "Product Manager", status: "Active", productivity: 85, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carol", 
    focusTime: 6.9, restTime: 0.6, distractedTime: 0.3,
    skills: { Strategy: 92, Communication: 95, Analytics: 78, Leadership: 88 },
    activity: [
    { time: "08:30", action: "Logged in", app: "Workzen Dashboard" },
    { time: "09:00", action: "Meeting", app: "Zoom" },
    { time: "14:30", action: "Document review", app: "Google Docs" },
  ], productivityData: [
    { date: "Monday", productiveHours: 7 },
    { date: "Tuesday", productiveHours: 6 },
    { date: "Wednesday", productiveHours: 8 },
    { date: "Thursday", productiveHours: 7 },
    { date: "Friday", productiveHours: 5 },
  ] },
  { id: "4", name: "David Wilson", position: "Backend Developer", status: "Active", productivity: 92, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=David", 
    focusTime: 8.2, restTime: 0.4, distractedTime: 0.1,
    skills: { Backend: 95, Database: 88, API: 92, Security: 85 },
    activity: [
    { time: "08:00", action: "Logged in", app: "Workzen Dashboard" },
    { time: "08:15", action: "Code review", app: "GitHub" },
    { time: "12:00", action: "Lunch break", app: "-" },
  ], productivityData: [
    { date: "Monday", productiveHours: 8 },
    { date: "Tuesday", productiveHours: 7 },
    { date: "Wednesday", productiveHours: 8 },
    { date: "Thursday", productiveHours: 9 },
    { date: "Friday", productiveHours: 7 },
  ] },
  { id: "5", name: "Emma Brown", position: "Frontend Developer", status: "Active", productivity: 88, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma", 
    focusTime: 7.1, restTime: 0.6, distractedTime: 0.3,
    skills: { Frontend: 92, React: 95, CSS: 88, JavaScript: 90 },
    activity: [
    { time: "09:15", action: "Logged in", app: "Workzen Dashboard" },
    { time: "09:30", action: "UI development", app: "VS Code" },
    { time: "15:00", action: "Testing", app: "Browser" },
  ], productivityData: [
    { date: "Monday", productiveHours: 6 },
    { date: "Tuesday", productiveHours: 8 },
    { date: "Wednesday", productiveHours: 7 },
    { date: "Thursday", productiveHours: 6 },
    { date: "Friday", productiveHours: 8 },
  ] },
  { id: "6", name: "Frank Davis", position: "DevOps Engineer", status: "Active", productivity: 80, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Frank", 
    focusTime: 6.5, restTime: 1.0, distractedTime: 0.5,
    skills: { DevOps: 88, Cloud: 85, Automation: 92, Monitoring: 80 },
    activity: [
    { time: "07:45", action: "Logged in", app: "Workzen Dashboard" },
    { time: "08:00", action: "Server monitoring", app: "AWS Console" },
    { time: "16:30", action: "Deployment", app: "Jenkins" },
  ], productivityData: [
    { date: "Monday", productiveHours: 5 },
    { date: "Tuesday", productiveHours: 6 },
    { date: "Wednesday", productiveHours: 7 },
    { date: "Thursday", productiveHours: 5 },
    { date: "Friday", productiveHours: 6 },
  ] },
];

export default function EmployeeDetails() {
  const router = useRouter();
  const { id } = router.query;
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "white");

  const employee = employees.find(e => e.id === id);

  if (!employee) {
    return (
      <Layout>
        <Box>
          <Heading>Employee not found</Heading>
        </Box>
      </Layout>
    );
  }
  return (
    <Layout>
      <Box bg={cardBg} borderRadius="lg" boxShadow="md" p={8} mb={8}>
        <SimpleGrid columns={[1, 2]} spacing={8} alignItems="center">
          <Avatar name={employee.name} src={employee.avatar} size="2xl" />
          <VStack align="flex-start" spacing={2}>
            <Heading color={textColor}>{employee.name}</Heading>
            <Text fontSize="lg" color={textColor}>{employee.position}</Text>
            <Badge colorScheme={employee.status === "Active" ? "green" : "red"}>{employee.status}</Badge>
            <Text color={textColor}>Productivity: <b>{employee.productivity}%</b></Text>
          </VStack>
        </SimpleGrid>
      </Box>      <Box mb={8}>
        <Heading size="md" mb={4} color={textColor}>Personal Productivity</Heading>
        <ProductivityChart 
          data={employee.productivityData} 
          title="Personal Productivity"
          variant="composed"
          showStats={true}
          height={380}
        />
      </Box>{/* Charts Section */}
      <SimpleGrid columns={[1, null, 2]} spacing={8} mb={8}>
        <Box h="380px">
          <PieChart 
            data={[
              { name: "Focus Time", value: employee.focusTime },
              { name: "Rest Time", value: employee.restTime },
              { name: "Distracted Time", value: employee.distractedTime }
            ]}
            title="Time Distribution"
            size="sm"
          />
        </Box>
        
        <Box h="380px">
          <PieChart 
            data={Object.entries(employee.skills).map(([skill, value]) => ({ 
              name: skill, 
              value: value 
            }))}
            title="Skills Assessment"
            size="sm"
          />
        </Box>
      </SimpleGrid>

      <Box>
        <Heading size="md" mb={4} color={textColor}>Recent Activity</Heading>
        <ActivityLog logs={employee.activity} />
      </Box>
    </Layout>
  );
}