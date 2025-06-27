import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirigir inmediatamente al login
    router.push('/login');
  }, [router]);
  
  // Mostrar una pantalla mínima mientras se hace la redirección
  return null;
}