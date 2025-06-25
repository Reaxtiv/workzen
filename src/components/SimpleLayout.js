import { Box, useColorModeValue } from "@chakra-ui/react";

export default function SimpleLayout({ children }) {
  const bg = useColorModeValue("gray.50", "gray.900");
  
  return (
    <Box minH="100vh" bg={bg} p={8}>
      {children}
    </Box>
  );
}
