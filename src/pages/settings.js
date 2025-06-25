import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Switch, 
  Select, 
  Button, 
  Divider,
  Grid,
  GridItem,
  useColorModeValue,
  Badge,
  Avatar,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";

const MotionBox = motion(Box);

export default function SettingsPage() {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
    return (
    <Layout>
      <Box bgGradient="linear(135deg, zen.50 0%, mindful.100 30%, zen.100 100%)" minH="100vh">
        <Box p={8}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >            <Heading 
              size="2xl" 
              bgGradient="linear(to-r, #52A052, #4FC3F7)" 
              bgClip="text"
              fontWeight="bold"
              mb={8}
              css={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Settings
            </Heading>
        
        <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6}>
          {/* General Settings */}
          <GridItem>
            <Box 
              bg={cardBg} 
              p={6} 
              borderRadius="xl" 
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
            >
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                  General Settings
                </Heading>
                <Divider />
                
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium" fontSize="lg">Dark Mode</Text>
                    <Text fontSize="sm" color="gray.500">Toggle between light and dark theme</Text>
                  </VStack>
                  <Switch colorScheme="green" size="lg" />
                </HStack>
                
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium" fontSize="lg">Notifications</Text>
                    <Text fontSize="sm" color="gray.500">Receive push notifications</Text>
                  </VStack>
                  <Switch colorScheme="green" size="lg" defaultChecked />
                </HStack>
                
                <FormControl>
                  <FormLabel fontSize="lg" fontWeight="medium">Language</FormLabel>
                  <Select fontSize="lg">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </Select>
                </FormControl>
              </VStack>
            </Box>
          </GridItem>
          
          {/* Profile Settings */}
          <GridItem>
            <Box 
              bg={cardBg} 
              p={6} 
              borderRadius="xl" 
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
            >
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                  Profile Settings
                </Heading>
                <Divider />
                
                <HStack>
                  <Avatar 
                    name="Alice Johnson" 
                    size="lg" 
                    src="https://api.dicebear.com/7.x/adventurer/svg?seed=Alice"
                    border="3px solid"
                    borderColor="zen.400"
                    boxShadow="0 4px 12px rgba(82, 160, 82, 0.2)"
                  />
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold" fontSize="lg">Alice Johnson</Text>
                    <Badge colorScheme="green" fontSize="sm">Product Manager</Badge>
                  </VStack>
                </HStack>
                
                <FormControl>
                  <FormLabel fontSize="lg" fontWeight="medium">Display Name</FormLabel>
                  <Input placeholder="Alice Johnson" fontSize="lg" />
                </FormControl>
                
                <FormControl>
                  <FormLabel fontSize="lg" fontWeight="medium">Email</FormLabel>
                  <Input placeholder="alice@workzen.com" fontSize="lg" />
                </FormControl>
                
                <Button colorScheme="green" size="lg">
                  Update Profile
                </Button>
              </VStack>
            </Box>
          </GridItem>
          
          {/* Productivity Settings */}
          <GridItem>
            <Box 
              bg={cardBg} 
              p={6} 
              borderRadius="xl" 
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
            >
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                  Productivity Settings
                </Heading>
                <Divider />
                
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium" fontSize="lg">Auto Tracking</Text>
                    <Text fontSize="sm" color="gray.500">Automatically track work sessions</Text>
                  </VStack>
                  <Switch colorScheme="green" size="lg" defaultChecked />
                </HStack>
                
                <FormControl>
                  <FormLabel fontSize="lg" fontWeight="medium">Break Reminders</FormLabel>
                  <Select fontSize="lg">
                    <option>Every 30 minutes</option>
                    <option>Every hour</option>
                    <option>Every 2 hours</option>
                    <option>Disabled</option>
                  </Select>
                </FormControl>
                
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium" fontSize="lg">Focus Mode</Text>
                    <Text fontSize="sm" color="gray.500">Block distracting websites</Text>
                  </VStack>
                  <Switch colorScheme="green" size="lg" />
                </HStack>
              </VStack>
            </Box>
          </GridItem>
          
          {/* Company Settings */}
          <GridItem>
            <Box 
              bg={cardBg} 
              p={6} 
              borderRadius="xl" 
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
            >
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                  Company Settings
                </Heading>
                <Divider />
                
                <FormControl>
                  <FormLabel fontSize="lg" fontWeight="medium">Company Name</FormLabel>
                  <Input placeholder="WorkZen Technologies" fontSize="lg" />
                </FormControl>
                
                <FormControl>
                  <FormLabel fontSize="lg" fontWeight="medium">Work Hours</FormLabel>
                  <Select fontSize="lg">
                    <option>9:00 AM - 5:00 PM</option>
                    <option>8:00 AM - 4:00 PM</option>
                    <option>10:00 AM - 6:00 PM</option>
                    <option>Flexible</option>
                  </Select>
                </FormControl>
                
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium" fontSize="lg">Team Analytics</Text>
                    <Text fontSize="sm" color="gray.500">Share productivity insights</Text>
                  </VStack>
                  <Switch colorScheme="green" size="lg" defaultChecked />
                </HStack>
                
                <Button colorScheme="blue" size="lg">
                  Save Company Settings
                </Button>              </VStack>
            </Box>
          </GridItem>
        </Grid>
          </MotionBox>
        </Box>
      </Box>
    </Layout>
  );
}