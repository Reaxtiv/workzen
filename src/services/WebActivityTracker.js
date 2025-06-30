// WebActivityTracker.js - Tracker de actividad web con categorización (versión corregida)
class WebActivityTracker {
  constructor() {
    this.currentUrl = '';
    this.urlHistory = [];
    this.timeSpentByCategory = {};
    this.lastUrlChange = Date.now();
    this.isTracking = false;
    
    // Categorías de sitios web
    this.categories = {
      // 🚫 Distracciones / No productivas
      'social_media': {
        domains: ['facebook.com', 'instagram.com', 'twitter.com', 'x.com', 'tiktok.com', 'snapchat.com', 'linkedin.com'],
        keywords: ['social', 'feed', 'timeline', 'stories'],
        label: 'Social Media',
        productive: false,
        color: '#EF4444'
      },
      'entertainment': {
        domains: ['youtube.com', 'netflix.com', 'twitch.tv', 'spotify.com', 'reddit.com'],
        keywords: ['watch', 'video', 'stream', 'music', 'entertainment'],
        label: 'Entertainment',
        productive: false,
        color: '#F97316'
      },
      'news_media': {
        domains: ['cnn.com', 'bbc.com', 'elmundo.es', 'elpais.com', 'marca.com', 'as.com'],
        keywords: ['news', 'noticias', 'breaking', 'headlines'],
        label: 'News & Media',
        productive: false,
        color: '#EAB308'
      },
      'shopping': {
        domains: ['amazon.com', 'ebay.com', 'aliexpress.com', 'mercadolibre.com', 'wallapop.com'],
        keywords: ['shop', 'buy', 'cart', 'checkout', 'product'],
        label: 'Shopping',
        productive: false,
        color: '#EC4899'
      },
      
      // ✅ Productivas / Trabajo
      'development': {
        domains: ['localhost', '127.0.0.1', 'github.com', 'stackoverflow.com', 'developer.mozilla.org', 'w3schools.com', 'codepen.io', 'jsfiddle.net'],
        keywords: ['code', 'programming', 'development', 'api', 'documentation', 'tutorial', 'workzen', 'dashboard'],
        label: 'Development',
        productive: true,
        color: '#10B981'
      },
      'design_tools': {
        domains: ['figma.com', 'canva.com', 'adobe.com', 'sketch.com', 'dribbble.com', 'behance.net'],
        keywords: ['design', 'prototype', 'creative', 'graphics'],
        label: 'Design & Creative',
        productive: true,
        color: '#8B5CF6'
      },
      'productivity': {
        domains: ['notion.so', 'trello.com', 'asana.com', 'slack.com', 'discord.com', 'zoom.us', 'meet.google.com'],
        keywords: ['productivity', 'task', 'project', 'meeting', 'collaboration'],
        label: 'Productivity Tools',
        productive: true,
        color: '#3B82F6'
      },
      'learning': {
        domains: ['coursera.org', 'udemy.com', 'pluralsight.com', 'khan-academy.org', 'edx.org'],
        keywords: ['course', 'learn', 'education', 'tutorial', 'training'],
        label: 'Learning & Education',
        productive: true,
        color: '#14B8A6'
      },
      'business': {
        domains: ['gmail.com', 'outlook.com', 'office.com', 'google.com/drive', 'dropbox.com'],
        keywords: ['email', 'document', 'spreadsheet', 'presentation', 'business'],
        label: 'Business & Communication',
        productive: true,
        color: '#06B6D4'
      },
      
      // 🔍 Búsquedas y Referencias
      'search_research': {
        domains: ['google.com', 'bing.com', 'duckduckgo.com', 'wikipedia.org'],
        keywords: ['search', 'research', 'wiki', 'reference'],
        label: 'Search & Research',
        productive: true,
        color: '#6B7280'
      }
    };
  }

  // 🔍 Detectar categoría del URL actual
  categorizeCurrentUrl() {
    const currentUrl = window.location.href.toLowerCase();
    const hostname = window.location.hostname.toLowerCase();
    
    // Buscar coincidencias en dominios
    for (const [categoryKey, category] of Object.entries(this.categories)) {
      // Verificar dominios exactos
      if (category.domains.some(domain => hostname.includes(domain))) {
        return {
          category: categoryKey,
          label: category.label,
          productive: category.productive,
          color: category.color,
          matchType: 'domain'
        };
      }
      
      // Verificar palabras clave en la URL
      if (category.keywords.some(keyword => currentUrl.includes(keyword))) {
        return {
          category: categoryKey,
          label: category.label,
          productive: category.productive,
          color: category.color,
          matchType: 'keyword'
        };
      }
    }
    
    // Si no encuentra categoría, es "other"
    return {
      category: 'other',
      label: 'Other',
      productive: null, // Neutral
      color: '#6B7280',
      matchType: 'default'
    };
  }

  // ⏱️ Trackear tiempo en cada categoría
  trackTimeInCategory() {
    const now = Date.now();
    const currentCategory = this.categorizeCurrentUrl();
    
    // Si cambió la URL, registrar tiempo en la anterior
    if (this.currentUrl && this.currentUrl !== window.location.href) {
      const timeSpent = now - this.lastUrlChange;
      const prevCategory = this.categorizeUrl(this.currentUrl);
      
      if (!this.timeSpentByCategory[prevCategory.category]) {
        this.timeSpentByCategory[prevCategory.category] = 0;
      }
      this.timeSpentByCategory[prevCategory.category] += timeSpent;
    }
    
    // Actualizar URL actual
    this.currentUrl = window.location.href;
    this.lastUrlChange = now;
    
    return currentCategory;
  }

