import { 
  Box, 
  Heading, 
  Text, 
  Grid, 
  GridItem, 
  VStack, 
  HStack, 
  Progress, 
  Badge, 
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Divider,
  SimpleGrid,
  Flex,
  Icon
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { 
  FaChartLine, 
  FaUsers, 
  FaTasks, 
  FaClock,
  FaTrendingUp,
  FaCalendarWeek,
  FaAward,
  FaSync
} from "react-icons/fa";
import Layout from "../components/Layout";
import PieChart from "../components/PieChartNew";
import ProductivityChart from "../components/ProductivityChart";

const MotionBox = motion(Box);

export default function ReportsPage() {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  
  // Datos para las gráficas
  const weeklyData = [
    { date: "Monday", productiveHours: 7.2 },
    { date: "Tuesday", productiveHours: 8.1 },
    { date: "Wednesday", productiveHours: 6.8 },
    { date: "Thursday", productiveHours: 7.9 },
    { date: "Friday", productiveHours: 7.5 },
    { date: "Saturday", productiveHours: 4.2 },
    { date: "Sunday", productiveHours: 3.1 },
  ];

  const taskDistribution = [
    { name: "Completed", value: 42 },
    { name: "In Progress", value: 18 },
    { name: "Pending", value: 12 },
    { name: "Overdue", value: 5 }
  ];

  const teamEfficiency = [
    { name: "High Performers", value: 8 },
    { name: "Good Performance", value: 12 },
    { name: "Average", value: 6 },
    { name: "Needs Improvement", value: 3 }
  ];

  const timeDistribution = [
    { name: "Deep Work", value: 6.2 },
    { name: "Meetings", value: 2.1 },
    { name: "Breaks", value: 1.2 },
    { name: "Admin Tasks", value: 1.5 }
  ];
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
              Reports & Analytics
            </Heading>
        
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>          {/* Productivity Overview */}
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
                  Team Productivity
                </Heading>
                <Divider />
                
                <Stat>
                  <StatLabel fontSize="lg">This Week</StatLabel>
                  <StatNumber fontSize="3xl" color="green.500">87%</StatNumber>
                  <StatHelpText fontSize="lg">
                    <StatArrow type="increase" />
                    12.5% increase from last week
                  </StatHelpText>
                </Stat>
                
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="medium" fontSize="lg">Weekly Goal</Text>
                    <Text fontSize="lg" color="green.500">87/100</Text>
                  </HStack>
                  <Progress value={87} colorScheme="green" size="lg" borderRadius="md" />
                </Box>
              </VStack>
            </Box>
          </GridItem>          {/* Task Completion */}
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
                  Task Completion
                </Heading>
                <Divider />
                
                <Stat>
                  <StatLabel fontSize="lg">Completed Tasks</StatLabel>
                  <StatNumber fontSize="3xl" color="blue.500">42</StatNumber>
                  <StatHelpText fontSize="lg">
                    <StatArrow type="increase" />
                    8 more than last week
                  </StatHelpText>
                </Stat>
                
                <VStack spacing={3}>
                  <Box w="full">
                    <HStack justify="space-between" mb={1}>
                      <Text fontSize="lg">High Priority</Text>
                      <Badge colorScheme="red" fontSize="sm">15/18</Badge>
                    </HStack>
                    <Progress value={83} colorScheme="red" size="lg" borderRadius="md" />
                  </Box>
                  
                  <Box w="full">
                    <HStack justify="space-between" mb={1}>
                      <Text fontSize="lg">Medium Priority</Text>
                      <Badge colorScheme="orange" fontSize="sm">18/20</Badge>
                    </HStack>
                    <Progress value={90} colorScheme="orange" size="lg" borderRadius="md" />
                  </Box>
                  
                  <Box w="full">
                    <HStack justify="space-between" mb={1}>
                      <Text fontSize="lg">Low Priority</Text>
                      <Badge colorScheme="green" fontSize="sm">9/12</Badge>
                    </HStack>
                    <Progress value={75} colorScheme="green" size="lg" borderRadius="md" />
                  </Box>
                </VStack>
              </VStack>
            </Box>
          </GridItem>
          
          {/* Team Performance */}
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
                  Team Performance
                </Heading>
                <Divider />
                
                <VStack spacing={3}>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="lg" fontWeight="medium">Alice Johnson</Text>
                    <Badge colorScheme="green" fontSize="sm">92%</Badge>
                  </HStack>
                  <Progress value={92} colorScheme="green" size="lg" borderRadius="md" w="full" />
                  
                  <HStack justify="space-between" w="full">
                    <Text fontSize="lg" fontWeight="medium">Emma Brown</Text>
                    <Badge colorScheme="green" fontSize="sm">88%</Badge>
                  </HStack>
                  <Progress value={88} colorScheme="green" size="lg" borderRadius="md" w="full" />
                  
                  <HStack justify="space-between" w="full">
                    <Text fontSize="lg" fontWeight="medium">Carol Smith</Text>
                    <Badge colorScheme="yellow" fontSize="sm">85%</Badge>
                  </HStack>
                  <Progress value={85} colorScheme="yellow" size="lg" borderRadius="md" w="full" />
                  
                  <HStack justify="space-between" w="full">
                    <Text fontSize="lg" fontWeight="medium">Frank Davis</Text>
                    <Badge colorScheme="yellow" fontSize="sm">80%</Badge>
                  </HStack>
                  <Progress value={80} colorScheme="yellow" size="lg" borderRadius="md" w="full" />
                </VStack>
              </VStack>
            </Box>
          </GridItem>
          
          {/* Weekly Insights */}
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
                  Weekly Insights
                </Heading>
                <Divider />
                
                <VStack align="stretch" spacing={3}>
                  <HStack>
                    <Box w="8px" h="8px" bg="green.400" borderRadius="full" />
                    <VStack align="start" spacing={0} flex={1}>
                      <Text fontWeight="medium" fontSize="lg">Most Productive Day</Text>
                      <Text fontSize="sm" color="gray.500">Tuesday - 94% team productivity</Text>
                    </VStack>
                  </HStack>
                  
                  <HStack>
                    <Box w="8px" h="8px" bg="blue.400" borderRadius="full" />
                    <VStack align="start" spacing={0} flex={1}>
                      <Text fontWeight="medium" fontSize="lg">Peak Working Hours</Text>
                      <Text fontSize="sm" color="gray.500">10:00 AM - 12:00 PM</Text>
                    </VStack>
                  </HStack>
                  
                  <HStack>
                    <Box w="8px" h="8px" bg="purple.400" borderRadius="full" />
                    <VStack align="start" spacing={0} flex={1}>
                      <Text fontWeight="medium" fontSize="lg">Top Performer</Text>
                      <Text fontSize="sm" color="gray.500">Alice Johnson - 92% productivity</Text>
                    </VStack>
                  </HStack>
                  
                  <HStack>
                    <Box w="8px" h="8px" bg="orange.400" borderRadius="full" />
                    <VStack align="start" spacing={0} flex={1}>
                      <Text fontWeight="medium" fontSize="lg">Collaboration Score</Text>
                      <Text fontSize="sm" color="gray.500">89% - Excellent team synergy</Text>
                    </VStack>
                  </HStack>                </VStack>
              </VStack>
            </Box>
          </GridItem>
        </Grid>

        {/* Analytics Charts Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          mt={8}
        >
          <Heading 
            size="xl" 
            color={useColorModeValue("gray.700", "white")}
            mb={6}
          >
            📊 Advanced Analytics
          </Heading>          {/* Charts Grid */}          <SimpleGrid columns={[1, 2, 2, 4]} spacing={6} mb={8}>
            <Box h="380px">
              <PieChart 
                data={taskDistribution}
                title="Task Distribution"
                size="sm"
              />
            </Box>
            
            <Box h="380px">
              <PieChart 
                data={teamEfficiency}
                title="Team Efficiency"
                size="sm"
              />
            </Box>
            
            <Box h="380px">
              <PieChart 
                data={timeDistribution}
                title="Time Allocation"
                size="sm"
              />
            </Box>
            
            <Box h="380px">
              <PieChart 
                data={[
                  { name: "On Track", value: 15 },
                  { name: "At Risk", value: 8 },
                  { name: "Delayed", value: 4 },
                  { name: "Completed", value: 23 }
                ]}
                title="Project Status"
                size="sm"
              />            </Box>
          </SimpleGrid>

          {/* Weekly Trend Chart */}
          <Box
            bg={cardBg}
            p={6}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            boxShadow="lg"
            mb={8}
          >
            <Flex justify="space-between" align="center" mb={6}>
              <VStack align="flex-start" spacing={1}>
                <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                  📈 Weekly Productivity Trend
                </Heading>
                <Text color="gray.500" fontSize="sm">
                  Team productivity hours over the past week
                </Text>
              </VStack>
              <HStack spacing={2}>
                <Icon as={FaTrendingUp} color="green.500" />
                <Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="full">
                  +15% vs last week
                </Badge>
              </HStack>
            </Flex>
            <ProductivityChart 
              data={weeklyData} 
              title="Weekly Productivity Trend"
              variant="area"
              showStats={true}
              height={400}
            />
          </Box>

          {/* Performance Metrics */}
          <SimpleGrid columns={[1, 2, 4]} spacing={6}>
            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              boxShadow="lg"
            >
              <VStack spacing={4}>
                <Flex
                  w={12}
                  h={12}
                  bg="blue.50"
                  borderRadius="xl"
                  align="center"
                  justify="center"
                >
                  <Icon as={FaUsers} w={6} h={6} color="blue.500" />
                </Flex>
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                    29
                  </Text>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    Active Team Members
                  </Text>
                </VStack>
              </VStack>
            </Box>

            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              boxShadow="lg"
            >
              <VStack spacing={4}>
                <Flex
                  w={12}
                  h={12}
                  bg="green.50"
                  borderRadius="xl"
                  align="center"
                  justify="center"
                >
                  <Icon as={FaTasks} w={6} h={6} color="green.500" />
                </Flex>
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="green.500">
                    156
                  </Text>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    Tasks Completed
                  </Text>
                </VStack>
              </VStack>
            </Box>

            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              boxShadow="lg"
            >
              <VStack spacing={4}>
                <Flex
                  w={12}
                  h={12}
                  bg="orange.50"
                  borderRadius="xl"
                  align="center"
                  justify="center"
                >
                  <Icon as={FaClock} w={6} h={6} color="orange.500" />
                </Flex>
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                    247h
                  </Text>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    Total Work Hours
                  </Text>
                </VStack>
              </VStack>
            </Box>

            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              boxShadow="lg"
            >
              <VStack spacing={4}>
                <Flex
                  w={12}
                  h={12}
                  bg="purple.50"
                  borderRadius="xl"
                  align="center"
                  justify="center"
                >
                  <Icon as={FaAward} w={6} h={6} color="purple.500" />
                </Flex>
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                    94%
                  </Text>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    Quality Score
                  </Text>
                </VStack>
              </VStack>
            </Box>
          </SimpleGrid>
        </MotionBox>
          </MotionBox>
        </Box>
      </Box>
    </Layout>
  );
}