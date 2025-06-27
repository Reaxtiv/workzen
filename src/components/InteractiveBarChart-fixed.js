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
  Select,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
  Progress
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  LabelList
} from 'recharts';
import { FiBarChart, FiTarget, FiTrendingUp, FiUsers } from 'react-icons/fi';

const MotionBox = motion(Box);

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
  const [isClient, setIsClient] = useState(false);
  const [selectedBar, setSelectedBar] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [showValues, setShowValues] = useState(true);

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sample data if none provided
  const defaultData = [
    { name: "Engineering", value: 92, target: 85, change: 5.2, employees: 12 },
    { name: "Design", value: 88, target: 80, change: 3.1, employees: 5 },
    { name: "Marketing", value: 85, target: 75, change: -1.4, employees: 4 },
    { name: "Sales", value: 91, target: 90, change: 8.7, employees: 3 },
    { name: "Support", value: 95, target: 90, change: 2.8, employees: 2 },
    { name: "HR", value: 78, target: 70, change: 4.2, employees: 2 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  // Sort data based on selected order
  const sortedData = [...chartData].sort((a, b) => {
    if (sortOrder === 'asc') return a[dataKey] - b[dataKey];
    if (sortOrder === 'desc') return b[dataKey] - a[dataKey];
    return 0;
  });

  const maxValue = Math.max(...chartData.map(item => item[dataKey]));
  const avgValue = chartData.reduce((sum, item) => sum + item[dataKey], 0) / chartData.length;

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
          maxW="220px"
        >
          <Text fontSize="sm" fontWeight="bold" color={textColor} mb={3}>
            {label}
          </Text>
          <VStack spacing={2} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="xs" color={textColor} opacity={0.7}>Value:</Text>
              <Badge colorScheme="blue" variant="solid" borderRadius="full">
                {data[dataKey]}%
              </Badge>
            </HStack>
            {data.target && (
              <HStack justify="space-between">
                <Text fontSize="xs" color={textColor} opacity={0.7}>Target:</Text>
                <Text fontSize="xs" color={textColor}>{data.target}%</Text>
              </HStack>
            )}
            {data.employees && (
              <HStack justify="space-between">
                <Text fontSize="xs" color={textColor} opacity={0.7}>Team Size:</Text>
                <HStack spacing={1}>
                  <FiUsers size={10} />
                  <Text fontSize="xs" color={textColor}>{data.employees}</Text>
                </HStack>
              </HStack>
            )}
            {data.change !== undefined && (
              <HStack justify="space-between">
                <Text fontSize="xs" color={textColor} opacity={0.7}>Change:</Text>
                <HStack spacing={1}>
                  <FiTrendingUp 
                    size={10} 
                    color={data.change >= 0 ? "green" : "red"} 
                  />
                  <Text 
                    fontSize="xs" 
                    color={data.change >= 0 ? "green.500" : "red.500"}
                  >
                    {data.change > 0 ? '+' : ''}{data.change}%
                  </Text>
                </HStack>
              </HStack>
            )}
          </VStack>
        </Box>
      );
    }
    return null;
  };

  const onBarClick = (data, index) => {
    setSelectedBar(selectedBar === index ? null : index);
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

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        p={6}
        bg={bg}
        borderRadius="xl"
        border="1px"
        borderColor={borderColor}
        shadow="lg"
      >
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="center">
            <HStack spacing={3}>
              <FiBarChart size={24} color={accentColor} />
              <Text fontSize="lg" fontWeight="bold" color={textColor}>
                {title}
              </Text>
            </HStack>
            
            <HStack spacing={3}>
              <ButtonGroup size="sm" isAttached variant="outline">
                <Button
                  onClick={() => setSortOrder('desc')}
                  isActive={sortOrder === 'desc'}
                  colorScheme={sortOrder === 'desc' ? 'blue' : 'gray'}
                >
                  High to Low
                </Button>
                <Button
                  onClick={() => setSortOrder('asc')}
                  isActive={sortOrder === 'asc'}
                  colorScheme={sortOrder === 'asc' ? 'blue' : 'gray'}
                >
                  Low to High
                </Button>
                <Button
                  onClick={() => setSortOrder('name')}
                  isActive={sortOrder === 'name'}
                  colorScheme={sortOrder === 'name' ? 'blue' : 'gray'}
                >
                  Name
                </Button>
              </ButtonGroup>
            </HStack>
          </HStack>

          {/* Stats */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Stat>
              <StatLabel fontSize="xs" color={textColor} opacity={0.7}>
                Highest Performer
              </StatLabel>
              <StatNumber fontSize="lg" color={accentColor}>
                {Math.max(...chartData.map(item => item[dataKey]))}%
              </StatNumber>
              <StatHelpText fontSize="xs">
                {chartData.find(item => item[dataKey] === maxValue)?.[nameKey]}
              </StatHelpText>
            </Stat>

            <Stat>
              <StatLabel fontSize="xs" color={textColor} opacity={0.7}>
                Average Performance
              </StatLabel>
              <StatNumber fontSize="lg" color="green.500">
                {Math.round(avgValue)}%
              </StatNumber>
              <StatHelpText fontSize="xs">
                <Progress value={avgValue} size="xs" colorScheme="green" />
              </StatHelpText>
            </Stat>

            <Stat>
              <StatLabel fontSize="xs" color={textColor} opacity={0.7}>
                Total Team Members
              </StatLabel>
              <StatNumber fontSize="lg" color="purple.500">
                {chartData.reduce((sum, item) => sum + (item.employees || 0), 0)}
              </StatNumber>
              <StatHelpText fontSize="xs">
                Across {chartData.length} departments
              </StatHelpText>
            </Stat>
          </SimpleGrid>

          {/* Chart */}
          <Box height={`${height - 280}px`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey={nameKey}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {showTarget && target > 0 && (
                  <ReferenceLine 
                    y={target} 
                    stroke="#E53E3E" 
                    strokeDasharray="4 4"
                    label={{ value: `Target: ${target}%`, position: "right" }}
                  />
                )}
                
                <Bar 
                  dataKey={dataKey}
                  onClick={onBarClick}
                  cursor="pointer"
                >
                  {sortedData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        selectedBar === index 
                          ? colors[0] 
                          : entry.color || colors[index % colors.length]
                      }
                      style={{
                        filter: selectedBar === index ? 'brightness(1.2)' : 'none',
                      }}
                    />
                  ))}
                  {showValues && <LabelList dataKey={dataKey} position="top" fontSize={12} />}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>

          {/* Selected Item Details */}
          {selectedBar !== null && (
            <MotionBox
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box p={4} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
                <Text fontSize="sm" fontWeight="semibold" color="blue.700" mb={2}>
                  {sortedData[selectedBar][nameKey]} Details
                </Text>
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
                  <VStack spacing={1}>
                    <Text fontSize="xs" color="gray.600">Performance</Text>
                    <Badge colorScheme="blue" size="lg">
                      {sortedData[selectedBar][dataKey]}%
                    </Badge>
                  </VStack>
                  {sortedData[selectedBar].target && (
                    <VStack spacing={1}>
                      <Text fontSize="xs" color="gray.600">Target</Text>
                      <Text fontSize="sm" fontWeight="semibold">
                        {sortedData[selectedBar].target}%
                      </Text>
                    </VStack>
                  )}
                  {sortedData[selectedBar].employees && (
                    <VStack spacing={1}>
                      <Text fontSize="xs" color="gray.600">Team Size</Text>
                      <HStack>
                        <FiUsers size={14} />
                        <Text fontSize="sm" fontWeight="semibold">
                          {sortedData[selectedBar].employees}
                        </Text>
                      </HStack>
                    </VStack>
                  )}
                  {sortedData[selectedBar].change !== undefined && (
                    <VStack spacing={1}>
                      <Text fontSize="xs" color="gray.600">Change</Text>
                      <HStack>
                        <FiTrendingUp 
                          size={14} 
                          color={sortedData[selectedBar].change >= 0 ? "green" : "red"} 
                        />
                        <Text 
                          fontSize="sm" 
                          fontWeight="semibold"
                          color={sortedData[selectedBar].change >= 0 ? "green.500" : "red.500"}
                        >
                          {sortedData[selectedBar].change > 0 ? '+' : ''}{sortedData[selectedBar].change}%
                        </Text>
                      </HStack>
                    </VStack>
                  )}
                </SimpleGrid>
              </Box>
            </MotionBox>
          )}
        </VStack>
      </Box>
    </MotionBox>
  );
}
