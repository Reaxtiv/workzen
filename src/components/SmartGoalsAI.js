import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Badge,
  Button,
  useColorModeValue,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Input,
  Select,
  FormControl,
  FormLabel,
  Textarea,
  Progress,
  Alert,
  AlertIcon,
  Divider
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaMagic,
  FaTarget,
  FaLightbulb,
  FaRocket,
  FaChartLine,
  FaClock,
  FaPlus,
  FaBrain,
  FaUserTie,
  FaDumbbell,
  FaBookOpen,
  FaUsers,
  FaTrophy
} from "react-icons/fa";

const MotionBox = motion(Box);

// Smart Goals AI Engine
class SmartGoalsEngine {
  static analyzeUserProfile(userData, currentGoals = []) {
    return {
      productivityLevel: userData.productivity || 75,
      preferredWorkStyle: this.detectWorkStyle(userData),
      goalCompletionRate: this.calculateCompletionRate(currentGoals),
      timeAvailable: userData.weeklyHours || 40,
      strengths: this.identifyStrengths(userData),
      improvementAreas: this.identifyImprovementAreas(userData)
    };
  }

  static detectWorkStyle(userData) {
    // Simple algorithm to detect work style
    const productivity = userData.productivity || 75;
    const consistency = userData.consistency || "medium";
    
    if (productivity > 85 && consistency === "high") return "achiever";
    if (productivity > 70 && consistency === "medium") return "steady";
    if (productivity < 60) return "improving";
    return "balanced";
  }

  static calculateCompletionRate(goals) {
    if (!goals.length) return 0;
    const completed = goals.filter(g => g.status === "completed").length;
    return Math.round((completed / goals.length) * 100);
  }

  static identifyStrengths(userData) {
    const strengths = [];
    if (userData.productivity > 80) strengths.push("High Performance");
    if (userData.focusTime > 6) strengths.push("Deep Focus");
    if (userData.consistency === "high") strengths.push("Consistency");
    return strengths;
  }

  static identifyImprovementAreas(userData) {
    const areas = [];
    if (userData.productivity < 70) areas.push("Productivity");
    if (userData.distractedTime > 1) areas.push("Focus Management");
    if (userData.restTime < 0.5) areas.push("Work-Life Balance");
    return areas;
  }

  static generateSmartGoals(userProfile, preferences = {}) {
    const goals = [];
    const { productivityLevel, goalCompletionRate, preferredWorkStyle, improvementAreas } = userProfile;

    // Goals based on current productivity
    if (productivityLevel < 70) {
      goals.push({
        id: `smart_${Date.now()}_1`,
        title: "Increase Daily Productivity",
        description: "Achieve 75% average weekly productivity",
        category: "Productivity",
        type: "performance",
        difficulty: "medium",
        estimatedTime: "2 weeks",
        target: 75,
        current: productivityLevel,
        unit: "%",
        icon: FaChartLine,
        reasoning: "Your current productivity is below average. This goal will help you establish a solid foundation.",
        suggestions: [
          "Use the Pomodoro technique (25min work + 5min break)",
          "Eliminate distractions during intense work blocks",
          "Plan the 3 most important tasks each morning"
        ]
      });
    } else if (productivityLevel > 85) {
      goals.push({
        id: `smart_${Date.now()}_2`,
        title: "Maintain Sustainable Excellence",
        description: "Maintain +85% productivity without burnout",
        category: "Sustainability",
        type: "maintenance",
        difficulty: "hard",
        estimatedTime: "1 month",
        target: 85,
        current: productivityLevel,
        unit: "%",
        icon: FaTrophy,
        reasoning: "Your productivity is excellent. Focus on maintaining it sustainably.",
        suggestions: [
          "Schedule regular breaks to avoid burnout",
          "Delegate less critical tasks",
          "Document your most efficient processes"
        ]
      });
    }

    // Goals based on improvement areas
    if (improvementAreas.includes("Focus Management")) {
      goals.push({
        id: `smart_${Date.now()}_3`,
        title: "Improve Focus Management",
        description: "Reduce distraction time to less than 30min daily",
        category: "Focus",
        type: "improvement",
        difficulty: "medium",
        estimatedTime: "3 weeks",
        target: 0.5,
        current: 1.2,
        unit: "hours",
        icon: FaBrain,
        reasoning: "Distractions are affecting your performance. Improving focus will significantly increase your productivity.",
        suggestions: [
          "Turn off non-essential notifications",
          "Establish 2-hour 'Deep Work' blocks",
          "Use mindfulness techniques to maintain attention"
        ]
      });
    }

    // Personal development goals
    goals.push({
      id: `smart_${Date.now()}_4`,
      title: "Skill Development",
      description: "Complete 1 online course related to your work",
      category: "Learning",
      type: "development",
      difficulty: "easy",
      estimatedTime: "1 month",
      target: 1,
      current: 0,
      unit: "course",
      icon: FaBookOpen,
      reasoning: "Continuous learning improves your professional value and job satisfaction.",
      suggestions: [
        "Dedicate 30 minutes daily to learning",
        "Choose courses aligned with your career goals",
        "Apply what you learn in real projects"
      ]
    });

    // Wellness goals
    if (improvementAreas.includes("Work-Life Balance")) {
      goals.push({
        id: `smart_${Date.now()}_5`,
        title: "Work-Life Balance",
        description: "Maintain at least 1 hour daily of active rest",
        category: "Wellness",
        type: "lifestyle",
        difficulty: "easy",
        estimatedTime: "2 weeks",
        target: 1,
        current: 0.3,
        unit: "hours",
        icon: FaDumbbell,
        reasoning: "Better work-life balance improves your productivity and overall wellbeing.",
        suggestions: [
          "Schedule regular physical activity",
          "Set fixed work hours",
          "Practice relaxation techniques"
        ]
      });
    }

    // Filtrar y personalizar según preferencias
    return goals.slice(0, 4).map(goal => ({
      ...goal,
      priority: this.calculatePriority(goal, userProfile),
      timeline: this.generateTimeline(goal)
    }));
  }

