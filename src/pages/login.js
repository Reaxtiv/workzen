import { useState, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  VStack, 
  HStack,
  Heading, 
  Text, 
  Input, 
  Button, 
  Alert,
  AlertIcon,
  useColorModeValue,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  Spinner,
  Badge,
  Divider,
  useToast,
  Container,
  Checkbox,
  Card,
  CardBody,
  SimpleGrid,
  Image
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaUserTie, FaUsers, FaShieldAlt } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, user } = useAuth();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const result = login(email, password);
      if (!result.success) {
        setError(result.error);
        toast({
          title: "Login Failed",
          description: result.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Welcome to WorkZen!",
          description: "Login successful. Redirecting...",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
    setIsLoading(true);
    
    // Auto-submit demo login
    setTimeout(() => {
      const result = login(demoEmail, 'password123');
      if (result.success) {
        toast({
          title: "Demo Login Successful!",
          description: `Welcome to WorkZen as ${demoEmail.includes('admin') ? 'Manager' : 'Employee'}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
      setIsLoading(false);
    }, 1000);
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
                  Empowering teams with mindful productivity and wellness-focused management
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
                    Cryptographic proof of achievements
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

            {/* Right side - Login Form */}
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
                        Welcome Back
                      </Heading>
                      <Text color="gray.500" textAlign="center">
                        Sign in to your WorkZen account
                      </Text>
                      <HStack spacing={2} pt={1}>
                        <FaShieldAlt color="#52A052" size="16px" />
                        <Text fontSize="xs" color="gray.400" textAlign="center">
                          Secured with blockchain technology
                        </Text>
                      </HStack>
                    </VStack>

                    {error && (
                      <MotionBox
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        w="full"
                      >
                        <Alert status="error" borderRadius="md">
                          <AlertIcon />
                          {error}
                        </Alert>
                      </MotionBox>
                    )}

                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                      <VStack spacing={4}>
                        <FormControl isInvalid={error && !email}>
                          <FormLabel color={textColor}>
                            <HStack>
                              <FaUser />
                              <Text>Email Address</Text>
                            </HStack>
                          </FormLabel>
                          <Input 
                            type="email" 
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            bg={useColorModeValue("gray.50", "gray.700")}
                            border="1px solid"
                            borderColor={borderColor}
                            _hover={{ borderColor: "zen.300" }}
                            _focus={{ 
                              borderColor: "zen.500", 
                              boxShadow: "0 0 0 1px var(--chakra-colors-zen-500)" 
                            }}
                            size="lg"
                          />
                        </FormControl>

                        <FormControl isInvalid={error && !password}>
                          <FormLabel color={textColor}>
                            <HStack>
                              <FaLock />
                              <Text>Password</Text>
                            </HStack>
                          </FormLabel>
                          <InputGroup size="lg">
                            <Input 
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              bg={useColorModeValue("gray.50", "gray.700")}
                              border="1px solid"
                              borderColor={borderColor}
                              _hover={{ borderColor: "zen.300" }}
                              _focus={{ 
                                borderColor: "zen.500", 
                                boxShadow: "0 0 0 1px var(--chakra-colors-zen-500)" 
                              }}
                            />
                            <InputRightElement>
                              <IconButton
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                onClick={() => setShowPassword(!showPassword)}
                                variant="ghost"
                                size="sm"
                              />
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>

                        <HStack justify="space-between" w="full">
                          <Checkbox 
                            isChecked={rememberMe} 
                            onChange={(e) => setRememberMe(e.target.checked)}
                            colorScheme="zen"
                          >
                            <Text fontSize="sm" color={textColor}>Remember me</Text>
                          </Checkbox>
                          <Button variant="link" size="sm" color="zen.500">
                            Forgot password?
                          </Button>
                        </HStack>

                        <Button 
                          type="submit" 
                          colorScheme="zen"
                          size="lg"
                          w="full"
                          isLoading={isLoading}
                          loadingText="Signing in..."
                          bgGradient="linear(to-r, zen.400, zen.600)"
                          _hover={{
                            bgGradient: "linear(to-r, zen.500, zen.700)",
                            transform: "translateY(-1px)",
                            boxShadow: "lg"
                          }}
                          transition="all 0.2s"
                        >
                          Sign In to WorkZen
                        </Button>
                      </VStack>
                    </form>

                    <Divider />

                    {/* Demo Accounts */}
                    <VStack spacing={4} w="full">
                      <Text fontSize="sm" color="gray.500" textAlign="center" fontWeight="medium">
                        Try WorkZen with demo accounts
                      </Text>
                      
                      <SimpleGrid columns={2} spacing={3} w="full">
                        <Button
                          size="md"
                          variant="outline"
                          leftIcon={<FaUserTie />}
                          colorScheme="blue"
                          onClick={() => handleDemoLogin('admin@workzen.com')}
                          _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
                          isDisabled={isLoading}
                        >
                          Manager Demo
                        </Button>
                        <Button
                          size="md"
                          variant="outline"
                          leftIcon={<FaUsers />}
                          colorScheme="green"
                          onClick={() => handleDemoLogin('alice@workzen.com')}
                          _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
                          isDisabled={isLoading}
                        >
                          Employee Demo
                        </Button>
                      </SimpleGrid>
                      
                      <VStack spacing={2}>
                        <Text fontSize="xs" color="gray.400" textAlign="center">
                          All demo accounts use password: <Badge colorScheme="gray">password123</Badge>
                        </Text>
                        <VStack spacing={1} fontSize="xs" color="gray.400">
                          <Text><strong>Manager:</strong> admin@workzen.com</Text>
                          <Text><strong>Employee:</strong> alice@workzen.com, bob@workzen.com, carol@workzen.com</Text>
                        </VStack>
                      </VStack>
                    </VStack>
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
