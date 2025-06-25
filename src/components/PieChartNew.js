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
];

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
  }  const sizeConfig = {
    sm: { 
      height: 320, 
      outerRadius: 60, 
      innerRadius: 0
    },
    md: { 
      height: 380, 
      outerRadius: 75, 
      innerRadius: 0
    },
    lg: { 
      height: 420, 
      outerRadius: 90, 
      innerRadius: 0
    }
  };
  
  const currentSize = sizeConfig[size];  // Custom legend
  const CustomLegend = ({ payload }) => {
    if (!payload || !Array.isArray(payload)) return null;
    
    return (
      <Box mt={1} px={2}>
        <VStack spacing={0.5} align="stretch">
          {payload.map((entry, index) => (
            <HStack key={`legend-${index}`} spacing={2} justify="space-between" fontSize="xs">
              <HStack spacing={2} flex="1" minW="0">
                <Circle size="6px" bg={entry.color} flexShrink={0} />
                <Text color={textColor} fontWeight="medium" noOfLines={1} fontSize="xs">
                  {entry.value}
                </Text>
              </HStack>
              <Text color={textColor} fontWeight="bold" fontSize="xs" flexShrink={0}>
                {data[index]?.value || 0}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    );
  };

  if (!isClient) {
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
          Loading chart...
        </Text>
      </Box>
    );
  }

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      w="100%"
      h="100%"
    >
      <Box
        bg={bg}
        p={4}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="lg"
        w="100%"
        h="100%"
        display="flex"
        flexDirection="column"
      >
        {title && (
          <Text
            fontSize="md"
            fontWeight="semibold"
            mb={2}
            textAlign="center"
            color={textColor}
          >
            {title}
          </Text>
        )}        <Box 
          flex="1"
          display="flex" 
          flexDirection="column" 
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
        >
          <Box 
            width="100%" 
            height={`${currentSize.height - 120}px`}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={currentSize.outerRadius}
                  innerRadius={currentSize.innerRadius}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [value, name]}
                  labelStyle={{ color: textColor }}
                  contentStyle={{
                    backgroundColor: bg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          
          {/* Leyenda separada */}
          <Box width="100%" minHeight="100px" display="flex" alignItems="flex-start" justifyContent="center">
            <CustomLegend payload={data.map((item, index) => ({
              value: item.name,
              color: COLORS[index % COLORS.length]
            }))} />
          </Box>
        </Box>
      </Box>
    </MotionBox>
  );
}
