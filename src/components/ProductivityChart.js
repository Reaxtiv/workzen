import { Box, useColorModeValue, Text, VStack, HStack, Badge, Stat, StatLabel, StatNumber, StatHelpText, Flex } from "@chakra-ui/react";
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
  Legend
} from "recharts";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function ProductivityChart({ data, title = "Productivity Chart", variant = "area", showStats = true, height = 350 }) {
  const [isClient, setIsClient] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
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

  // Enhanced Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const isAboveTarget = value >= target;
      
      return (
        <MotionBox
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          bg={bg}
          p={4}
          borderRadius="xl"
          boxShadow="0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          border="1px solid"
          borderColor={borderColor}
          minW="200px"
        >
          <VStack align="stretch" spacing={2}>
            <Text fontSize="sm" fontWeight="bold" color={textColor}>
              {label}
            </Text>
            <HStack justify="space-between">
              <Text fontSize="sm" color={textColor}>Productive Hours:</Text>
              <Badge colorScheme={isAboveTarget ? "green" : "orange"} variant="subtle">
                {value}h
              </Badge>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="xs" color={textColor}>vs Target:</Text>
              <Text fontSize="xs" color={isAboveTarget ? "green.500" : "orange.500"}>
                {isAboveTarget ? "+" : ""}{(value - target).toFixed(1)}h
              </Text>
            </HStack>
            <Box w="100%" h="4px" bg={cardBg} borderRadius="full" overflow="hidden">
              <Box 
                w={`${Math.min((value / 10) * 100, 100)}%`} 
                h="100%" 
                bg={isAboveTarget ? "green.400" : "orange.400"}
                borderRadius="full"
                transition="all 0.3s ease"
              />
            </Box>
          </VStack>
        </MotionBox>
      );
    }
    return null;
  };

  // Custom Dot Component
  const CustomDot = (props) => {
    const { cx, cy, payload, index } = props;
    const isAboveTarget = payload.productiveHours >= target;
    const isHovered = hoveredIndex === index;
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={isHovered ? 8 : 6}
        fill={isAboveTarget ? secondaryColor : primaryColor}
        stroke={bg}
        strokeWidth={2}
        style={{
          filter: isHovered ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' : 'none',
          transition: 'all 0.2s ease'
        }}
      />
    );
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
      onMouseMove: (state) => {
        if (state && state.activeTooltipIndex !== undefined) {
          setHoveredIndex(state.activeTooltipIndex);
        }
      },
      onMouseLeave: () => setHoveredIndex(null)
    };

    if (variant === "composed") {
      return (
        <ComposedChart {...commonProps}>
          <defs>
            <linearGradient id="colorProductivityPro" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8}/>
              <stop offset="50%" stopColor={primaryColor} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={primaryColor} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="2 4" 
            stroke={gridColor}
            strokeOpacity={0.6}
            vertical={false}
          />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: textColor, fontSize: 11, fontWeight: 500 }}
            tickMargin={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: textColor, fontSize: 11 }}
            domain={[0, 'dataMax + 1']}
            tickCount={6}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine 
            y={target} 
            stroke={secondaryColor} 
            strokeDasharray="4 4" 
            strokeWidth={2}
            strokeOpacity={0.8}
            label={{ 
              value: `Target (${target}h)`, 
              position: "topRight", 
              fill: secondaryColor,
              fontSize: 11,
              fontWeight: 600
            }}
          />
          <Area
            type="monotone"
            dataKey="productiveHours"
            stroke={primaryColor}
            strokeWidth={3}
            fill="url(#colorProductivityPro)"
            dot={<CustomDot />}
            activeDot={{ r: 10, fill: primaryColor, stroke: bg, strokeWidth: 3 }}
          />
          <Line
            type="monotone"
            dataKey="productiveHours"
            stroke={primaryColor}
            strokeWidth={3}
            dot={false}
            activeDot={false}
          />
        </ComposedChart>
      );
    }

    return (
      <AreaChart {...commonProps}>
        <defs>
          <linearGradient id="colorProductivityAdvanced" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8}/>
            <stop offset="30%" stopColor={primaryColor} stopOpacity={0.6}/>
            <stop offset="70%" stopColor={primaryColor} stopOpacity={0.3}/>
            <stop offset="95%" stopColor={primaryColor} stopOpacity={0.05}/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <CartesianGrid 
          strokeDasharray="2 4" 
          stroke={gridColor}
          strokeOpacity={0.6}
          vertical={false}
        />
        <XAxis 
          dataKey="date" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: textColor, fontSize: 11, fontWeight: 500 }}
          tickMargin={12}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: textColor, fontSize: 11 }}
          domain={[0, 'dataMax + 1']}
          tickCount={6}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine 
          y={target} 
          stroke={secondaryColor} 
          strokeDasharray="4 4" 
          strokeWidth={2}
          strokeOpacity={0.8}
          label={{ 
            value: `Target (${target}h)`, 
            position: "topRight", 
            fill: secondaryColor,
            fontSize: 11,
            fontWeight: 600
          }}
        />
        <Area
          type="monotone"
          dataKey="productiveHours"
          stroke={primaryColor}
          strokeWidth={4}
          fill="url(#colorProductivityAdvanced)"
          dot={<CustomDot />}
          activeDot={{ 
            r: 10, 
            fill: primaryColor, 
            stroke: bg, 
            strokeWidth: 3,
            filter: "url(#glow)"
          }}
          style={{ filter: "url(#glow)" }}
        />
      </AreaChart>
    );
  };  if (!isClient || !data || data.length === 0) {
    return (
      <Box 
        height={`${height}px`}
        w="100%"
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        bg={cardBg}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
      >
        <VStack spacing={2}>
          <Box
            w="40px"
            h="40px"
            border="3px solid"
            borderColor={primaryColor}
            borderTopColor="transparent"
            borderRadius="50%"
            animation="spin 1s linear infinite"
          />
          <Text color={textColor} fontSize="sm">
            {!isClient ? "Loading chart..." : "No data available"}
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      w="100%"
    >
      <VStack spacing={4} align="stretch">
        {/* Chart Header */}
        <Flex justify="space-between" align="center">
          <VStack align="flex-start" spacing={1}>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              {title}
            </Text>
            <HStack spacing={4}>
              <Badge colorScheme="blue" variant="subtle" px={2} py={1}>
                {data.length} days tracked
              </Badge>
              <Badge 
                colorScheme={targetPercentage >= 100 ? "green" : targetPercentage >= 80 ? "orange" : "red"} 
                variant="subtle" 
                px={2} 
                py={1}
              >
                {targetPercentage}% of target
              </Badge>
            </HStack>
          </VStack>
          
          {showStats && (
            <HStack spacing={6}>
              <Stat size="sm" textAlign="center">
                <StatLabel fontSize="xs">Average</StatLabel>
                <StatNumber fontSize="lg" color={primaryColor}>{avgHours}h</StatNumber>
                <StatHelpText fontSize="xs" margin={0}>per day</StatHelpText>
              </Stat>
              <Stat size="sm" textAlign="center">
                <StatLabel fontSize="xs">Best Day</StatLabel>
                <StatNumber fontSize="lg" color={secondaryColor}>{maxHours}h</StatNumber>
                <StatHelpText fontSize="xs" margin={0}>peak performance</StatHelpText>
              </Stat>
            </HStack>
          )}
        </Flex>

        {/* Main Chart */}
        <Box 
          height={`${height}px`} 
          w="100%"
          bg={bg}
          borderRadius="xl"
          border="1px solid"
          borderColor={borderColor}
          p={4}
          position="relative"
          overflow="hidden"
        >
          {/* Background Pattern */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            opacity={0.02}
            bgImage="radial-gradient(circle, currentColor 1px, transparent 1px)"
            bgSize="20px 20px"
            pointerEvents="none"
          />
          
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </Box>

        {/* Bottom Stats */}
        {showStats && (
          <HStack spacing={4} justify="space-around" p={4} bg={cardBg} borderRadius="xl">
            <VStack spacing={1}>
              <Text fontSize="xs" color={textColor} opacity={0.7}>Total Hours</Text>
              <Text fontSize="lg" fontWeight="bold" color={primaryColor}>{totalHours.toFixed(1)}h</Text>
            </VStack>
            <VStack spacing={1}>
              <Text fontSize="xs" color={textColor} opacity={0.7}>Target Hours</Text>
              <Text fontSize="lg" fontWeight="bold" color={secondaryColor}>{(target * data.length).toFixed(1)}h</Text>
            </VStack>
            <VStack spacing={1}>
              <Text fontSize="xs" color={textColor} opacity={0.7}>Efficiency</Text>
              <Text fontSize="lg" fontWeight="bold" color={targetPercentage >= 100 ? secondaryColor : primaryColor}>
                {targetPercentage}%
              </Text>
            </VStack>
            <VStack spacing={1}>
              <Text fontSize="xs" color={textColor} opacity={0.7}>Trend</Text>
              <Text fontSize="lg" fontWeight="bold" color={data[data.length-1]?.productiveHours > data[0]?.productiveHours ? secondaryColor : "orange.500"}>
                {data[data.length-1]?.productiveHours > data[0]?.productiveHours ? "↗" : "↘"}
              </Text>
            </VStack>
          </HStack>
        )}
      </VStack>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </MotionBox>
  );
}