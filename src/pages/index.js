import { useEffect } from "react";
import { useRouter } from "next/router";
import { 
  Box, 
  Heading, 
  Text, 
  Spinner,
  VStack,
  Icon,
  useColorModeValue,
  Flex
} from "@chakra-ui/react";
import { FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Home() {
  const router = useRouter();
  const bg = useColorModeValue("zen.50", "zen.900");
  const cardBg = useColorModeValue("white", "zen.800");
  
  useEffect(() => {
    // Redirigir al dashboard zen después de 2.5 segundos
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [router]);
  return (    <Box 
      minH="100vh" 
      bgGradient="linear(135deg, zen.50 0%, mindful.100 30%, zen.100 100%)"
      display="flex" 
      alignItems="center" 
      justifyContent="center"
    >
      <MotionBox
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <VStack spacing={8} textAlign="center">
          {/* Logo WorkZen adaptado con colores zen más intensos */}
          <MotionBox
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Flex 
              align="center" 
              justify="center"
              bg={cardBg}
              p={8}
              borderRadius="2xl"
              boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              border="3px solid"
              borderColor="zen.400"
            >              <VStack spacing={3}>                {/* Logo WorkZen real - Portátil con árbol más detallado */}
                <Box 
                  position="relative"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="4xl"
                >
                  {/* Portátil base más detallado */}
                  <Box
                    position="relative"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    {/* Pantalla del portátil */}
                    <Box
                      w="60px"
                      h="40px"
                      bg="gray.800"
                      borderRadius="md"
                      position="relative"
                      border="2px solid"
                      borderColor="gray.700"
                      mb="2px"
                    >
                      <Box
                        w="50px"
                        h="30px"
                        bg="green.100"
                        borderRadius="sm"
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                      />
                    </Box>
                    
                    {/* Base del portátil */}
                    <Box
                      w="70px"
                      h="8px"
                      bg="gray.600"
                      borderRadius="md"
                      position="relative"
                    >
                      {/* Teclado */}
                      <Box
                        w="60px"
                        h="6px"
                        bg="gray.700"
                        borderRadius="sm"
                        position="absolute"
                        top="1px"
                        left="50%"
                        transform="translateX(-50%)"
                      />
                    </Box>
                    
                    {/* Árbol brotando elegantemente */}
                    <Box
                      position="absolute"
                      top="15px"
                      left="50%"
                      transform="translateX(-50%)"
                      fontSize="2xl"
                      color="zen.400"
                      textShadow="0 0 10px rgba(56, 142, 60, 0.3)"
                    >
                      🌱
                    </Box>
                    
                    {/* Hojas adicionales flotando */}
                    <Box
                      position="absolute"
                      top="5px"
                      left="40%"
                      fontSize="sm"
                      color="zen.300"
                      opacity="0.7"
                    >
                      🍃
                    </Box>
                    <Box
                      position="absolute"
                      top="10px"
                      right="35%"
                      fontSize="xs"
                      color="zen.300"
                      opacity="0.5"
                    >
                      🍃
                    </Box>
                  </Box>
                </Box>
                
                {/* WorkZen title con colores más intensos */}
                <Heading 
                  size="3xl" 
                  bgGradient="linear(to-r, zen.500, zen.600, mindful.500)"
                  bgClip="text"
                  fontWeight="bold"
                  letterSpacing="-0.02em"
                >
                  WorkZen
                </Heading>
                
                <Text 
                  color="zen.600" 
                  fontSize="lg" 
                  fontWeight="medium"
                  maxW="350px"
                >
                  Mindful Productivity & Transparent Wellness Dashboard
                </Text>
              </VStack>
            </Flex>
          </MotionBox>

          {/* Loading animation mejorada */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <VStack spacing={4}>
              <Spinner 
                size="xl" 
                color="zen.500" 
                thickness="4px"
                speed="0.8s"
              />
              <Text color="zen.600" fontSize="md" fontWeight="medium">
                Preparing your zen workspace...
              </Text>
            </VStack>
          </MotionBox>

          {/* Zen philosophy text */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            maxW="500px"
          >
            <Text 
              color="zen.500" 
              fontSize="sm" 
              fontStyle="italic"
              textAlign="center"
            >
              "Productivity flows naturally when mind and purpose are aligned. 
              Your journey to mindful work begins here."
            </Text>
          </MotionBox>        </VStack>
      </MotionBox>
    </Box>
  );
}