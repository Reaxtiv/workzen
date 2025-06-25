import { Box, Text, Image } from "@chakra-ui/react";

export default function WorkZenLogo({ size = "md", showSlogan = true }) {  const sizes = {
    sm: { width: "70px", height: "70px" },
    md: { width: "100px", height: "100px" },
    lg: { width: "140px", height: "140px" },
    xl: { width: "180px", height: "180px" },
    "2xl": { width: "220px", height: "220px" }
  };

  const currentSize = sizes[size];

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {/* Logo usando la imagen directa */}
      <Image
        src="/images/workzen.jpg"
        alt="WorkZen Logo"
        width={currentSize.width}
        height={currentSize.height}
        borderRadius="full"
        objectFit="cover"
        border="2px solid rgba(255,255,255,0.3)"
        boxShadow="0 4px 12px rgba(0,0,0,0.2)"
      />
    </Box>
  );
}
