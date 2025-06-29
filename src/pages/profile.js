import { 
  Flex, 
  Box, 
  Heading, 
  Text, 
  Avatar, 
  VStack, 
  HStack, 
  Badge, 
  Button, 
  Progress, 
  Grid, 
  GridItem, 
  Divider, 
  useColorModeValue,
  Icon as ChakraIcon
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaDownload, FaFileExport, FaChartLine } from "react-icons/fa";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

const MotionBox = motion(Box);

export default function Profile() {
  const { user } = useAuth();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Si no hay usuario, mostrar loading o redirigir
  if (!user) {
    return (
      <Layout>
        <Box p={8}>
          <Text>Loading...</Text>
        </Box>
      </Layout>
    );
  }

  // Datos específicos según el rol
  const getUserStats = () => {
    if (user.role === 'manager') {
      return {
        productivity: 95,
        tasksCompleted: 156,
        teamManaged: 24,
        totalHours: 48.5,
        badges: ['Team Leader', 'HR Expert'],
        wallet: '0x8B2F...C9D1'
      };
    } else {
      return {
        productivity: 88,
        tasksCompleted: 85,
        totalHours: 42.0,
        weeklyGoal: 40,
        badges: ['Productive Worker', 'Goal Achiever'],
        wallet: '0x4A7E...B3F8'
      };
    }
  };

  const userStats = getUserStats();
    return (
    <Layout>
      <Box bgGradient="linear(135deg, zen.50 0%, mindful.100 30%, zen.100 100%)" minH="100vh">
        <Box p={8}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >            <Heading 
              size="2xl" 
              bgGradient="linear(to-r, #52A052, #4FC3F7)" 
              bgClip="text"
              fontWeight="bold"
              mb={8}
              css={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              User Profile
            </Heading>
        
        <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6}>
          {/* Profile Info */}
          <GridItem colSpan={2}>
            <Box 
              bg={cardBg} 
              p={6} 
              borderRadius="xl" 
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
            >
              <Flex align="center" gap={6}>
                <Avatar 
                  name={user.name} 
                  size="2xl" 
                  src={user.avatar}
                  border="4px solid"
                  borderColor="zen.400"
                  boxShadow="0 8px 16px rgba(82, 160, 82, 0.2)"
                />
                <VStack align="start" spacing={2}>
                  <Heading fontSize="2xl" color={useColorModeValue("gray.700", "white")}>
                    {user.name}
                  </Heading>
                  <Text fontSize="lg" color="gray.500">{user.email}</Text>
                  <HStack spacing={2}>
                    <Badge colorScheme="green" fontSize="sm" px={3} py={1}>
                      {user.role === 'manager' ? 'Manager' : user.position}
                    </Badge>
                    <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
                      {user.role === 'manager' ? 'Team Lead' : 'Employee'}
                    </Badge>
                    {userStats.badges.map((badge, index) => (
                      <Badge key={index} colorScheme="purple" fontSize="sm" px={3} py={1}>
                        {badge}
                      </Badge>
                    ))}
                  </HStack>
                  <Text fontSize="lg" color="gray.600">
                    <strong>Wallet:</strong> {userStats.wallet}
                  </Text>
                  <Button colorScheme="green" size="lg" mt={2}>
                    Edit Profile
                  </Button>
                </VStack>
              </Flex>
            </Box>
          </GridItem>
          
          {/* Productivity Stats */}
          <GridItem>
            <Box 
              bg={cardBg} 
              p={6} 
              borderRadius="xl" 
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
            >
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                  {user.role === 'manager' ? 'Management Overview' : 'This Week\'s Progress'}
                </Heading>
                <Divider />
                
                <VStack align="stretch" spacing={3}>
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="medium" fontSize="lg">
                        {user.role === 'manager' ? 'Team Productivity' : 'Tasks Completed'}
                      </Text>
                      <Text fontSize="lg" color="green.500">
                        {user.role === 'manager' ? '88%' : `${Math.floor(userStats.tasksCompleted * 0.7)}/${userStats.tasksCompleted}`}
                      </Text>
                    </HStack>
                    <Progress 
                      value={user.role === 'manager' ? 88 : 67} 
                      colorScheme="green" 
                      size="lg" 
                      borderRadius="md" 
                    />
                  </Box>
                  
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="medium" fontSize="lg">
                        {user.role === 'manager' ? 'Team Members' : 'Focus Time'}
                      </Text>
                      <Text fontSize="lg" color="blue.500">
                        {user.role === 'manager' ? `${userStats.teamManaged}` : `${userStats.totalHours}h`}
                      </Text>
                    </HStack>
                    <Progress 
                      value={user.role === 'manager' ? 96 : 85} 
                      colorScheme="blue" 
                      size="lg" 
                      borderRadius="md" 
                    />
                  </Box>
                  
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="medium" fontSize="lg">Team Collaboration</Text>
                      <Text fontSize="lg" color="purple.500">94%</Text>
                    </HStack>
                    <Progress value={94} colorScheme="purple" size="lg" borderRadius="md" />
                  </Box>
                </VStack>
              </VStack>
            </Box>
          </GridItem>
          
          {/* Achievements */}
          <GridItem>
            <Box 
              bg={cardBg} 
              p={6} 
              borderRadius="xl" 
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
            >
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                  Recent Achievements
                </Heading>
                <Divider />
                
                <VStack align="stretch" spacing={3}>
                  <HStack>
                    <Box fontSize="2xl">🏆</Box>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" fontSize="lg">
                        {user.role === 'manager' ? 'Excellence Manager' : 'Goal Crusher'}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {user.role === 'manager' ? 'Managed 24 team members successfully' : 'Completed 20 tasks this week'}
                      </Text>
                    </VStack>
                  </HStack>
                  
                  <HStack>
                    <Box fontSize="2xl">🌟</Box>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" fontSize="lg">
                        {user.role === 'manager' ? 'Team Builder' : 'Team Player'}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {user.role === 'manager' ? 'Built high-performing teams' : 'Helped 5 colleagues'}
                      </Text>
                    </VStack>
                  </HStack>
                  
                  <HStack>
                    <Box fontSize="2xl">🎯</Box>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" fontSize="lg">
                        {user.role === 'manager' ? 'Strategic Leader' : 'Focus Master'}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {user.role === 'manager' ? 'Achieved 95% team productivity' : '4 hours deep work session'}
                      </Text>
                    </VStack>
                  </HStack>
                  
                  <HStack>
                    <Box fontSize="2xl">🚀</Box>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" fontSize="lg">
                        {user.role === 'manager' ? 'Growth Catalyst' : 'Innovation'}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {user.role === 'manager' ? 'Improved team efficiency by 15%' : 'Proposed 3 new ideas'}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </VStack>
            </Box>
          </GridItem>
          
          {/* Export Data */}
          <GridItem>
            <Box 
              bg={cardBg} 
              p={6} 
              borderRadius="xl" 
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
            >
              <VStack align="stretch" spacing={4}>
                <HStack spacing={3}>
                  <ChakraIcon as={FaDownload} color="blue.500" w={6} h={6} />
                  <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                    Export Data
                  </Heading>
                </HStack>
                <Divider />
                
                <VStack align="stretch" spacing={4}>
                  <Text fontSize="sm" color="gray.600" lineHeight="1.5">
                    Download your productivity reports, analytics, and workspace data in multiple formats.
                  </Text>
                  
                  <VStack align="stretch" spacing={3}>
                    <HStack>
                      <ChakraIcon as={FaChartLine} color="green.500" w={5} h={5} />
                      <VStack align="start" spacing={0} flex={1}>
                        <Text fontWeight="semibold" fontSize="sm">Productivity Reports</Text>
                        <Text fontSize="xs" color="gray.500">Weekly and monthly analytics</Text>
                      </VStack>
                    </HStack>
                    
                    <HStack>
                      <ChakraIcon as={FaFileExport} color="purple.500" w={5} h={5} />
                      <VStack align="start" spacing={0} flex={1}>
                        <Text fontWeight="semibold" fontSize="sm">Workspace Data</Text>
                        <Text fontSize="xs" color="gray.500">Tasks, goals, and activity logs</Text>
                      </VStack>
                    </HStack>
                  </VStack>
                  
                  <Button colorScheme="blue" size="md" leftIcon={<FaDownload />}>
                    Download Reports
                  </Button>
                </VStack>
              </VStack>
            </Box>
          </GridItem>
          
          {/* Recent Activity */}
          <GridItem colSpan={2}>
            <Box 
              bg={cardBg} 
              p={6} 
              borderRadius="xl" 
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
            >
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                  Recent Activity
                </Heading>
                <Divider />
                
                <VStack align="stretch" spacing={3}>
                  <HStack>
                    <Box w="8px" h="8px" bg="green.400" borderRadius="full" />
                    <VStack align="start" spacing={0} flex={1}>
                      <Text fontWeight="medium" fontSize="lg">
                        {user.role === 'manager' ? 'Reviewed team performance reports' : 'Completed task: Website Redesign'}
                      </Text>
                      <Text fontSize="sm" color="gray.500">2 hours ago</Text>
                    </VStack>
                  </HStack>
                  
                  <HStack>
                    <Box w="8px" h="8px" bg="blue.400" borderRadius="full" />
                    <VStack align="start" spacing={0} flex={1}>
                      <Text fontWeight="medium" fontSize="lg">
                        {user.role === 'manager' ? 'Conducted team strategy meeting' : 'Started collaboration with Design Team'}
                      </Text>
                      <Text fontSize="sm" color="gray.500">5 hours ago</Text>
                    </VStack>
                  </HStack>
                  
                  <HStack>
                    <Box w="8px" h="8px" bg="purple.400" borderRadius="full" />
                    <VStack align="start" spacing={0} flex={1}>
                      <Text fontWeight="medium" fontSize="lg">
                        {user.role === 'manager' ? 'Approved quarterly budget allocation' : 'Achieved weekly productivity goal'}
                      </Text>
                      <Text fontSize="sm" color="gray.500">1 day ago</Text>
                    </VStack>
                  </HStack>
                  
                  <HStack>
                    <Box w="8px" h="8px" bg="orange.400" borderRadius="full" />
                    <VStack align="start" spacing={0} flex={1}>
                      <Text fontWeight="medium" fontSize="lg">
                        {user.role === 'manager' ? 'Updated team management settings' : 'Updated profile settings'}
                      </Text>
                      <Text fontSize="sm" color="gray.500">2 days ago</Text>
                    </VStack>
                  </HStack>
                </VStack>
              </VStack>            </Box>
          </GridItem>
        </Grid>
          </MotionBox>
        </Box>
      </Box>
    </Layout>
  );
}