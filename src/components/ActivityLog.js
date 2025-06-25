import { 
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Icon,
  Flex,
  Avatar,
  useColorModeValue,
  Heading,
  Divider
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { 
  FaClock, 
  FaUser, 
  FaDesktop,
  FaChartLine,
  FaPlay,
  FaPause,
  FaFileAlt
} from "react-icons/fa";

const MotionBox = motion(Box);

export default function ActivityLog({ logs }) {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");

  if (!logs || logs.length === 0) {
    return (
      <Box
        bg={bg}
        p={8}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        textAlign="center"      >
        <Icon as={FaChartLine} w={12} h={12} color="gray.400" mb={4} />
        <Text color="gray.500">No activity records found.</Text>
      </Box>
    );
  }
  const getActivityIcon = (action) => {
    if (action.includes("logged in")) return FaPlay;
    if (action.includes("break")) return FaPause;
    if (action.includes("opened") || action.includes("started")) return FaDesktop;
    if (action.includes("submitted") || action.includes("updated")) return FaFileAlt;
    return FaChartLine;
  };

  const getActivityColor = (action) => {
    if (action.includes("logged in")) return "green";
    if (action.includes("break")) return "orange";
    if (action.includes("opened") || action.includes("started")) return "blue";
    if (action.includes("submitted") || action.includes("updated")) return "purple";
    return "gray";
  };

  const extractUserName = (action) => {
    const names = action.split(' ').slice(0, 2).join(' ');
    return names;
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      mt={8}
    >      <Box
        bg={bg}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        overflow="hidden"
      >        {/* Header */}
        <Box p={6} borderBottom="1px solid" borderColor={borderColor}>
          <Flex justify="space-between" align="center">
            <VStack align="flex-start" spacing={1}>
              <Heading size="md">Recent Activity</Heading>
              <Text color={textColor} fontSize="sm">
                Real-time team activity feed
              </Text>
            </VStack>
            <Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="full">
              Live
            </Badge>
          </Flex>
        </Box>

        {/* Activity Feed */}
        <VStack spacing={0} align="stretch" maxH="500px" overflowY="auto">
          {logs.map((log, idx) => {
            const IconComponent = getActivityIcon(log.action);
            const colorScheme = getActivityColor(log.action);
            const userName = extractUserName(log.action);
            
            return (
              <MotionBox
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >                <Flex
                  p={4}
                  borderBottom={idx < logs.length - 1 ? "1px solid" : "none"}
                  borderColor={borderColor}
                  _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
                  transition="background-color 0.2s"
                  cursor="pointer"
                >                  {/* Timeline dot */}
                  <Box position="relative" mr={4}>
                    <Flex
                      w={10}
                      h={10}
                      bg={`${colorScheme}.100`}
                      borderRadius="full"
                      align="center"
                      justify="center"
                      border="2px solid"
                      borderColor={`${colorScheme}.200`}
                    >
                      <Icon as={IconComponent} w={4} h={4} color={`${colorScheme}.500`} />
                    </Flex>
                    
                    {/* Timeline line */}
                    {idx < logs.length - 1 && (
                      <Box
                        position="absolute"
                        left="50%"
                        top="100%"
                        w="2px"
                        h="16px"
                        bg={borderColor}
                        transform="translateX(-50%)"
                      />
                    )}
                  </Box>

                  {/* Content */}
                  <Flex flex={1} justify="space-between" align="flex-start">                    <VStack align="flex-start" spacing={1} flex={1}>
                      <HStack spacing={2}>
                        <Text fontWeight="semibold" fontSize="sm">
                          {log.action}
                        </Text>
                      </HStack>
                      
                      <HStack spacing={4} fontSize="xs" color={textColor}>                        <HStack spacing={1}>
                          <Icon as={FaClock} w={3} h={3} />
                          <Text>{log.time}</Text>
                        </HStack>
                        
                        {log.app !== "-" && (
                          <HStack spacing={1}>
                            <Icon as={FaDesktop} w={3} h={3} />
                            <Text>{log.app}</Text>
                          </HStack>
                        )}
                      </HStack>
                    </VStack>

                    <Avatar
                      name={userName}
                      size="sm"
                      bg={`${colorScheme}.500`}
                      color="white"
                    />
                  </Flex>
                </Flex>
              </MotionBox>
            );
          })}
        </VStack>        {/* Footer */}
        <Box p={4} borderTop="1px solid" borderColor={borderColor} textAlign="center">
          <Text fontSize="sm" color={textColor}>
            Showing last {logs.length} activities • 
            <Text as="span" color="brand.500" ml={1} cursor="pointer" _hover={{ textDecoration: "underline" }}>
              View all
            </Text>
          </Text>
        </Box>
      </Box>
    </MotionBox>
  );
}