  static calculatePriority(goal, userProfile) {
    let score = 0;
    
    // Priority based on impact
    if (goal.type === "improvement" && userProfile.productivityLevel < 70) score += 3;
    if (goal.type === "performance") score += 2;
    if (goal.difficulty === "easy") score += 1;
    
    if (score >= 3) return "high";
    if (score >= 2) return "medium";
    return "low";
  }

  static generateTimeline(goal) {
    const weeks = parseInt(goal.estimatedTime);
    const milestones = [];
    
    for (let i = 1; i <= weeks; i++) {
      const progress = Math.round((i / weeks) * 100);
      milestones.push({
        week: i,
        target: Math.round((goal.target * progress) / 100),
        description: `Week ${i}: ${progress}% completed`
      });
    }
    
    return milestones;
  }
}

export default function SmartGoalsAI({ userData, onGoalGenerated, isVisible = true }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestedGoals, setSuggestedGoals] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGoal, setSelectedGoal] = useState(null);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const accentColor = useColorModeValue("zen.500", "zen.300");

  // Mock user data si no se proporciona
  const mockUserData = {
    productivity: 73,
    consistency: "medium",
    focusTime: 5.5,
    distractedTime: 1.2,
    restTime: 0.4,
    weeklyHours: 40
  };

  const currentUserData = userData || mockUserData;

  useEffect(() => {
    // Analizar perfil del usuario al cargar
    const profile = SmartGoalsEngine.analyzeUserProfile(currentUserData);
    setUserProfile(profile);
  }, [currentUserData]);

  const handleGenerateGoals = async () => {
    setIsGenerating(true);
    
    // Simular procesamiento de IA
    setTimeout(() => {
      const goals = SmartGoalsEngine.generateSmartGoals(userProfile);
      setSuggestedGoals(goals);
      setIsGenerating(false);
    }, 2000);
  };

  const handleGoalDetail = (goal) => {
    setSelectedGoal(goal);
    onOpen();
  };

  const handleAcceptGoal = (goal) => {
    if (onGoalGenerated) {
      onGoalGenerated(goal);
    }
    onClose();
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy": return "green";
      case "medium": return "orange";
      case "hard": return "red";
      default: return "gray";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "red";
      case "medium": return "orange";
      case "low": return "blue";
      default: return "gray";
    }
  };

  if (!isVisible) return null;

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        bg={cardBg}
        borderColor={borderColor}
        border="1px solid"
        borderRadius="xl"
        p={6}
        mb={6}
      >
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <Flex justify="space-between" align="center">
            <HStack>
              <Icon as={FaMagic} color={accentColor} boxSize={6} />
              <VStack align="flex-start" spacing={0}>
                <Text fontWeight="bold" color={textColor}>
                  Smart Goals AI
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Personalized goals based on your performance
                </Text>
              </VStack>
            </HStack>
            <Button
              leftIcon={<FaLightbulb />}
              colorScheme="zen"
              onClick={handleGenerateGoals}
              isLoading={isGenerating}
              loadingText="Generating..."
            >
              Generate Goals
            </Button>
          </Flex>

          {/* User Profile Summary */}
          {userProfile && (
            <Box p={4} bg={useColorModeValue("gray.50", "gray.700")} borderRadius="lg">
              <Text fontWeight="bold" mb={2} color={textColor}>
                Your Productivity Profile:
              </Text>
              <HStack spacing={4} wrap="wrap">
                <Badge colorScheme="blue" variant="outline">
                  Productivity: {userProfile.productivityLevel}%
                </Badge>
                <Badge colorScheme="purple" variant="outline">
                  Style: {userProfile.preferredWorkStyle}
                </Badge>
                <Badge colorScheme="green" variant="outline">
                  Completion Rate: {userProfile.goalCompletionRate}%
                </Badge>
              </HStack>
            </Box>
          )}

          {/* Loading State */}
          {isGenerating && (
            <VStack spacing={4}>
              <Icon as={FaBrain} boxSize={10} color={accentColor} />
              <Text color="gray.600">Analyzing your profile and generating personalized goals...</Text>
              <Progress size="sm" isIndeterminate colorScheme="zen" w="100%" />
            </VStack>
          )}

          {/* Suggested Goals */}
          {suggestedGoals.length > 0 && (
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold" color={textColor}>
                🎯 Suggested Goals for You:
              </Text>
              {suggestedGoals.map((goal) => (
                <Box
                  key={goal.id}
                  p={4}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={borderColor}
                  cursor="pointer"
                  onClick={() => handleGoalDetail(goal)}
                  _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                >
                  <Flex justify="space-between" align="start">
                    <HStack align="start" spacing={3} flex={1}>
                      <Icon as={goal.icon} color={accentColor} boxSize={5} mt={1} />
                      <VStack align="flex-start" spacing={1} flex={1}>
                        <HStack>
                          <Text fontWeight="bold" color={textColor}>
                            {goal.title}
                          </Text>
                          <Badge colorScheme={getDifficultyColor(goal.difficulty)} size="sm">
                            {goal.difficulty}
                          </Badge>
                          <Badge colorScheme={getPriorityColor(goal.priority)} size="sm">
                            {goal.priority}
                          </Badge>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          {goal.description}
                        </Text>
                        <HStack spacing={4} fontSize="xs" color="gray.500">
                          <Text>⏱️ {goal.estimatedTime}</Text>
                          <Text>📊 {goal.current} → {goal.target} {goal.unit}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Button size="sm" colorScheme="zen" variant="outline">
                      View Details
                    </Button>
                  </Flex>
                </Box>
              ))}
            </VStack>
          )}
        </VStack>
      </Box>

      {/* Goal Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Icon as={selectedGoal?.icon} color={accentColor} />
              <Text>{selectedGoal?.title}</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedGoal && (
              <VStack spacing={4} align="stretch">
                <Text color="gray.600">
                  {selectedGoal.description}
                </Text>

                <Divider />

                <Box>
                  <Text fontWeight="bold" mb={2}>Why this goal?</Text>
                  <Text fontSize="sm" color="gray.600">
                    {selectedGoal.reasoning}
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>Recommended strategies:</Text>
                  <VStack align="stretch" spacing={1}>
                    {selectedGoal.suggestions?.map((suggestion, index) => (
                      <Text key={index} fontSize="sm" color="gray.600">
                        • {suggestion}
                      </Text>
                    ))}
                  </VStack>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>Expected progress:</Text>
                  <HStack>
                    <Text fontSize="lg" fontWeight="bold">
                      {selectedGoal.current} {selectedGoal.unit}
                    </Text>
                    <Text color="gray.500">→</Text>
                    <Text fontSize="lg" fontWeight="bold" color="green.500">
                      {selectedGoal.target} {selectedGoal.unit}
                    </Text>
                  </HStack>
                </Box>

                <HStack spacing={4}>
                  <Badge colorScheme={getDifficultyColor(selectedGoal.difficulty)}>
                    Difficulty: {selectedGoal.difficulty}
                  </Badge>
                  <Badge colorScheme={getPriorityColor(selectedGoal.priority)}>
                    Priority: {selectedGoal.priority}
                  </Badge>
                  <Badge colorScheme="blue">
                    Time: {selectedGoal.estimatedTime}
                  </Badge>
                </HStack>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="zen" 
              leftIcon={<FaPlus />}
              onClick={() => handleAcceptGoal(selectedGoal)}
            >
              Add to My Goals
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MotionBox>
  );
}