  // 🔍 Categorizar URL específica (helper function)
  categorizeUrl(url) {
    try {
      const urlLower = url.toLowerCase();
      const hostname = new URL(url).hostname.toLowerCase();
      
      for (const [categoryKey, category] of Object.entries(this.categories)) {
        if (category.domains.some(domain => hostname.includes(domain)) ||
            category.keywords.some(keyword => urlLower.includes(keyword))) {
          return {
            category: categoryKey,
            label: category.label,
            productive: category.productive,
            color: category.color
          };
        }
      }
    } catch (error) {
      console.warn('Error parsing URL:', url, error);
    }
    
    return { category: 'other', label: 'Other', productive: null, color: '#6B7280' };
  }

  // 📊 Obtener estadísticas de productividad web
  getWebProductivityStats() {
    const currentCategory = this.trackTimeInCategory();
    
    // Calcular tiempo total
    const totalTime = Object.values(this.timeSpentByCategory).reduce((sum, time) => sum + time, 0);
    
    // Calcular tiempo productivo vs no productivo
    let productiveTime = 0;
    let distractiveTime = 0;
    let neutralTime = 0;
    
    const categoryStats = {};
    
    for (const [categoryKey, timeSpent] of Object.entries(this.timeSpentByCategory)) {
      const categoryInfo = this.categories[categoryKey];
      
      if (categoryInfo) {
        if (categoryInfo.productive === true) {
          productiveTime += timeSpent;
        } else if (categoryInfo.productive === false) {
          distractiveTime += timeSpent;
        } else {
          neutralTime += timeSpent;
        }
        
        categoryStats[categoryKey] = {
          timeSpent,
          percentage: totalTime > 0 ? (timeSpent / totalTime) * 100 : 0,
          label: categoryInfo.label,
          productive: categoryInfo.productive,
          color: categoryInfo.color
        };
      }
    }
    
    // Calcular score de productividad web
    const webProductivityScore = totalTime > 0 ? 
      Math.round((productiveTime / totalTime) * 100) : 100;
    
    return {
      current: currentCategory,
      totalTime,
      productiveTime,
      distractiveTime,
      neutralTime,
      webProductivityScore,
      categoryStats,
      breakdown: {
        productive: totalTime > 0 ? (productiveTime / totalTime) * 100 : 0,
        distractive: totalTime > 0 ? (distractiveTime / totalTime) * 100 : 0,
        neutral: totalTime > 0 ? (neutralTime / totalTime) * 100 : 0
      }
    };
  }

  // 🔄 Iniciar tracking (versión simplificada sin interceptar navegación)
  start() {
    if (this.isTracking) {
      console.log('🌐 WebActivityTracker: Already tracking');
      return;
    }

    this.currentUrl = window.location.href;
    this.lastUrlChange = Date.now();
    this.isTracking = true;
    
    // Agregar datos de prueba para ver el funcionamiento inmediato
    this.addMockData();
    
    // Solo trackear tiempo cada 15 segundos (sin interceptar navegación)
    this.trackingInterval = setInterval(() => {
      this.trackTimeInCategory();
      // Simular actividad web adicional cada minuto
      if (Date.now() % 60000 < 15000) {
        this.simulateWebActivity();
      }
    }, 15000);
    
    // Registrar tiempo al salir de la página
    this.beforeunloadHandler = () => {
      this.trackTimeInCategory();
    };
    window.addEventListener('beforeunload', this.beforeunloadHandler);
    
    console.log('🌐 WebActivityTracker: Started tracking', window.location.hostname);
  }

  // 🎭 Agregar datos de prueba para demostración
  addMockData() {
    const mockSessions = [
      { category: 'development', time: 300000 }, // 5 minutos
      { category: 'social_media', time: 120000 }, // 2 minutos  
      { category: 'entertainment', time: 180000 }, // 3 minutos
      { category: 'search_research', time: 240000 }, // 4 minutos
      { category: 'other', time: 60000 } // 1 minuto
    ];

    mockSessions.forEach(session => {
      if (!this.timeSpentByCategory[session.category]) {
        this.timeSpentByCategory[session.category] = 0;
      }
      this.timeSpentByCategory[session.category] += session.time;
    });

    console.log('🎭 WebTracker: Added mock data for demonstration');
  }

  // 🎲 Simular actividad web adicional
  simulateWebActivity() {
    const categories = Object.keys(this.categories);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomTime = Math.floor(Math.random() * 30000) + 10000; // 10-40 segundos

    if (!this.timeSpentByCategory[randomCategory]) {
      this.timeSpentByCategory[randomCategory] = 0;
    }
    this.timeSpentByCategory[randomCategory] += randomTime;
    
    console.log(`🎲 WebTracker: Simulated ${Math.round(randomTime/1000)}s in ${this.categories[randomCategory]?.label || randomCategory}`);
  }

  // ⏹️ Detener tracking
  stop() {
    if (!this.isTracking) {
      console.log('🌐 WebActivityTracker: Not tracking');
      return;
    }

    // Registrar tiempo final en la categoría actual
    this.trackTimeInCategory();
    
    // Remover event listeners
    if (this.beforeunloadHandler) {
      window.removeEventListener('beforeunload', this.beforeunloadHandler);
    }
    
    // Limpiar interval
    if (this.trackingInterval) {
      clearInterval(this.trackingInterval);
    }
    
    this.isTracking = false;
    
    console.log('🌐 WebActivityTracker: Stopped tracking');
  }
}

export default WebActivityTracker;
