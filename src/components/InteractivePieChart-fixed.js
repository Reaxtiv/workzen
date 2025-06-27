import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Button,
  ButtonGroup,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  Flex
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { FiPieChart, FiUsers, FiTrendingUp } from 'react-icons/fi';

const MotionBox = motion(Box);

export default function InteractivePieChart({ 
  data = [], 
  title = "Interactive Pie Chart", 
  dataKey = "value", 
  nameKey = "name",
  colors = ['#4299E1', '#48BB78', '#ED8936', '#9F7AEA', '#F56565', '#38B2AC'],
  height = 400
}) {
  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState(null);

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sample data if none provided
  const chartData = data.length > 0 ? data : [
    { 
      name: "Development", 
      value: 45, 
      color: "#3182CE", 
      details: "Frontend & Backend Teams",
      employees: 12,
      productivity: 92
    },
    { 
      name: "Design", 
      value: 20, 
      color: "#38A169", 
      details: "UI/UX & Graphics",
      employees: 5,
      productivity: 88
    },
    { 
      name: "Marketing", 
      value: 15, 
      color: "#E53E3E", 
      details: "Digital & Content Marketing",
      employees: 4,
      productivity: 85
    },
    { 
      name: "Sales", 
      value: 12, 
      color: "#D69E2E", 
      details: "B2B & B2C Sales",
      employees: 3,
      productivity: 91
    },
    { 
      name: "Support", 
      value: 8, 
      color: "#805AD5", 
      details: "Customer Success",
      employees: 2,
      productivity: 95
    },
  ];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const onPieClick = (data, index) => {
    setSelectedSegment(selectedSegment === index ? null : index);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          bg={bg}
          p={4}
          borderRadius="md"
          border="1px"
          borderColor={borderColor}
          shadow="lg"
          maxW="200px"
        >
          <Text fontSize="sm" fontWeight="bold" color={textColor} mb={2}>
            {data.name}
          </Text>
          <VStack spacing={1} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="xs" color={textColor} opacity={0.7}>Value:</Text>
              <Badge colorScheme="blue">{data.value}%</Badge>
            </HStack>
            {data.employees && (
              <HStack justify="space-between">
                <Text fontSize="xs" color={textColor} opacity={0.7}>Employees:</Text>
                <Text fontSize="xs" color={textColor}>{data.employees}</Text>
              </HStack>
            )}
            {data.productivity && (
              <HStack justify="space-between">
                <Text fontSize="xs" color={textColor} opacity={0.7}>Productivity:</Text>
                <Text fontSize="xs" color="green.500">{data.productivity}%</Text>
              </HStack>
            )}
            {data.details && (
              <Text fontSize="xs" color={textColor} opacity={0.6} mt={1}>
                {data.details}
              </Text>
            )}
          </VStack>
        </Box>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Don't show labels for very small segments
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (!isClient) {
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
        <VStack spacing={4} justify="center" height="100%">
          <Text color={textColor}>Loading chart...</Text>
        </VStack>
      </Box>
    );
  }

  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        p={6}
        bg={bg}
        borderRadius="xl"
        border="1px"
        borderColor={borderColor}
        shadow="lg"
        height={height}
      >
        <VStack spacing={6} height="100%">
          {/* Header */}
          <HStack justify="space-between" align="center" w="100%">
            <HStack spacing={3}>
              <FiPieChart size={24} color={accentColor} />
              <Text fontSize="lg" fontWeight="bold" color={textColor}>
                {title}
              </Text>
            </HStack>
            
            <Badge colorScheme="blue" variant="subtle" px={3} py={1}>
              Total: {totalValue}%
            </Badge>
          </HStack>

          <Flex direction={{ base: "column", md: "row" }} w="100%" flex={1}>
            {/* Chart */}
            <Box flex={1} minH="250px">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey={dataKey}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    onClick={onPieClick}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color || colors[index % colors.length]}
                        stroke={activeIndex === index ? "#000" : "none"}
                        strokeWidth={activeIndex === index ? 2 : 0}
                        style={{
                          filter: activeIndex === index ? 'brightness(1.1)' : 'none',
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            {/* Legend & Details */}
            <VStack spacing={3} align="stretch" minW={{ base: "100%", md: "200px" }} mt={{ base: 4, md: 0 }}>
              <Text fontSize="sm" fontWeight="semibold" color={textColor} opacity={0.8}>
                Department Breakdown
              </Text>
              
              {chartData.map((item, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Box
                    p={3}
                    bg={selectedSegment === index ? "blue.50" : "gray.50"}
                    borderRadius="md"
                    border="1px"
                    borderColor={selectedSegment === index ? "blue.200" : "transparent"}
                    cursor="pointer"
                    onClick={() => onPieClick(item, index)}
                    _hover={{ bg: "blue.50", borderColor: "blue.200" }}
                  >
                    <HStack spacing={3} mb={2}>
                      <Box
                        w={4}
                        h={4}
                        bg={item.color || colors[index % colors.length]}
                        borderRadius="sm"
                      />
                      <VStack align="start" spacing={0} flex={1}>
                        <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                          {item[nameKey]}
                        </Text>
                        <Text fontSize="xs" color={textColor} opacity={0.6}>
                          {item.details}
                        </Text>
                      </VStack>
                      <Badge colorScheme="blue" size="sm">
                        {item[dataKey]}%
                      </Badge>
                    </HStack>
                    
                    {item.employees && (
                      <HStack justify="space-between" fontSize="xs" color={textColor} opacity={0.7}>
                        <HStack spacing={1}>
                          <FiUsers size={12} />
                          <Text>{item.employees} people</Text>
                        </HStack>
                        {item.productivity && (
                          <HStack spacing={1}>
                            <FiTrendingUp size={12} />
                            <Text>{item.productivity}%</Text>
                          </HStack>
                        )}
                      </HStack>
                    )}
                  </Box>
                </MotionBox>
              ))}
            </VStack>
          </Flex>
        </VStack>
      </Box>
    </MotionBox>
  );
}
