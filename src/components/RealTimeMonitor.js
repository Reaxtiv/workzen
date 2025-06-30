// RealTimeMonitor.js - Componente para mostrar monitoreo en tiempo real
import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Progress,
  Button,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Icon,
  Flex,
  Divider,
  Alert,
  AlertIcon,
  Circle
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaPlay,
  FaPause,
  FaDesktop,
  FaClock,
  FaChartLine,
  FaEye,
  FaWifi,
  FaMemory,
  FaMouse,
  FaKeyboard
} from 'react-icons/fa';
import { useSystemMonitor } from '../services/SystemMonitor';

const MotionBox = motion(Box);

export default function RealTimeMonitor() {
  const {
    stats,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    getImmediateStats
  } = useSystemMonitor();

  const [lastUpdate, setLastUpdate] = useState(Date.now());
  
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const greenColor = useColorModeValue("green.500", "green.300");
  const redColor = useColorModeValue("red.500", "red.300");

  // Formatear tiempo
  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  // Formatear bytes
  const formatBytes = (bytes) => {
    if (bytes === 'unknown') return 'Unknown';
    return `${bytes} GB`;
  };

  // Obtener color del score de productividad
  const getProductivityColor = (score) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'yellow';
    if (score >= 40) return 'orange';
    return 'red';
  };

  // Actualizar stats cada segundo cuando está monitoreando
  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        getImmediateStats();
        setLastUpdate(Date.now());
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isMonitoring, getImmediateStats]);

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        bg={cardBg}
        p={6}
        borderRadius="xl"
        border="1px"
        borderColor={borderColor}
        shadow="lg"
      >
        <VStack spacing={6} align="stretch">
          {/* Header con controles */}
          <Flex justify="space-between" align="center">
            <HStack spacing={3}>
              <Icon as={FaDesktop} boxSize={6} color="blue.500" />
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold">
                  Real-Time PC Monitor
                </Text>
                <HStack spacing={2}>
                  <Circle size="8px" bg={isMonitoring ? greenColor : redColor} />
                  <Text fontSize="sm" color="gray.500">
                    {isMonitoring ? 'Monitoring Active' : 'Monitoring Stopped'}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            
            <Button
              leftIcon={<Icon as={isMonitoring ? FaPause : FaPlay} />}
              colorScheme={isMonitoring ? "red" : "green"}
              onClick={isMonitoring ? stopMonitoring : startMonitoring}
              size="sm"
            >
              {isMonitoring ? 'Stop' : 'Start'} Monitor
            </Button>
          </Flex>

          <Divider />

          {/* Stats principales */}
          {stats && (
            <>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                {/* Tiempo de sesión */}
                <Stat>
                  <StatLabel fontSize="xs">
                    <HStack spacing={1}>
                      <Icon as={FaClock} boxSize={3} />
                      <Text>Session Time</Text>
                    </HStack>
                  </StatLabel>
                  <StatNumber fontSize="lg">
                    {formatTime(stats.summary.totalSessionTime)}
                  </StatNumber>
                  <StatHelpText fontSize="xs">
                    Started: {new Date(stats.summary.sessionStart).toLocaleTimeString()}
                  </StatHelpText>
                </Stat>

                {/* Score de productividad */}
                <Stat>
                  <StatLabel fontSize="xs">
                    <HStack spacing={1}>
                      <Icon as={FaChartLine} boxSize={3} />
                      <Text>Productivity</Text>
                    </HStack>
                  </StatLabel>
                  <StatNumber fontSize="lg">
                    <Badge 
                      colorScheme={getProductivityColor(stats.summary.productivityScore)}
                      fontSize="lg"
                      px={2}
                      py={1}
                      borderRadius="md"
                    >
                      {stats.summary.productivityScore}%
                    </Badge>
                  </StatNumber>
                  <StatHelpText fontSize="xs">
                    <Progress 
                      value={stats.summary.productivityScore} 
                      colorScheme={getProductivityColor(stats.summary.productivityScore)}
                      size="sm"
                    />
                  </StatHelpText>
                </Stat>

                {/* Estado actual */}
                <Stat>
                  <StatLabel fontSize="xs">
                    <HStack spacing={1}>
                      <Icon as={FaEye} boxSize={3} />
                      <Text>Current Status</Text>
                    </HStack>
                  </StatLabel>
                  <StatNumber fontSize="lg">
                    <Badge 
                      colorScheme={stats.activity.isActive ? "green" : "orange"}
                      fontSize="md"
                    >
                      {stats.activity.isActive ? 'Active' : 'Idle'}
                    </Badge>
                  </StatNumber>
                  <StatHelpText fontSize="xs">
                    Idle: {formatTime(stats.activity.idleTime)}
                  </StatHelpText>
                </Stat>

                {/* Conexión */}
                <Stat>
                  <StatLabel fontSize="xs">
                    <HStack spacing={1}>
                      <Icon as={FaWifi} boxSize={3} />
                      <Text>Connection</Text>
                    </HStack>
                  </StatLabel>
                  <StatNumber fontSize="lg">
                    <Badge colorScheme={stats.system.onLine ? "green" : "red"}>
                      {stats.system.onLine ? 'Online' : 'Offline'}
                    </Badge>
                  </StatNumber>
                  <StatHelpText fontSize="xs">
                    {stats.system.connection !== 'unknown' 
                      ? `${stats.system.connection.effectiveType}`
                      : 'Standard'
                    }
                  </StatHelpText>
                </Stat>
              </SimpleGrid>

              <Divider />

              {/* Información del sistema */}
              <VStack spacing={4} align="stretch">
                <Text fontSize="md" fontWeight="semibold">System Information</Text>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>Hardware</Text>
                    <VStack spacing={2} align="start">
                      <HStack justify="space-between" w="100%">
                        <HStack spacing={2}>
                          <Icon as={FaMemory} boxSize={3} color="purple.500" />
                          <Text fontSize="xs">Memory:</Text>
                        </HStack>
                        <Text fontSize="xs">{formatBytes(stats.system.memory)}</Text>
                      </HStack>
                      <HStack justify="space-between" w="100%">
                        <Text fontSize="xs">CPU Cores:</Text>
                        <Text fontSize="xs">{stats.system.hardwareConcurrency}</Text>
                      </HStack>
                      <HStack justify="space-between" w="100%">
                        <Text fontSize="xs">Screen:</Text>
                        <Text fontSize="xs">{stats.system.screenWidth}x{stats.system.screenHeight}</Text>
                      </HStack>
                    </VStack>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>Platform</Text>
                    <VStack spacing={2} align="start">
                      <HStack justify="space-between" w="100%">
                        <Text fontSize="xs">OS:</Text>
                        <Text fontSize="xs">{stats.system.platform}</Text>
                      </HStack>
                      <HStack justify="space-between" w="100%">
                        <Text fontSize="xs">Language:</Text>
                        <Text fontSize="xs">{stats.system.language}</Text>
                      </HStack>
                      <HStack justify="space-between" w="100%">
                        <Text fontSize="xs">Window:</Text>
                        <Text fontSize="xs">{stats.system.windowWidth}x{stats.system.windowHeight}</Text>
                      </HStack>
                    </VStack>
                  </Box>
                </SimpleGrid>
              </VStack>

              {/* Actividad reciente */}
              {stats.log && stats.log.length > 0 && (
                <>
                  <Divider />
                  <VStack spacing={3} align="stretch">
                    <Text fontSize="md" fontWeight="semibold">Recent Activity</Text>
                    <Box maxH="150px" overflowY="auto">
                      <VStack spacing={2} align="stretch">
                        {stats.log.slice(-10).reverse().map((activity, index) => (
                          <HStack key={index} justify="space-between" fontSize="xs">
                            <HStack spacing={2}>
                              <Icon 
                                as={activity.type === 'user_active' ? FaMouse : FaKeyboard} 
                                boxSize={3} 
                                color={activity.type === 'user_active' ? 'green.500' : 'blue.500'}
                              />
                              <Text>
                                {activity.type === 'user_active' ? 'User Activity' : 
                                 activity.type === 'idle_detected' ? 'Idle Detected' :
                                 activity.type === 'monitoring_started' ? 'Monitoring Started' :
                                 'Monitoring Stopped'}
                              </Text>
                            </HStack>
                            <Text color="gray.500">
                              {new Date(activity.timestamp).toLocaleTimeString()}
                            </Text>
                          </HStack>
                        ))}
                      </VStack>
                    </Box>
                  </VStack>
                </>
              )}

              {/* Info sobre última actualización */}
              <Alert status="info" size="sm">
                <AlertIcon boxSize={3} />
                <Text fontSize="xs">
                  Last updated: {new Date(lastUpdate).toLocaleTimeString()} 
                  {isMonitoring && ' • Auto-updating every second'}
                </Text>
              </Alert>
            </>
          )}

          {/* Estado inicial */}
          {!stats && (
            <Alert status="warning">
              <AlertIcon />
              <Text>Click "Start Monitor" to begin real-time PC monitoring</Text>
            </Alert>
          )}
        </VStack>
      </Box>
    </MotionBox>
  );
}
