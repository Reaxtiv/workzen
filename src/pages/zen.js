import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Text, 
  Progress,
  Avatar,
  VStack,
  HStack,
  Badge,
  Flex,
  Icon,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  useColorModeValue
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaLeaf, FaClock, FaHeart, FaShieldAlt, FaMedal, FaChartLine } from "react-icons/fa";

// Datos de ejemplo con contexto zen
const users = [
  { 
    id: 1, 
    name: "Alice Chen", 
    productivity: 87, 
    zenLevel: "Mindful Master",
    todayHours: 7.5,
    focusTime: 6.2,
    restTime: 1.3,
    distractedTime: 0.8,
    rewards: ["2h Extra Rest", "Zen Badge"]
  },
  { 
    id: 2, 
    name: "Roberto Silva", 
    productivity: 92, 
    zenLevel: "Flow State",
    todayHours: 8.2,
    focusTime: 7.8,
    restTime: 0.4,
    distractedTime: 0.6,
    rewards: ["Half Day Off", "Productivity Champion"]
  },
  { 
    id: 3, 
    name: "Maya Patel", 
    productivity: 78, 
    zenLevel: "Growing Mindfully",
    todayHours: 6.8,
    focusTime: 5.4,
    restTime: 1.1,
    distractedTime: 1.2,
    rewards: ["1h Flex Time"]
  },
];

