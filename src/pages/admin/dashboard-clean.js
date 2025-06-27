import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../../components/Layout';
import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Text,
  VStack,
  HStack,
  Badge,
  Progress,
  Icon,
  Avatar,
  AvatarGroup,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  Grid,
  GridItem,
  Flex,
  Container
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiTrendingUp, 
  FiTarget, 
  FiActivity,
  FiBarChart3,
  FiArrowUp,
  FiArrowDown,
  FiCheckCircle,
  FiClock,
  FiStar,
  FiBell,
  FiPieChart
} from 'react-icons/fi';

const MotionBox = motion(Box);

export default function AdminDashboard() {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const successColor = useColorModeValue("green.500", "green.300");

  // Key metrics data
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

  const recentActivities = [
    { id: 1, user: "John Doe", action: "completed Project Alpha milestone", time: "2 min ago", type: "success" },
    { id: 2, user: "Sarah Smith", action: "updated design mockups", time: "15 min ago", type: "info" },
    { id: 3, user: "Mike Johnson", action: "deployed to staging", time: "1 hour ago", type: "success" },
    { id: 4, user: "Lisa Chen", action: "reviewed code changes", time: "2 hours ago", type: "info" },
    { id: 5, user: "Alex Brown", action: "reported a critical bug", time: "3 hours ago", type: "warning" },
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
          <Container maxW="7xl">
            
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
                    Advanced analytics and recommendations are now available.
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

            {/* Charts Placeholder Section */}
            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8} mb={8}>
              <GridItem>
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Box
                    bg={cardBg}
                    borderRadius="xl"
                    border="1px"
                    borderColor={borderColor}
                    shadow="lg"
                    p={6}
                    h="400px"
                  >
                    <HStack spacing={3} mb={4}>
                      <Icon as={FiActivity} boxSize={6} color={accentColor} />
                      <Text fontSize="lg" fontWeight="bold" color={textColor}>
                        Weekly Productivity Trends
                      </Text>
                    </HStack>
                    
                    <VStack spacing={4} justify="center" h="300px">
                      <Icon as={FiBarChart3} boxSize={16} color={accentColor} opacity={0.3} />
                      <Text color={textColor} opacity={0.6} textAlign="center">
                        Interactive productivity chart will be displayed here.
                        <br />
                        Real-time data visualization with AI insights.
                      </Text>
                      <Button size="sm" colorScheme="blue" variant="outline">
                        Enable Charts
                      </Button>
                    </VStack>
                  </Box>
                </MotionBox>
              </GridItem>
              
              <GridItem>
                <MotionBox
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Box
                    bg={cardBg}
                    borderRadius="xl"
                    border="1px"
                    borderColor={borderColor}
                    shadow="lg"
                    p={6}
                    h="400px"
                  >
                    <HStack spacing={3} mb={4}>
                      <Icon as={FiPieChart} boxSize={6} color={accentColor} />
                      <Text fontSize="lg" fontWeight="bold" color={textColor}>
                        Team Distribution
                      </Text>
                    </HStack>
                    
                    <VStack spacing={4} justify="center" h="300px">
                      <Icon as={FiPieChart} boxSize={16} color={accentColor} opacity={0.3} />
                      <Text color={textColor} opacity={0.6} textAlign="center">
                        Interactive pie chart showing team distribution
                        <br />
                        across different departments.
                      </Text>
                      <Button size="sm" colorScheme="blue" variant="outline">
                        View Distribution
                      </Button>
                    </VStack>
                  </Box>
                </MotionBox>
              </GridItem>
            </Grid>

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
                      leftIcon={<FiStar />}
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
                      <Icon as={FiBell} boxSize={5} color={accentColor} />
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
                      leftIcon={<FiActivity />}
                    >
                      View All Activities
                    </Button>
                  </Box>
                </MotionBox>
              </GridItem>
            </Grid>

            {/* Quick Actions Footer */}
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
                <Text fontSize="lg" fontWeight="bold" color={textColor} mb={4}>
                  Quick Actions
                </Text>
                <HStack spacing={4} flexWrap="wrap">
                  <Button colorScheme="blue" variant="solid" leftIcon={<FiUsers />}>
                    Manage Team
                  </Button>
                  <Button colorScheme="green" variant="outline" leftIcon={<FiTarget />}>
                    View Projects
                  </Button>
                  <Button colorScheme="purple" variant="outline" leftIcon={<FiBarChart3 />}>
                    Generate Report
                  </Button>
                  <Button colorScheme="orange" variant="outline" leftIcon={<FiStar />}>
                    AI Analytics
                  </Button>
                </HStack>
              </Box>
            </MotionBox>

          </Container>
        </Box>
      </Layout>
    </ProtectedRoute>
  );
}
