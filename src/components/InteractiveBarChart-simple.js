import React from 'react';
import {
  Box,
  Text,
  VStack,
  Badge,
  useColorModeValue
} from '@chakra-ui/react';

export default function InteractiveBarChart({ 
  data = [], 
  title = "Interactive Bar Chart", 
  dataKey = "value", 
  nameKey = "name",
  colors = ['#4299E1', '#48BB78', '#ED8936', '#9F7AEA', '#F56565', '#38B2AC'],
  height = 400,
  showTarget = false,
  target = 0
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
          Chart temporarily simplified - data available
        </Text>
        {data && data.length > 0 && (
          <VStack spacing={2} align="stretch">
            {data.slice(0, 3).map((item, index) => (
              <Box key={index} p={3} bg="gray.50" borderRadius="md">
                <Text fontSize="sm" fontWeight="medium">
                  {item[nameKey]}: 
                  <Badge ml={2} colorScheme="blue">
                    {item[dataKey]}
                  </Badge>
                </Text>
              </Box>
            ))}
            {data.length > 3 && (
              <Text fontSize="xs" color="gray.400">
                ...and {data.length - 3} more items
              </Text>
            )}
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
