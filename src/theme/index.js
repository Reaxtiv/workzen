import { extendTheme } from "@chakra-ui/react";

// Paleta de colores ZEN simplificada
const colors = {
  // Verde zen principal
  zen: {
    50: "#F0F4F0",
    100: "#D9E5D9",
    200: "#B8D4B8",
    300: "#96C396",
    400: "#75B175",
    500: "#52A052",
    600: "#4A8F4A",
    700: "#3D7A3D",
    800: "#2F5F2F",
    900: "#1F3F1F",
  },
  
  // Azul serenidad
  serenity: {
    50: "#E8F4F8",
    100: "#B8E0E8",
    200: "#88CCD8",
    300: "#58B8C8",
    400: "#28A4B8",
    500: "#2E8B9F",
    600: "#256B7F",
    700: "#1C4B5F",
    800: "#132B3F",
    900: "#0A0B1F",
  },
  
  // Gris cromado elegante
  mindful: {
    50: "#F8F9FA",
    100: "#F1F3F4",
    200: "#E8EAED",
    300: "#DADCE0",
    400: "#BDC1C6",
    500: "#9AA0A6",
    600: "#80868B",
    700: "#5F6368",
    800: "#3C4043",
    900: "#202124",  },
  
  // Colores funcionales con toque zen
  productive: {
    50: "#E8F5E8",
    500: "#4CAF50",
    600: "#388E3C",
  },
  
  rest: {
    50: "#E3F2FD", 
    500: "#2196F3",
    600: "#1976D2",
  },
  
  distraction: {
    50: "#FFF3E0",
    500: "#FF9800",
    600: "#F57C00",
  },
  
  warning: {
    50: "#FFF8E1",
    500: "#FFC107",
    600: "#FFA000",
  }
};

// Tipografía zen - limpia y legible con Poppins
const fonts = {
  heading: "'Poppins', 'Inter', 'Noto Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  body: "'Poppins', 'Inter', 'Noto Sans', -apple-system, BlinkMacSystemFont, sans-serif",
};

// Configuración global
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Estilos globales zen
const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === "dark" ? "zen.900" : "zen.50",
      color: props.colorMode === "dark" ? "zen.50" : "zen.800",
      fontFamily: "Inter, sans-serif",
    },
    "*": {
      borderColor: props.colorMode === "dark" ? "zen.700" : "zen.200",
    },
    // Ensure SVG icons render properly
    "svg": {
      display: "inline-block",
      verticalAlign: "middle",
    },
    ".chakra-icon": {
      display: "inline-block !important",
      verticalAlign: "middle !important",
    }
  }),
};

// Componentes con diseño zen
const components = {
  Button: {
    baseStyle: {
      fontWeight: "medium",
      borderRadius: "lg",
      transition: "all 0.2s ease",
      _focus: {
        boxShadow: "0 0 0 3px rgba(46, 139, 87, 0.1)",
      },
    },
    variants: {
      zen: {
        bg: "zen.500",
        color: "white",
        _hover: {
          bg: "zen.600",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(46, 139, 87, 0.3)",
        },
        _active: {
          transform: "translateY(0)",
        },
      },
      serenity: {
        bg: "serenity.500",
        color: "white",
        _hover: {
          bg: "serenity.600",
          transform: "translateY(-1px)",
        },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: "xl",
        boxShadow: "0 2px 8px rgba(46, 139, 87, 0.08)",
        border: "1px solid",
        borderColor: "zen.200",
        bg: "white",
        _dark: {
          borderColor: "zen.700",
          bg: "zen.800",
        },
      },
    },
  },
};

const theme = extendTheme({
  colors,
  fonts,
  config,
  styles,
  components,
  shadows: {
    zenSoft: "0 2px 8px rgba(46, 139, 87, 0.12)",
    zenMedium: "0 4px 16px rgba(46, 139, 87, 0.16)",
    zenStrong: "0 8px 32px rgba(46, 139, 87, 0.24)",
  },
});

export default theme;
