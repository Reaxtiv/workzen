import { 
  Box, 
  Heading, 
  SimpleGrid, 
  VStack, 
  Text, 
  Badge,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Button,
  Select,
  InputGroup,
  Input,
  InputLeftElement,
  Avatar,
  CircularProgress,
  CircularProgressLabel,
  Progress,
  Divider,
  Tooltip
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  FaUsers, 
  FaChartLine, 
  FaClock, 
  FaSearch,
  FaDownload,
  FaLeaf,
  FaHeart,
  FaShieldAlt,
  FaMedal,
  FaFire,
  FaWater,
  FaArrowUp,
  FaTrophy,
  FaUser,
  FaUserTie,
  FaUserNinja,
  FaUserGraduate,
  FaUserSecret,
  FaUserEdit
} from "react-icons/fa";
import ProductivityChart from "./ProductivityChart";
import PieChart from "./PieChartNew";

const MotionBox = motion(Box);

const chartData = [
  { date: "Monday", productiveHours: 6.5 },
  { date: "Tuesday", productiveHours: 7.2 },
  { date: "Wednesday", productiveHours: 5.8 },
  { date: "Thursday", productiveHours: 8.1 },
  { date: "Friday", productiveHours: 6.9 },
  { date: "Saturday", productiveHours: 4.2 },
  { date: "Sunday", productiveHours: 2.5 },
];

function ZenUserCard({ user }) {
  const bg = useColorModeValue("white", "zen.800");
  const borderColor = useColorModeValue("zen.200", "zen.700");
  const textColor = useColorModeValue("zen.600", "zen.300");

  const getStatusColor = (status) => {
    switch (status) {
      case "excellent": return "green";
      case "good": return "blue";
      case "improving": return "orange";
      case "needs-focus": return "red";
      default: return "gray";
    }
  };

  const getStatusIcon = (zenLevel) => {
    if (zenLevel.includes("Master")) return FaUserNinja;
    if (zenLevel.includes("Balanced")) return FaUserGraduate;
    if (zenLevel.includes("Steady")) return FaUserTie;
    if (zenLevel.includes("Growing")) return FaUser;
    return FaUserEdit;
  };

  const IconComponent = getStatusIcon(user.zenLevel);

  return (
    <MotionBox
      whileHover={{ y: -4, boxShadow: "0 8px 25px rgba(82, 160, 82, 0.15)" }}
      transition={{ duration: 0.2 }}
    >
      <Box
        bg={bg}
        p={6}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top={0}
          right={0}
          w="100px"
          h="100px"
          borderRadius="full"
          bg={useColorModeValue("zen.100", "zen.700")}
          opacity={0.3}
          transform="translate(30px, -30px)"
        />
        
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between" align="flex-start">
            <HStack spacing={3}>
              <Avatar
                name={user.name}
                src={user.avatar}
                size="md"
                border="3px solid"
                borderColor="zen.400"
                boxShadow="0 4px 12px rgba(82, 160, 82, 0.2)"
              />
              <VStack align="flex-start" spacing={0}>
                <Text fontWeight="bold" fontSize="lg">
                  {user.name}
                </Text>
                <HStack spacing={1}>
                  <Icon as={IconComponent} w={4} h={4} color="zen.500" />
                  <Text fontSize="sm" color={textColor}>
                    {user.zenLevel}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <Badge 
              colorScheme={getStatusColor(user.status)} 
              variant="subtle"
              px={3}
              py={1}
              borderRadius="full"
              textTransform="capitalize"
            >
              {user.status}
            </Badge>
          </HStack>

          <SimpleGrid columns={3} spacing={4}>
            <VStack spacing={1}>
              <CircularProgress 
                value={user.productivity} 
                color="zen.500" 
                size="50px"
                thickness="6px"
              >
                <CircularProgressLabel fontSize="xs" fontWeight="bold">
                  {user.productivity}%
                </CircularProgressLabel>
              </CircularProgress>
              <Text fontSize="xs" color={textColor}>Productivity</Text>
            </VStack>
            
            <VStack spacing={1}>
              <Flex align="center" justify="center" w="50px" h="50px">
                <VStack spacing={0}>
                  <Text fontSize="lg" fontWeight="bold" color="zen.500">
                    {user.todayHours}
                  </Text>
                  <Text fontSize="xs" color={textColor}>hrs</Text>
                </VStack>
              </Flex>
              <Text fontSize="xs" color={textColor}>Today</Text>
            </VStack>
            
            <VStack spacing={1}>
              <Flex align="center" justify="center" w="50px" h="50px">
                <VStack spacing={0}>
                  <Icon as={FaFire} w={6} h={6} color="orange.400" />
                  <Text fontSize="xs" color={textColor}>{user.rewards?.length || 0}</Text>
                </VStack>
              </Flex>
              <Text fontSize="xs" color={textColor}>Rewards</Text>
            </VStack>
          </SimpleGrid>

          <Box>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium">Focus Balance</Text>
              <Text fontSize="sm" color="zen.500">
                {((user.focusTime / user.todayHours) * 100).toFixed(0)}%
              </Text>
            </HStack>
            <Progress 
              value={(user.focusTime / user.todayHours) * 100} 
              colorScheme="zen" 
              size="sm" 
              borderRadius="full"
            />
          </Box>
        </VStack>
      </Box>
    </MotionBox>
  );
}

