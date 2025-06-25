import { Box, useColorModeValue, Text, VStack, HStack, Circle } from "@chakra-ui/react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from "recharts";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const MotionBox = motion(Box);

export default function CustomPieChart({ data, title, size = "md" }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "white");
  
  // Validar datos
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Box
        bg={bg}
        p={6}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="lg"
        w="100%"
        h="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text color={textColor} fontSize="sm">
          No data available
        </Text>
      </Box>
    );
  }
  
  const COLORS = [
    '#4299E1', // Blue
    '#48BB78', // Green  
    '#ED8936', // Orange
    '#9F7AEA', // Purple
    '#F56565', // Red
    '#38B2AC', // Teal
    '#EC407A', // Pink
    '#66BB6A', // Light Green
    '#42A5F5', // Light Blue
    '#FF7043'  // Deep Orange
  ];  const sizeConfig = {
    sm: { 
      height: 320, 
      outerRadius: 80, 
      innerRadius: 0,
      margin: { top: 10, right: 10, bottom: 10, left: 10 }
    },
    md: { 
      height: 380, 
      outerRadius: 95, 
      innerRadius: 0,
      margin: { top: 15, right: 15, bottom: 15, left: 15 }
    },
    lg: { 
      height: 440, 
      outerRadius: 115, 
      innerRadius: 0,
      margin: { top: 20, right: 20, bottom: 20, left: 20 }
    }
  };
  
  const currentSize = sizeConfig[size];    // Custom tooltip
  const CustomTooltip = ({ active, payload, data: chartData }) => {
    if (active && payload && payload.length) {
      const currentData = payload[0];
      const total = data.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((currentData.value / total) * 100).toFixed(1);
      
      return (
        <Box
          bg={bg}
          p={3}
          borderRadius="lg"
          boxShadow="lg"
          border="1px solid"
          borderColor={borderColor}
        >
          <Text fontWeight="semibold" fontSize="sm" color={textColor}>
            {currentData.name}
          </Text>
          <Text fontSize="sm" color={currentData.color}>
            Value: {currentData.value}
          </Text>
          <Text fontSize="xs" color={textColor}>
            {percentage}% of total
          </Text>
        </Box>
      );
    }
    return null;
  };  // Custom legend
  const CustomLegend = ({ payload }) => {
    if (!payload || !Array.isArray(payload)) return null;
    
    return (
      <Box mt={4} px={2}>
        <VStack spacing={2} align="stretch">
          {payload.map((entry, index) => (
            <HStack key={`legend-${index}`} spacing={3} justify="space-between">
              <HStack spacing={2}>
                <Circle size="10px" bg={entry.color} />
                <Text fontSize="xs" color={textColor} fontWeight="medium">
                  {entry.value}
                </Text>
              </HStack>
              <Text fontSize="xs" color={textColor} fontWeight="bold">
                {data[index]?.value || 0}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    );
  };
  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >      <Box
        bg={bg}
        p={6}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="lg"
        w="100%"
        h="100%"
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >        {title && (
          <Text
            fontSize="md"
            fontWeight="semibold"
            mb={3}
            textAlign="center"
            color={textColor}
          >
            {title}
          </Text>
        )}
          <Box 
          flex="1"
          height={`${currentSize.height}px`} 
          display="flex" 
          flexDirection="column" 
          alignItems="center"
          justifyContent="center"
          position="relative"        >
          {isClient && data && data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart 
                margin={currentSize.margin}
              >
                <Pie
                  data={data}
                  cx="50%"
                  cy="40%"
                  outerRadius={currentSize.outerRadius}
                  innerRadius={currentSize.innerRadius}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                  stroke="none"
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  content={<CustomLegend />}
                  verticalAlign="bottom"
                  height={50}
                  wrapperStyle={{ paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <Box 
              display="flex" 
              alignItems="center" 
              justifyContent="center" 
              height="100%"
              color={textColor}
            >
              <Text fontSize="sm">
                {!isClient ? "Loading chart..." : "No data to display"}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </MotionBox>
  );
}
