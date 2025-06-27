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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Badge,
  VStack,
  HStack,
  Text,
  Alert,
  AlertIcon,
  Button,
  Icon,
  Flex,
  Progress,
  Container
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { FaUsers, FaTasks, FaChartLine, FaExclamationTriangle, FaEye } from 'react-icons/fa';

const MotionBox = motion(Box);

export default function AdminDashboard() {
  const { user } = useAuth();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Mock data for admin dashboard
  const employeeData = [
    { 
      id: 3, 
      name: 'Alice Johnson', 
      position: 'Senior Developer', 
      productivity: 92, 
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alice'
    },
    { 
      id: 4, 
      name: 'Bob Martinez', 
      position: 'UX Designer', 
      productivity: 87, 
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Bob'
    },
    { 
      id: 5, 
      name: 'Carol Smith', 
      position: 'Product Manager', 
      productivity: 95, 
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Carol'
    }
  ];

  const alerts = [
    { 
      type: 'info', 
      message: '3 employees have completed their quarterly goals',
      action: 'Review achievements'
    }
  ];

  return (
    <ProtectedRoute requiredRole="manager">
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Heading 
                size="2xl" 
                bgGradient="linear(to-r, #52A052, #4FC3F7)" 
                bgClip="text"
                fontWeight="bold"
                mb={2}
              >
                Manager Dashboard
              </Heading>
              
              <Text color="gray.600" mb={2} fontSize="lg">
                Welcome back, {user?.name}
              </Text>
              
              <Text color="gray.500" mb={8} fontSize="md">
                Manage your team's productivity and wellness
              </Text>

              {/* Key Metrics */}
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box 
                    bg={cardBg} 
                    p={6} 
                    borderRadius="xl" 
                    boxShadow="lg"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        borderRadius="full"
                        bg="blue.50"
                        color="blue.500"
                      >
                        <Icon as={FaUsers} boxSize={6} />
                      </Box>
                      <Stat>
                        <StatLabel>Total Employees</StatLabel>
                        <StatNumber>24</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          2 new this month
                        </StatHelpText>
                      </Stat>
                    </HStack>
                  </Box>
                </MotionBox>

                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box 
                    bg={cardBg} 
                    p={6} 
                    borderRadius="xl" 
                    boxShadow="lg"
                    border="1px solid"
                    borderColor={borderColor}
                  >
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
                        <StatLabel>Avg Productivity</StatLabel>
                        <StatNumber>88%</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          5% from last month
                        </StatHelpText>
                      </Stat>
                    </HStack>
                  </Box>
                </MotionBox>

                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box 
                    bg={cardBg} 
                    p={6} 
                    borderRadius="xl" 
                    boxShadow="lg"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        borderRadius="full"
                        bg="purple.50"
                        color="purple.500"
                      >
                        <Icon as={FaTasks} boxSize={6} />
                      </Box>
                      <Stat>
                        <StatLabel>Tasks Completed</StatLabel>
                        <StatNumber>156</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          23 this week
                        </StatHelpText>
                      </Stat>
                    </HStack>
                  </Box>
                </MotionBox>

                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box 
                    bg={cardBg} 
                    p={6} 
                    borderRadius="xl" 
                    boxShadow="lg"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        borderRadius="full"
                        bg="orange.50"
                        color="orange.500"
                      >
                        <Icon as={FaExclamationTriangle} boxSize={6} />
                      </Box>
                      <Stat>
                        <StatLabel>Team Status</StatLabel>
                        <StatNumber>Active</StatNumber>
                        <StatHelpText>
                          All systems running
                        </StatHelpText>
                      </Stat>
                    </HStack>
                  </Box>
                </MotionBox>
              </SimpleGrid>

              {/* Team Overview Table */}
              <Box 
                bg={cardBg} 
                p={6} 
                borderRadius="xl" 
                boxShadow="lg"
                border="1px solid"
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                    Team Performance Overview
                  </Heading>
                  <Button leftIcon={<FaEye />} colorScheme="blue" variant="outline" size="sm">
                    View Details
                  </Button>
                </Flex>
                
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Employee</Th>
                      <Th>Position</Th>
                      <Th>Productivity</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {employeeData.map((employee) => (
                      <Tr key={employee.id}>
                        <Td>
                          <HStack spacing={3}>
                            <Avatar size="sm" src={employee.avatar} />
                            <Text fontWeight="medium">{employee.name}</Text>
                          </HStack>
                        </Td>
                        <Td>
                          <Text color="gray.600">{employee.position}</Text>
                        </Td>
                        <Td>
                          <VStack align="start" spacing={1}>
                            <HStack spacing={2}>
                              <Text fontWeight="medium">{employee.productivity}%</Text>
                              <Badge 
                                colorScheme={employee.productivity >= 90 ? "green" : employee.productivity >= 80 ? "yellow" : "red"}
                              >
                                {employee.productivity >= 90 ? "Excellent" : employee.productivity >= 80 ? "Good" : "Needs Improvement"}
                              </Badge>
                            </HStack>
                            <Progress 
                              value={employee.productivity} 
                              size="sm" 
                              colorScheme={employee.productivity >= 90 ? "green" : employee.productivity >= 80 ? "yellow" : "red"}
                              w="120px"
                              borderRadius="md"
                            />
                          </VStack>
                        </Td>
                        <Td>
                          <Badge 
                            colorScheme={employee.status === 'active' ? "green" : "orange"}
                            textTransform="capitalize"
                          >
                            {employee.status}
                          </Badge>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </MotionBox>
          </Container>
        </Box>
      </Layout>
    </ProtectedRoute>
  );
}