function StatCard({ icon, label, value, change, color = "zen" }) {
  const bg = useColorModeValue("white", "zen.800");
  const borderColor = useColorModeValue("zen.200", "zen.700");
  const iconBg = useColorModeValue(`${color}.50`, `${color}.900`);
  const iconColor = useColorModeValue(`${color}.500`, `${color}.300`);

  return (
    <MotionBox
      whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(82, 160, 82, 0.15)" }}
      transition={{ duration: 0.2 }}
    >
      <Box
        bg={bg}
        p={6}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      >
        <HStack spacing={4}>
          <Flex
            w={12}
            h={12}
            bg={iconBg}
            borderRadius="xl"
            align="center"
            justify="center"
          >
            <Icon as={icon} w={6} h={6} color={iconColor} />
          </Flex>
          
          <VStack align="flex-start" spacing={0} flex={1}>
            <Text fontSize="2xl" fontWeight="bold" color={iconColor}>
              {value}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {label}
            </Text>
          </VStack>
          
          {change && (
            <VStack align="flex-end" spacing={0}>
              <HStack spacing={1}>
                <Icon 
                  as={FaArrowUp} 
                  w={3} 
                  h={3} 
                  color={change > 0 ? "green.500" : "red.500"}
                  transform={change < 0 ? "rotate(180deg)" : "none"}
                />
                <Text fontSize="sm" color={change > 0 ? "green.500" : "red.500"}>
                  {Math.abs(change)}%
                </Text>
              </HStack>
              <Text fontSize="xs" color="gray.400">vs last week</Text>
            </VStack>
          )}
        </HStack>
      </Box>
    </MotionBox>
  );
}

