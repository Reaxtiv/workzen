import { Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const MotionBox = motion(Box);

// Updated: 2025-06-25 - Fixed sidebar slogan display
export default function Layout({ children }) {
  const bg = useColorModeValue("white", "gray.900");
    return (
    <Box minH="100vh" bg={bg}>
      <Sidebar />
      <TopBar />      <MotionBox
        ml="280px"
        pt="60px"
        p={8}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        minH="100vh"
      >
        {children}
      </MotionBox>
    </Box>
  );
}