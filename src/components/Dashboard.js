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
  InputLeftElement
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { 
  FaUsers, 
  FaChartLine, 
  FaClock, 
  FaSearch,
  FaDownload
} from "react-icons/fa";
import ProductivityChart from "./ProductivityChart";
import UserCard from "./UserCard";
import MetricCard from "./MetricCard";

const MotionBox = motion(Box);

export default function Dashboard({ users, data }) {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  
  // Ranking: sort users by productivity
  const topUsers = [...users].sort((a, b) => b.productivity - a.productivity).slice(0, 5);
  
  // Calculate metrics
  const avgProductivity = Math.round(users.reduce((sum, user) => sum + user.productivity, 0) / users.length);
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.productivity > 50).length;
  const weeklyHours = data.reduce((sum, day) => sum + day.productiveHours, 0);
  const metrics = [
    {
      title: "Total Employees",
      value: totalUsers,
      change: "+12% this month",
      changeType: "increase",
      icon: FaUsers,
      color: "brand",
      description: "Active team members"
    },
    {
      title: "Avg Productivity",
      value: `${avgProductivity}%`,
      change: "+8% from last week",
      changeType: "increase",
      icon: FaChartLine,
      color: "success",
      description: "Team performance"
    },
    {
      title: "Weekly Hours",
      value: `${weeklyHours}h`,
      change: "+5% this week",
      changeType: "increase",
      icon: FaClock,
      color: "warning",
      description: "Productive time"
    }
  ];

  return (
    <Box>
      {/* Header Section */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Flex justify="space-between" align="center" mb={8}>
          <VStack align="flex-start" spacing={1}>
            <Heading size="xl" bgGradient="linear(to-r, brand.400, brand.600)" bgClip="text">
              Productivity Dashboard
            </Heading>
            <Text color="gray.500" fontSize="lg">
              Monitor your team's performance and productivity metrics
            </Text>
          </VStack>
          
          <HStack spacing={3}>            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color="gray.400" />
              </InputLeftElement>
              <Input placeholder="Search employees..." borderRadius="lg" />
            </InputGroup>
            
            <Select placeholder="Filter by team" maxW="200px" borderRadius="lg">
              <option value="all">All Teams</option>
              <option value="design">Design</option>
              <option value="dev">Development</option>
              <option value="marketing">Marketing</option>
            </Select>
              <Button 
              leftIcon={<FaDownload />} 
              colorScheme="brand" 
              variant="outline"
              borderRadius="lg"
            >
              Export
            </Button>
          </HStack>
        </Flex>
      </MotionBox>

      {/* Metrics Grid */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={8}>
          {metrics.map((metric, index) => (
            <MetricCard 
              key={metric.title}
              {...metric}
              delay={index * 0.1}
            />
          ))}
        </SimpleGrid>
      </MotionBox>

      {/* User Cards Grid */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        mb={8}
      >
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg">Team Members</Heading>
          <Badge colorScheme="brand" variant="subtle" px={3} py={1} borderRadius="full">
            {users.length} Active
          </Badge>
        </Flex>
        
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {users.map((user, index) => (
            <MotionBox
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <UserCard user={user} />
            </MotionBox>
          ))}
        </SimpleGrid>
      </MotionBox>

      {/* Charts and Analytics */}
      <SimpleGrid columns={[1, null, 2]} spacing={8} mb={8}>
        {/* Productivity Chart */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Box
            bg={bg}
            p={6}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          >
            <Flex justify="space-between" align="center" mb={6}>
              <VStack align="flex-start" spacing={1}>
                <Heading size="md">Weekly Productivity</Heading>
                <Text color="gray.500" fontSize="sm">
                  Hours tracked this week
                </Text>
              </VStack>
              <Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="full">
                +8% vs last week
              </Badge>
            </Flex>
            <ProductivityChart 
              data={data} 
              title="Weekly Productivity"
              variant="area"
              showStats={true}
              height={360}
            />
          </Box>
        </MotionBox>

        {/* Top Performers */}
        <MotionBox
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Box
            bg={bg}
            p={6}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          >
            <Flex justify="space-between" align="center" mb={6}>
              <VStack align="flex-start" spacing={1}>
                <Heading size="md">Top Performers</Heading>
                <Text color="gray.500" fontSize="sm">
                  Highest productivity this week
                </Text>
              </VStack>
              <Icon as={FaChartLine} color="green.500" w={6} h={6} />
            </Flex>
            
            <VStack spacing={4} align="stretch">
              {topUsers.map((user, idx) => (
                <MotionBox
                  key={user.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
                >
                  <Flex justify="space-between" align="center" p={3} borderRadius="lg" bg={useColorModeValue("gray.50", "gray.700")}>
                    <HStack spacing={3}>
                      <Flex
                        w={8}
                        h={8}
                        bg={idx === 0 ? "yellow.500" : idx === 1 ? "gray.400" : "orange.600"}
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
                        <Text fontSize="sm" color="gray.500">
                          Team Member
                        </Text>
                      </VStack>
                    </HStack>
                    
                    <VStack align="flex-end" spacing={0}>
                      <Text fontWeight="bold" color="brand.500">
                        {user.productivity}%
                      </Text>
                      <Text fontSize="xs" color="green.500">
                        +{Math.floor(Math.random() * 10)}% this week
                      </Text>
                    </VStack>
                  </Flex>
                </MotionBox>
              ))}
            </VStack>
          </Box>
        </MotionBox>
      </SimpleGrid>
    </Box>
  );
}