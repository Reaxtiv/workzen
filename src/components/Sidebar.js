import { 
  Box, 
  VStack, 
  Text, 
  Divider, 
  Flex,
  Badge,
  Icon as ChakraIcon,
  IconButton,
  useColorMode,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Avatar,
  Tooltip,
  Button
} from "@chakra-ui/react";
import WorkZenLogo from "./WorkZenLogoImage";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { 
  FaChartBar, 
  FaUsers, 
  FaFileAlt, 
  FaCog, 
  FaUserCircle,
  FaBell, 
  FaMoon, 
  FaSun, 
  FaSearch,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
  FaQuestionCircle,
  FaDownload,
  FaTrophy,
  FaBullseye,
  FaHeart
} from "react-icons/fa";

const MotionBox = motion(Box);

const links = [
  { href: "/dashboard", icon: FaChartBar, label: "Dashboard", badge: null },
  { href: "/employees", icon: FaUsers, label: "Employees", badge: "6" },
  { href: "/reports", icon: FaFileAlt, label: "Reports", badge: "3" },
  { href: "/rewards", icon: FaTrophy, label: "Rewards", badge: "New", badgeColor: "orange" },
  { href: "/goals", icon: FaBullseye, label: "Goals", badge: "4", badgeColor: "green" },
  { href: "/wellness", icon: FaHeart, label: "Wellness", badge: null },
];

const bottomLinks = [
  { href: "/profile", icon: FaUserCircle, label: "Profile" },
  { href: "/settings", icon: FaCog, label: "Settings" },
];

