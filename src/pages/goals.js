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
  StatHelpText,
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
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  Divider,
  CircularProgress,
  CircularProgressLabel,
  Avatar,
  useToast
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import SmartGoalsAI from "../components/SmartGoalsAI";
import { 
  FaTarget, 
  FaPlus, 
  FaEdit, 
  FaCheck, 
  FaClock,
  FaFlag,
  FaChartLine,
  FaUsers,
  FaUser,
  FaBullseye,
  FaCalendarAlt,
  FaTasks,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPause,
  FaPlay,
  FaRocket,
  FaStar
} from "react-icons/fa";

const MotionBox = motion(Box);

// Mock data
const personalGoals = [
  {
    id: 1,
    title: "Increase Daily Productivity",
    description: "Maintain 8+ productive hours daily for 30 days",
    type: "personal",
    category: "Productivity",
    status: "active",
    progress: 65,
    target: 30,
    current: 19,
    unit: "days",
    deadline: "2025-01-15",
    priority: "high",
    rewards: 150,
    milestones: [
      { day: 7, completed: true, date: "2024-12-20" },
      { day: 14, completed: true, date: "2024-12-27" },
      { day: 21, completed: false, date: null },
      { day: 30, completed: false, date: null }
    ]
  },
  {
    id: 2,
    title: "Complete React Certification",
    description: "Finish advanced React course and pass certification exam",
    type: "personal",
    category: "Learning",
    status: "active",
    progress: 40,
    target: 100,
    current: 40,
    unit: "% complete",
    deadline: "2025-02-01",
    priority: "medium",
    rewards: 200,
    milestones: [
      { name: "Course modules", completed: true, date: "2024-12-15" },
      { name: "Practice projects", completed: false, date: null },
      { name: "Mock exams", completed: false, date: null },
      { name: "Final certification", completed: false, date: null }
    ]
  },
  {
    id: 3,
    title: "Wellness Challenge",
    description: "Take 10k steps daily and 5min meditation for 21 days",
    type: "personal",
    category: "Wellness",
    status: "completed",
    progress: 100,
    target: 21,
    current: 21,
    unit: "days",
    deadline: "2024-12-31",
    priority: "low",
    rewards: 100,
    completedDate: "2024-12-31"
  }
];

