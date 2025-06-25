import { Box } from "@chakra-ui/react";

export default function TopBar() {
  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      left="280px"
      zIndex={1}
      h="60px"
      bg="transparent"
      pointerEvents="none"
    />
  );
}