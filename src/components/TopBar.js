import { 
  Box, 
  Flex, 
  Avatar, 
  Text, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  MenuDivider,
  useColorModeValue,
  Badge,
  HStack,
  Button,
  Icon
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { FaSignOutAlt, FaUser, FaCog, FaChevronDown } from "react-icons/fa";

export default function TopBar() {
  const { user, logout } = useAuth();
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleLogout = () => {
    logout();
  };

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      left="280px"
      zIndex={10}
      h="60px"
      bgGradient="linear(to-r, zen.500, mindful.600)"
      borderBottom="1px solid"
      borderColor="zen.400"
      boxShadow="0 2px 8px rgba(82, 160, 82, 0.2)"
    >
      <Flex h="full" align="center" justify="flex-end" px={6}>
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            rightIcon={<FaChevronDown />}
            color="white"
            _hover={{ bg: "rgba(255,255,255,0.1)" }}
            _active={{ bg: "rgba(255,255,255,0.2)" }}
          >
            <HStack spacing={3}>
              <Avatar size="sm" src={user?.avatar} name={user?.name} />
              <Box textAlign="left">
                <Text fontSize="sm" fontWeight="medium" color="white">
                  {user?.name}
                </Text>
                <Badge 
                  colorScheme={user?.role === 'manager' ? 'blue' : 'green'} 
                  size="sm"
                  textTransform="capitalize"
                  variant="solid"
                >
                  {user?.role}
                </Badge>
              </Box>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FaUser />}>
              My Profile
            </MenuItem>
            <MenuItem icon={<FaCog />}>
              Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}