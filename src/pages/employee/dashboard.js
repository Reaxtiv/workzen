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
  Badge,
  Icon,
  Container
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { FaTasks, FaChartLine, FaTrophy, FaCalendarCheck } from 'react-icons/fa';

const MotionBox = motion(Box);

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Mock data for employee - only personal data, no team data
  const personalGoals = [
    { 
      title: 'Complete React Project', 
      progress: 75, 
      dueDate: 'Dec 30, 2024',
      priority: 'high'
    },
    { 
      title: 'Learn TypeScript', 
      progress: 60, 
      dueDate: 'Jan 15, 2025',
      priority: 'medium'
    },
    { 
      title: 'Improve Team Collaboration', 
      progress: 90, 
      dueDate: 'Dec 25, 2024',
      priority: 'low'
    }
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
          <Container maxW="6xl" p={8}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Heading 
                size="2xl" 
                bgGradient="linear(to-r, #52A052, #4FC3F7)" 
                bgClip="text"
                fontWeight="bold"
                mb={2}
              >
                Welcome back, {user?.name}!
              </Heading>
              
              <Text color="gray.600" mb={2} fontSize="lg">
                {user?.position || 'Team Member'}
              </Text>
              
              <Text color="gray.500" mb={8} fontSize="md">
                Here's your personal productivity overview
              </Text>

              {/* Personal Metrics - Only employee's own data */}
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                    <CardBody p={6}>
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

                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
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

                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                    <CardBody p={6}>
                      <HStack spacing={4}>
                        <Box
                          p={3}
                          borderRadius="full"
                          bg="purple.50"
                          color="purple.500"
                        >
                          <Icon as={FaTrophy} boxSize={6} />
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

                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                    <CardBody p={6}>
                      <HStack spacing={4}>
                        <Box
                          p={3}
                          borderRadius="full"
                          bg="orange.50"
                          color="orange.500"
                        >
                          <Icon as={FaCalendarCheck} boxSize={6} />
                        </Box>
                        <Stat>
                          <StatLabel>Goals Progress</StatLabel>
                          <StatNumber>75%</StatNumber>
                          <StatHelpText>
                            On track
                          </StatHelpText>
                        </Stat>
                      </HStack>
                    </CardBody>
                  </Card>
                </MotionBox>
              </SimpleGrid>

              {/* Personal Goals Progress - Only employee's goals */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardBody p={6}>
                    <Heading size="md" mb={6} color={useColorModeValue("gray.700", "white")}>
                      Your Personal Goals
                    </Heading>
                    
                    <VStack spacing={6} align="stretch">
                      {personalGoals.map((goal, index) => (
                        <MotionBox
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Box 
                            p={4} 
                            borderRadius="lg" 
                            bg={useColorModeValue("gray.50", "gray.700")}
                            border="1px solid"
                            borderColor={borderColor}
                          >
                            <VStack align="stretch" spacing={3}>
                              <HStack justify="space-between" align="center">
                                <VStack align="start" spacing={1}>
                                  <Text fontWeight="bold" fontSize="md">
                                    {goal.title}
                                  </Text>
                                  <HStack spacing={2}>
                                    <Badge 
                                      colorScheme={
                                        goal.priority === 'high' ? 'red' : 
                                        goal.priority === 'medium' ? 'yellow' : 'green'
                                      }
                                      size="sm"
                                    >
                                      {goal.priority} priority
                                    </Badge>
                                    <Text fontSize="sm" color="gray.500">
                                      Due: {goal.dueDate}
                                    </Text>
                                  </HStack>
                                </VStack>
                                <Text 
                                  fontWeight="bold" 
                                  fontSize="lg"
                                  color={
                                    goal.progress >= 80 ? "green.500" : 
                                    goal.progress >= 60 ? "yellow.500" : "red.500"
                                  }
                                >
                                  {goal.progress}%
                                </Text>
                              </HStack>
                              
                              <Progress 
                                value={goal.progress} 
                                colorScheme={
                                  goal.progress >= 80 ? "green" : 
                                  goal.progress >= 60 ? "yellow" : "red"
                                }
                                size="lg" 
                                borderRadius="md"
                                bg={useColorModeValue("gray.200", "gray.600")}
                              />
                            </VStack>
                          </Box>
                        </MotionBox>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </MotionBox>

              {/* Quick Actions for Employee */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                mt={6}
              >
                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardBody p={6}>
                    <Heading size="md" mb={4} color={useColorModeValue("gray.700", "white")}>
                      Quick Actions
                    </Heading>
                    
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                      <Box 
                        p={4} 
                        textAlign="center" 
                        borderRadius="lg"
                        bg={useColorModeValue("blue.50", "blue.900")}
                        color={useColorModeValue("blue.700", "blue.200")}
                        cursor="pointer"
                        _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                        transition="all 0.2s"
                      >
                        <Icon as={FaTasks} boxSize={8} mb={2} />
                        <Text fontWeight="medium">View Tasks</Text>
                      </Box>
                      
                      <Box 
                        p={4} 
                        textAlign="center" 
                        borderRadius="lg"
                        bg={useColorModeValue("green.50", "green.900")}
                        color={useColorModeValue("green.700", "green.200")}
                        cursor="pointer"
                        _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                        transition="all 0.2s"
                      >
                        <Icon as={FaTrophy} boxSize={8} mb={2} />
                        <Text fontWeight="medium">Set Goals</Text>
                      </Box>
                      
                      <Box 
                        p={4} 
                        textAlign="center" 
                        borderRadius="lg"
                        bg={useColorModeValue("purple.50", "purple.900")}
                        color={useColorModeValue("purple.700", "purple.200")}
                        cursor="pointer"
                        _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                        transition="all 0.2s"
                      >
                        <Icon as={FaChartLine} boxSize={8} mb={2} />
                        <Text fontWeight="medium">View Reports</Text>
                      </Box>
                    </SimpleGrid>
                  </CardBody>
                </Card>
              </MotionBox>
            </MotionBox>
          </Container>
        </Box>
      </Layout>
    </ProtectedRoute>
  );
};

export default EmployeeDashboard;
