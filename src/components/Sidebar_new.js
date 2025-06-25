import { 
  Box, 
  VStack, 
  Text, 
  Divider, 
  Flex,
  Badge,
  Icon as ChakraIcon
} from "@chakra-ui/react";
import WorkZenLogo from "./WorkZenLogo";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { 
  FaChartBar, 
  FaUsers, 
  FaFileAlt, 
  FaCog, 
  FaUserCircle
} from "react-icons/fa";

const MotionBox = motion(Box);

const links = [
  { href: "/dashboard", icon: FaChartBar, label: "Dashboard", badge: null },
  { href: "/employees", icon: FaUsers, label: "Employees", badge: "12" },
  { href: "/reports", icon: FaFileAlt, label: "Reports", badge: "3" },
];

const bottomLinks = [
  { href: "/profile", icon: FaUserCircle, label: "Profile" },
  { href: "/settings", icon: FaCog, label: "Settings" },
];

export default function Sidebar() {
  const router = useRouter();
  
  const linkVariants = {
    inactive: {
      x: 0,
      backgroundColor: "transparent",
      transition: { duration: 0.2 }
    },
    active: {
      x: 4,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      transition: { duration: 0.2 }
    },
    hover: {
      x: 2,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      transition: { duration: 0.15 }
    }
  };

  const isActiveRoute = (href) => {
    if (href === "/dashboard") {
      return router.pathname === "/dashboard" || router.pathname === "/";
    }
    return router.pathname.startsWith(href);
  };

  return (
    <MotionBox
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Box
        bgGradient="linear(to-b, zen.500, mindful.600)"
        borderRight="1px solid"
        borderColor="zen.400"
        w="280px"
        minH="100vh"
        py={6}
        px={4}
        position="fixed"
        left={0}
        top={0}
        boxShadow="0 4px 12px rgba(82, 160, 82, 0.3)"
        zIndex={1000}
      >
        <VStack align="stretch" spacing={0}>
          {/* Logo */}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            mb={8}
          >
            <Flex direction="column" align="center" justify="center" mb={2}>
              <WorkZenLogo size="lg" showSlogan={false} />
              <Text 
                fontWeight="bold" 
                fontSize="xl" 
                color="white"
                letterSpacing="tight"
                mt={2}
              >
                WorkZen
              </Text>
              <Text
                fontSize="sm"
                color="rgba(255,255,255,0.9)"
                fontWeight="500"
                textAlign="center"
                fontStyle="italic"
                mt={1}
                whiteSpace="nowrap"
              >
                Work better. Work human.
              </Text>
            </Flex>
            <Box
              bg="mindful.400"
              px={3}
              py={1}
              borderRadius="full"
              textAlign="center"
            >
              <Text 
                fontSize="xs" 
                color="white" 
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Productivity Suite
              </Text>
            </Box>
          </MotionBox>

          {/* Main Navigation */}
          <Box mb={6}>
            <Text 
              fontSize="xs" 
              fontWeight="semibold" 
              color="rgba(255,255,255,0.7)" 
              textTransform="uppercase" 
              letterSpacing="wider"
              mb={3}
              px={3}
            >
              Main Menu
            </Text>
            
            <VStack spacing={1} align="stretch">
              {links.map(({ href, icon, label, badge }, index) => (
                <MotionBox
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                >
                  <Link href={href}>
                    <MotionBox
                      as="button"
                      w="100%"
                      py={3}
                      px={3}
                      borderRadius="lg"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      variants={linkVariants}
                      initial="inactive"
                      animate={isActiveRoute(href) ? "active" : "inactive"}
                      whileHover="hover"
                      border="1px solid"
                      borderColor={isActiveRoute(href) ? "rgba(255,255,255,0.2)" : "transparent"}
                      position="relative"
                      overflow="hidden"
                    >
                      {/* Active indicator */}
                      {isActiveRoute(href) && (
                        <MotionBox
                          position="absolute"
                          left={0}
                          top={0}
                          bottom={0}
                          width="3px"
                          bg="mindful.400"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      
                      <Flex align="center" gap={3}>
                        <ChakraIcon 
                          as={icon}
                          w={5}
                          h={5}
                          color={isActiveRoute(href) ? "white" : "rgba(255,255,255,0.8)"}
                        />
                        <Text 
                          fontWeight={isActiveRoute(href) ? "semibold" : "medium"}
                          color={isActiveRoute(href) ? "white" : "rgba(255,255,255,0.8)"}
                          fontSize="sm"
                        >
                          {label}
                        </Text>
                      </Flex>
                      
                      {badge && (
                        <Badge 
                          bg="mindful.500" 
                          color="white"
                          variant="solid" 
                          borderRadius="full"
                          fontSize="xs"
                          minW="20px"
                          h="20px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {badge}
                        </Badge>
                      )}
                    </MotionBox>
                  </Link>
                </MotionBox>
              ))}
            </VStack>
          </Box>

          <Divider borderColor="rgba(255,255,255,0.2)" />

          {/* Bottom Navigation */}
          <Box mt={6}>
            <Text 
              fontSize="xs" 
              fontWeight="semibold" 
              color="rgba(255,255,255,0.7)" 
              textTransform="uppercase" 
              letterSpacing="wider"
              mb={3}
              px={3}
            >
              Account
            </Text>
            
            <VStack spacing={1} align="stretch">
              {bottomLinks.map(({ href, icon, label }, index) => (
                <MotionBox
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                >
                  <Link href={href}>
                    <MotionBox
                      as="button"
                      w="100%"
                      py={3}
                      px={3}
                      borderRadius="lg"
                      display="flex"
                      alignItems="center"
                      gap={3}
                      variants={linkVariants}
                      initial="inactive"
                      animate={router.pathname === href ? "active" : "inactive"}
                      whileHover="hover"
                      border="1px solid"
                      borderColor={router.pathname === href ? "rgba(255,255,255,0.2)" : "transparent"}
                    >
                      <ChakraIcon 
                        as={icon}
                        w={5}
                        h={5}
                        color={router.pathname === href ? "white" : "rgba(255,255,255,0.8)"}
                      />
                      <Text 
                        fontWeight={router.pathname === href ? "semibold" : "medium"}
                        color={router.pathname === href ? "white" : "rgba(255,255,255,0.8)"}
                        fontSize="sm"
                      >
                        {label}
                      </Text>
                    </MotionBox>
                  </Link>
                </MotionBox>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Box>
    </MotionBox>
  );
}
