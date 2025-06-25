import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Badge,
  Button,
  Collapse,
  useColorModeValue,
  Flex,
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaBrain,
  FaLightbulb,
  FaChartLine,
  FaExclamationTriangle,
  FaCheck,
  FaClock,
  FaFire,
  FaLeaf,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

const MotionBox = motion(Box);

// AI Engine - Pattern analysis and recommendations
class ZenAI {
  static analyzeProductivityPattern(weekData) {
    if (!weekData || weekData.length === 0) return null;

    const totalScore = weekData.reduce((sum, day) => sum + day.productivity, 0);
    const avgScore = totalScore / weekData.length;
    const trend = this.calculateTrend(weekData);
    const bestDay = weekData.reduce((best, day) => 
      day.productivity > best.productivity ? day : best
    );
    const worstDay = weekData.reduce((worst, day) => 
      day.productivity < worst.productivity ? day : worst
    );

    return {
      average: Math.round(avgScore),
      trend,
      bestDay: bestDay.day,
      worstDay: worstDay.day,
      consistency: this.calculateConsistency(weekData),
      insights: this.generateInsights(weekData, avgScore, trend)
    };
  }

  static calculateTrend(data) {
    if (data.length < 2) return "stable";
    
    const firstHalf = data.slice(0, Math.floor(data.length / 2));
    const secondHalf = data.slice(Math.floor(data.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, d) => sum + d.productivity, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, d) => sum + d.productivity, 0) / secondHalf.length;
    
    const diff = secondAvg - firstAvg;
    
    if (diff > 5) return "improving";
    if (diff < -5) return "declining";
    return "stable";
  }

  static calculateConsistency(data) {
    const avg = data.reduce((sum, d) => sum + d.productivity, 0) / data.length;
    const variance = data.reduce((sum, d) => sum + Math.pow(d.productivity - avg, 2), 0) / data.length;
    const stdDev = Math.sqrt(variance);
    
    if (stdDev < 10) return "high";
    if (stdDev < 20) return "medium";
    return "low";
  }

  static generateInsights(data, avgScore, trend) {
    const insights = [];

    // Trend analysis
    if (trend === "improving") {
      insights.push({
        type: "positive",
        title: "Positive Trend!",
        message: "Your productivity is improving. Keep up the pace!",
        icon: FaArrowUp,
        priority: 1
      });
    } else if (trend === "declining") {
      insights.push({
        type: "warning",
        title: "Attention Required",
        message: "Your productivity has decreased. Do you need a break?",
        icon: FaArrowDown,
        priority: 3
      });
    }

    // General level analysis
    if (avgScore >= 80) {
      insights.push({
        type: "success",
        title: "Excellent Performance",
        message: "You're at your best moment. Take advantage of this streak!",
        icon: FaFire,
        priority: 1
      });
    } else if (avgScore < 50) {
      insights.push({
        type: "error",
        title: "Low Productivity",
        message: "Consider reviewing your workload and schedules",
        icon: FaExclamationTriangle,
        priority: 4
      });
    }

    // Identify day patterns
    const weekdayAvg = data.filter(d => !d.isWeekend).reduce((sum, d) => sum + d.productivity, 0) / 5;
    const morningTasks = data.filter(d => d.morningProductivity > 70).length;
    
    if (morningTasks >= 5) {
      insights.push({
        type: "info",
        title: "Morning Person",
        message: "You're more productive in the mornings. Schedule important tasks before noon",
        icon: FaClock,
        priority: 2
      });
    }

    return insights.sort((a, b) => a.priority - b.priority);
  }

  static generateRecommendations(analysis, userPreferences = {}) {
    const recommendations = [];

    if (analysis.trend === "declining") {
      recommendations.push({
        id: 1,
        title: "Take a Strategic Break",
        description: "A 15-20 minute break can restore your energy",
        action: "Schedule Break",
        type: "immediate",
        impact: "high"
      });
    }

    if (analysis.consistency === "low") {
      recommendations.push({
        id: 2,
        title: "Establish a Routine",
        description: "A morning routine can improve your consistency by 40%",
        action: "Create Routine",
        type: "habit",
        impact: "medium"
      });
    }

    if (analysis.average < 60) {
      recommendations.push({
        id: 3,
        title: "Pomodoro Technique",
        description: "25 min work + 5 min break. Ideal for regaining focus",
        action: "Start Pomodoro",
        type: "technique",
        impact: "high"
      });
    }

    // Time-based recommendation
    const currentHour = new Date().getHours();
    if (currentHour >= 14 && currentHour <= 16) {
      recommendations.push({
        id: 4,
        title: "Post-Lunch Energy Dip",
        description: "Typical energy drop. Ideal for administrative tasks",
        action: "Switch to Easy Tasks",
        type: "timing",
        impact: "medium"
      });
    }

    return recommendations.slice(0, 3); // Maximum 3 recommendations
  }
}

