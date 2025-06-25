import { useState } from "react";
import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Avatar,
  Text, 
  Badge, 
  Button, 
  Stack, 
  Input, 
  Select, 
  useColorModeValue,
  HStack,
  VStack,
  Progress
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import PieChart from "../components/PieChartNew";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const MotionBox = motion(Box);

const employees = [
  { id: 1, name: "Alice Johnson", position: "Senior Developer", status: "Active", productivity: 90, gender: "female", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alice" },
  { id: 2, name: "Bob Martinez", position: "UX Designer", status: "Inactive", productivity: 75, gender: "male", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bob" },
  { id: 3, name: "Carol Smith", position: "Product Manager", status: "Active", productivity: 85, gender: "female", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carol" },
  { id: 4, name: "David Wilson", position: "Backend Developer", status: "Active", productivity: 92, gender: "male", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=David" },
  { id: 5, name: "Emma Brown", position: "Frontend Developer", status: "Active", productivity: 88, gender: "female", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma" },
  { id: 6, name: "Frank Davis", position: "DevOps Engineer", status: "Active", productivity: 80, gender: "male", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Frank" }
];

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter ? emp.status === statusFilter : true)
  );  return (
    <Layout>
      <Box bgGradient={useColorModeValue(
        "linear(135deg, zen.50 0%, mindful.100 30%, zen.100 100%)",
        "linear(135deg, gray.900 0%, gray.800 30%, gray.700 100%)"
      )} minH="100vh">
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
              Employees
            </Heading>
        
        <Box mb={6} display="flex" gap={4} alignItems="center">
          <Input
            placeholder="Search by name"
            value={search}
            onChange={e => setSearch(e.target.value)}
            maxW="300px"
            bg={cardBg}
            boxShadow="lg"
            borderRadius="xl"
            fontSize="lg"
            border="1px solid"
            borderColor={borderColor}
          />
          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            maxW="250px"
            bg={cardBg}
            boxShadow="lg"
            borderRadius="xl"
            fontSize="lg"
            border="1px solid"
            borderColor={borderColor}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>          </Select>
        </Box>
          {/* Team Statistics */}        <Box mb={8}>
          <SimpleGrid columns={[1, 2]} spacing={8}>
            <Box h="380px">
              <PieChart 
                data={[
                  { name: "Active", value: employees.filter(emp => emp.status === "Active").length },
                  { name: "Inactive", value: employees.filter(emp => emp.status === "Inactive").length }
                ]}
                title="Team Status Overview"
                size="sm"
              />
            </Box>
            
            <Box h="380px">
              <PieChart 
                data={[
                  { name: "Developers", value: employees.filter(emp => emp.position.includes("Developer")).length },
                  { name: "Designers", value: employees.filter(emp => emp.position.includes("Designer")).length },
                  { name: "Managers", value: employees.filter(emp => emp.position.includes("Manager")).length },
                  { name: "Engineers", value: employees.filter(emp => emp.position.includes("Engineer")).length }
                ].filter(item => item.value > 0)}
                title="Role Distribution"
                size="sm"
              />
            </Box>
          </SimpleGrid>
        </Box>
        <SimpleGrid columns={[1, null, 2, 3]} spacing={6}>
          {filtered.map((emp, index) => (
            <MotionBox
              key={emp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >              <Box
                bg={cardBg}
                p={6}
                borderRadius="xl"
                boxShadow="lg"
                border="1px solid"
                borderColor={borderColor}
                _hover={{ 
                  transform: "translateY(-2px)", 
                  boxShadow: "xl",
                  borderColor: "green.300"
                }}
                transition="all 0.2s"
                cursor="pointer"
              ><VStack spacing={4}>                  <Avatar 
                    src={emp.avatar}
                    name={emp.name}
                    size="xl" 
                    border="3px solid"
                    borderColor="zen.400"
                    boxShadow="0 4px 12px rgba(82, 160, 82, 0.2)"
                  />
                  <VStack spacing={2} textAlign="center">
                    <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                      {emp.name}
                    </Heading>
                    <Text fontSize="lg" color="gray.500">
                      {emp.position}
                    </Text>
                    <Badge 
                      colorScheme={emp.status === "Active" ? "green" : "red"} 
                      fontSize="sm"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {emp.status}
                    </Badge>
                  </VStack>                  <Box w="full">
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="medium" fontSize="lg">Productivity</Text>
                      <Text fontSize="lg" color="green.500">{emp.productivity}%</Text>
                    </HStack>
                    <Progress 
                      value={emp.productivity} 
                      colorScheme="green" 
                      size="lg" 
                      borderRadius="md" 
                    />
                  </Box>
                  
                  <Link href={`/employees/${emp.id}`} passHref>
                    <Button 
                      as="a"
                      rightIcon={<FaChevronRight />} 
                      colorScheme="green" 
                      variant="outline"
                      size="lg"                      w="full"
                      fontSize="lg"
                    >
                      View Details
                    </Button>
                  </Link>
                </VStack>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>
          </MotionBox>
        </Box>
      </Box>
    </Layout>
  );
}