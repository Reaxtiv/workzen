import SimpleLayout from "../components/SimpleLayout";
import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Text, 
  Progress,
  Avatar,
  VStack,
  HStack,
  Badge
} from "@chakra-ui/react";

// Datos de prueba simples
const users = [
  { id: 1, name: "Alice Johnson", productivity: 92 },
  { id: 2, name: "Bob Smith", productivity: 78 },
  { id: 3, name: "Carol Davis", productivity: 85 },
];

function SimpleUserCard({ user }) {
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <HStack spacing={4} mb={4}>
        <Avatar name={user.name} size="md" />
        <VStack align="flex-start" spacing={1}>
          <Text fontWeight="bold" fontSize="lg">{user.name}</Text>
          <Badge colorScheme="blue" variant="subtle">Team Member</Badge>
        </VStack>
      </HStack>
      <Text color="gray.600" mb={2}>Productivity: {user.productivity}%</Text>
      <Progress value={user.productivity} size="lg" colorScheme="blue" borderRadius="full" />
    </Box>
  );
}

export default function TestDashboard() {  return (
    <SimpleLayout>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="xl" color="brand.600" mb={2}>
            Dashboard de Productividad
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Monitorea el rendimiento de tu equipo
          </Text>
        </Box>

        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {users.map(user => (
            <SimpleUserCard key={user.id} user={user} />
          ))}
        </SimpleGrid>

        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4}>Métricas del Equipo</Heading>
          <SimpleGrid columns={[1, 3]} spacing={6}>
            <Box textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="brand.500">3</Text>
              <Text color="gray.600">Empleados Activos</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="green.500">85%</Text>
              <Text color="gray.600">Productividad Promedio</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="purple.500">40h</Text>
              <Text color="gray.600">Horas Esta Semana</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </VStack>
    </SimpleLayout>
  );
}
