import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../../components/Layout';
import { 
  Box, 
  Heading, 
  SimpleGrid, 
  useColorModeValue,
  VStack,
  HStack,
  Text,
  Card,
  CardBody,
  Badge,
  Icon,
  Container,
  Button,
  Checkbox,
  Progress,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaTasks, 
  FaClock, 
  FaFlag, 
  FaCheckCircle, 
  FaPlus, 
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaCalendarAlt
} from 'react-icons/fa';

const MotionBox = motion(Box);

const MyTasks = () => {
  const { user } = useAuth();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Mock tasks data for the employee
  const tasks = [
    {
      id: 1,
      title: "Review and fix login authentication bug",
      description: "Fix the issue where users can't login with special characters in password",
      priority: "high",
      status: "in-progress",
      dueDate: "2024-12-28",
      progress: 75,
      category: "Development",
      estimatedHours: 6,
      completedHours: 4.5
    },
    {
      id: 2,
      title: "Update user documentation",
      description: "Add new features to the user manual and update screenshots",
      priority: "medium",
      status: "pending",
      dueDate: "2024-12-30",
      progress: 20,
      category: "Documentation",
      estimatedHours: 4,
      completedHours: 0.8
    },
    {
      id: 3,
      title: "Prepare presentation for team meeting",
      description: "Create slides for next week's sprint review meeting",
      priority: "medium",
      status: "pending",
      dueDate: "2025-01-02",
      progress: 0,
      category: "Meeting",
      estimatedHours: 2,
      completedHours: 0
    },
    {
      id: 4,
      title: "Code review for new feature",
      description: "Review the new dashboard analytics feature implementation",
      priority: "low",
      status: "pending",
      dueDate: "2025-01-05",
      progress: 0,
      category: "Review",
      estimatedHours: 3,
      completedHours: 0
    },
    {
      id: 5,
      title: "Implement responsive design fixes",
      description: "Fix mobile responsiveness issues on the profile page",
      priority: "high",
      status: "completed",
      dueDate: "2024-12-25",
      progress: 100,
      category: "Development",
      estimatedHours: 5,
      completedHours: 5
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in-progress': return 'blue';
      case 'pending': return 'orange';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return FaCheckCircle;
      case 'in-progress': return FaClock;
      case 'pending': return FaTasks;
      default: return FaTasks;
    }
  };

  const pendingTasks = tasks.filter(task => task.status !== 'completed');
  const completedTasks = tasks.filter(task => task.status === 'completed');

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
          <Container maxW="6xl" p={8}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <Flex justify="space-between" align="center" mb={8}>
                <Box>
                  <Heading 
                    size="2xl" 
                    bgGradient="linear(to-r, #52A052, #4FC3F7)" 
                    bgClip="text"
                    fontWeight="bold"
                    mb={2}
                  >
                    My Tasks
                  </Heading>
                  <Text color="gray.600" fontSize="lg">
                    Manage your personal tasks and deadlines
                  </Text>
                </Box>
                <Button
                  leftIcon={<FaPlus />}
                  colorScheme="zen"
                  size="lg"
                  bgGradient="linear(to-r, zen.400, zen.600)"
                  _hover={{ bgGradient: "linear(to-r, zen.500, zen.700)" }}
                >
                  Add New Task
                </Button>
              </Flex>

              {/* Task Statistics */}
              <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={8}>
                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardBody p={6}>
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        borderRadius="full"
                        bg="blue.50"
                        color="blue.500"
                      >
                        <Icon as={FaTasks} boxSize={6} />
                      </Box>
                      <Box>
                        <Text fontSize="2xl" fontWeight="bold">{tasks.length}</Text>
                        <Text fontSize="sm" color="gray.500">Total Tasks</Text>
                      </Box>
                    </HStack>
                  </CardBody>
                </Card>

                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardBody p={6}>
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        borderRadius="full"
                        bg="orange.50"
                        color="orange.500"
                      >
                        <Icon as={FaClock} boxSize={6} />
                      </Box>
                      <Box>
                        <Text fontSize="2xl" fontWeight="bold">{pendingTasks.length}</Text>
                        <Text fontSize="sm" color="gray.500">Pending</Text>
                      </Box>
                    </HStack>
                  </CardBody>
                </Card>

                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardBody p={6}>
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        borderRadius="full"
                        bg="green.50"
                        color="green.500"
                      >
                        <Icon as={FaCheckCircle} boxSize={6} />
                      </Box>
                      <Box>
                        <Text fontSize="2xl" fontWeight="bold">{completedTasks.length}</Text>
                        <Text fontSize="sm" color="gray.500">Completed</Text>
                      </Box>
                    </HStack>
                  </CardBody>
                </Card>

                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardBody p={6}>
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        borderRadius="full"
                        bg="purple.50"
                        color="purple.500"
                      >
                        <Icon as={FaCalendarAlt} boxSize={6} />
                      </Box>
                      <Box>
                        <Text fontSize="2xl" fontWeight="bold">
                          {tasks.filter(t => t.dueDate === "2024-12-28").length}
                        </Text>
                        <Text fontSize="sm" color="gray.500">Due Today</Text>
                      </Box>
                    </HStack>
                  </CardBody>
                </Card>
              </SimpleGrid>

              {/* Active Tasks */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                mb={8}
              >
                <Heading size="lg" mb={4} color={useColorModeValue("gray.700", "white")}>
                  Active Tasks
                </Heading>
                
                <VStack spacing={4} align="stretch">
                  {pendingTasks.concat(tasks.filter(t => t.status === 'in-progress')).map((task, index) => (
                    <MotionBox
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                        <CardBody p={6}>
                          <Flex justify="space-between" align="start">
                            <HStack spacing={4} flex="1">
                              <Checkbox 
                                size="lg" 
                                colorScheme="zen"
                                isChecked={task.status === 'completed'}
                              />
                              <Box flex="1">
                                <HStack spacing={3} mb={2}>
                                  <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                                    {task.title}
                                  </Heading>
                                  <Badge colorScheme={getPriorityColor(task.priority)} size="sm">
                                    <Icon as={FaFlag} mr={1} />
                                    {task.priority}
                                  </Badge>
                                  <Badge colorScheme={getStatusColor(task.status)} size="sm">
                                    <Icon as={getStatusIcon(task.status)} mr={1} />
                                    {task.status}
                                  </Badge>
                                </HStack>
                                
                                <Text color="gray.600" mb={3}>
                                  {task.description}
                                </Text>
                                
                                <HStack spacing={6} mb={3}>
                                  <Text fontSize="sm" color="gray.500">
                                    <Icon as={FaCalendarAlt} mr={1} />
                                    Due: {task.dueDate}
                                  </Text>
                                  <Text fontSize="sm" color="gray.500">
                                    Category: {task.category}
                                  </Text>
                                  <Text fontSize="sm" color="gray.500">
                                    {task.completedHours}h / {task.estimatedHours}h
                                  </Text>
                                </HStack>
                                
                                <Box>
                                  <HStack justify="space-between" mb={1}>
                                    <Text fontSize="sm" fontWeight="medium">Progress</Text>
                                    <Text fontSize="sm" color="gray.500">{task.progress}%</Text>
                                  </HStack>
                                  <Progress 
                                    value={task.progress} 
                                    colorScheme={task.progress === 100 ? "green" : "blue"}
                                    size="md" 
                                    borderRadius="md"
                                  />
                                </Box>
                              </Box>
                            </HStack>
                            
                            <Menu>
                              <MenuButton
                                as={IconButton}
                                icon={<FaEllipsisV />}
                                variant="ghost"
                                size="sm"
                              />
                              <MenuList>
                                <MenuItem icon={<FaEdit />}>Edit Task</MenuItem>
                                <MenuItem icon={<FaTrash />} color="red.500">Delete Task</MenuItem>
                              </MenuList>
                            </Menu>
                          </Flex>
                        </CardBody>
                      </Card>
                    </MotionBox>
                  ))}
                </VStack>
              </MotionBox>

              {/* Completed Tasks */}
              {completedTasks.length > 0 && (
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Heading size="lg" mb={4} color={useColorModeValue("gray.700", "white")}>
                    Completed Tasks
                  </Heading>
                  
                  <VStack spacing={4} align="stretch">
                    {completedTasks.map((task, index) => (
                      <Card key={task.id} bg={cardBg} borderColor={borderColor} boxShadow="lg" opacity={0.8}>
                        <CardBody p={4}>
                          <HStack spacing={4}>
                            <Checkbox 
                              size="lg" 
                              colorScheme="green"
                              isChecked={true}
                              isReadOnly
                            />
                            <Box flex="1">
                              <HStack spacing={3} mb={1}>
                                <Text 
                                  fontWeight="medium" 
                                  textDecoration="line-through"
                                  color="gray.500"
                                >
                                  {task.title}
                                </Text>
                                <Badge colorScheme="green" size="sm">
                                  <Icon as={FaCheckCircle} mr={1} />
                                  Completed
                                </Badge>
                              </HStack>
                              <Text fontSize="sm" color="gray.500">
                                Completed on {task.dueDate}
                              </Text>
                            </Box>
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </MotionBox>
              )}
            </MotionBox>
          </Container>
        </Box>
      </Layout>
    </ProtectedRoute>
  );
};

export default MyTasks;
