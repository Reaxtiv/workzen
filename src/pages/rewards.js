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
  Avatar,
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
  useDisclosure,
  Divider
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { 
  FaTrophy, 
  FaCoins, 
  FaStar, 
  FaGift, 
  FaFire,
  FaCrown,
  FaMedal,
  FaAward,
  FaRocket,
  FaShoppingCart,
  FaExchangeAlt,
  FaHistory,
  FaCalendar,
  FaCoffee,
  FaPlane,
  FaGamepad,
  FaLaptop,
  FaHeart,
  FaDumbbell,
  FaUsers
} from "react-icons/fa";

const MotionBox = motion(Box);

// Mock data
const userStats = {
  totalTokens: 2450,
  weeklyTokens: 180,
  monthlyRank: 3,
  totalRewards: 12,
  streak: 7
};

const availableRewards = [
  { 
    id: 1, 
    name: "Extra Day Off", 
    cost: 500, 
    category: "Time Off",
    icon: FaCalendar,
    description: "Get an additional paid day off",
    stock: 5,
    popular: true,
    legalStatus: "Exempt - Work flexibility"
  },
  { 
    id: 2, 
    name: "Online Course", 
    cost: 300, 
    category: "Development",
    icon: FaLaptop,
    description: "Professional development course of your choice",
    stock: 10,
    popular: true,
    legalStatus: "Exempt up to €600/year"
  },
  { 
    id: 3, 
    name: "Work From Home Days", 
    cost: 200, 
    category: "Flexibility",
    icon: FaLaptop,
    description: "2 additional remote work days this month",
    stock: 15,
    popular: true,
    legalStatus: "Exempt - Work flexibility"
  },
  { 
    id: 4, 
    name: "Wellness Session", 
    cost: 250, 
    category: "Health",
    icon: FaHeart,
    description: "Massage or physiotherapy session",
    stock: 8,
    popular: false,
    legalStatus: "Company social spending"
  },
  { 
    id: 5, 
    name: "Gym Membership", 
    cost: 800, 
    category: "Fitness",
    icon: FaDumbbell,
    description: "3-month gym membership",
    stock: 5,
    popular: true,
    legalStatus: "Company social spending"
  },
  { 
    id: 6, 
    name: "Team Experience", 
    cost: 600, 
    category: "Social",
    icon: FaUsers,
    description: "Team building activity (managed by company)",
    stock: 3,
    popular: false,
    legalStatus: "Business entertainment expense"
  }
];

const achievements = [
  { 
    id: 1, 
    name: "First Week Champion", 
    description: "Complete your first week with 100% productivity", 
    icon: FaMedal,
    unlocked: true,
    tokens: 100,
    date: "2024-12-15"
  },
  { 
    id: 2, 
    name: "Consistency King", 
    description: "Maintain productivity streak for 30 days", 
    icon: FaCrown,
    unlocked: true,
    tokens: 250,
    date: "2024-12-20"
  },
  { 
    id: 3, 
    name: "Team Player", 
    description: "Help 5 team members reach their goals", 
    icon: FaAward,
    unlocked: false,
    tokens: 200,
    progress: 60
  },
  { 
    id: 4, 
    name: "Rocket Boost", 
    description: "Exceed daily target by 50% for 5 days", 
    icon: FaRocket,
    unlocked: false,
    tokens: 300,
    progress: 20
  }
];

const recentActivity = [
  { 
    id: 1, 
    type: "earned", 
    description: "Daily productivity bonus", 
    tokens: 25, 
    date: "Today" 
  },
  { 
    id: 2, 
    type: "redeemed", 
    description: "Premium Coffee reward", 
    tokens: -50, 
    date: "Yesterday" 
  },
  { 
    id: 3, 
    type: "achievement", 
    description: "Consistency King badge earned", 
    tokens: 250, 
    date: "2 days ago" 
  },
  { 
    id: 4, 
    type: "earned", 
    description: "Weekly target completion", 
    tokens: 100, 
    date: "3 days ago" 
  }
];

