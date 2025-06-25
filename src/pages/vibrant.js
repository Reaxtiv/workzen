import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Text,
  Avatar,
  VStack,
  HStack,
  Badge,
  Flex,
  Icon,
  CircularProgress,
  CircularProgressLabel,
  useColorModeValue,
  Container,
  Divider
} from "@chakra-ui/react";
import { FaLeaf, FaClock, FaHeart, FaShieldAlt, FaMedal, FaChartLine, FaFire, FaWater, FaMountain } from "react-icons/fa";

// Datos estáticos para evitar problemas de hidratación
const staticUsers = [
  { 
    id: 1, 
    name: "Alice Chen", 
    productivity: 87, 
    zenLevel: "Mindful Master",
    todayHours: "7.5h",
    focusTime: "6.2h",
    restTime: "1.3h",
    distractedTime: "0.8h",
    rewards: ["2h Extra Rest", "Zen Badge"],
    color: "zen"
  },
  { 
    id: 2, 
    name: "Roberto Silva", 
    productivity: 92, 
    zenLevel: "Flow State",
    todayHours: "8.2h",
    focusTime: "7.8h",
    restTime: "0.4h",
    distractedTime: "0.6h",
    rewards: ["Half Day Off", "Productivity Champion"],
    color: "mindful"
  },
  { 
    id: 3, 
    name: "Maya Patel", 
    productivity: 78, 
    zenLevel: "Growing Mindfully",
    todayHours: "6.8h",
    focusTime: "5.4h",
    restTime: "1.1h",
    distractedTime: "1.2h",
    rewards: ["1h Flex Time"],
    color: "serenity"
  },
];

