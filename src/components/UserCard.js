import { 
  Box, 
  Text, 
  Progress, 
  Avatar, 
  Flex, 
  Badge, 
  CircularProgress, 
  CircularProgressLabel,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Tooltip
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaUser, FaArrowUp, FaTrophy, FaClock } from "react-icons/fa";

const MotionBox = motion(Box);

export default function UserCard({ user }) {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  
  const getProductivityColor = (productivity) => {
    if (productivity >= 85) return "green";
    if (productivity >= 70) return "blue";
    if (productivity >= 50) return "yellow";
    return "red";
  };

  const getStatusBadge = (productivity) => {
    if (productivity >= 85) return { label: "Excellent", color: "green" };
    if (productivity >= 70) return { label: "Good", color: "blue" };
    if (productivity >= 50) return { label: "Average", color: "yellow" };
    return { label: "Needs Improvement", color: "red" };
  };

  const status = getStatusBadge(user.productivity);

  return (
    <MotionBox
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <Box
        bg={bg}
        borderRadius="xl"
        p={6}
        border="1px solid"
        borderColor={borderColor}
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        _hover={{
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          borderColor: "brand.300",
        }}
        transition="all 0.3s ease"
        position="relative"
        overflow="hidden"
      >
        {/* Gradient top border */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="3px"
          bgGradient={`linear(to-r, ${getProductivityColor(user.productivity)}.400, ${getProductivityColor(user.productivity)}.600)`}
        />

        <Flex justify="space-between" align="flex-start" mb={4}>
          <HStack spacing={3}>
            <Avatar 
              name={user.name} 
              size="md"
              bg={`${getProductivityColor(user.productivity)}.500`}
              color="white"
            />
            <VStack align="flex-start" spacing={1}>
              <Text fontWeight="bold" fontSize="lg" lineHeight="shorter">
                {user.name}
              </Text>
              <Badge 
                colorScheme={status.color} 
                variant="subtle" 
                borderRadius="full"
                px={2}
                py={1}
                fontSize="xs"
              >
                {status.label}
              </Badge>
            </VStack>
          </HStack>

          <Tooltip label={`${user.productivity}% Productivity`} placement="top">
            <CircularProgress 
              value={user.productivity} 
              color={`${getProductivityColor(user.productivity)}.500`}
              size="60px"
              thickness="8px"
            >
              <CircularProgressLabel fontSize="sm" fontWeight="bold">
                {user.productivity}%
              </CircularProgressLabel>
            </CircularProgress>
          </Tooltip>
        </Flex>

        {/* Progress Bar */}
        <VStack spacing={2} align="stretch">
          <HStack justify="space-between">
            <Text fontSize="sm" color={textColor} fontWeight="medium">
              Weekly Progress
            </Text>
            <Text fontSize="sm" color={`${getProductivityColor(user.productivity)}.500`} fontWeight="bold">
              {user.productivity}%
            </Text>
          </HStack>
          <Progress 
            value={user.productivity} 
            size="md" 
            colorScheme={getProductivityColor(user.productivity)}
            borderRadius="full"
            bg={useColorModeValue("gray.100", "gray.700")}
          />
        </VStack>

        {/* Additional metrics */}
        <HStack spacing={4} mt={4} pt={4} borderTop="1px solid" borderColor={borderColor}>          <Tooltip label="Hours Today">
            <HStack spacing={1}>
              <Icon as={FaClock} w={4} h={4} color={textColor} />
              <Text fontSize="sm" color={textColor}>7.5h</Text>
            </HStack>
          </Tooltip>
          
          <Tooltip label="This Week Trend">
            <HStack spacing={1}>
              <Icon as={FaArrowUp} w={4} h={4} color="green.500" />
              <Text fontSize="sm" color="green.500">+5%</Text>
            </HStack>
          </Tooltip>

          <Tooltip label="Achievements">
            <HStack spacing={1}>
              <Icon as={FaTrophy} w={4} h={4} color="yellow.500" />
              <Text fontSize="sm" color={textColor}>3</Text>
            </HStack>
          </Tooltip>
        </HStack>
      </Box>
    </MotionBox>
  );
}