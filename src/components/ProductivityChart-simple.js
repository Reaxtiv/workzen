import React from 'react';
import {
  Box,
  Text,
  VStack,
  Badge,
  useColorModeValue
} from '@chakra-ui/react';

export default function ProductivityChart({ 
  data = [], 
  title = "Productivity Chart", 
  height = 400
}) {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      p={6}
      bg={bg}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      shadow="sm"
      height={height}
    >
      <VStack spacing={4} align="stretch">
        <Text fontSize="lg" fontWeight="bold" color="gray.700">
          {title}
        </Text>
        <Text color="gray.500" fontSize="sm">
          Productivity chart temporarily simplified - data available
        </Text>
        {data && data.length > 0 && (
          <VStack spacing={2} align="stretch">
            {data.slice(0, 3).map((item, index) => (
              <Box key={index} p={3} bg="gray.50" borderRadius="md">
                <Text fontSize="sm" fontWeight="medium">
                  Day {index + 1}: 
                  <Badge ml={2} colorScheme="green">
                    {typeof item === 'object' ? JSON.stringify(item) : item}
                  </Badge>
                </Text>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
