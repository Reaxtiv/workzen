import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

export default function DashboardRedirect() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.role === 'manager') {
        router.push('/admin/dashboard-simple');
      } else {
        router.push('/employee/dashboard');
      }
    }
  }, [user, loading, router]);

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={4}>
        <Spinner size="xl" color="blue.500" />
        <Text>Redirecting to your dashboard...</Text>
      </VStack>
    </Box>
  );
}
