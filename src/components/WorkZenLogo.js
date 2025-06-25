import { Box, Text, VStack } from "@chakra-ui/react";

export default function WorkZenLogo({ size = "md", showSlogan = false }) {
  const sizes = {
    sm: { w: "40px", h: "32px", fontSize: "xs" },
    md: { w: "56px", h: "40px", fontSize: "sm" },
    lg: { w: "72px", h: "48px", fontSize: "md" }
  };
  
  const currentSize = sizes[size];
  
  return (
    <VStack spacing={2} align="center">
      {/* Logo SVG */}
      <Box position="relative" display="inline-block">
        <svg
          width={currentSize.w}
          height={currentSize.h}
          viewBox="0 0 56 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Portátil - Marco dorado */}
          <rect
            x="6"
            y="4"
            width="44"
            height="28"
            rx="3"
            fill="#1A202C"
            stroke="#D69E2E"
            strokeWidth="2"
          />
          
          {/* Pantalla interna */}
          <rect
            x="8"
            y="6"
            width="40"
            height="24"
            rx="2"
            fill="#2D3748"
          />
          
          {/* Base del portátil - dorado */}
          <ellipse
            cx="28"
            cy="34"
            rx="25"
            ry="4"
            fill="#D69E2E"
            opacity="0.8"
          />
          
          {/* Teclado - negro con detalles dorados */}
          <rect
            x="8"
            y="30"
            width="40"
            height="6"
            rx="2"
            fill="#1A202C"
            stroke="#D69E2E"
            strokeWidth="1"
          />
          
          {/* Árbol brotando de la pantalla - más detallado */}
          <g transform="translate(22, 14)">
            {/* Tronco principal */}
            <rect
              x="5"
              y="10"
              width="2"
              height="8"
              rx="1"
              fill="#8B4513"
            />
            
            {/* Ramas */}
            <line x1="4" y1="12" x2="6" y2="10" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="8" y1="12" x2="6" y2="10" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Hojas verdes orgánicas */}
            <circle cx="3" cy="10" r="3" fill="#38A169" opacity="0.9" />
            <circle cx="9" cy="10" r="3" fill="#38A169" opacity="0.9" />
            <circle cx="6" cy="7" r="4" fill="#48BB78" opacity="0.9" />
            <circle cx="4" cy="5" r="2.5" fill="#68D391" opacity="0.8" />
            <circle cx="8" cy="5" r="2.5" fill="#68D391" opacity="0.8" />
            
            {/* Detalles dorados en las hojas */}
            <circle cx="6" cy="7" r="1" fill="#D69E2E" opacity="0.6" />
            <circle cx="3" cy="10" r="0.5" fill="#D69E2E" opacity="0.7" />
            <circle cx="9" cy="10" r="0.5" fill="#D69E2E" opacity="0.7" />
          </g>
        </svg>
      </Box>
      
      {/* Slogan */}
      {showSlogan && (
        <Text
          fontSize="xs"
          color="gray.400"
          fontWeight="500"
          textAlign="center"
          fontStyle="italic"
        >
          Work better. Work human.
        </Text>
      )}
    </VStack>
  );
}
