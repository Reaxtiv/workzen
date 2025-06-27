import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../../components/Layout';
import ProductivityChart from '../../components/ProductivityChart';
import InteractivePieChart from '../../components/InteractivePieChart-fixed';
import InteractiveBarChart from '../../components/InteractiveBarChart-fixed';
import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Grid,
  GridItem,
  Text,
  VStack,
  HStack,
  Badge,
  Progress,
  Icon,
  Avatar,
  AvatarGroup,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  List,
  ListItem,
  ListIcon,
  Tooltip,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiTrendingUp, 
  FiTarget, 
  FiActivity,
  FiCalendar,
  FiClock,
  FiBarChart3,
  FiPieChart,
  FiArrowUp,
  FiArrowDown,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiSettings,
  FiDownload,
  FiMail,
  FiBell,
  FiStar,
  FiTrendingDown,
  FiPlayCircle,
  FiPauseCircle
} from 'react-icons/fi';

const MotionBox = motion(Box);

export default function AdminDashboard() {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const successColor = useColorModeValue("green.500", "green.300");
  const warningColor = useColorModeValue("orange.500", "orange.300");
  const errorColor = useColorModeValue("red.500", "red.300");
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Sample data for charts
  const productivityData = [
    { date: "Mon", productiveHours: 7.5, tasks: 12, focus: 85 },
    { date: "Tue", productiveHours: 6.8, tasks: 10, focus: 78 },
    { date: "Wed", productiveHours: 8.2, tasks: 15, focus: 92 },
    { date: "Thu", productiveHours: 7.1, tasks: 11, focus: 82 },
    { date: "Fri", productiveHours: 8.9, tasks: 18, focus: 95 },
    { date: "Sat", productiveHours: 5.4, tasks: 8, focus: 70 },
    { date: "Sun", productiveHours: 4.2, tasks: 6, focus: 65 },
  ];

  const teamPerformanceData = [
    { 
      name: "Development", 
      value: 45, 
      color: "#3182CE", 
      details: "Frontend & Backend Teams",
      employees: 12,
      productivity: 92
    },
    { 
      name: "Design", 
      value: 20, 
      color: "#38A169", 
      details: "UI/UX & Graphics",
      employees: 5,
      productivity: 88
    },
    { 
      name: "Marketing", 
      value: 15, 
      color: "#E53E3E", 
      details: "Digital & Content Marketing",
      employees: 4,
      productivity: 85
    },
    { 
      name: "Sales", 
      value: 12, 
      color: "#D69E2E", 
      details: "B2B & B2C Sales",
      employees: 3,
      productivity: 91
    },
    { 
      name: "Support", 
      value: 8, 
      color: "#805AD5", 
      details: "Customer Success",
      employees: 2,
      productivity: 95
    },
  ];

  const departmentProductivity = [
    { name: "Engineering", value: 92, target: 85, change: 5.2, employees: 12 },
    { name: "Design", value: 88, target: 80, change: 3.1, employees: 5 },
    { name: "Marketing", value: 85, target: 75, change: -1.4, employees: 4 },
    { name: "Sales", value: 91, target: 90, change: 8.7, employees: 3 },
    { name: "Support", value: 95, target: 90, change: 2.8, employees: 2 },
    { name: "HR", value: 78, target: 70, change: 4.2, employees: 2 },
  ];

  const recentActivities = [
    { id: 1, user: "John Doe", action: "completed Project Alpha milestone", time: "2 min ago", type: "success" },
    { id: 2, user: "Sarah Smith", action: "updated design mockups", time: "15 min ago", type: "info" },
    { id: 3, user: "Mike Johnson", action: "deployed to staging", time: "1 hour ago", type: "success" },
    { id: 4, user: "Lisa Chen", action: "reviewed code changes", time: "2 hours ago", type: "info" },
    { id: 5, user: "Alex Brown", action: "reported a critical bug", time: "3 hours ago", type: "warning" },
  ];

  const upcomingTasks = [
    { id: 1, title: "Sprint Planning Meeting", time: "10:00 AM", priority: "high", status: "pending" },
    { id: 2, title: "Code Review Session", time: "2:00 PM", priority: "medium", status: "in-progress" },
    { id: 3, title: "Client Presentation", time: "4:00 PM", priority: "high", status: "pending" },
    { id: 4, title: "Team Standup", time: "9:00 AM", priority: "low", status: "completed" },
  ];

  const aiInsights = [
    {
      id: 1,
      title: "Performance Optimization",
      message: "Development team is performing 15% above average. Consider reallocating resources to Marketing.",
      type: "success",
      confidence: 92
    },
    {
      id: 2,
      title: "Risk Alert",
      message: "Project Alpha deadline might be at risk. Recommend additional resources or timeline adjustment.",
      type: "warning",
      confidence: 87
    },
    {
      id: 3,
      title: "Growth Opportunity",
      message: "Support team's exceptional performance (95%) could be scaled to other departments.",
      type: "info",
      confidence: 94
    }
  ];

  const keyMetrics = [
    {
      label: "Total Employees",
      value: "28",
      change: "+12%",
      changeType: "positive",
      icon: FiUsers,
      description: "Active team members",
      progress: 75
    },
    {
      label: "Team Productivity",
      value: "89%",
      change: "+5.2%",
      changeType: "positive",
      icon: FiTrendingUp,
      description: "Above target (85%)",
      progress: 89
    },
    {
      label: "Active Projects",
      value: "15",
      change: "+3",
      changeType: "positive",
      icon: FiTarget,
      description: "This month",
      progress: 78
    },
    {
      label: "Completion Rate",
      value: "94%",
      change: "-2.1%",
      changeType: "negative",
      icon: FiCheckCircle,
      description: "Weekly average",
      progress: 94
    }
  ];

  return (
    <ProtectedRoute requiredRole="manager">
      <Layout>
        <Box 
          bgGradient={useColorModeValue(
            "linear(135deg, blue.50 0%, purple.50 30%, teal.50 100%)",
            "linear(135deg, gray.900 0%, gray.800 30%, gray.700 100%)"
          )} 
          minH="100vh"
          p={8}
        >
          <Box maxW="7xl" mx="auto">
            
            {/* Header Section */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              mb={8}
            >
              <VStack spacing={4} align="flex-start">
                <HStack spacing={4} align="center" justify="space-between" w="100%">
                  <HStack spacing={3}>
                    <Icon as={FiBarChart3} boxSize={10} color={accentColor} />
                    <VStack align="start" spacing={0}>
                      <Heading 
                        size="2xl" 
                        bgGradient="linear(to-r, blue.500, purple.500, teal.500)" 
                        bgClip="text"
                        fontWeight="bold"
                      >
                        AI-Powered Manager Dashboard
                      </Heading>
                      <Text color={textColor} fontSize="lg" opacity={0.8}>
                        Real-time analytics with intelligent insights
                      </Text>
                    </VStack>
                  </HStack>
                  
                  <HStack spacing={3}>
                    <Tooltip label="Refresh Data">
                      <IconButton
                        icon={<FiRefreshCw />}
                        variant="ghost"
                        colorScheme="blue"
                        aria-label="Refresh"
                      />
                    </Tooltip>
                    <Tooltip label="Export Report">
                      <IconButton
                        icon={<FiDownload />}
                        variant="ghost"
                        colorScheme="blue"
                        aria-label="Export"
                      />
                    </Tooltip>
                    <Tooltip label="Settings">
                      <IconButton
                        icon={<FiSettings />}
                        variant="ghost"
                        colorScheme="blue"
                        aria-label="Settings"
                        onClick={onOpen}
                      />
                    </Tooltip>
                  </HStack>
                </HStack>

                <HStack spacing={4} flexWrap="wrap">
                  <Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="full">
                    <HStack spacing={1}>
                      <Icon as={FiTrendingUp} boxSize={3} />
                      <Text>Performance: Excellent</Text>
                    </HStack>
                  </Badge>
                  <Badge colorScheme="blue" variant="subtle" px={3} py={1} borderRadius="full">
                    <HStack spacing={1}>
                      <Icon as={FiUsers} boxSize={3} />
                      <Text>28 Active Members</Text>
                    </HStack>
                  </Badge>
                  <Badge colorScheme="purple" variant="subtle" px={3} py={1} borderRadius="full">
                    <HStack spacing={1}>
                      <Icon as={FiClock} boxSize={3} />
                      <Text>Updated 2 min ago</Text>
                    </HStack>
                  </Badge>
                  <Badge colorScheme="orange" variant="subtle" px={3} py={1} borderRadius="full">
                    <HStack spacing={1}>
                      <Icon as={FiStar} boxSize={3} />
                      <Text>AI Insights: 3 New</Text>
                    </HStack>
                  </Badge>
                </HStack>

                <HStack spacing={4} align="center">
                  <Text fontSize="sm" color={textColor} opacity={0.7}>Active Team:</Text>
                  <AvatarGroup size="sm" max={8}>
                    <Avatar name="John Doe" />
                    <Avatar name="Sarah Smith" />
                    <Avatar name="Mike Johnson" />
                    <Avatar name="Lisa Chen" />
                    <Avatar name="David Wilson" />
                    <Avatar name="Emma Davis" />
                    <Avatar name="Alex Brown" />
                    <Avatar name="Maria Garcia" />
                  </AvatarGroup>
                </HStack>
              </VStack>
            </MotionBox>

            {/* AI Insights Alert */}
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              mb={8}
            >
              <Alert
                status="info"
                variant="subtle"
                borderRadius="xl"
                p={4}
                bg={useColorModeValue("blue.50", "blue.900")}
                border="1px"
                borderColor={useColorModeValue("blue.200", "blue.600")}
              >
                <AlertIcon />
                <Box flex="1">
                  <AlertTitle fontSize="lg" mb={1}>
                    AI Assistant Ready! 🤖
                  </AlertTitle>
                  <AlertDescription fontSize="sm">
                    Your AI assistant has analyzed team performance and identified 3 key insights. 
                    Check the AI Insights section below for actionable recommendations.
                  </AlertDescription>
                </Box>
                <Button size="sm" colorScheme="blue" variant="solid" ml={4}>
                  View Insights
                </Button>
              </Alert>
            </MotionBox>

            {/* Key Metrics Grid */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
              {keyMetrics.map((metric, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <Box 
                    bg={cardBg} 
                    p={6} 
                    borderRadius="xl" 
                    boxShadow="lg"
                    border="1px solid"
                    borderColor={borderColor}
                    h="180px"
                    position="relative"
                    overflow="hidden"
                  >
                    <HStack justify="space-between" align="start" mb={3}>
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" color={textColor} opacity={0.7} fontWeight="medium">
                          {metric.label}
                        </Text>
                        <Text fontSize="3xl" fontWeight="bold" color={accentColor}>
                          {metric.value}
                        </Text>
                      </VStack>
                      <Icon as={metric.icon} boxSize={6} color={accentColor} opacity={0.7} />
                    </HStack>
                    
                    <HStack spacing={2} align="center" mb={3}>
                      <Icon 
                        as={metric.changeType === 'positive' ? FiArrowUp : FiArrowDown} 
                        boxSize={3} 
                        color={metric.changeType === 'positive' ? "green.500" : "red.500"} 
                      />
                      <Text 
                        fontSize="sm" 
                        color={metric.changeType === 'positive' ? "green.500" : "red.500"} 
                        fontWeight="semibold"
                      >
                        {metric.change} this month
                      </Text>
                    </HStack>
                    
                    <Progress 
                      value={metric.progress} 
                      size="xs" 
                      colorScheme={metric.changeType === 'positive' ? "green" : "red"} 
                      mb={2}
                      borderRadius="full"
                    />
                    <Text fontSize="xs" color={textColor} opacity={0.6}>
                      {metric.description}
                    </Text>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>

            {/* Charts Section */}
            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8} mb={8}>
              <GridItem>
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <ProductivityChart 
                    data={productivityData}
                    title="Weekly Productivity Trends"
                    height={450}
                  />
                </MotionBox>
              </GridItem>
              
              <GridItem>
                <MotionBox
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <InteractivePieChart 
                    data={teamPerformanceData}
                    title="Team Distribution"
                    height={450}
                  />
                </MotionBox>
              </GridItem>
            </Grid>

            {/* Department Performance Chart */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              mb={8}
            >
              <InteractiveBarChart 
                data={departmentProductivity}
                title="Department Performance Analysis"
                height={500}
                showTarget={true}
                target={85}
              />
            </MotionBox>

            {/* AI Insights & Activity Feed */}
            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} mb={8}>
              {/* AI Insights */}
              <GridItem>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Box
                    bg={cardBg}
                    borderRadius="xl"
                    border="1px"
                    borderColor={borderColor}
                    shadow="lg"
                    p={6}
                    h="500px"
                  >
                    <HStack justify="space-between" align="center" mb={6}>
                      <HStack spacing={3}>
                        <Icon as={FiStar} boxSize={6} color="orange.500" />
                        <Text fontSize="lg" fontWeight="bold" color={textColor}>
                          AI Insights
                        </Text>
                      </HStack>
                      <Badge colorScheme="orange" variant="solid" borderRadius="full">
                        {aiInsights.length} New
                      </Badge>
                    </HStack>

                    <VStack spacing={4} align="stretch">
                      {aiInsights.map((insight, index) => (
                        <MotionBox
                          key={insight.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Alert
                            status={insight.type}
                            variant="left-accent"
                            borderRadius="lg"
                            p={4}
                          >
                            <AlertIcon />
                            <Box flex="1">
                              <AlertTitle fontSize="sm" mb={1}>
                                {insight.title}
                              </AlertTitle>
                              <AlertDescription fontSize="xs" mb={2}>
                                {insight.message}
                              </AlertDescription>
                              <HStack justify="space-between" align="center">
                                <Text fontSize="xs" color="gray.500">
                                  Confidence: {insight.confidence}%
                                </Text>
                                <Progress 
                                  value={insight.confidence} 
                                  size="xs" 
                                  w="60px"
                                  colorScheme={insight.type === 'success' ? 'green' : insight.type === 'warning' ? 'orange' : 'blue'}
                                />
                              </HStack>
                            </Box>
                          </Alert>
                        </MotionBox>
                      ))}
                    </VStack>

                    <Divider my={4} />
                    
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      w="100%"
                      leftIcon={<FiPlayCircle />}
                    >
                      Generate More Insights
                    </Button>
                  </Box>
                </MotionBox>
              </GridItem>

              {/* Recent Activity */}
              <GridItem>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Box
                    bg={cardBg}
                    borderRadius="xl"
                    border="1px"
                    borderColor={borderColor}
                    shadow="lg"
                    p={6}
                    h="500px"
                  >
                    <HStack justify="space-between" align="center" mb={6}>
                      <HStack spacing={3}>
                        <Icon as={FiActivity} boxSize={6} color={accentColor} />
                        <Text fontSize="lg" fontWeight="bold" color={textColor}>
                          Recent Activity
                        </Text>
                      </HStack>
                      <IconButton
                        icon={<FiBell />}
                        size="sm"
                        variant="ghost"
                        colorScheme="blue"
                        aria-label="Notifications"
                      />
                    </HStack>

                    <VStack spacing={4} align="stretch" overflowY="auto" maxH="350px">
                      {recentActivities.map((activity, index) => (
                        <MotionBox
                          key={activity.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <HStack spacing={3} p={3} borderRadius="lg" bg="gray.50" align="start">
                            <Avatar size="sm" name={activity.user} />
                            <VStack align="start" spacing={1} flex={1}>
                              <Text fontSize="sm" fontWeight="medium" color={textColor}>
                                <Text as="span" fontWeight="bold">{activity.user}</Text>
                                {' '}{activity.action}
                              </Text>
                              <HStack spacing={2}>
                                <Text fontSize="xs" color="gray.500">
                                  {activity.time}
                                </Text>
                                <Badge
                                  size="sm"
                                  colorScheme={
                                    activity.type === 'success' ? 'green' :
                                    activity.type === 'warning' ? 'orange' : 'blue'
                                  }
                                  variant="subtle"
                                >
                                  {activity.type}
                                </Badge>
                              </HStack>
                            </VStack>
                          </HStack>
                        </MotionBox>
                      ))}
                    </VStack>

                    <Divider my={4} />
                    
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      w="100%"
                      leftIcon={<FiMail />}
                    >
                      View All Activities
                    </Button>
                  </Box>
                </MotionBox>
              </GridItem>
            </Grid>

            {/* Upcoming Tasks */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Box
                bg={cardBg}
                borderRadius="xl"
                border="1px"
                borderColor={borderColor}
                shadow="lg"
                p={6}
              >
                <HStack justify="space-between" align="center" mb={6}>
                  <HStack spacing={3}>
                    <Icon as={FiCalendar} boxSize={6} color={accentColor} />
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                      Today's Schedule
                    </Text>
                  </HStack>
                  <Button size="sm" colorScheme="blue" variant="outline">
                    View Calendar
                  </Button>
                </HStack>

                <TableContainer>
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th>Task</Th>
                        <Th>Time</Th>
                        <Th>Priority</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {upcomingTasks.map((task, index) => (
                        <Tr key={task.id}>
                          <Td>
                            <Text fontSize="sm" fontWeight="medium">
                              {task.title}
                            </Text>
                          </Td>
                          <Td>
                            <Text fontSize="sm" color="gray.500">
                              {task.time}
                            </Text>
                          </Td>
                          <Td>
                            <Badge
                              colorScheme={
                                task.priority === 'high' ? 'red' :
                                task.priority === 'medium' ? 'orange' : 'green'
                              }
                              variant="subtle"
                              size="sm"
                            >
                              {task.priority}
                            </Badge>
                          </Td>
                          <Td>
                            <Badge
                              colorScheme={
                                task.status === 'completed' ? 'green' :
                                task.status === 'in-progress' ? 'blue' : 'gray'
                              }
                              variant="subtle"
                              size="sm"
                            >
                              {task.status}
                            </Badge>
                          </Td>
                          <Td>
                            <IconButton
                              icon={task.status === 'completed' ? <FiCheckCircle /> : <FiPlayCircle />}
                              size="sm"
                              variant="ghost"
                              colorScheme={task.status === 'completed' ? 'green' : 'blue'}
                              aria-label="Action"
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </MotionBox>

            {/* Settings Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Dashboard Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <VStack spacing={4} align="stretch">
                    <Text fontSize="sm" color="gray.600">
                      Customize your dashboard experience and AI assistant preferences.
                    </Text>
                    <Divider />
                    <Text fontSize="md" fontWeight="semibold">
                      AI Assistant Settings
                    </Text>
                    <HStack justify="space-between">
                      <Text fontSize="sm">Enable AI Insights</Text>
                      <Button size="sm" colorScheme="green" variant="solid">
                        Enabled
                      </Button>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm">Auto-refresh Data</Text>
                      <Button size="sm" colorScheme="blue" variant="outline">
                        Every 5 min
                      </Button>
                    </HStack>
                  </VStack>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </Layout>
    </ProtectedRoute>
  );
}
