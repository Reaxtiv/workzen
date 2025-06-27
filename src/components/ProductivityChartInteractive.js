import { Box, useColorModeValue, Text, VStack, HStack, Badge, Stat, StatLabel, StatNumber, StatHelpText, Flex, Button, ButtonGroup } from "@chakra-ui/react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
  ComposedChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExpand, FaCompress, FaPlay, FaPause, FaChartLine, FaChartArea, FaChartBar } from "react-icons/fa";

const MotionBox = motion(Box);

export default function ProductivityChartInteractive({ data, title = "Interactive Productivity Chart", variant = "area", showStats = true, height = 350 }) {
  const [isClient, setIsClient] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [chartType, setChartType] = useState(variant);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const bg = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const gridColor = useColorModeValue("#e2e8f0", "#4a5568");
  const textColor = useColorModeValue("#2d3748", "#e2e8f0");
  const primaryColor = useColorModeValue("#4299E1", "#63b3ed");
  const secondaryColor = useColorModeValue("#48bb78", "#68d391");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  
  // Calculate statistics
  const totalHours = data?.reduce((sum, item) => sum + (item.productiveHours || 0), 0) || 0;
  const avgHours = data?.length ? (totalHours / data.length).toFixed(1) : 0;
  const maxHours = Math.max(...(data?.map(item => item.productiveHours || 0) || [0]));
  const minHours = Math.min(...(data?.map(item => item.productiveHours || 0) || [0]));
  const target = 7; // Target hours per day
  const targetPercentage = totalHours > 0 ? ((avgHours / target) * 100).toFixed(0) : 0;

  // Enhanced Custom Tooltip with more interactivity
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const isAboveTarget = value >= target;
      
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
          borderColor={isAboveTarget ? "green.200" : "orange.200"}
          minW="220px"
          position="relative"
        >
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between" align="center">
              <Text fontSize="md" fontWeight="bold" color={textColor}>
                📅 {label}
              </Text>
              <Badge 
                colorScheme={isAboveTarget ? "green" : "orange"} 
                variant="solid"
                borderRadius="full"
                px={3}
                py={1}
              >
                {value}h
              </Badge>
            </HStack>
            
            <VStack spacing={2} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500">Target:</Text>
                <Text fontSize="sm" fontWeight="semibold">{target}h</Text>
              </HStack>
              
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500">Difference:</Text>
                <Text 
                  fontSize="sm" 
                  fontWeight="bold"
                  color={isAboveTarget ? "green.500" : "orange.500"}
                >
                  {isAboveTarget ? "+" : ""}{(value - target).toFixed(1)}h
                </Text>
              </HStack>
              
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500">Performance:</Text>
                <Text 
                  fontSize="sm" 
                  fontWeight="bold"
                  color={isAboveTarget ? "green.500" : "orange.500"}
                >
                  {((value / target) * 100).toFixed(0)}%
                </Text>
              </HStack>
            </VStack>

            <Box w="100%" h="6px" bg={cardBg} borderRadius="full" overflow="hidden">
              <MotionBox 
                w={`${Math.min((value / 10) * 100, 100)}%`} 
                h="100%" 
                bg={isAboveTarget ? "green.400" : "orange.400"}
                borderRadius="full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((value / 10) * 100, 100)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </Box>
            
            <Text fontSize="xs" color="gray.400" textAlign="center">
              {isAboveTarget ? "🎯 Above target!" : "📈 Room for improvement"}
            </Text>
          </VStack>
        </MotionBox>
      );
    }
    return null;
  };

  // Enhanced Custom Dot Component with hover effects
  const CustomDot = (props) => {
    const { cx, cy, payload, index } = props;
    const isAboveTarget = payload.productiveHours >= target;
    const isHovered = hoveredIndex === index;
    const isSelected = selectedDay === index;
    
    return (
      <g>
        <AnimatePresence>
          {(isHovered || isSelected) && (
            <motion.circle
              cx={cx}
              cy={cy}
              r={12}
              fill={isAboveTarget ? "#68D391" : "#FBD38D"}
              fillOpacity={0.3}
              initial={{ r: 0, opacity: 0 }}
              animate={{ r: 12, opacity: 0.3 }}
              exit={{ r: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
        <circle
          cx={cx}
          cy={cy}
          r={isHovered || isSelected ? 6 : 4}
          fill={isAboveTarget ? "#48BB78" : "#ED8936"}
          stroke="white"
          strokeWidth={2}
          style={{
            cursor: "pointer",
            transition: "all 0.2s ease",
            filter: isHovered || isSelected ? "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" : "none"
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => setSelectedDay(selectedDay === index ? null : index)}
        />
      </g>
    );
  };

  // Interactive Chart Controls
  const ChartControls = () => (
    <HStack spacing={3} mb={4} wrap="wrap">
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          colorScheme={chartType === "area" ? "blue" : "gray"}
          onClick={() => setChartType("area")}
          leftIcon={<FaChartArea />}
          _hover={{ transform: "translateY(-1px)" }}
        >
          Area
        </Button>
        <Button
          colorScheme={chartType === "line" ? "blue" : "gray"}
          onClick={() => setChartType("line")}
          leftIcon={<FaChartLine />}
          _hover={{ transform: "translateY(-1px)" }}
        >
          Line
        </Button>
        <Button
          colorScheme={chartType === "bar" ? "blue" : "gray"}
          onClick={() => setChartType("bar")}
          leftIcon={<FaChartBar />}
          _hover={{ transform: "translateY(-1px)" }}
        >
          Bar
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
        {isAnimating ? "Pause" : "Animate"}
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

  // Render different chart types
  const renderChart = () => {
    const commonProps = {
      data: data || [],
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
    };

    switch (chartType) {
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis 
              dataKey="day" 
              tick={{ fill: textColor, fontSize: 12 }}
              axisLine={{ stroke: gridColor }}
            />
            <YAxis 
              tick={{ fill: textColor, fontSize: 12 }}
              axisLine={{ stroke: gridColor }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={target} stroke="#48bb78" strokeDasharray="5 5" />
            <Line 
              type="monotone" 
              dataKey="productiveHours" 
              stroke={primaryColor}
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{ r: 8, stroke: primaryColor, strokeWidth: 2, fill: "#fff" }}
              animationBegin={isAnimating ? 0 : undefined}
              animationDuration={isAnimating ? 2000 : 0}
            />
          </LineChart>
        );
      
      case "bar":
        return (
          <ComposedChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis 
              dataKey="day" 
              tick={{ fill: textColor, fontSize: 12 }}
              axisLine={{ stroke: gridColor }}
            />
            <YAxis 
              tick={{ fill: textColor, fontSize: 12 }}
              axisLine={{ stroke: gridColor }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={target} stroke="#48bb78" strokeDasharray="5 5" />
            <Bar 
              dataKey="productiveHours" 
              fill={primaryColor}
              radius={[6, 6, 0, 0]}
              animationBegin={isAnimating ? 0 : undefined}
              animationDuration={isAnimating ? 2000 : 0}
            />
          </ComposedChart>
        );
      
      default: // area
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorProductivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis 
              dataKey="day" 
              tick={{ fill: textColor, fontSize: 12 }}
              axisLine={{ stroke: gridColor }}
            />
            <YAxis 
              tick={{ fill: textColor, fontSize: 12 }}
              axisLine={{ stroke: gridColor }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={target} stroke="#48bb78" strokeDasharray="5 5" />
            <Area 
              type="monotone" 
              dataKey="productiveHours" 
              stroke={primaryColor}
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorProductivity)"
              dot={<CustomDot />}
              activeDot={{ r: 8, stroke: primaryColor, strokeWidth: 2, fill: "#fff" }}
              animationBegin={isAnimating ? 0 : undefined}
              animationDuration={isAnimating ? 2000 : 0}
            />
          </AreaChart>
        );
    }
  };

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
            <Heading size="lg" color={textColor}>
              {title}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Interactive productivity visualization
            </Text>
          </VStack>
          
          <ChartControls />
        </Flex>

        {/* Stats Row */}
        {showStats && (
          <HStack spacing={6} wrap="wrap" justify="center">
            <Stat textAlign="center">
              <StatLabel fontSize="xs" color="gray.500">Average</StatLabel>
              <StatNumber fontSize="2xl" color={primaryColor}>{avgHours}h</StatNumber>
              <StatHelpText fontSize="xs">
                {targetPercentage >= 100 ? (
                  <>
                    <Badge colorScheme="green" variant="subtle">+{targetPercentage - 100}% vs target</Badge>
                  </>
                ) : (
                  <>
                    <Badge colorScheme="orange" variant="subtle">{targetPercentage - 100}% vs target</Badge>
                  </>
                )}
              </StatHelpText>
            </Stat>
            
            <Stat textAlign="center">
              <StatLabel fontSize="xs" color="gray.500">Peak</StatLabel>
              <StatNumber fontSize="2xl" color={secondaryColor}>{maxHours}h</StatNumber>
              <StatHelpText fontSize="xs">
                <Badge colorScheme="green" variant="subtle">Best day</Badge>
              </StatHelpText>
            </Stat>
            
            <Stat textAlign="center">
              <StatLabel fontSize="xs" color="gray.500">Total</StatLabel>
              <StatNumber fontSize="2xl" color={textColor}>{totalHours}h</StatNumber>
              <StatHelpText fontSize="xs">
                <Badge colorScheme="blue" variant="subtle">This period</Badge>
              </StatHelpText>
            </Stat>
          </HStack>
        )}

        {/* Chart Container */}
        <Box 
          h={isFullscreen ? "calc(100vh - 200px)" : `${height}px`} 
          w="100%"
          position="relative"
        >
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </Box>

        {/* Selected Day Info */}
        <AnimatePresence>
          {selectedDay !== null && data && data[selectedDay] && (
            <MotionBox
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              bg={cardBg}
              p={4}
              borderRadius="lg"
              border="1px solid"
              borderColor={borderColor}
            >
              <VStack align="stretch" spacing={2}>
                <Text fontSize="md" fontWeight="bold" color={textColor}>
                  📊 {data[selectedDay].day} Details
                </Text>
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.500">Productive Hours:</Text>
                  <Badge colorScheme="blue" variant="solid">
                    {data[selectedDay].productiveHours}h
                  </Badge>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.500">vs Target ({target}h):</Text>
                  <Badge 
                    colorScheme={data[selectedDay].productiveHours >= target ? "green" : "orange"}
                    variant="solid"
                  >
                    {data[selectedDay].productiveHours >= target ? "+" : ""}{(data[selectedDay].productiveHours - target).toFixed(1)}h
                  </Badge>
                </HStack>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedDay(null)}
                  colorScheme="gray"
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