function ZenUserCard({ user }) {
  const bg = useColorModeValue("white", "zen.800");
  const getZenColor = (level) => {
    if (level === "Flow State") return "mindful";
    if (level === "Mindful Master") return "zen";
    return "serenity";
  };

  const zenColor = getZenColor(user.zenLevel);

  return (
    <Box
      bg={bg}
      p={6}
      borderRadius="xl"
      boxShadow="zenSoft"
      border="1px solid"
      borderColor="zen.200"
      position="relative"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "zenMedium",
      }}
    >
      {/* Zen gradient top */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="4px"
        bgGradient={`linear(to-r, ${zenColor}.400, ${zenColor}.600)`}
      />

      <HStack spacing={4} mb={4}>
        <Avatar 
          name={user.name} 
          size="lg"
          bg={`${zenColor}.500`}
          color="white"
        />
        <VStack align="flex-start" spacing={1}>
          <Text fontWeight="bold" fontSize="lg">{user.name}</Text>
          <Badge 
            colorScheme={zenColor} 
            variant="subtle" 
            borderRadius="full"
            px={3}
            py={1}
          >
            {user.zenLevel}
          </Badge>
          <HStack spacing={2}>
            <Icon as={FaLeaf} color="zen.500" w={3} h={3} />
            <Text fontSize="sm" color="zen.600">
              {user.productivity}% Zen Score
            </Text>
          </HStack>
        </VStack>
      </HStack>

      {/* Progress Ring */}
      <Flex justify="center" mb={4}>
        <CircularProgress 
          value={user.productivity} 
          color={`${zenColor}.500`}
          size="100px"
          thickness="6px"
          trackColor="zen.100"
        >
          <CircularProgressLabel fontSize="lg" fontWeight="bold" color={`${zenColor}.600`}>
            {user.productivity}%
          </CircularProgressLabel>
        </CircularProgress>
      </Flex>

      {/* Time Breakdown */}
      <VStack spacing={3} mb={4}>
        <HStack justify="space-between" w="100%">
          <HStack>
            <Icon as={FaChartLine} color="productive.500" w={4} h={4} />
            <Text fontSize="sm">Focus Time</Text>
          </HStack>
          <Text fontSize="sm" fontWeight="bold" color="productive.600">
            {user.focusTime}h
          </Text>
        </HStack>
        
        <HStack justify="space-between" w="100%">
          <HStack>
            <Icon as={FaHeart} color="rest.500" w={4} h={4} />
            <Text fontSize="sm">Rest Time</Text>
          </HStack>
          <Text fontSize="sm" fontWeight="bold" color="rest.600">
            {user.restTime}h
          </Text>
        </HStack>
        
        <HStack justify="space-between" w="100%">
          <HStack>
            <Icon as={FaClock} color="distraction.500" w={4} h={4} />
            <Text fontSize="sm">Distractions</Text>
          </HStack>
          <Text fontSize="sm" fontWeight="bold" color="distraction.600">
            {user.distractedTime}h
          </Text>
        </HStack>
      </VStack>

      <Divider my={4} />

      {/* Rewards */}
      <VStack align="stretch" spacing={2}>
        <HStack>
          <Icon as={FaMedal} color="mindful.500" w={4} h={4} />
          <Text fontSize="sm" fontWeight="semibold">Earned Rewards</Text>
        </HStack>
        <VStack spacing={1}>
          {user.rewards.map((reward, index) => (
            <Badge 
              key={index}
              colorScheme="mindful" 
              variant="outline"
              size="sm"
              w="100%"
              textAlign="center"
              py={1}
            >
              {reward}
            </Badge>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}

function ZenMetricCard({ title, value, subtitle, icon: IconComponent, color = "zen" }) {
  const bg = useColorModeValue("white", "zen.800");
  
  return (
    <Box
      bg={bg}
      p={6}
      borderRadius="xl"
      boxShadow="zenSoft"
      border="1px solid"
      borderColor="zen.200"
      textAlign="center"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "zenMedium",
      }}
    >
      <Flex justify="center" mb={3}>
        <Box
          p={3}
          borderRadius="full"
          bg={`${color}.50`}
          border="2px solid"
          borderColor={`${color}.200`}
        >
          <Icon as={IconComponent} w={6} h={6} color={`${color}.500`} />
        </Box>
      </Flex>
      <Text fontSize="3xl" fontWeight="bold" color={`${color}.600`} mb={1}>
        {value}
      </Text>
      <Text fontSize="sm" color="zen.600" fontWeight="medium" mb={1}>
        {title}
      </Text>
      <Text fontSize="xs" color="zen.500">
        {subtitle}
      </Text>
    </Box>
  );
}

export default function ZenDashboard() {
  const bg = useColorModeValue("zen.50", "zen.900");
  const [mounted, setMounted] = useState(false);
  
  // Solucionar problema de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const totalHours = users.reduce((sum, user) => sum + user.todayHours, 0);
  const avgProductivity = Math.round(users.reduce((sum, user) => sum + user.productivity, 0) / users.length);
  const totalRewards = users.reduce((sum, user) => sum + user.rewards.length, 0);

  // Datos estáticos para evitar hidratación
  const blockchainData = {
    todaySession: "2024-12-24",
    verificationStatus: "✓ Verified",
    careerPoints: "1,247"
  };

  if (!mounted) {
    return null; // Evita el error de hidratación
  }

  return (
    <Box minH="100vh" bg={bg} p={8}>
      <VStack spacing={8} align="stretch">
        {/* Header con filosofía zen */}
        <Box textAlign="center" mb={8}>
          <Heading 
            size="2xl" 
            bgGradient="linear(to-r, zen.500, serenity.500)"
            bgClip="text"
            mb={4}
          >
            🧘‍♀️ WorkZen Dashboard
          </Heading>
          <Text fontSize="lg" color="zen.600" maxW="600px" mx="auto">
            Cultivating mindful productivity through transparency and balance. 
            Your daily achievements are immutably recorded on blockchain for your career growth.
          </Text>
          <HStack justify="center" mt={4} spacing={4}>
            <Badge colorScheme="zen" variant="subtle" px={3} py={1}>
              <Icon as={FaShieldAlt} mr={2} />
              Blockchain Verified
            </Badge>
            <Badge colorScheme="serenity" variant="subtle" px={3} py={1}>
              <Icon as={FaLeaf} mr={2} />
              Mindful Work
            </Badge>
          </HStack>
        </Box>

        {/* Métricas Zen */}
        <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={8}>
          <ZenMetricCard
            title="Team Zen Score"
            value={`${avgProductivity}%`}
            subtitle="Average mindful productivity"
            icon={FaLeaf}
            color="zen"
          />
          <ZenMetricCard
            title="Total Focus Hours"
            value={`${totalHours.toFixed(1)}h`}
            subtitle="Deep work time today"
            icon={FaChartLine}
            color="productive"
          />
          <ZenMetricCard
            title="Rewards Earned"
            value={totalRewards}
            subtitle="Wellbeing incentives"
            icon={FaMedal}
            color="mindful"
          />
          <ZenMetricCard
            title="Active Members"
            value={users.length}
            subtitle="Mindful practitioners"
            icon={FaHeart}
            color="serenity"
          />
        </SimpleGrid>

        {/* Team Members */}
        <Box>
          <Heading size="lg" mb={6} color="zen.700">
            🌱 Mindful Team Members
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {users.map(user => (
              <ZenUserCard key={user.id} user={user} />
            ))}
          </SimpleGrid>
        </Box>

        {/* Blockchain Info */}
        <Box
          bg={useColorModeValue("white", "zen.800")}
          p={6}
          borderRadius="xl"
          boxShadow="zenSoft"
          border="1px solid"
          borderColor="zen.200"
        >
          <HStack spacing={4} mb={4}>
            <Icon as={FaShieldAlt} w={6} h={6} color="zen.500" />
            <VStack align="flex-start" spacing={0}>
              <Heading size="md" color="zen.700">
                Blockchain Transparency
              </Heading>
              <Text fontSize="sm" color="zen.600">
                Your productivity data is immutably stored for career verification
              </Text>
            </VStack>
          </HStack>
          
          <SimpleGrid columns={[1, 3]} spacing={4}>            <Box textAlign="center" p={4} bg="zen.50" borderRadius="lg">
              <Text fontSize="lg" fontWeight="bold" color="zen.600">
                Today's Session
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="zen.500">
                #{blockchainData.todaySession}
              </Text>
              <Text fontSize="xs" color="zen.500">Block recorded</Text>
            </Box>
            
            <Box textAlign="center" p={4} bg="serenity.50" borderRadius="lg">
              <Text fontSize="lg" fontWeight="bold" color="serenity.600">
                Verification Status
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="serenity.500">
                {blockchainData.verificationStatus}
              </Text>
              <Text fontSize="xs" color="serenity.500">Immutable record</Text>
            </Box>
            
            <Box textAlign="center" p={4} bg="mindful.50" borderRadius="lg">
              <Text fontSize="lg" fontWeight="bold" color="mindful.600">
                Career Points
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="mindful.500">
                {blockchainData.careerPoints}
              </Text>
              <Text fontSize="xs" color="mindful.500">Lifetime achievement</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
}
