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
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  Spinner,
  Badge,
  Divider,
  useToast,
  Container,
  Checkbox
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaBuilding } from "react-icons/fa";
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

  useEffect(() => {
    if (user) {
      // Redirect if already logged in
      if (user.role === 'manager') {
        router.push('/admin/dashboard');
      } else {
        router.push('/employee/dashboard');
      }
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = login(email, password);
      
      if (result.success) {
        toast({
          title: "Login Successful!",
          description: "Welcome to WorkZen",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        setError(result.error || 'Login failed');
        toast({
          title: "Login Failed",
          description: result.error || 'Invalid credentials',
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (err) {
      setError('An unexpected error occurred');
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    {
      email: 'admin@workzen.com',
      role: 'Manager/Admin',
      password: 'password123',
      description: 'Full access to all features'
    },
    {
      email: 'alice@workzen.com',
      role: 'Employee',
      password: 'password123',
      description: 'Employee dashboard and features'
    }
  ];

  const fillDemoCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  if (user) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  return (
    <Box
      minH="100vh"
      bgGradient={useColorModeValue(
        "linear(135deg, blue.50 0%, purple.50 30%, teal.50 100%)",
        "linear(135deg, gray.900 0%, gray.800 30%, gray.700 100%)"
      )}
    >
      <Container maxW="7xl" h="100vh">
        <Flex h="100%" align="center" justify="center">
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            w="full"
            maxW="1000px"
          >
            <Flex
              direction={{ base: 'column', lg: 'row' }}
              bg={bg}
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="2xl"
              border="1px"
              borderColor={borderColor}
            >
              
              {/* Left Side - Branding */}
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                flex="1"
                bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                p={12}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                color="white"
                textAlign="center"
              >
                <VStack spacing={6}>
                  <Box>
                    <Heading size="2xl" fontWeight="bold" mb={2}>
                      WorkZen
                    </Heading>
                    <Text fontSize="xl" opacity={0.9}>
                      Productivity & Wellness Platform
                    </Text>
                  </Box>
                  
                  <Box>
                    <Text fontSize="lg" opacity={0.8} mb={4}>
                      Transform your workplace with intelligent analytics and mindful productivity
                    </Text>
                    <HStack justify="center" spacing={4} flexWrap="wrap">
                      <Badge colorScheme="green" variant="solid" px={3} py={1}>
                        📊 Analytics
                      </Badge>
                      <Badge colorScheme="blue" variant="solid" px={3} py={1}>
                        🧘 Wellness
                      </Badge>
                      <Badge colorScheme="purple" variant="solid" px={3} py={1}>
                        👥 Team Management
                      </Badge>
                    </HStack>
                  </Box>

                  <Box w="full">
                    <Text fontSize="sm" opacity={0.7} mb={3}>
                      Demo Accounts:
                    </Text>
                    <VStack spacing={2}>
                      {demoAccounts.map((account, index) => (
                        <Box
                          key={index}
                          p={3}
                          bg="whiteAlpha.200"
                          borderRadius="lg"
                          w="full"
                          cursor="pointer"
                          _hover={{ bg: "whiteAlpha.300" }}
                          onClick={() => fillDemoCredentials(account.email, account.password)}
                        >
                          <HStack justify="space-between" align="center">
                            <VStack align="start" spacing={0}>
                              <Text fontSize="sm" fontWeight="semibold">
                                {account.role}
                              </Text>
                              <Text fontSize="xs" opacity={0.8}>
                                {account.email}
                              </Text>
                            </VStack>
                            <Badge size="sm" colorScheme="whiteAlpha">
                              Click to fill
                            </Badge>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                </VStack>
              </MotionBox>

              {/* Right Side - Login Form */}
              <MotionVStack
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                flex="1"
                p={12}
                spacing={6}
                justify="center"
                as="form"
                onSubmit={handleSubmit}
              >
                <VStack spacing={3} textAlign="center">
                  <Heading size="xl" color={textColor}>
                    Welcome Back
                  </Heading>
                  <Text color={textColor} opacity={0.7}>
                    Sign in to access your WorkZen dashboard
                  </Text>
                </VStack>

                {error && (
                  <Alert status="error" borderRadius="lg">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                <VStack spacing={4} w="full">
                  <FormControl isRequired>
                    <FormLabel color={textColor}>Email Address</FormLabel>
                    <InputGroup>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        size="lg"
                        bg={useColorModeValue("gray.50", "gray.700")}
                        border="1px"
                        borderColor={borderColor}
                        _hover={{ borderColor: "blue.400" }}
                        _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color={textColor}>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        size="lg"
                        bg={useColorModeValue("gray.50", "gray.700")}
                        border="1px"
                        borderColor={borderColor}
                        _hover={{ borderColor: "blue.400" }}
                        _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                      />
                      <InputRightElement h="full">
                        <IconButton
                          variant="ghost"
                          onClick={() => setShowPassword(!showPassword)}
                          icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <HStack justify="space-between" w="full">
                    <Checkbox
                      isChecked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      colorScheme="blue"
                    >
                      <Text fontSize="sm" color={textColor}>
                        Remember me
                      </Text>
                    </Checkbox>
                    <Text
                      fontSize="sm"
                      color="blue.500"
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                    >
                      Forgot password?
                    </Text>
                  </HStack>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    w="full"
                    h="12"
                    isLoading={isLoading}
                    loadingText="Signing in..."
                    bgGradient="linear(to-r, blue.500, purple.500)"
                    _hover={{
                      bgGradient: "linear(to-r, blue.600, purple.600)",
                      transform: "translateY(-1px)",
                      boxShadow: "lg"
                    }}
                  >
                    Sign In
                  </Button>

                  <Divider />

                  <Text fontSize="sm" color={textColor} opacity={0.7} textAlign="center">
                    Demo password for all accounts: <Badge colorScheme="blue">password123</Badge>
                  </Text>
                </VStack>
              </MotionVStack>
            </Flex>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
}
