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
  CircularProgress,
  CircularProgressLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import ProductivityChart from "../components/ProductivityChart";
import WellnessAICoach from "../components/WellnessAICoach";
import { 
  FaHeart, 
  FaBrain, 
  FaLeaf, 
  FaClock, 
  FaWalking,
  FaBed,
  FaAppleAlt,
  FaGlassWhiskey,
  FaMedkit,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBalanceScale,
  FaSun,
  FaMoon,
  FaRunning,
  FaPause,
  FaPlay,
  FaChartLine,
  FaSmile,
  FaFrown,
  FaMeh,
  FaThumbsUp,
  FaThumbsDown,
  FaFire,
  FaShieldAlt,
  FaLightbulb
} from "react-icons/fa";

const MotionBox = motion(Box);

// Mock data
const wellnessStats = {
  overallScore: 78,
  stressLevel: 35,
  sleepQuality: 85,
  workLifeBalance: 72,
  physicalActivity: 60,
  mentalHealth: 80,
  burnoutRisk: 25
};

const dailyMetrics = [
  { date: "Mon", stress: 30, energy: 85, mood: 4, focus: 90, sleep: 8 },
  { date: "Tue", stress: 45, energy: 70, mood: 3, focus: 75, sleep: 7 },
  { date: "Wed", stress: 60, energy: 60, mood: 3, focus: 65, sleep: 6 },
  { date: "Thu", stress: 35, energy: 80, mood: 4, focus: 85, sleep: 7.5 },
  { date: "Fri", stress: 25, energy: 90, mood: 5, focus: 95, sleep: 8 },
  { date: "Sat", stress: 15, energy: 95, mood: 5, focus: 70, sleep: 9 },
  { date: "Sun", stress: 20, energy: 85, mood: 4, focus: 60, sleep: 8.5 }
];

const moodData = [
  { date: "Dec 20", mood: 4, energy: 85, productiveHours: 7.5 },
  { date: "Dec 21", mood: 3, energy: 70, productiveHours: 6.5 },
  { date: "Dec 22", mood: 4, energy: 80, productiveHours: 8 },
  { date: "Dec 23", mood: 5, energy: 90, productiveHours: 8.5 },
  { date: "Dec 24", mood: 3, energy: 60, productiveHours: 5 },
  { date: "Dec 25", mood: 5, energy: 95, productiveHours: 3 },
  { date: "Dec 26", mood: 4, energy: 85, productiveHours: 7 }
];

const recommendations = [
  {
    id: 1,
    type: "stress",
    title: "High Stress Alert",
    description: "Your stress levels have been above average for 3 days. Consider taking breaks.",
    priority: "high",
    icon: FaExclamationTriangle,
    action: "Schedule a 10-min meditation"
  },
  {
    id: 2,
    type: "sleep",
    title: "Sleep Optimization",
    description: "Your sleep quality affects your productivity. Aim for 7-8 hours nightly.",
    priority: "medium",
    icon: FaBed,
    action: "Set earlier bedtime reminder"
  },
  {
    id: 3,
    type: "activity",
    title: "Movement Break",
    description: "You've been sitting for 2+ hours. Time for a walking break!",
    priority: "low",
    icon: FaWalking,
    action: "Take a 5-min walk"
  },
  {
    id: 4,
    type: "balance",
    title: "Work-Life Balance",
    description: "Great job maintaining balance this week! Keep it up.",
    priority: "positive",
    icon: FaBalanceScale,
    action: "Continue current routine"
  }
];

const activities = [
  { name: "Meditation", duration: "10 min", icon: FaBrain, completed: true },
  { name: "Walking", duration: "30 min", icon: FaWalking, completed: true },
  { name: "Deep Breathing", duration: "5 min", icon: FaLeaf, completed: false },
  { name: "Stretching", duration: "15 min", icon: FaRunning, completed: false }
];

