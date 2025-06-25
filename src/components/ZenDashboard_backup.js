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
import PieChart from "./PieChart";

const MotionBox = motion(Box);

// Datos completos como en el dashboard original
const users = [
  { 
    id: 1, 
    name: "Alice Johnson", 
    productivity: 92, 
    zenLevel: "Mindful Master",
    todayHours: 7.5,
    focusTime: 6.2,
    restTime: 1.3,
    distractedTime: 0.8,
    rewards: ["2h Extra Rest", "Zen Badge"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alice",
    gender: "female",
    status: "excellent"
  },
  { 
    id: 2, 
    name: "Bob Smith", 
    productivity: 78, 
    zenLevel: "Flow State",
    todayHours: 8.2,
    focusTime: 7.8,
    restTime: 0.4,
    distractedTime: 0.6,
    rewards: ["Half Day Off", "Productivity Champion"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bob",
    gender: "male",
    status: "good"
  },
  { 
    id: 3, 
    name: "Carol Davis", 
    productivity: 85, 
    zenLevel: "Growing Mindfully",
    todayHours: 6.8,
    focusTime: 5.4,
    restTime: 1.1,
    distractedTime: 1.2,
    rewards: ["1h Flex Time"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carol",
    gender: "female",
    status: "excellent"
  },
  { 
    id: 4, 
    name: "David Wilson", 
    productivity: 65, 
    zenLevel: "Beginning Journey",
    todayHours: 7.0,
    focusTime: 4.5,
    restTime: 1.5,
    distractedTime: 1.0,
    rewards: ["Mindfulness Session"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=David",
    gender: "male",
    status: "average"
  },
  { 
    id: 5, 
    name: "Emma Brown",
    productivity: 88, 
    zenLevel: "Balanced Flow",
    todayHours: 7.8,
    focusTime: 6.8,
    restTime: 0.7,
    distractedTime: 0.3,    rewards: ["Wellness Day", "Focus Master"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma",
    gender: "female",
    status: "excellent"
  },
  { 
    id: 6, 
    name: "Frank Miller", 
    productivity: 73, 
    zenLevel: "Steady Growth",
    todayHours: 6.5,
    focusTime: 4.8,
    restTime: 1.2,
    distractedTime: 0.5,
    rewards: ["Progress Badge"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Frank",
    gender: "male",
    status: "good"
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

function ZenUserCard({ user }) {
  const bg = useColorModeValue("white", "zen.800");
  const borderColor = useColorModeValue("zen.200", "zen.700");
  const textColor = useColorModeValue("zen.600", "zen.300");
  
  const getProductivityColor = (productivity) => {
    if (productivity >= 85) return "zen";
    if (productivity >= 70) return "serenity";
    if (productivity >= 50) return "mindful";
    return "warning";
  };

  const getStatusBadge = (productivity) => {
    if (productivity >= 85) return { label: "Excellent", color: "zen" };
    if (productivity >= 70) return { label: "Good", color: "serenity" };
    if (productivity >= 50) return { label: "Average", color: "mindful" };
    return { label: "Needs Focus", color: "warning" };
  };

  const status = getStatusBadge(user.productivity);
  const productivityColor = getProductivityColor(user.productivity);

  return (
    <MotionBox
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >      <Box
        bg={bg}
        borderRadius="xl"
        p={6}
        border="1px solid"
        borderColor={borderColor}
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        _hover={{
          boxShadow: "0 10px 25px -5px rgba(56, 142, 60, 0.1), 0 10px 10px -5px rgba(56, 142, 60, 0.04)",
          borderColor: `${productivityColor}.300`,
        }}
        transition="all 0.3s ease"
        position="relative"
        overflow="hidden"
      >
        {/* Gradient top border zen */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="3px"
          bgGradient={`linear(to-r, ${productivityColor}.400, ${productivityColor}.600)`}
        />        <Flex justify="space-between" align="flex-start" mb={4}>
          <HStack spacing={3}>
            <Avatar 
              src={user.avatar}
              name={user.name}
              size="md"
              border="2px solid"
              borderColor="zen.400"
              boxShadow="0 2px 8px rgba(82, 160, 82, 0.2)"
            />            <VStack align="flex-start" spacing={1}>
              <Text fontWeight="bold" fontSize="lg" lineHeight="shorter">
                {user.name}
              </Text><Badge 
                colorScheme={status.color} 
                variant="subtle" 
                borderRadius="full"
                px={2}
                py={1}
                fontSize="2xs"
              >
                {status.label}
              </Badge>              <Text fontSize="xs" color={textColor}>
                {user.zenLevel}
              </Text>
            </VStack>
          </HStack>

          <Tooltip label={`${user.productivity}% Productivity`} placement="top">            <CircularProgress 
              value={user.productivity} 
              color={`${productivityColor}.500`}
              size="60px"
              thickness="8px"
            >
              <CircularProgressLabel fontSize="sm" fontWeight="bold">
                {user.productivity}%
              </CircularProgressLabel>
            </CircularProgress>
          </Tooltip>
        </Flex>

        {/* Progress Bar */}
        <VStack spacing={2} align="stretch">          <HStack justify="space-between">
            <Text fontSize="sm" color={textColor} fontWeight="medium">
              Weekly Zen Progress
            </Text>
            <Text fontSize="sm" color={`${productivityColor}.500`} fontWeight="bold">
              {user.productivity}%
            </Text>
          </HStack>
          <Progress 
            value={user.productivity} 
            size="md" 
            colorScheme={productivityColor}
            borderRadius="full"
            bg={useColorModeValue("zen.100", "zen.700")}
          />
        </VStack>

        {/* Additional metrics zen style */}
        <HStack spacing={4} mt={4} pt={4} borderTop="1px solid" borderColor={borderColor}>          <Tooltip label="Hours Today">
            <HStack spacing={1}>
              <Icon as={FaClock} w={4} h={4} color={textColor} />
              <Text fontSize="sm" color={textColor}>{user.todayHours}h</Text>
            </HStack>
          </Tooltip>
          
          <Tooltip label="This Week Trend">
            <HStack spacing={1}>
              <Icon as={FaArrowUp} w={4} h={4} color="zen.500" />
              <Text fontSize="sm" color="zen.500">+5%</Text>
            </HStack>
          </Tooltip>

          <Tooltip label="Achievements">
            <HStack spacing={1}>
              <Icon as={FaTrophy} w={4} h={4} color="mindful.500" />
              <Text fontSize="sm" color={textColor}>{user.rewards?.length || 0}</Text>
            </HStack>
          </Tooltip>
        </HStack>

        {/* Rewards section */}
        {user.rewards && user.rewards.length > 0 && (
          <VStack align="stretch" spacing={2} mt={4} pt={4} borderTop="1px solid" borderColor={borderColor}>            <HStack>
              <Icon as={FaMedal} w={4} h={4} color="mindful.500" />
              <Text fontSize="sm" fontWeight="semibold">Earned Rewards</Text>
            </HStack>
            <VStack spacing={1}>
              {user.rewards.slice(0, 2).map((reward, index) => (                <Badge 
                  key={index}
                  colorScheme="mindful" 
                  variant="outline"
                  size="sm"
                  w="100%"
                  textAlign="center"
                  py={1}
                  fontSize="xs"
                >
                  {reward}
                </Badge>
              ))}
            </VStack>
          </VStack>
        )}
      </Box>
    </MotionBox>
  );
}

function ZenMetricCard({ title, value, change, changeType = "increase", icon: IconComponent, color = "zen", description, ...props }) {
  const bg = useColorModeValue("white", "zen.800");
  const borderColor = useColorModeValue("zen.200", "zen.700");
  const iconBg = useColorModeValue(`${color}.50`, `${color}.900`);
  const iconColor = useColorModeValue(`${color}.500`, `${color}.300`);

  const getTrendColor = () => {
    switch(changeType) {
      case "increase": return "zen.500";
      case "decrease": return "warning.500";
      default: return "zen.500";
    }
  };

  return (
    <MotionBox
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >      <Box
        bg={bg}
        p={6}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        _hover={{
          boxShadow: "0 10px 15px -3px rgba(56, 142, 60, 0.1), 0 4px 6px -2px rgba(56, 142, 60, 0.05)",
          borderColor: `${color}.300`,
        }}
        transition="all 0.2s"
        position="relative"
        overflow="hidden"
        {...props}
      >
        {/* Gradient overlay zen */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="3px"
          bgGradient={`linear(to-r, ${color}.400, ${color}.600)`}
        />
        
        <Flex justify="space-between" align="flex-start" mb={4}>          <Box>
            <Text fontSize="sm" fontWeight="medium" color="zen.500" mb={1}>
              {title}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color={`${color}.600`}>
              {value}
            </Text>
          </Box>          {IconComponent && (
            <Flex
              w={12}
              h={12}
              bg={iconBg}
              borderRadius="lg"
              align="center"
              justify="center"
            >
              <Icon as={IconComponent} w={6} h={6} color={iconColor} />
            </Flex>
          )}
        </Flex>

        {(change || description) && (
          <Flex justify="space-between" align="center">            {change && (
              <Flex align="center" gap={1}>
                <Icon as={FaArrowUp} w={4} h={4} color={getTrendColor()} />
                <Text fontSize="sm" color={getTrendColor()} fontWeight="medium">
                  {change}
                </Text>
              </Flex>
            )}
            
            {description && (
              <Text fontSize="xs" color="zen.500">
                {description}
              </Text>
            )}
          </Flex>
        )}
      </Box>
    </MotionBox>
  );
}

export default function ZenDashboardComplete({ users: propUsers, data: propData }) {
  const bg = useColorModeValue("zen.50", "zen.900");
  const borderColor = useColorModeValue("zen.200", "zen.700");
  
  // Usar datos pasados como props o datos por defecto
  const dashboardUsers = propUsers || users;
  const chartData = propData || data;
  
  // Ranking: sort users by productivity
  const topUsers = [...dashboardUsers].sort((a, b) => b.productivity - a.productivity).slice(0, 5);
  
  // Calculate metrics
  const avgProductivity = Math.round(dashboardUsers.reduce((sum, user) => sum + user.productivity, 0) / dashboardUsers.length);
  const totalUsers = dashboardUsers.length;
  const activeUsers = dashboardUsers.filter(user => user.productivity > 50).length;
  const weeklyHours = chartData.reduce((sum, day) => sum + day.productiveHours, 0);

  const metrics = [
    {
      title: "Total Employees",
      value: totalUsers,
      change: "+12% this month",
      changeType: "increase",
      icon: FaUsers,
      color: "zen",
      description: "Active team members"
    },
    {
      title: "Avg Zen Score",
      value: `${avgProductivity}%`,
      change: "+8% from last week",
      changeType: "increase",
      icon: FaLeaf,
      color: "zen",
      description: "Team mindfulness"
    },
    {
      title: "Weekly Hours",
      value: `${weeklyHours.toFixed(1)}h`,
      change: "+5% this week",
      changeType: "increase",
      icon: FaClock,
      color: "serenity",
      description: "Productive time"
    },
    {
      title: "Goals Met",
      value: "87%",
      change: "+15% this month",
      changeType: "increase",
      icon: FaFire,
      color: "mindful",
      description: "Monthly targets"
    }
  ];  return (
    <Box bgGradient="linear(135deg, zen.50 0%, mindful.100 30%, zen.100 100%)" minH="100vh">
      <VStack spacing={8} align="stretch" p={8}>        {/* Header Section zen style */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Flex justify="space-between" align="center" mb={8}>            <VStack align="flex-start" spacing={2}>
              <Heading 
                size="2xl" 
                bgGradient="linear(to-r, zen.500, serenity.500)" 
                bgClip="text"
                fontWeight="bold"
              >
                Dashboard
              </Heading>
            </VStack>
            
            <HStack spacing={3}>
              <InputGroup maxW="300px">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaSearch} color="zen.400" />
                </InputLeftElement>
                <Input 
                  placeholder="Search employees..." 
                  borderRadius="lg" 
                  borderColor="zen.200"
                  _focus={{ borderColor: "zen.500", boxShadow: "0 0 0 1px #388E3C" }}
                />
              </InputGroup>
              
              <Select placeholder="Filter by zen level" maxW="200px" borderRadius="lg" borderColor="zen.200">
                <option value="all">All Levels</option>
                <option value="master">Mindful Master</option>
                <option value="flow">Flow State</option>
                <option value="growing">Growing</option>
              </Select>
              
              <Button 
                leftIcon={<FaDownload />} 
                colorScheme="zen" 
                variant="outline"
                borderRadius="lg"
              >
                Export
              </Button>
            </HStack>
          </Flex>
        </MotionBox>

        {/* Metrics Grid zen */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={8}>
            {metrics.map((metric, index) => (
              <ZenMetricCard 
                key={metric.title}
                {...metric}
                delay={index * 0.1}
              />
            ))}
          </SimpleGrid>
        </MotionBox>

        {/* User Cards Grid zen */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          mb={8}
        >
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="lg" color="zen.700">🌱 Mindful Team Members</Heading>
            <Badge colorScheme="zen" variant="subtle" px={3} py={1} borderRadius="full">
              {dashboardUsers.length} Active
            </Badge>
          </Flex>
          
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
        </MotionBox>        {/* Charts and Analytics zen */}
        {/* All Pie Charts Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          mb={8}
        >
          <Box mb={6}>
            <Heading size="lg" color="zen.700" textAlign="center" mb={2}>Team Analytics Dashboard</Heading>
            <Text color="zen.500" fontSize="md" textAlign="center">
              Comprehensive insights into team performance and well-being
            </Text>
          </Box>
          
          <SimpleGrid columns={[1, null, 2, 4]} spacing={6}>
            {/* Team Status Distribution */}
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
            
            {/* Time Distribution */}
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
            
            {/* Zen Level Distribution */}
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
            
            {/* Productivity Ranges */}
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
          </SimpleGrid>
        </MotionBox>

        {/* Weekly Productivity Chart */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          mb={8}
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
                <Heading size="md" color="zen.700">Weekly Zen Flow</Heading>
                <Text color="zen.500" fontSize="sm">
                  Mindful hours tracked this week
                </Text>
              </VStack>
              <Badge colorScheme="zen" variant="subtle" px={3} py={1} borderRadius="full">
                +8% vs last week
              </Badge>
            </Flex>
            <ProductivityChart data={chartData} />
          </Box>
        </MotionBox>        {/* Top Performers Ranking */}
        <MotionBox
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          mb={8}
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
        </MotionBox><Box
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
                    transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
                  >                    <Flex justify="space-between" align="center" p={3} borderRadius="lg" bg={useColorModeValue("zen.50", "zen.700")}>
                      <HStack spacing={3}>
                        <Flex
                          w={8}
                          h={8}
                          bg={idx === 0 ? "mindful.500" : idx === 1 ? "zen.400" : "serenity.500"}
                          borderRadius="full"
                          align="center"
                          justify="center"
                          fontSize="sm"
                          fontWeight="bold"
                          color="white"
                        >
                          #{idx + 1}
                        </Flex>
                        <VStack align="flex-start" spacing={0}>
                          <Text fontWeight="semibold">{user.name}</Text>
                          <Text fontSize="sm" color="zen.500">
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
                ))}              </VStack>
            </Box>          </MotionBox>

        {/* Blockchain section zen */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >          <Box
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
            
            <SimpleGrid columns={[1, 3]} spacing={4}>              <Box textAlign="center" p={4} bg="zen.50" borderRadius="lg">
                <Text fontSize="lg" fontWeight="bold" color="zen.600">
                  Today's Session
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="zen.500">
                  #2024-12-24
                </Text>
                <Text fontSize="xs" color="zen.500">Block recorded</Text>
              </Box>
              
              <Box textAlign="center" p={4} bg="serenity.50" borderRadius="lg">
                <Text fontSize="lg" fontWeight="bold" color="serenity.600">
                  Verification Status
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="serenity.500">
                  ✓ Verified
                </Text>
                <Text fontSize="xs" color="serenity.500">Immutable record</Text>
              </Box>
              
              <Box textAlign="center" p={4} bg="mindful.50" borderRadius="lg">
                <Text fontSize="lg" fontWeight="bold" color="mindful.600">
                  Career Points
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="mindful.500">
                  1,247
                </Text>
                <Text fontSize="xs" color="mindful.500">Lifetime achievement</Text>
              </Box>
            </SimpleGrid>
          </Box>
        </MotionBox>
      </VStack>
    </Box>
  );
}
