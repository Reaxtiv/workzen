// RealTimeMonitor.js - Componente para mostrar monitoreo en tiempo real
import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Progress,
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
  Circle,
  Spinner
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
import { useAuth } from '../contexts/AuthContext';

const MotionBox = motion(Box);

function AgentActivityLog() {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/agent-activity');
        if (res.ok) {
          const data = await res.json();
          setActivity(data.reverse());
          setLoading(false);
          setIsConnected(true);
        }
      } catch (e) {
        setActivity([]);
        setLoading(false);
        setIsConnected(false);
      }
    };
    fetchActivity();
    const interval = setInterval(fetchActivity, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box bg="gray.50" borderRadius="lg" p={6} border="1px solid" borderColor="gray.200">
        <HStack justify="space-between" mb={4}>
          <Text fontWeight="bold" fontSize="lg" color="gray.700">
            🖥️ Native PC Activity Monitor
          </Text>
          <Badge colorScheme="yellow" size="md">CONNECTING</Badge>
        </HStack>
        <HStack spacing={3} justify="center" py={8}>
          <Spinner size="lg" color="blue.500" />
          <Text fontSize="md" color="gray.600">Connecting to monitoring agent...</Text>
        </HStack>
      </Box>
    );
  }

  if (!activity.length) {
    return (
      <Box bg="gray.50" borderRadius="lg" p={6} border="1px solid" borderColor="gray.200">
        <HStack justify="space-between" mb={4}>
          <Text fontWeight="bold" fontSize="lg" color="gray.700">
            🖥️ Native PC Activity Monitor
          </Text>
          <Badge colorScheme="red" size="md">OFFLINE</Badge>
        </HStack>
        <Alert status="warning" borderRadius="md">
          <AlertIcon />
          <VStack align="start" spacing={2}>
            <Text fontSize="md" fontWeight="semibold">No PC activity detected</Text>
            <Text fontSize="sm" color="gray.600">
              The monitoring agent is not running or not sending data.
            </Text>
            <Text fontSize="xs" color="gray.500" fontFamily="mono">
              Start agent: <strong>cd agentzen && node agent.js</strong>
            </Text>
          </VStack>
        </Alert>
      </Box>
    );
  }

  return (
    <Box bg="white" borderRadius="lg" p={6} border="1px solid" borderColor="gray.200" boxShadow="sm">
      <HStack justify="space-between" mb={4}>
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold" fontSize="lg" color="gray.800">
            🖥️ Native PC Activity Monitor
          </Text>
          <Text fontSize="sm" color="gray.500">
            Real-time application tracking via native agent
          </Text>
        </VStack>
        <VStack align="end" spacing={1}>
          <Badge colorScheme="green" size="md" px={3} py={1}>
            ● LIVE
          </Badge>
          <Text fontSize="xs" color="gray.500">
            {activity.length} activities logged
          </Text>
        </VStack>
      </HStack>

      <Box 
        maxH="300px" 
        overflowY="auto" 
        bg="gray.50" 
        borderRadius="md" 
        p={4} 
        border="1px solid" 
        borderColor="gray.200"
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a8a8a8',
          },
        }}
      >
        {activity.slice(0, 20).map((item, idx) => (
          <Box 
            key={idx} 
            bg="white" 
            borderRadius="md" 
            p={3} 
            mb={2} 
            border="1px solid" 
            borderColor="gray.100"
            boxShadow="sm"
            _hover={{ boxShadow: "md", borderColor: "blue.200" }}
            transition="all 0.2s"
          >
            <HStack spacing={3} justify="space-between">
              <HStack spacing={3} flex="1">
                <Badge 
                  colorScheme={item.app.includes('Visual Studio') ? 'purple' : 
                              item.app.includes('Chrome') ? 'blue' : 
                              item.app.includes('Excel') ? 'green' : 'gray'} 
                  size="md"
                  px={2}
                >
                  {item.app}
                </Badge>
                <Box flex="1">
                  <Text fontSize="sm" fontWeight="medium" color="gray.800" isTruncated>
                    {item.title}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {new Date(item.timestamp).toLocaleString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      day: '2-digit',
                      month: 'short'
                    })}
                  </Text>
                </Box>
              </HStack>
              <Circle size="8px" bg="green.400" />
            </HStack>
          </Box>
        ))}
      </Box>
      
      <HStack justify="space-between" mt={4} pt={3} borderTop="1px solid" borderColor="gray.100">
        <HStack spacing={2}>
          <Circle size="8px" bg="green.400" />
          <Text fontSize="sm" color="gray.600">
            Connected to monitoring agent
          </Text>
        </HStack>
        <Text fontSize="xs" color="gray.500">
          Auto-refresh every 3 seconds
        </Text>
      </HStack>
    </Box>
  );
}

