// PointsSystem.js - Sistema de puntos local (sin blockchain)
class PointsSystem {
  constructor() {
    this.storageKey = 'workzen_employee_points';
  }

  // 📊 Calcular puntos basados en métricas de productividad (SISTEMA EQUILIBRADO)
  calculateDailyPoints(metrics) {
    const {
      productivity,
      activeTime,
      focusTime,
      webProductivity,
      breaksToday,
      dailyGoalProgress
    } = metrics;

    let points = 0;
    let multiplier = 1.0;

    // 🎯 Puntos por productividad general (0-40 puntos) - MÁS EXIGENTE
    if (productivity >= 95) points += 40; // Excelencia
    else if (productivity >= 90) points += 35; // Muy alto
    else if (productivity >= 85) points += 30; // Alto
    else if (productivity >= 80) points += 22; // Bueno
    else if (productivity >= 75) points += 15; // Promedio alto
    else if (productivity >= 70) points += 10; // Promedio
    else if (productivity >= 65) points += 5;  // Bajo
    else points += 1; // Muy bajo

    // ⏰ Puntos por tiempo de foco efectivo (0-25 puntos) - MÁS REALISTA
    const focusHours = focusTime;
    const focusEfficiency = focusHours / 8; // Porcentaje de 8h laborales
    
    if (focusHours >= 6.5 && focusEfficiency >= 0.8) points += 25; // 6.5h+ de foco real
    else if (focusHours >= 5.5 && focusEfficiency >= 0.7) points += 20; // 5.5h+ bueno
    else if (focusHours >= 4.5 && focusEfficiency >= 0.6) points += 15; // 4.5h+ promedio
    else if (focusHours >= 3.5) points += 10; // 3.5h+ bajo
    else if (focusHours >= 2) points += 5; // 2h+ muy bajo
    else points += 1; // Menos de 2h

    // � Puntos por productividad web - SIMPLIFICADO Y EQUILIBRADO (0-15 puntos)
    if (webProductivity >= 90) points += 15;
    else if (webProductivity >= 80) points += 12;
    else if (webProductivity >= 70) points += 8;
    else if (webProductivity >= 60) points += 4;
    else points += 1;

    // 🎯 Puntos por cumplimiento de objetivos (0-10 puntos)
    if (dailyGoalProgress >= 100) points += 10;
    else if (dailyGoalProgress >= 90) points += 8;
    else if (dailyGoalProgress >= 80) points += 6;
    else if (dailyGoalProgress >= 70) points += 4;
    else if (dailyGoalProgress >= 60) points += 2;
    else points += 0;

    // � Sistema de breaks balanceado (modificador, no resta)
    let breakMultiplier = 1.0;
    if (breaksToday >= 4 && breaksToday <= 6) breakMultiplier = 1.1; // Breaks óptimos
    else if (breaksToday >= 7 && breaksToday <= 8) breakMultiplier = 1.0; // Normales
    else if (breaksToday > 8) breakMultiplier = 0.85; // Demasiados breaks
    else if (breaksToday < 3) breakMultiplier = 0.9; // Muy pocos breaks

    // 🏆 Multiplicador por excelencia (solo para alta productividad)
    if (productivity >= 90 && focusHours >= 6) {
      multiplier = 1.15; // 15% bonus por excelencia
    } else if (productivity >= 85 && focusHours >= 5) {
      multiplier = 1.05; // 5% bonus por buen rendimiento
    }

    // 🎁 Bonus por consistencia (días consecutivos)
    let consistencyBonus = 0;
    const consecutiveDays = this.getConsecutiveDays();
    if (consecutiveDays >= 21) consistencyBonus = 8; // 3 semanas
    else if (consecutiveDays >= 14) consistencyBonus = 5; // 2 semanas
    else if (consecutiveDays >= 7) consistencyBonus = 3; // 1 semana
    else if (consecutiveDays >= 3) consistencyBonus = 1; // 3 días

    // 📊 CÁLCULO FINAL CON BALANCE
    const basePoints = points * breakMultiplier;
    const bonusPoints = basePoints * (multiplier - 1);
    const finalPoints = Math.round(basePoints + bonusPoints + consistencyBonus);

    // 💡 Logging para transparencia (para desarrollo)
    console.log('🧮 Cálculo de puntos:', {
      baseMetrics: { productivity, focusHours, webProductivity, dailyGoalProgress },
      basePoints: Math.round(basePoints),
      bonusPoints: Math.round(bonusPoints),
      consistencyBonus,
      finalPoints,
      multipliers: { breakMultiplier, excellenceMultiplier: multiplier }
    });

    return Math.max(1, finalPoints); // Mínimo 1 punto por participar
  }