const teamGoals = [
  {
    id: 4,
    title: "Q1 Sprint Velocity",
    description: "Achieve 85% story point completion rate for Q1",
    type: "team",
    category: "Performance",
    status: "active",
    progress: 78,
    target: 85,
    current: 78,
    unit: "% completion",
    deadline: "2025-03-31",
    priority: "high",
    rewards: 300,
    teamMembers: 6,
    collaborators: [
      { name: "Alice Johnson", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alice" },
      { name: "Bob Martinez", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bob" },
      { name: "Carol Smith", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carol" }
    ]
  },
  {
    id: 5,
    title: "Code Quality Initiative",
    description: "Maintain 90%+ code coverage and reduce bugs by 50%",
    type: "team",
    category: "Quality",
    status: "active",
    progress: 45,
    target: 90,
    current: 45,
    unit: "% coverage",
    deadline: "2025-04-15",
    priority: "medium",
    rewards: 250,
    teamMembers: 8
  }
];

export default function GoalsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [userPersonalGoals, setUserPersonalGoals] = useState(personalGoals);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isNewGoalOpen, onOpen: onNewGoalOpen, onClose: onNewGoalClose } = useDisclosure();
  const toast = useToast();
  
  const allGoals = [...userPersonalGoals, ...teamGoals];
  
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const accentColor = useColorModeValue("zen.500", "zen.300");
  const gradientBg = useColorModeValue(
    "linear(135deg, zen.50 0%, mindful.100 30%, zen.100 100%)",
    "linear(135deg, gray.900 0%, gray.800 30%, gray.700 100%)"
  );

  const addAIGeneratedGoal = (aiGoal) => {
    const newGoal = {
      id: Date.now(), // Simple ID generation
      title: aiGoal.title,
      description: aiGoal.description,
      progress: 0,
      target: aiGoal.target || 100,
      category: aiGoal.category || "Personal Development",
      dueDate: aiGoal.dueDate || "2025-01-31",
      status: "active",
      priority: aiGoal.priority || "medium",
      aiGenerated: true // Mark as AI generated
    };
    
    setUserPersonalGoals(prev => [...prev, newGoal]);
    
    // Show confirmation
    toast({
      title: "AI Goal Added",
      description: `"${aiGoal.title}" has been added to your personal goals.`,
      status: "success",
      duration: 4000,
      isClosable: true,
      position: "top-right"
    });
  };

  // Calculate statistics dynamically
  const goalStats = {
    totalGoals: allGoals.length,
    completedGoals: allGoals.filter(g => g.status === "completed").length,
    activeGoals: allGoals.filter(g => g.status === "active").length,
    overdue: allGoals.filter(g => {
      const deadline = new Date(g.deadline);
      const today = new Date();
      return deadline < today && g.status !== "completed";
    }).length,
    avgCompletion: allGoals.length > 0 ? Math.round(
      allGoals.reduce((acc, goal) => acc + (goal.progress || 0), 0) / allGoals.length
    ) : 0,
    streak: 5
  };

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

  const openGoalDetail = (goal) => {
    setSelectedGoal(goal);
    onOpen();
  };  const renderGoalCard = (goal) => (
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
        onClick={() => openGoalDetail(goal)}
        _hover={{ boxShadow: "lg" }}
        h="100%"
      >
        <Box pb={3}>
          <Flex justify="space-between" align="flex-start">
            <VStack align="flex-start" spacing={1} flex={1}>
              <HStack>
                <Box w={4} h={4} bg={accentColor} borderRadius="full" />
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
              {goal.aiGenerated && (
                <Badge colorScheme="purple" variant="outline" size="sm">
                  AI
                </Badge>
              )}
            </VStack>
          </Flex>
        </Box>

        <Box pt={0}>
          <VStack spacing={4} align="stretch">
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
                  <Text fontSize="xs" color="gray.400">📅</Text>
                  <Text fontSize="xs" color="gray.500">Deadline</Text>
                </HStack>
                <Text fontSize="sm" fontWeight="medium" color={textColor}>
                  {new Date(goal.deadline).toLocaleDateString()}
                </Text>
              </VStack>

              <VStack spacing={1} align="flex-start">
                <HStack>
                  <Text fontSize="xs" color="yellow.500">⭐</Text>
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
                <Text fontSize="sm" color="blue.500">👥</Text>
                <Text fontSize="sm" color="gray.600">
                  {goal.teamMembers} team members
                </Text>
              </HStack>
            )}
          </VStack>
        </Box>
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
              <Flex align="center" gap={4}>
                <Box 
                  w={8} 
                  h={8} 
                  bg="zen.500" 
                  borderRadius="full" 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center"
                  color="white"
                  fontSize="lg"
                  fontWeight="bold"
                >
                  G
                </Box>
                <Box>
                  <Heading size="xl" color={textColor} mb={0}>
                    Goals & Objectives
                  </Heading>
                  <Text color="gray.500" fontSize="md" mt={1}>
                    Set, track, and achieve your professional goals
                  </Text>
                </Box>
              </Flex>
              
              <Button
                colorScheme="zen"
                onClick={onNewGoalOpen}
                size="lg"
              >
                + New Goal
              </Button>
            </Flex>
          </MotionBox>

          {/* Smart Goals AI */}
          <SmartGoalsAI 
            userData={{
              productivity: 73,
              consistency: "medium",
              focusTime: 5.5,
              distractedTime: 1.2,
              restTime: 0.4,
              weeklyHours: 40
            }}
            onGoalGenerated={addAIGeneratedGoal}
          />

          {/* Stats Overview */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >            <SimpleGrid columns={[1, 2, 5]} spacing={6} mb={8}>
              <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6} textAlign="center">
                <CircularProgress value={goalStats.avgCompletion} color="zen.400" size="60px" mb={3}>
                  <CircularProgressLabel fontSize="sm" fontWeight="bold">
                    {goalStats.avgCompletion}%
                  </CircularProgressLabel>
                </CircularProgress>
                <Text fontSize="sm" color="gray.600">Avg Completion</Text>
              </Box>

              <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6} textAlign="center">
                <Text fontSize="2xl" mb={2}>●</Text>
                <Stat>
                  <StatNumber color={accentColor}>{goalStats.totalGoals}</StatNumber>
                  <StatLabel>Total Goals</StatLabel>
                </Stat>
              </Box>

              <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6} textAlign="center">
                <Text fontSize="2xl" color="green.500" mb={2}>✓</Text>
                <Stat>
                  <StatNumber color={accentColor}>{goalStats.completedGoals}</StatNumber>
                  <StatLabel>Completed</StatLabel>
                </Stat>
              </Box>

              <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6} textAlign="center">
                <Text fontSize="2xl" color="orange.500" mb={2}>▶</Text>
                <Stat>
                  <StatNumber color={accentColor}>{goalStats.activeGoals}</StatNumber>
                  <StatLabel>Active</StatLabel>
                </Stat>
              </Box>

              <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6} textAlign="center">
                <Text fontSize="2xl" color="red.500" mb={2}>!</Text>
                <Stat>
                  <StatNumber color={accentColor}>{goalStats.overdue}</StatNumber>
                  <StatLabel>Overdue</StatLabel>
                </Stat>
              </Box>
            </SimpleGrid>
          </MotionBox>

          {/* Goals Tabs */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs variant="soft-rounded" colorScheme="zen" index={activeTab} onChange={setActiveTab}>
              <TabList mb={6}>
                <Tab leftIcon={<FaUser />}>Personal Goals</Tab>
                <Tab leftIcon={<FaUsers />}>Team Goals</Tab>
                <Tab leftIcon={<FaTasks />}>All Goals</Tab>
              </TabList>

              <TabPanels>
                {/* Personal Goals */}
                <TabPanel p={0}>
                  <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                    {userPersonalGoals.map(renderGoalCard)}
                  </SimpleGrid>
                </TabPanel>

                {/* Team Goals */}
                <TabPanel p={0}>
                  <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                    {teamGoals.map(renderGoalCard)}
                  </SimpleGrid>
                </TabPanel>

                {/* All Goals */}
                <TabPanel p={0}>
                  <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                    {allGoals.map(renderGoalCard)}
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
                {/* Goal Info */}
                <Box>
                  <Text color="gray.600" mb={4}>
                    {selectedGoal.description}
                  </Text>
                  
                  <SimpleGrid columns={2} spacing={4} mb={4}>
                    <VStack align="flex-start" spacing={1}>
                      <Text fontSize="sm" color="gray.500">Category</Text>
                      <Badge colorScheme="blue">{selectedGoal.category}</Badge>
                    </VStack>
                    <VStack align="flex-start" spacing={1}>
                      <Text fontSize="sm" color="gray.500">Type</Text>
                      <Badge colorScheme="purple">{selectedGoal.type}</Badge>
                    </VStack>
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
                </Box>

                {/* Progress */}
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

                {/* Milestones */}
                {selectedGoal.milestones && (
                  <Box>
                    <Text fontWeight="bold" mb={3}>Milestones</Text>
                    <VStack spacing={3} align="stretch">
                      {selectedGoal.milestones.map((milestone, index) => (
                        <Flex key={index} align="center" gap={3}>
                          <Icon 
                            as={milestone.completed ? FaCheckCircle : FaClock}
                            color={milestone.completed ? "green.500" : "gray.400"}
                          />
                          <Box flex={1}>
                            <Text 
                              fontWeight="medium" 
                              color={milestone.completed ? "green.600" : textColor}
                            >
                              {milestone.name || `Day ${milestone.day}`}
                            </Text>
                            {milestone.date && (
                              <Text fontSize="sm" color="gray.500">
                                Completed on {milestone.date}
                              </Text>
                            )}
                          </Box>
                        </Flex>
                      ))}
                    </VStack>
                  </Box>
                )}

                {/* Team Members (for team goals) */}
                {selectedGoal.type === "team" && selectedGoal.collaborators && (
                  <Box>
                    <Text fontWeight="bold" mb={3}>Team Members</Text>
                    <HStack spacing={2}>
                      {selectedGoal.collaborators.map((member, index) => (
                        <VStack key={index} spacing={1}>
                          <Avatar src={member.avatar} size="sm" />
                          <Text fontSize="xs" color="gray.600">
                            {member.name.split(" ")[0]}
                          </Text>
                        </VStack>
                      ))}
                    </HStack>
                  </Box>
                )}

                {/* Actions */}
                <HStack spacing={3}>
                  <Button leftIcon={<FaEdit />} variant="outline">
                    Edit Goal
                  </Button>
                  {selectedGoal.status === "active" && (
                    <Button leftIcon={<FaPause />} variant="outline" colorScheme="orange">
                      Pause Goal
                    </Button>
                  )}
                  {selectedGoal.status === "paused" && (
                    <Button leftIcon={<FaPlay />} colorScheme="green">
                      Resume Goal
                    </Button>
                  )}
                </HStack>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* New Goal Modal */}
      <Modal isOpen={isNewGoalOpen} onClose={onNewGoalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Goal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Goal Title</FormLabel>
                <Input placeholder="Enter goal title..." />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder="Describe your goal..." />
              </FormControl>

              <SimpleGrid columns={2} spacing={4}>
                <FormControl>
                  <FormLabel>Type</FormLabel>
                  <Select placeholder="Select type">
                    <option value="personal">Personal</option>
                    <option value="team">Team</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Priority</FormLabel>
                  <Select placeholder="Select priority">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </Select>
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={2} spacing={4}>
                <FormControl>
                  <FormLabel>Target</FormLabel>
                  <Input type="number" placeholder="100" />
                </FormControl>

                <FormControl>
                  <FormLabel>Unit</FormLabel>
                  <Input placeholder="hours, days, %" />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel>Deadline</FormLabel>
                <Input type="date" />
              </FormControl>

              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select placeholder="Select category">
                  <option value="productivity">Productivity</option>
                  <option value="learning">Learning</option>
                  <option value="wellness">Wellness</option>
                  <option value="performance">Performance</option>
                  <option value="quality">Quality</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onNewGoalClose}>
              Cancel
            </Button>
            <Button colorScheme="zen" leftIcon={<FaRocket />}>
              Create Goal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}
