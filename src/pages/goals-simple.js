import { useState } from "react";
import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Text, 
  Badge, 
  Button, 
  VStack, 
  HStack,
  Progress,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Flex,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  CircularProgress,
  CircularProgressLabel
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { 
  FaTarget, 
  FaPlus, 
  FaCheck, 
  FaClock,
  FaFlag,
  FaUsers,
  FaUser,
  FaBullseye,
  FaCalendarAlt,
  FaTasks,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPlay,
  FaStar
} from "react-icons/fa";

const MotionBox = motion(Box);

// Mock data
const goalStats = {
  totalGoals: 12,
  completedGoals: 8,
  activeGoals: 4,
  overdue: 1,
  avgCompletion: 78
};

const personalGoals = [
  {
    id: 1,
    title: "Increase Daily Productivity",
    description: "Maintain 8+ productive hours daily for 30 days",
    type: "personal",
    status: "active",
    progress: 65,
    target: 30,
    current: 19,
    unit: "days",
    deadline: "2025-01-15",
    priority: "high",
    rewards: 150
  },
  {
    id: 2,
    title: "Complete React Certification",
    description: "Finish advanced React course and pass certification exam",
    type: "personal",
    status: "active",
    progress: 40,
    target: 100,
    current: 40,
    unit: "% complete",
    deadline: "2025-02-01",
    priority: "medium",
    rewards: 200
  }
];

const teamGoals = [
  {
    id: 4,
    title: "Q1 Sprint Velocity",
    description: "Achieve 85% story point completion rate for Q1",
    type: "team",
    status: "active",
    progress: 78,
    target: 85,
    current: 78,
    unit: "% completion",
    deadline: "2025-03-31",
    priority: "high",
    rewards: 300,
    teamMembers: 6
  }
];