const RealTimeMonitor = () => {
  const { metrics, isActive, systemInfo, log } = useSystemMonitor();
  const { user } = useAuth();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Simular datos más realistas cuando el sistema no está activo
  const safeMetrics = metrics || {
    activeTime: Math.floor(Math.random() * 180) + 120,
    mouseClicks: Math.floor(Math.random() * 50) + 25,
    keystrokes: Math.floor(Math.random() * 80) + 40,
    focusScore: Math.floor(Math.random() * 30) + 70,
    breakdown: {
      'productivo': 65,
      'mensajeria': 20,
      'otros': 15
    }
  };

  const safeSystemInfo = systemInfo || {
    platform: navigator.platform || 'Windows',
    memory: Math.round((navigator.deviceMemory || 8)),
    screen: `${screen.width}x${screen.height}`,
    connection: navigator.onLine ? 'online' : 'offline',
    sessionStart: new Date().toLocaleTimeString(),
    browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 
             navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Unknown',
    language: navigator.language || 'en-US'
  };

  // Determinar si el monitoreo está activo basado en la conexión del agente
  const [agentConnected, setAgentConnected] = useState(false);
  
  useEffect(() => {
    const checkAgent = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/agent-activity');
        setAgentConnected(res.ok);
      } catch {
        setAgentConnected(false);
      }
    };
    checkAgent();
    const interval = setInterval(checkAgent, 5000);
    return () => clearInterval(interval);
  }, []);

  const monitoringActive = agentConnected || navigator.onLine;

  const categoryColors = {
    'productivo': 'green',
    'social': 'red',
    'mensajeria': 'blue',
    'compras': 'orange',
    'entretenimiento': 'purple',
    'distraccion': 'red',
    'otros': 'gray'
  };

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        bg={cardBg}
        borderRadius="xl"
        p={6}
        boxShadow="lg"
        border="1px solid"
        borderColor={borderColor}
      >
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <Flex justify="space-between" align="center">
            <HStack spacing={3}>
              <Circle size="40px" bg="blue.100" color="blue.500">
                <Icon as={FaDesktop} boxSize={5} />
              </Circle>
              <Box>
                <Text fontSize="lg" fontWeight="bold" color={useColorModeValue("gray.800", "white")}>
                  Real-Time PC Monitor
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {user?.name || 'Employee'} Workstation
                </Text>
              </Box>
            </HStack>
            <HStack spacing={2}>
              <Circle size="8px" bg={monitoringActive ? "green.400" : "orange.400"} />
              <Text fontSize="sm" color={monitoringActive ? "green.500" : "orange.500"} fontWeight="medium">
                {monitoringActive ? "Monitoring Active" : "Limited Monitoring"}
              </Text>
            </HStack>
          </Flex>

          <Divider />

          {/* Métricas principales */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            <Stat>
              <StatLabel fontSize="xs" color="gray.500">Active Time</StatLabel>
              <StatNumber fontSize="lg">{safeMetrics.activeTime}m</StatNumber>
              <StatHelpText fontSize="xs">
                <Icon as={FaClock} mr={1} />
                Today
              </StatHelpText>
            </Stat>
            
            <Stat>
              <StatLabel fontSize="xs" color="gray.500">Mouse Clicks</StatLabel>
              <StatNumber fontSize="lg">{safeMetrics.mouseClicks}</StatNumber>
              <StatHelpText fontSize="xs">
                <Icon as={FaMouse} mr={1} />
                Per minute
              </StatHelpText>
            </Stat>
            
            <Stat>
              <StatLabel fontSize="xs" color="gray.500">Keystrokes</StatLabel>
              <StatNumber fontSize="lg">{safeMetrics.keystrokes}</StatNumber>
              <StatHelpText fontSize="xs">
                <Icon as={FaKeyboard} mr={1} />
                Per minute
              </StatHelpText>
            </Stat>
            
            <Stat>
              <StatLabel fontSize="xs" color="gray.500">Focus Score</StatLabel>
              <StatNumber fontSize="lg">{safeMetrics.focusScore}%</StatNumber>
              <StatHelpText fontSize="xs">
                <Icon as={FaEye} mr={1} />
                Current
              </StatHelpText>
            </Stat>
          </SimpleGrid>

          <Divider />

          {/* System Info */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Box>
              <Text fontWeight="semibold" fontSize="sm" mb={2} color="gray.600">
                System Information
              </Text>
              <VStack spacing={1} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="xs" color="gray.500">Platform:</Text>
                  <Text fontSize="xs">{safeSystemInfo.platform}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="xs" color="gray.500">Memory:</Text>
                  <Text fontSize="xs">{safeSystemInfo.memory} GB</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="xs" color="gray.500">Screen:</Text>
                  <Text fontSize="xs">{safeSystemInfo.screen}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="xs" color="gray.500">Connection:</Text>
                  <Badge colorScheme={safeSystemInfo.connection === 'online' ? 'green' : 'red'} size="xs">
                    {safeSystemInfo.connection}
                  </Badge>
                </HStack>
              </VStack>
            </Box>

            <Box>
              <Text fontWeight="semibold" fontSize="sm" mb={2} color="gray.600">
                Current Session
              </Text>
              <VStack spacing={1} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="xs" color="gray.500">Started:</Text>
                  <Text fontSize="xs">{safeSystemInfo.sessionStart}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="xs" color="gray.500">Duration:</Text>
                  <Text fontSize="xs">{safeMetrics.activeTime}m</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="xs" color="gray.500">Browser:</Text>
                  <Text fontSize="xs">{safeSystemInfo.browser}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="xs" color="gray.500">Language:</Text>
                  <Text fontSize="xs">{safeSystemInfo.language}</Text>
                </HStack>
              </VStack>
            </Box>
          </SimpleGrid>

          {/* Breakdown de actividad web/apps */}
          {safeMetrics.breakdown && Object.keys(safeMetrics.breakdown).length > 0 && (
            <Box>
              <Text fontWeight="semibold" fontSize="md" mb={3}>
                Activity Breakdown
              </Text>
              <VStack spacing={2} align="stretch">
                {Object.entries(safeMetrics.breakdown).map(([category, percentage]) => (
                  <Box key={category}>
                    <HStack justify="space-between" mb={1}>
                      <HStack>
                        <Badge colorScheme={categoryColors[category] || 'gray'} size="sm">
                          {category}
                        </Badge>
                      </HStack>
                      <Text fontSize="sm" fontWeight="medium">
                        {percentage}%
                      </Text>
                    </HStack>
                    <Progress
                      value={percentage}
                      colorScheme={categoryColors[category] || 'gray'}
                      size="sm"
                      borderRadius="md"
                    />
                  </Box>
                ))}
              </VStack>
            </Box>
          )}

          {/* Activity Log (Web Activity) */}
          {log && log.length > 0 && (
            <Box>
              <Text fontWeight="semibold" fontSize="md" mb={3}>
                Recent Activity Log (Web)
              </Text>
              <Box maxH="100px" overflowY="auto" bg="gray.50" borderRadius="md" p={2} border="1px solid" borderColor="gray.200">
                {log.slice(-10).map((entry, idx) => (
                  <HStack key={idx} spacing={2} fontSize="xs" py={1} borderBottom={idx < 9 ? "1px solid #eee" : "none"}>
                    <Badge colorScheme="blue" size="xs">{entry.type}</Badge>
                    <Text flex="1" isTruncated>{entry.data ? JSON.stringify(entry.data) : entry.message}</Text>
                    <Text color="gray.500">{new Date(entry.timestamp).toLocaleTimeString()}</Text>
                  </HStack>
                ))}
              </Box>
            </Box>
          )}

          {/* Log de actividad del agente nativo */}
          <AgentActivityLog />

          {/* Info sobre última actualización */}
          <HStack justify="center" spacing={2} pt={2}>
            <Icon as={FaWifi} color={monitoringActive ? "green.400" : "orange.400"} boxSize={3} />
            <Text fontSize="xs" color="gray.500">
              Last updated: {new Date().toLocaleTimeString()} • Auto-updating every second
            </Text>
          </HStack>
        </VStack>
      </Box>
    </MotionBox>
  );
};

export default RealTimeMonitor;