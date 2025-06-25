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
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Collapse,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaBrain,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaLightbulb,
  FaLeaf,
  FaWalking,
  FaBed,
  FaWater,
  FaSmile,
  FaFrown,
  FaMeh,
  FaChevronDown,
  FaChevronUp,
  FaRobot,
  FaComment,
  FaPlay
} from "react-icons/fa";

const MotionBox = motion(Box);

// Wellness AI Coach Engine
class WellnessAI {
  static assessBurnoutRisk(metrics) {
    let risk = 0;
    
    // Risk factors
    if (metrics.stressLevel > 7) risk += 25;
    if (metrics.sleepQuality < 6) risk += 20;
    if (metrics.workLifeBalance < 5) risk += 20;
    if (metrics.physicalActivity < 4) risk += 15;
    if (metrics.mentalHealth < 6) risk += 20;
    
    // Protective factors
    if (metrics.moodAverage > 7) risk -= 10;
    if (metrics.energyLevel > 7) risk -= 10;
    
    return Math.max(0, Math.min(100, risk));
  }

  static analyzeWellnessPatterns(weekData) {
    const trends = {
      mood: this.calculateTrend(weekData.map(d => d.mood)),
      energy: this.calculateTrend(weekData.map(d => d.energy)),
      stress: this.calculateTrend(weekData.map(d => d.stress)),
      sleep: this.calculateTrend(weekData.map(d => d.sleep))
    };

    return {
      trends,
      insights: this.generateWellnessInsights(trends, weekData),
      recommendations: this.generateWellnessRecommendations(trends, weekData)
    };
  }

  static calculateTrend(values) {
    if (values.length < 2) return "stable";
    
    const recent = values.slice(-3);
    const earlier = values.slice(0, -3);
    
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;
    
    const diff = recentAvg - earlierAvg;
    
    if (diff > 0.5) return "improving";
    if (diff < -0.5) return "declining";
    return "stable";
  }

  static generateWellnessInsights(trends, weekData) {
    const insights = [];
    
    // Trend analysis
    if (trends.mood === "declining") {
      insights.push({
        type: "warning",
        title: "Mood Decline Alert",
        message: "Your mood has been declining lately. It's important to take care of yourself.",
        icon: FaFrown,
        priority: 3
      });
    } else if (trends.mood === "improving") {
      insights.push({
        type: "success",
        title: "Wellness Improvement",
        message: "Your mood is improving! Keep up what you're doing.",
        icon: FaSmile,
        priority: 1
      });
    }

    if (trends.stress === "improving") {
      insights.push({
        type: "warning",
        title: "Stress Level Increase",
        message: "Your stress levels are rising. Consider relaxation techniques.",
        icon: FaExclamationTriangle,
        priority: 4
      });
    }

    if (trends.energy === "declining") {
      insights.push({
        type: "info",
        title: "Energy Decline",
        message: "Your energy is decreasing. Review your rest and nutrition.",
        icon: FaBed,
        priority: 2
      });
    }

    // Pattern analysis
    const avgSleep = weekData.reduce((sum, d) => sum + d.sleep, 0) / weekData.length;
    if (avgSleep < 6) {
      insights.push({
        type: "error",
        title: "Insufficient Sleep",
        message: `Average of ${avgSleep.toFixed(1)}h of sleep. You need at least 7-8h.`,
        icon: FaBed,
        priority: 4
      });
    }

    return insights.sort((a, b) => b.priority - a.priority);
  }