export default function GoalsPage() {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const accentColor = useColorModeValue("zen.500", "zen.300");
  const gradientBg = useColorModeValue(
    "linear(135deg, zen.50 0%, mindful.100 30%, zen.100 100%)",
    "linear(135deg, gray.900 0%, gray.800 30%, gray.700 100%)"
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "green";
      case "active": return "blue";
      case "paused": return "yellow";
      case "overdue": return "red";
      default: return "gray";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "red";
      case "medium": return "orange";
      case "low": return "green";
      default: return "gray";
    }
  };

  const renderGoalCard = (goal) => (
    <MotionBox
      key={goal.id}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <Box 
        bg={cardBg} 
        borderColor={borderColor}
        border="1px solid"
        borderRadius="xl"
        p={6}
        cursor="pointer"
        onClick={() => {setSelectedGoal(goal); onOpen();}}
        _hover={{ boxShadow: "lg" }}
        h="100%"
      >
        <VStack spacing={4} align="stretch">
          <Flex justify="space-between" align="flex-start">
            <VStack align="flex-start" spacing={1} flex={1}>
              <HStack>
                <Icon as={FaTarget} color={accentColor} />
                <Text fontWeight="bold" color={textColor} fontSize="md">
                  {goal.title}
                </Text>
              </HStack>
              <Text fontSize="sm" color="gray.500" noOfLines={2}>
                {goal.description}
              </Text>
            </VStack>
            
            <VStack spacing={1} align="flex-end">
              <Badge colorScheme={getStatusColor(goal.status)} variant="subtle">
                {goal.status}
              </Badge>
              <Badge colorScheme={getPriorityColor(goal.priority)} size="sm">
                {goal.priority}
              </Badge>
            </VStack>
          </Flex>

          {/* Progress */}
          <Box>
            <Flex justify="space-between" mb={2}>
              <Text fontSize="sm" color="gray.600">Progress</Text>
              <Text fontSize="sm" fontWeight="bold" color={textColor}>
                {goal.current}/{goal.target} {goal.unit}
              </Text>
            </Flex>
            <Progress 
              value={goal.progress} 
              colorScheme={getStatusColor(goal.status)}
              borderRadius="full"
              size="sm"
            />
            <Text fontSize="xs" color="gray.500" mt={1}>
              {goal.progress}% complete
            </Text>
          </Box>

          {/* Metadata */}
          <SimpleGrid columns={2} spacing={4}>
            <VStack spacing={1} align="flex-start">
              <HStack>
                <Icon as={FaCalendarAlt} boxSize={3} color="gray.400" />
                <Text fontSize="xs" color="gray.500">Deadline</Text>
              </HStack>
              <Text fontSize="sm" fontWeight="medium" color={textColor}>
                {new Date(goal.deadline).toLocaleDateString()}
              </Text>
            </VStack>

            <VStack spacing={1} align="flex-start">
              <HStack>
                <Icon as={FaStar} boxSize={3} color="yellow.500" />
                <Text fontSize="xs" color="gray.500">Reward</Text>
              </HStack>
              <Text fontSize="sm" fontWeight="medium" color={textColor}>
                {goal.rewards} tokens
              </Text>
            </VStack>
          </SimpleGrid>

          {/* Team info for team goals */}
          {goal.type === "team" && (
            <HStack>
              <Icon as={FaUsers} boxSize={3} color="blue.500" />
              <Text fontSize="sm" color="gray.600">
                {goal.teamMembers} team members
              </Text>
            </HStack>
          )}
        </VStack>
      </Box>
    </MotionBox>
  );

  return (
    <Layout>
      <Box bgGradient={gradientBg} minH="100vh">
        <Box p={8}>
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Flex justify="space-between" align="center" mb={8}>
              <VStack align="flex-start" spacing={2}>
                <Flex align="center" gap={3}>
                  <Icon as={FaBullseye} color="zen.500" boxSize={8} />
                  <Heading size="xl" color={textColor}>
                    Goals & Objectives
                  </Heading>
                </Flex>
                <Text color="gray.500" fontSize="lg">
                  Set, track, and achieve your professional goals
                </Text>
              </VStack>
              
              <Button
                colorScheme="zen"
                leftIcon={<FaPlus />}
                size="lg"
              >
                New Goal
              </Button>
            </Flex>
          </MotionBox>

          {/* Stats Overview */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SimpleGrid columns={[1, 2, 5]} spacing={6} mb={8}>
              <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6}>
                <VStack textAlign="center">
                  <CircularProgress value={goalStats.avgCompletion} color="zen.400" size="60px" mb={3}>
                    <CircularProgressLabel fontSize="sm" fontWeight="bold">
                      {goalStats.avgCompletion}%
                    </CircularProgressLabel>
                  </CircularProgress>
                  <Text fontSize="sm" color="gray.600">Avg Completion</Text>
                </VStack>
              </Box>

              <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6}>
                <VStack textAlign="center">
                  <Icon as={FaTarget} boxSize={6} color="blue.500" mb={2} />
                  <Stat>
                    <StatNumber color={accentColor}>{goalStats.totalGoals}</StatNumber>
                    <StatLabel>Total Goals</StatLabel>
                  </Stat>
                </VStack>
              </Box>

              <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6}>
                <VStack textAlign="center">
                  <Icon as={FaCheckCircle} boxSize={6} color="green.500" mb={2} />
                  <Stat>
                    <StatNumber color={accentColor}>{goalStats.completedGoals}</StatNumber>
                    <StatLabel>Completed</StatLabel>
                  </Stat>
                </VStack>
              </Box>

              <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6}>
                <VStack textAlign="center">
                  <Icon as={FaPlay} boxSize={6} color="orange.500" mb={2} />
                  <Stat>
                    <StatNumber color={accentColor}>{goalStats.activeGoals}</StatNumber>
                    <StatLabel>Active</StatLabel>
                  </Stat>
                </VStack>
              </Box>

              <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6}>
                <VStack textAlign="center">
                  <Icon as={FaExclamationTriangle} boxSize={6} color="red.500" mb={2} />
                  <Stat>
                    <StatNumber color={accentColor}>{goalStats.overdue}</StatNumber>
                    <StatLabel>Overdue</StatLabel>
                  </Stat>
                </VStack>
              </Box>
            </SimpleGrid>
          </MotionBox>

          {/* Goals Tabs */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs variant="soft-rounded" colorScheme="zen">
              <TabList mb={6}>
                <Tab leftIcon={<FaUser />}>Personal Goals</Tab>
                <Tab leftIcon={<FaUsers />}>Team Goals</Tab>
              </TabList>

              <TabPanels>
                {/* Personal Goals */}
                <TabPanel p={0}>
                  <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                    {personalGoals.map(renderGoalCard)}
                  </SimpleGrid>
                </TabPanel>

                {/* Team Goals */}
                <TabPanel p={0}>
                  <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                    {teamGoals.map(renderGoalCard)}
                  </SimpleGrid>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </MotionBox>
        </Box>
      </Box>

      {/* Goal Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Icon as={FaTarget} color={accentColor} />
              <Text>{selectedGoal?.title}</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedGoal && (
              <VStack spacing={6} align="stretch">
                <Text color="gray.600">
                  {selectedGoal.description}
                </Text>
                
                <SimpleGrid columns={2} spacing={4}>
                  <VStack align="flex-start" spacing={1}>
                    <Text fontSize="sm" color="gray.500">Priority</Text>
                    <Badge colorScheme={getPriorityColor(selectedGoal.priority)}>
                      {selectedGoal.priority}
                    </Badge>
                  </VStack>
                  <VStack align="flex-start" spacing={1}>
                    <Text fontSize="sm" color="gray.500">Status</Text>
                    <Badge colorScheme={getStatusColor(selectedGoal.status)}>
                      {selectedGoal.status}
                    </Badge>
                  </VStack>
                </SimpleGrid>

                <Box>
                  <Text fontWeight="bold" mb={2}>Progress</Text>
                  <Progress 
                    value={selectedGoal.progress} 
                    colorScheme={getStatusColor(selectedGoal.status)}
                    borderRadius="full"
                    size="lg"
                    mb={2}
                  />
                  <Flex justify="space-between">
                    <Text fontSize="sm" color="gray.600">
                      {selectedGoal.current} / {selectedGoal.target} {selectedGoal.unit}
                    </Text>
                    <Text fontSize="sm" fontWeight="bold">
                      {selectedGoal.progress}% complete
                    </Text>
                  </Flex>
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Layout>
  );
}