  // 💾 Guardar puntos del empleado
  saveEmployeePoints(walletAddress, dailyPoints, metrics) {
    const employeeData = this.getEmployeeData(walletAddress);
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Evitar duplicados del mismo día
    if (employeeData.dailyRecords[today]) {
      console.log('Points already calculated for today');
      return employeeData;
    }

    // Agregar puntos del día
    employeeData.totalPoints += dailyPoints;
    employeeData.dailyRecords[today] = {
      points: dailyPoints,
      metrics: metrics,
      timestamp: Date.now()
    };

    // Actualizar estadísticas
    employeeData.totalDays++;
    employeeData.averageProductivity = this.calculateAverageProductivity(employeeData.dailyRecords);
    employeeData.lastUpdate = Date.now();

    // Guardar en localStorage
    this.saveToStorage(walletAddress, employeeData);

    return employeeData;
  }

  // 📖 Obtener datos del empleado
  getEmployeeData(walletAddress) {
    const stored = localStorage.getItem(`${this.storageKey}_${walletAddress}`);
    
    if (stored) {
      return JSON.parse(stored);
    }

    // Datos por defecto para nuevo empleado
    return {
      walletAddress,
      totalPoints: 0,
      totalDays: 0,
      averageProductivity: 0,
      dailyRecords: {},
      achievements: [],
      lastUpdate: Date.now(),
      joinDate: Date.now()
    };
  }

  // 💰 Canjear puntos por beneficios
  redeemPoints(walletAddress, benefitCost, benefitName) {
    const employeeData = this.getEmployeeData(walletAddress);
    
    if (employeeData.totalPoints < benefitCost) {
      throw new Error('Insufficient points');
    }

    employeeData.totalPoints -= benefitCost;
    
    // Registrar canje
    if (!employeeData.redemptions) {
      employeeData.redemptions = [];
    }
    
    employeeData.redemptions.push({
      benefit: benefitName,
      cost: benefitCost,
      date: Date.now()
    });

    this.saveToStorage(walletAddress, employeeData);
    return employeeData;
  }

  // 🏆 Sistema de logros
  checkAchievements(walletAddress) {
    const employeeData = this.getEmployeeData(walletAddress);
    const newAchievements = [];

    // Logro: Primera semana
    if (employeeData.totalDays >= 7 && !employeeData.achievements.includes('first_week')) {
      newAchievements.push('first_week');
    }

    // Logro: Productividad alta
    if (employeeData.averageProductivity >= 85 && !employeeData.achievements.includes('high_performer')) {
      newAchievements.push('high_performer');
    }

    // Logro: 1000 puntos
    if (employeeData.totalPoints >= 1000 && !employeeData.achievements.includes('point_master')) {
      newAchievements.push('point_master');
    }

    // Agregar nuevos logros
    if (newAchievements.length > 0) {
      employeeData.achievements = [...employeeData.achievements, ...newAchievements];
      this.saveToStorage(walletAddress, employeeData);
    }

    return newAchievements;
  }