  static generateWellnessRecommendations(trends, weekData) {
    const recommendations = [];
    
    if (trends.stress === "improving") {
      recommendations.push({
        id: 1,
        title: "Deep Breathing Session",
        description: "5 minutes of mindful breathing to reduce stress",
        action: "Start Exercise",
        duration: "5 min",
        impact: "immediate",
        icon: FaLeaf,
        steps: [
          "Find a comfortable position",
          "Inhale deeply for 4 seconds",
          "Hold your breath for 4 seconds", 
          "Exhale slowly for 6 seconds",
          "Repeat 10 times"
        ]
      });
    }

    if (trends.energy === "declining") {
      recommendations.push({
        id: 2,
        title: "Energizing Walk",
        description: "10 minutes outdoors to recharge your energy",
        action: "Go for a Walk",
        duration: "10 min",
        impact: "medium",
        icon: FaWalking,
        steps: [
          "Go outside or near a window",
          "Walk at a moderate pace",
          "Breathe fresh air deeply",
          "Observe your surroundings mindfully"
        ]
      });
    }

    const avgSleep = weekData.reduce((sum, d) => sum + d.sleep, 0) / weekData.length;
    if (avgSleep < 7) {
      recommendations.push({
        id: 3,
        title: "Optimize Sleep Routine",
        description: "Improve the quality and quantity of rest",
        action: "View Tips",
        duration: "Nightly",
        impact: "long-term",
        icon: FaBed,
        steps: [
          "Set a fixed bedtime schedule",
          "Avoid screens 1 hour before",
          "Create a dark and cool environment",
          "Practice relaxation before sleeping"
        ]
      });
    }

    if (trends.mood === "declining") {
      recommendations.push({
        id: 4,
        title: "Mindfulness Meditation",
        description: "Mindfulness practice to improve mood",
        action: "Meditate Now",
        duration: "10 min",
        impact: "medium",
        icon: FaBrain,
        steps: [
          "Sit comfortably with eyes closed",
          "Focus on your natural breathing",
          "When mind wanders, return to breathing",
          "Observe your thoughts without judgment"
        ]
      });
    }

    return recommendations.slice(0, 3);
  }

  static generatePersonalizedTips(userProfile) {
    const tips = [];
    
    if (userProfile.stressLevel > 6) {
      tips.push("Your stress level is high. Try the 4-7-8 technique: inhale 4sec, hold 7sec, exhale 8sec.");
    }
    
    if (userProfile.energyLevel < 5) {
      tips.push("To boost energy: drink water, move for 2 minutes, or eat a fruit.");
    }
    
    if (userProfile.mood < 6) {
      tips.push("To improve mood: write 3 positive things from today or call a friend.");
    }

    return tips;
  }
}