export default function Sidebar() {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  
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
        w="320px"
        minH="100vh"
        py={6}
        px={5}
        position="fixed"
        left={0}
        top={0}
        boxShadow="0 4px 12px rgba(82, 160, 82, 0.3)"
        zIndex={1000}
      >
        <Box h="100vh" display="flex" flexDirection="column">
          {/* Top Section */}
          <Box flex="1">
            {/* Logo */}
            <MotionBox
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              mb={4}
            >
              <Flex direction="column" align="center" justify="center" mb={4}>
                <WorkZenLogo size="lg" showSlogan={false} />
                <Text 
                  fontWeight="bold" 
                  fontSize="4xl" 
                  color="white"
                  letterSpacing="tight"
                  mt={3}
                  fontFamily="'Poppins', 'Inter', sans-serif"
                >
                  WorkZen
                </Text>
                <Text
                  fontSize="lg"
                  color="rgba(255,255,255,0.95)"
                  fontWeight="600"
                  textAlign="center"
                  fontStyle="italic"
                  fontFamily="'Poppins', 'Inter', sans-serif"
                  whiteSpace="nowrap"
                  letterSpacing="normal"
                  mt={3}
                >
                  Work better. Work human.
                </Text>
              </Flex>
            </MotionBox>

            {/* Controls Section */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              mb={3}
            >
              <VStack spacing={3} align="stretch" px={3}>
                <HStack spacing={4} justify="center">
                  {/* Color Mode Toggle */}
                  <Tooltip label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`} placement="bottom">
                    <IconButton
                      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
                      aria-label="Toggle color mode"
                      variant="ghost"
                      size="xl"
                      borderRadius="lg"
                      onClick={toggleColorMode}
                      color="rgba(255,255,255,0.8)"
                      _hover={{ bg: "rgba(255,255,255,0.1)", color: "white" }}
                    />
                  </Tooltip>

                  {/* Notifications */}
                  <Menu>
                    <Tooltip label="Notifications" placement="bottom">
                      <MenuButton
                        as={IconButton}
                        icon={
                          <Box position="relative">
                            <FaBell />
                            <Badge
                              position="absolute"
                              top="-1"
                              right="-1"
                              fontSize="2xs"
                              colorScheme="red"
                              borderRadius="full"
                              minW="18px"
                              h="18px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              3
                            </Badge>
                          </Box>
                        }
                        variant="ghost"
                        size="xl"
                        borderRadius="lg"
                        color="rgba(255,255,255,0.8)"
                        _hover={{ bg: "rgba(255,255,255,0.1)", color: "white" }}
                      />
                    </Tooltip>
                    <MenuList borderRadius="lg" border="1px solid" borderColor={borderColor}>
                      <Box px={4} py={2} borderBottom="1px solid" borderColor={borderColor}>
                        <Text fontWeight="semibold" fontSize="sm">Notifications</Text>
                        <Text fontSize="xs" color="gray.500">You have 3 new notifications</Text>
                      </Box>
                      <MenuItem fontSize="sm">
                        <VStack align="flex-start" spacing={1}>
                          <Text fontWeight="medium">New team member joined</Text>
                          <Text fontSize="xs" color="gray.500">Sarah Connor joined the Design team</Text>
                        </VStack>
                      </MenuItem>
                      <MenuItem fontSize="sm">
                        <VStack align="flex-start" spacing={1}>
                          <Text fontWeight="medium">Weekly report ready</Text>
                          <Text fontSize="xs" color="gray.500">Your productivity report is ready</Text>
                        </VStack>
                      </MenuItem>
                      <MenuItem fontSize="sm">
                        <VStack align="flex-start" spacing={1}>
                          <Text fontWeight="medium">Goal achievement</Text>
                          <Text fontSize="xs" color="gray.500">Team exceeded monthly target</Text>
                        </VStack>
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem fontSize="sm" color="brand.500" fontWeight="medium">
                        View all notifications
                      </MenuItem>
                    </MenuList>
                  </Menu>

                  {/* User Menu */}
                  <Menu>
                    <MenuButton
                      as={Avatar}
                      name="Alice Johnson"
                      size="lg"
                      src="https://api.dicebear.com/7.x/adventurer/svg?seed=Alice"
                      cursor="pointer"
                      border="2px solid rgba(255,255,255,0.3)"
                      _hover={{ 
                        borderColor: "rgba(255,255,255,0.6)",
                        boxShadow: "0 0 0 2px rgba(255,255,255,0.2)"
                      }}
                    />
                    <MenuList borderRadius="lg" border="1px solid" borderColor={borderColor}>
                      <Box px={4} py={3} borderBottom="1px solid" borderColor={borderColor}>
                        <HStack>
                          <Avatar 
                            name="Alice Johnson" 
                            size="sm" 
                            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Alice"
                          />
                          <VStack align="flex-start" spacing={0}>
                            <Text fontWeight="semibold" fontSize="sm">Alice Johnson</Text>
                            <Text fontSize="xs" color="gray.500">alice@workzen.com</Text>
                          </VStack>
                        </HStack>
                      </Box>
                      
                      <MenuItem icon={<FaUser />} fontSize="sm">
                        View Profile
                      </MenuItem>
                      <MenuItem icon={<FaCog />} fontSize="sm">
                        Settings
                      </MenuItem>
                      <MenuItem icon={<FaQuestionCircle />} fontSize="sm">
                        Help & Support
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem icon={<FaSignOutAlt />} fontSize="sm" color="red.500">
                        Sign Out
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </VStack>
            </MotionBox>

            {/* Main Navigation */}
            <Box mb={2}>
              <Text 
                fontSize="sm" 
                fontWeight="semibold" 
                color="rgba(255,255,255,0.7)" 
                textTransform="uppercase" 
                letterSpacing="wider"
                mb={2}
                px={3}
              >
                Main Menu
              </Text>
              <VStack spacing={1} align="stretch">
                {links.map(({ href, icon, label, badge, badgeColor }, index) => (
                  <MotionBox
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                  >
                    <Link href={href} passHref legacyBehavior>
                      <MotionBox
                        as="a"
                        w="100%"
                        py={2}
                        px={3}
                        borderRadius="xl"
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
                        textDecoration="none"
                        cursor="pointer"
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
                            fontSize="lg"
                          >
                            {label}
                          </Text>
                        </Flex>
                        {badge && (
                          <Badge 
                            bg={badgeColor ? `${badgeColor}.500` : "mindful.500"} 
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
            <Box mt={2}>
              <Text 
                fontSize="sm" 
                fontWeight="semibold" 
                color="rgba(255,255,255,0.7)" 
                textTransform="uppercase" 
                letterSpacing="wider"
                mb={2}
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
                    <Link href={href} passHref legacyBehavior>
                      <MotionBox
                        as="a"
                        w="100%"
                        py={2}
                        px={3}
                        borderRadius="xl"
                        display="flex"
                        alignItems="center"
                        gap={3}
                        variants={linkVariants}
                        initial="inactive"
                        animate={router.pathname === href ? "active" : "inactive"}
                        whileHover="hover"
                        border="1px solid"
                        borderColor={router.pathname === href ? "rgba(255,255,255,0.2)" : "transparent"}
                        textDecoration="none"
                        cursor="pointer"
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
                          fontSize="md"
                        >
                          {label}
                        </Text>
                      </MotionBox>
                    </Link>
                  </MotionBox>
                ))}
              </VStack>
            </Box>
          </Box>
        </Box>
      </Box>
    </MotionBox>
  );
}
