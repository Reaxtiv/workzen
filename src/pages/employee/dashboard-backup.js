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
  StatArrow,
  useColorModeValue,
  Progress,
  VStack,
  HStack,
  Text,
  Card,
  CardBody,
  CardHeader,
  Container,
  Avatar,
  Badge,
  Button,
  Icon,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaCalendarCheck, 
  FaClock, 
  FaHeart, 
  FaTrophy,
  FaChartLine,
  FaBullseye,
  FaSmile,
  FaTasks,
  FaCheckCircle,
  FaStar,
  FaFire
} from 'react-icons/fa';

const MotionBox = motion(Box);

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Personal goals data
  const personalGoals = [
    { name: 'Complete React Project', progress: 75, status: 'In Progress' },
    { name: 'Learn TypeScript', progress: 60, status: 'In Progress' },
    { name: 'Improve Team Collaboration', progress: 90, status: 'Nearly Done' }
  ];

  // Today's tasks
  const todaysTasks = [
    { id: 1, task: 'Review PR #234', completed: true },
    { id: 2, task: 'Update documentation', completed: true },
    { id: 3, task: 'Team standup meeting', completed: false },
    { id: 4, task: 'Code review session', completed: false }
  ];

  return (
    <ProtectedRoute requiredRole="employee">
      <Layout>
        <Container maxW="7xl" py={8}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Welcome Header */}
            <VStack align="start" spacing={4} mb={8}>
              <HStack spacing={4}>
                <Avatar size="lg" src={user?.avatar} name={user?.name} />
                <VStack align="start" spacing={1}>
                  <Heading 
                    size="xl" 
                    bgGradient="linear(to-r, #52A052, #4FC3F7)" 
                    bgClip="text"
                    fontWeight="bold"
                  >
                    Welcome back, {user?.name}!
                  </Heading>
                  <Text color="gray.600" fontSize="lg">
                    {user?.position || 'Team Member'}
                  </Text>
                  <Text color="gray.500" fontSize="sm">
                    Here's your personal productivity overview
                  </Text>
                </VStack>
              </HStack>
            </VStack>

            {/* Personal Stats */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
              <MotionBox whileHover={{ scale: 1.02 }}>
                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardBody>
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        borderRadius="full"
                        bg="green.50"
                        color="green.500"
                      >
                        <Icon as={FaChartLine} boxSize={6} />
                      </Box>
                      <Stat>
                        <StatLabel>My Productivity</StatLabel>
                        <StatNumber>88%</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          12% from last week
                        </StatHelpText>
                      </Stat>
                    </HStack>
                  </CardBody>
                </Card>
              </MotionBox>

              <MotionBox whileHover={{ scale: 1.02 }}>
                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardBody>
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        borderRadius="full"
                        bg="blue.50"
                        color="blue.500"
                      >
                        <Icon as={FaTasks} boxSize={6} />
                      </Box>
                      <Stat>
                        <StatLabel>Tasks Completed</StatLabel>
                        <StatNumber>24</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          6 this week
                        </StatHelpText>
                      </Stat>
                    </HStack>
                  </CardBody>
                </Card>
              </MotionBox>

              <MotionBox whileHover={{ scale: 1.02 }}>
                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardBody>
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        borderRadius="full"
                        bg="purple.50"
                        color="purple.500"
                      >
                        <Icon as={FaHeart} boxSize={6} />
                      </Box>
                      <Stat>
                        <StatLabel>Wellness Score</StatLabel>
                        <StatNumber>94%</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          Great balance!
                        </StatHelpText>
                      </Stat>
                    </HStack>
                  </CardBody>
                </Card>
              </MotionBox>

              <MotionBox whileHover={{ scale: 1.02 }}>
                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardBody>
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        borderRadius="full"
                        bg="orange.50"
                        color="orange.500"
                      >
                        <Icon as={FaFire} boxSize={6} />
                      </Box>
                      <Stat>
                        <StatLabel>Streak Days</StatLabel>
                        <StatNumber>7</StatNumber>
                        <StatHelpText>
                          Keep it up!
                        </StatHelpText>
                      </Stat>
                    </HStack>
                  </CardBody>
                </Card>
              </MotionBox>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
              {/* Personal Goals */}
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardHeader>
                    <HStack spacing={3}>
                      <Icon as={FaBullseye} color="purple.500" boxSize={5} />
                      <Heading size="md">Your Goals Progress</Heading>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={6} align="stretch">
                      {personalGoals.map((goal, index) => (
                        <Box key={index}>
                          <HStack justify="space-between" mb={2}>
                            <Text fontWeight="medium">{goal.name}</Text>
                            <Badge 
                              colorScheme={goal.progress >= 80 ? "green" : goal.progress >= 60 ? "yellow" : "red"}
                            >
                              {goal.progress}%
                            </Badge>
                          </HStack>
                          <Progress 
                            value={goal.progress} 
                            colorScheme={goal.progress >= 80 ? "green" : goal.progress >= 60 ? "yellow" : "red"}
                            size="md" 
                            borderRadius="md" 
                          />
                          <Text fontSize="sm" color="gray.500" mt={1}>
                            Status: {goal.status}
                          </Text>
                        </Box>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </MotionBox>

              {/* Today's Tasks */}
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardHeader>
                    <HStack spacing={3}>
                      <Icon as={FaCalendarCheck} color="blue.500" boxSize={5} />
                      <Heading size="md">Today's Tasks</Heading>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <List spacing={4}>
                      {todaysTasks.map((task) => (
                        <ListItem key={task.id}>
                          <HStack spacing={3}>
                            <ListIcon 
                              as={task.completed ? FaCheckCircle : FaClock}
                              color={task.completed ? "green.500" : "orange.500"}
                            />
                            <Text 
                              textDecoration={task.completed ? "line-through" : "none"}
                              color={task.completed ? "gray.500" : "inherit"}
                              flex={1}
                            >
                              {task.task}
                            </Text>
                            {task.completed && (
                              <Badge colorScheme="green" size="sm">
                                Done
                              </Badge>
                            )}
                          </HStack>
                        </ListItem>
                      ))}
                    </List>
                    
                    <Button
                      mt={4}
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      leftIcon={<FaTasks />}
                      w="full"
                    >
                      View All Tasks
                    </Button>
                  </CardBody>
                </Card>
              </MotionBox>
            </SimpleGrid>

            {/* Quick Actions */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              mt={8}
            >
              <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                <CardHeader>
                  <Heading size="md">Quick Actions</Heading>
                </CardHeader>
                <CardBody>
                  <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                    <Button
                      leftIcon={<FaTasks />}
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                    >
                      New Task
                    </Button>
                    <Button
                      leftIcon={<FaClock />}
                      colorScheme="green"
                      variant="outline"
                      size="sm"
                    >
                      Time Tracker
                    </Button>
                    <Button
                      leftIcon={<FaTrophy />}
                      colorScheme="purple"
                      variant="outline"
                      size="sm"
                    >
                      Achievements
                    </Button>
                    <Button
                      leftIcon={<FaHeart />}
                      colorScheme="pink"
                      variant="outline"
                      size="sm"
                    >
                      Wellness
                    </Button>
                  </SimpleGrid>
                </CardBody>
              </Card>
            </MotionBox>
          </MotionBox>
        </Container>
      </Layout>
    </ProtectedRoute>
  );
};

export default EmployeeDashboard;
  FaFlag
} from 'react-icons/fa';

const MotionBox = motion(Box);

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Mock data for employee dashboard
  const myStats = {
    productivity: 92,
    tasksCompleted: 28,
    hoursWorked: 38,
    wellnessScore: 85,
    goalsCompleted: 3,
    totalGoals: 4
  };

  const recentTasks = [
    { id: 1, title: 'Complete API Documentation', status: 'completed', priority: 'high', dueDate: '2024-01-15' },
    { id: 2, title: 'Review Code PR #234', status: 'in-progress', priority: 'medium', dueDate: '2024-01-16' },
    { id: 3, title: 'Update User Dashboard', status: 'pending', priority: 'low', dueDate: '2024-01-18' },
    { id: 4, title: 'Team Meeting Preparation', status: 'completed', priority: 'medium', dueDate: '2024-01-14' }
  ];

  const upcomingDeadlines = [
    { task: 'Monthly Report', dueDate: 'Tomorrow', priority: 'high' },
    { task: 'Client Presentation', dueDate: 'Jan 20', priority: 'high' },
    { task: 'Code Review', dueDate: 'Jan 22', priority: 'medium' }
  ];

  const achievements = [
    { title: 'Productivity Champion', description: 'Maintained 90%+ productivity for 2 weeks', icon: FaTrophy, color: 'yellow' },
    { title: 'Early Bird', description: 'Completed 5 tasks ahead of schedule', icon: FaClock, color: 'blue' },
    { title: 'Team Player', description: 'Helped 3 colleagues this week', icon: FaHeart, color: 'red' }
  ];

  return (
    <ProtectedRoute requiredRole="employee">
      <Layout>
        <Box 
          bgGradient={useColorModeValue(
            "linear(135deg, zen.50 0%, mindful.100 30%, zen.100 100%)",
            "linear(135deg, gray.900 0%, gray.800 30%, gray.700 100%)"
          )} 
          minH="100vh"
        >
          <Container maxW="7xl" p={8}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <Flex justify="space-between" align="center" mb={8}>
                <VStack align="start" spacing={1}>
                  <Heading 
                    size="2xl" 
                    bgGradient="linear(to-r, #52A052, #4FC3F7)" 
                    bgClip="text"
                    fontWeight="bold"
                  >
                    Welcome back, {user?.name?.split(' ')[0]}!
                  </Heading>
                  <Text color="gray.600" fontSize="lg">
                    {user?.position} at WorkZen
                  </Text>
                  <Text color="gray.500" fontSize="md">
                    Here's your personal productivity overview
                  </Text>
                </VStack>
                
                <VStack spacing={2}>
                  <Avatar size="lg" src={user?.avatar} name={user?.name} />
                  <Badge colorScheme="green" variant="solid">
                    Active
                  </Badge>
                </VStack>
              </Flex>

              {/* Key Personal Metrics */}
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                    <CardBody>
                      <HStack spacing={4}>
                        <Box
                          p={3}
                          borderRadius="full"
                          bg="green.50"
                          color="green.500"
                        >
                          <Icon as={FaChartLine} boxSize={6} />
                        </Box>
                        <Stat>
                          <StatLabel color="gray.500">My Productivity</StatLabel>
                          <StatNumber>{myStats.productivity}%</StatNumber>
                          <StatHelpText>
                            <StatArrow type="increase" />
                            +8% this week
                          </StatHelpText>
                        </Stat>
                      </HStack>
                    </CardBody>
                  </Card>
                </MotionBox>

                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                    <CardBody>
                      <HStack spacing={4}>
                        <Box
                          p={3}
                          borderRadius="full"
                          bg="blue.50"
                          color="blue.500"
                        >
                          <Icon as={FaTasks} boxSize={6} />
                        </Box>
                        <Stat>
                          <StatLabel color="gray.500">Tasks Completed</StatLabel>
                          <StatNumber>{myStats.tasksCompleted}</StatNumber>
                          <StatHelpText>
                            <StatArrow type="increase" />
                            6 this week
                          </StatHelpText>
                        </Stat>
                      </HStack>
                    </CardBody>
                  </Card>
                </MotionBox>

                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                    <CardBody>
                      <HStack spacing={4}>
                        <Box
                          p={3}
                          borderRadius="full"
                          bg="purple.50"
                          color="purple.500"
                        >
                          <Icon as={FaClock} boxSize={6} />
                        </Box>
                        <Stat>
                          <StatLabel color="gray.500">Hours Worked</StatLabel>
                          <StatNumber>{myStats.hoursWorked}h</StatNumber>
                          <StatHelpText>
                            This week
                          </StatHelpText>
                        </Stat>
                      </HStack>
                    </CardBody>
                  </Card>
                </MotionBox>

                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                    <CardBody>
                      <HStack spacing={4}>
                        <Box
                          p={3}
                          borderRadius="full"
                          bg="pink.50"
                          color="pink.500"
                        >
                          <Icon as={FaHeart} boxSize={6} />
                        </Box>
                        <Stat>
                          <StatLabel color="gray.500">Wellness Score</StatLabel>
                          <StatNumber>{myStats.wellnessScore}%</StatNumber>
                          <StatHelpText>
                            <StatArrow type="increase" />
                            Great balance!
                          </StatHelpText>
                        </Stat>
                      </HStack>
                    </CardBody>
                  </Card>
                </MotionBox>
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6} mb={8}>
                {/* Goals Progress */}
                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardHeader>
                    <HStack>
                      <Icon as={FaBullseye} color="orange.400" />
                      <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                        My Goals Progress
                      </Heading>
                    </HStack>
                  </CardHeader>
                  <CardBody pt={0}>
                    <VStack spacing={4}>
                      <CircularProgress 
                        value={(myStats.goalsCompleted / myStats.totalGoals) * 100} 
                        size="120px" 
                        color="green.400"
                        thickness="8px"
                      >
                        <CircularProgressLabel fontSize="lg" fontWeight="bold">
                          {myStats.goalsCompleted}/{myStats.totalGoals}
                        </CircularProgressLabel>
                      </CircularProgress>
                      
                      <VStack spacing={3} align="stretch" w="full">
                        <Box>
                          <HStack justify="space-between" mb={2}>
                            <Text fontWeight="medium" fontSize="sm">Complete React Project</Text>
                            <Text fontSize="sm" color="green.500">85%</Text>
                          </HStack>
                          <Progress value={85} colorScheme="green" size="sm" borderRadius="md" />
                        </Box>
                        
                        <Box>
                          <HStack justify="space-between" mb={2}>
                            <Text fontWeight="medium" fontSize="sm">Learn TypeScript</Text>
                            <Text fontSize="sm" color="blue.500">70%</Text>
                          </HStack>
                          <Progress value={70} colorScheme="blue" size="sm" borderRadius="md" />
                        </Box>
                        
                        <Box>
                          <HStack justify="space-between" mb={2}>
                            <Text fontWeight="medium" fontSize="sm">Team Collaboration</Text>
                            <Text fontSize="sm" color="purple.500">95%</Text>
                          </HStack>
                          <Progress value={95} colorScheme="purple" size="sm" borderRadius="md" />
                        </Box>
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Recent Tasks */}
                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardHeader>
                    <HStack>
                      <Icon as={FaCalendarCheck} color="blue.400" />
                      <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                        Recent Tasks
                      </Heading>
                    </HStack>
                  </CardHeader>
                  <CardBody pt={0}>
                    <VStack spacing={3} align="stretch">
                      {recentTasks.map((task) => (
                        <HStack key={task.id} spacing={3} p={3} bg={useColorModeValue("gray.50", "gray.700")} borderRadius="md">
                          <Icon 
                            as={task.status === 'completed' ? FaCheckCircle : FaRegClock} 
                            color={task.status === 'completed' ? 'green.500' : 'orange.500'} 
                          />
                          <VStack align="start" spacing={0} flex={1}>
                            <Text fontSize="sm" fontWeight="medium">
                              {task.title}
                            </Text>
                            <HStack spacing={2}>
                              <Badge 
                                colorScheme={
                                  task.priority === 'high' ? 'red' : 
                                  task.priority === 'medium' ? 'orange' : 'green'
                                }
                                size="sm"
                              >
                                {task.priority}
                              </Badge>
                              <Badge 
                                colorScheme={
                                  task.status === 'completed' ? 'green' : 
                                  task.status === 'in-progress' ? 'blue' : 'gray'
                                }
                                size="sm"
                              >
                                {task.status}
                              </Badge>
                            </HStack>
                          </VStack>
                        </HStack>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>

                {/* Upcoming Deadlines */}
                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardHeader>
                    <HStack>
                      <Icon as={FaCalendarAlt} color="red.400" />
                      <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                        Upcoming Deadlines
                      </Heading>
                    </HStack>
                  </CardHeader>
                  <CardBody pt={0}>
                    <VStack spacing={3} align="stretch">
                      {upcomingDeadlines.map((deadline, index) => (
                        <Alert key={index} status="warning" borderRadius="md" variant="left-accent">
                          <AlertIcon />
                          <VStack align="start" spacing={0} flex={1}>
                            <Text fontSize="sm" fontWeight="medium">
                              {deadline.task}
                            </Text>
                            <HStack spacing={2}>
                              <Text fontSize="xs" color="gray.500">
                                Due: {deadline.dueDate}
                              </Text>
                              <Badge 
                                colorScheme={deadline.priority === 'high' ? 'red' : 'orange'}
                                size="sm"
                              >
                                {deadline.priority}
                              </Badge>
                            </HStack>
                          </VStack>
                        </Alert>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </SimpleGrid>

              {/* Achievements & Recognition */}
              <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                <CardHeader>
                  <Flex justify="space-between" align="center">
                    <HStack>
                      <Icon as={FaTrophy} color="yellow.400" />
                      <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                        Recent Achievements
                      </Heading>
                    </HStack>
                    <Button size="sm" variant="outline">View All</Button>
                  </Flex>
                </CardHeader>
                <CardBody pt={0}>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                    {achievements.map((achievement, index) => (
                      <MotionBox
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Box 
                          p={4} 
                          bg={useColorModeValue(`${achievement.color}.50`, `${achievement.color}.900`)} 
                          borderRadius="lg"
                          border="1px solid"
                          borderColor={useColorModeValue(`${achievement.color}.200`, `${achievement.color}.700`)}
                        >
                          <VStack spacing={2}>
                            <Icon 
                              as={achievement.icon} 
                              boxSize={8} 
                              color={`${achievement.color}.500`} 
                            />
                            <Text fontWeight="bold" textAlign="center" fontSize="sm">
                              {achievement.title}
                            </Text>
                            <Text fontSize="xs" textAlign="center" color="gray.600">
                              {achievement.description}
                            </Text>
                          </VStack>
                        </Box>
                      </MotionBox>
                    ))}
                  </SimpleGrid>
                </CardBody>
              </Card>
            </MotionBox>
          </Container>
        </Box>
      </Layout>
    </ProtectedRoute>
  );
};

export default EmployeeDashboard;