function ZenUserCard({ user }) {
  const cardBg = {
    zen: "linear-gradient(135deg, #2E8B57 0%, #52C452 100%)",
    mindful: "linear-gradient(135deg, #F9A825 0%, #FFD54F 100%)", 
    serenity: "linear-gradient(135deg, #2E8B9F 0%, #58B8C8 100%)"
  };

  const iconBg = {
    zen: "#1C5B37",
    mindful: "#E65100", 
    serenity: "#1C4B5F"
  };

  return (
    <Box
      bgGradient={cardBg[user.color]}
      p={6}
      borderRadius="2xl"
      boxShadow="0 20px 40px rgba(0,0,0,0.15)"
      color="white"
      position="relative"
      overflow="hidden"
      transition="all 0.4s ease"
      _hover={{
        transform: "translateY(-8px) scale(1.02)",
        boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
      }}
    >
      {/* Patrón de fondo sutil */}
      <Box
        position="absolute"
        top="-50%"
        right="-50%"
        width="200%"
        height="200%"
        opacity={0.1}
        bgImage="radial-gradient(circle, white 1px, transparent 1px)"
        bgSize="20px 20px"
      />

      <HStack spacing={4} mb={6} position="relative" zIndex={1}>
        <Box
          p={4}
          borderRadius="full"
          bg={iconBg[user.color]}
          boxShadow="0 8px 20px rgba(0,0,0,0.3)"
        >
          <Avatar 
            name={user.name} 
            size="lg"
            bg="transparent"
            color="white"
            fontSize="xl"
            fontWeight="bold"
          />
        </Box>
        <VStack align="flex-start" spacing={2}>
          <Text fontWeight="bold" fontSize="xl" textShadow="0 2px 4px rgba(0,0,0,0.3)">
            {user.name}
          </Text>
          <Badge 
            bg="rgba(255,255,255,0.2)" 
            color="white"
            borderRadius="full"
            px={4}
            py={2}
            fontSize="sm"
            fontWeight="semibold"
            backdropFilter="blur(10px)"
            border="1px solid rgba(255,255,255,0.3)"
          >
            {user.zenLevel}
          </Badge>
        </VStack>
      </HStack>

      {/* Progress Ring más llamativo */}
      <Flex justify="center" mb={6} position="relative" zIndex={1}>
        <Box position="relative">
          <CircularProgress 
            value={user.productivity} 
            color="white"
            size="120px"
            thickness="8px"
            trackColor="rgba(255,255,255,0.2)"
          >
            <CircularProgressLabel fontSize="2xl" fontWeight="bold" color="white" textShadow="0 2px 4px rgba(0,0,0,0.5)">
              {user.productivity}%
            </CircularProgressLabel>
          </CircularProgress>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="100px"
            h="100px"
            borderRadius="full"
            bg="rgba(255,255,255,0.1)"
            backdropFilter="blur(10px)"
            zIndex={-1}
          />
        </Box>
      </Flex>

      {/* Time Breakdown con mejor contraste */}
      <VStack spacing={4} mb={6} position="relative" zIndex={1}>
        <HStack justify="space-between" w="100%" p={3} bg="rgba(255,255,255,0.15)" borderRadius="lg" backdropFilter="blur(10px)">
          <HStack>
            <Icon as={FaFire} color="white" w={5} h={5} />
            <Text fontSize="md" fontWeight="semibold">Focus Time</Text>
          </HStack>
          <Text fontSize="md" fontWeight="bold">
            {user.focusTime}
          </Text>
        </HStack>
        
        <HStack justify="space-between" w="100%" p={3} bg="rgba(255,255,255,0.15)" borderRadius="lg" backdropFilter="blur(10px)">
          <HStack>
            <Icon as={FaWater} color="white" w={5} h={5} />
            <Text fontSize="md" fontWeight="semibold">Rest Time</Text>
          </HStack>
          <Text fontSize="md" fontWeight="bold">
            {user.restTime}
          </Text>
        </HStack>
        
        <HStack justify="space-between" w="100%" p={3} bg="rgba(255,255,255,0.15)" borderRadius="lg" backdropFilter="blur(10px)">
          <HStack>
            <Icon as={FaClock} color="white" w={5} h={5} />
            <Text fontSize="md" fontWeight="semibold">Distractions</Text>
          </HStack>
          <Text fontSize="md" fontWeight="bold">
            {user.distractedTime}
          </Text>
        </HStack>
      </VStack>

      {/* Rewards section */}
      <VStack align="stretch" spacing={3} position="relative" zIndex={1}>
        <HStack>
          <Icon as={FaMedal} color="white" w={5} h={5} />
          <Text fontSize="md" fontWeight="bold">Earned Rewards</Text>
        </HStack>
        <VStack spacing={2}>
          {user.rewards.map((reward, index) => (
            <Box
              key={index}
              w="100%"
              p={2}
              bg="rgba(255,255,255,0.2)"
              borderRadius="lg"
              textAlign="center"
              backdropFilter="blur(10px)"
              border="1px solid rgba(255,255,255,0.3)"
              fontWeight="semibold"
            >
              {reward}
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}

function ZenMetricCard({ title, value, subtitle, icon: IconComponent, gradient, shadowColor }) {
  return (
    <Box
      bgGradient={gradient}
      p={8}
      borderRadius="2xl"
      color="white"
      textAlign="center"
      position="relative"
      overflow="hidden"
      boxShadow={`0 20px 40px ${shadowColor}`}
      transition="all 0.4s ease"
      _hover={{
        transform: "translateY(-6px) scale(1.05)",
        boxShadow: `0 30px 60px ${shadowColor}`,
      }}
    >
      {/* Patrón de fondo */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.1}
        bgImage="radial-gradient(circle, white 1px, transparent 1px)"
        bgSize="15px 15px"
      />
      
      <Flex justify="center" mb={4} position="relative" zIndex={1}>
        <Box
          p={4}
          borderRadius="full"
          bg="rgba(255,255,255,0.2)"
          backdropFilter="blur(10px)"
          border="2px solid rgba(255,255,255,0.3)"
        >
          <Icon as={IconComponent} w={8} h={8} color="white" />
        </Box>
      </Flex>
      <Text fontSize="4xl" fontWeight="bold" mb={2} textShadow="0 2px 4px rgba(0,0,0,0.3)" position="relative" zIndex={1}>
        {value}
      </Text>
      <Text fontSize="lg" fontWeight="semibold" mb={1} position="relative" zIndex={1}>
        {title}
      </Text>
      <Text fontSize="sm" opacity={0.9} position="relative" zIndex={1}>
        {subtitle}
      </Text>
    </Box>
  );
}

export default function VibrantZenDashboard() {
  return (
    <Box 
      minH="100vh" 
      bgGradient="linear(to-br, #0A2918 0%, #1C5B37 50%, #2E8B57 100%)"
      position="relative"
      overflow="hidden"
    >
      {/* Patrón de fondo animado */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.05}
        bgImage="radial-gradient(circle, #52C452 2px, transparent 2px)"
        bgSize="60px 60px"
        animation="float 20s ease-in-out infinite"
      />
      
      <Container maxW="7xl" p={8} position="relative" zIndex={1}>
        <VStack spacing={12} align="stretch">
          {/* Header más impactante */}
          <Box textAlign="center" py={8}>
            <Heading 
              size="4xl" 
              color="white"
              mb={6}
              textShadow="0 4px 8px rgba(0,0,0,0.3)"
              fontWeight="bold"
            >
              🧘‍♀️ WorkZen Dashboard
            </Heading>
            <Text fontSize="xl" color="rgba(255,255,255,0.9)" maxW="800px" mx="auto" mb={8}>
              Cultivating mindful productivity through transparency and balance. 
              Your daily achievements are immutably recorded on blockchain for your career growth.
            </Text>
            <HStack justify="center" spacing={6}>
              <Badge 
                bg="rgba(255,255,255,0.2)" 
                color="white"
                px={6}
                py={3}
                borderRadius="full"
                fontSize="md"
                fontWeight="semibold"
                backdropFilter="blur(10px)"
                border="1px solid rgba(255,255,255,0.3)"
              >
                <Icon as={FaShieldAlt} mr={3} />
                Blockchain Verified
              </Badge>
              <Badge 
                bg="rgba(255,255,255,0.2)" 
                color="white"
                px={6}
                py={3}
                borderRadius="full"
                fontSize="md"
                fontWeight="semibold"
                backdropFilter="blur(10px)"
                border="1px solid rgba(255,255,255,0.3)"
              >
                <Icon as={FaLeaf} mr={3} />
                Mindful Work
              </Badge>
            </HStack>
          </Box>

          {/* Métricas más vibrantes */}
          <SimpleGrid columns={[1, 2, 4]} spacing={8}>
            <ZenMetricCard
              title="Team Zen Score"
              value="86%"
              subtitle="Average mindful productivity"
              icon={FaLeaf}
              gradient="linear(135deg, #52C452 0%, #7DD87D 100%)"
              shadowColor="rgba(82, 196, 82, 0.3)"
            />
            <ZenMetricCard
              title="Total Focus Hours"
              value="22.5h"
              subtitle="Deep work time today"
              icon={FaFire}
              gradient="linear(135deg, #F9A825 0%, #FFD54F 100%)"
              shadowColor="rgba(249, 168, 37, 0.3)"
            />
            <ZenMetricCard
              title="Rewards Earned"
              value="6"
              subtitle="Wellbeing incentives"
              icon={FaMedal}
              gradient="linear(135deg, #E65100 0%, #FF9800 100%)"
              shadowColor="rgba(230, 81, 0, 0.3)"
            />
            <ZenMetricCard
              title="Active Members"
              value="3"
              subtitle="Mindful practitioners"
              icon={FaHeart}
              gradient="linear(135deg, #2E8B9F 0%, #58B8C8 100%)"
              shadowColor="rgba(46, 139, 159, 0.3)"
            />
          </SimpleGrid>

          {/* Team Members section */}
          <Box>
            <Heading size="2xl" mb={8} color="white" textShadow="0 2px 4px rgba(0,0,0,0.3)">
              🌱 Mindful Team Members
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={8}>
              {staticUsers.map(user => (
                <ZenUserCard key={user.id} user={user} />
              ))}
            </SimpleGrid>
          </Box>

          {/* Blockchain section más impactante */}
          <Box
            bgGradient="linear(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)"
            p={8}
            borderRadius="3xl"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255,255,255,0.2)"
            boxShadow="0 20px 40px rgba(0,0,0,0.2)"
          >
            <HStack spacing={6} mb={8}>
              <Box
                p={4}
                borderRadius="full"
                bg="rgba(255,255,255,0.2)"
                backdropFilter="blur(10px)"
              >
                <Icon as={FaShieldAlt} w={8} h={8} color="white" />
              </Box>
              <VStack align="flex-start" spacing={1}>
                <Heading size="xl" color="white">
                  Blockchain Transparency
                </Heading>
                <Text fontSize="lg" color="rgba(255,255,255,0.8)">
                  Your productivity data is immutably stored for career verification
                </Text>
              </VStack>
            </HStack>
            
            <SimpleGrid columns={[1, 3]} spacing={6}>
              <Box 
                textAlign="center" 
                p={6} 
                bg="rgba(82, 196, 82, 0.2)" 
                borderRadius="xl"
                backdropFilter="blur(10px)"
                border="1px solid rgba(82, 196, 82, 0.3)"
              >
                <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                  Today's Session
                </Text>
                <Text fontSize="3xl" fontWeight="bold" color="white" mb={1}>
                  #2024-12-24
                </Text>
                <Text fontSize="sm" color="rgba(255,255,255,0.8)">Block recorded</Text>
              </Box>
              
              <Box 
                textAlign="center" 
                p={6} 
                bg="rgba(46, 139, 159, 0.2)" 
                borderRadius="xl"
                backdropFilter="blur(10px)"
                border="1px solid rgba(46, 139, 159, 0.3)"
              >
                <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                  Verification Status
                </Text>
                <Text fontSize="3xl" fontWeight="bold" color="white" mb={1}>
                  ✓ Verified
                </Text>
                <Text fontSize="sm" color="rgba(255,255,255,0.8)">Immutable record</Text>
              </Box>
              
              <Box 
                textAlign="center" 
                p={6} 
                bg="rgba(249, 168, 37, 0.2)" 
                borderRadius="xl"
                backdropFilter="blur(10px)"
                border="1px solid rgba(249, 168, 37, 0.3)"
              >
                <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                  Career Points
                </Text>
                <Text fontSize="3xl" fontWeight="bold" color="white" mb={1}>
                  1,247
                </Text>
                <Text fontSize="sm" color="rgba(255,255,255,0.8)">Lifetime achievement</Text>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
      `}</style>
    </Box>
  );
}
