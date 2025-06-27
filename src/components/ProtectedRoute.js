import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Spinner, VStack, Text } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null, redirectTo = '/login' }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If not authenticated, redirect to login
      if (!user) {
        router.push(redirectTo);
        return;
      }

      // If role is required and user doesn't have it, redirect
      if (requiredRole && user.role !== requiredRole) {
        // Redirect based on user's actual role
        if (user.role === 'manager') {
          router.push('/admin/dashboard-simple');
        } else if (user.role === 'employee') {
          router.push('/employee/dashboard');
        } else {
          router.push('/login');
        }
        return;
      }
    }
  }, [user, loading, router, requiredRole, redirectTo]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <Box 
        minH="100vh" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        bgGradient="linear(135deg, zen.50 0%, mindful.100 30%, zen.100 100%)"
      >
        <VStack spacing={4}>
          <Spinner 
            size="xl" 
            color="zen.500"
            thickness="4px"
          />
          <Text color="gray.600" fontSize="lg">
            Loading WorkZen...
          </Text>
        </VStack>
      </Box>
    );
  }

  // If not authenticated, don't render anything (redirect will happen)
  if (!user) {
    return null;
  }

  // If role is required and user doesn't have it, don't render anything
  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  // If everything is good, render the children
  return children;
};

export default ProtectedRoute;
