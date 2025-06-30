import { useState, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  VStack, 
  HStack,
  Heading, 
  Text, 
  Button, 
  Alert,
  AlertIcon,
  useColorModeValue,
  Spinner,
  Badge,
  useToast,
  Container,
  Card,
  CardBody,
  SimpleGrid,
  Image,
  Select,
  Link,
  Icon
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaWallet, FaShieldAlt, FaExternalLinkAlt, FaUserTie, FaUsers, FaDownload } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useMetaMask } from "../hooks/useMetaMask";
import { useRouter } from "next/router";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const { loginWithWallet, user } = useAuth();
  const { 
    account, 
    isConnecting, 
    error: walletError, 
    isMetaMaskInstalled, 
    connectWallet,
    isConnected 
  } = useMetaMask();
  const router = useRouter();
  const toast = useToast();

  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'manager') {
        router.push('/admin/dashboard-simple');
      } else {
        router.push('/employee/dashboard');
      }
    }
  }, [user, router]);

  // Auto-login when wallet connects and role is selected
  useEffect(() => {
    if (isConnected && account && selectedRole && !isLoggingIn) {
      handleWalletLogin();
    }
  }, [isConnected, account, selectedRole]);

  const handleWalletLogin = async () => {
    if (!account) return;
    
    setIsLoggingIn(true);
    
    try {
      const result = await loginWithWallet(account, selectedRole);
      if (result.success) {
        toast({
          title: "Welcome to WorkZen!",
          description: `Connected with wallet as ${selectedRole}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login Failed",
          description: result.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login with wallet",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleConnectWallet = async () => {
    if (!selectedRole) {
      toast({
        title: "Please select a role",
        description: "Choose whether you're connecting as a Manager or Employee",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    await connectWallet();
  };

  const handleDemoLogin = (role) => {
    setSelectedRole(role);
    // If wallet is already connected, login immediately
    if (isConnected && account) {
      handleWalletLogin();
    } else {
      // Otherwise, connect wallet first
      connectWallet();
    }
  };

  if (user) {
    return (
      <Flex minH="100vh" align="center" justify="center" 
        bgGradient={useColorModeValue(
          "linear(135deg, zen.50 0%, mindful.100 30%, zen.100 100%)",
          "linear(135deg, gray.900 0%, gray.800 30%, gray.700 100%)"
        )}
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="zen.500" thickness="4px" />
          <Text fontSize="lg" color={textColor}>Redirecting to dashboard...</Text>
        </VStack>
      </Flex>
    );
  }

  return (
    <Box
      minH="100vh"
      bgImage="url('/images/workzen.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      position="relative"
      py={8}
    >
      {/* Overlay para mejorar legibilidad */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={useColorModeValue(
          "rgba(255, 255, 255, 0.72)",
          "rgba(0, 0, 0, 0.62)"
        )}
        zIndex={1}
      />
      
      <Container maxW="6xl" centerContent position="relative" zIndex={2} py={4}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          w="full"
          maxW="1000px"
        >
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} alignItems="center">
            {/* Left side - Branding */}
            <MotionVStack
              spacing={6}
              align="start"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Logo and Brand Section */}
              <VStack align="center" spacing={4}>
                <VStack align="center" spacing={4}>
                  <Image
                    src="/images/workzen.jpg"
                    alt="WorkZen Logo"
                    w={56}
                    h={56}
                    borderRadius="3xl"
                    boxShadow="2xl"
                    objectFit="cover"
                  />
                  <Heading 
                    size="3xl" 
                    bgGradient="linear(to-r, #52A052, #4FC3F7)" 
                    bgClip="text"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    WorkZen
                  </Heading>
                </VStack>
                <Text fontSize="lg" color={useColorModeValue("gray.800", "gray.100")} maxW="400px" lineHeight="1.4" fontWeight="semibold" textAlign="center">
                  Empowering teams with mindful productivity and Web3-secured analytics
                </Text>
              </VStack>

              {/* Features Section */}
              <VStack align="start" spacing={3} w="full">
                <HStack spacing={3}>
                  <Box 
                    w={4} 
                    h={4} 
                    bg="green.400" 
                    borderRadius="full" 
                    boxShadow="sm"
                  />
                  <Text 
                    color={useColorModeValue("gray.800", "gray.100")} 
                    fontSize="md"
                    fontWeight="medium"
                  >
                    Track team productivity intelligently
                  </Text>
                </HStack>
                <HStack spacing={3}>
                  <Box 
                    w={4} 
                    h={4} 
                    bg="blue.400" 
                    borderRadius="full" 
                    boxShadow="sm"
                  />
                  <Text 
                    color={useColorModeValue("gray.800", "gray.100")} 
                    fontSize="md"
                    fontWeight="medium"
                  >
                    Promote work-life balance
                  </Text>
                </HStack>
                <HStack spacing={3}>
                  <Box 
                    w={4} 
                    h={4} 
                    bg="purple.400" 
                    borderRadius="full" 
                    boxShadow="sm"
                  />
                  <Text 
                    color={useColorModeValue("gray.800", "gray.100")} 
                    fontSize="md"
                    fontWeight="medium"
                  >
                    Blockchain-secured data immutability
                  </Text>
                </HStack>
                <HStack spacing={3}>
                  <Box 
                    w={4} 
                    h={4} 
                    bg="orange.400" 
                    borderRadius="full" 
                    boxShadow="sm"
                  />
                  <Text 
                    color={useColorModeValue("gray.800", "gray.100")} 
                    fontSize="md"
                    fontWeight="medium"
                  >
                    MetaMask wallet authentication
                  </Text>
                </HStack>
                <HStack spacing={3}>
                  <Box 
                    w={4} 
                    h={4} 
                    bg="cyan.400" 
                    borderRadius="full" 
                    boxShadow="sm"
                  />
                  <Text 
                    color={useColorModeValue("gray.800", "gray.100")} 
                    fontSize="md"
                    fontWeight="medium"
                  >
                    Role-based dashboards & analytics
                  </Text>
                </HStack>
              </VStack>
            </MotionVStack>

            {/* Right side - Wallet Login */}
            <MotionBox
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card 
                bg={bg} 
                borderColor={borderColor}
                boxShadow="2xl"
                borderRadius="2xl"
                overflow="hidden"
                border="1px solid"
              >
                <CardBody p={8}>
                  <VStack spacing={6}>
                    <VStack spacing={2}>
                      <Heading size="lg" color={textColor} textAlign="center">
                        Connect Your Wallet
                      </Heading>
                      <Text color="gray.500" textAlign="center">
                        Sign in to WorkZen with MetaMask
                      </Text>
                      <HStack spacing={2} pt={1}>
                        <FaShieldAlt color="#52A052" size="16px" />
                        <Text fontSize="xs" color="gray.400" textAlign="center">
                          Secured with Web3 technology
                        </Text>
                      </HStack>
                    </VStack>

                    {(walletError || (!isMetaMaskInstalled && !isConnecting)) && (
                      <MotionBox
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        w="full"
                      >
                        <Alert status="error" borderRadius="md">
                          <AlertIcon />
                          {!isMetaMaskInstalled ? 
                            "MetaMask is not installed. Please install MetaMask to continue." : 
                            walletError
                          }
                        </Alert>
                      </MotionBox>
                    )}

                    {!isMetaMaskInstalled ? (
                      <VStack spacing={4} w="full">
                        <Button 
                          leftIcon={<FaDownload />}
                          rightIcon={<FaExternalLinkAlt />}
                          colorScheme="orange"
                          size="lg"
                          w="full"
                          as={Link}
                          href="https://metamask.io/download/"
                          isExternal
                          _hover={{
                            transform: "translateY(-1px)",
                            boxShadow: "lg"
                          }}
                          transition="all 0.2s"
                        >
                          Install MetaMask
                        </Button>
                        <Text fontSize="sm" color="gray.500" textAlign="center">
                          MetaMask is required to access WorkZen
                        </Text>
                      </VStack>
                    ) : (
                      <VStack spacing={4} w="full">
                        {/* Role Selection */}
                        <Box w="full">
                          <Text fontSize="sm" color={textColor} mb={2} fontWeight="medium">
                            Select your role:
                          </Text>
                          <Select 
                            placeholder="Choose your role..."
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            bg={useColorModeValue("gray.50", "gray.700")}
                            border="1px solid"
                            borderColor={borderColor}
                            _hover={{ borderColor: "zen.300" }}
                            _focus={{ 
                              borderColor: "zen.500", 
                              boxShadow: "0 0 0 1px var(--chakra-colors-zen-500)" 
                            }}
                            size="lg"
                          >
                            <option value="manager">Manager</option>
                            <option value="employee">Employee</option>
                          </Select>
                        </Box>

                        {/* Wallet Connection Status */}
                        {isConnected && account && (
                          <Box 
                            w="full" 
                            p={3} 
                            bg={useColorModeValue("green.50", "green.900")} 
                            borderRadius="md"
                            border="1px solid"
                            borderColor={useColorModeValue("green.200", "green.700")}
                          >
                            <VStack spacing={1}>
                              <Text fontSize="sm" fontWeight="medium" color="green.600">
                                Wallet Connected
                              </Text>
                              <Text fontSize="xs" color="green.500" fontFamily="mono">
                                {account.slice(0, 6)}...{account.slice(-4)}
                              </Text>
                            </VStack>
                          </Box>
                        )}

                        {/* Connect/Login Button */}
                        <Button 
                          leftIcon={<FaWallet />}
                          colorScheme="zen"
                          size="lg"
                          w="full"
                          isLoading={isConnecting || isLoggingIn}
                          loadingText={isConnecting ? "Connecting..." : "Logging in..."}
                          onClick={isConnected ? handleWalletLogin : handleConnectWallet}
                          bgGradient="linear(to-r, zen.400, zen.600)"
                          _hover={{
                            bgGradient: "linear(to-r, zen.500, zen.700)",
                            transform: "translateY(-1px)",
                            boxShadow: "lg"
                          }}
                          transition="all 0.2s"
                          isDisabled={!selectedRole}
                        >
                          {isConnected ? "Sign In to WorkZen" : "Connect MetaMask"}
                        </Button>

                        {/* Quick Demo */}
                        <VStack spacing={4} w="full" pt={4}>
                          <Text fontSize="sm" color="gray.500" textAlign="center" fontWeight="medium">
                            Quick Demo Access
                          </Text>
                          
                          <SimpleGrid columns={2} spacing={3} w="full">
                            <Button
                              size="md"
                              variant="outline"
                              leftIcon={<FaUserTie />}
                              colorScheme="blue"
                              onClick={() => handleDemoLogin('manager')}
                              _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
                              isDisabled={isConnecting || isLoggingIn}
                            >
                              Manager Demo
                            </Button>
                            <Button
                              size="md"
                              variant="outline"
                              leftIcon={<FaUsers />}
                              colorScheme="green"
                              onClick={() => handleDemoLogin('employee')}
                              _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
                              isDisabled={isConnecting || isLoggingIn}
                            >
                              Employee Demo
                            </Button>
                          </SimpleGrid>
                          
                          <Text fontSize="xs" color="gray.400" textAlign="center">
                            Demo accounts will connect with your current wallet
                          </Text>
                        </VStack>
                      </VStack>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            </MotionBox>
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
}