export default function WellnessPage() {
  const [currentMood, setCurrentMood] = useState(4);
  const [stressLevel, setStressLevel] = useState(3);
  const [isWellnessAIExpanded, setIsWellnessAIExpanded] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const accentColor = useColorModeValue("zen.500", "zen.300");
  const gradientBg = useColorModeValue(
    "linear(135deg, zen.50 0%, mindful.100 30%, zen.100 100%)",
    "linear(135deg, gray.900 0%, gray.800 30%, gray.700 100%)"
  );

  const getScoreColor = (score) => {
    if (score >= 80) return "green";
    if (score >= 60) return "yellow";
    if (score >= 40) return "orange";
    return "red";
  };

  const getRecommendationColor = (priority) => {
    switch (priority) {
      case "high": return "red";
      case "medium": return "orange";
      case "low": return "blue";
      case "positive": return "green";
      default: return "gray";
    }
  };

  const getMoodIcon = (mood) => {
    if (mood >= 4) return FaSmile;
    if (mood >= 3) return FaMeh;
    return FaFrown;
  };

  const getMoodColor = (mood) => {
    if (mood >= 4) return "green.500";
    if (mood >= 3) return "yellow.500";
    return "red.500";
  };

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
            <VStack align="flex-start" spacing={2} mb={8}>
              <Flex align="center" gap={3}>
                <Icon as={FaHeart} color="red.500" boxSize={8} />
                <Heading size="xl" color={textColor}>
                  Wellness & Balance
                </Heading>
              </Flex>
              <Text color="gray.500" fontSize="lg">
                Monitor your wellbeing and maintain work-life balance
              </Text>
            </VStack>
          </MotionBox>

          {/* Wellness Score Overview */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >            <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" mb={8} overflow="hidden">
              <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                <Heading size="md">Overall Wellness Score</Heading>
              </Box>
              <Box p={6}>
                <Flex align="center" justify="center" mb={6}>
                  <CircularProgress 
                    value={wellnessStats.overallScore} 
                    size="120px" 
                    color={getScoreColor(wellnessStats.overallScore) + ".400"}
                    thickness="8px"
                  >
                    <CircularProgressLabel fontSize="2xl" fontWeight="bold">
                      {wellnessStats.overallScore}
                    </CircularProgressLabel>
                  </CircularProgress>
                </Flex>
                
                <SimpleGrid columns={[2, 3, 6]} spacing={4}>
                  <VStack>
                    <Icon as={FaShieldAlt} boxSize={6} color="blue.500" />
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                      {100 - wellnessStats.burnoutRisk}%
                    </Text>
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                      Burnout Protection
                    </Text>
                  </VStack>
                  
                  <VStack>
                    <Icon as={FaBed} boxSize={6} color="purple.500" />
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                      {wellnessStats.sleepQuality}%
                    </Text>
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                      Sleep Quality
                    </Text>
                  </VStack>
                  
                  <VStack>
                    <Icon as={FaBalanceScale} boxSize={6} color="green.500" />
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                      {wellnessStats.workLifeBalance}%
                    </Text>
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                      Work-Life Balance
                    </Text>
                  </VStack>
                  
                  <VStack>
                    <Icon as={FaRunning} boxSize={6} color="orange.500" />
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                      {wellnessStats.physicalActivity}%
                    </Text>
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                      Physical Activity
                    </Text>
                  </VStack>
                  
                  <VStack>
                    <Icon as={FaBrain} boxSize={6} color="teal.500" />
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                      {wellnessStats.mentalHealth}%
                    </Text>
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                      Mental Health
                    </Text>
                  </VStack>
                  
                  <VStack>
                    <Icon as={FaFire} boxSize={6} color="red.500" />
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                      {100 - wellnessStats.stressLevel}%
                    </Text>
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                      Stress Management
                    </Text>
                  </VStack>
                </SimpleGrid>
              </Box>
            </Box>
          </MotionBox>

          {/* AI Wellness Coach */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            mb={8}
          >
            <WellnessAICoach 
              wellnessData={{
                ...wellnessStats,
                weekData: dailyMetrics
              }}
              isExpanded={isWellnessAIExpanded}
              onToggle={() => setIsWellnessAIExpanded(!isWellnessAIExpanded)}
            />
          </MotionBox>

          {/* Main Content Tabs */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs variant="soft-rounded" colorScheme="zen">
              <TabList mb={6}>
                <Tab leftIcon={<FaChartLine />}>Analytics</Tab>
                <Tab leftIcon={<FaLightbulb />}>Recommendations</Tab>
                <Tab leftIcon={<FaSmile />}>Daily Check-in</Tab>
                <Tab leftIcon={<FaRunning />}>Activities</Tab>
              </TabList>

              <TabPanels>
                {/* Analytics Tab */}
                <TabPanel p={0}>                  <SimpleGrid columns={[1, 1, 2]} spacing={6} mb={8}>
                    {/* Mood & Energy Chart */}
                    <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" overflow="hidden">
                      <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                        <Heading size="md">Mood & Energy Trends</Heading>
                      </Box>
                      <Box p={6}>
                        <ProductivityChart 
                          data={moodData}
                          title="Mood vs Productivity"
                          variant="area"
                          showStats={false}
                          height={300}
                        />
                      </Box>
                    </Box>

                    {/* Weekly Metrics */}
                    <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" overflow="hidden">
                      <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                        <Heading size="md">Weekly Wellness Metrics</Heading>
                      </Box>
                      <Box p={6}>
                        <VStack spacing={4}>
                          {dailyMetrics.map((day, index) => (
                            <Flex key={index} justify="space-between" align="center" w="100%">
                              <Text fontWeight="medium" minW="40px">{day.date}</Text>
                              
                              <HStack spacing={4} flex={1} justify="space-around">
                                <VStack spacing={1}>
                                  <Icon 
                                    as={getMoodIcon(day.mood)} 
                                    color={getMoodColor(day.mood)} 
                                    boxSize={4}
                                  />
                                  <Text fontSize="xs" color="gray.500">Mood</Text>
                                </VStack>
                                
                                <VStack spacing={1}>
                                  <CircularProgress 
                                    value={day.energy} 
                                    size="30px" 
                                    color="orange.400"
                                  >
                                    <CircularProgressLabel fontSize="xs">
                                      {day.energy}
                                    </CircularProgressLabel>
                                  </CircularProgress>
                                  <Text fontSize="xs" color="gray.500">Energy</Text>
                                </VStack>
                                
                                <VStack spacing={1}>
                                  <Text fontSize="sm" fontWeight="bold" color={textColor}>
                                    {day.sleep}h
                                  </Text>
                                  <Text fontSize="xs" color="gray.500">Sleep</Text>
                                </VStack>
                              </HStack>
                            </Flex>
                          ))}
                        </VStack>
                      </Box>
                    </Box>
                  </SimpleGrid>                  {/* Burnout Risk Assessment */}
                  <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" overflow="hidden">
                    <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                      <Heading size="md">Burnout Risk Assessment</Heading>
                    </Box>
                    <Box p={6}>
                      <Alert 
                        status={wellnessStats.burnoutRisk > 70 ? "error" : wellnessStats.burnoutRisk > 40 ? "warning" : "success"}
                        borderRadius="xl"
                      >
                        <AlertIcon />
                        <Box>
                          <AlertTitle>
                            {wellnessStats.burnoutRisk > 70 ? "High Risk" : 
                             wellnessStats.burnoutRisk > 40 ? "Moderate Risk" : "Low Risk"}
                          </AlertTitle>
                          <AlertDescription>
                            {wellnessStats.burnoutRisk > 70 ? 
                              "Immediate attention needed. Consider taking time off and consulting with HR." :
                             wellnessStats.burnoutRisk > 40 ? 
                              "Monitor your workload and stress levels. Take regular breaks." :
                              "Great job maintaining a healthy work-life balance!"}
                          </AlertDescription>
                        </Box>
                      </Alert>
                    </Box>
                  </Box>
                </TabPanel>                {/* Recommendations Tab */}
                <TabPanel p={0}>
                  <VStack spacing={4}>
                    {recommendations.map((rec) => (
                      <Box key={rec.id} bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" w="100%" p={6}>
                        <Flex align="center" gap={4}>
                          <Box
                            p={3}
                            borderRadius="xl"
                            bg={getRecommendationColor(rec.priority) + ".100"}
                          >
                            <Icon 
                              as={rec.icon} 
                              boxSize={6} 
                              color={getRecommendationColor(rec.priority) + ".500"}
                            />
                          </Box>
                          
                          <Box flex={1}>
                            <HStack justify="space-between" mb={1}>
                              <Text fontWeight="bold" color={textColor}>
                                {rec.title}
                              </Text>
                              <Badge colorScheme={getRecommendationColor(rec.priority)}>
                                {rec.priority}
                              </Badge>
                            </HStack>
                            
                            <Text fontSize="sm" color="gray.500" mb={2}>
                              {rec.description}
                            </Text>
                            
                            <Button
                              size="sm"
                              colorScheme={getRecommendationColor(rec.priority)}
                              variant="outline"
                            >
                              {rec.action}
                            </Button>
                          </Box>
                        </Flex>
                      </Box>
                    ))}
                  </VStack>
                </TabPanel>                {/* Daily Check-in Tab */}
                <TabPanel p={0}>
                  <SimpleGrid columns={[1, 1, 2]} spacing={6}>
                    {/* Mood Tracker */}
                    <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" overflow="hidden">
                      <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                        <Heading size="md">How are you feeling today?</Heading>
                      </Box>
                      <Box p={6}>
                        <VStack spacing={6}>
                          <HStack spacing={4}>
                            {[1, 2, 3, 4, 5].map((mood) => (
                              <Button
                                key={mood}
                                variant={currentMood === mood ? "solid" : "outline"}
                                colorScheme={getMoodColor(mood).split(".")[0]}
                                onClick={() => setCurrentMood(mood)}
                                size="lg"
                                p={6}
                              >
                                <Icon as={getMoodIcon(mood)} boxSize={8} />
                              </Button>
                            ))}
                          </HStack>
                          
                          <Text textAlign="center" color="gray.600">
                            {currentMood >= 4 ? "Feeling great!" : 
                             currentMood >= 3 ? "Doing okay" : "Could be better"}
                          </Text>
                        </VStack>
                      </Box>
                    </Box>

                    {/* Stress Level */}
                    <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" overflow="hidden">
                      <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                        <Heading size="md">Current Stress Level</Heading>
                      </Box>
                      <Box p={6}>
                        <VStack spacing={6}>
                          <Box w="100%">
                            <Slider
                              value={stressLevel}
                              onChange={setStressLevel}
                              min={1}
                              max={5}
                              step={1}
                            >
                              <SliderTrack>
                                <SliderFilledTrack bg="red.400" />
                              </SliderTrack>
                              <SliderThumb boxSize={6}>
                                <Icon as={FaFire} color="red.500" />
                              </SliderThumb>
                            </Slider>
                          </Box>
                          
                          <Text textAlign="center" color="gray.600" fontSize="lg">
                            {stressLevel === 1 ? "Very Low" :
                             stressLevel === 2 ? "Low" :
                             stressLevel === 3 ? "Moderate" :
                             stressLevel === 4 ? "High" : "Very High"}
                          </Text>
                          
                          <Button colorScheme="zen" w="100%">
                            Submit Check-in
                          </Button>
                        </VStack>
                      </Box>
                    </Box>
                  </SimpleGrid>
                </TabPanel>                {/* Activities Tab */}
                <TabPanel p={0}>
                  <SimpleGrid columns={[1, 2]} spacing={6}>
                    {/* Recommended Activities */}
                    <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" overflow="hidden">
                      <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                        <Heading size="md">Recommended Activities</Heading>
                      </Box>
                      <Box p={6}>
                        <VStack spacing={4}>
                          {activities.map((activity, index) => (
                            <Flex key={index} justify="space-between" align="center" w="100%">
                              <HStack>
                                <Icon as={activity.icon} color={accentColor} />
                                <VStack align="flex-start" spacing={0}>
                                  <Text fontWeight="medium" color={textColor}>
                                    {activity.name}
                                  </Text>
                                  <Text fontSize="sm" color="gray.500">
                                    {activity.duration}
                                  </Text>
                                </VStack>
                              </HStack>
                              
                              <Button
                                size="sm"
                                colorScheme={activity.completed ? "green" : "zen"}
                                variant={activity.completed ? "solid" : "outline"}
                                leftIcon={activity.completed ? <FaCheckCircle /> : <FaPlay />}
                              >
                                {activity.completed ? "Done" : "Start"}
                              </Button>
                            </Flex>
                          ))}
                        </VStack>
                      </Box>
                    </Box>

                    {/* Quick Actions */}
                    <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" overflow="hidden">
                      <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                        <Heading size="md">Quick Actions</Heading>
                      </Box>
                      <Box p={6}>
                        <VStack spacing={3}>
                          <Button 
                            leftIcon={<FaPause />} 
                            colorScheme="blue" 
                            w="100%" 
                            size="lg"
                          >
                            Take a Break
                          </Button>
                          <Button 
                            leftIcon={<FaBrain />} 
                            colorScheme="purple" 
                            w="100%" 
                            size="lg"
                          >
                            5-min Meditation
                          </Button>
                          <Button 
                            leftIcon={<FaWalking />} 
                            colorScheme="green" 
                            w="100%" 
                            size="lg"
                          >
                            Walking Break
                          </Button>
                          <Button 
                            leftIcon={<FaLeaf />} 
                            colorScheme="teal" 
                            w="100%" 
                            size="lg"
                          >
                            Deep Breathing
                          </Button>
                        </VStack>
                      </Box>
                    </Box>
                  </SimpleGrid>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </MotionBox>
        </Box>
      </Box>
    </Layout>
  );
}