  // 📈 Obtener ranking de empleados (solo direcciones encriptadas)
  getLeaderboard() {
    const employees = [];
    
    // Buscar todos los empleados en localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(this.storageKey)) {
        const data = JSON.parse(localStorage.getItem(key));
        employees.push({
          id: key.slice(-8), // Solo últimos 8 caracteres de wallet
          totalPoints: data.totalPoints,
          averageProductivity: data.averageProductivity,
          totalDays: data.totalDays
        });
      }
    }

    return employees.sort((a, b) => b.totalPoints - a.totalPoints);
  }

  // 🔄 Días consecutivos
  getConsecutiveDays() {
    const today = new Date();
    const walletAddress = this.getCurrentWallet(); // Implementar según tu AuthContext
    if (!walletAddress) return 0;

    const employeeData = this.getEmployeeData(walletAddress);
    let consecutiveDays = 0;

    for (let i = 0; i < 30; i++) { // Verificar últimos 30 días
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];

      if (employeeData.dailyRecords[dateStr]) {
        consecutiveDays++;
      } else {
        break; // Se rompió la racha
      }
    }

    return consecutiveDays;
  }

  // 💾 Guardar en localStorage
  saveToStorage(walletAddress, data) {
    localStorage.setItem(`${this.storageKey}_${walletAddress}`, JSON.stringify(data));
  }

  // 📊 Calcular productividad promedio
  calculateAverageProductivity(dailyRecords) {
    const records = Object.values(dailyRecords);
    if (records.length === 0) return 0;

    const total = records.reduce((sum, record) => sum + record.metrics.productivity, 0);
    return Math.round(total / records.length);
  }

  // 🎁 Catálogo de beneficios
  getBenefitsCatalog() {
    return [
      { id: 'extra_day_off', name: 'Extra Day Off', cost: 500, icon: '🏖️' },
      { id: 'premium_coffee', name: 'Premium Coffee', cost: 100, icon: '☕' },
      { id: 'parking_spot', name: 'Reserved Parking', cost: 200, icon: '🚗' },
      { id: 'lunch_voucher', name: 'Lunch Voucher', cost: 150, icon: '🍽️' },
      { id: 'course_access', name: 'Online Course Access', cost: 300, icon: '📚' },
      { id: 'gym_membership', name: 'Gym Membership (1 month)', cost: 400, icon: '💪' },
      { id: 'tech_gadget', name: 'Tech Gadget', cost: 800, icon: '📱' },
      { id: 'team_dinner', name: 'Team Dinner Invitation', cost: 600, icon: '🍽️' }
    ];
  }

  // 🧹 Limpiar datos (para desarrollo/testing)
  clearEmployeeData(walletAddress) {
    localStorage.removeItem(`${this.storageKey}_${walletAddress}`);
  }

  getCurrentWallet() {
    // Esta función debería obtener la wallet actual del contexto de autenticación
    // Por ahora retornamos null, se implementará con Web3
    return null;
  }

  // 📈 Obtener benchmarks y promedios esperados
  getPointsBenchmarks() {
    return {
      // Puntuación por rendimiento
      excellent: { min: 85, description: "Rendimiento excelente", dailyPoints: "75-90+" },
      good: { min: 65, description: "Buen rendimiento", dailyPoints: "55-75" },
      average: { min: 45, description: "Rendimiento promedio", dailyPoints: "35-55" },
      needsImprovement: { min: 20, description: "Necesita mejorar", dailyPoints: "15-35" },
      
      // Métricas típicas para 8 horas laborales
      typicalMetrics: {
        productivity: {
          excellent: 90, // 90%+ productividad
          good: 80,      // 80-89% productividad  
          average: 70,   // 70-79% productividad
          minimum: 60    // 60%+ mínimo aceptable
        },
        focusTime: {
          excellent: 6.5, // 6.5+ horas de foco real
          good: 5.5,      // 5.5-6.4 horas
          average: 4.5,   // 4.5-5.4 horas
          minimum: 3      // 3+ horas mínimo
        },
        breaks: {
          optimal: [4, 5, 6], // 4-6 breaks por día
          acceptable: [3, 7, 8], // aceptable
          tooMany: 9,     // 9+ breaks problemático
          tooFew: 2       // menos de 3 puede indicar burnout
        }
      },

      // Ejemplos de puntuación diaria
      examples: [
        {
          scenario: "Empleado Excelente",
          metrics: { productivity: 92, focusTime: 6.8, webProductivity: 88, dailyGoalProgress: 100, breaksToday: 5 },
          expectedPoints: "85-95 puntos"
        },
        {
          scenario: "Empleado Promedio",
          metrics: { productivity: 75, focusTime: 4.8, webProductivity: 72, dailyGoalProgress: 80, breaksToday: 6 },
          expectedPoints: "45-55 puntos"
        },
        {
          scenario: "Empleado Bajo Rendimiento",
          metrics: { productivity: 65, focusTime: 3.2, webProductivity: 60, dailyGoalProgress: 60, breaksToday: 9 },
          expectedPoints: "20-30 puntos"
        }
      ]
    };
  }

  // 🎯 Simular puntos para métricas dadas (para testing y transparencia)
  simulatePoints(testMetrics) {
    const points = this.calculateDailyPoints(testMetrics);
    const benchmarks = this.getPointsBenchmarks();
    
    let category = "needsImprovement";
    if (points >= 75) category = "excellent";
    else if (points >= 55) category = "good"; 
    else if (points >= 35) category = "average";

    return {
      points,
      category,
      benchmark: benchmarks[category],
      breakdown: this.getPointsBreakdown(testMetrics)
    };
  }

  // 📊 Desglose detallado de puntos (para transparencia)
  getPointsBreakdown(metrics) {
    const { productivity, focusTime, webProductivity, dailyGoalProgress, breaksToday } = metrics;
    
    let breakdown = {
      productivity: 0,
      focusTime: 0,
      webProductivity: 0,
      dailyGoals: 0,
      breakBalance: 1.0,
      consistency: 0,
      excellence: 1.0
    };

    // Calcular cada componente por separado
    if (productivity >= 95) breakdown.productivity = 40;
    else if (productivity >= 90) breakdown.productivity = 35;
    else if (productivity >= 85) breakdown.productivity = 30;
    else if (productivity >= 80) breakdown.productivity = 22;
    else if (productivity >= 75) breakdown.productivity = 15;
    else if (productivity >= 70) breakdown.productivity = 10;
    else if (productivity >= 65) breakdown.productivity = 5;
    else breakdown.productivity = 1;

    // Tiempo de foco
    if (focusTime >= 6.5) breakdown.focusTime = 25;
    else if (focusTime >= 5.5) breakdown.focusTime = 20;
    else if (focusTime >= 4.5) breakdown.focusTime = 15;
    else if (focusTime >= 3.5) breakdown.focusTime = 10;
    else if (focusTime >= 2) breakdown.focusTime = 5;
    else breakdown.focusTime = 1;

    // Web productividad
    if (webProductivity >= 90) breakdown.webProductivity = 15;
    else if (webProductivity >= 80) breakdown.webProductivity = 12;
    else if (webProductivity >= 70) breakdown.webProductivity = 8;
    else if (webProductivity >= 60) breakdown.webProductivity = 4;
    else breakdown.webProductivity = 1;

    // Objetivos diarios
    if (dailyGoalProgress >= 100) breakdown.dailyGoals = 10;
    else if (dailyGoalProgress >= 90) breakdown.dailyGoals = 8;
    else if (dailyGoalProgress >= 80) breakdown.dailyGoals = 6;
    else if (dailyGoalProgress >= 70) breakdown.dailyGoals = 4;
    else if (dailyGoalProgress >= 60) breakdown.dailyGoals = 2;
    else breakdown.dailyGoals = 0;

    // Multiplicadores
    if (breaksToday >= 4 && breaksToday <= 6) breakdown.breakBalance = 1.1;
    else if (breaksToday >= 7 && breaksToday <= 8) breakdown.breakBalance = 1.0;
    else if (breaksToday > 8) breakdown.breakBalance = 0.85;
    else if (breaksToday < 3) breakdown.breakBalance = 0.9;

    if (productivity >= 90 && focusTime >= 6) breakdown.excellence = 1.15;
    else if (productivity >= 85 && focusTime >= 5) breakdown.excellence = 1.05;

    breakdown.consistency = this.getConsecutiveDays() >= 7 ? 3 : 0;

    return breakdown;
  }
}

export default PointsSystem;
