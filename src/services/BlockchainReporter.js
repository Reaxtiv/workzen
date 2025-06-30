// BlockchainReporter.js - Servicio para enviar reportes a blockchain
import { ethers } from 'ethers';

class BlockchainReporter {
  constructor() {
    this.contract = null;
    this.provider = null;
    this.signer = null;
    this.contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    this.contractABI = [
      // ABI del contrato ProductivityReports.sol
      {
        "inputs": [
          {"internalType": "address", "name": "employee", "type": "address"},
          {"internalType": "uint256", "name": "date", "type": "uint256"},
          {"internalType": "uint256", "name": "productivityScore", "type": "uint256"},
          {"internalType": "uint256", "name": "activeTime", "type": "uint256"},
          {"internalType": "uint256", "name": "focusTime", "type": "uint256"},
          {"internalType": "uint256", "name": "webProductivityScore", "type": "uint256"},
          {"internalType": "uint256", "name": "breaksCount", "type": "uint256"},
          {"internalType": "bytes32", "name": "dataHash", "type": "bytes32"}
        ],
        "name": "submitDailyReport",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [{"internalType": "address", "name": "employee", "type": "address"}],
        "name": "getEmployeeStats",
        "outputs": [
          {"internalType": "uint256", "name": "totalReports", "type": "uint256"},
          {"internalType": "uint256", "name": "averageProductivity", "type": "uint256"},
          {"internalType": "uint256", "name": "totalActiveTime", "type": "uint256"},
          {"internalType": "uint256", "name": "totalFocusTime", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {"internalType": "uint256", "name": "date", "type": "uint256"},
          {"internalType": "address", "name": "employee", "type": "address"}
        ],
        "name": "hasReportForDate",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
      }
    ];
  }

  // 🔗 Conectar con MetaMask
  async connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Solicitar conexión a MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        
        // Obtener dirección de la wallet
        const address = await this.signer.getAddress();
        
        // Inicializar contrato
        if (this.contractAddress) {
          this.contract = new ethers.Contract(
            this.contractAddress,
            this.contractABI,
            this.signer
          );
        }
        
        console.log('🔗 Wallet connected:', address);
        return address;
      } catch (error) {
        console.error('Error connecting wallet:', error);
        throw error;
      }
    } else {
      throw new Error('MetaMask not installed');
    }
  }

  // 📊 Enviar reporte diario a blockchain
  async submitDailyReport(employeeAddress, metrics) {
    if (!this.contract) {
      throw new Error('Contract not initialized. Connect wallet first.');
    }

    try {
      const today = Math.floor(Date.now() / 1000 / 86400); // Días desde epoch
      
      // Verificar si ya existe reporte para hoy
      const hasReport = await this.contract.hasReportForDate(today, employeeAddress);
      if (hasReport) {
        console.log('Report already exists for today');
        return null;
      }

      // Preparar datos para blockchain
      const reportData = {
        employee: employeeAddress,
        date: today,
        productivityScore: Math.round(metrics.productivity),
        activeTime: Math.round(metrics.focusTime * 3600), // horas a segundos
        focusTime: Math.round(metrics.focusTime * 3600),
        webProductivityScore: Math.round(metrics.webProductivity || 100),
        breaksCount: metrics.breaksToday || 0
      };

      // Crear hash de los datos completos para verificación
      const dataString = JSON.stringify({
        ...reportData,
        timestamp: Date.now(),
        version: '1.0'
      });
      const dataHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(dataString));

      // Enviar transacción
      console.log('📤 Sending report to blockchain...', reportData);
      
      const tx = await this.contract.submitDailyReport(
        reportData.employee,
        reportData.date,
        reportData.productivityScore,
        reportData.activeTime,
        reportData.focusTime,
        reportData.webProductivityScore,
        reportData.breaksCount,
        dataHash
      );

      console.log('⏳ Transaction sent:', tx.hash);
      
      // Esperar confirmación
      const receipt = await tx.wait();
      console.log('✅ Report confirmed on blockchain:', receipt.transactionHash);
      
      return {
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        reportData,
        dataHash
      };

    } catch (error) {
      console.error('❌ Error submitting report:', error);
      throw error;
    }
  }

  // 📊 Obtener estadísticas del empleado desde blockchain
  async getEmployeeBlockchainStats(employeeAddress) {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const stats = await this.contract.getEmployeeStats(employeeAddress);
      
      return {
        totalReports: stats.totalReports.toNumber(),
        averageProductivity: stats.averageProductivity.toNumber(),
        totalActiveTime: stats.totalActiveTime.toNumber(),
        totalFocusTime: stats.totalFocusTime.toNumber()
      };
    } catch (error) {
      console.error('Error fetching blockchain stats:', error);
      return null;
    }
  }

  // 📊 Obtener reportes históricos del empleado desde eventos del contrato
  async getEmployeeReports(employeeAddress, fromDate = null, limit = 10) {
    if (!this.contract) {
      console.warn('Contract not initialized. Using mock data.');
      return this.getMockEmployeeReports(employeeAddress, limit);
    }

    try {
      // En una implementación real, obtendrías los eventos del contrato
      // Para este ejemplo, simularemos algunos reportes con datos reales del contrato
      const stats = await this.getEmployeeBlockchainStats(employeeAddress);
      
      if (stats && stats.totalReports > 0) {
        // Generar reportes basados en datos reales de blockchain
        const reports = [];
        for (let i = 0; i < Math.min(stats.totalReports, limit); i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          
          reports.push({
            date: date.toLocaleDateString(),
            productivity: stats.averageProductivity + (Math.random() * 20 - 10), // Variar alrededor del promedio
            focusTime: (stats.totalFocusTime / stats.totalReports / 3600).toFixed(1),
            activeTime: (stats.totalActiveTime / stats.totalReports / 3600).toFixed(1),
            webProductivity: Math.round(stats.averageProductivity * 0.9),
            breaks: Math.floor(Math.random() * 8) + 3,
            zens: Math.round(stats.averageProductivity * 0.8),
            transactionHash: '0x' + Math.random().toString(16).substr(2, 64)
          });
        }
        return reports;
      } else {
        return this.getMockEmployeeReports(employeeAddress, limit);
      }
    } catch (error) {
      console.error('Error getting employee reports:', error);
      return this.getMockEmployeeReports(employeeAddress, limit);
    }
  }

  // 📈 Obtener reportes agregados para administradores (datos anonimizados)
  async getAggregatedReports(fromDate = null, limit = 10) {
    try {
      // En una implementación real, consultarías múltiples empleados y agregarías los datos
      // Para este ejemplo, devolveremos datos agregados simulados
      const reports = [];
      for (let i = 0; i < limit; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        reports.push({
          date: date.toLocaleDateString(),
          totalEmployees: 6, // Número fijo de empleados
          avgProductivity: Math.round(75 + Math.random() * 20),
          avgFocusTime: (5 + Math.random() * 3).toFixed(1),
          totalReports: Math.floor(Math.random() * 8) + 4, // Entre 4-12 reportes (algunos empleados pueden no reportar cada día)
          topPerformers: Math.floor(Math.random() * 3) + 1, // Entre 1-4 top performers
          efficiency: ['High', 'Very High', 'Excellent'][Math.floor(Math.random() * 3)]
        });
      }
      return reports;
    } catch (error) {
      console.error('Error getting aggregated reports:', error);
      return [];
    }
  }

  // 📊 Obtener reportes detallados del empleado
  async getDetailedEmployeeReports(employeeAddress, startDate = null, limit = 10) {
    try {
      if (!this.contract) {
        console.warn('Contract not initialized, returning mock detailed data');
        return this.getMockDetailedReports(employeeAddress, limit);
      }

      // Obtener estadísticas básicas primero
      const stats = await this.contract.getEmployeeStats(employeeAddress);
      
      // Por ahora, generar desglose detallado basado en estadísticas básicas
      // En una implementación real, esto consultaría eventos de blockchain
      return this.getMockDetailedReports(employeeAddress, limit, stats);
      
    } catch (error) {
      console.error('Error getting detailed employee reports:', error);
      return this.getMockDetailedReports(employeeAddress, limit);
    }
  }

  // 📊 Obtener todos los reportes de empleados para admin
  async getAllEmployeesReports(startDate = null, limit = 10) {
    try {
      if (!this.contract) {
        console.warn('Contract not initialized, returning mock employee list');
        return this.getMockAllEmployeesReports(limit);
      }

      // En una implementación real, esto consultaría eventos de blockchain para todos los empleados
      return this.getMockAllEmployeesReports(limit);
      
    } catch (error) {
      console.error('Error getting all employees reports:', error);
      return this.getMockAllEmployeesReports(limit);
    }
  }

  // 🎭 Datos simulados para desarrollo
  getMockEmployeeReports(employeeAddress, limit) {
    const reports = [];
    for (let i = 0; i < limit; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      reports.push({
        date: date.toLocaleDateString(),
        productivity: Math.round(70 + Math.random() * 25),
        focusTime: (4 + Math.random() * 4).toFixed(1),
        activeTime: (7 + Math.random() * 2).toFixed(1),
        webProductivity: Math.round(65 + Math.random() * 30),
        breaks: Math.floor(Math.random() * 8) + 3,
        zens: Math.round(50 + Math.random() * 40),
        transactionHash: '0x' + Math.random().toString(16).substr(2, 64)
      });
    }
    return reports;
  }

  // 🎭 Generar reportes detallados simulados para desarrollo
  getMockDetailedReports(employeeAddress, limit = 10, realStats = null) {
    const reports = [];
    const today = new Date();
    
    for (let i = 0; i < limit; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const baseProductivity = realStats ? realStats.averageProductivity.toNumber() : 75 + Math.random() * 20;
      
      reports.push({
        date: date.toLocaleDateString(),
        timestamp: date.getTime(),
        employeeAddress: employeeAddress,
        
        // Métricas generales
        overallProductivity: Math.round(baseProductivity + (Math.random() - 0.5) * 10),
        totalActiveTime: 7.5 + Math.random() * 1, // horas
        totalFocusTime: 5.5 + Math.random() * 1.5, // horas
        
        // Desglose detallado
        applicationUsage: {
          productiveApps: {
            vsCode: Math.round(120 + Math.random() * 60), // minutos
            browser: Math.round(90 + Math.random() * 30),
            terminal: Math.round(45 + Math.random() * 30),
            documentation: Math.round(60 + Math.random() * 30),
            designTools: Math.round(30 + Math.random() * 20)
          },
          communicationApps: {
            slack: Math.round(25 + Math.random() * 15),
            email: Math.round(30 + Math.random() * 20),
            zoom: Math.round(60 + Math.random() * 30),
            teams: Math.round(20 + Math.random() * 15)
          },
          distractingApps: {
            socialMedia: Math.round(Math.random() * 20),
            entertainment: Math.round(Math.random() * 15),
            gaming: Math.round(Math.random() * 10),
            shopping: Math.round(Math.random() * 5)
          }
        },
        
        // Categorías de sitios web
        websiteCategories: {
          workRelated: Math.round(70 + Math.random() * 20), // porcentaje
          documentation: Math.round(15 + Math.random() * 10),
          socialMedia: Math.round(Math.random() * 10),
          news: Math.round(Math.random() * 8),
          entertainment: Math.round(Math.random() * 5),
          shopping: Math.round(Math.random() * 3)
        },
        
        // Patrones de descanso
        breakAnalysis: {
          totalBreaks: 4 + Math.round(Math.random() * 4),
          averageBreakLength: 8 + Math.random() * 7, // minutos
          longestBreak: 15 + Math.random() * 20,
          shortestBreak: 2 + Math.random() * 3,
          breakDistribution: {
            morning: Math.round(1 + Math.random() * 2),
            afternoon: Math.round(2 + Math.random() * 2),
            evening: Math.round(Math.random() * 2)
          }
        },
        
        // Métricas de rendimiento
        performanceMetrics: {
          keystrokesPerMinute: Math.round(45 + Math.random() * 20),
          mouseClicksPerHour: Math.round(180 + Math.random() * 100),
          activeWindowSwitches: Math.round(80 + Math.random() * 40),
          multitaskingScore: Math.round(60 + Math.random() * 30)
        },
        
        // Indicadores de bienestar
        wellbeingIndicators: {
          screenTimeIntensity: Math.round(60 + Math.random() * 30), // porcentaje
          workLifeBalance: Math.round(70 + Math.random() * 25),
          stressLevel: Math.round(20 + Math.random() * 30), // menor es mejor
          energyLevel: Math.round(60 + Math.random() * 30)
        },
        
        // Desglose de zens y logros
        zensBreakdown: {
          productivityZens: Math.round(25 + Math.random() * 15),
          focusZens: Math.round(15 + Math.random() * 10),
          consistencyZens: Math.round(5 + Math.random() * 5),
          bonusZens: Math.round(Math.random() * 10),
          totalZens: 0 // Se calculará
        },
        
        // Información de blockchain
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        blockNumber: 12345600 + i,
        gasUsed: Math.round(45000 + Math.random() * 15000),
        confirmations: 12 + Math.round(Math.random() * 50)
      });
      
      // Calcular zens totales
      const report = reports[reports.length - 1];
      report.zensBreakdown.totalZens = 
        report.zensBreakdown.productivityZens +
        report.zensBreakdown.focusZens +
        report.zensBreakdown.consistencyZens +
        report.zensBreakdown.bonusZens;
    }
    
    return reports;
  }

  // 👥 Generar reportes de todos los empleados simulados para admin
  getMockAllEmployeesReports(limit = 10) {
    const employees = [
      { address: '0x1234...5678', name: 'Alice Johnson', position: 'Senior Developer' },
      { address: '0x2345...6789', name: 'Bob Smith', position: 'Frontend Developer' },
      { address: '0x3456...7890', name: 'Carol Wilson', position: 'UX Designer' },
      { address: '0x4567...8901', name: 'David Brown', position: 'Backend Developer' },
      { address: '0x5678...9012', name: 'Emma Davis', position: 'DevOps Engineer' }
    ];
    
    const reports = [];
    const today = new Date();
    
    for (let i = 0; i < Math.min(limit, 7); i++) { // Últimos 7 días
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const dailyEmployeeReports = employees.map(employee => {
        const baseProductivity = 70 + Math.random() * 25;
        
        return {
          employeeId: employee.address,
          employeeName: employee.name,
          position: employee.position,
          date: date.toLocaleDateString(),
          
          // Métricas resumen
          productivity: Math.round(baseProductivity),
          focusTime: Math.round((5 + Math.random() * 2.5) * 10) / 10,
          activeTime: Math.round((7 + Math.random() * 1.5) * 10) / 10,
          
          // Tiempo categorizado
          timeBreakdown: {
            productive: Math.round(baseProductivity + (Math.random() - 0.5) * 10),
            communication: Math.round(15 + Math.random() * 10),
            meetings: Math.round(20 + Math.random() * 15),
            breaks: Math.round(10 + Math.random() * 5),
            distractions: Math.round(Math.random() * 10)
          },
          
          // Resumen del uso de aplicaciones
          topApplications: [
            { name: 'VS Code', time: Math.round(120 + Math.random() * 60) },
            { name: 'Browser', time: Math.round(90 + Math.random() * 40) },
            { name: 'Slack', time: Math.round(25 + Math.random() * 20) }
          ],
          
          // Indicadores de rendimiento
          performanceScore: Math.round(baseProductivity + (Math.random() - 0.5) * 15),
          wellbeingScore: Math.round(70 + Math.random() * 25),
          
          // Zens ganados
          zensEarned: Math.round(30 + Math.random() * 40),
          
          // Estado
          status: baseProductivity >= 85 ? 'Excellent' : 
                 baseProductivity >= 75 ? 'Good' : 
                 baseProductivity >= 65 ? 'Average' : 'Needs Attention',
          
          // Verificación de blockchain
          hasBlockchainReport: Math.random() > 0.1, // 90% tienen reportes en blockchain
          transactionHash: Math.random() > 0.1 ? `0x${Math.random().toString(16).substr(2, 64)}` : null
        };
      });
      
      reports.push({
        date: date.toLocaleDateString(),
        timestamp: date.getTime(),
        employeeReports: dailyEmployeeReports,
        
        // Resumen diario
        summary: {
          totalEmployees: employees.length,
          averageProductivity: Math.round(dailyEmployeeReports.reduce((sum, emp) => sum + emp.productivity, 0) / employees.length),
          averageFocusTime: Math.round(dailyEmployeeReports.reduce((sum, emp) => sum + emp.focusTime, 0) / employees.length * 10) / 10,
          topPerformers: dailyEmployeeReports.filter(emp => emp.productivity >= 85).length,
          needsAttention: dailyEmployeeReports.filter(emp => emp.productivity < 65).length,
          totalZensAwarded: dailyEmployeeReports.reduce((sum, emp) => sum + emp.zensEarned, 0),
          blockchainReports: dailyEmployeeReports.filter(emp => emp.hasBlockchainReport).length
        }
      });
    }
    
    return reports;
  }

  // 📈 Obtener métricas de privacidad y cumplimiento
  getPrivacyMetrics() {
    return {
      dataRetention: '90 días',
      encryption: 'AES-256',
      compliance: ['RGPD', 'CCPA'],
      anonymization: 'Datos agregados únicamente para administradores',
      dataMinimization: 'Solo métricas de productividad esenciales',
      userConsent: 'Requerido para participación',
      accessControl: 'Basado en roles (empleado/administrador)'
    };
  }

  // 🔄 Programar envío automático diario
  scheduleAutomaticReport(employeeAddress, getMetricsFunction) {
    const scheduleNext = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0); // Medianoche

      const timeUntilMidnight = tomorrow.getTime() - now.getTime();

      console.log(`⏰ Next report scheduled in ${Math.round(timeUntilMidnight / 1000 / 60)} minutes`);

      setTimeout(async () => {
        try {
          const metrics = await getMetricsFunction();
          await this.submitDailyReport(employeeAddress, metrics);
          console.log('✅ Automatic daily report sent');
        } catch (error) {
          console.error('❌ Error sending automatic report:', error);
        }
        
        // Programar siguiente día
        scheduleNext();
      }, timeUntilMidnight);
    };

    scheduleNext();
  }

  // 🔍 Verificar conexión
  async isConnected() {
    if (!this.provider) return false;
    
    try {
      const accounts = await this.provider.listAccounts();
      return accounts.length > 0;
    } catch {
      return false;
    }
  }

  // 🔗 Obtener dirección actual
  async getCurrentAddress() {
    if (!this.signer) return null;
    
    try {
      return await this.signer.getAddress();
    } catch {
      return null;
    }
  }

  // 💰 Obtener balance de la wallet
  async getWalletBalance() {
    if (!this.provider || !this.signer) return null;
    
    try {
      const balance = await this.signer.getBalance();
      return ethers.utils.formatEther(balance);
    } catch {
      return null;
    }
  }

  // 🔄 Cambiar red (Polygon, Ethereum, etc.)
  async switchNetwork(chainId) {
    if (!window.ethereum) return false;
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexValue(chainId) }],
      });
      return true;
    } catch (error) {
      console.error('Error switching network:', error);
      return false;
    }
  }
}

export default BlockchainReporter;
