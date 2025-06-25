import { 
  Box, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  StatArrow,
  Icon,
  Flex,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";

const MotionBox = motion(Box);

export default function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = "increase", 
  icon: IconComponent,
  color = "brand",
  description,
  ...props 
}) {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const iconBg = useColorModeValue(`${color}.50`, `${color}.900`);
  const iconColor = useColorModeValue(`${color}.500`, `${color}.300`);
  const getTrendIcon = () => {
    switch(changeType) {
      case "increase": return FaArrowUp;
      case "decrease": return FaArrowDown;
      default: return FaMinus;
    }
  };

  const getTrendColor = () => {
    switch(changeType) {
      case "increase": return "success.500";
      case "decrease": return "error.500";
      default: return "gray.500";
    }
  };

  return (
    <MotionBox
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <Box
        bg={bg}
        p={6}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        _hover={{
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          borderColor: `${color}.300`,
        }}
        transition="all 0.2s"
        position="relative"
        overflow="hidden"
        {...props}
      >
        {/* Gradient overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="3px"
          bgGradient={`linear(to-r, ${color}.400, ${color}.600)`}
        />
        
        <Flex justify="space-between" align="flex-start" mb={4}>
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.500" mb={1}>
              {title}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color={`${color}.600`}>
              {value}
            </Text>
          </Box>
          
          {IconComponent && (
            <Flex
              w={12}
              h={12}
              bg={iconBg}
              borderRadius="lg"
              align="center"
              justify="center"
            >
              <Icon as={IconComponent} w={6} h={6} color={iconColor} />
            </Flex>
          )}
        </Flex>

        {(change || description) && (
          <Flex justify="space-between" align="center">
            {change && (
              <Flex align="center" gap={1}>
                <Icon as={getTrendIcon()} w={4} h={4} color={getTrendColor()} />
                <Text fontSize="sm" color={getTrendColor()} fontWeight="medium">
                  {change}
                </Text>
              </Flex>
            )}
            
            {description && (
              <Text fontSize="xs" color="gray.500">
                {description}
              </Text>
            )}
          </Flex>
        )}
      </Box>
    </MotionBox>
  );
}
