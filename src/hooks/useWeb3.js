// useWeb3.js - Hook para gestionar conexión Web3 y puntos
import { useState, useEffect, useCallback } from 'react';
import PointsSystem from '../services/PointsSystem';
import BlockchainReporter from '../services/BlockchainReporter';

export const useWeb3 = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletBalance, setWalletBalance] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [blockchainStats, setBlockchainStats] = useState(null);
  const [pointsSystem] = useState(() => new PointsSystem());
  const [blockchainReporter] = useState(() => new BlockchainReporter());

  // 🔍 Verificar conexión inicial
  useEffect(() => {
    checkConnection();
    
    // Escuchar cambios de cuenta en MetaMask
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  // 📊 Cargar datos cuando cambia la wallet
  useEffect(() => {
    if (walletAddress) {
      loadEmployeeData();
      loadBlockchainStats();
    }
  }, [walletAddress]);

  // 🔍 Verificar conexión existente
  const checkConnection = async () => {
    try {
      const connected = await blockchainReporter.isConnected();
      if (connected) {
        const address = await blockchainReporter.getCurrentAddress();
        const balance = await blockchainReporter.getWalletBalance();
        
        setWalletAddress(address);
        setWalletBalance(balance);
        setIsConnected(true);
      }
    } catch (error) {
      console.log('No previous connection found');
    }
  };

  // 🔗 Conectar wallet
  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      const address = await blockchainReporter.connectWallet();
      const balance = await blockchainReporter.getWalletBalance();
      
      setWalletAddress(address);
      setWalletBalance(balance);
      setIsConnected(true);
      
      return address;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  // 🔌 Desconectar wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletBalance(null);
    setIsConnected(false);
    setEmployeeData(null);
    setBlockchainStats(null);
  };

  // 👤 Cambio de cuenta en MetaMask
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setWalletAddress(accounts[0]);
    }
  };

  // 🔄 Cambio de red
  const handleChainChanged = () => {
    // Recargar la página cuando cambia la red
    window.location.reload();
  };

  // 📖 Cargar datos del empleado
  const loadEmployeeData = () => {
    if (!walletAddress) return;
    
    const data = pointsSystem.getEmployeeData(walletAddress);
    setEmployeeData(data);
  };

  // 📊 Cargar estadísticas de blockchain
  const loadBlockchainStats = async () => {
    if (!walletAddress) return;
    
    try {
      const stats = await blockchainReporter.getEmployeeBlockchainStats(walletAddress);
      setBlockchainStats(stats);
    } catch (error) {
      console.error('Error loading blockchain stats:', error);
    }
  };

  // 🎯 Calcular y guardar puntos diarios
  const calculateDailyPoints = useCallback((metrics) => {
    if (!walletAddress || !metrics) return 0;
    
    const dailyPoints = pointsSystem.calculateDailyPoints(metrics);
    const updatedData = pointsSystem.saveEmployeePoints(walletAddress, dailyPoints, metrics);
    setEmployeeData(updatedData);
    
    return dailyPoints;
  }, [walletAddress, pointsSystem]);

  // 📤 Enviar reporte a blockchain
  const sendDailyReport = async (metrics) => {
    if (!walletAddress || !metrics) {
      throw new Error('Wallet not connected or metrics not available');
    }

    try {
      const result = await blockchainReporter.submitDailyReport(walletAddress, metrics);
      
      // Actualizar estadísticas después del envío
      if (result) {
        await loadBlockchainStats();
      }
      
      return result;
    } catch (error) {
      console.error('Error sending daily report:', error);
      throw error;
    }
  };

  // 💰 Canjear beneficio
  const redeemBenefit = (benefit) => {
    if (!walletAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const updatedData = pointsSystem.redeemPoints(walletAddress, benefit.cost, benefit.name);
      setEmployeeData(updatedData);
      return updatedData;
    } catch (error) {
      throw error;
    }
  };

  // 🏆 Verificar logros
  const checkAchievements = () => {
    if (!walletAddress) return [];
    
    const newAchievements = pointsSystem.checkAchievements(walletAddress);
    if (newAchievements.length > 0) {
      loadEmployeeData(); // Recargar datos para mostrar nuevos logros
    }
    
    return newAchievements;
  };

  // 📊 Obtener ranking
  const getLeaderboard = () => {
    return pointsSystem.getLeaderboard();
  };

  // 🎁 Obtener catálogo de beneficios
  const getBenefitsCatalog = () => {
    return pointsSystem.getBenefitsCatalog();
  };

  // ⏰ Programar envío automático
  const scheduleAutomaticReports = (getMetricsFunction) => {
    if (!walletAddress) return;
    
    blockchainReporter.scheduleAutomaticReport(walletAddress, getMetricsFunction);
  };

  // 🔄 Actualizar balance
  const updateBalance = async () => {
    if (!walletAddress) return;
    
    try {
      const balance = await blockchainReporter.getWalletBalance();
      setWalletBalance(balance);
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  // 🌐 Cambiar red
  const switchNetwork = async (chainId) => {
    try {
      return await blockchainReporter.switchNetwork(chainId);
    } catch (error) {
      console.error('Error switching network:', error);
      throw error;
    }
  };

  // 🧹 Limpiar datos (para desarrollo)
  const clearEmployeeData = () => {
    if (!walletAddress) return;
    
    pointsSystem.clearEmployeeData(walletAddress);
    setEmployeeData(null);
    loadEmployeeData();
  };

  return {
    // Estado
    walletAddress,
    isConnected,
    isConnecting,
    walletBalance,
    employeeData,
    blockchainStats,
    
    // Acciones de wallet
    connectWallet,
    disconnectWallet,
    updateBalance,
    switchNetwork,
    
    // Sistema de puntos
    calculateDailyPoints,
    redeemBenefit,
    checkAchievements,
    getLeaderboard,
    getBenefitsCatalog,
    
    // Blockchain
    sendDailyReport,
    scheduleAutomaticReports,
    loadBlockchainStats,
    
    // Utilidades
    clearEmployeeData,
    
    // Servicios
    pointsSystem,
    blockchainReporter
  };
};
