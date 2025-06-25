import { Box, Text } from "@chakra-ui/react";

export default function WorkZenLogo({ size = "md", showSlogan = true }) {
  const sizes = {
    sm: { width: "40px", height: "40px" },
    md: { width: "60px", height: "60px" },
    lg: { width: "80px", height: "80px" },
    xl: { width: "100px", height: "100px" }
  };

  const currentSize = sizes[size];

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {/* Logo SVG - Recreación exacta de la imagen */}
      <Box
        width={currentSize.width}
        height={currentSize.height}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <svg
          width={currentSize.width}
          height={currentSize.height}
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Círculo verde exterior con efecto de pincel */}
          <circle
            cx="50"
            cy="50"
            r="47"
            stroke="#52A052"
            strokeWidth="4"
            fill="none"
            opacity="0.9"
          />
          
          {/* Círculo verde interior sutil */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="#52A052"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
          
          {/* Portátil - Base/teclado */}
          <rect
            x="28"
            y="48"
            width="44"
            height="18"
            rx="3"
            fill="#52A052"
            opacity="0.9"
          />
          
          {/* Portátil - Pantalla */}
          <rect
            x="30"
            y="32"
            width="40"
            height="24"
            rx="2"
            fill="#52A052"
            opacity="0.8"
          />
          
          {/* Pantalla interior (más oscura) */}
          <rect
            x="32"
            y="34"
            width="36"
            height="20"
            rx="1"
            fill="#388E3C"
            opacity="0.9"
          />
          
          {/* Hojas - Hoja izquierda */}
          <path
            d="M42 44 C38 40, 38 36, 42 34 C46 36, 46 40, 42 44"
            fill="#66BB6A"
          />
          
          {/* Hojas - Hoja derecha */}
          <path
            d="M58 44 C54 40, 54 36, 58 34 C62 36, 62 40, 58 44"
            fill="#66BB6A"
          />
          
          {/* Hojas - Hoja central superior */}
          <path
            d="M50 40 C46 36, 46 32, 50 30 C54 32, 54 36, 50 40"
            fill="#4CAF50"
          />
          
          {/* Tallo/conexión */}
          <rect
            x="49"
            y="40"
            width="2"
            height="8"
            fill="#388E3C"
            rx="1"
          />
          
          {/* Pequeños detalles en las hojas */}
          <circle cx="44" cy="38" r="1" fill="#81C784" opacity="0.7" />
          <circle cx="56" cy="38" r="1" fill="#81C784" opacity="0.7" />
          <circle cx="50" cy="34" r="1" fill="#81C784" opacity="0.7" />
        </svg>
      </Box>
    </Box>
  );
}