export default function WellnessAICoach({ wellnessData, isExpanded, onToggle }) {
  const [analysis, setAnalysis] = useState(null);
  const [burnoutRisk, setBurnoutRisk] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [personalizedTips, setPersonalizedTips] = useState([]);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const accentColor = useColorModeValue("zen.500", "zen.300");

  // Mock wellness data
  const mockWeekData = [
    { day: "Mon", mood: 7, energy: 6, stress: 4, sleep: 7 },
    { day: "Tue", mood: 8, energy: 7, stress: 3, sleep: 7.5 },
    { day: "Wed", mood: 6, energy: 5, stress: 6, sleep: 6 },
    { day: "Thu", mood: 7, energy: 8, stress: 4, sleep: 8 },
    { day: "Fri", mood: 5, energy: 4, stress: 7, sleep: 5.5 },
    { day: "Sat", mood: 8, energy: 7, stress: 2, sleep: 9 },
    { day: "Sun", mood: 7, energy: 6, stress: 3, sleep: 8.5 }
  ];

  const mockUserMetrics = {
    stressLevel: 6,
    sleepQuality: 6,
    workLifeBalance: 5,
    physicalActivity: 4,
    mentalHealth: 6,
    moodAverage: 6.8,
    energyLevel: 6.1
  };

  useEffect(() => {
    if (!wellnessData) return;
    
    setIsAnalyzing(true);
    
    // Use real data from props
    const weekData = wellnessData.weekData || [
      { day: "Mon", mood: 7, energy: 6, stress: 4, sleep: 7 },
      { day: "Tue", mood: 8, energy: 7, stress: 3, sleep: 7.5 },
      { day: "Wed", mood: 6, energy: 5, stress: 6, sleep: 6 },
      { day: "Thu", mood: 7, energy: 8, stress: 4, sleep: 8 },
      { day: "Fri", mood: 5, energy: 4, stress: 7, sleep: 5.5 },
      { day: "Sat", mood: 8, energy: 7, stress: 2, sleep: 9 },
      { day: "Sun", mood: 7, energy: 6, stress: 3, sleep: 8.5 }
    ];

    const userMetrics = {
      stressLevel: wellnessData.stressLevel || 6,
      sleepQuality: wellnessData.sleepQuality || 6,
      workLifeBalance: wellnessData.workLifeBalance || 5,
      physicalActivity: wellnessData.physicalActivity || 4,
      mentalHealth: wellnessData.mentalHealth || 6,
      moodAverage: weekData.reduce((sum, d) => sum + d.mood, 0) / weekData.length,
      energyLevel: weekData.reduce((sum, d) => sum + d.energy, 0) / weekData.length
    };
    
    // Simulate AI analysis
    setTimeout(() => {
      const risk = WellnessAI.assessBurnoutRisk(userMetrics);
      const wellnessAnalysis = WellnessAI.analyzeWellnessPatterns(weekData);
      const tips = WellnessAI.generatePersonalizedTips(userMetrics);
      
      setBurnoutRisk(risk);
      setAnalysis(wellnessAnalysis);
      setPersonalizedTips(tips);
      setIsAnalyzing(false);
    }, 2000);
  }, [wellnessData]);

  const getBurnoutColor = (risk) => {
    if (risk > 70) return "red";
    if (risk > 40) return "orange";
    return "green";
  };

  const getBurnoutText = (risk) => {
    if (risk > 70) return "High Risk";
    if (risk > 40) return "Moderate Risk";
    return "Low Risk";
  };

  const getInsightColor = (type) => {
    switch (type) {
      case "success": return "success";
      case "warning": return "warning";
      case "error": return "error";
      case "info": return "info";
      default: return "info";
    }
  };

  const handleRecommendationDetail = (recommendation) => {
    setSelectedRecommendation(recommendation);
    onOpen();
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        bg={cardBg}
        borderColor={borderColor}
        border="1px solid"
        borderRadius="xl"
        overflow="hidden"
        mb={6}
      >
        {/* Header */}
        <Box
          p={4}
          borderBottomWidth="1px"
          borderColor={borderColor}
          cursor="pointer"
          onClick={onToggle}
          _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
        >
          <Flex justify="space-between" align="center">
            <HStack>
              <Icon as={FaHeartbeat} color={accentColor} boxSize={5} />
              <VStack align="flex-start" spacing={0}>
                <Text fontWeight="bold" color={textColor}>
                  Wellness AI Coach
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Your personal wellness assistant
                </Text>
              </VStack>
              {isAnalyzing && (
                <Badge colorScheme="zen" variant="subtle">
                  Analyzing...
                </Badge>
              )}
            </HStack>
            <Icon 
              as={isExpanded ? FaChevronUp : FaChevronDown} 
              color="gray.400" 
            />
          </Flex>
        </Box>

        {/* Content */}
        <Collapse in={isExpanded}>
          <Box p={6}>
            {isAnalyzing ? (
              <VStack spacing={4}>
                <Icon as={FaBrain} boxSize={10} color={accentColor} />
                <Text color="gray.600">Analyzing your wellness...</Text>
                <Progress size="sm" isIndeterminate colorScheme="zen" w="100%" />
              </VStack>
            ) : (
              <VStack spacing={6} align="stretch">
                {/* Burnout Risk Assessment */}
                <Box>
                  <Text fontWeight="bold" mb={3} color={textColor}>
                    Burnout Assessment
                  </Text>
                  <HStack spacing={4}>
                    <CircularProgress 
                      value={burnoutRisk} 
                      size="80px"
                      color={getBurnoutColor(burnoutRisk) + ".400"}
                      thickness="8px"
                    >
                      <CircularProgressLabel fontSize="sm" fontWeight="bold">
                        {burnoutRisk}%
                      </CircularProgressLabel>
                    </CircularProgress>
                    <VStack align="flex-start" spacing={1}>
                      <Badge colorScheme={getBurnoutColor(burnoutRisk)} variant="solid">
                        {getBurnoutText(burnoutRisk)}
                      </Badge>
                      <Text fontSize="sm" color="gray.600">
                        {burnoutRisk < 30 ? "Excellent work-life balance" :
                         burnoutRisk < 60 ? "Keep an eye on your wellness" :
                         "Consider taking preventive measures"}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>

                <Divider />

                {/* Insights */}
                {analysis?.insights && analysis.insights.length > 0 && (
                  <Box>
                    <Text fontWeight="bold" mb={3} color={textColor}>
                      Wellness Insights
                    </Text>
                    <VStack spacing={3}>
                      {analysis.insights.map((insight, index) => (
                        <Alert 
                          key={index}
                          status={getInsightColor(insight.type)}
                          borderRadius="lg"
                          variant="left-accent"
                          size="sm"
                        >
                          <AlertIcon as={insight.icon} />
                          <Box>
                            <AlertTitle fontSize="sm">
                              {insight.title}
                            </AlertTitle>
                            <AlertDescription fontSize="xs">
                              {insight.message}
                            </AlertDescription>
                          </Box>
                        </Alert>
                      ))}
                    </VStack>
                  </Box>
                )}

                {/* Recommendations */}
                {analysis?.recommendations && analysis.recommendations.length > 0 && (
                  <Box>
                    <Text fontWeight="bold" mb={3} color={textColor}>
                      Personalized Recommendations
                    </Text>
                    <VStack spacing={3}>
                      {analysis.recommendations.map((rec) => (
                        <Box
                          key={rec.id}
                          p={3}
                          borderRadius="lg"
                          border="1px solid"
                          borderColor={borderColor}
                          w="100%"
                          cursor="pointer"
                          onClick={() => handleRecommendationDetail(rec)}
                          _hover={{ boxShadow: "md" }}
                        >
                          <Flex justify="space-between" align="center">
                            <HStack>
                              <Icon as={rec.icon} color={accentColor} />
                              <VStack align="flex-start" spacing={0}>
                                <Text fontWeight="medium" fontSize="sm" color={textColor}>
                                  {rec.title}
                                </Text>
                                <Text fontSize="xs" color="gray.600">
                                  {rec.description}
                                </Text>
                              </VStack>
                            </HStack>
                            <VStack align="flex-end" spacing={0}>
                              <Badge size="sm" colorScheme="zen">
                                {rec.duration}
                              </Badge>
                              <Button size="xs" variant="ghost" leftIcon={<FaPlay />}>
                                {rec.action}
                              </Button>
                            </VStack>
                          </Flex>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                )}

                {/* Personalized Tips */}
                {personalizedTips.length > 0 && (
                  <Box>
                    <Text fontWeight="bold" mb={3} color={textColor}>
                      Personalized Tips
                    </Text>
                    <VStack spacing={2} align="stretch">
                      {personalizedTips.map((tip, index) => (
                        <Box
                          key={index}
                          p={3}
                          bg={useColorModeValue("blue.50", "blue.900")}
                          borderRadius="lg"
                          border="1px solid"
                          borderColor="blue.200"
                        >
                          <Text fontSize="sm" color={textColor}>
                            {tip}
                          </Text>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                )}

                {/* Quick Actions */}
                <Box>
                  <Text fontWeight="bold" mb={3} color={textColor}>
                    Quick Actions
                  </Text>
                  <HStack spacing={2} wrap="wrap">
                    <Button size="sm" leftIcon={<FaLeaf />} colorScheme="green" variant="outline">
                      Breathe
                    </Button>
                    <Button size="sm" leftIcon={<FaWalking />} colorScheme="blue" variant="outline">
                      Walk
                    </Button>
                    <Button size="sm" leftIcon={<FaWater />} colorScheme="cyan" variant="outline">
                      Hydrate
                    </Button>
                    <Button size="sm" leftIcon={<FaBrain />} colorScheme="purple" variant="outline">
                      Meditate
                    </Button>
                  </HStack>
                </Box>
              </VStack>
            )}
          </Box>
        </Collapse>
      </Box>

      {/* Recommendation Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Icon as={selectedRecommendation?.icon} color={accentColor} />
              <Text>{selectedRecommendation?.title}</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedRecommendation && (
              <VStack spacing={4} align="stretch">
                <Text color="gray.600">
                  {selectedRecommendation.description}
                </Text>

                <Box>
                  <Text fontWeight="bold" mb={2}>Duration: {selectedRecommendation.duration}</Text>
                  <Badge colorScheme="zen">{selectedRecommendation.impact} impact</Badge>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>Steps to follow:</Text>
                  <VStack align="stretch" spacing={1}>
                    {selectedRecommendation.steps?.map((step, index) => (
                      <Text key={index} fontSize="sm" color="gray.600">
                        {index + 1}. {step}
                      </Text>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="zen" leftIcon={<FaPlay />}>
              Start Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MotionBox>
  );
}