export default function ZenDashboard({ users, data }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const bg = useColorModeValue("zen.50", "zen.900");
  const borderColor = useColorModeValue("zen.200", "zen.700");

  const topUsers = [...users]
    .sort((a, b) => b.productivity - a.productivity)
    .slice(0, 3);

  const dashboardUsers = users.slice(0, 6);

  const totalUsers = users.length;
  const avgProductivity = Math.round(users.reduce((sum, user) => sum + user.productivity, 0) / users.length);
  const totalHours = users.reduce((sum, user) => sum + user.todayHours, 0);
  const avgFocusTime = Math.round(users.reduce((sum, user) => sum + user.focusTime, 0) / users.length * 10) / 10;

  if (!isClient) {
    return (
      <Box p={8} bg={bg} borderRadius="2xl" mb={8}>
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="400px">
          <Text fontSize="xl" color="zen.600">Loading dashboard...</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={8} bg={bg} borderRadius="2xl" mb={8}>
      <VStack spacing={8} align="stretch">        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading 
            size="2xl" 
            bgGradient="linear(to-r, zen.600, mindful.500)" 
            bgClip="text"
            css={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Dashboard
          </Heading>
        </MotionBox>

        {/* Stats Overview */}
        <SimpleGrid columns={[1, 2, 4]} spacing={6}>
          <StatCard 
            icon={FaUsers} 
            label="Team Members" 
            value={totalUsers}
            change={8}
            color="blue"
          />
          <StatCard 
            icon={FaChartLine} 
            label="Avg Productivity" 
            value={`${avgProductivity}%`}
            change={12}
            color="green"
          />
          <StatCard 
            icon={FaClock} 
            label="Total Hours Today" 
            value={totalHours.toFixed(1)}
            change={-3}
            color="orange"
          />
          <StatCard 
            icon={FaLeaf} 
            label="Avg Focus Time" 
            value={`${avgFocusTime}h`}
            change={15}
            color="teal"
          />
        </SimpleGrid>

        {/* Team Members */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <VStack spacing={4} align="stretch">
            <Heading size="lg" color="zen.700">
              🌟 Team Mindfulness
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
              {dashboardUsers.map((user, index) => (
                <MotionBox
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <ZenUserCard user={user} />
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </MotionBox>

        {/* All Pie Charts Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >          <Box mb={6}>
            <Heading size="lg" color="zen.700" textAlign="center" mb={2}>Team Analytics Dashboard</Heading>
            <Text color="zen.500" fontSize="md" textAlign="center">
              Comprehensive insights into team performance and well-being
            </Text>
          </Box>
            <SimpleGrid columns={[1, 2, 2, 4]} spacing={6} mb={8}>
            {/* Team Status Distribution */}
            <Box h="420px">
              <PieChart 
                data={[
                  { name: "Excellent", value: users.filter(u => u.status === "excellent").length },
                  { name: "Good", value: users.filter(u => u.status === "good").length },
                  { name: "Improving", value: users.filter(u => u.status === "improving").length },
                  { name: "Needs Focus", value: users.filter(u => u.status === "needs-focus").length }
                ].filter(item => item.value > 0)}
                title="Team Status"
                size="sm"
              />
            </Box>
            
            {/* Time Distribution */}
            <Box h="420px">
              <PieChart 
                data={[
                  { 
                    name: "Focus Time", 
                    value: Math.round(users.reduce((sum, user) => sum + user.focusTime, 0) / users.length * 10) / 10
                  },
                  { 
                    name: "Rest Time", 
                    value: Math.round(users.reduce((sum, user) => sum + user.restTime, 0) / users.length * 10) / 10
                  },
                  { 
                    name: "Distracted Time", 
                    value: Math.round(users.reduce((sum, user) => sum + user.distractedTime, 0) / users.length * 10) / 10
                  }
                ]}
                title="Time Distribution"
                size="sm"
              />
            </Box>
            
            {/* Zen Level Distribution */}
            <Box h="420px">
              <PieChart 
                data={[
                  { name: "Mindful Masters", value: users.filter(u => u.zenLevel.includes("Master")).length },
                  { name: "Balanced Achievers", value: users.filter(u => u.zenLevel.includes("Balanced")).length },
                  { name: "Steady Flow", value: users.filter(u => u.zenLevel.includes("Steady")).length },
                  { name: "Growing Mindfully", value: users.filter(u => u.zenLevel.includes("Growing")).length }
                ].filter(item => item.value > 0)}
                title="Zen Levels"
                size="sm"
              />
            </Box>
            
            {/* Productivity Ranges */}
            <Box h="420px">
              <PieChart 
                data={[
                  { name: "High (90-100%)", value: users.filter(u => u.productivity >= 90).length },
                  { name: "Good (80-89%)", value: users.filter(u => u.productivity >= 80 && u.productivity < 90).length },
                  { name: "Average (70-79%)", value: users.filter(u => u.productivity >= 70 && u.productivity < 80).length },
                  { name: "Low (<70%)", value: users.filter(u => u.productivity < 70).length }
                ].filter(item => item.value > 0)}
                title="Productivity Ranges"
                size="sm"
              />
            </Box>
          </SimpleGrid>
        </MotionBox>

        {/* Weekly Productivity Chart */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >          <Box
            bg={useColorModeValue("white", "zen.800")}
            p={6}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          >
            <ProductivityChart 
              data={chartData} 
              title="Weekly Zen Flow"
              variant="composed"
              showStats={true}
              height={420}
            />
          </Box>
        </MotionBox>

        {/* Top Performers Ranking */}
        <MotionBox
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Box
            bg={useColorModeValue("white", "zen.800")}
            p={6}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          >
            <Flex justify="space-between" align="center" mb={6}>
              <VStack align="flex-start" spacing={1}>
                <Heading size="md" color="zen.700">🏆 Zen Masters</Heading>
                <Text color="zen.500" fontSize="sm">
                  Highest mindfulness this week
                </Text>
              </VStack>
              <Icon as={FaLeaf} color="zen.500" w={6} h={6} />
            </Flex>
            
            <VStack spacing={4} align="stretch">
              {topUsers.map((user, idx) => (
                <MotionBox
                  key={user.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <Flex
                    align="center"
                    justify="space-between"
                    p={3}
                    borderRadius="lg"
                    bg={useColorModeValue("zen.50", "zen.700")}
                    border="1px solid"
                    borderColor="zen.200"
                  >
                    <HStack spacing={3}>
                      <Badge
                        colorScheme={idx === 0 ? "yellow" : idx === 1 ? "gray" : "orange"}
                        fontSize="sm"
                        px={2}
                        py={1}
                        borderRadius="full"
                      >
                        #{idx + 1}
                      </Badge>
                      <Avatar
                        name={user.name}
                        src={user.avatar}
                        size="sm"
                        border="2px solid"
                        borderColor="zen.300"
                      />
                      <VStack align="flex-start" spacing={0}>
                        <Text fontWeight="semibold" fontSize="sm">
                          {user.name}
                        </Text>
                        <Text fontSize="xs" color="zen.500">
                          {user.zenLevel}
                        </Text>
                      </VStack>
                    </HStack>
                    <VStack align="flex-end" spacing={0}>
                      <Text fontWeight="bold" color="zen.500">
                        {user.productivity}%
                      </Text>
                      <Text fontSize="xs" color="zen.400">
                        +{Math.floor(Math.random() * 10)}% this week
                      </Text>
                    </VStack>
                  </Flex>
                </MotionBox>
              ))}
            </VStack>
          </Box>
        </MotionBox>

        {/* Blockchain section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Box
            bg={useColorModeValue("white", "zen.800")}
            p={6}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          >
            <HStack spacing={4} mb={4}>
              <Icon as={FaShieldAlt} w={6} h={6} color="zen.500" />
              <VStack align="flex-start" spacing={0}>
                <Heading size="md" color="zen.700">
                  🔗 Blockchain Transparency
                </Heading>
                <Text fontSize="sm" color="zen.600">
                  Your mindful productivity is immutably stored for career verification
                </Text>
              </VStack>
            </HStack>
            
            <SimpleGrid columns={[2, 4]} spacing={6}>
              <Box textAlign="center" p={4} bg={useColorModeValue("zen.50", "zen.700")} borderRadius="lg">
                <Text fontSize="2xl" fontWeight="bold" color="zen.500">
                  2,847
                </Text>
                <Text fontSize="xs" color="zen.500">Blocks mined</Text>
              </Box>
              <Box textAlign="center" p={4} bg={useColorModeValue("mindful.50", "mindful.700")} borderRadius="lg">
                <Text fontSize="2xl" fontWeight="bold" color="mindful.500">
                  98.2%
                </Text>
                <Text fontSize="xs" color="mindful.500">Verification rate</Text>
              </Box>
              <Box textAlign="center" p={4} bg={useColorModeValue("teal.50", "teal.700")} borderRadius="lg">
                <Text fontSize="2xl" fontWeight="bold" color="teal.500">
                  156
                </Text>
                <Text fontSize="xs" color="teal.500">Smart contracts</Text>
              </Box>
              <Box textAlign="center" p={4} bg={useColorModeValue("purple.50", "purple.700")} borderRadius="lg">
                <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                  1,247
                </Text>
                <Text fontSize="xs" color="purple.500">Lifetime achievement</Text>
              </Box>
            </SimpleGrid>
          </Box>
        </MotionBox>
      </VStack>
    </Box>
  );
}