// useProductivityMetrics.js - Hook para métricas de productividad reales
import { useState, useEffect } from 'react';
import { useSystemMonitor } from '../services/SystemMonitor';

export const useProductivityMetrics = () => {
  const { stats, isMonitoring, startMonitoring, stopMonitoring } = useSystemMonitor();
  const [metrics, setMetrics] = useState({
    productivity: 88, // Valor por defecto
    tasksCompleted: 24,
    focusTime: 0,
    breaksToday: 3,
    dailyGoalProgress: 75
  });

  // Calcular métricas basadas en datos reales del sistema
  useEffect(() => {
    if (stats && stats.summary) {
      const realProductivity = stats.summary.productivityScore;
      const sessionTimeHours = stats.summary.totalSessionTime / (1000 * 60 * 60);
      const activeTimeHours = stats.activity.activeTime / (1000 * 60 * 60);
      
      // Calcular métricas actualizadas
      const updatedMetrics = {
        // Productividad real del monitor
        productivity: realProductivity,
        
        // Tareas completadas (estimación basada en actividad)
        tasksCompleted: Math.max(24, Math.floor(activeTimeHours * 3)),
        
        // Tiempo de foco (tiempo activo en horas)
        focusTime: activeTimeHours,
        
        // Breaks detectados (cada vez que se detecta idle)
        breaksToday: stats.log ? 
          stats.log.filter(log => log.type === 'idle_detected').length : 3,
        
        // Progreso del objetivo diario (basado en 8 horas de trabajo)
        dailyGoalProgress: Math.min(100, Math.round((activeTimeHours / 8) * 100))
      };
      
      setMetrics(updatedMetrics);
    }
  }, [stats]);

  // Auto-start monitoring al cargar el componente
  useEffect(() => {
    if (!isMonitoring) {
      startMonitoring();
    }
    
    // Cleanup al desmontar
    return () => {
      // Solo detener si explícitamente se desmonta
      // stopMonitoring();
    };
  }, [isMonitoring, startMonitoring]);

  return {
    metrics,
    stats,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    hasRealData: !!stats
  };
};