// Main assistant component
export default function ZenAssistant({ userData, isExpanded, onToggle }) {
  const [analysis, setAnalysis] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const accentColor = useColorModeValue("zen.500", "zen.300");

  // Mock data for demonstration
  const mockWeekData = [
    { day: "Mon", productivity: 75, isWeekend: false, morningProductivity: 80 },
    { day: "Tue", productivity: 82, isWeekend: false, morningProductivity: 85 },
    { day: "Wed", productivity: 68, isWeekend: false, morningProductivity: 70 },
    { day: "Thu", productivity: 90, isWeekend: false, morningProductivity: 95 },
    { day: "Fri", productivity: 65, isWeekend: false, morningProductivity: 60 },
    { day: "Sat", productivity: 45, isWeekend: true, morningProductivity: 40 },
    { day: "Sun", productivity: 55, isWeekend: true, morningProductivity: 50 }
  ];

  useEffect(() => {
    // Simulate AI analysis
    setIsThinking(true);
    setTimeout(() => {
      const newAnalysis = ZenAI.analyzeProductivityPattern(mockWeekData);
      const newRecommendations = ZenAI.generateRecommendations(newAnalysis);
      
      setAnalysis(newAnalysis);
      setRecommendations(newRecommendations);
      setIsThinking(false);
    }, 1500);
  }, []);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "improving": return FaArrowUp;
      case "declining": return FaArrowDown;
      default: return FaMinus;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "improving": return "green.500";
      case "declining": return "red.500";
      default: return "gray.500";
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case "positive": case "success": return "success";
      case "warning": return "warning";
      case "error": return "error";
      case "info": return "info";
      default: return "info";
    }
  };

  if (!analysis && !isThinking) return null;

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
              <Icon as={FaRobot} color={accentColor} boxSize={5} />
              <Text fontWeight="bold" color={textColor}>
                Zen Assistant
              </Text>
              {isThinking && (
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
            {isThinking ? (
              <VStack spacing={4}>
                <Icon as={FaBrain} boxSize={10} color={accentColor} />
                <Text color="gray.600">Analyzing productivity patterns...</Text>
                <Progress size="sm" isIndeterminate colorScheme="zen" w="100%" />
              </VStack>
            ) : (
              <VStack spacing={6} align="stretch">
                {/* General Analysis */}
                <Box>
                  <Text fontWeight="bold" mb={3} color={textColor}>
                    Weekly Analysis
                  </Text>
                  <HStack spacing={4} wrap="wrap">
                    <Badge colorScheme="zen" variant="outline">
                      Average: {analysis.average}%
                    </Badge>
                    <HStack>
                      <Icon 
                        as={getTrendIcon(analysis.trend)} 
                        color={getTrendColor(analysis.trend)} 
                        boxSize={3}
                      />
                      <Text fontSize="sm" color="gray.600">
                        {analysis.trend === "improving" ? "Improving" :
                         analysis.trend === "declining" ? "Declining" : "Stable"}
                      </Text>
                    </HStack>
                    <Badge colorScheme="blue" variant="outline">
                      Best day: {analysis.bestDay}
                    </Badge>
                  </HStack>
                </Box>

                {/* Insights */}
                {analysis.insights.length > 0 && (
                  <Box>
                    <Text fontWeight="bold" mb={3} color={textColor}>
                      Personalized Insights
                    </Text>
                    <VStack spacing={3}>
                      {analysis.insights.map((insight, index) => (
                        <Alert 
                          key={index}
                          status={getInsightColor(insight.type)}
                          borderRadius="lg"
                          variant="left-accent"
                        >
                          <AlertIcon as={insight.icon} />
                          <Box>
                            <AlertTitle fontSize="sm">
                              {insight.title}
                            </AlertTitle>
                            <AlertDescription fontSize="sm">
                              {insight.message}
                            </AlertDescription>
                          </Box>
                        </Alert>
                      ))}
                    </VStack>
                  </Box>
                )}

                {/* Recommendations */}
                {recommendations.length > 0 && (
                  <Box>
                    <Text fontWeight="bold" mb={3} color={textColor}>
                      Recommendations
                    </Text>
                    <VStack spacing={3}>
                      {recommendations.map((rec) => (
                        <Box
                          key={rec.id}
                          p={4}
                          borderRadius="lg"
                          border="1px solid"
                          borderColor={borderColor}
                          w="100%"
                        >
                          <Flex justify="space-between" align="start">
                            <Box flex={1}>
                              <HStack mb={1}>
                                <Text fontWeight="medium" fontSize="sm" color={textColor}>
                                  {rec.title}
                                </Text>
                                <Badge 
                                  size="sm"
                                  colorScheme={rec.impact === "high" ? "red" : rec.impact === "medium" ? "orange" : "gray"}
                                >
                                  {rec.impact}
                                </Badge>
                              </HStack>
                              <Text fontSize="xs" color="gray.600" mb={2}>
                                {rec.description}
                              </Text>
                            </Box>
                            <Button
                              size="xs"
                              colorScheme="zen"
                              variant="outline"
                              ml={2}
                            >
                              {rec.action}
                            </Button>
                          </Flex>
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
                      Break 5min
                    </Button>
                    <Button size="sm" leftIcon={<FaClock />} colorScheme="blue" variant="outline">
                      Pomodoro
                    </Button>
                    <Button size="sm" leftIcon={<FaChartLine />} colorScheme="purple" variant="outline">
                      Ver Stats
                    </Button>
                  </HStack>
                </Box>
              </VStack>
            )}
          </Box>
        </Collapse>
      </Box>
    </MotionBox>
  );
}
