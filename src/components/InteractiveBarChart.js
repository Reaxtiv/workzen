import { Box, useColorModeValue, Text, VStack, HStack, Badge, Flex, Button, ButtonGroup, Grid, GridItem, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  LabelList
} from "recharts";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartBar, FaExpand, FaCompress, FaPlay, FaPause, FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

const MotionBox = motion(Box);

export default function InteractiveBarChart({ 
  data, 
  title = "Interactive Bar Chart", 
  dataKey = "value",
  nameKey = "name",
  colors = ["#4299E1", "#48BB78", "#ED8936", "#9F7AEA", "#F56565", "#38B2AC"],
  height = 400,
  showTarget = false,
  target = 0
}) {
  const [isClient, setIsClient] = useState(false);
  const [selectedBar, setSelectedBar] = useState(null);
  const [sortOrder, setSortOrder] = useState("none");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const bg = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("#2d3748", "#e2e8f0");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const gridColor = useColorModeValue("#e2e8f0", "#4a5568");

  // Process and sort data
  const processedData = () => {
    let sortedData = [...(data || [])];
    
    switch (sortOrder) {
      case "asc":
        sortedData.sort((a, b) => a[dataKey] - b[dataKey]);
        break;
      case "desc":
        sortedData.sort((a, b) => b[dataKey] - a[dataKey]);
        break;
      default:
        // Keep original order
        break;
    }
    
    return sortedData.map((item, index) => ({
      ...item,
      originalIndex: index,
      color: colors[index % colors.length]
    }));
  };

  const chartData = processedData();
  const total = chartData.reduce((sum, item) => sum + item[dataKey], 0);
  const average = chartData.length > 0 ? total / chartData.length : 0;
  const maximum = Math.max(...chartData.map(item => item[dataKey]));

  // Enhanced Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const value = payload[0].value;
      const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
      
      return (
        <MotionBox
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          bg={bg}
          p={4}
          borderRadius="xl"
          boxShadow="0 20px 40px -12px rgba(0, 0, 0, 0.25)"
          border="2px solid"
          borderColor={data.color}
          minW="220px"
        >
          <VStack align="stretch" spacing={3}>
            <HStack align="center" spacing={3}>
              <Box
                w={4}
                h={4}
                borderRadius="sm"
                bg={data.color}
              />
              <Text fontSize="md" fontWeight="bold" color={textColor}>
                {label}
              </Text>
            </HStack>
            
            <VStack spacing={2} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500">Value:</Text>
                <Badge colorScheme="blue" variant="solid" borderRadius="full">
                  {value}
                </Badge>
              </HStack>
              
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500">Percentage:</Text>
                <Badge colorScheme="green" variant="solid" borderRadius="full">
                  {percentage}%
                </Badge>
              </HStack>
              
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500">vs Average:</Text>
                <Text 
                  fontSize="sm" 
                  fontWeight="bold"
                  color={value >= average ? "green.500" : "orange.500"}
                >
                  {value >= average ? "+" : ""}{(value - average).toFixed(1)}
                </Text>
              </HStack>

              {showTarget && (
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.500">vs Target:</Text>
                  <Text 
                    fontSize="sm" 
                    fontWeight="bold"
                    color={value >= target ? "green.500" : "red.500"}
                  >
                    {value >= target ? "+" : ""}{(value - target).toFixed(1)}
                  </Text>
                </HStack>
              )}
            </VStack>

            <Box w="100%" h="4px" bg={cardBg} borderRadius="full" overflow="hidden">
              <MotionBox 
                w={`${(value / maximum) * 100}%`} 
                h="100%" 
                bg={data.color}
                borderRadius="full"
                initial={{ width: 0 }}
                animate={{ width: `${(value / maximum) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </Box>
          </VStack>
        </MotionBox>
      );
    }
    return null;
  };

  // Custom Bar Component
  const CustomBar = (props) => {
    const { payload, x, y, width, height, index } = props;
    const isSelected = selectedBar === index;
    const barColor = payload.color;
    
    return (
      <g>
        <motion.rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={barColor}
          stroke={isSelected ? "#fff" : "none"}
          strokeWidth={isSelected ? 3 : 0}
          style={{ cursor: "pointer" }}
          whileHover={{ 
            fill: `${barColor}dd`,
            y: y - 2,
            height: height + 2
          }}
          onClick={() => setSelectedBar(selectedBar === index ? null : index)}
          initial={isAnimating ? { height: 0, y: y + height } : { height, y }}
          animate={isAnimating ? { height, y } : {}}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        />
        {isSelected && (
          <motion.text
            x={x + width / 2}
            y={y - 10}
            textAnchor="middle"
            fill={textColor}
            fontSize="12"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {payload[dataKey]}
          </motion.text>
        )}
      </g>
    );
  };

  // Chart Controls
  const ChartControls = () => (
    <HStack spacing={3} mb={4} wrap="wrap">
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          colorScheme={sortOrder === "none" ? "blue" : "gray"}
          onClick={() => setSortOrder("none")}
          _hover={{ transform: "translateY(-1px)" }}
        >
          Original
        </Button>
        <Button
          colorScheme={sortOrder === "asc" ? "blue" : "gray"}
          onClick={() => setSortOrder("asc")}
          leftIcon={<FaSortAmountUp />}
          _hover={{ transform: "translateY(-1px)" }}
        >
          Low to High
        </Button>
        <Button
          colorScheme={sortOrder === "desc" ? "blue" : "gray"}
          onClick={() => setSortOrder("desc")}
          leftIcon={<FaSortAmountDown />}
          _hover={{ transform: "translateY(-1px)" }}
        >
          High to Low
        </Button>
      </ButtonGroup>

      <Button
        size="sm"
        variant="ghost"
        leftIcon={isAnimating ? <FaPause /> : <FaPlay />}
        onClick={() => setIsAnimating(!isAnimating)}
        _hover={{ transform: "translateY(-1px)" }}
        colorScheme={isAnimating ? "orange" : "green"}
      >
        {isAnimating ? "Reset" : "Animate"}
      </Button>

      <Button
        size="sm"
        variant="ghost"
        leftIcon={isFullscreen ? <FaCompress /> : <FaExpand />}
        onClick={() => setIsFullscreen(!isFullscreen)}
        _hover={{ transform: "translateY(-1px)" }}
        colorScheme="blue"
      >
        {isFullscreen ? "Exit" : "Expand"}
      </Button>
    </HStack>
  );

  if (!isClient) {
    return (
      <Box bg={bg} p={6} borderRadius="xl" border="1px solid" borderColor={borderColor}>
        <Text>Loading chart...</Text>
      </Box>
    );
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      bg={bg}
      p={6}
      borderRadius="xl"
      boxShadow="lg"
      border="1px solid"
      borderColor={borderColor}
      position="relative"
      w={isFullscreen ? "100vw" : "100%"}
      h={isFullscreen ? "100vh" : "auto"}
      zIndex={isFullscreen ? 9999 : "auto"}
      pos={isFullscreen ? "fixed" : "relative"}
      top={isFullscreen ? 0 : "auto"}
      left={isFullscreen ? 0 : "auto"}
    >
      <VStack align="stretch" spacing={4}>
        {/* Header with Controls */}
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <VStack align="flex-start" spacing={1}>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              {title}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Interactive bar visualization • Total: {total}
            </Text>
          </VStack>
          
          <ChartControls />
        </Flex>

        {/* Stats Row */}
        <HStack spacing={6} wrap="wrap" justify="center">
          <Stat textAlign="center">
            <StatLabel fontSize="xs" color="gray.500">Total</StatLabel>
            <StatNumber fontSize="xl" color="blue.500">{total}</StatNumber>
          </Stat>
          
          <Stat textAlign="center">
            <StatLabel fontSize="xs" color="gray.500">Average</StatLabel>
            <StatNumber fontSize="xl" color="green.500">{average.toFixed(1)}</StatNumber>
          </Stat>
          
          <Stat textAlign="center">
            <StatLabel fontSize="xs" color="gray.500">Maximum</StatLabel>
            <StatNumber fontSize="xl" color="purple.500">{maximum}</StatNumber>
          </Stat>
          
          <Stat textAlign="center">
            <StatLabel fontSize="xs" color="gray.500">Items</StatLabel>
            <StatNumber fontSize="xl" color={textColor}>{chartData.length}</StatNumber>
          </Stat>
        </HStack>

        {/* Chart Container */}
        <Box 
          h={isFullscreen ? "calc(100vh - 250px)" : `${height}px`} 
          w="100%"
          position="relative"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey={nameKey}
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
              />
              <Tooltip content={<CustomTooltip />} />
              {showTarget && (
                <ReferenceLine 
                  y={target} 
                  stroke="#48bb78" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />
              )}
              <Bar 
                dataKey={dataKey}
                radius={[4, 4, 0, 0]}
                shape={<CustomBar />}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                  />
                ))}
                <LabelList 
                  dataKey={dataKey} 
                  position="top" 
                  fill={textColor}
                  fontSize={12}
                  fontWeight="bold"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Selected Bar Details */}
        <AnimatePresence>
          {selectedBar !== null && chartData[selectedBar] && (
            <MotionBox
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              bg={cardBg}
              p={4}
              borderRadius="lg"
              border="2px solid"
              borderColor={chartData[selectedBar].color}
            >
              <VStack align="stretch" spacing={3}>
                <HStack align="center" spacing={3}>
                  <Box
                    w={5}
                    h={5}
                    borderRadius="sm"
                    bg={chartData[selectedBar].color}
                  />
                  <Text fontSize="lg" fontWeight="bold" color={textColor}>
                    {chartData[selectedBar][nameKey]} Details
                  </Text>
                </HStack>
                
                <Grid templateColumns="repeat(auto-fit, minmax(120px, 1fr))" gap={4}>
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color={chartData[selectedBar].color}>
                      {chartData[selectedBar][dataKey]}
                    </Text>
                    <Text fontSize="sm" color="gray.500">Value</Text>
                  </VStack>
                  
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color={chartData[selectedBar].color}>
                      {((chartData[selectedBar][dataKey] / total) * 100).toFixed(1)}%
                    </Text>
                    <Text fontSize="sm" color="gray.500">of Total</Text>
                  </VStack>
                  
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                      #{selectedBar + 1}
                    </Text>
                    <Text fontSize="sm" color="gray.500">Position</Text>
                  </VStack>
                  
                  <VStack>
                    <Text 
                      fontSize="2xl" 
                      fontWeight="bold" 
                      color={chartData[selectedBar][dataKey] >= average ? "green.500" : "orange.500"}
                    >
                      {chartData[selectedBar][dataKey] >= average ? "↗" : "↘"}
                    </Text>
                    <Text fontSize="sm" color="gray.500">vs Avg</Text>
                  </VStack>
                </Grid>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedBar(null)}
                  colorScheme="gray"
                  alignSelf="flex-end"
                >
                  Close Details
                </Button>
              </VStack>
            </MotionBox>
          )}
        </AnimatePresence>
      </VStack>
    </MotionBox>
  );
}
