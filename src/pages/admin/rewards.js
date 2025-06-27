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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaTrophy, 
  FaCoins, 
  FaGift, 
  FaUsers,
  FaPlus,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaEye,
  FaStar
} from 'react-icons/fa';

const MotionBox = motion(Box);

const AdminRewards = () => {
  const { user } = useAuth();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Mock data for admin rewards management
  const rewardStats = {
    totalPointsAwarded: 2450,
    totalRedeemed: 1800,
    availableRewards: 12,
    pendingRequests: 5
  };

  const employeePoints = [
    {
      id: 3,
      name: 'Alice Johnson',
      position: 'Senior Developer',
      totalPoints: 850,
      redeemedPoints: 300,
      availablePoints: 550,
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alice',
      lastActivity: '2024-12-27'
    },
    {
      id: 4,
      name: 'Bob Martinez',
      position: 'UX Designer',
      totalPoints: 720,
      redeemedPoints: 450,
      availablePoints: 270,
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Bob',
      lastActivity: '2024-12-26'
    },
    {
      id: 5,
      name: 'Carol Smith',
      position: 'Product Manager',
      totalPoints: 880,
      redeemedPoints: 200,
      availablePoints: 680,
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Carol',
      lastActivity: '2024-12-28'
    }
  ];

  const availableRewards = [
    {
      id: 1,
      title: 'Extra Day Off',
      description: 'One additional vacation day',
      cost: 500,
      category: 'Time Off',
      availability: 'Unlimited',
      timesRedeemed: 8,
      status: 'active'
    },
    {
      id: 2,
      title: 'Coffee Shop Gift Card',
      description: '$25 gift card to local coffee shops',
      cost: 250,
      category: 'Gift Cards',
      availability: '10 remaining',
      timesRedeemed: 15,
      status: 'active'
    },
    {
      id: 3,
      title: 'Team Lunch Sponsorship',
      description: 'Sponsor lunch for the whole team',
      cost: 800,
      category: 'Team Events',
      availability: '2 per month',
      timesRedeemed: 3,
      status: 'active'
    },
    {
      id: 4,
      title: 'Learning Budget',
      description: '$100 for online courses or books',
      cost: 400,
      category: 'Professional Development',
      availability: '5 remaining',
      timesRedeemed: 12,
      status: 'active'
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      employee: 'Alice Johnson',
      reward: 'Extra Day Off',
      points: 500,
      requestDate: '2024-12-27',
      status: 'pending',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alice'
    },
    {
      id: 2,
      employee: 'Bob Martinez',
      reward: 'Coffee Shop Gift Card',
      points: 250,
      requestDate: '2024-12-26',
      status: 'pending',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Bob'
    }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Time Off': return 'blue';
      case 'Gift Cards': return 'green';
      case 'Team Events': return 'purple';
      case 'Professional Development': return 'orange';
      default: return 'gray';
    }
  };

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
                    Team Rewards Management
                  </Heading>
                  <Text color="gray.600" fontSize="lg">
                    Manage rewards, track points, and approve redemptions
                  </Text>
                </Box>
                <VStack spacing={2}>
                  <Button
                    leftIcon={<FaPlus />}
                    colorScheme="zen"
                    size="lg"
                    bgGradient="linear(to-r, zen.400, zen.600)"
                    _hover={{ bgGradient: "linear(to-r, zen.500, zen.700)" }}
                  >
                    Add New Reward
                  </Button>
                  <Button
                    leftIcon={<FaCoins />}
                    variant="outline"
                    colorScheme="zen"
                    size="md"
                  >
                    Award Points
                  </Button>
                </VStack>
              </Flex>

              {/* Statistics */}
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
                <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                  <CardBody p={6}>
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        borderRadius="full"
                        bg="blue.50"
                        color="blue.500"
                      >
                        <Icon as={FaCoins} boxSize={6} />
                      </Box>
                      <Stat>
                        <StatLabel>Total Points Awarded</StatLabel>
                        <StatNumber>{rewardStats.totalPointsAwarded}</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          +15% this month
                        </StatHelpText>
                      </Stat>
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
                        <Icon as={FaGift} boxSize={6} />
                      </Box>
                      <Stat>
                        <StatLabel>Points Redeemed</StatLabel>
                        <StatNumber>{rewardStats.totalRedeemed}</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          +8% this month
                        </StatHelpText>
                      </Stat>
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
                        <Icon as={FaTrophy} boxSize={6} />
                      </Box>
                      <Stat>
                        <StatLabel>Active Rewards</StatLabel>
                        <StatNumber>{rewardStats.availableRewards}</StatNumber>
                        <StatHelpText>
                          Available options
                        </StatHelpText>
                      </Stat>
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
                        <Icon as={FaUsers} boxSize={6} />
                      </Box>
                      <Stat>
                        <StatLabel>Pending Requests</StatLabel>
                        <StatNumber>{rewardStats.pendingRequests}</StatNumber>
                        <StatHelpText>
                          Need approval
                        </StatHelpText>
                      </Stat>
                    </HStack>
                  </CardBody>
                </Card>
              </SimpleGrid>

              {/* Tabs for different management views */}
              <Tabs variant="enclosed" colorScheme="zen">
                <TabList>
                  <Tab>Pending Requests</Tab>
                  <Tab>Employee Points</Tab>
                  <Tab>Reward Catalog</Tab>
                </TabList>

                <TabPanels>
                  {/* Pending Requests Tab */}
                  <TabPanel p={0} pt={6}>
                    <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                      <CardBody p={6}>
                        <Heading size="md" mb={4} color={useColorModeValue("gray.700", "white")}>
                          Pending Reward Requests
                        </Heading>
                        
                        <VStack spacing={4} align="stretch">
                          {pendingRequests.map((request) => (
                            <Box 
                              key={request.id}
                              p={4} 
                              borderRadius="lg" 
                              bg={useColorModeValue("gray.50", "gray.700")}
                              border="1px solid"
                              borderColor={borderColor}
                            >
                              <Flex justify="space-between" align="center">
                                <HStack spacing={4}>
                                  <Avatar size="md" src={request.avatar} />
                                  <VStack align="start" spacing={1}>
                                    <Text fontWeight="bold">{request.employee}</Text>
                                    <Text color="gray.600">wants to redeem: {request.reward}</Text>
                                    <HStack spacing={2}>
                                      <Icon as={FaCoins} color="yellow.500" />
                                      <Text fontSize="sm">{request.points} points</Text>
                                      <Text fontSize="sm" color="gray.500">• {request.requestDate}</Text>
                                    </HStack>
                                  </VStack>
                                </HStack>
                                
                                <HStack spacing={2}>
                                  <Button
                                    size="sm"
                                    colorScheme="green"
                                    leftIcon={<FaCheck />}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    colorScheme="red"
                                    variant="outline"
                                    leftIcon={<FaTimes />}
                                  >
                                    Reject
                                  </Button>
                                </HStack>
                              </Flex>
                            </Box>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>
                  </TabPanel>

                  {/* Employee Points Tab */}
                  <TabPanel p={0} pt={6}>
                    <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                      <CardBody p={6}>
                        <Heading size="md" mb={4} color={useColorModeValue("gray.700", "white")}>
                          Employee Points Overview
                        </Heading>
                        
                        <Table variant="simple">
                          <Thead>
                            <Tr>
                              <Th>Employee</Th>
                              <Th>Total Earned</Th>
                              <Th>Redeemed</Th>
                              <Th>Available</Th>
                              <Th>Last Activity</Th>
                              <Th>Actions</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {employeePoints.map((employee) => (
                              <Tr key={employee.id}>
                                <Td>
                                  <HStack spacing={3}>
                                    <Avatar size="sm" src={employee.avatar} />
                                    <VStack align="start" spacing={0}>
                                      <Text fontWeight="medium">{employee.name}</Text>
                                      <Text fontSize="sm" color="gray.500">{employee.position}</Text>
                                    </VStack>
                                  </HStack>
                                </Td>
                                <Td>
                                  <HStack>
                                    <Icon as={FaCoins} color="yellow.500" />
                                    <Text fontWeight="bold">{employee.totalPoints}</Text>
                                  </HStack>
                                </Td>
                                <Td>
                                  <Text color="red.500">{employee.redeemedPoints}</Text>
                                </Td>
                                <Td>
                                  <Text color="green.500" fontWeight="bold">{employee.availablePoints}</Text>
                                </Td>
                                <Td>
                                  <Text fontSize="sm" color="gray.500">{employee.lastActivity}</Text>
                                </Td>
                                <Td>
                                  <HStack spacing={2}>
                                    <Button size="xs" colorScheme="blue" leftIcon={<FaPlus />}>
                                      Award
                                    </Button>
                                    <Button size="xs" variant="outline" leftIcon={<FaEye />}>
                                      History
                                    </Button>
                                  </HStack>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </TabPanel>

                  {/* Reward Catalog Tab */}
                  <TabPanel p={0} pt={6}>
                    <Card bg={cardBg} borderColor={borderColor} boxShadow="lg">
                      <CardBody p={6}>
                        <Flex justify="space-between" align="center" mb={4}>
                          <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                            Reward Catalog Management
                          </Heading>
                          <Button leftIcon={<FaPlus />} colorScheme="zen" size="sm">
                            Add Reward
                          </Button>
                        </Flex>
                        
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                          {availableRewards.map((reward) => (
                            <Card key={reward.id} borderColor={borderColor} variant="outline">
                              <CardBody p={4}>
                                <VStack align="stretch" spacing={3}>
                                  <HStack justify="space-between">
                                    <Badge colorScheme={getCategoryColor(reward.category)} size="sm">
                                      {reward.category}
                                    </Badge>
                                    <Menu>
                                      <MenuButton
                                        as={IconButton}
                                        icon={<FaEllipsisV />}
                                        variant="ghost"
                                        size="sm"
                                      />
                                      <MenuList>
                                        <MenuItem icon={<FaEdit />}>Edit</MenuItem>
                                        <MenuItem icon={<FaEye />}>View Stats</MenuItem>
                                        <MenuItem icon={<FaTrash />} color="red.500">Delete</MenuItem>
                                      </MenuList>
                                    </Menu>
                                  </HStack>
                                  
                                  <Box>
                                    <Text fontWeight="bold" mb={1}>{reward.title}</Text>
                                    <Text fontSize="sm" color="gray.600" mb={2}>{reward.description}</Text>
                                    
                                    <HStack justify="space-between" mb={2}>
                                      <HStack>
                                        <Icon as={FaCoins} color="yellow.500" />
                                        <Text fontWeight="bold">{reward.cost} pts</Text>
                                      </HStack>
                                      <Badge variant="outline">{reward.availability}</Badge>
                                    </HStack>
                                    
                                    <HStack spacing={2}>
                                      <Icon as={FaStar} color="orange.500" size="sm" />
                                      <Text fontSize="sm" color="gray.500">
                                        Redeemed {reward.timesRedeemed} times
                                      </Text>
                                    </HStack>
                                  </Box>
                                </VStack>
                              </CardBody>
                            </Card>
                          ))}
                        </SimpleGrid>
                      </CardBody>
                    </Card>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </MotionBox>
          </Container>
        </Box>
      </Layout>
    </ProtectedRoute>
  );
};

export default AdminRewards;