const leaderboard = [
  { rank: 1, name: "David Wilson", tokens: 3200, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=David" },
  { rank: 2, name: "Emma Brown", tokens: 2890, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma" },
  { rank: 3, name: "You", tokens: 2450, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Current", isCurrentUser: true },
  { rank: 4, name: "Alice Johnson", tokens: 2200, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alice" },
  { rank: 5, name: "Bob Martinez", tokens: 1950, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bob" }
];

export default function RewardsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedReward, setSelectedReward] = useState(null);
  
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const accentColor = useColorModeValue("zen.500", "zen.300");
  const gradientBg = useColorModeValue(
    "linear(135deg, zen.50 0%, mindful.100 30%, zen.100 100%)",
    "linear(135deg, gray.900 0%, gray.800 30%, gray.700 100%)"
  );

  const categories = ["All", "Time Off", "Development", "Flexibility", "Health", "Fitness", "Social"];
  
  const filteredRewards = selectedCategory === "All" 
    ? availableRewards 
    : availableRewards.filter(reward => reward.category === selectedCategory);

  const openRewardModal = (reward) => {
    setSelectedReward(reward);
    onOpen();
  };

  const canAfford = (cost) => userStats.totalTokens >= cost;

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
                <Icon as={FaTrophy} color="zen.500" boxSize={8} />
                <Heading size="xl" color={textColor}>
                  Rewards & Incentives
                </Heading>
              </Flex>
              <Text color="gray.500" fontSize="lg">
                Earn tokens through productivity and redeem amazing rewards
              </Text>
            </VStack>
          </MotionBox>

          {/* Stats Overview */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >            <SimpleGrid columns={[1, 2, 5]} spacing={6} mb={8}>
              <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6}>
                <VStack textAlign="center">
                  <Icon as={FaCoins} boxSize={6} color="yellow.500" mb={2} />
                  <Stat>
                    <StatNumber color={accentColor}>{userStats.totalTokens}</StatNumber>
                    <StatLabel>Total Tokens</StatLabel>
                  </Stat>
                </VStack>
              </Box>

              <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6}>
                <VStack textAlign="center">
                  <Icon as={FaStar} boxSize={6} color="orange.500" mb={2} />
                  <Stat>
                    <StatNumber color={accentColor}>{userStats.weeklyTokens}</StatNumber>
                    <StatLabel>This Week</StatLabel>
                  </Stat>
                </VStack>
              </Box>

              <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6}>
                <VStack textAlign="center">
                  <Icon as={FaCrown} boxSize={6} color="purple.500" mb={2} />
                  <Stat>
                    <StatNumber color={accentColor}>#{userStats.monthlyRank}</StatNumber>
                    <StatLabel>Monthly Rank</StatLabel>
                  </Stat>
                </VStack>
              </Box>

              <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6}>
                <VStack textAlign="center">
                  <Icon as={FaGift} boxSize={6} color="green.500" mb={2} />
                  <Stat>
                    <StatNumber color={accentColor}>{userStats.totalRewards}</StatNumber>
                    <StatLabel>Rewards Earned</StatLabel>
                  </Stat>
                </VStack>
              </Box>

              <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6}>
                <VStack textAlign="center">
                  <Icon as={FaFire} boxSize={6} color="red.500" mb={2} />
                  <Stat>
                    <StatNumber color={accentColor}>{userStats.streak}</StatNumber>
                    <StatLabel>Day Streak</StatLabel>
                  </Stat>
                </VStack>
              </Box>
            </SimpleGrid>
          </MotionBox>

          {/* Main Content Tabs */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs variant="soft-rounded" colorScheme="zen">
              <TabList mb={6}>
                <Tab leftIcon={<FaShoppingCart />}>Marketplace</Tab>
                <Tab leftIcon={<FaTrophy />}>Achievements</Tab>
                <Tab leftIcon={<FaHistory />}>Activity</Tab>
                <Tab leftIcon={<FaCrown />}>Leaderboard</Tab>
              </TabList>

              <TabPanels>
                {/* Marketplace Tab */}
                <TabPanel p={0}>
                  {/* Category Filter */}
                  <HStack spacing={2} mb={6} overflowX="auto" py={2}>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        size="sm"
                        variant={selectedCategory === category ? "solid" : "ghost"}
                        colorScheme="zen"
                        onClick={() => setSelectedCategory(category)}
                        minW="fit-content"
                      >
                        {category}
                      </Button>
                    ))}
                  </HStack>

                  {/* Rewards Grid */}
                  <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                    {filteredRewards.map((reward) => (
                      <MotionBox
                        key={reward.id}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >                        <Box 
                          bg={cardBg} 
                          borderColor={borderColor}
                          border="1px solid"
                          borderRadius="xl"
                          p={6}
                          position="relative"
                          cursor="pointer"
                          onClick={() => openRewardModal(reward)}
                          _hover={{ boxShadow: "lg" }}
                        >
                          {reward.popular && (
                            <Badge
                              position="absolute"
                              top={2}
                              right={2}
                              colorScheme="orange"
                              variant="solid"
                              fontSize="xs"
                            >
                              Popular
                            </Badge>
                          )}                          
                          <VStack spacing={4}>
                            <Icon as={reward.icon} boxSize={10} color={accentColor} />
                            <VStack spacing={1} textAlign="center">
                              <Text fontWeight="bold" color={textColor}>
                                {reward.name}
                              </Text>
                              <Text fontSize="sm" color="gray.500">
                                {reward.description}
                              </Text>
                              <Badge variant="outline" colorScheme="blue">
                                {reward.category}
                              </Badge>
                            </VStack>
                            
                            <Flex justify="space-between" align="center" w="100%">
                              <HStack>
                                <Icon as={FaCoins} color="yellow.500" />
                                <Text fontWeight="bold" color={textColor}>
                                  {reward.cost}
                                </Text>
                              </HStack>
                              <Text fontSize="sm" color="gray.500">
                                {reward.stock} left
                              </Text>
                            </Flex>

                            <Button
                              colorScheme="zen"
                              size="sm"
                              w="100%"
                              isDisabled={!canAfford(reward.cost) || reward.stock === 0}
                              leftIcon={<FaShoppingCart />}
                            >
                              {!canAfford(reward.cost) ? "Insufficient Tokens" : 
                               reward.stock === 0 ? "Out of Stock" : "Redeem"}
                            </Button>
                          </VStack>
                        </Box>
                      </MotionBox>
                    ))}
                  </SimpleGrid>
                </TabPanel>

                {/* Achievements Tab */}
                <TabPanel p={0}>
                  <SimpleGrid columns={[1, 2]} spacing={6}>                    {achievements.map((achievement) => (
                      <Box key={achievement.id} bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" p={6}>
                        <Flex align="center" gap={4}>
                          <Box
                            p={3}
                            borderRadius="xl"
                            bg={achievement.unlocked ? "green.100" : "gray.100"}
                          >
                            <Icon 
                              as={achievement.icon} 
                              boxSize={6} 
                              color={achievement.unlocked ? "green.500" : "gray.400"}
                            />
                          </Box>
                          
                          <Box flex={1}>
                            <HStack justify="space-between" mb={1}>
                              <Text fontWeight="bold" color={textColor}>
                                {achievement.name}
                              </Text>
                              <HStack>
                                <Icon as={FaCoins} color="yellow.500" boxSize={3} />
                                <Text fontWeight="bold" fontSize="sm">
                                  {achievement.tokens}
                                </Text>
                              </HStack>
                            </HStack>
                            
                            <Text fontSize="sm" color="gray.500" mb={2}>
                              {achievement.description}
                            </Text>
                            
                            {achievement.unlocked ? (
                              <Badge colorScheme="green" variant="subtle">
                                Unlocked on {achievement.date}
                              </Badge>
                            ) : (
                              <VStack align="stretch" spacing={1}>
                                <Progress 
                                  value={achievement.progress} 
                                  size="sm" 
                                  colorScheme="zen"
                                  borderRadius="full"
                                />
                                <Text fontSize="xs" color="gray.500">
                                  {achievement.progress}% complete
                                </Text>
                              </VStack>
                            )}
                          </Box>
                        </Flex>
                      </Box>
                    ))}
                  </SimpleGrid>
                </TabPanel>                {/* Activity Tab */}
                <TabPanel p={0}>
                  <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" overflow="hidden">
                    <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                      <Heading size="md">Recent Activity</Heading>
                    </Box>
                    <Box p={6}>
                      <VStack spacing={4} divider={<Divider />}>
                        {recentActivity.map((activity) => (
                          <Flex key={activity.id} justify="space-between" align="center" w="100%">
                            <VStack align="flex-start" spacing={0}>
                              <Text fontWeight="medium" color={textColor}>
                                {activity.description}
                              </Text>
                              <Text fontSize="sm" color="gray.500">
                                {activity.date}
                              </Text>
                            </VStack>
                            
                            <HStack>
                              <Icon as={FaCoins} color="yellow.500" />
                              <Text 
                                fontWeight="bold" 
                                color={activity.tokens > 0 ? "green.500" : "red.500"}
                              >
                                {activity.tokens > 0 ? "+" : ""}{activity.tokens}
                              </Text>
                            </HStack>
                          </Flex>
                        ))}
                      </VStack>
                    </Box>
                  </Box>
                </TabPanel>                {/* Leaderboard Tab */}
                <TabPanel p={0}>
                  <Box bg={cardBg} borderColor={borderColor} border="1px solid" borderRadius="xl" overflow="hidden">
                    <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                      <Heading size="md">Monthly Leaderboard</Heading>
                    </Box>
                    <Box p={6}>
                      <VStack spacing={4}>
                        {leaderboard.map((user) => (
                          <Flex 
                            key={user.rank} 
                            justify="space-between" 
                            align="center" 
                            w="100%"
                            p={3}
                            borderRadius="lg"
                            bg={user.isCurrentUser ? "zen.50" : "transparent"}
                            border={user.isCurrentUser ? "2px solid" : "1px solid transparent"}
                            borderColor={user.isCurrentUser ? "zen.300" : "transparent"}
                          >
                            <HStack>
                              <Text 
                                fontWeight="bold" 
                                fontSize="lg" 
                                minW="30px"
                                color={
                                  user.rank === 1 ? "yellow.500" :
                                  user.rank === 2 ? "gray.400" :
                                  user.rank === 3 ? "orange.600" : textColor
                                }
                              >
                                #{user.rank}
                              </Text>
                              <Avatar src={user.avatar} size="sm" />
                              <Text fontWeight="medium" color={textColor}>
                                {user.name}
                                {user.isCurrentUser && (
                                  <Badge ml={2} colorScheme="zen" variant="subtle">
                                    You
                                  </Badge>
                                )}
                              </Text>
                            </HStack>
                            
                            <HStack>
                              <Icon as={FaCoins} color="yellow.500" />
                              <Text fontWeight="bold" color={textColor}>
                                {user.tokens.toLocaleString()}
                              </Text>
                            </HStack>
                          </Flex>
                        ))}
                      </VStack>
                    </Box>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </MotionBox>
        </Box>
      </Box>

      {/* Reward Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Icon as={selectedReward?.icon} color={accentColor} />
              <Text>{selectedReward?.name}</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedReward && (
              <VStack spacing={4} align="stretch">
                <Text color="gray.600">
                  {selectedReward.description}
                </Text>
                
                <HStack justify="space-between">
                  <Text>Cost:</Text>
                  <HStack>
                    <Icon as={FaCoins} color="yellow.500" />
                    <Text fontWeight="bold">{selectedReward.cost} tokens</Text>
                  </HStack>
                </HStack>
                
                <HStack justify="space-between">
                  <Text>Available:</Text>
                  <Text>{selectedReward.stock} remaining</Text>
                </HStack>
                
                <HStack justify="space-between">
                  <Text>Legal Status:</Text>
                  <Badge colorScheme="green" variant="subtle">
                    {selectedReward.legalStatus}
                  </Badge>
                </HStack>
                
                <HStack justify="space-between">
                  <Text>Your balance:</Text>
                  <HStack>
                    <Icon as={FaCoins} color="yellow.500" />
                    <Text fontWeight="bold">{userStats.totalTokens} tokens</Text>
                  </HStack>
                </HStack>
                
                <Button
                  colorScheme="zen"
                  size="lg"
                  w="100%"
                  isDisabled={!canAfford(selectedReward.cost) || selectedReward.stock === 0}
                  leftIcon={<FaExchangeAlt />}
                >
                  {!canAfford(selectedReward.cost) ? "Insufficient Tokens" : 
                   selectedReward.stock === 0 ? "Out of Stock" : "Confirm Redemption"}
                </Button>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Layout>
  );
}
