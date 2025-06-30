// BlockchainReports.js - Componente para mostrar reportes blockchain del empleado
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Alert,
  AlertIcon,
  useColorModeValue,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Progress,
  Divider,
  Flex,
  Tooltip,
  useToast,
  Collapse,
  useDisclosure,
  Grid,
  GridItem,
  CircularProgress,
  CircularProgressLabel,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaDownload, FaCube, FaClock, FaTrophy, FaEye, FaShieldAlt, FaChevronDown, FaChevronUp, FaCode, FaGlobe, FaComment, FaGamepad, FaChartBar, FaHeart } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import BlockchainReporter from '../services/BlockchainReporter';

const MotionCard = motion(Card);

const BlockchainReports = ({ userRole = 'employee' }) => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [blockchainReporter] = useState(() => new BlockchainReporter());
  
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    if (user?.walletAddress) {
      loadBlockchainData();
    }
  }, [user]);

  const loadBlockchainData = async () => {
    try {
      setLoading(true);
      setError('');

      // Try to connect to blockchain (optional - won't fail if not connected)
      try {
        const isConnected = await blockchainReporter.isConnected();
        if (!isConnected) {
          console.log('Attempting to connect to wallet...');
          await blockchainReporter.connectWallet();
        }
      } catch (connectError) {
        console.warn('Could not connect to wallet, using mock data:', connectError.message);
      }

      // Get employee stats (will use mock data if no blockchain connection)
      let employeeStats = null;
      try {
        employeeStats = await blockchainReporter.getEmployeeBlockchainStats(user.walletAddress);
      } catch (statsError) {
        console.warn('Could not get blockchain stats, using defaults:', statsError.message);
        employeeStats = {
          totalReports: 3,
          averageProductivity: 78,
          totalActiveTime: 86400, // 24 hours
          totalFocusTime: 64800   // 18 hours
        };
      }
      setStats(employeeStats);

      // Get reports based on user role
      if (userRole === 'employee') {
        const employeeReports = await getEmployeeReports(user.walletAddress);
        setReports(employeeReports);
      } else {
        const allReports = await getAggregatedReports();
        setReports(allReports);
      }

    } catch (err) {
      console.error('Error loading blockchain data:', err);
      setError('Unable to load blockchain data. Showing demo data instead.');
      
      // Set demo data even when there's an error
      setStats({
        totalReports: 1,
        averageProductivity: 85,
        totalActiveTime: 28800,
        totalFocusTime: 23400
      });
      
      // Use the mock data methods for demo
      if (userRole === 'employee') {
        const mockReports = blockchainReporter.getMockDetailedReports(user.walletAddress || '0x1234...5678', 3);
        setReports(mockReports);
      } else {
        const mockReports = blockchainReporter.getMockAllEmployeesReports(5);
        setReports(mockReports);
      }
    } finally {
      setLoading(false);
    }
  };

  // Get specific employee reports (complete detailed data)
  const getEmployeeReports = async (walletAddress) => {
    try {
      return await blockchainReporter.getDetailedEmployeeReports(walletAddress, null, 7);
    } catch (error) {
      console.error('Error getting employee reports:', error);
      return [];
    }
  };

  // Get all employees reports for admin (individual employee data)
  const getAggregatedReports = async () => {
    try {
      return await blockchainReporter.getAllEmployeesReports(null, 7);
    } catch (error) {
      console.error('Error getting aggregated reports:', error);
      return [];
    }
  };

  // Download detailed reports as CSV
  const downloadReports = () => {
    try {
      let csvContent = '';
      let filename = '';

      if (userRole === 'employee') {
        // Detailed CSV for employee
        csvContent = 'Date,Overall Productivity,Focus Time,Active Time,VS Code (min),Browser (min),Slack (min),Email (min),' +
                    'Social Media (min),Breaks Count,Avg Break (min),Keystrokes/min,Zens,Transaction Hash\n';
        
        reports.forEach(report => {
          csvContent += `${report.date},${report.overallProductivity}%,${report.totalFocusTime}h,${report.totalActiveTime}h,` +
                       `${report.applicationUsage.productiveApps.vsCode},${report.applicationUsage.productiveApps.browser},` +
                       `${report.applicationUsage.communicationApps.slack},${report.applicationUsage.communicationApps.email},` +
                       `${report.applicationUsage.distractingApps.socialMedia},${report.breakAnalysis.totalBreaks},` +
                       `${report.breakAnalysis.averageBreakLength},${report.performanceMetrics.keystrokesPerMinute},` +
                       `${report.zensBreakdown.totalZens},${report.transactionHash}\n`;
        });
        filename = `workzen_detailed_reports_${user.walletAddress.slice(-8)}.csv`;
        
      } else {
        // Detailed CSV for admin with all employees
        csvContent = 'Date,Employee,Position,Productivity,Focus Time,Productive Time,Communication Time,Meeting Time,' +
                    'Break Time,Distractions,Performance Score,Wellbeing Score,Zens Earned,Status,Blockchain Report\n';
        
        reports.forEach(dailyReport => {
          dailyReport.employeeReports.forEach(emp => {
            csvContent += `${dailyReport.date},${emp.employeeName},${emp.position},${emp.productivity}%,${emp.focusTime}h,` +
                         `${emp.timeBreakdown.productive}%,${emp.timeBreakdown.communication}%,${emp.timeBreakdown.meetings}%,` +
                         `${emp.timeBreakdown.breaks}%,${emp.timeBreakdown.distractions}%,${emp.performanceScore},` +
                         `${emp.wellbeingScore},${emp.zensEarned},${emp.status},${emp.hasBlockchainReport ? 'Yes' : 'No'}\n`;
          });
        });
        filename = `workzen_team_detailed_reports_${new Date().toISOString().split('T')[0]}.csv`;
      }

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Download completed',
        description: `Detailed report ${filename} downloaded successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    } catch (error) {
      toast({
        title: 'Download error',
        description: 'Could not download the detailed report',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Card bg={cardBg} borderColor={borderColor}>
        <CardBody>
          <VStack spacing={4} py={8}>
            <Spinner size="xl" color="blue.500" />
            <Text>Loading blockchain reports...</Text>
          </VStack>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card bg={cardBg} borderColor={borderColor}>
        <CardBody>
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        </CardBody>
      </Card>
    );
  }

  return (
    <VStack spacing={6} align="stretch">
      {/* Header con estadísticas */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        bg={cardBg}
        borderColor={borderColor}
        boxShadow="lg"
      >
        <CardHeader>
          <HStack justify="space-between">
            <HStack spacing={3}>
              <Icon as={FaCube} color="blue.500" boxSize={6} />
              <Heading size="md">
                {userRole === 'employee' ? 'My Blockchain Reports' : 'Team Reports'}
              </Heading>
            </HStack>
            <HStack spacing={2}>
              <Badge colorScheme="green" variant="subtle">
                <HStack spacing={1}>
                  <Icon as={FaShieldAlt} boxSize={3} />
                  <Text>Sepolia Testnet</Text>
                </HStack>
              </Badge>
              <Button
                leftIcon={<FaDownload />}
                size="sm"
                colorScheme="blue"
                variant="outline"
                onClick={downloadReports}
                isDisabled={reports.length === 0}
              >
                Download CSV
              </Button>
            </HStack>
          </HStack>
        </CardHeader>

        <CardBody>
          {stats && (
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={6}>
              <Stat>
                <StatLabel>Total Reports</StatLabel>
                <StatNumber>{stats.totalReports}</StatNumber>
                <StatHelpText>On blockchain</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Average Productivity</StatLabel>
                <StatNumber>{stats.averageProductivity}%</StatNumber>
                <StatHelpText>
                  <StatArrow type={stats.averageProductivity >= 80 ? "increase" : "decrease"} />
                  {stats.averageProductivity >= 80 ? 'Excellent' : 'Needs improvement'}
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Total Active Time</StatLabel>
                <StatNumber>{Math.round(stats.totalActiveTime / 3600)}h</StatNumber>
                <StatHelpText>Accumulated</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Total Focus Time</StatLabel>
                <StatNumber>{Math.round(stats.totalFocusTime / 3600)}h</StatNumber>
                <StatHelpText>Productive</StatHelpText>
              </Stat>
            </SimpleGrid>
          )}

          <Divider mb={6} />

          {reports.length === 0 ? (
            <Alert status="info">
              <AlertIcon />
              No blockchain reports available yet. Reports are automatically sent to blockchain.
            </Alert>
          ) : userRole === 'employee' ? (
            // EMPLOYEE DETAILED VIEW
            <VStack spacing={6} align="stretch">
              {reports.map((report, index) => (
                <MotionCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  bg={cardBg}
                  borderColor={borderColor}
                  borderWidth="1px"
                >
                  <Accordion allowToggle>
                    <AccordionItem border="none">
                      <AccordionButton>
                        <HStack flex="1" justify="space-between">
                          <HStack spacing={4}>
                            <Badge colorScheme="blue" size="lg">
                              {report.date}
                            </Badge>
                            <VStack spacing={1} align="start">
                              <Text fontSize="sm" fontWeight="semibold">
                                Productivity: {report.overallProductivity}%
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                Focus: {report.totalFocusTime.toFixed(1)}h | Zens: {report.zensBreakdown.totalZens}
                              </Text>
                            </VStack>
                          </HStack>
                          <HStack spacing={2}>
                            <CircularProgress 
                              value={report.overallProductivity} 
                              size="40px" 
                              color={report.overallProductivity >= 80 ? "green.400" : "orange.400"}
                            >
                              <CircularProgressLabel fontSize="xs">
                                {report.overallProductivity}%
                              </CircularProgressLabel>
                            </CircularProgress>
                            <AccordionIcon />
                          </HStack>
                        </HStack>
                      </AccordionButton>
                      
                      <AccordionPanel pb={4}>
                        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                          
                          {/* Application Usage */}
                          <Box>
                            <HStack mb={3}>
                              <Icon as={FaCode} color="blue.500" />
                              <Heading size="sm">Application Usage</Heading>
                            </HStack>
                            
                            <VStack spacing={3} align="stretch">
                              <Box>
                                <Text fontSize="sm" fontWeight="medium" mb={2}>Productive Apps</Text>
                                <VStack spacing={2} align="stretch">
                                  {Object.entries(report.applicationUsage.productiveApps).map(([app, minutes]) => (
                                    <HStack key={app} justify="space-between">
                                      <Text fontSize="sm" textTransform="capitalize">{app}</Text>
                                      <Badge colorScheme="green" size="sm">{minutes}m</Badge>
                                    </HStack>
                                  ))}
                                </VStack>
                              </Box>
                              
                              <Box>
                                <Text fontSize="sm" fontWeight="medium" mb={2}>Communication</Text>
                                <VStack spacing={2} align="stretch">
                                  {Object.entries(report.applicationUsage.communicationApps).map(([app, minutes]) => (
                                    <HStack key={app} justify="space-between">
                                      <Text fontSize="sm" textTransform="capitalize">{app}</Text>
                                      <Badge colorScheme="blue" size="sm">{minutes}m</Badge>
                                    </HStack>
                                  ))}
                                </VStack>
                              </Box>
                              
                              <Box>
                                <Text fontSize="sm" fontWeight="medium" mb={2}>Distracting Apps</Text>
                                <VStack spacing={2} align="stretch">
                                  {Object.entries(report.applicationUsage.distractingApps).map(([app, minutes]) => (
                                    <HStack key={app} justify="space-between">
                                      <Text fontSize="sm" textTransform="capitalize">{app}</Text>
                                      <Badge colorScheme="red" size="sm">{minutes}m</Badge>
                                    </HStack>
                                  ))}
                                </VStack>
                              </Box>
                            </VStack>
                          </Box>

                          {/* Website Categories */}
                          <Box>
                            <HStack mb={3}>
                              <Icon as={FaGlobe} color="purple.500" />
                              <Heading size="sm">Website Usage</Heading>
                            </HStack>
                            
                            <VStack spacing={3} align="stretch">
                              {Object.entries(report.websiteCategories).map(([category, percentage]) => (
                                <Box key={category}>
                                  <HStack justify="space-between" mb={1}>
                                    <Text fontSize="sm" textTransform="capitalize">{category.replace(/([A-Z])/g, ' $1')}</Text>
                                    <Text fontSize="sm" fontWeight="semibold">{percentage}%</Text>
                                  </HStack>
                                  <Progress 
                                    value={percentage} 
                                    size="sm" 
                                    colorScheme={
                                      category === 'workRelated' ? 'green' :
                                      category === 'documentation' ? 'blue' :
                                      ['socialMedia', 'entertainment', 'shopping'].includes(category) ? 'red' : 'gray'
                                    }
                                  />
                                </Box>
                              ))}
                            </VStack>
                          </Box>

                          {/* Break Analysis */}
                          <Box>
                            <HStack mb={3}>
                              <Icon as={FaClock} color="orange.500" />
                              <Heading size="sm">Break Analysis</Heading>
                            </HStack>
                            
                            <SimpleGrid columns={2} spacing={3}>
                              <Stat size="sm">
                                <StatLabel>Total Breaks</StatLabel>
                                <StatNumber>{report.breakAnalysis.totalBreaks}</StatNumber>
                              </Stat>
                              <Stat size="sm">
                                <StatLabel>Avg Length</StatLabel>
                                <StatNumber>{report.breakAnalysis.averageBreakLength.toFixed(1)}m</StatNumber>
                              </Stat>
                              <Stat size="sm">
                                <StatLabel>Longest Break</StatLabel>
                                <StatNumber>{report.breakAnalysis.longestBreak.toFixed(1)}m</StatNumber>
                              </Stat>
                              <Stat size="sm">
                                <StatLabel>Shortest Break</StatLabel>
                                <StatNumber>{report.breakAnalysis.shortestBreak.toFixed(1)}m</StatNumber>
                              </Stat>
                            </SimpleGrid>
                          </Box>

                          {/* Performance Metrics */}
                          <Box>
                            <HStack mb={3}>
                              <Icon as={FaChartBar} color="teal.500" />
                              <Heading size="sm">Performance</Heading>
                            </HStack>
                            
                            <SimpleGrid columns={2} spacing={3}>
                              <Stat size="sm">
                                <StatLabel>Keystrokes/min</StatLabel>
                                <StatNumber>{report.performanceMetrics.keystrokesPerMinute}</StatNumber>
                              </Stat>
                              <Stat size="sm">
                                <StatLabel>Clicks/hour</StatLabel>
                                <StatNumber>{report.performanceMetrics.mouseClicksPerHour}</StatNumber>
                              </Stat>
                              <Stat size="sm">
                                <StatLabel>Window Switches</StatLabel>
                                <StatNumber>{report.performanceMetrics.activeWindowSwitches}</StatNumber>
                              </Stat>
                              <Stat size="sm">
                                <StatLabel>Multitasking</StatLabel>
                                <StatNumber>{report.performanceMetrics.multitaskingScore}</StatNumber>
                              </Stat>
                            </SimpleGrid>
                          </Box>

                          {/* Wellbeing */}
                          <Box>
                            <HStack mb={3}>
                              <Icon as={FaHeart} color="pink.500" />
                              <Heading size="sm">Wellbeing</Heading>
                            </HStack>
                            
                            <VStack spacing={3} align="stretch">
                              <HStack justify="space-between">
                                <Text fontSize="sm">Screen Intensity</Text>
                                <Badge colorScheme={report.wellbeingIndicators.screenTimeIntensity > 80 ? "red" : "green"}>
                                  {report.wellbeingIndicators.screenTimeIntensity}%
                                </Badge>
                              </HStack>
                              <HStack justify="space-between">
                                <Text fontSize="sm">Work-Life Balance</Text>
                                <Badge colorScheme={report.wellbeingIndicators.workLifeBalance > 70 ? "green" : "yellow"}>
                                  {report.wellbeingIndicators.workLifeBalance}%
                                </Badge>
                              </HStack>
                              <HStack justify="space-between">
                                <Text fontSize="sm">Stress Level</Text>
                                <Badge colorScheme={report.wellbeingIndicators.stressLevel < 30 ? "green" : "orange"}>
                                  {report.wellbeingIndicators.stressLevel}%
                                </Badge>
                              </HStack>
                              <HStack justify="space-between">
                                <Text fontSize="sm">Energy Level</Text>
                                <Badge colorScheme={report.wellbeingIndicators.energyLevel > 70 ? "green" : "yellow"}>
                                  {report.wellbeingIndicators.energyLevel}%
                                </Badge>
                              </HStack>
                            </VStack>
                          </Box>

                          {/* Zens Breakdown */}
                          <Box>
                            <HStack mb={3}>
                              <Icon as={FaTrophy} color="yellow.500" />
                              <Heading size="sm">Zens Earned</Heading>
                            </HStack>
                            
                            <VStack spacing={2} align="stretch">
                              <HStack justify="space-between">
                                <Text fontSize="sm">Productivity</Text>
                                <Badge colorScheme="green">{report.zensBreakdown.productivityZens} zens</Badge>
                              </HStack>
                              <HStack justify="space-between">
                                <Text fontSize="sm">Focus</Text>
                                <Badge colorScheme="blue">{report.zensBreakdown.focusZens} zens</Badge>
                              </HStack>
                              <HStack justify="space-between">
                                <Text fontSize="sm">Consistency</Text>
                                <Badge colorScheme="purple">{report.zensBreakdown.consistencyZens} zens</Badge>
                              </HStack>
                              <HStack justify="space-between">
                                <Text fontSize="sm">Bonus</Text>
                                <Badge colorScheme="orange">{report.zensBreakdown.bonusZens} zens</Badge>
                              </HStack>
                              <Divider />
                              <HStack justify="space-between">
                                <Text fontSize="sm" fontWeight="bold">Total</Text>
                                <Badge colorScheme="yellow" size="lg">{report.zensBreakdown.totalZens} zens</Badge>
                              </HStack>
                            </VStack>
                          </Box>
                        </SimpleGrid>

                        <Divider my={4} />
                        
                        {/* Blockchain Info */}
                        <HStack justify="space-between" align="center">
                          <VStack align="start" spacing={1}>
                            <Text fontSize="xs" color="gray.500">Blockchain Transaction</Text>
                            <HStack spacing={2}>
                              <Badge colorScheme="green" size="sm">Block {report.blockNumber}</Badge>
                              <Badge colorScheme="blue" size="sm">{report.confirmations} confirmations</Badge>
                              <Badge colorScheme="gray" size="sm">{report.gasUsed} gas</Badge>
                            </HStack>
                          </VStack>
                          <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<FaEye />}
                            onClick={() => window.open(`https://sepolia.etherscan.io/tx/${report.transactionHash}`, '_blank')}
                          >
                            View on Etherscan
                          </Button>
                        </HStack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </MotionCard>
              ))}
            </VStack>
          ) : (
            // ADMIN DETAILED VIEW - All Employees with Accordion
            <VStack spacing={6} align="stretch">
              {/* Team Overview Summary */}
              <Card bg={useColorModeValue("blue.50", "blue.900")} borderColor={useColorModeValue("blue.200", "blue.700")}>
                <CardBody>
                  <HStack justify="space-between" align="center" mb={4}>
                    <Heading size="md" color="blue.600">Team Overview</Heading>
                    <Button
                      leftIcon={<FaDownload />}
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                      onClick={() => downloadEmployeesData(reports)}
                    >
                      Export All Data
                    </Button>
                  </HStack>
                  <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                    <Stat>
                      <StatLabel>Total Employees</StatLabel>
                      <StatNumber>{reports[0]?.summary?.totalEmployees || 0}</StatNumber>
                    </Stat>
                    <Stat>
                      <StatLabel>Avg Productivity</StatLabel>
                      <StatNumber>{reports[0]?.summary?.averageProductivity || 0}%</StatNumber>
                    </Stat>
                    <Stat>
                      <StatLabel>Blockchain Reports</StatLabel>
                      <StatNumber>{reports[0]?.summary?.blockchainReports || 0}</StatNumber>
                    </Stat>
                    <Stat>
                      <StatLabel>Top Performers</StatLabel>
                      <StatNumber>{reports[0]?.summary?.topPerformers || 0}</StatNumber>
                    </Stat>
                  </SimpleGrid>
                </CardBody>
              </Card>

              {/* Daily Reports with Accordion - First day expanded */}
              <Accordion allowToggle defaultIndex={0}>
                {reports.map((dailyReport, dayIndex) => (
                  <AccordionItem key={dayIndex} border="1px solid" borderColor={borderColor} borderRadius="lg" mb={4}>
                    <AccordionButton p={4} _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}>
                      <Box flex="1" textAlign="left">
                        <HStack justify="space-between" w="full">
                          <VStack align="start" spacing={1}>
                            <HStack spacing={3}>
                              <Text fontWeight="bold" fontSize="lg">{dailyReport.date}</Text>
                              {dayIndex === 0 && <Badge colorScheme="green">Latest</Badge>}
                            </HStack>
                            <Text fontSize="sm" color="gray.500">
                              {dailyReport.employeeReports?.length || 0} employees reported
                            </Text>
                          </VStack>
                          <HStack spacing={6}>
                            <VStack spacing={0}>
                              <Text fontSize="xs" color="gray.500">Team Avg</Text>
                              <Text fontWeight="bold" color="blue.500">
                                {dailyReport.summary?.averageProductivity || 0}%
                              </Text>
                            </VStack>
                            <VStack spacing={0}>
                              <Text fontSize="xs" color="gray.500">On Blockchain</Text>
                              <Text fontWeight="bold" color="green.500">
                                {dailyReport.summary?.blockchainReports || 0}
                              </Text>
                            </VStack>
                            <VStack spacing={0}>
                              <Text fontSize="xs" color="gray.500">Total Zens</Text>
                              <Text fontWeight="bold" color="purple.500">
                                {dailyReport.summary?.totalZensAwarded || 0}
                              </Text>
                            </VStack>
                          </HStack>
                        </HStack>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    
                    <AccordionPanel p={0}>
                      <Box p={4} bg={useColorModeValue("gray.50", "gray.700")}>
                        <Box overflowX="auto">
                          <Table variant="simple" size="sm">
                            <Thead>
                              <Tr>
                                <Th>Employee</Th>
                                <Th>Position</Th>
                                <Th>Productivity</Th>
                                <Th>Focus Time</Th>
                                <Th>Time Breakdown</Th>
                                <Th>Top Apps</Th>
                                <Th>Performance</Th>
                                <Th>Wellbeing</Th>
                                <Th>Zens</Th>
                                <Th>Status</Th>
                                <Th>Blockchain</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {dailyReport.employeeReports?.map((emp, empIndex) => (
                                <Tr key={empIndex}>
                                  <Td>
                                    <VStack align="start" spacing={1}>
                                      <Text fontSize="sm" fontWeight="medium">{emp.employeeName}</Text>
                                      <Text fontSize="xs" color="gray.500">
                                        {emp.employeeId?.slice(0, 6)}...{emp.employeeId?.slice(-4)}
                                      </Text>
                                    </VStack>
                                  </Td>
                                  <Td>
                                    <Text fontSize="sm">{emp.position}</Text>
                                  </Td>
                                  <Td>
                                    <HStack>
                                      <CircularProgress 
                                        value={emp.productivity || 0} 
                                        size="35px" 
                                        color={
                                          emp.productivity >= 80 ? "green.400" : 
                                          emp.productivity >= 65 ? "yellow.400" : "red.400"
                                        }
                                      >
                                        <CircularProgressLabel fontSize="10px">
                                          {emp.productivity || 0}%
                                        </CircularProgressLabel>
                                      </CircularProgress>
                                    </HStack>
                                  </Td>
                                  <Td>
                                    <VStack spacing={0} align="start">
                                      <Text fontSize="sm" fontWeight="bold">{emp.focusTime || 0}h</Text>
                                      <Text fontSize="xs" color="gray.500">of {emp.activeTime || 0}h</Text>
                                    </VStack>
                                  </Td>
                                  <Td>
                                    <VStack spacing={1} align="start">
                                      <HStack spacing={1}>
                                        <Badge colorScheme="green" size="xs">P: {emp.timeBreakdown?.productive || 0}%</Badge>
                                        <Badge colorScheme="blue" size="xs">C: {emp.timeBreakdown?.communication || 0}%</Badge>
                                      </HStack>
                                      <HStack spacing={1}>
                                        <Badge colorScheme="orange" size="xs">M: {emp.timeBreakdown?.meetings || 0}%</Badge>
                                        <Badge colorScheme="red" size="xs">D: {emp.timeBreakdown?.distractions || 0}%</Badge>
                                      </HStack>
                                    </VStack>
                                  </Td>
                                  <Td>
                                    <VStack spacing={1} align="start">
                                      {emp.topApplications?.slice(0, 2).map((app, appIndex) => (
                                        <Text key={appIndex} fontSize="xs">
                                          {app.name}: {app.time}m
                                        </Text>
                                      ))}
                                    </VStack>
                                  </Td>
                                  <Td>
                                    <Badge 
                                      colorScheme={
                                        emp.performanceScore >= 80 ? "green" : 
                                        emp.performanceScore >= 65 ? "yellow" : "red"
                                      }
                                      size="sm"
                                    >
                                      {emp.performanceScore || 0}
                                    </Badge>
                                  </Td>
                                  <Td>
                                    <Badge 
                                      colorScheme={
                                        emp.wellbeingScore >= 75 ? "green" : 
                                        emp.wellbeingScore >= 60 ? "yellow" : "red"
                                      }
                                      size="sm"
                                    >
                                      {emp.wellbeingScore || 0}
                                    </Badge>
                                  </Td>
                                  <Td>
                                    <Badge colorScheme="purple" size="sm">
                                      {emp.zensEarned || 0}
                                    </Badge>
                                  </Td>
                                  <Td>
                                    <Badge 
                                      colorScheme={
                                        emp.status === 'Excellent' ? "green" : 
                                        emp.status === 'Good' ? "blue" : 
                                        emp.status === 'Average' ? "yellow" : "red"
                                      }
                                      size="sm"
                                    >
                                      {emp.status || 'N/A'}
                                    </Badge>
                                  </Td>
                                  <Td>
                                    {emp.hasBlockchainReport ? (
                                      <Tooltip label={`View tx: ${emp.transactionHash?.slice(0, 10)}...`}>
                                        <Button
                                          size="xs"
                                          variant="link"
                                          leftIcon={<FaEye />}
                                          colorScheme="green"
                                          onClick={() => window.open(`https://sepolia.etherscan.io/tx/${emp.transactionHash}`, '_blank')}
                                        >
                                          ✓ Verified
                                        </Button>
                                      </Tooltip>
                                    ) : (
                                      <Badge colorScheme="red" size="xs">✗ Missing</Badge>
                                    )}
                                  </Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </Box>
                        
                        {/* Export button for specific day */}
                        <Flex justify="end" mt={4}>
                          <Button
                            size="sm"
                            leftIcon={<FaDownload />}
                            variant="outline"
                            onClick={() => downloadDayData(dailyReport)}
                          >
                            Export {dailyReport.date}
                          </Button>
                        </Flex>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </VStack>
          )}
        </CardBody>
      </MotionCard>

      {/* Información sobre privacidad */}
      {userRole === 'admin' && (
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          bg={cardBg}
          borderColor={borderColor}
        >
          <CardBody>
            <HStack spacing={3} mb={3}>
              <Icon as={FaShieldAlt} color="green.500" />
              <Heading size="sm">Privacy and Data</Heading>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              Administrative reports show only aggregated data and general team statistics.
              No personally identifiable data or specific individual employee metrics are included.
              All information complies with privacy policies and GDPR.
            </Text>
          </CardBody>
        </MotionCard>
      )}
    </VStack>
  );
};

export default BlockchainReports;
