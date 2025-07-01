// SystemMonitor.js - Monitoreo real del sistema
import { useState, useEffect, useRef } from 'react';

class SystemMonitor {
  constructor() {
    this.isActive = false;
    this.startTime = null;
    this.lastActivity = Date.now();
    this.activityLog = [];
    this.idleTimeout = 5 * 60 * 1000; // 5 minutos de inactividad
    this.productivityScore = 0;
  }

  // 📊 Detectar actividad del usuario
  detectUserActivity() {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, () => {
        this.lastActivity = Date.now();
        this.isActive = true;
        this.logActivity('user_active', { timestamp: Date.now() });
      }, true);
    });
  }

  // 🖥️ Obtener información del sistema (API Web)
  async getSystemInfo() {
    const info = {
      // Información básica del navegador/sistema
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      onLine: navigator.onLine,
      
      // Información de la ventana/pantalla
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      
      // Información de memoria (si está disponible)
      memory: navigator.deviceMemory || 'unknown',
      hardwareConcurrency: navigator.hardwareConcurrency || 1,
      
      // Información de conexión
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      } : 'unknown',
      
      timestamp: Date.now()
    };

    return info;
  }

  // ⏱️ Trackear tiempo de trabajo
  async trackWorkingTime() {
    const now = Date.now();
    const timeSinceLastActivity = now - this.lastActivity;
    
    // Si ha estado inactivo más de 5 minutos, se considera break
    if (timeSinceLastActivity > this.idleTimeout) {
      this.isActive = false;
      this.logActivity('idle_detected', { 
        idleTime: timeSinceLastActivity,
        timestamp: now 
      });
    }

    return {
      isActive: this.isActive,
      activeTime: this.getActiveTime(),
      idleTime: timeSinceLastActivity,
      lastActivity: this.lastActivity,
      productivityScore: this.calculateProductivityScore()
    };
  }

  // 🎯 Calcular score de productividad
  calculateProductivityScore() {
    const activeTime = this.getActiveTime();
    const totalTime = Date.now() - (this.startTime || Date.now());
    
    if (totalTime === 0) return 0;
    
    const activeRatio = activeTime / totalTime;
    const score = Math.min(100, Math.round(activeRatio * 100));
    
    this.productivityScore = score;
    return score;
  }

  // ⏰ Obtener tiempo activo total
  getActiveTime() {
    const activeEntries = this.activityLog.filter(log => log.type === 'user_active');
    return activeEntries.length * 1000; // Aproximación básica
  }

  // 📝 Log de actividades
  logActivity(type, data = {}) {
    const entry = {
      type,
      timestamp: Date.now(),
      ...data
    };
    
    this.activityLog.push(entry);
    
    // Mantener solo las últimas 1000 entradas
    if (this.activityLog.length > 1000) {
      this.activityLog = this.activityLog.slice(-1000);
    }
  }

  // 🕸️ Clasificar actividad web y aplicaciones
  classifyWebActivity(urlOrApp) {
    // Listas de patrones para cada categoría
    const social = [
      'facebook', 'twitter', 'instagram', 'tiktok', 'linkedin', 'pinterest', 'snapchat', 'reddit', 'discord'
    ];
    const messaging = [
      'whatsapp', 'telegram', 'messenger', 'slack', 'teams', 'gmail', 'outlook', 'zoom', 'skype', 'meet', 'webex'
    ];
    const shopping = [
      'amazon', 'ebay', 'aliexpress', 'mercadolibre', 'shopify', 'walmart', 'carrefour', 'zalando', 'shein'
    ];
    const entertainment = [
      'youtube', 'netflix', 'spotify', 'twitch', 'hbo', 'primevideo', 'disneyplus', 'hulu', 'appletv'
    ];
    const productive = [
      'github', 'gitlab', 'notion', 'trello', 'asana', 'workzen', 'office', 'docs', 'sheets', 'drive', 'figma', 'vscode', 'jira', 'confluence', 'stackoverflow'
    ];
    const distractions = [
      'game', 'gaming', 'roblox', 'fortnite', 'steam', 'epicgames', 'minijuegos', 'chess', 'poker', 'bet', 'casino'
    ];

    const str = urlOrApp.toLowerCase();
    if (productive.some(p => str.includes(p))) return 'productive';
    if (social.some(p => str.includes(p))) return 'social';
    if (messaging.some(p => str.includes(p))) return 'messaging';
    if (shopping.some(p => str.includes(p))) return 'shopping';
    if (entertainment.some(p => str.includes(p))) return 'entertainment';
    if (distractions.some(p => str.includes(p))) return 'distraction';
    return 'other';
  }

  // 🕸️ Monitorear cambios de pestaña/ventana activa y registrar actividad web
  monitorWebActivity() {
    const logWeb = () => {
      let url = '';
      try {
        url = window.location.href || document.title || '';
      } catch {
        url = '';
      }
      const category = this.classifyWebActivity(url);
      this.logActivity('web_activity', { url, category });
    };
    window.addEventListener('focus', logWeb);
    window.addEventListener('blur', logWeb);
    setInterval(logWeb, 15000); // Cada 15s
  }

  // 🔄 Iniciar monitoreo
  start() {
    this.startTime = Date.now();
    this.isActive = true;
    this.detectUserActivity();
    this.monitorWebActivity(); // <-- Añadido
    this.logActivity('monitoring_started');
    
    console.log('🖥️ SystemMonitor: Monitoreo iniciado');
  }

  // ⏹️ Detener monitoreo
  stop() {
    this.isActive = false;
    this.logActivity('monitoring_stopped');
    console.log('🖥️ SystemMonitor: Monitoreo detenido');
  }

  // 📊 Obtener estadísticas completas
  async getStats() {
    const systemInfo = await this.getSystemInfo();
    const workingTime = await this.trackWorkingTime();
    
    return {
      system: systemInfo,
      activity: workingTime,
      log: this.activityLog.slice(-50), // Últimas 50 actividades
      summary: {
        sessionStart: this.startTime,
        currentTime: Date.now(),
        totalSessionTime: Date.now() - (this.startTime || Date.now()),
        productivityScore: this.productivityScore,
        isCurrentlyActive: this.isActive
      }
    };
  }
}

// 🎣 Hook para usar el monitor en React
export const useSystemMonitor = () => {
  const [monitor] = useState(() => new SystemMonitor());
  const [stats, setStats] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const intervalRef = useRef();

  // Iniciar monitoreo
  const startMonitoring = () => {
    monitor.start();
    setIsMonitoring(true);
    
    // Actualizar stats cada 10 segundos
    intervalRef.current = setInterval(async () => {
      const currentStats = await monitor.getStats();
      setStats(currentStats);
    }, 10000);
  };

  // Detener monitoreo
  const stopMonitoring = () => {
    monitor.stop();
    setIsMonitoring(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Obtener stats inmediatos
  const getImmediateStats = async () => {
    const currentStats = await monitor.getStats();
    setStats(currentStats);
    return currentStats;
  };

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      monitor.stop();
    };
  }, [monitor]);

  return {
    monitor,
    stats,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    getImmediateStats
  };
};

export default SystemMonitor;
